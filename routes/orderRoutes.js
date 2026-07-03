const express = require("express");

const router = express.Router();

const {
  getPendingOrders,
  getProcessingOrders,
  getDeliveredOrders,
  getAllOrders,
  getDailyOrders,
  getWeeklyOrders,
} = require("../controllers/orderController");

router.get("/pending", getPendingOrders);

router.get("/processing", getProcessingOrders);

router.get("/delivered", getDeliveredOrders);

router.get("/all", getAllOrders);

router.get("/daily", getDailyOrders);

router.get("/weekly", getWeeklyOrders);

module.exports = router;