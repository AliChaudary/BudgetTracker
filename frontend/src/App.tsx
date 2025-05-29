import "./App.css";

import TransactionForm from "./components/TransactionFrom";
import TransactionTable from "./components/TransactionTable";
import CategoryChart from "./components/CategoryChart";
import Summary from "./components/summary";
import ErrorPopup from "./components/errorPopUp";
import { addTransaction, deleteTransaction, fetchTransactions } from "./api";
import type { Transaction, TransactionFormData } from "./types";
import { useEffect, useState } from "react";
import { DollarSign, PlusCircle } from "lucide-react";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error loading transactions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleAddTransaction = async (formData: TransactionFormData) => {
    try {
      const newTransaction = await addTransaction(formData);
      setTransactions((prev) => [newTransaction, ...prev]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding transaction:", err);
      throw err;
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting transaction:", err);
    }
  };
  return (
    <div className="min-h-full bg-gray-100 flex flex-col w-full justify-between">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 shadow-md w-fukk">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <DollarSign className="mr-2" size={28} />
              Budget Tracker
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              <PlusCircle className="mr-2" size={20} />
              Add Transaction
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 w-full">
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading your transactions...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <Summary transactions={transactions} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1">
                <CategoryChart transactions={transactions} />
              </div>

              {/* Right Column */}
              <div className=" lg:col-span-2">
                <TransactionTable
                  transactions={transactions}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <TransactionForm
        onAddTransaction={handleAddTransaction}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <footer className="bg-gray-800 text-gray-400 py-4 mt-auto w-full">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            Budget Tracker &copy; {new Date().getFullYear()} - Keep your
            finances under control
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
