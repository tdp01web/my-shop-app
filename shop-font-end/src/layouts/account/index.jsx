import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AccountLayout = () => {
  return (
    <div className="2xl:w-4/5 2xl:mx-auto md:px-10 my-4 md:my-0 px-4 grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-3">
        <Sidebar />
      </div>

      <div className="col-span-12 md:col-span-9 bg-white rounded">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
