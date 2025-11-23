const mongoose = require("mongoose");
const Feedback = require("../models/feedback.model");
const User = require("../models/user.model"); // your existing User model

// can be overridden via env
const ALERT_THRESHOLD =
  process.env.ALERT_THRESHOLD ? Number(process.env.ALERT_THRESHOLD) : 2.5;

/**
 * GET /feedback/sentiment-summary
 * Overall counts + average rating + sentiment breakdown
 */
const getSentimentSummary = async (req, res) => {
  try {
    const result = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          totalFeedbacks: { $sum: 1 },
          avgRating: { $avg: "$rating" },
          positive: {
            $sum: {
              $cond: [{ $gt: ["$rating", 3] }, 1, 0],
            },
          },
          neutral: {
            $sum: {
              $cond: [{ $eq: ["$rating", 3] }, 1, 0],
            },
          },
          negative: {
            $sum: {
              $cond: [{ $lt: ["$rating", 3] }, 1, 0],
            },
          },
        },
      },
    ]);

    if (!result.length) {
      return res.json({
        totalFeedbacks: 0,
        avgRating: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
      });
    }

    const summary = result[0];
    delete summary._id;

    return res.json(summary);
  } catch (err) {
    console.error("getSentimentSummary error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /admin/drivers/stats
 * Per-driver sentiment stats for drivers only
 *
 * Output example:
 * [
 *   {
 *     driverId,
 *     driverName,
 *     driverUsername,
 *     avgRating,
 *     totalFeedbacks,
 *     lastFeedbackAt
 *   }
 * ]
 */
const getDriverStats = async (req, res) => {
  try {
    const agg = await Feedback.aggregate([
      { $match: { entityType: "DRIVER", entityId: { $ne: null } } },
      {
        $group: {
          _id: "$entityId",
          avgRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
          lastFeedbackAt: { $max: "$createdAt" },
        },
      },
      { $sort: { avgRating: 1 } }, // low rated first
    ]);

    const driverIds = agg.map((a) => a._id);
    const drivers = await User.find({ _id: { $in: driverIds } }).select(
      "_id name username"
    );

    const driverMap = {};
    drivers.forEach((d) => {
      driverMap[d._id.toString()] = d;
    });

    const stats = agg.map((row) => {
      const driver = driverMap[row._id.toString()];
      return {
        driverId: row._id,
        driverName: driver ? driver.name : "Unknown Driver",
        driverUsername: driver ? driver.username : null,
        avgRating: Number(row.avgRating.toFixed(2)),
        totalFeedbacks: row.totalFeedbacks,
        lastFeedbackAt: row.lastFeedbackAt,
      };
    });

    return res.json(stats);
  } catch (err) {
    console.error("getDriverStats error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /feedback/alerts
 * Drivers whose avgRating < ALERT_THRESHOLD
 * We derive "alerts" from current driver stats (no separate Alert collection).
 */
const getRecentAlerts = async (req, res) => {
  try {
    // reuse driver stats aggregation
    const agg = await Feedback.aggregate([
      { $match: { entityType: "DRIVER", entityId: { $ne: null } } },
      {
        $group: {
          _id: "$entityId",
          avgRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
          lastFeedbackAt: { $max: "$createdAt" },
        },
      },
      { $sort: { avgRating: 1 } },
    ]);

    // filter by threshold
    const low = agg.filter(
      (row) => Number(row.avgRating || 0) < ALERT_THRESHOLD
    );

    if (!low.length) {
      return res.json([]);
    }

    const driverIds = low.map((a) => a._id);
    const drivers = await User.find({ _id: { $in: driverIds } }).select(
      "_id name username"
    );
    const driverMap = {};
    drivers.forEach((d) => {
      driverMap[d._id.toString()] = d;
    });

    const alerts = low.map((row) => {
      const driver = driverMap[row._id.toString()];
      return {
        _id: row._id,
        driverId: row._id,
        driverName: driver ? driver.name : "Unknown Driver",
        driverUsername: driver ? driver.username : null,
        avgRating: Number(row.avgRating.toFixed(2)),
        totalFeedbacks: row.totalFeedbacks,
        createdAt: row.lastFeedbackAt, // when last bad feedback came in
        reason: `Average rating dropped below threshold (${ALERT_THRESHOLD}).`,
      };
    });

    return res.json(alerts);
  } catch (err) {
    console.error("getRecentAlerts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSentimentSummary,
  getDriverStats,
  getRecentAlerts,
};
