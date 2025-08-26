const db = require("../config/db");

const createTransaction = async (user_id, items, payment_method, reference_number = null) => {
  if (payment_method === "gcash" && !reference_number) {
    throw new Error("Reference number is required for GCash payments");
  }

  let total_amount = 0;
  items.forEach(item => {
    total_amount += item.price * item.quantity;
  });

  const connection = await db.getConnection(); // transaction-safe
  try {
    await connection.beginTransaction();

    // Insert transaction
    const [transactionResult] = await connection.query(
      "INSERT INTO transactions (user_id, total_amount, payment_method, reference_number) VALUES (?, ?, ?, ?)",
      [user_id, total_amount, payment_method, reference_number]
    );
    const transactionId = transactionResult.insertId;

    // Insert items + deduct ingredients
    for (const item of items) {
      // Insert transaction item
      await connection.query(
        "INSERT INTO transaction_items (transaction_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [transactionId, item.product_id, item.quantity, item.price]
      );

      // Fetch recipe for this product
      const [recipeRows] = await connection.query(
        "SELECT ingredient_id, quantity FROM product_ingredients WHERE product_id = ?",
        [item.product_id]
      );

      // Deduct ingredients
      for (const recipe of recipeRows) {
        const requiredQty = recipe.quantity * item.quantity; // scale by number of products sold
        await connection.query(
          "UPDATE ingredients SET quantity = quantity - ? WHERE id = ?",
          [requiredQty, recipe.ingredient_id]
        );
      }
    }

    await connection.commit();
    return transactionId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};
