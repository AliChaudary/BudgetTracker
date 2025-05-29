import React from "react";
import { Trash2, TrendingDown, TrendingUp, Tag } from "lucide-react";
import type { Transaction } from "../types";

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => Promise<void>;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onDeleteTransaction,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await onDeleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-[]  overflow-hidden mb-6"
      style={{
        boxShadow:
          "rgba(0,0,0,0.05) 0px 6px 24px 0px, rgba(0,0,0,0.08)0px 0px 0px 1px",
      }}
    >
      <div className=" p-6 border-b border-gray-200  flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Transactions
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[608px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">
                Title
              </th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">
                Category
              </th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">
                Date
              </th>
              <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">
                Amount
              </th>
              <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <>
                <td colSpan={5}>
                  <p className="text-gray-500 text-center py-6">
                    No transactions yet. Add your first one!
                  </p>
                </td>
              </>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {transaction.type === "expense" ? (
                        <TrendingDown size={18} className="text-red-500 mr-2" />
                      ) : (
                        <TrendingUp size={18} className="text-green-500 mr-2" />
                      )}
                      <span className="font-medium">{transaction.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Tag size={16} className="text-gray-400 mr-1" />
                      <span>{transaction.category}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-1.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
