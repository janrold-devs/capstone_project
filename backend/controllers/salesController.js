const Sales = require("../models/Sales");

// Total sales today
exports.getTodaySales = async (req, res) => {
  try {
    const result = await Sales.getTodaySales();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch today's sales", error: err.message });
  }
};

// Sales by date range
exports.getSalesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start and end dates are required" });
  }

  try {
    const result = await Sales.getSalesByDateRange(startDate, endDate);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sales by date range", error: err.message });
  }
};

// Best selling products
exports.getBestSellingProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  try {
    const result = await Sales.getBestSellingProducts(limit);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch best selling products", error: err.message });
  }
};

// Total transactions
exports.getTotalTransactions = async (req, res) => {
  try {
    const result = await Sales.getTotalTransactions();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch total transactions", error: err.message });
  }
};

// Total products sold
exports.getTotalProductsSold = async (req, res) => {
  try {
    const result = await Sales.getTotalProductsSold();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch total products sold", error: err.message });
  }
};
