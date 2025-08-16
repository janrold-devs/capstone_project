import React, { useState } from "react";

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  batchNumber: `BATCH-${String(i + 1).padStart(3, "0")}`,
  transactionDate: `2025-08-${String((i % 30) + 1).padStart(2, "0")}`,
  totalSale: (Math.random() * 5000 + 500).toFixed(2),
}));

function SalesReport() {
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
            style={{ minWidth: "600px" }}
          >
            <thead className="bg-stone-50 text-center sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left w-[200px] rounded-tl-lg">
                  BATCH NUMBER
                </th>
                <th className="p-2 text-left w-[200px]">TRANSACTION DATE</th>
                <th className="p-2 text-right w-[200px] rounded-tr-lg">
                  TOTAL SALE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-3 divide-stone-200 text-center">
              {visibleRows.length > 0 ? (
                visibleRows.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-2 text-left w-[200px] font-semibold">
                      {order.batchNumber}
                    </td>
                    <td className="p-2 text-left w-[200px]">
                      {order.transactionDate}
                    </td>
                    <td className="p-2 text-right w-[200px]">
                      ${order.totalSale}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No sales records found
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

export default SalesReport;
