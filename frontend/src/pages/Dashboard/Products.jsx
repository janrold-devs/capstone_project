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
    productName: "Wintermelon Delight",
    Size: "22 oz",
    price: 45,
    ingredients: "Wintermelon, Cream, Tapioca",
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
    status: "Available",
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
    status: "Available",
  },
];

const Products = () => {
  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded border border-gray-200">
        <strong className="text-lg">Product List</strong>
        {/* Button for Adding New Product */}
        <div className="mt-2">
          <button className="bg-blue-600 text-white text-sm px-2 py-2 rounded">
            Add Product
          </button>
        </div>
        {/* Buttons for  Exporting the Data*/}
        <div className="space-x-3 mt-3">
          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded">
            Excel
          </button>
          <button className="bg-red-600 text-white text-sm px-4 py-2 rounded">
            PDF
          </button>
          <button className="bg-gray-600 text-white text-sm px-4 py-2 rounded">
            Print
          </button>
        </div>
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
              {ProductListData.map((order) => (
                <tr key={order.id} className="divide-x divide-gray-300">
                  <td className="p-2">{order.image || "-"}</td>
                  <td className="p-2 text-left">{order.productName}</td>
                  <td className="p-2">{order.Size}</td>
                  <td className="p-2">₱{order.price}</td>
                  <td className="p-2">{order.ingredients}</td>
                  <td className="p-2">{order.category}</td>
                  <td className="p-2 text-green-600">{order.status}</td>
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
        </div>
      </div>
    </div>
  );
};

export default Products;
