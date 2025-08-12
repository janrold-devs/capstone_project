import React from "react";
import { useState } from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";

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
];

const Stocks = () => {
  // State to hold the user's search input
  const [query, setQuery] = React.useState("");

  // State to track the current page number in pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of products to display per page
  const itemsPerPage = 15;

  // Filter the product list based on the user's search query
  const filteredProducts = data.filter((order) =>
    order.batchNumber.toString().toLowerCase().includes(query.toLowerCase())
  );

  // Calculate the total number of pages based on the filtered results
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get the products to be shown on the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, // start index
    currentPage * itemsPerPage // end index (non-inclusive)
  );

  // Function to go to the previous page
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to go to the next page
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Delete Modal
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="p-6 min-h-screen flex flex-col">
        <div className="bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow">
          <strong className="text-lg">Stock List</strong>

          {/* Top Controls Row */}
          <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
            {/* Buttons - Left Side */}
            <div className="flex items-center gap-3">
              {/* Add Button */}
              <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md">
                + Add Stock
              </button>

              {/* Vertical Divider */}
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

            {/* Search Bar - Right Side */}
            <div className="flex-1 max-w-xs relative">
              <input
                className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                type="text"
                placeholder="Search by batch number"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
              <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="mt-3 overflow-x-auto flex-grow">
            <table className="bg-white w-full text-sm border-collapse rounded-lg shadow-sm overflow-hidden">
              <thead className="border-b-3 border-stone-100 text-center">
                <tr>
                  <th className="p-1">Batch Number</th>
                  <th className="p-1">Stockman Name</th>
                  <th className="p-1">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y-3 divide-stone-100 text-center">
                {paginatedProducts.map((order) => (
                  <tr key={order.id}>
                    <td className="p-1">{order.batchNumber}</td>
                    <td className="p-1">{order.stockmanName}</td>
                    <td className="p-1">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-auto pt-4">
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-1 hover:underline disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 hover:underline disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stocks;
