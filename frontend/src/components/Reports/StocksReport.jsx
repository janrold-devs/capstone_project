import React, { useState } from "react";

// Mock data
const mockStockData = [
  {
    id: 1,
    batchNumber: "BATCH-001",
    date: "2025-08-01",
    ingredient: "Milk",
    quantity: 100,
    unit: "liters",
  },
  {
    id: 2,
    batchNumber: "BATCH-002",
    date: "2025-08-02",
    ingredient: "Sugar",
    quantity: 80,
    unit: "kg",
  },
  {
    id: 3,
    batchNumber: "BATCH-003",
    date: "2025-08-03",
    ingredient: "Flour",
    quantity: 200,
    unit: "kg",
  },
  {
    id: 4,
    batchNumber: "BATCH-004",
    date: "2025-08-04",
    ingredient: "Eggs",
    quantity: 150,
    unit: "pieces",
  },
  {
    id: 5,
    batchNumber: "BATCH-005",
    date: "2025-08-05",
    ingredient: "Butter",
    quantity: 60,
    unit: "kg",
  },
  {
    id: 6,
    batchNumber: "BATCH-006",
    date: "2025-08-06",
    ingredient: "Tomatoes",
    quantity: 90,
    unit: "kg",
  },
  {
    id: 7,
    batchNumber: "BATCH-007",
    date: "2025-08-07",
    ingredient: "Strawberries",
    quantity: 70,
    unit: "kg",
  },
  {
    id: 8,
    batchNumber: "BATCH-008",
    date: "2025-08-08",
    ingredient: "Yeast",
    quantity: 40,
    unit: "grams",
  },
  {
    id: 9,
    batchNumber: "BATCH-009",
    date: "2025-08-09",
    ingredient: "Chocolate Chips",
    quantity: 120,
    unit: "grams",
  },
  {
    id: 10,
    batchNumber: "BATCH-010",
    date: "2025-08-10",
    ingredient: "Lettuce",
    quantity: 50,
    unit: "pieces",
  },
];

function StocksReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(mockStockData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRows = mockStockData.slice(startIndex, endIndex);

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
            style={{ minWidth: "750px" }}
          >
            <thead className="bg-stone-50 text-center sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left">BATCH NUMBER</th>
                <th className="p-2 text-left">DATE</th>
                <th className="p-2 text-left">INGREDIENT / MATERIAL</th>
                <th className="p-2 text-right">QUANTITY</th>
              </tr>
            </thead>
            <tbody className="divide-y-3 divide-stone-200 text-center">
              {visibleRows.length > 0 ? (
                visibleRows.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="p-2 text-left">{record.batchNumber}</td>
                    <td className="p-2 text-left">{record.date}</td>
                    <td className="p-2 text-left">{record.ingredient}</td>
                    <td className="p-2 text-right">
                      {record.quantity} {record.unit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No stock records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

export default StocksReport;
