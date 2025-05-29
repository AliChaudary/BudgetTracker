import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { PieChart, BarChart } from "lucide-react";
import type { Transaction } from "../types";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface CategoryChartProps {
  transactions: Transaction[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [expenseData, setExpenseData] = useState<any>(null);

  useEffect(() => {
    // Process transactions for category chart
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );

    // Group by category and sum amounts
    const categoryTotals = expenseTransactions.reduce(
      (acc: Record<string, number>, transaction) => {
        const { category, amount } = transaction;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      },
      {}
    );

    // Only show the top 5 categories, combine the rest as "Other"
    const categories = Object.keys(categoryTotals);
    let data: Record<string, number> = {};

    if (categories.length > 5) {
      // Sort categories by amount (descending)
      const sortedCategories = categories.sort(
        (a, b) => categoryTotals[b] - categoryTotals[a]
      );

      // Take top 4 categories
      const topCategories = sortedCategories.slice(0, 4);

      // Sum the rest as "Other"
      const otherCategories = sortedCategories.slice(4);
      const otherTotal = otherCategories.reduce(
        (sum, category) => sum + categoryTotals[category],
        0
      );

      // Create the data object with top categories and "Other"
      topCategories.forEach((category) => {
        data[category] = categoryTotals[category];
      });

      if (otherTotal > 0) {
        data["Other"] = otherTotal;
      }
    } else {
      data = categoryTotals;
    }

    // Generate random but visually pleasing colors
    const backgroundColors = [
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(75, 192, 192, 0.8)",
      "rgba(255, 159, 64, 0.8)",
      "rgba(153, 102, 255, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(231, 233, 237, 0.8)",
    ];

    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: backgroundColors.slice(0, Object.keys(data).length),
          borderColor: backgroundColors.map((color) =>
            color.replace("0.8", "1")
          ),
          borderWidth: 1,
        },
      ],
    };

    setExpenseData(chartData);
  }, [transactions]);

  const toggleChartType = () => {
    setChartType((prev) => (prev === "pie" ? "bar" : "pie"));
  };

  if (
    !expenseData ||
    transactions.filter((t) => t.type === "expense").length === 0
  ) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
          Add some expenses to see category breakdown.
        </p>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Expense Breakdown by Category",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Expense Categories
        </h2>
        <button
          onClick={toggleChartType}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          title={`Switch to ${chartType === "pie" ? "bar" : "pie"} chart`}
        >
          {chartType === "pie" ? (
            <BarChart size={20} />
          ) : (
            <PieChart size={20} />
          )}
        </button>
      </div>

      <div className="h-[300px]">
        {chartType === "pie" ? (
          <Pie data={expenseData} options={chartOptions} />
        ) : (
          <Bar
            data={expenseData}
            options={{
              ...chartOptions,
              indexAxis: "y" as const,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
