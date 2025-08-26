import React, { useState } from "react";

// Mock data for new table structure
const categories = ["Beverage", "Snack", "Dairy", "Bakery", "Frozen"];
const items = ["Coffee", "Sandwich", "Milk", "Bread", "Ice Cream"];
const paymentModes = ["Cash", "Card", "Online", "Wallet"];

const mockData = Array.from({ length: 50 }, (_, i) => {
  const item = items[i % items.length];
  const category = categories[i % categories.length];
  const price = (Math.random() * 20 + 5).toFixed(2);
  const quantity = Math.floor(Math.random() * 5) + 1;
  const totalCost = (price * quantity).toFixed(2);

  return {
    id: i + 1,
    date: `2025-08-${String((i % 30) + 1).padStart(2, "0")}`,
    itemSold: item,
    category,
    itemPrice: price,
    quantity,
    totalCost,
    modeOfPayment: paymentModes[i % paymentModes.length],
    referenceNumber: `REF-${1000 + i}`,
  };
});

function SalesActivity() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRows = mockData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col flex-grow h-full">
      {/* Table Container */}
      <div className="flex-grow rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div
          className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)] flex-grow"
          style={{ scrollbarGutter: "stable" }}
        >
          <table
            className="w-full text-sm table-fixed bg-white"
            style={{ minWidth: "1000px" }}
          >
            <thead className="bg-stone-50 text-center sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left">TRANSACTION DATE</th>
                <th className="p-2 text-left">ITEM SOLD</th>
                <th className="p-2 text-left">CATEGORY</th>
                <th className="p-2 text-right">ITEM PRICE</th>
                <th className="p-2 text-right">QUANTITY</th>
                <th className="p-2 text-right">TOTAL COST</th>
                <th className="p-2 text-left">MODE OF PAYMENT</th>
                <th className="p-2 text-left">REFERENCE NUMBER</th>
              </tr>
            </thead>
            <tbody className="divide-y-3 divide-stone-200 text-center">
              {visibleRows.length > 0 ? (
                visibleRows.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-2 text-left">{order.date}</td>
                    <td className="p-2 text-left font-semibold">
                      {order.itemSold}
                    </td>
                    <td className="p-2 text-left">{order.category}</td>
                    <td className="p-2 text-right">${order.itemPrice}</td>
                    <td className="p-2 text-right">{order.quantity}</td>
                    <td className="p-2 text-right">${order.totalCost}</td>
                    <td className="p-2 text-left">{order.modeOfPayment}</td>
                    <td className="p-2 text-left">{order.referenceNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No sales activity found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (sticks to bottom-right) */}
        <div className="mt-2 flex justify-end border-t border-stone-200 bg-white p-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
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
              className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesActivity;
