import React, { useState } from "react";
import Delete from "../../components/Delete"; // Delete confirmation modal
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddForm from "../../components/ProductForms/AddForm"; // Add new product form
import EditForm from "../../components/ProductForms/EditForm"; // Edit existing product form
import DashboardLayout from "../../components/layouts/DashboardLayout";

// --- Sample Product Data (mock data for now) ---
const data = [
  {
    id: 1,
    image: "",
    productName: "Salted Caramel",
    Size: "16 oz",
    price: 39,
    ingredients: ["Sugar", "Milk", "Tapioca"],
    category: "Fruit Tea",
    status: "Available",
  },
  {
    id: 2,
    image: "",
    productName: "Winter melon Delight",
    Size: "22 oz",
    price: 45,
    ingredients: ["Winter melon", "Cream", "Tapioca"],
    category: "Milk Tea",
    status: "Available",
  },
  {
    id: 3,
    image: "",
    productName: "Matcha Latte",
    Size: "16 oz",
    price: 42,
    ingredients: ["Matcha", "Milk", "Tapioca"],
    category: "Frappe",
    status: "Not Available",
  },
  {
    id: 4,
    image: "",
    productName: "Brown Sugar Pearl",
    Size: "22 oz",
    price: 50,
    ingredients: ["Brown Sugar", "Milk", "Tapioca"],
    category: "Milk Tea",
    status: "Available",
  },
  {
    id: 5,
    image: "",
    productName: "Taro Bliss",
    Size: "16 oz",
    price: 43,
    ingredients: ["Taro", "Milk", "Tapioca"],
    category: "Milk Tea",
    status: "Not Available",
  },
  {
    id: 6,
    image: "",
    productName: "Honey Lemon Tea",
    Size: "12 oz",
    price: 38,
    ingredients: ["Honey", "Lemon", "Black Tea"],
    category: "Fruit Tea",
    status: "Available",
  },
  {
    id: 7,
    image: "",
    productName: "Chocolate Mint Frappe",
    Size: "16 oz",
    price: 65,
    ingredients: ["Chocolate Syrup", "Mint", "Milk", "Ice Cream"],
    category: "Frappe",
    status: "Available",
  },
  {
    id: 8,
    image: "",
    productName: "Thai Milk Tea",
    Size: "22 oz",
    price: 55,
    ingredients: ["Thai Tea Leaves", "Condensed Milk"],
    category: "Specialty Tea",
    status: "Available",
  },
  {
    id: 9,
    image: "",
    productName: "Strawberry Cheesecake",
    Size: "16 oz",
    price: 70,
    ingredients: ["Strawberry", "Cream Cheese", "Graham Cracker"],
    category: "Specialty Drink",
    status: "Not Available",
  },
  {
    id: 10,
    image: "",
    productName: "Ube Latte",
    Size: "12 oz",
    price: 50,
    ingredients: ["Ube Halaya", "Milk", "Purple Yam Powder"],
    category: "Latte",
    status: "Available",
  },
  {
    id: 11,
    image: "",
    productName: "Mango Graham",
    Size: "22 oz",
    price: 60,
    ingredients: ["Mango", "Graham Cracker", "Cream"],
    category: "Specialty Drink",
    status: "Available",
  },
  {
    id: 12,
    image: "",
    productName: "Cookies and Cream",
    Size: "16 oz",
    price: 65,
    ingredients: ["Oreo Cookies", "Milk", "Vanilla Ice Cream"],
    category: "Frappe",
    status: "Available",
  },
  {
    id: 13,
    image: "",
    productName: "Lychee Green Tea",
    Size: "12 oz",
    price: 45,
    ingredients: ["Lychee Syrup", "Green Tea"],
    category: "Fruit Tea",
    status: "Not Available",
  },
  {
    id: 14,
    image: "",
    productName: "Caramel Macchiato",
    Size: "16 oz",
    price: 58,
    ingredients: ["Espresso", "Caramel Syrup", "Steamed Milk"],
    category: "Coffee",
    status: "Available",
  },
  {
    id: 15,
    image: "",
    productName: "Pandan Coconut",
    Size: "12 oz",
    price: 48,
    ingredients: ["Pandan Leaves", "Coconut Milk"],
    category: "Specialty Tea",
    status: "Available",
  },
  {
    id: 16,
    image: "",
    productName: "Blueberry Yogurt",
    Size: "16 oz",
    price: 52,
    ingredients: ["Blueberry", "Yogurt", "Honey"],
    category: "Yogurt Drink",
    status: "Available",
  },
  {
    id: 17,
    image: "",
    productName: "Avocado Coffee",
    Size: "12 oz",
    price: 62,
    ingredients: ["Avocado", "Espresso", "Condensed Milk"],
    category: "Specialty Coffee",
    status: "Not Available",
  },
  {
    id: 18,
    image: "",
    productName: "Cucumber Lime",
    Size: "16 oz",
    price: 42,
    ingredients: ["Cucumber", "Lime", "Mint"],
    category: "Refresher",
    status: "Available",
  },
  {
    id: 19,
    image: "",
    productName: "Red Velvet Latte",
    Size: "12 oz",
    price: 55,
    ingredients: ["Red Velvet Powder", "Milk", "Cream Cheese Foam"],
    category: "Latte",
    status: "Available",
  },
  {
    id: 20,
    image: "",
    productName: "Dalgona Coffee",
    Size: "16 oz",
    price: 60,
    ingredients: ["Instant Coffee", "Sugar", "Hot Water", "Milk"],
    category: "Coffee",
    status: "Available",
  },
];

