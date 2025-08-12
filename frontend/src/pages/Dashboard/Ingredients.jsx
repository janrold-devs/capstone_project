import React from "react";
import { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

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
    name: "Yogurt",
    quantity: "1",
    unit: "Liter",
    alert: "Low Stock",
    expiration: "2028-10-05",
    remarks: "Second Batch",
  },
];

const Ingredients = () => {
  // State to hold the user's search input
  const [query, setQuery] = React.useState("");

  // State to track the current page number in pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of products to display per page
  const itemsPerPage = 15;

  // Filter the product list based on the user's search query
  const filteredProducts = data.filter((order) =>
    order.name.toLowerCase().includes(query.toLowerCase())
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

  // Get color class for stock alert
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

  // Get color class for expiration date
  const getExpirationColor = (expirationDate) => {
    const today = new Date();
    const expire = new Date(expirationDate);
    const diffTime = expire - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 ? "text-red-600 font-semibold" : "text-black";
  };

  // Delete Modal
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="p-6 min-h-screen flex flex-col">
        <div className="bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow">
          <strong className="text-lg">Ingredients and Material List</strong>

          {/* Top Controls Row */}
          <div
            className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4  p-2 rounded-lg shadow-sm"
            overflow-hidden
          >
            {/* Buttons - Left Side */}
            <div className="flex items-center gap-3">
              {/* Add Product Button */}
              <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md">
                + Add Ingredient and Material
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
                <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2  rounded h-[35px] shadow-md">
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
                placeholder="Search by Name"
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
                  <th className="p-1">Name</th>
                  <th className="p-1">Quantity</th>
                  <th className="p-1">Unit</th>
                  <th className="p-1">Stock Status</th>
                  <th className="p-1">Expiration</th>
                  <th className="p-1">Remarks</th>
                  <th className="p-1 w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-3 divide-stone-100 text-center">
                {paginatedProducts.map((order) => (
                  <tr key={order.id}>
                    <td className="ml-4 font-semibold p-1 text-left flex items-center gap-2">
                      {order.name}
                    </td>
                    <td className="p-1">{order.quantity}</td>
                    <td className="p-1">{order.unit}</td>

                    <td className="p-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          order.alert
                        )}`}
                      >
                        {order.alert}
                      </span>
                    </td>
                    <td
                      className={`p-2 ${getExpirationColor(order.expiration)}`}
                    >
                      {order.expiration}
                    </td>
                    <td className="p-1 text-left">{order.remarks}</td>
                    <td className="p-1 w-[150px]">
                      <div className="flex items-center justify-center gap-3">
                        <button className="flex items-center gap-[3px] text-blue-600 hover:underline text-xs">
                          <FiEdit className="text-sm" />
                          Edit
                        </button>
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
                ))}
              </tbody>
            </table>

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
      </div>
      <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
    </>
  );
};

export default Ingredients;
