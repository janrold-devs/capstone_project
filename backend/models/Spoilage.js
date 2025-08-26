const db = require("../config/db");

// Create a new spoilage
const createSpoilage = async (ingredient_id, quantity, reason, reported_by, date = new Date()) => {
  // Check if ingredient exists
  const [ingredient] = await db.query("SELECT * FROM ingredients WHERE id = ?", [ingredient_id]);
  if (ingredient.length === 0) {
    throw new Error("Ingredient not found");
  }

  // Check if user exists
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [reported_by]);
  if (user.length === 0) {
    throw new Error("User (reported_by) not found");
  }

  // Ensure ingredient has enough stock
  if (ingredient[0].quantity < quantity) {
    throw new Error("Not enough stock available to mark as spoiled");
  }

  // Insert into spoilages
  const [result] = await db.query(
    "INSERT INTO spoilages (ingredient_id, quantity, reason, reported_by, date) VALUES (?, ?, ?, ?, ?)",
    [ingredient_id, quantity, reason, reported_by, date]
  );

  // Reduce ingredient quantity
  await db.query("UPDATE ingredients SET quantity = quantity - ? WHERE id = ?", [quantity, ingredient_id]);

  return result.insertId;
};

// Get all spoilages
const getAllSpoilages = async () => {
  const [rows] = await db.query(`
    SELECT s.id, s.ingredient_id, i.name AS ingredient_name, s.quantity,
           s.reason, s.reported_by, u.fullname AS reported_by_name, s.date
    FROM spoilages s
    JOIN ingredients i ON s.ingredient_id = i.id
    JOIN users u ON s.reported_by = u.id
    ORDER BY s.date DESC
  `);
  return rows;
};

// Get spoilage by ID
const getSpoilageById = async (id) => {
  const [rows] = await db.query(`
    SELECT s.id, s.ingredient_id, i.name AS ingredient_name, s.quantity,
           s.reason, s.reported_by, u.fullname AS reported_by_name, s.date
    FROM spoilages s
    JOIN ingredients i ON s.ingredient_id = i.id
    JOIN users u ON s.reported_by = u.id
    WHERE s.id = ?
  `, [id]);
  return rows[0];
};

// Delete spoilage (optional: rollback quantity if needed)
const deleteSpoilage = async (id) => {
  const [spoilage] = await db.query("SELECT * FROM spoilages WHERE id = ?", [id]);
  if (spoilage.length === 0) return;

  // Rollback quantity
  await db.query("UPDATE ingredients SET quantity = quantity + ? WHERE id = ?", [spoilage[0].quantity, spoilage[0].ingredient_id]);

  // Delete record
  await db.query("DELETE FROM spoilages WHERE id = ?", [id]);
};

module.exports = {
  createSpoilage,
  getAllSpoilages,
  getSpoilageById,
  deleteSpoilage,
};
