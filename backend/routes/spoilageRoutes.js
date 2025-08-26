const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createSpoilage,
  getSpoilages,
  getSpoilageById,
  deleteSpoilage
} = require("../controllers/spoilageController");

const router = express.Router();

router.post("/", protect, createSpoilage);
router.get("/", protect, getSpoilages);
router.get("/:id", protect, getSpoilageById);
router.delete("/:id", protect, deleteSpoilage);

module.exports = router;
