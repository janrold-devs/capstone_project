const Transaction = require("../models/Transaction");

// Create transaction (checkout)
exports.createTransaction = async (req, res) => {
  const { items, payment_method, reference_number } = req.body;
  const user_id = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided for transaction" });
  }

  try {
    const transactionId = await Transaction.createTransaction(user_id, items, payment_method, reference_number);
    const transaction = await Transaction.getTransactionById(transactionId);

    res.status(201).json({
      message: "Transaction created successfully and ingredient stock updated",
      transaction
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to create transaction", error: err.message });
  }
};


// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions", error: err.message });
  }
};

// Get transaction by ID (for receipt)
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.getTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transaction", error: err.message });
  }
};
