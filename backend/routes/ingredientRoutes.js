const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
  downloadIngredientExcel
} = require("../controllers/ingredientController");

const router = express.Router();

router.post("/", protect, createIngredient);
router.get("/", protect, getIngredients);
router.get("/downloadexcel", protect, downloadIngredientExcel);
router.put("/:id", protect, updateIngredient);
router.delete("/:id", protect, deleteIngredient);

module.exports = router;
