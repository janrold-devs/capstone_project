import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar fixed on the left */}
      <SideMenu activeMenu={activeMenu} />
      
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar always at the top */}
        <Navbar activeMenu={activeMenu} />

        {/* Main content is the only part that scrolls */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
