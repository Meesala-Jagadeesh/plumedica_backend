const express = require("express");

const router = express.Router();

const {
    getAllInventory,
    getAnalgesicMedicines,
} = require("../controllers/inventoryController");

// Get All Medicines
router.get("/all", getAllInventory);
// Get Analgesic Medicines
router.get("/category/Analgesic", getAnalgesicMedicines);

module.exports = router;