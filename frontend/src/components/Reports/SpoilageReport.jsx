import React, { useState } from "react";

// Mock data
const mockSpoilageData = [
  {
    id: 1,
    date: "2025-08-01",
    batchNumber: "BATCH-001",
    ingredient: "Milk",
    initialQty: 100,
    wasteQty: 20,
  },
  {
    id: 2,
    date: "2025-08-02",
    batchNumber: "BATCH-002",
    ingredient: "Sugar",
    initialQty: 80,
    wasteQty: 10,
  },
  {
    id: 3,
    date: "2025-08-03",
    batchNumber: "BATCH-003",
    ingredient: "Flour",
    initialQty: 200,
    wasteQty: 50,
  },
  {
    id: 4,
    date: "2025-08-04",
    batchNumber: "BATCH-004",
    ingredient: "Eggs",
    initialQty: 150,
    wasteQty: 30,
  },
  {
    id: 5,
    date: "2025-08-05",
    batchNumber: "BATCH-005",
    ingredient: "Butter",
    initialQty: 60,
    wasteQty: 12,
  },
  {
    id: 6,
    date: "2025-08-06",
    batchNumber: "BATCH-006",
    ingredient: "Tomatoes",
    initialQty: 90,
    wasteQty: 25,
  },
  {
    id: 7,
    date: "2025-08-07",
    batchNumber: "BATCH-007",
    ingredient: "Strawberries",
    initialQty: 70,
    wasteQty: 15,
  },
  {
    id: 8,
    date: "2025-08-08",
    batchNumber: "BATCH-008",
    ingredient: "Yeast",
    initialQty: 40,
    wasteQty: 5,
  },
  {
    id: 9,
    date: "2025-08-09",
    batchNumber: "BATCH-009",
    ingredient: "Chocolate Chips",
    initialQty: 120,
    wasteQty: 18,
  },
  {
    id: 10,
    date: "2025-08-10",
    batchNumber: "BATCH-010",
    ingredient: "Lettuce",
    initialQty: 50,
    wasteQty: 20,
  },
];

function SpoilageReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(mockSpoilageData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRows = mockSpoilageData.slice(startIndex, endIndex);

  const calculateWastePercentage = (initial, waste) =>
    ((waste / initial) * 100).toFixed(1);

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
            style={{ minWidth: "850px" }}
          >
            <thead className="bg-stone-50 text-center sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left">DATE</th>
                <th className="p-2 text-left">BATCH NUMBER</th>
                <th className="p-2 text-left">INGREDIENT / MATERIAL</th>
                <th className="p-2 text-right">INITIAL QTY</th>
                <th className="p-2 text-right">WASTE QTY</th>
                <th className="p-2 text-right">WASTE %</th>
              </tr>
            </thead>
            <tbody className="divide-y-3 divide-stone-200 text-center">
              {visibleRows.length > 0 ? (
                visibleRows.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="p-2 text-left">{record.date}</td>
                    <td className="p-2 text-left">{record.batchNumber}</td>
                    <td className="p-2 text-left">{record.ingredient}</td>
                    <td className="p-2 text-right">{record.initialQty}</td>
                    <td className="p-2 text-right">{record.wasteQty}</td>
                    <td className="p-2 text-right font-semibold text-red-600">
                      {calculateWastePercentage(
                        record.initialQty,
                        record.wasteQty
                      )}
                      %
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No spoilage records found
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

export default SpoilageReport;
