import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SideBar from "@/components/dashboard/SideBar";
import { Outlet } from "react-router";

const DashboardPage = () => {
  return (
    <div className="flex h-screen ">
      <SideBar />

      <div className="flex flex-col flex-1 md:ml-45">
        <DashboardHeader/>

        <main className="flex flex-1 ">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;