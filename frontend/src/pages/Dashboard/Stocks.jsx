import React, { useState } from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import AddForm from "../../components/StockForm/AddForm";
import DashboardLayout from "../../components/layouts/DashboardLayout";

// Static dataset (mock data) for stock records
const data = [
  {
    id: 1,
    batchNumber: 202000101,
    stockmanName: "John Joe",
    date: "March 1, 2024",
  },
  {
    id: 2,
    batchNumber: 202000102,
    stockmanName: "Maria Cruz",
    date: "March 2, 2024",
  },
  {
    id: 3,
    batchNumber: 202000103,
    stockmanName: "Peter Santos",
    date: "March 3, 2024",
  },
  {
    id: 4,
    batchNumber: 202000104,
    stockmanName: "Ana Dela Cruz",
    date: "March 4, 2024",
  },
  {
    id: 5,
    batchNumber: 202000105,
    stockmanName: "Carlos Reyes",
    date: "March 5, 2024",
  },
  {
    id: 6,
    batchNumber: 202000106,
    stockmanName: "Sophia Tan",
    date: "March 6, 2024",
  },
  {
    id: 7,
    batchNumber: 202000107,
    stockmanName: "Miguel Garcia",
    date: "March 7, 2024",
  },
  {
    id: 8,
    batchNumber: 202000108,
    stockmanName: "Ella Lopez",
    date: "March 8, 2024",
  },
  {
    id: 9,
    batchNumber: 202000109,
    stockmanName: "David Lim",
    date: "March 9, 2024",
  },
  {
    id: 10,
    batchNumber: 202000110,
    stockmanName: "Grace Fernandez",
    date: "March 10, 2024",
  },
  {
    id: 11,
    batchNumber: 202000111,
    stockmanName: "Nathaniel Ramos",
    date: "March 11, 2024",
  },
  {
    id: 12,
    batchNumber: 202000112,
    stockmanName: "Olivia Chen",
    date: "March 14, 2024",
  },
  {
    id: 13,
    batchNumber: 202000113,
    stockmanName: "Patrick O'Reilly",
    date: "March 17, 2024",
  },
  {
    id: 14,
    batchNumber: 202000114,
    stockmanName: "Quinn Harrison",
    date: "March 20, 2024",
  },
  {
    id: 15,
    batchNumber: 202000115,
    stockmanName: "Rachel Simmons",
    date: "March 23, 2024",
  },
  {
    id: 16,
    batchNumber: 202000116,
    stockmanName: "Samuel Torres",
    date: "March 26, 2024",
  },
  {
    id: 17,
    batchNumber: 202000117,
    stockmanName: "Tiffany Wong",
    date: "March 29, 2024",
  },
  {
    id: 18,
    batchNumber: 202000118,
    stockmanName: "Umar Khan",
    date: "April 1, 2024",
  },
  {
    id: 19,
    batchNumber: 202000119,
    stockmanName: "Victoria Adams",
    date: "April 4, 2024",
  },
  {
    id: 20,
    batchNumber: 202000120,
    stockmanName: "William Zhang",
    date: "April 7, 2024",
  },
];

const Stocks = () => {
  // --- State Management ---
  const [query, setQuery] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Pagination page number
  const [showAdd, setShowAdd] = useState(false); // Toggle Add Form modal
  const itemsPerPage = 15; // How many rows to display per page

  // --- Search Filtering ---
  // Filters stock records by batch number (search input)
  const filteredProducts = data.filter((item) =>
    item.batchNumber.toString().includes(query.toLowerCase())
  );

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout activeMenu="Stocks">
      <div className="flex flex-col transition-all duration-300">
        {/* Main Content Area */}
        <div
          className={`bg-stone-100 p-2 rounded-lg border border-gray-200 flex flex-col transition-all duration-300 ${
            showAdd ? "blur-sm pointer-events-none" : ""
          }`}
        >
          <strong className="text-lg">Stock List</strong>

          {/* --- Top Controls Section --- */}
          <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
            {/* Left Side: Add + Export Buttons */}
            <div className="flex items-center gap-3">
              {/* Add Stock Button (opens modal) */}
              <button
                className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md"
                onClick={() => setShowAdd(true)}
              >
                + Add Stock
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-300"></div>

              {/* Export Buttons (Excel, PDF, Print) */}
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

            {/* Right Side: Search Input */}
            <div className="flex-1 max-w-xs relative">
              <input
                className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                type="text"
                placeholder="Search by Batch Number"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value); // Update search query
                  setCurrentPage(1); // Reset to first page on new search
                }}
              />
              {/* Search Icon inside input */}
              <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* --- Table Section --- */}
          <div className="mt-3 flex flex-col flex-grow">
            <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-250px)] overflow-hidden">
              <div
                className="overflow-y-auto flex-grow"
                style={{ scrollbarGutter: "stable" }}
              >
                <table className="w-full text-sm rounded-lg table-fixed">
                  {/* Table Header */}
                  <thead className="border-b-3 border-stone-100 text-center bg-white sticky top-0 z-10">
                    <tr>
                      <th className="p-2 text-left w-[200px] rounded-tl-lg">
                        BATCH NUMBER
                      </th>
                      <th className="p-2 text-left w-[300px]">STOCKMAN NAME</th>
                      <th className="p-2 text-left w-[200px] rounded-tr-lg">
                        DATE
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y-3 divide-stone-100 text-center">
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="p-2 text-left w-[200px] font-semibold">
                            {order.batchNumber}
                          </td>
                          <td className="p-2 text-left w-[300px]">
                            {order.stockmanName}
                          </td>
                          <td className="p-2 text-left w-[200px]">
                            {order.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      // No records found state
                      <tr>
                        <td
                          colSpan="3"
                          className="p-4 text-center text-gray-500"
                        >
                          No stock records found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* --- Pagination Controls --- */}
          <div className="mt-2 pt-2">
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                {/* Previous Page */}
                <button
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {/* Current Page Indicator */}
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Page */}
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
        </div>

        {/* --- Add Stock Modal --- */}
        {showAdd && (
          <AddForm isVisible={showAdd} onClose={() => setShowAdd(false)} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Stocks;
