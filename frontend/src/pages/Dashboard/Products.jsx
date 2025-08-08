import React from "react";

const ProductListData = [
  {
    id: 1,
    image: "",
    productName: "Salted Caramel",
    Size: "16 oz",
    price: 39,
    ingredients: "Sugar, Milk, Tapioca",
    category: "milk tea",
    status: "Available",
  },
  {
    id: 2,
    image: "",
    productName: "Winter melon Delight",
    Size: "22 oz",
    price: 45,
    ingredients: "Winter melon, Cream, Tapioca",
    category: "milk tea",
    status: "Available",
  },
  {
    id: 3,
    image: "",
    productName: "Matcha Latte",
    Size: "16 oz",
    price: 42,
    ingredients: "Matcha, Milk, Tapioca",
    category: "milk tea",
    status: "Not Available",
  },
  {
    id: 4,
    image: "",
    productName: "Brown Sugar Pearl",
    Size: "22 oz",
    price: 50,
    ingredients: "Brown Sugar, Milk, Tapioca",
    category: "milk tea",
    status: "Available",
  },
  {
    id: 5,
    image: "",
    productName: "Taro Bliss",
    Size: "16 oz",
    price: 43,
    ingredients: "Taro, Milk, Tapioca",
    category: "milk tea",
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

  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded border border-gray-200">
        <strong className="text-lg">Product List</strong>

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
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr className="divide-x divide-gray-300">
                <th className="p-2">Image</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Size</th>
                <th className="p-2">Price</th>
                <th className="p-2">Ingredients</th>
                <th className="p-2">Category</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-center">
              {paginatedProducts.map((order) => (
                <tr key={order.id} className="divide-x divide-gray-300">
                  <td className="p-2">{order.image || "None"}</td>
                  <td className="p-2 text-left">{order.productName}</td>
                  <td className="p-2">{order.Size}</td>
                  <td className="p-2">₱{order.price}</td>
                  <td className="p-2">{order.ingredients}</td>
                  <td className="p-2">{order.category}</td>
                  <td
                    className={`p-2 font-sm ${
                      order.status.toLowerCase() === "available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>

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
