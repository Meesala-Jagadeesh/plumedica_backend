const express = require("express");

const router = express.Router();

const {
  getTotalRevenue,
  getTransactions,
  getAverageOrder,
  getDailySales,
  getWeeklySales,
  getMonthlySales,
} = require("../controllers/salesController");

// Total Revenue
router.get("/total-revenue", getTotalRevenue);
// Transactions
router.get("/transactions", getTransactions);
// Average Order
router.get("/average-order", getAverageOrder);
// Daily Sales
router.get("/daily", getDailySales);
// Weekly Sales
router.get("/weekly", getWeeklySales);
// Monthly Sales
router.get("/monthly", getMonthlySales);

module.exports = router;