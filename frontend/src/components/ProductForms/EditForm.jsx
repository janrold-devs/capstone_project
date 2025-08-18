import React, { useState } from "react";
import fBg from "../../assets/images/f-bg.png";
import CategoryDropdown from "../Dropdowns/CategoryDropdown";
import IngredientsDropdown from "../Dropdowns/IngredientsDropdown";
import StatusDropdown from "../Dropdowns/StatusDropdown";

const AddForm = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  // State
  const [price, setPrice] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    size: "",
    category: "",
    ingredients: [],
    status: "",
    image: null,
  });

  // Size and price mapping
  const sizePrices = {
    "12 oz": 29,
    "16 oz": 39,
    "22 oz": 49,
  };

  // Handle size select
  const handleSizeChange = (size) => {
    setFormData({ ...formData, size });
    setPrice(sizePrices[size]); // Autofill price
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, price };
    console.log("Submitting product:", finalData);
    // TODO: send data to API
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div
        className="relative rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-300"
        style={{ minWidth: "600px", maxWidth: "95vw" }}
      >
        {/* Background */}
        <div
          className="absolute rounded-lg inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fBg})`, opacity: 0.7 }}
        ></div>

        {/* Foreground content */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-center mb-4 text-[#3E2C20] drop-shadow">
            Edit Product Details
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Main Form Fields */}
              <div className="flex flex-col gap-3">
                {/* Product Name */}
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                  className="w-full px-3 py-2 bg-[#CEB28D] text-[#6D482E]
                  placeholder-[#6D482E] font-semibold rounded-lg shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
                />

                {/* Category Dropdown */}
                <CategoryDropdown
                  onChange={(val) =>
                    setFormData({ ...formData, category: val })
                  }
                />

                {/* Radio selection - Select Size */}
                <div className="flex flex-col bg-[#CEB28D] px-3 py-2 rounded-lg shadow-sm text-[#6D482E] font-semibold">
                  <span className="mb-2">Select Size:</span>
                  <div className="flex gap-4">
                    {Object.keys(sizePrices).map((size) => (
                      <label key={size} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="size"
                          checked={formData.size === size}
                          className="accent-[#6D482E]"
                          onChange={() => handleSizeChange(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Auto-filled Price */}
                <input
                  type="number"
                  name="price"
                  value={price}
                  placeholder="Price"
                  readOnly
                  className="w-full px-3 py-2 bg-[#CEB28D] text-[#6D482E]
                  placeholder-[#6D482E] font-semibold rounded-lg shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
                />

                {/* Status Dropdown */}
                <StatusDropdown
                  onChange={(val) => setFormData({ ...formData, status: val })}
                />

                {/* Image upload */}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#CEB28D] text-[#6D482E]
                  file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 
                  file:bg-[#6D482E] file:text-white file:cursor-pointer
                  font-semibold rounded-lg shadow-sm cursor-pointer"
                />
              </div>

              {/* Right Column - Ingredients */}
              <div className="flex flex-col">
                <IngredientsDropdown
                  onChange={(val) =>
                    setFormData({ ...formData, ingredients: val })
                  }
                />
              </div>
            </div>

            {/* Buttons - Full Width Below Both Columns */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="bg-[#A2AAB9] text-black shadow-lg rounded px-4 py-2
                text-sm font-medium hover:bg-[#8893A5]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white shadow-lg rounded px-4 py-2
                text-sm font-medium hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
