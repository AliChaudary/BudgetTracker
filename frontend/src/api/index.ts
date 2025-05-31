import axios from "axios";
import type { Transaction, TransactionFormData } from "../types";

const API_URL = "https://budgettracker-lq8c.onrender/api";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const addTransaction = async (
  transaction: TransactionFormData
): Promise<Transaction> => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/transactions/${id}`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
