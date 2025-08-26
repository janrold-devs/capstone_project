const Product = require("../models/Products");
const xlsx = require('xlsx');

// Create product with linked ingredients
exports.createProduct = async (req, res) => {
  const { name, category, size, price, productImage, ingredients } = req.body;

  // Validation
  if (!name || !category || !size || !price || !ingredients || ingredients.length === 0) {
    return res.status(400).json({
      message: "Name, category, size, price, and at least one ingredient are required",
    });
  }

  try {
    // 1. Insert product
    const productId = await Product.createProduct(name, category, size, price, productImage);

    // 2. Link ingredients to product
    await Product.linkIngredientsToProduct(productId, ingredients); // ingredients = [{ ingredient_id, quantity }, ...]

    res.status(201).json({ message: "Product created successfully", productId });
  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Get product by ID including ingredients
exports.getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const ingredients = await Product.getProductIngredients(id);

    res.status(200).json({ ...product, ingredients });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product details", error: err.message });
  }
};

// Update product + ingredients
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, size, price, productImage, ingredients } = req.body;

  try {
    // 1. Update product
    await Product.updateProduct(id, name, category, size, price, productImage);

    // 2. Clear old ingredients
    await Product.clearProductIngredients(id);

    // 3. Link new ingredients
    await Product.linkIngredientsToProduct(id, ingredients);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

// Optional: Download Excel
exports.downloadProductExcel = async (req, res) => {
  const { id } = req.params;

  try {
    let data;

    if (id) {
      const product = await Product.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      data = [product];
    } else {
      data = await Product.getAllProducts();
    }

    // Create workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Products");

    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader("Content-Disposition", "attachment; filename=product_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
