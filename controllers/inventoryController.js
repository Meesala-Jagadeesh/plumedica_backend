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


// Get Supplement Medicines
const getSupplementMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find({
      category: "Supplement",
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

// Get GI Health Medicines
const getGIHealthMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find({
      category: "GI Health",
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


// Add In-stock
const addInStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, date } = req.body;

    const medicine = await Inventory.findById(id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    medicine.remainingStock += Number(quantity);

    medicine.stockTimeline.unshift({
      type: "In-stock",
      quantity,
      date,
    });

    await medicine.save();

    res.status(200).json({
      success: true,
      message: "Stock added successfully",
      data: medicine,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Mean Limit Medicines
const getMeanLimitMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        remainingStock: 1,
        meanLimit: 1,
        maxLimit: 1,
        totalStock: 1,
      }
    );

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
    getSupplementMedicines,
    getGIHealthMedicines,
    addInStock,
    getMeanLimitMedicines,
};