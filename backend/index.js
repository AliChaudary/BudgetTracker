import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let transactions = [];

const validateTransaction = (req, res, next) => {
  const { title, amount, category, type } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }

  if (type !== "income" && type !== "expense") {
    return res
      .status(400)
      .json({ error: "Type must be either income or expense" });
  }

  req.body.amount = parsedAmount;

  next();
};

app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

app.post("/api/transactions", validateTransaction, (req, res) => {
  const { title, amount, category, type } = req.body;

  const newTransaction = {
    id: uuidv4(),
    title,
    amount,
    category,
    type,
    date: new Date().toISOString(),
  };

  transactions.unshift(newTransaction);
  res.status(201).json(newTransaction);
});

app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;

  const initialLength = transactions.length;
  transactions = transactions.filter((transaction) => transaction.id !== id);

  if (transactions.length === initialLength) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
