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


// Get Max Limit Medicines
const getMaxLimitMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        remainingStock: 1,
        maxLimit: 1,
        meanLimit: 1,
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


// Get Remaining Stock
const getRemainingStock = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        remainingStock: 1,
        totalStock: 1,
        meanLimit: 1,
        maxLimit: 1,
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


// Get Sold Stock
const getSoldStock = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        soldStock: 1,
        remainingStock: 1,
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


// Get Medicine Expiry Details
const getExpiryMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        expiryDate: 1,
        remainingStock: 1,
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


// Get Total Stock
const getTotalStock = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        remainingStock: 1,
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

// Get Medicine Prices
const getMedicinePrices = async (req, res) => {
  try {
    const medicines = await Inventory.find(
      {},
      {
        medicineName: 1,
        price: 1,
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

// Get Average Stock
const getAverageStock = async (req, res) => {
  try {
    const medicines = await Inventory.find();

    const averageStockData = medicines.map((medicine) => ({
      medicineName: medicine.medicineName,
      remainingStock: medicine.remainingStock,
      totalStock: medicine.totalStock,
      averageStock:
        (medicine.remainingStock + medicine.totalStock) / 2,
    }));

    res.status(200).json({
      success: true,
      totalMedicines: averageStockData.length,
      data: averageStockData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Low Stock Medicines
const getLowStockMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find();

    const lowStockMedicines = medicines.filter(
      (medicine) => medicine.remainingStock <= medicine.meanLimit
    );

    res.status(200).json({
      success: true,
      totalMedicines: lowStockMedicines.length,
      data: lowStockMedicines,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Full Stock Medicines
const getFullStockMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find();

    const fullStockMedicines = medicines.filter(
      (medicine) => medicine.remainingStock > medicine.meanLimit
    );

    res.status(200).json({
      success: true,
      totalMedicines: fullStockMedicines.length,
      data: fullStockMedicines,
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
    getMaxLimitMedicines,
    getRemainingStock,
    getSoldStock,
    getExpiryMedicines,
    getTotalStock,
    getMedicinePrices,
    getAverageStock,
    getLowStockMedicines,
    getFullStockMedicines,
};