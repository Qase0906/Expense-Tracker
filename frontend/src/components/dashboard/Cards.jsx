import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader, WalletIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";
import useAuthStore from "@/lib/store/authStore";

export const getIncomeExpense = (data) => {
  const items = data?.getExpense;

  const totalIncome = items
    .filter((inc) => inc.type === "income")
    .reduce((sum, inc) => sum + inc.amount, 0);

  const totalExpense = items
    .filter((exp) => exp.type === "expense")
    .reduce((sum, exp) => sum + exp.amount, 0);

  const balance = totalIncome - totalExpense;

  return { balance, totalIncome, totalExpense };
};

const Cards = () => {
  const { token } = useAuthStore();

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
      <div className="flex h-screen w-full mx-auto items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );

  
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <h2>No data available</h2>;
  }

  const { balance, totalIncome, totalExpense } = getIncomeExpense(data);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Balace */}
      <Card className={"ring-0 shadow-sm rounded-sm"}>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="bg-indigo-100 p-2 rounded-full">
                <WalletIcon className="w-6 h-6 text-indigo-600 font-bold" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-gray-500 text-base">Total Balace</p>
            <p className="text-gray-700 text-xl font-bold">
              {balance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Income */}
      <Card className={"ring-0 shadow-sm rounded-sm"}>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="bg-green-100 p-2 rounded-full">
                <WalletIcon className="w-6 h-6 text-green-600 font-bold" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-gray-500 text-base">Total Income</p>
            <p className="text-gray-700 text-xl font-bold">
              {totalIncome.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Expense */}
      <Card className={"ring-0 shadow-sm rounded-sm"}>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="bg-orange-100 p-2 rounded-full">
                <WalletIcon className="w-6 h-6 text-orange-600 font-bold" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-gray-500 text-base">Total Expense</p>
            <p className="text-gray-700 text-xl font-bold">
              {totalExpense.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card className={"ring-0 shadow-sm rounded-sm overflow-auto"}>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="bg-yellow-100 p-2 rounded-full">
                <WalletIcon className="w-6 h-6 text-yellow-600 font-bold" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <p className="text-gray-500 text-base">Budget</p>
            <p className="text-gray-700 text-xl font-bold flex flex-wrap">
              $5,000.00/$8000
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
