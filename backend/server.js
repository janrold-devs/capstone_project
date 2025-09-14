require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const productRoutes = require("./routes/productRoutes");
const spoilageRoutes = require("./routes/spoilageRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const stockinRoutes = require("./routes/stockinRoutes");
const salesRoutes = require("./routes/salesRoutes");

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Register Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ingredients", ingredientRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/spoilages", spoilageRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/stockins", stockinRoutes);
app.use("/api/v1/sales", salesRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
