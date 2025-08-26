const Spoilage = require("../models/Spoilage");

// Create spoilage
exports.createSpoilage = async (req, res) => {
  const { ingredient_id, quantity, reason } = req.body;
  const reported_by = req.user.id; // from authMiddleware

  try {
    const id = await Spoilage.createSpoilage(ingredient_id, quantity, reason, reported_by);
    res.status(201).json({ message: "Spoilage logged successfully", id });
  } catch (err) {
    res.status(400).json({ message: "Failed to log spoilage", error: err.message });
  }
};

// Get all spoilages
exports.getSpoilages = async (req, res) => {
  try {
    const spoilages = await Spoilage.getAllSpoilages();
    res.status(200).json(spoilages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch spoilages", error: err.message });
  }
};

// Get spoilage by ID
exports.getSpoilageById = async (req, res) => {
  const { id } = req.params;

  try {
    const spoilage = await Spoilage.getSpoilageById(id);
    if (!spoilage) return res.status(404).json({ message: "Spoilage not found" });
    res.status(200).json(spoilage);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch spoilage", error: err.message });
  }
};

// Delete spoilage
exports.deleteSpoilage = async (req, res) => {
  const { id } = req.params;

  try {
    await Spoilage.deleteSpoilage(id);
    res.status(200).json({ message: "Spoilage deleted successfully (stock rolled back)" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete spoilage", error: err.message });
  }
};
