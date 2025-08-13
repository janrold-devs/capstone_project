import React from "react";
import { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

const data = [
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
  // State to hold the user's search input
  const [query, setQuery] = React.useState("");

  // State to track the current page number in pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of products to display per page
  const itemsPerPage = 15;

  // Filter the product list based on the user's search query
  const filteredProducts = data.filter((order) =>
    order.ingredient_materialName.toLowerCase().includes(query.toLowerCase())
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
          <strong className="text-lg">Spoiled and Damaged List</strong>

          {/* Top Controls Row */}
          <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
            {/* Buttons - Left Side */}
            <div className="flex items-center gap-3">
              {/* Add Button */}
              <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md">
                + Add Spoiled and Damaged Item
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
                placeholder="Search by ingredient or material name"
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
                  <th className="p-1">Person In Charge</th>
                  <th className="p-1">Ingredient or Material Name</th>
                  <th className="p-1">Quantity</th>
                  <th className="p-1">Total Waste</th>
                  <th className="p-1">Remarks</th>
                  <th className="p-1">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-3 divide-stone-100 text-center">
                {paginatedProducts.map((order) => (
                  <tr key={order.id}>
                    <td className="p-1">{order.personInCharge}</td>
                    <td className="p-1">{order.ingredient_materialName}</td>
                    <td className="p-1">{order.quantity}</td>
                    <td className="p-1">{order.totalWaste}</td>
                    <td className="p-1">{order.remarks}</td>
                    <td className="p-1 w-[150px]">
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
      <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
      giy
    </>
  );
};

export default Spoilage;
