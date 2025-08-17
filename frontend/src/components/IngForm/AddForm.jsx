import React from "react";
import fBg from "../../assets/images/f-bg.png";
import UnitDropdown from "../UnitDropdown";
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
        style={{ minWidth: "650px", maxWidth: "95vw" }}
      >
        {/* Background image */}
        <div
          className="absolute rounded-lg inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fBg})`, opacity: 0.7 }}
        ></div>

        {/* Foreground content */}
        <div className="relative z-10">
          {/* Title */}
          <h3 className="text-lg font-semibold text-center mb-4 text-[#3E2C20] drop-shadow">
            Add New Ingredient or Material
          </h3>

          {/* Two-column layout */}
          <div className="flex gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
                placeholder-[#6D482E] font-semibold rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
              />
              <UnitDropdown />
              <input
                type="text"
                placeholder="Current Stock"
                required
                className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
                placeholder-[#6D482E] font-semibold rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
              />
              <input
                type="text"
                placeholder="Alert Stock"
                required
                className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
                placeholder-[#6D482E] font-semibold rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3">
              <input
                type="date"
                placeholder="Expiration Date"
                required
                className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
                placeholder-[#6D482E] font-semibold rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
              />
              <input
                type="text"
                placeholder="Batch Number"
                required
                className="w-[25rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
                placeholder-[#6D482E] font-semibold rounded-lg shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-[#A67C59]"
              />
              <textarea
                placeholder="Description"
                required
                className="w-[25rem] h-[5.8rem] px-3 py-2 bg-[#CEB28D] text-[#6D482E] 
                placeholder-[#6D482E] font-semibold rounded-lg shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-[#A67C59] resize-none"
              />
            </div>
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

export default AddForm;
