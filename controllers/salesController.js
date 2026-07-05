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

// ==============================
// Get Yearly Sales
// ==============================

const getYearlySales = async (req, res) => {
  try {
    const today = new Date();

    // Start of current year
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Start of next year
    const endOfYear = new Date(today.getFullYear() + 1, 0, 1);

    const sales = await Sales.find({
      transactionDate: {
        $gte: startOfYear,
        $lt: endOfYear,
      },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
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

// ==============================
// Get Sales By Selected Date
// ==============================

const getSalesByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Please provide a date (YYYY-MM-DD)",
      });
    }

    const startDate = new Date(date);
    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + 1);

    const sales = await Sales.find({
      transactionDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      selectedDate: date,
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
// Get Inventory Movement
// ==============================

const getInventoryMovement = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalSold: {
            $sum: "$stockSold",
          },
          totalRefilled: {
            $sum: "$stockRefilled",
          },
          totalRemaining: {
            $sum: "$stockRemaining",
          },
        },
      },
    ]);

    const inventory =
      result.length > 0
        ? result[0]
        : {
            totalSold: 0,
            totalRefilled: 0,
            totalRemaining: 0,
          };

    res.status(200).json({
      success: true,
      data: {
        totalSold: inventory.totalSold,
        totalRefilled: inventory.totalRefilled,
        totalRemaining: inventory.totalRemaining,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory movement",
      error: error.message,
    });
  }
};

// ==============================
// Get Stock Refilled
// ==============================

const getStockRefilled = async (req, res) => {
  try {
    const sales = await Sales.find({
      stockRefilled: { $gt: 0 },
    });

    const totalRefilled = sales.reduce(
      (sum, sale) => sum + sale.stockRefilled,
      0
    );

    res.status(200).json({
      success: true,
      totalRefilled,
      totalTransactions: sales.length,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock refilled data",
      error: error.message,
    });
  }
};

// ==============================
// Get Sales By Date Range
// ==============================

const getSalesByRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide startDate and endDate",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Include the complete end date
    end.setDate(end.getDate() + 1);

    const sales = await Sales.find({
      transactionDate: {
        $gte: start,
        $lt: end,
      },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      startDate,
      endDate,
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
// Get Analgesics Sales
// ==============================

const getAnalgesicsSales = async (req, res) => {
  try {
    const sales = await Sales.find({
      category: "Analgesics",
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      category: "Analgesics",
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Analgesics sales",
      error: error.message,
    });
  }
};

// ==============================
// Get Respiratory Sales
// ==============================

const getRespiratorySales = async (req, res) => {
  try {
    const sales = await Sales.find({
      category: "Respiratory",
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      category: "Respiratory",
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Respiratory sales",
      error: error.message,
    });
  }
};

// ==============================
// Get Supplements Sales
// ==============================

const getSupplementsSales = async (req, res) => {
  try {
    const sales = await Sales.find({
      category: "Supplements",
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      category: "Supplements",
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Supplements sales",
      error: error.message,
    });
  }
};

// ==============================
// Get GI Health Sales
// ==============================

const getGIHealthSales = async (req, res) => {
  try {
    const sales = await Sales.find({
      category: "GI Health",
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({
      success: true,
      category: "GI Health",
      totalTransactions: sales.length,
      totalRevenue,
      data: sales,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch GI Health sales",
      error: error.message,
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
  getYearlySales,
  getSalesByDate,
  getInventoryMovement,
  getStockRefilled,
  getSalesByRange,
  getAnalgesicsSales,
  getRespiratorySales,
  getSupplementsSales,
  getGIHealthSales,
};