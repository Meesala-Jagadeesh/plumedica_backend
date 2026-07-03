const express = require("express");

const router = express.Router();

const {
  getPendingOrders,
} = require("../controllers/orderController");

// GET Pending Orders
router.get("/pending", getPendingOrders);

module.exports = router;