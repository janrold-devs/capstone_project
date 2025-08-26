const Ingredient = require("../models/Ingredient");
const xlsx = require('xlsx');

// Create ingredient
exports.createIngredient = async (req, res) => {
  const { name, quantity, unit, expiration_date } = req.body;

  if (!name || !quantity || !unit) {
    return res.status(400).json({ message: "Name, quantity, and unit are required" });
  }

  try {
    const id = await Ingredient.createIngredient(name, quantity, unit, expiration_date);
    res.status(201).json({ message: "Ingredient created successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Failed to create ingredient", error: err.message });
  }
};

// Get all ingredients
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.getAllIngredients();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ingredients", error: err.message });
  }
};

// Update ingredient
exports.updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit, expiration_date, is_spoiled } = req.body;

  try {
    await Ingredient.updateIngredient(id, name, quantity, unit, expiration_date, is_spoiled);
    res.status(200).json({ message: "Ingredient updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update ingredient", error: err.message });
  }
};

// Delete ingredient
exports.deleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    await Ingredient.deleteIngredient(id);
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete ingredient", error: err.message });
  }
};

exports.downloadIngredientExcel = async (req, res) => {
  const { id } = req.params;

  try {
    let data;

    if (id) {
      const ingredient = await Ingredient.getIngredientById(id);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      data = [ingredient];
    } else {
      data = await Ingredient.getAllIngredients();
    }

    // Create workbook and worksheet in memory
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Ingredients");

    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers and send file buffer
    res.setHeader("Content-Disposition", "attachment; filename=ingredient_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};