const db = require("../config/db");

//create a new product
const createProduct = async (name, category, size, price, productImage = null) => {
    const [result] = await db.query(
        "INSERT INTO products (name, category, size, price, productImage) VALUES (?, ?, ?, ?, ?)",
        [name, category, size, price, productImage]
    );
    return result.insertId;
};

//get all products
const getAllProducts = async () => {
    const [rows] = await db.query("SELECT * FROM products");
    return [rows];
};

// Get a single product by ID
const getProductById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

// Update an ingredient
const updateProduct = async (id, name, category, size, price, productImage = false) => {
  await db.query(
    "UPDATE products SET name = ?, category = ?, size = ?, price = ?, productImage = ? WHERE id = ?",
    [name, category, size, price, productImage, id]
  );
};

// Delete an ingredient
const deleteProduct = async (id) => {
  await db.query("DELETE FROM products WHERE id = ?", [id]);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};