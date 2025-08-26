const Stockin = require("../models/Stockin");

// Create stock-in
exports.createStock = async (req, res) => {
  const { ingredient_id, quantity, notes } = req.body;

  if (!ingredient_id || !quantity) {
    return res.status(400).json({ message: "Ingredient ID and quantity are required" });
  }

  try {
    const stockman_id = req.user.id; // from protect middleware

    const id = await Stockin.createStock(ingredient_id, quantity, stockman_id, notes);
    res.status(201).json({ message: "Stock-in created successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Failed to create stock-in", error: err.message });
  }
};

// Get all stock-ins
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stockin.getAllStocks();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stock-ins", error: err.message });
  }
};

// Get stock-in by ID
exports.getStockById = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stockin.getStockById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock-in not found" });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stock-in", error: err.message });
  }
};

// Delete stock-in
exports.deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    await Stockin.deleteStock(id);
    res.status(200).json({ message: "Stock-in deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete stock-in", error: err.message });
  }
};
