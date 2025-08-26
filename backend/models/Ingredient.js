const db = require("../config/db");

// Create a new ingredient
const createIngredient = async (name, quantity, unit, expiration_date = null) => {
  const [result] = await db.query(
    "INSERT INTO ingredients (name, quantity, unit, expiration_date) VALUES (?, ?, ?, ?)",
    [name, quantity, unit, expiration_date]
  );
  return result.insertId;
};

// Get all ingredients
const getAllIngredients = async () => {
  const [rows] = await db.query("SELECT * FROM ingredients");
  return rows;
};

// Get a single ingredient by ID
const getIngredientById = async (id) => {
  const [rows] = await db.query("SELECT * FROM ingredients WHERE id = ?", [id]);
  return rows[0];
};

// Update an ingredient
const updateIngredient = async (id, name, quantity, unit, expiration_date, is_spoiled = false) => {
  await db.query(
    "UPDATE ingredients SET name = ?, quantity = ?, unit = ?, expiration_date = ?, is_spoiled = ? WHERE id = ?",
    [name, quantity, unit, expiration_date, is_spoiled, id]
  );
};

// Delete an ingredient
const deleteIngredient = async (id) => {
  await db.query("DELETE FROM ingredients WHERE id = ?", [id]);
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
