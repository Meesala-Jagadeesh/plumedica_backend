const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ["In-stock", "Sold"],
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const inventorySchema = new mongoose.Schema(
  {
    medicineId: {
      type: String,
      required: true,
      unique: true,
    },

    medicineName: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    totalStock: {
      type: Number,
      required: true,
    },

    remainingStock: {
      type: Number,
      required: true,
    },

    soldStock: {
      type: Number,
      default: 0,
    },

    meanLimit: {
      type: Number,
      required: true,
    },

    maxLimit: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    stockStatus: {
      type: String,
      enum: ["Low Stock", "Average Stock", "Full Stock"],
      default: "Average Stock",
    },

    timeline: [timelineSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);