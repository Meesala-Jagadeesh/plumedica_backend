const express = require("express");

const router = express.Router();

const {
  getAllCustomers,
  getPlumedicaCustomers,
} = require("../controllers/customerController");

// GET All Customers
router.get("/all", getAllCustomers);
// GET Plumedica Customers
router.get("/plumedica", getPlumedicaCustomers);

module.exports = router;