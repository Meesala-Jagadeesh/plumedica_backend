const express = require("express");

const router = express.Router();

const {
  getTotalRevenue,
} = require("../controllers/salesController");

// Total Revenue
router.get("/total-revenue", getTotalRevenue);

module.exports = router;