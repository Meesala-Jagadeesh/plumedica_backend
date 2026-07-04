const express = require("express");

const router = express.Router();

const {
    getAllInventory,
    getAnalgesicMedicines,
    getRespiratoryMedicines,
    getSupplementMedicines,
} = require("../controllers/inventoryController");

// Get All Medicines
router.get("/all", getAllInventory);
// Get Analgesic Medicines
router.get("/category/Analgesic", getAnalgesicMedicines);
// Get Respiratory Medicines
router.get("/category/Respiratory", getRespiratoryMedicines);
// Get Supplement Medicines
router.get("/category/Supplement", getSupplementMedicines);

module.exports = router;