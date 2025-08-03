// models/Users.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (fullname, email, password, profileImageUrl = null) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    "INSERT INTO users (fullname, email, password, profileImageUrl) VALUES (?, ?, ?, ?)",
    [fullname, email, hashedPassword, profileImageUrl]
  );

  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
  createUser,
  getUserByEmail,
  comparePassword,
};
