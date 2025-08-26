import React from "react";
import fBg from "../../assets/images/f-bg.png";
import IngredientsDropdown from "../Dropdowns/IngredientsDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";

const AddForm = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
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
            Add New User Information
          </h3>

          {/* Form */}
          <form>
            {/* Two Column Layout */}
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Main Form Fields */}
              <div className="flex flex-col gap-3">
                {/* Select User */}
                <UserDropdown />

                {/* Batch Number */}
                <input
                  type="number"
                  placeholder="Batch Number"
                  required
                  className="w-full px-3 py-2 bg-[#CEB28D] text-[#6D482E]
      placeholder-[#6D482E] font-semibold rounded-lg shadow-sm
      focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
                />

                {/* Date */}
                <input
                  type="date"
                  placeholder="Expiration Date"
                  required
                  className="w-full max-w-md px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
      font-semibold rounded-lg shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
                />
              </div>
              {/* Right Column - Ingredients */}
              <div className="flex flex-col">
                <IngredientsDropdown />
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
