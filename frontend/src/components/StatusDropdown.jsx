import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const StatusDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const options = ["Available", "Not Available"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[25rem]">
      {/* Dropdown button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 bg-[#CEB28D] text-[#6D482E] font-semibold rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <span>{selected || "Select Status"}</span>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-[#6D482E] w-5 h-5" />
        ) : (
          <MdKeyboardArrowDown className="text-[#6D482E] w-5 h-5" />
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-[#CEB28D] rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-[#D9BFA9] hover:text-[#5A3320] rounded-lg"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
