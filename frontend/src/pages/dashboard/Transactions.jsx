import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import TableData from '@/components/Table/TableData';
import TaskForm from '@/components/tasks/TaskForm';
import api from '@/lib/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const Transactions = () => {

    const [showCreateForm, setCreateForm] = useState(false);
      const [editingTask, setEditingTask] = useState(null);
      let [page, setPage] = useState(1);
       const [filters, setFilters] = useState({
        type: "income",
        date: "",
      });
      let limit = 5;
    
      const handleFormClose = () => {
        setCreateForm(false);
        setEditingTask(null);
      };
    
      const handleCreateTaskClick = () => {
        setCreateForm(true);
      };
    
      const { data, isLoading } = useQuery({    
        queryKey: ["transitions",filters,page],
        queryFn: async () => {
          const {date} = filters
          const response = await api.get(
            `/expenses?date=${date}&page=${page}&limit=${limit}`,
          );
          return response?.data;
        },
        retry: 1,
      });
    
      if (isLoading) return <h2>isLoading....</h2>;
    
      const income = data?.paginatedExpense;
    
      const currentPage = data?.currentPage
      const totalPages = data?.totalPages


  return (
    <div className="mt-20 w-full ">
      {/* Welcome Dashboard */}
      <DashboardWelcome onTaskCreate={handleCreateTaskClick} />
      {/* Task Form Dialog */}
      <TaskForm
        open={showCreateForm || !!editingTask}
        onOpenChange={handleFormClose}
      />

      {/* Filters */}
      <div className="flex gap-2 m-4">
        <button onClick={() => setFilters(f => ({ ...f}))}
        className="font-bold text-lg"
        >
          Filter:
        </button>        

        <select
          value={filters.date}
          onChange={(e) =>
            setFilters(f => ({ ...f, date: e.target.value }))
          }
          className="bg-white py-1 rounded-sm w-40"
        >
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Table  */}
      <TableData data={income} />
      

      {/* Pagination Prev and Next*/}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Transactions