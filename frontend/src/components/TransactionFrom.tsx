import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import type { TransactionFormData, TransactionType } from "../types";
import ErrorPopup from "./errorPopUp";

interface TransactionFormProps {
  onAddTransaction: (transaction: TransactionFormData) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Food",
  "Housing",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education",
  "Personal",
  "Utilities",
  "Savings",
  "Salary",
  "Investments",
  "Gifts",
  "Other",
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    title: "",
    amount: "",
    category: "Other",
    type: "expense",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: TransactionType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    try {
      setIsLoading(true);
      await onAddTransaction(formData);

      setFormData({
        title: "",
        amount: "",
        category: "Other",
        type: "expense",
      });
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in">
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <PlusCircle className="mr-2 text-blue-500" size={22} />
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g., Grocery Shopping"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleTypeChange("expense")}
                  className={`px-4 py-2 rounded-md transition-all flex-1 ${
                    formData.type === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange("income")}
                  className={`px-4 py-2 rounded-md transition-all flex-1 ${
                    formData.type === "income"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-sm ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Adding..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
