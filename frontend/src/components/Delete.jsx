import React from "react";
import { MdErrorOutline } from "react-icons/md"; // Example warning icon

const Delete = ({ isVisible, onClose }) => {
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
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[320px] flex flex-col items-center">
        {/* Warning Icon in Circle */}
        <div className="bg-red-100 rounded-full p-3 mb-4">
          <MdErrorOutline className="text-red-500 w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-center mb-2">Delete Item</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm text-center mb-5">
          You're going to delete this item. Are you sure?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="bg-gray-200 text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-300"
            onClick={onClose}
          >
            No, Keep it.
          </button>
          <button className="bg-red-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-red-600">
            Yes, Delete It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
