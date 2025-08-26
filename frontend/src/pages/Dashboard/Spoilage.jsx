import React, { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddForm from "../../components/SpoilageForms/AddForm";
import DashboardLayout from "../../components/layouts/DashboardLayout";

// Sample static dataset for spoiled/damaged items
const data = [
  // Each entry contains person in charge, item name, qty, waste, remarks
  {
    id: 1,
    personInCharge: "John Doe",
    ingredient_materialName: "Milk",
    quantity: 50,
    totalWaste: 100,
    remarks: "Expired",
  },
  {
    id: 2,
    personInCharge: "Jane Smith",
    ingredient_materialName: "Sugar",
    quantity: 30,
    totalWaste: 50,
    remarks: "Contaminated",
  },
  {
    id: 3,
    personInCharge: "Michael Brown",
    ingredient_materialName: "Flour",
    quantity: 75,
    totalWaste: 20,
    remarks: "Damaged packaging",
  },
  {
    id: 4,
    personInCharge: "Emily Davis",
    ingredient_materialName: "Eggs",
    quantity: 200,
    totalWaste: 180,
    remarks: "Spoiled",
  },
  {
    id: 5,
    personInCharge: "Robert Wilson",
    ingredient_materialName: "Butter",
    quantity: 25,
    totalWaste: 10,
    remarks: "Expired",
  },
  {
    id: 6,
    personInCharge: "Sarah Johnson",
    ingredient_materialName: "Yeast",
    quantity: 10,
    totalWaste: 5,
    remarks: "Moisture damage",
  },
  {
    id: 7,
    personInCharge: "David Martinez",
    ingredient_materialName: "Chocolate Chips",
    quantity: 60,
    totalWaste: 15,
    remarks: "Infestation",
  },
  {
    id: 8,
    personInCharge: "Olivia Garcia",
    ingredient_materialName: "Vanilla Extract",
    quantity: 12,
    totalWaste: 4,
    remarks: "Broken bottle",
  },
  {
    id: 9,
    personInCharge: "William Anderson",
    ingredient_materialName: "Strawberries",
    quantity: 40,
    totalWaste: 25,
    remarks: "Overripe",
  },
  {
    id: 10,
    personInCharge: "Sophia Thomas",
    ingredient_materialName: "Lettuce",
    quantity: 35,
    totalWaste: 20,
    remarks: "Wilted",
  },
  {
    id: 11,
    personInCharge: "James Lee",
    ingredient_materialName: "Tomatoes",
    quantity: 50,
    totalWaste: 30,
    remarks: "Bruised",
  },
  {
    id: 12,
    personInCharge: "Ava Perez",
    ingredient_materialName: "Cheese",
    quantity: 45,
    totalWaste: 15,
    remarks: "Expired",
  },
  {
    id: 13,
    personInCharge: "Benjamin Hall",
    ingredient_materialName: "Basil",
    quantity: 20,
    totalWaste: 8,
    remarks: "Dry and brittle",
  },
  {
    id: 14,
    personInCharge: "Isabella Young",
    ingredient_materialName: "Rice",
    quantity: 100,
    totalWaste: 5,
    remarks: "Weevils found",
  },
  {
    id: 15,
    personInCharge: "Mason King",
    ingredient_materialName: "Onions",
    quantity: 55,
    totalWaste: 12,
    remarks: "Rotten",
  },
  {
    id: 16,
    personInCharge: "Mia Wright",
    ingredient_materialName: "Carrots",
    quantity: 70,
    totalWaste: 22,
    remarks: "Soft texture",
  },
];

const Spoilage = () => {
  // Search query state
  const [query, setQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Modal visibility states
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  /**
   * Filter products by search query.
   * Matches against ingredient/material name.
   */
  const filteredProducts = data.filter((item) =>
    item.ingredient_materialName.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout activeMenu="Spoilage">
      <div className="p-6 h-screen flex flex-col relative">
        {/* ---------------- Main Content ---------------- */}
        <div
          className={`bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow transition-all duration-300 ${
            showDelete || showAdd ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <strong className="text-lg">Spoiled and Damaged List</strong>

        {/* ---------------- Top Controls ---------------- */}
        <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            {/* Add Spoiled/Damaged Item Button */}
            <button
              className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md"
              onClick={() => setShowAdd(true)}
            >
              + Add Spoiled/Damaged Item
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Export Buttons */}
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

          {/* Search Input */}
          <div className="flex-1 max-w-xs relative">
            <input
              className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
              type="text"
              placeholder="Search by Ingredient/Material"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
            />
            <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* ---------------- Table Section ---------------- */}
        <div className="mt-3 flex flex-col flex-grow">
          <div className="bg-white rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden">
            {/* Scrollable table wrapper */}
            <div
              className="overflow-x-auto overflow-y-auto flex-grow max-h-[calc(100vh-250px)]"
              style={{ scrollbarGutter: "stable" }}
            >
              <table
                className="w-full text-sm rounded-lg table-fixed"
                style={{ minWidth: "900px" }}
              >
                {/* Table Header */}
                <thead className="border-b-3 border-stone-100 text-center bg-white sticky top-0 z-10">
                  <tr>
                    <th className="p-2 text-left w-[150px] rounded-tl-lg">
                      PERSON IN CHARGE
                    </th>
                    <th className="p-2 text-left w-[200px]">
                      INGREDIENT/MATERIAL
                    </th>
                    <th className="p-2 text-center w-[100px]">QUANTITY</th>
                    <th className="p-2 text-center w-[100px]">TOTAL WASTE</th>
                    <th className="p-2 text-left w-[200px] rounded-tr-lg">
                      REMARKS
                    </th>
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
                          {order.personInCharge}
                        </td>
                        <td className="p-2 text-left w-[200px]">
                          {order.ingredient_materialName}
                        </td>
                        <td className="p-2 w-[100px]">{order.quantity}</td>
                        <td className="p-2 w-[100px]">{order.totalWaste}</td>
                        <td className="p-2 text-left w-[200px]">
                          {order.remarks}
                        </td>
                        <td className="p-2 w-[150px]">
                          {/* Delete Button */}
                          <div className="flex items-center justify-center gap-3">
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
                    // Empty State
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        No spoiled or damaged items found matching your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ---------------- Pagination ---------------- */}
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

      {/* ---------------- Delete Modal ---------------- */}
      {showDelete && (
        <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
      )}

      {/* ---------------- Add Item Form ---------------- */}
      {showAdd && (
        <AddForm isVisible={showAdd} onClose={() => setShowAdd(false)} />
      )}
    </div>
    </DashboardLayout>
  );
};

export default Spoilage;
