const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createStock,
  getStocks,
  getStockById,
  deleteStock
} = require("../controllers/stockinController");

const router = express.Router();

router.post("/", protect, createStock);     // create stock-in
router.get("/", protect, getStocks);        // get all stock-ins
router.get("/:id", protect, getStockById);  // get stock-in by ID
router.delete("/:id", protect, deleteStock); // delete stock-in

module.exports = router;
