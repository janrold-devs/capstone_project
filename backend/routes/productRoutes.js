const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  downloadProductExcel,
} = require("../controllers/productController");

const router = express.Router();

// CRUD + Excel Routes
router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductDetails); 
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

// Optional: Export to Excel
router.get("/downloadexcel", protect, downloadProductExcel);

module.exports = router;
