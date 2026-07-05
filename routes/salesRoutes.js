const express = require("express");

const router = express.Router();

const {
  getTotalRevenue,
  getTransactions,
  getAverageOrder,
  getDailySales,
  getWeeklySales,
  getMonthlySales,
  getYearlySales,
  getSalesByDate,
  getInventoryMovement,
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
// Yearly Sales
router.get("/yearly", getYearlySales);
// Sales By Selected Date
router.get("/select-date", getSalesByDate);
// Inventory Movement
router.get("/inventory-movement", getInventoryMovement);

module.exports = router;