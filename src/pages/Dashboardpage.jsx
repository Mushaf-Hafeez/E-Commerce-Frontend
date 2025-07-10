import Sidebar from "../custom_components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboardpage = () => {
  return (
    <div className="min-h-[90vh] w-full flex gap-2">
      <div className="h-full w-2/12 sm:w-2/12">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboardpage;
