const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require("../controllers/auth.controller");
const upload = require('../middleware/upload.middleware');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/image-upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;