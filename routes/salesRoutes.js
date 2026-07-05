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
  getStockRefilled,
  getSalesByRange,
  getAnalgesicsSales,
  getRespiratorySales,
  getSupplementsSales,
  getGIHealthSales,
  getOtherSales,
  getCreditCardSales,
  getDebitCardSales,
  getUPISales,
  getCashSales,
  getPaymentMethodsByDate,
  getSoldStock,
  getRemainingStock,
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
// Stock Refilled
router.get("/stock-refilled", getStockRefilled);
// Sales By Date Range
router.get("/range", getSalesByRange);
// Analgesics Sales
router.get("/analgesics", getAnalgesicsSales);
// Respiratory Sales
router.get("/respiratory", getRespiratorySales);
// Supplements Sales
router.get("/supplements", getSupplementsSales);
// GI Health Sales
router.get("/gi-health", getGIHealthSales);
// Other Category Sales
router.get("/others", getOtherSales);
// Credit Card Sales
router.get("/credit-card", getCreditCardSales);
// Debit Card Sales
router.get("/debit-card", getDebitCardSales);
// UPI Sales
router.get("/upi", getUPISales);
// Cash Sales
router.get("/cash", getCashSales);
// Payment Methods - Select Date
router.get("/payment-methods/select-date", getPaymentMethodsByDate);
// Stock Activity - Sold
router.get("/stock-activity/sold", getSoldStock);
// Stock Activity - Remaining
router.get("/stock-activity/remaining", getRemainingStock);

module.exports = router;