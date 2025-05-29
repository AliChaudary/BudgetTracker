import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React from "react";
import type { Transaction } from "../types";

interface SummaryProps {
  transactions: Transaction[];
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const getSummaryCardStyle = (isBalance: boolean = false) => {
    if (isBalance) {
      return balance >= 0
        ? "border-green-200 bg-green-50"
        : "border-red-200 bg-red-50";
    }
    return "bg-white";
  };

  const getBalanceTextStyle = () => {
    return balance >= 0 ? "text-green-600" : "text-red-600";
  };

  const formatNumber = (amount: any) => {
    return new Intl.NumberFormat("en-PK").format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white cursor-pointer rounded-lg shadow-md p-5 border-l-4 border-blue-500 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-green-600">
              RS {formatNumber(totalIncome)}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white cursor-pointer rounded-lg shadow-md p-5 border-l-4 border-red-500 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              RS {formatNumber(totalExpenses)}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      <div
        className={`rounded-lg cursor-pointer shadow-md p-5 border-l-4 ${
          balance >= 0 ? "border-green-500" : "border-red-500"
        } transition-all hover:shadow-lg ${getSummaryCardStyle(true)}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
            <p className={`text-2xl font-bold ${getBalanceTextStyle()}`}>
              RS {formatNumber(balance)}
              {balance < 0 && <span> (deficit)</span>}
            </p>
          </div>
          <div
            className={`p-3 rounded-full ${
              balance >= 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Wallet
              className={balance >= 0 ? "text-green-600" : "text-red-600"}
              size={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
