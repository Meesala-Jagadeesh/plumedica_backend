const express = require("express");

const router = express.Router();

const {
  getAllCustomers,
  getPlumedicaCustomers,
  getNonPlumedicaCustomers,
} = require("../controllers/customerController");

// GET All Customers
router.get("/all", getAllCustomers);
// GET Plumedica Customers
router.get("/plumedica", getPlumedicaCustomers);
// GET Non-Plumedica Customers
router.get("/non-plumedica", getNonPlumedicaCustomers);

module.exports = router;