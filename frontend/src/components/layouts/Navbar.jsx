import React from "react";
import { HiOutlineBell, HiOutlineCog } from "react-icons/hi";

const Navbar = () => {
  return (
    <header className="w-full h-14 bg-primary text-white flex justify-end items-center px-6 shadow-md border-b border-black/10 sticky top-0 z-40">
      {/* Right Icons */}
      <nav className="flex items-center space-x-6">
        {/* Bell */}
        <button className="cursor-pointer" title="Notifications">
          <HiOutlineBell className="w-6 h-6" />
        </button>

        {/* Profile Avatar Placeholder */}
        <a
          href="/profile"
          className="bg-gray-600 hover:ring-2 hover:ring-gray-400 transition-all rounded-full w-9 h-9 flex items-center justify-center"
          title="Profile"
        >
          <img
            src="/bg.jpg"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </a>

        {/* Settings */}
        <a href="/dashboard/settings" title="Settings">
          <HiOutlineCog className="w-6 h-6" />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
