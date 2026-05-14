import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const getIncomeByMonth = (data) => {
  const items = data?.getExpense || [];
  
  return Object.values(
    items.reduce((acc, item) => {
      const date = new Date(item.date);
      if (isNaN(date)) return acc;     
      
      const month = date
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();

      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }

      if (item.type?.toLowerCase() === "income") {
        acc[month].income += Number(item.amount) || 0;
      }  

      if (item.type?.toLowerCase() === "expense") {
        acc[month].expense += Number(item.amount) || 0;
      }      

      return acc;
    }, {}),
  );
};

// const data = [
//   { month: "Jan", expenses: 400 },
//   { month: "Feb", expenses: 300 },
//   { month: "Mar", expenses: 500 },
//   { month: "Apr", expenses: 200 },
//   { month: "May", expenses: 450 },
// ];

const MonthlyIncomeExpenseChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.get("/expenses");
      return response?.data;
    },
    retry: 1,
    
  });

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center mx-auto">
        <Loader className="animate-spin" />
      </div>
    );

  const responseIncomeByMonth = getIncomeByMonth(data);
  

  return (
    <div className="bg-white rounded-md">
      <div>
        <h1 className="text-lg font-bold text-gray-700 px-4 pb-4">Income Vs Expense</h1>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={responseIncomeByMonth}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#16A34A" />
          <Bar dataKey="expense" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeExpenseChart;