const Products = () => {
  // --- States ---
  const [query, setQuery] = useState(""); // Search input value
  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const [showDelete, setShowDelete] = useState(false); // Toggle delete modal
  const [showAdd, setShowAdd] = useState(false); // Toggle add product modal
  const [showEdit, setShowEdit] = useState(false); // Toggle edit product modal

  const itemsPerPage = 15; // Number of products per page

  // --- Filtering Products (search by name) ---
  const filteredProducts = data.filter((order) =>
    order.productName.toLowerCase().includes(query.toLowerCase())
  );

  // --- Pagination logic ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Pagination navigation ---
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // --- Status badge styling ---
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Not Available":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout activeMenu="Products">
      <>
        {/* Main Content Wrapper */}
        <div
          className={`p-6 min-h-screen flex flex-col transition-all duration-300 ${
            showDelete || showAdd || showEdit ? "blur-sm" : "" // Blur background when modal is active
          }`}
        >
          <div className="bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow">
            <strong className="text-lg">Product List</strong>

            {/* --- Top Controls (Add, Export, Search) --- */}
            <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
              {/* Left Controls: Add + Export Buttons */}
              <div className="flex items-center gap-3">
                {/* Add Product Button */}
                <button
                  className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md"
                  onClick={() => setShowAdd(true)}
                >
                  + Add Product
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

              {/* Search Bar */}
              <div className="flex-1 max-w-xs relative">
                <input
                  className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                  type="text"
                  placeholder="Search by Name"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1); // Reset to page 1 when searching
                  }}
                />
                <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* --- Table Section --- */}
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
                    {/* Table Header */}
                    <thead className="border-b-3 border-stone-100 text-center bg-white sticky top-0 z-10">
                      <tr>
                        <th className="p-1 text-left w-[280px]">
                          Product Name
                        </th>
                        <th className="p-1 w-[90px]">Size</th>
                        <th className="p-1 w-[90px]">Price</th>
                        <th className="p-1 w-[320px]">Ingredients</th>
                        <th className="p-1 w-[140px]">Category</th>
                        <th className="p-1 w-[110px]">Status</th>
                        <th className="p-1 w-[170px]">Actions</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y-3 divide-stone-100 text-center">
                      {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((order) => (
                          <tr key={order.id}>
                            {/* Product Name + Image */}
                            <td className="p-1 text-left flex items-center gap-2 w-[280px]">
                              {order.image ? (
                                <img
                                  src={order.image}
                                  alt={order.productName}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                  N/A
                                </div>
                              )}
                              <span className="font-medium">
                                {order.productName}
                              </span>
                            </td>

                            {/* Size */}
                            <td className="p-1 w-[90px]">{order.Size}</td>

                            {/* Price */}
                            <td className="p-1 w-[90px]">₱{order.price}</td>

                            {/* Ingredients (badges) */}
                            <td className="p-1 w-[320px]">
                              {Array.isArray(order.ingredients) ? (
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {order.ingredients.map(
                                    (ingredient, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs shadow-sm"
                                      >
                                        {ingredient}
                                      </span>
                                    )
                                  )}
                                </div>
                              ) : (
                                order.ingredients
                              )}
                            </td>

                            {/* Category */}
                            <td className="p-1 w-[140px]">{order.category}</td>

                            {/* Status Badge */}
                            <td className="p-1 w-[110px]">
                              <span
                                className={`px-1 py-1 rounded text-xs shadow-sm font-medium ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>

                            {/* Action Buttons */}
                            <td className="p-1 w-[170px]">
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
                        // Fallback if no product matches search
                        <tr>
                          <td
                            colSpan="7"
                            className="p-4 text-center text-gray-500"
                          >
                            No products found matching your search
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* --- Pagination --- */}
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

        {/* --- Modals --- */}
        {/* Delete Confirmation */}
        <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />

        {/* Add Product Form */}
        {showAdd && (
          <AddForm isVisible={showAdd} onClose={() => setShowAdd(false)} />
        )}

        {/* Edit Product Form */}
        {showEdit && (
          <EditForm isVisible={showEdit} onClose={() => setShowEdit(false)} />
        )}
      </>
    </DashboardLayout>
  );
};

export default Products;
