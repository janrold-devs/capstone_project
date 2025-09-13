// DashboardLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar (fixed width, no pl-64 hacks) */}
      <div className="w-64 flex-shrink-0">
        <SideMenu activeMenu={activeMenu} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar activeMenu={activeMenu} />
        <main className="flex-1 overflow-auto bg-gray-50 p-2">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
