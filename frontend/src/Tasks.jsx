import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Button } from "./components/ui/button";

export const Tasks = () => {

  const [task, setTasks] = useState();

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async(newTasks) => {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTasks),
      });
      if (!response.ok) return new Error("Error data loading");
      return response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  });

  const handleAdd = () => {
    mutation.mutate({ title: task });
  };

  return (
    <>
      <input type="text" value={task} onChange={(e) => setTasks(e.target.value)} />
      <button onClick={handleAdd}>Submit</button>
      <Button>add task</Button>
    </>
  );
};
