import React, { useState } from "react";


import CategoryExpenseChart from "../Charts/CategoryExpenseChart";
import TaskForm from "../tasks/TaskForm";
import Cards from "./Cards";
import DashboardWelcome from "./DashboardWelcome";
import RecentTransactions from "../Transactions/RecentTransactions";
import MonthlyIncomeExpenseChart from "../Charts/MonthlyIncomeExpenseChart";

const DashboardContent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
 

  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };

  const handleCreateTaskClick = () => {
    setShowCreateForm(true);
  };

  return (
    <div className="w-full p-4 bg-accent md:mt-16 ">
      {/* Welcome Dashboard */}
      <DashboardWelcome 
        onTaskCreate={handleCreateTaskClick}         
      />
      {/* Task Form Dialog */}
      <TaskForm
        open={showCreateForm || !!editingTask}
        onOpenChange={handleFormClose}
      />
      {/* Cards */}{" "}
      <div>
        <Cards/>
      </div>
      {/* CHARTS */}
      <div className="pt-6">
        <h2 className="text-xl pb-4 font-bold text-muted-foreground">Overview</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1/2 p-4 shadow-md bg-white rounded-md">
            <MonthlyIncomeExpenseChart/>
          </div>
          <div className="flex-1 p-4 shadow-md bg-white rounded-md">
            <RecentTransactions/>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-6 gap-4">
          <CategoryExpenseChart />
          <CategoryExpenseChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
