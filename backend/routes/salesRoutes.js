const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getTodaySales,
  getSalesByDateRange,
  getBestSellingProducts,
  getTotalTransactions,
  getTotalProductsSold
} = require("../controllers/salesController");

const router = express.Router();

router.get("/today", protect, getTodaySales);
router.get("/range", protect, getSalesByDateRange);
router.get("/best-sellers", protect, getBestSellingProducts);
router.get("/transactions-count", protect, getTotalTransactions);
router.get("/products-sold", protect, getTotalProductsSold);

module.exports = router;
