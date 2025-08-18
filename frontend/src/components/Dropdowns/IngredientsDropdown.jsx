import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const IngredientsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const options = [
    "Milk",
    "Tapioca",
    "Chocolate Syrup",
    "Buko Pandan",
    "Chocolate Kisses",
  ];

  const handleSelect = (option) => {
    if (!selectedIngredients.some((item) => item.name === option)) {
      setSelectedIngredients([
        ...selectedIngredients,
        { name: option, quantity: "", unit: "" },
      ]);
    }
    setIsOpen(false);
  };

  const removeIngredient = (name) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item.name !== name)
    );
  };

  const updateField = (name, field, value) => {
    setSelectedIngredients(
      selectedIngredients.map((item) =>
        item.name === name ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="relative w-[25rem] space-y-4">
      {/* Dropdown button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 bg-[#CEB28D] text-[#6D482E] font-semibold rounded-xl shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <span className="text-[#6D482E]">
          {selectedIngredients.length > 0
            ? "Add more ingredients/materials"
            : "Select Ingredients/Materials"}
        </span>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-[#6D482E] w-5 h-5" />
        ) : (
          <MdKeyboardArrowDown className="text-[#6D482E] w-5 h-5" />
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-[#CEB28D] rounded-xl shadow-lg z-20 max-h-40 overflow-y-auto scrollbar-hide">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-[#D9BFA9] hover:text-[#5A3320] transition-colors"
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Ingredients Table */}
      {selectedIngredients.length > 0 && (
        <div className="overflow-hidden rounded-xl shadow-md border border-[#D9BFA9]">
          <table className="w-full text-sm">
            <thead className="bg-[#CEB28D] text-[#6D482E]">
              <tr>
                <th className="px-3 py-2 text-left w-2/5">Ing/Mat</th>
                <th className="px-3 py-2 text-left w-1/5">Quantity</th>
                <th className="px-3 py-2 text-left w-2/5">Unit</th>
                <th className="px-3 py-2 text-left w-16">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#EADDC8]">
              {selectedIngredients.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-[#F5EFE6] transition-colors"
                >
                  <td className="px-3 py-2 text-[#6D482E] font-medium">
                    {item.name}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateField(item.name, "quantity", e.target.value)
                      }
                      className="w-16 border border-[#D9BFA9] px-2 py-1 rounded-lg focus:ring-2 focus:ring-[#CEB28D] focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) =>
                        updateField(item.name, "unit", e.target.value)
                      }
                      className="w-full border border-[#D9BFA9] px-2 py-1 rounded-lg focus:ring-2 focus:ring-[#CEB28D] focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => removeIngredient(item.name)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IngredientsDropdown;
