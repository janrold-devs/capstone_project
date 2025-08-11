import React from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
const ProductListData = [
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
];

const Products = () => {
  // State to hold the user's search input
  const [query, setQuery] = React.useState("");

  // State to track the current page number in pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of products to display per page
  const itemsPerPage = 10;

  // Filter the product list based on the user's search query
  const filteredProducts = ProductListData.filter((order) =>
    order.productName.toLowerCase().includes(query.toLowerCase())
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
    <div className="p-6">
      <div className=" bg-stone-100 p-4 rounded-lg border border-gray-200 ">
        <strong className="text-lg">Product List</strong>

        {/* Top Controls Row */}
        <div
          className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4  p-2 rounded-lg shadow-sm"
          overflow-hidden
        >
          {/* Buttons - Left Side */}
          <div className="flex items-center gap-3">
            {/* Add Product Button */}
            <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md">
              + Add Product
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
        <div className="mt-3 overflow-x-auto">
          <table className="bg-white w-full text-sm border-collapse rounded-lg shadow-sm overflow-hidden">
            <thead className="border-b-3 border-stone-100 text-center">
              <tr>
                <th className="p-2 w-[300px]">Product Name</th>
                <th className="p-2">Size</th>
                <th className="p-2">Price</th>
                <th className="p-2">Ingredients</th>
                <th className="p-2">Category</th>
                <th className="p-2">Status</th>
                <th className="p-2 w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-3 divide-stone-100 text-center">
              {paginatedProducts.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 w-[300px] text-left flex items-center gap-2">
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
                    <span className="font-medium">{order.productName}</span>
                  </td>
                  <td className="p-2">{order.Size}</td>
                  <td className="p-2">₱{order.price}</td>
                  <td className="p-2">
                    {/* Ingredients are divided by */}
                    {Array.isArray(order.ingredients)
                      ? order.ingredients.join(", ")
                      : order.ingredients}
                  </td>
                  <td className="p-2">{order.category}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-2 w-[150px]">
                    <div className="flex items-center justify-center gap-3">
                      <button className="flex items-center gap-[3px] text-blue-600 hover:underline text-xs">
                        <FiEdit className="text-sm" />
                        Edit
                      </button>
                      <button className="flex items-center gap-[3px] text-red-600 hover:underline text-xs">
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
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-1 hover:underline disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm px-2 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1  hover:underline disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
