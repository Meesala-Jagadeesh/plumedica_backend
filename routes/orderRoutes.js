const express = require("express");

const router = express.Router();

const {
  getPendingOrders,
  getProcessingOrders,
  getDeliveredOrders,
  getAllOrders,
} = require("../controllers/orderController");

router.get("/pending", getPendingOrders);

router.get("/processing", getProcessingOrders);

router.get("/delivered", getDeliveredOrders);

router.get("/all", getAllOrders);

module.exports = router;