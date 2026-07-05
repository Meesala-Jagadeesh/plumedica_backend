const express = require("express");

const router = express.Router();

const {
  getTotalRevenue,
  getTransactions,
} = require("../controllers/salesController");

// Total Revenue
router.get("/total-revenue", getTotalRevenue);
// Transactions
router.get("/transactions", getTransactions);

module.exports = router;