import useQueryHook from "@/CustomHooks/useQueryHook";
import api from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const getCategoryAndValue = (data) => {
  const items = data?.getExpense || [];
  
  const responseData = Object.values(
    items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { category: item.category, amount: 0 };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {}),
  );

  return responseData;
};

// const data = [
//   { name: "Food", value: 400 },
//   { name: "Transport", value: 300 },
//   { name: "Entertainment", value: 200 },
//   { name: "Bills", value: 100 },
// ];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28EFF",
  "#FF6699",
  "#33CC99",
  "#FF4444",
  "#66CCFF",
  "#B6E880",
];

const CategoryExpenseChart = () => {
  const { expenseData, isLoading } = useQueryHook();  
  
  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center mx-auto">
        <h2>
          <Loader className="animate-spin" />
        </h2>
      </div>
    );

  const resultData = getCategoryAndValue(expenseData);

   
  const sorted = [...resultData].sort((a, b) => b.amount - a.amount);

  const top5 = sorted.slice(0, 4);
  const others = sorted.slice(5);

  const othersTotal = others.reduce((sum, item) => sum + item.amount, 0);

  const finalData = othersTotal
    ? [...top5, { category: "Others", amount: othersTotal }]
    : top5;

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-lg font-bold text-gray-700 px-4 pb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={finalData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={40} 
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            label
          >
            {finalData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryExpenseChart;
