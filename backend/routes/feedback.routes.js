

const {
  createFeedback,
  getAllFeedback,
} = require("../controllers/feedback.controller");

const {
getDriverStats,
getSentimentSummary,
getRecentAlerts
} = require("../controllers/feedbackAnalytics.controller")

const authMiddleware = require("../middlewares/auth.middleware");
const {
  optionalAuth,
  requireAdmin,
} = require("../middlewares/auth.middleware");

// Submit feedback (RIDER/DRIVER logged in – or anonymous if you want)




module.exports =(app) => {

app.post("/feedback/add", authMiddleware.validateToken, createFeedback);

// Admin: view all feedback
app.get("/feedback/get", authMiddleware.validateToken, getAllFeedback);

// Admin: driver sentiment stats
app.get("/admin/drivers/stats",authMiddleware.validateToken, getDriverStats);
app.get("/feedback/sentiment-summary",authMiddleware.validateToken, getSentimentSummary);
app.get("/feedback/alerts",authMiddleware.validateToken, getRecentAlerts);
  };
