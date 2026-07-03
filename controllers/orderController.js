const Order = require("../models/Order");

// Get All Pending Orders
const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: "Pending" });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending orders",
      error: error.message,
    });
  }
};



// Get Processing Orders
const getProcessingOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: "Processing"
    });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      data: orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Delivered Orders
const getDeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: "Delivered",
    });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get Daily Orders
const getDailyOrders = async (req, res) => {
  try {
    // Today's date (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Tomorrow's date (00:00:00)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find today's orders
    const orders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPendingOrders,
  getProcessingOrders,
  getDeliveredOrders,
  getAllOrders,
  getDailyOrders,
};