const express = require("express");

const router = express.Router();

const {
    getAllInventory,
    getAnalgesicMedicines,
    getRespiratoryMedicines,
    getSupplementMedicines,
    getGIHealthMedicines,
} = require("../controllers/inventoryController");

// Get All Medicines
router.get("/all", getAllInventory);
// Get Analgesic Medicines
router.get("/category/Analgesic", getAnalgesicMedicines);
// Get Respiratory Medicines
router.get("/category/Respiratory", getRespiratoryMedicines);
// Get Supplement Medicines
router.get("/category/Supplement", getSupplementMedicines);

router.get("/gi-health", getGIHealthMedicines);

module.exports = router;