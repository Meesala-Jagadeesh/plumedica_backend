const express = require("express");

const router = express.Router();

const {
    getAllInventory,
    getAnalgesicMedicines,
    getRespiratoryMedicines,
} = require("../controllers/inventoryController");

// Get All Medicines
router.get("/all", getAllInventory);
// Get Analgesic Medicines
router.get("/category/Analgesic", getAnalgesicMedicines);
// Get Respiratory Medicines
router.get("/category/Respiratory", getRespiratoryMedicines);

module.exports = router;