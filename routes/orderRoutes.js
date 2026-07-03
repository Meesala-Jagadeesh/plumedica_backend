const express = require("express");

const router = express.Router();

const {
  getPendingOrders,
  getProcessingOrders
} = require("../controllers/orderController");

// GET Pending Orders
router.get("/pending", getPendingOrders);
router.get("/processing", getProcessingOrders);

module.exports = router;