import api from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const RecentTransactions = () => {
  let limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["expenses", limit],
    queryFn: async () => {
      const response = await api.get(`/expenses?limit=${limit}`);      
      return response.data?.paginatedExpense;
    },
    retry: 1,    
    onError: (err) => {
      console.error("error when fetching data:", err);
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full ">
      <div className="flex justify-between pb-2 items-center border-b-2">
        <h2 className="text-foreground font-bold text-base ">
          Recent Transactions
        </h2>
        <Link to="#" className="text-indigo-500">
          View all
        </Link>
      </div>
      <div className="">
        {data?.map((item, index) => (
          <div
            key={index}
            className="p-2 border-b-2 flex justify-between items-center gap-4"
          >
            <p>{item.category}</p>
            <p
              className={` ${item.type === "income" ? "text-green-500" : "text-primary"}`}
            >
              ${item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
