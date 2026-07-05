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

// ==============================
// Get Daily Sales
// ==============================

const getDailySales = async (req, res) => {
  try {
    const today = new Date();

    // Start of today (00:00:00)
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // End of today (23:59:59)
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const sales = await Sales.find({
      transactionDate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      date: startOfDay.toISOString().split("T")[0],
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Weekly Sales
// ==============================

const getWeeklySales = async (req, res) => {
  try {
    const today = new Date();

    // Start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // End of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const sales = await Sales.find({
      transactionDate: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Monthly Sales
// ==============================

const getMonthlySales = async (req, res) => {
  try {
    const today = new Date();

    // Start of current month
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // Start of next month
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    const sales = await Sales.find({
      transactionDate: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      month: today.toLocaleString("default", { month: "long" }),
      year: today.getFullYear(),
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getTotalRevenue,
  getTransactions,
  getAverageOrder,
  getDailySales,
  getWeeklySales,
  getMonthlySales,
};