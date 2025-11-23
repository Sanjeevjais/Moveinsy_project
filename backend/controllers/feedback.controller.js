const Feedback = require("../models/feedback.model");
const User = require("../models/user.model"); // adjust path if different

/**
 * POST /feedback
 * Body: { entityType, entityId, rating, comment? }
 */
const createFeedback = async (req, res) => {
  try {
    const { entityType, entityId, rating, comment, ride } = req.body;
    console.log("Received feedback data:", req.body);

    if (!entityType || !entityId || !comment || !rating || !ride) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const feedback = await Feedback.create({
      entityType,
      entityId,
      rating,
      comment,
      ride: ride ? ride._id : undefined,
      createdBy: req.user ? req.user._id : undefined,
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    console.error("createFeedback error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /feedback
 * Admin: list feedback with filters (optional)
 * Query params: ?entityType=DRIVER&entityId=abc
 */
const getAllFeedback = async (req, res) => {
  try {
    const { entityType, entityId } = req.query;
    const filter = {};

    if (entityType) filter.entityType = entityType;
    if (entityId) filter.entityId = entityId;

    const feedbacks = await Feedback.find(filter)
      .populate("createdBy", "username role")
      .sort({ createdAt: -1 });

    return res.json(feedbacks);
  } catch (err) {
    console.error("getAllFeedback error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /feedback/driver-stats
 * Admin: list average rating per driver (entityType = 'DRIVER')
 */
const getDriverStats = async (req, res) => {
  try {
    const agg = await Feedback.aggregate([
      { $match: { entityType: "DRIVER" } },
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

    // Optional: attach driver name from User collection (if entityId = user._id)
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

module.exports = {
  createFeedback,
  getAllFeedback,
  getDriverStats,
};
