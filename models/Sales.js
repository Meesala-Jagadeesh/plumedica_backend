const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "UPI", "Cash"],
      required: true,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },

    stockSold: {
      type: Number,
      default: 0,
    },

    stockRemaining: {
      type: Number,
      default: 0,
    },

    stockRefilled: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);