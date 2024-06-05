import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";



const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-8 mx-auto max-w-7xl">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-6 space-y-20 ml-10 mt-10">
          <Outlet />
        </div>
        <Toaster/>
      </div>
    </>
  );
}

export default Dashboard
