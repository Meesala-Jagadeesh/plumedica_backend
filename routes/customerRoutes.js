const express = require("express");

const router = express.Router();

const {
  getAllCustomers,
} = require("../controllers/customerController");

// GET All Customers
router.get("/all", getAllCustomers);

module.exports = router;