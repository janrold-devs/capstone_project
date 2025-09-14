const db = require("../config/db");

// Get total sales for today
const getTodaySales = async () => {
  const [rows] = await db.query(
    `SELECT IFNULL(SUM(total_amount), 0) AS total_sales
     FROM transactions
     WHERE DATE(created_at) = CURDATE()`
  );
  return rows[0];
};

// Get sales in a date range
const getSalesByDateRange = async (startDate, endDate) => {
  const [rows] = await db.query(
    `SELECT DATE(created_at) AS date, SUM(total_amount) AS total_sales
     FROM transactions
     WHERE DATE(created_at) BETWEEN ? AND ?
     GROUP BY DATE(created_at)
     ORDER BY DATE(created_at) ASC`,
    [startDate, endDate]
  );
  return rows;
};

// Get best selling products
const getBestSellingProducts = async (limit = 5) => {
  const [rows] = await db.query(
    `SELECT p.id, p.name, SUM(ti.quantity) AS total_sold, SUM(ti.quantity * ti.price) AS total_revenue
     FROM transaction_items ti
     JOIN products p ON ti.product_id = p.id
     GROUP BY p.id, p.name
     ORDER BY total_sold DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
};

// Get total transactions count
const getTotalTransactions = async () => {
  const [rows] = await db.query(`SELECT COUNT(*) AS total_transactions FROM transactions`);
  return rows[0];
};

// Get total products sold
const getTotalProductsSold = async () => {
  const [rows] = await db.query(`SELECT SUM(quantity) AS total_products_sold FROM transaction_items`);
  return rows[0];
};

module.exports = {
  getTodaySales,
  getSalesByDateRange,
  getBestSellingProducts,
  getTotalTransactions,
  getTotalProductsSold
};
