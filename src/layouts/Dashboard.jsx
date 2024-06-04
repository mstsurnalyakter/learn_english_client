import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div className="relative min-h-screen w-full md:flex lg:mx-auto lg:max-w-7xl px-7 lg:px-2">
      {/* sidebar */}
      <Sidebar/>

      {/* dashboard content */}
      <div className="flex-1 mt-10 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
