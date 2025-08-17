import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const IngredientsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const options = [
    "Milk",
    "Tapioca",
    "Chocolate Syrup",
    "Buko Pandan",
    "Chocolate Kisses",
  ];

  const handleSelect = (option) => {
    if (!selected.includes(option)) {
      setSelected([...selected, option]);
    }
    setIsOpen(false);
  };

  const removeOption = (option) => {
    setSelected(selected.filter((item) => item !== option));
  };

  return (
    <div className="relative w-[25rem]">
      {/* Dropdown button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 bg-[#CEB28D] text-[#6D482E] font-semibold rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <div className="flex flex-wrap gap-2">
          {selected.length > 0 ? (
            selected.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 bg-[#6D482E] text-white px-2 py-1 rounded-lg text-xs shadow-md"
              >
                {item}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent dropdown toggle
                    removeOption(item);
                  }}
                  className="text-white hover:text-red-400 font-bold"
                >
                  ✕
                </button>
              </span>
            ))
          ) : (
            <span className="text-[#6D482E]">Select the Ingredients</span>
          )}
        </div>
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

export default IngredientsDropdown;
