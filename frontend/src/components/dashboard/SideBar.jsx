import useAuthStore from "@/lib/store/authStore";
import {
  ArrowLeftRight,
  FileText,
  LayoutDashboard,
  LogOutIcon,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";

const SideBar = () => {

  const {setClear} = useAuthStore()

  return (
    <div className="hidden md:flex flex-col justify-between fixed top-0 left-0 w-45 h-screen shadow-sm bg-gray-700">
      <div className="flex flex-col gap-4 justify-center">
        {/* LOGO */}
        <div className="flex gap-3 p-4.5 items-center border-b-2 border-gray-600 ">
          <span>
            <Wallet className="w-5 h-5 text-orange-500 font-bold" />
          </span>

          <p className="font-bold text-lg text-white">ExpenseTra</p>
        </div>

        {/* SideBar Menu */}
        <nav className="flex flex-col gap-6 justify-center p-4.5 text-white">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-orange-400 w-5 h-5 font-bold" />
            <Link to="">Dashboard</Link>
          </div>

          <div className="flex items-center gap-3">
            <TrendingDown className="text-orange-400 w-5 h-5" />
            <Link to="expense">Expense</Link>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="text-orange-400 w-5 h-5" />
            <Link to="income">Income</Link>
          </div>

          <div className="flex items-center gap-3">
            <ArrowLeftRight className="text-orange-400 w-5 h-5" />
            <Link to="transaction">Transaction</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <FileText className="text-orange-400 w-5 h-5" />
            <Link to="report">Report</Link>
          </div>
        </nav>
      </div>
      <footer className="w-full py-4">
        <div className="flex items-center gap-2 p-4 bg-gray-500 cursor-pointer text-gray-200">
          <LogOutIcon className="w-5 h-5 " />
          <p onClick={() => setClear()}>Logout</p>
        </div>
      </footer>
    </div>
  );
};

export default SideBar;
