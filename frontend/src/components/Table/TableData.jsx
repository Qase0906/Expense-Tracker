import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Edit, MoreVertical, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@/lib/api/apiClient";
import { toast } from "sonner";
import TaskForm from "../tasks/TaskForm";

const TableData = ({ data }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowDialog = (item) => {
    setShowDeleteDialog(true);
    setTransaction(item);
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["expenses"],
    mutationFn: async (id) => {
      const response = await api.delete(`/expenses/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  // Handle Delete
  const handleDelete = async () => {
    if (!transaction) return;
    try {
      await deleteMutation.mutateAsync(transaction._id);
      toast.success(`Transaction ${transaction.title} deleted`);
      setShowDeleteDialog(false);
      setTransaction(null);
    } catch (error) {
      toast.error(`Error Deleting ${transaction.title}`);
      console.log("error deleting", error);
    }
  };

  // Handle Edit
  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenTaskForm(true);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md ">
      <Table>
        {/* <TableCaption>A list of your recent expenses.</TableCaption> */}
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow
              key={item._id}
              className={`${index % 2 == 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                {item.createdAt
                  ? new Date(item.createdAt).toISOString().split("T")[0]
                  : ""}
              </TableCell>
              <TableCell
                className={`${item.type == "income" ? "text-green-600" : "text-primary"}`}
              >
                {item.amount}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className={"w-8 h-8 p-2"}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <Edit />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShowDialog(item)}>
                        <Trash2Icon />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Dialgo */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              transacton from Database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {deleteMutation.isPending ? "deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Task Form Dialog */}
      <TaskForm
        open={openTaskForm}
        onOpenChange={setOpenTaskForm}
        transactions={selectedItem}
      />
    </div>
  );
};

export default TableData;
