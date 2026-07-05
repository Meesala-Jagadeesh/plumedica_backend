const Sales = require("../models/Sales");

// ==============================
// Get Total Revenue
// ==============================

const getTotalRevenue = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalRevenue =
      result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch total revenue",
      error: error.message,
    });
  }
};


// ==============================
// Get Total Transactions
// ==============================

const getTransactions = async (req, res) => {
  try {
    const totalTransactions = await Sales.countDocuments();

    res.status(200).json({
      success: true,
      transactions: totalTransactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

// ==============================
// Get Average Order Value
// ==============================

const getAverageOrder = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);

    let averageOrder = 0;

    if (result.length > 0 && result[0].totalTransactions > 0) {
      averageOrder =
        result[0].totalRevenue / result[0].totalTransactions;
    }

    res.status(200).json({
      success: true,
      averageOrder: Number(averageOrder.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch average order",
      error: error.message,
    });
  }
};
module.exports = {
  getTotalRevenue,
  getTransactions,
  getAverageOrder,
};