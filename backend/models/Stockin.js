const db = require("../config/db");

// Create a new stock-in
const createStock = async (ingredient_id, quantity, stockman_id, notes = null, date = new Date()) => {
  // Ensure ingredient exists
  const [ingredient] = await db.query("SELECT * FROM ingredients WHERE id = ?", [ingredient_id]);
  if (ingredient.length === 0) {
    throw new Error("Ingredient not found");
  }

  // Ensure stockman exists
  const [stockman] = await db.query("SELECT * FROM users WHERE id = ?", [stockman_id]);
  if (stockman.length === 0) {
    throw new Error("Stockman (user) not found");
  }

  // Insert into stockins
  const [result] = await db.query(
    "INSERT INTO stockins (ingredient_id, quantity, stockman_id, notes, date) VALUES (?, ?, ?, ?, ?)",
    [ingredient_id, quantity, stockman_id, notes, date]
  );

  // Update ingredient quantity
  await db.query("UPDATE ingredients SET quantity = quantity + ? WHERE id = ?", [quantity, ingredient_id]);

  return result.insertId;
};

// Get all stock-ins
const getAllStocks = async () => {
  const [rows] = await db.query(`
    SELECT s.id, s.ingredient_id, i.name AS ingredient_name, s.quantity,
           s.stockman_id, u.fullname AS stockman_name, s.notes, s.date
    FROM stockins s
    JOIN ingredients i ON s.ingredient_id = i.id
    JOIN users u ON s.stockman_id = u.id
    ORDER BY s.date DESC
  `);
  return rows;
};

// Get a single stock-in by ID
const getStockById = async (id) => {
  const [rows] = await db.query(`
    SELECT s.id, s.ingredient_id, i.name AS ingredient_name, s.quantity,
           s.stockman_id, u.fullname AS stockman_name, s.notes, s.date
    FROM stockins s
    JOIN ingredients i ON s.ingredient_id = i.id
    JOIN users u ON s.stockman_id = u.id
    WHERE s.id = ?
  `, [id]);
  return rows[0];
};

// Delete a stock-in
const deleteStock = async (id) => {
  await db.query("DELETE FROM stockins WHERE id = ?", [id]);
};

module.exports = {
  createStock,
  getAllStocks,
  getStockById,
  deleteStock
};
