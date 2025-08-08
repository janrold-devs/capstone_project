import React from "react";

// Sample Product List
const ProductListData = [
  {
    id: 1,
    name: "Milk",
    quantity: "42",
    unit: "Liter",
    alert: "On Stock",
    expiration: "2025-01-25",
    remarks: "First Batch",
  },
  {
    id: 2,
    name: "Sugar",
    quantity: "5",
    unit: "Kilogram",
    alert: "Low Stock",
    expiration: "2024-12-15",
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
    expiration: "2024-11-28",
    remarks: "Second Batch",
  },
  {
    id: 6,
    name: "Cream",
    quantity: "0",
    unit: "Liter",
    alert: "No Stock",
    expiration: "2024-09-14",
    remarks: "Third Batch",
  },
  {
    id: 7,
    name: "Coffee Beans",
    quantity: "25",
    unit: "Kilogram",
    alert: "On Stock",
    expiration: "2025-06-30",
    remarks: "First Batch",
  },
  {
    id: 8,
    name: "Chocolate Syrup",
    quantity: "3",
    unit: "Bottle",
    alert: "Low Stock",
    expiration: "2024-12-01",
    remarks: "Second Batch",
  },
  {
    id: 9,
    name: "Tea Leaves",
    quantity: "0",
    unit: "Kilogram",
    alert: "No Stock",
    expiration: "2024-08-31",
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
    expiration: "2024-10-05",
    remarks: "Second Batch",
  },
];

// Main Component
const Ingredients = () => {
  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filter by search query
  const filteredProducts = ProductListData.filter((order) =>
    order.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Get color class for stock alert
  const getAlertColor = (alert) => {
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
    return diffDays <= 7 ? "text-red-600 font-semibold" : "text-green-600";
  };

  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded border border-gray-200">
        <strong className="text-lg">Ingredients and Materials</strong>

        {/* Add Product Button */}
        <div className="mt-4">
          <div className="flex items-center">
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded h-[40px]">
              Add Product
            </button>
          </div>

          {/* Divider */}
          <hr className="my-4 border-gray-300" />

          {/* Export + Search */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded h-[40px]">
                Excel
              </button>
              <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded h-[40px]">
                PDF
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white text-sm px-4 py-2 rounded h-[40px]">
                Print
              </button>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:w-auto">
              <input
                className="p-3 px-4 border border-gray-300 rounded-lg h-[44px] w-full sm:w-72 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr className="divide-x divide-gray-300 text-center">
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Stock Status</th>
                <th className="p-2">Expiration</th>
                <th className="p-2">Remarks</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-center">
              {paginatedProducts.map((order) => (
                <tr key={order.id} className="divide-x divide-gray-300">
                  <td className="p-2 text-left">{order.name}</td>
                  <td className="p-2">{order.quantity}</td>
                  <td className="p-2">{order.unit}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getAlertColor(
                        order.alert
                      )}`}
                    >
                      {order.alert}
                    </span>
                  </td>
                  <td className={`p-2 ${getExpirationColor(order.expiration)}`}>
                    {order.expiration}
                  </td>
                  <td className="p-2 text-left">{order.remarks}</td>
                  <td className="p-2 space-x-1">
                    <button className="text-blue-600 hover:underline text-xs">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline text-xs">
                      Delete
                    </button>
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
              className="px-3 py-1 hover:underline disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
