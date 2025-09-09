import React from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-primary border-r border-gray-200/50 p-5 flex flex-col">
      {/* User Info Section (Boilerplate) */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          {/* Placeholder avatar */}
          <span className="text-black font-semibold">U</span>
        </div>
        <div>
          <p className="text-white font-semibold">John Doe</p>
          <p className="text-gray-300 text-sm">johndoe@email.com</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg text-[14px] transition
                ${
                  activeMenu === item.label
                    ? "bg-[#eab9a5] text-white"
                    : "text-white hover:bg-[#eab9a5]"
                }`}
            >
              <Icon className="text-xl" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
