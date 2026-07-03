const express = require("express");

const router = express.Router();

const {
  getPendingOrders,
  getProcessingOrders,
  getDeliveredOrders,
} = require("../controllers/orderController");

// GET Pending Orders
router.get("/pending", getPendingOrders);

// GET Processing Orders
router.get("/processing", getProcessingOrders);

// GET Delivered Orders
router.get("/delivered", getDeliveredOrders);

// Export Router
module.exports = router;