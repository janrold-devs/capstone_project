import React from "react";

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  batchNumber: `BATCH-${String(i + 1).padStart(3, "0")}`,
  transactionDate: `2025-08-${String((i % 30) + 1).padStart(2, "0")}`,
  totalSale: (Math.random() * 5000 + 500).toFixed(2),
}));

function SalesReport({ currentPage, itemsPerPage }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRows = mockData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col flex-grow">
      <div
        className="overflow-x-auto flex-grow"
        style={{ scrollbarGutter: "stable" }}
      >
        <table
          className="w-full text-sm table-fixed"
          style={{ minWidth: "600px" }}
        >
          <thead className="border-b-2 border-stone-200 bg-white sticky top-0 z-10">
            <tr>
              <th className="p-2 text-left w-[200px] rounded-tl-lg">
                Batch Number
              </th>
              <th className="p-2 text-left w-[200px]">Transaction Date</th>
              <th className="p-2 text-right w-[200px] rounded-tr-lg">
                Total Sale
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {visibleRows.length > 0 ? (
              visibleRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-2 text-left">{row.batchNumber}</td>
                  <td className="p-2 text-left">{row.transactionDate}</td>
                  <td className="p-2 text-right">${row.totalSale}</td>
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
    </div>
  );
}

export default SalesReport;
