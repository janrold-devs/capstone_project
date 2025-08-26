const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createTransaction,
  getTransactions,
  getTransactionById
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", protect, createTransaction);   // Checkout
router.get("/", protect, getTransactions);     // List transactions
router.get("/:id", protect, getTransactionById); // Single transaction (receipt)

module.exports = router;
