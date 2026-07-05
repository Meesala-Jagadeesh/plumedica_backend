const Customer = require("../models/Customer");

// Get All Customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      success: true,
      totalCustomers: customers.length,
      data: customers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Plumedica Customers
const getPlumedicaCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      customerType: "Plumedica",
    });

    res.status(200).json({
      success: true,
      totalCustomers: customers.length,
      data: customers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Non-Plumedica Customers
const getNonPlumedicaCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      customerType: "Non-Plumedica",
    });

    res.status(200).json({
      success: true,
      totalCustomers: customers.length,
      data: customers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Search Customers
const searchCustomers = async (req, res) => {
  try {
    const { search } = req.query;

    const customers = await Customer.find({
      $or: [
        { customerName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      totalCustomers: customers.length,
      data: customers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getAllCustomers,
  getPlumedicaCustomers,
  getNonPlumedicaCustomers,
  searchCustomers,
};