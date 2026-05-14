import React, { useState } from "react";
import { Button } from "../ui/button";
import useAuthStore from "@/lib/store/authStore";
import { useLocation } from "react-router";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";

const DashboardWelcome = ({ onTaskCreate}) => {
  const { user } = useAuthStore();

  return (
    <div className="px-4 pb-4 flex flex-col md:flex-row space-y-4 justify-between items-center md:my-3 md:pt-4">
      <div className="text-xl font-bold text-muted-foreground">
        <h2>Welcome Back,{user.name}!</h2>
      </div>

      <div>
        <Button onClick={onTaskCreate} className="text-base cursor-pointer">
          Create Transaction
        </Button>
      </div>
    </div>
  );
};

export default DashboardWelcome;
