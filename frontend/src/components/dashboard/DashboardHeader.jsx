import useAuthStore from "@/lib/store/authStore";
import { Clipboard, User, User2, User2Icon, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const DashboardHeader = () => {
  const { user, setClear } = useAuthStore();
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);

  return (
    <div className="flex bg-card border-b-2 md:fixed left-45.25 right-0 z-10 max-w-6xl">
      <div className="w-full max-w-6xl mx-auto p-4 flex justify-between items-center ">
        <div className="flex gap-3 items-center ">
          <span className="text-muted-foreground text-sm">
            Welcome:{" "}
            <span className="text-foreground">{user?.name || "User"} </span>
          </span>
        </div>

        <div 
          className="flex gap-6 items-center "
          onClick={() => setIsProfilePopUp((prev) => !prev)}
        >
          {/* Profile */}
          <div className="relative rounded-full">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 cursor-pointer ">
              <User className="text-gray-500" />
            </div>

            {/* profile popup */}
            {isProfilePopUp && (
              <div className="absolute right-10 w-30 top-4 bg-white p-4 shadow-md rounded-sm">
                <div className="flex flex-col gap-2">
                  <p className="cursor-pointer">
                    <Link to="/profile">Profile</Link>
                  </p>
                  <span className="cursor-pointer" onClick={() => setClear()}>
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
