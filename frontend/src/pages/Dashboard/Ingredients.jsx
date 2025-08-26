import React, { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddForm from "../../components/IngForm/AddForm";
import EditForm from "../../components/IngForm/EditForm";

// -------------------- Sample Ingredient/Material Data --------------------
const data = [
  {
    id: 1,
    name: "Milk",
    quantity: "42",
    unit: "Liter",
    alert: "On Stock",
    expiration: "2025-11-25",
    remarks: "First Batch",
  },
  {
    id: 2,
    name: "Sugar",
    quantity: "5",
    unit: "Kilogram",
    alert: "Low Stock",
    expiration: "2026-12-15",
    remarks: "Second Batch",
  },
  {
    id: 3,
    name: "Flour",
    quantity: "0",
    unit: "Kilogram",
    alert: "No Stock",
    expiration: "2024-10-10",
    remarks: "Third Batch",
  },
  {
    id: 4,
    name: "Butter",
    quantity: "15",
    unit: "Block",
    alert: "On Stock",
    expiration: "2025-02-05",
    remarks: "First Batch",
  },
  {
    id: 5,
    name: "Cheese",
    quantity: "2",
    unit: "Block",
    alert: "Low Stock",
    expiration: "2029-11-28",
    remarks: "Second Batch",
  },
  {
    id: 6,
    name: "Cream",
    quantity: "0",
    unit: "Liter",
    alert: "No Stock",
    expiration: "2034-09-14",
    remarks: "Third Batch",
  },
  {
    id: 7,
    name: "Coffee Beans",
    quantity: "25",
    unit: "Kilogram",
    alert: "On Stock",
    expiration: "2025-12-30",
    remarks: "First Batch",
  },
  {
    id: 8,
    name: "Chocolate Syrup",
    quantity: "3",
    unit: "Bottle",
    alert: "Low Stock",
    expiration: "2028-12-01",
    remarks: "Second Batch",
  },
  {
    id: 9,
    name: "Tea Leaves",
    quantity: "0",
    unit: "Kilogram",
    alert: "No Stock",
    expiration: "2027-08-31",
    remarks: "Third Batch",
  },
  {
    id: 10,
    name: "Ice Cream",
    quantity: "18",
    unit: "Tub",
    alert: "On Stock",
    expiration: "2025-03-20",
    remarks: "First Batch",
  },
  {
    id: 11,
    name: "Whipped Cream",
    quantity: "24",
    unit: "Can",
    alert: "On Stock",
    expiration: "2025-04-15",
    remarks: "Aerosol cans",
  },
  {
    id: 12,
    name: "Caramel Syrup",
    quantity: "3",
    unit: "Bottle",
    alert: "Low Stock",
    expiration: "2026-01-30",
    remarks: "500ml bottles",
  },
  {
    id: 13,
    name: "Matcha Powder",
    quantity: "0",
    unit: "Kilogram",
    alert: "No Stock",
    expiration: "2024-12-01",
    remarks: "Premium grade",
  },
  {
    id: 14,
    name: "Vanilla Extract",
    quantity: "8",
    unit: "Bottle",
    alert: "On Stock",
    expiration: "2027-05-20",
    remarks: "Pure extract",
  },
  {
    id: 15,
    name: "Cinnamon Sticks",
    quantity: "1",
    unit: "Pack",
    alert: "Low Stock",
    expiration: "2025-09-10",
    remarks: "50g pack",
  },
  {
    id: 16,
    name: "Condensed Milk",
    quantity: "15",
    unit: "Can",
    alert: "On Stock",
    expiration: "2025-07-25",
    remarks: "Sweetened",
  },
  {
    id: 17,
    name: "Tapioca Pearls",
    quantity: "0",
    unit: "Kilogram",
    alert: "No Stock",
    expiration: "2024-11-15",
    remarks: "Black pearls",
  },
  {
    id: 18,
    name: "Honey",
    quantity: "5",
    unit: "Bottle",
    alert: "Low Stock",
    expiration: "2028-03-01",
    remarks: "Organic",
  },
  {
    id: 19,
    name: "Cocoa Powder",
    quantity: "12",
    unit: "Kilogram",
    alert: "On Stock",
    expiration: "2026-08-18",
    remarks: "Dutch processed",
  },
  {
    id: 20,
    name: "Almond Milk",
    quantity: "2",
    unit: "Liter",
    alert: "Low Stock",
    expiration: "2025-01-05",
    remarks: "Unsweetened",
  },
];

// -------------------- Main Component --------------------
const Ingredients = () => {
  // -------------------- State Management --------------------
  const [query, setQuery] = useState(""); // search query for filtering
  const [currentPage, setCurrentPage] = useState(1); // pagination tracker
  const itemsPerPage = 15; // items per page
  const [showDelete, setShowDelete] = useState(false); // delete modal
  const [showAdd, setShowAdd] = useState(false); // add modal
  const [showEdit, setShowEdit] = useState(false); // edit modal

  // -------------------- Filtering & Pagination --------------------
  const filteredProducts = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // -------------------- Helpers --------------------
  // Set badge color based on stock status
  const getStatusColor = (alert) => {
    switch (alert) {
      case "On Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "No Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Highlight expiration date if within 7 days
  const getExpirationColor = (expirationDate) => {
    const today = new Date();
    const expire = new Date(expirationDate);
    const diffDays = Math.ceil((expire - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 ? "text-red-600 font-semibold" : "text-black";
  };

  return (
    <div className="p-6 h-screen flex flex-col relative">
      {/* -------------------- Main Table Content -------------------- */}
      <div
        className={`bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow transition-all duration-300 ${
          showDelete || showAdd || showEdit ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <strong className="text-lg">Ingredients and Material List</strong>

        {/* -------------------- Top Controls -------------------- */}
        <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
          {/* Left-side: Add button + Export buttons */}
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md"
              onClick={() => setShowAdd(true)}
            >
              + Add Ingredient and Material
            </button>

            {/* Divider line */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Export buttons */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white text-sm px-3 py-2 rounded h-[35px] shadow-md">
                <PiMicrosoftExcelLogoFill className="text-lg" />
                Excel
              </button>
              <button className="flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                <FaFilePdf />
                PDF
              </button>
              <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                <IoPrintSharp />
                Print
              </button>
            </div>
          </div>

          {/* Right-side: Search Bar */}
          <div className="flex-1 max-w-xs relative">
            <input
              className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
              type="text"
              placeholder="Search by Name"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
            />
            <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* -------------------- Table -------------------- */}
        <div className="mt-3 flex flex-col flex-grow">
          <div className="bg-white rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden">
            <div
              className="overflow-x-auto overflow-y-auto flex-grow max-h-[calc(100vh-250px)]"
              style={{ scrollbarGutter: "stable" }}
            >
              <table
                className="w-full text-sm rounded-lg table-fixed"
                style={{ minWidth: "900px" }}
              >
                {/* Table Head */}
                <thead className="border-b-3 border-stone-100 text-center bg-white sticky top-0 z-10">
                  <tr>
                    <th className="p-2 text-left w-[150px] rounded-tl-lg">
                      NAME
                    </th>
                    <th className="p-2 text-center w-[80px]">QUANTITY</th>
                    <th className="p-2 text-center w-[80px]">UNIT</th>
                    <th className="p-2 text-center w-[120px]">STOCK STATUS</th>
                    <th className="p-2 text-center w-[120px]">EXPIRATION</th>
                    <th className="p-2 text-left w-[150px]">REMARKS</th>
                    <th className="p-2 text-center w-[150px] rounded-tr-lg">
                      ACTION
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y-3 divide-stone-100 text-center">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="p-2 text-left w-[150px] font-semibold">
                          {order.name}
                        </td>
                        <td className="p-2 w-[80px]">{order.quantity}</td>
                        <td className="p-2 w-[80px]">{order.unit}</td>
                        <td className="p-2 w-[120px]">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              order.alert
                            )}`}
                          >
                            {order.alert}
                          </span>
                        </td>
                        <td
                          className={`p-2 w-[120px] ${getExpirationColor(
                            order.expiration
                          )}`}
                        >
                          {order.expiration}
                        </td>
                        <td className="p-2 text-left w-[150px]">
                          {order.remarks}
                        </td>
                        <td className="p-2 w-[150px]">
                          <div className="flex items-center justify-center gap-3">
                            {/* Edit Button */}
                            <button
                              className="flex items-center gap-[3px] text-blue-600 hover:underline text-xs"
                              onClick={() => setShowEdit(true)}
                            >
                              <FiEdit className="text-sm" />
                              Edit
                            </button>
                            {/* Delete Button */}
                            <button
                              className="flex items-center gap-[3px] text-red-600 hover:underline text-xs"
                              onClick={() => setShowDelete(true)}
                            >
                              <RiDeleteBin5Line className="text-sm" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Empty state if no matches found
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-500">
                        No ingredient or materials found matching your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* -------------------- Pagination -------------------- */}
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-4">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- Modals -------------------- */}
      {showDelete && (
        <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
      )}
      {showAdd && (
        <AddForm isVisible={showAdd} onClose={() => setShowAdd(false)} />
      )}
      {showEdit && (
        <EditForm isVisible={showEdit} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
};

export default Ingredients;
