const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    // What is being rated
    entityType: {
      type: String,
      required: true,
      enum: ["DRIVER", "TRIP", "APP", "MARSHAL"],
    },
    // ID of the driver / trip / app version / marshal etc.
    entityId: {
      type: String,
      required: true,
    },
    // Rating 1–5
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Optional comment
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    // Who gave this feedback (optional if you allow anonymous)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    ride : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
