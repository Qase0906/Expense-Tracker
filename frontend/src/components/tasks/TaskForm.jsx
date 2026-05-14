import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";

const TYPE = [
  { value: "income", label: "income" },
  { value: "expense", label: "expense" },
];

const TaskForm = ({ open = true, onOpenChange, transactions }) => {
  const [error, setError] = useState(null);

  const [formValue, setFormValues] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (!open) return;
    if (transactions) {
      setFormValues({
        title: transactions.title || "",
        amount: transactions.amount || "",
        type: transactions.type || "income",
        category: transactions.category || "",
        date: transactions.date?.split("T")[0] || "",
      });
    } else {
      setFormValues({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });
    }
  }, [transactions, open]);

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectedValue = (value) => {
    setFormValues((prev) => ({ ...prev, type: value }));
  };

  const queryClient = useQueryClient();

  const createTransMutation = useMutation({
    mutationKey: ["expenses"],
    mutationFn: async (trans) => {
      const response = await api.post("/expenses", trans);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      onOpenChange(false);
      setFormValues({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });
    },
    onError: () => {},
  });

  const updateTransMutation = useMutation({
    mutationKey: ["expenses"],
    mutationFn: async (newTrans) => {
      try {
        console.log("Transaction Id", transactions._id);
        const response = await api.put(
          `/expenses/${transactions._id}`,
          newTrans,
        );
        console.log("API RESPONSE", response);
        return response.data;
      } catch (error) {
        console.log("API ERROR", error);
      }
    },
    onSuccess: () => {
      toast.success(
        `Transaction successfully ${transactions.title} has been updated`,
      );
      queryClient.invalidateQueries(["expenses"]);
      onOpenChange(false);
      setFormValues({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });
    },
    onError: (err) => {
      console.log("Error Updating", err);
      toast.error(`Failed updating`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formValue.title || !formValue.amount) {
      setError("all fields are required");
      return;
    }

    const trans = {
      title: formValue.title.trim(),
      amount: formValue.amount,
      type: formValue.type,
      category: formValue.category || "",
      date: formValue.date,
    };

    if (transactions) {
      updateTransMutation.mutate(trans);
    } else {
      createTransMutation.mutate(trans);
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader className={"text-center pt-2"}>
          <DialogTitle>
            {transactions ? "Update Transaction":"Create new Transaction"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to {transactions ? "Update Transaction":"Create new Transaction"}
          </DialogDescription>
        </DialogHeader>

        {error && <div className="bg-destructive/40 p-2">{error}</div>}

        {/* Form */}
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            {/* title */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                type="text"
                name="title"
                value={formValue.title}
                onChange={handleFormValues}
                placeholder="title"
                id="title"
              />
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount*</Label>
              <Input
                type="text"
                name="amount"
                value={formValue.amount}
                onChange={handleFormValues}
                placeholder="amount"
                id="amount"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="cat">Category</Label>
              <Input
                type="text"
                name="category"
                value={formValue.category}
                onChange={handleFormValues}
                placeholder="category"
                id="cat"
              />
            </div>

            {/* Date and type */}
            <div className="flex w-full gap-4 items-center">
              {/* Date */}
              <div className="flex flex-col gap-2 flex-1/2">
                <Label htmlFor="date">date</Label>
                <Input
                  type="date"
                  name="date"
                  value={formValue.date}
                  onChange={handleFormValues}
                  placeholder="date"
                  id="date"
                />
              </div>

              {/* type */}
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="type">
                  Type<span className="text-primary">*</span>
                </Label>
                <Select
                  className="w-full"
                  value={formValue.type}
                  onValueChange={handleSelectedValue}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TYPE.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between mt-4 space-x-2 items-center">
              {/* Button */}
              <Button
                type="submit"
                disabled={
                  createTransMutation.isPending || updateTransMutation.isPending
                }
              >
                {transactions
                  ? updateTransMutation.isPending
                    ? "Updating..."
                    : "Update Task"
                  : createTransMutation.isPending
                    ? "Creating..."
                    : "Create Task"}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
