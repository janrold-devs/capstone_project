import React, { useState } from "react";
import fBg from "../../assets/images/f-bg.png";
import CategoryDropdown from "../CategoryDropdown";
import IngredientsDropdown from "../IngredientsDropdown";
import StatusDropdown from "../StatusDropdown";

const EditForm = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  // State
  const [price, setPrice] = useState("");

  // Size and price mapping
  const sizePrices = {
    "12 oz": 29,
    "16 oz": 39,
    "22 oz": 49,
  };

  // Handle size select
  const handleSizeChange = (size) => {
    setPrice(sizePrices[size]); // Autofill price
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div
        className="relative rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-300"
        style={{ minWidth: "400px", maxWidth: "95vw" }}
      >
        {/* Background */}
        <div
          className="absolute rounded-lg inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fBg})`, opacity: 0.7 }}
        ></div>

        {/* Foreground content */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-center mb-4 text-[#3E2C20] drop-shadow">
            Edit New Product
          </h3>

          {/* One column layout */}
          <div className="flex flex-col gap-3 items-center">
            {/* Product Name */}
            <input
              type="text"
              placeholder="Product Name"
              required
              className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E]
              placeholder-[#6D482E] font-semibold rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
            />

            {/* Category Dropdown (placeholder) */}
            <CategoryDropdown />

            {/* Radio selection - Select Size */}
            <div className="flex flex-col bg-[#CEB28D] px-3 py-2 rounded-lg shadow-sm w-[25rem] text-[#6D482E] font-semibold">
              <span className="mb-2">Select Size:</span>
              <div className="flex gap-6">
                {Object.keys(sizePrices).map((size) => (
                  <label key={size} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="size"
                      className="accent-[#6D482E]"
                      onChange={() => handleSizeChange(size)}
                    />{" "}
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Auto-filled Price */}
            <input
              type="number"
              value={price}
              placeholder="Price"
              readOnly
              className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E]
              placeholder-[#6D482E] font-semibold rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
            />

            <IngredientsDropdown />

            {/* Status Dropdown  */}
            <StatusDropdown />

            {/* Image upload */}
            <input
              type="file"
              accept="image/*"
              className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E]
              file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 
              file:bg-[#6D482E] file:text-white file:cursor-pointer
              font-semibold rounded-lg shadow-sm cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="bg-[#A2AAB9] text-black shadow-lg rounded px-4 py-2
              text-sm font-medium hover:bg-[#8893A5]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white shadow-lg rounded px-4 py-2
              text-sm font-medium hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
