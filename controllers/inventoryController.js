const Inventory = require("../models/Inventory");

// Get All Medicines
const getAllInventory = async (req, res) => {
  try {
    const medicines = await Inventory.find();

    res.status(200).json({
      success: true,
      totalMedicines: medicines.length,
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Analgesic Medicines
const getAnalgesicMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find({
      category: "Analgesic",
    });

    res.status(200).json({
      success: true,
      totalMedicines: medicines.length,
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Respiratory Medicines
const getRespiratoryMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find({
      category: "Respiratory",
    });

    res.status(200).json({
      success: true,
      totalMedicines: medicines.length,
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    getAllInventory,
    getAnalgesicMedicines,
    getRespiratoryMedicines,
};