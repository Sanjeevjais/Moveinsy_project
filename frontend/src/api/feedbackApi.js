import axiosClient from "./axiosClient";

export const submitFeedback = (payload) => axiosClient.post("/feedback/add", payload);

export const getAllRideDetails = () => axiosClient.get("/ride/all");
export const getSentimentSummary = () =>
  axiosClient.get("/feedback/sentiment-summary");
export const getDriverStats = () => axiosClient.get("/admin/drivers/stats");
// Recent alerts (driver flagged events)
export const getRecentAlerts = () =>
  axiosClient.get("/feedback/alerts");
