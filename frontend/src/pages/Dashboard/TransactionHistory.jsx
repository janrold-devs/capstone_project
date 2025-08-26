import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Only if using React Router
import DashboardLayout from "../../components/layouts/DashboardLayout";

const mockTransactionData = [
  {
    id: 1,
    date: "2025-08-01",
    orderNo: "ORD-001",
    itemName: "Chocolate Cake",
    size: "12oz",
    quantity: 1,
    itemPrice: 29.0,
    addOns: "Extra Frosting",
    addOnsPrice: 10.0,
    totalCost: 480.0,
    amountReceived: 500.0,
    change: 20.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 4,
    date: "2025-08-02",
    orderNo: "ORD-004",
    itemName: "Red Velvet Cake",
    size: "16oz",
    quantity: 1,
    itemPrice: 38.0,
    addOns: "None",
    addOnsPrice: 0.0,
    totalCost: 38.0,
    amountReceived: 50.0,
    change: 12.0,
    paymentMode: "GCash",
    referenceNo: "GC123456789",
  },
  {
    id: 5,
    date: "2025-08-03",
    orderNo: "ORD-005",
    itemName: "Tiramisu",
    size: "20oz",
    quantity: 2,
    itemPrice: 42.0,
    addOns: "Extra Cocoa",
    addOnsPrice: 8.0,
    totalCost: 100.0,
    amountReceived: 110.0,
    change: 10.0,
    paymentMode: "GCash",
    referenceNo: "GC987654321",
  },
  {
    id: 6,
    date: "2025-08-03",
    orderNo: "ORD-006",
    itemName: "Mango Float",
    size: "16oz",
    quantity: 1,
    itemPrice: 32.0,
    addOns: "Extra Mango Slices",
    addOnsPrice: 7.0,
    totalCost: 39.0,
    amountReceived: 50.0,
    change: 11.0,
    paymentMode: "GCash",
    referenceNo: "GC456123789",
  },
  {
    id: 7,
    date: "2025-08-04",
    orderNo: "ORD-007",
    itemName: "Black Forest",
    size: "20oz",
    quantity: 1,
    itemPrice: 45.0,
    addOns: "None",
    addOnsPrice: 0.0,
    totalCost: 45.0,
    amountReceived: 50.0,
    change: 5.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 8,
    date: "2025-08-04",
    orderNo: "ORD-008",
    itemName: "Ube Cake",
    size: "12oz",
    quantity: 4,
    itemPrice: 27.0,
    addOns: "Macapuno Strings, Cheese",
    addOnsPrice: 15.0,
    totalCost: 168.0,
    amountReceived: 200.0,
    change: 32.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 9,
    date: "2025-08-05",
    orderNo: "ORD-009",
    itemName: "Coffee Cake",
    size: "16oz",
    quantity: 2,
    itemPrice: 34.0,
    addOns: "None",
    addOnsPrice: 0.0,
    totalCost: 68.0,
    amountReceived: 70.0,
    change: 2.0,
    paymentMode: "GCash",
    referenceNo: "GC789123456",
  },
  {
    id: 10,
    date: "2025-08-05",
    orderNo: "ORD-010",
    itemName: "Lemon Bars",
    size: "12oz",
    quantity: 3,
    itemPrice: 25.0,
    addOns: "Powdered Sugar Dusting",
    addOnsPrice: 5.0,
    totalCost: 90.0,
    amountReceived: 100.0,
    change: 10.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 11,
    date: "2025-08-06",
    orderNo: "ORD-011",
    itemName: "Strawberry Shortcake",
    size: "16oz",
    quantity: 1,
    itemPrice: 36.0,
    addOns: "Fresh Strawberries",
    addOnsPrice: 9.0,
    totalCost: 45.0,
    amountReceived: 50.0,
    change: 5.0,
    paymentMode: "GCash",
    referenceNo: "GC555888777",
  },
  {
    id: 12,
    date: "2025-08-06",
    orderNo: "ORD-012",
    itemName: "Banana Bread",
    size: "12oz",
    quantity: 2,
    itemPrice: 26.0,
    addOns: "Walnuts, Chocolate Chips",
    addOnsPrice: 11.0,
    totalCost: 74.0,
    amountReceived: 80.0,
    change: 6.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 13,
    date: "2025-08-07",
    orderNo: "ORD-013",
    itemName: "Cheesecake",
    size: "20oz",
    quantity: 1,
    itemPrice: 44.0,
    addOns: "Blueberry Compote",
    addOnsPrice: 12.0,
    totalCost: 56.0,
    amountReceived: 60.0,
    change: 4.0,
    paymentMode: "GCash",
    referenceNo: "GC222333444",
  },
  {
    id: 14,
    date: "2025-08-07",
    orderNo: "ORD-014",
    itemName: "Pound Cake",
    size: "16oz",
    quantity: 3,
    itemPrice: 33.0,
    addOns: "Lemon Glaze",
    addOnsPrice: 6.0,
    totalCost: 117.0,
    amountReceived: 120.0,
    change: 3.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 15,
    date: "2025-08-08",
    orderNo: "ORD-015",
    itemName: "Caramel Flan",
    size: "12oz",
    quantity: 2,
    itemPrice: 28.0,
    addOns: "Extra Caramel Sauce",
    addOnsPrice: 7.0,
    totalCost: 70.0,
    amountReceived: 80.0,
    change: 10.0,
    paymentMode: "GCash",
    referenceNo: "GC666999111",
  },
  {
    id: 16,
    date: "2025-08-08",
    orderNo: "ORD-016",
    itemName: "Chocolate Mousse",
    size: "16oz",
    quantity: 1,
    itemPrice: 35.0,
    addOns: "Chocolate Shavings",
    addOnsPrice: 8.0,
    totalCost: 43.0,
    amountReceived: 50.0,
    change: 7.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 17,
    date: "2025-08-09",
    orderNo: "ORD-017",
    itemName: "Apple Pie",
    size: "20oz",
    quantity: 1,
    itemPrice: 41.0,
    addOns: "Vanilla Ice Cream",
    addOnsPrice: 15.0,
    totalCost: 56.0,
    amountReceived: 60.0,
    change: 4.0,
    paymentMode: "GCash",
    referenceNo: "GC777444111",
  },
  {
    id: 18,
    date: "2025-08-09",
    orderNo: "ORD-018",
    itemName: "Cinnamon Rolls",
    size: "12oz",
    quantity: 4,
    itemPrice: 24.0,
    addOns: "Cream Cheese Frosting",
    addOnsPrice: 10.0,
    totalCost: 136.0,
    amountReceived: 150.0,
    change: 14.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
  {
    id: 19,
    date: "2025-08-10",
    orderNo: "ORD-019",
    itemName: "Pumpkin Bread",
    size: "16oz",
    quantity: 2,
    itemPrice: 32.0,
    addOns: "Pecans, Cream Cheese Spread",
    addOnsPrice: 13.0,
    totalCost: 90.0,
    amountReceived: 100.0,
    change: 10.0,
    paymentMode: "GCash",
    referenceNo: "GC888222555",
  },
  {
    id: 20,
    date: "2025-08-10",
    orderNo: "ORD-020",
    itemName: "Baked Alaska",
    size: "20oz",
    quantity: 1,
    itemPrice: 46.0,
    addOns: "None",
    addOnsPrice: 0.0,
    totalCost: 46.0,
    amountReceived: 50.0,
    change: 4.0,
    paymentMode: "Cash",
    referenceNo: "-",
  },
];

function TransactionHistoryReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;
  const navigate = useNavigate();

  // ---------------- Filtering Logic ----------------
  const filteredData = mockTransactionData.filter(
    (t) =>
      t.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.date.includes(searchTerm)
  );

  // ---------------- Pagination Logic ----------------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRows = filteredData.slice(startIndex, endIndex);

  const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-6 h-screen flex flex-col relative">
        <div className="bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow transition-all duration-300">
          {/* ---------------- Title ---------------- */}
          <strong className="text-lg mb-3">Transaction History</strong>

        {/* ---------------- Controls Section ---------------- */}
        <div className="flex items-center gap-3 mb-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard/pos")}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900"
          >
            ← Back to POS
          </button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Order No. or Date"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300  rounded-lg h-[35px] w-[280px] shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
          />
        </div>

        {/* ---------------- Table Section ---------------- */}
        <div className="flex flex-col flex-grow">
          <div className="bg-white rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden">
            <div
              className="overflow-x-auto overflow-y-auto flex-grow max-h-[calc(100vh-250px)]"
              style={{ scrollbarGutter: "stable" }}
            >
              <table className="w-full text-sm rounded-lg table-auto">
                <thead className="border-b border-stone-200 text-center bg-white sticky top-0 z-10">
                  <tr>
                    <th className="p-2 text-left whitespace-nowrap">DATE</th>
                    <th className="p-2 text-left whitespace-nowrap">
                      ORDER NO.
                    </th>
                    <th className="p-2 text-left">ITEM NAME</th>
                    <th className="p-2 text-center w-[70px]">SIZE</th>
                    <th className="p-2 text-center w-[60px]">QTY</th>
                    <th className="p-2 text-right whitespace-nowrap">PRICE</th>
                    <th className="p-2 text-left max-w-[150px] truncate">
                      ADD-ONS
                    </th>
                    <th className="p-2 text-right whitespace-nowrap">PRICE</th>
                    <th className="p-2 text-right whitespace-nowrap">
                      TOTAL COST
                    </th>
                    <th className="p-2 text-right whitespace-nowrap">
                      AMOUNT RECEIVED
                    </th>
                    <th className="p-2 text-right whitespace-nowrap">CHANGE</th>
                    <th className="p-2 text-center whitespace-nowrap">
                      MODE OF PAYMENT
                    </th>
                    <th className="p-2 text-center whitespace-nowrap">
                      REFERENCE NO.
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100 text-center">
                  {visibleRows.length > 0 ? (
                    visibleRows.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="p-2 text-left whitespace-nowrap">
                          {transaction.date}
                        </td>
                        <td className="p-2 text-left font-semibold whitespace-nowrap">
                          {transaction.orderNo}
                        </td>
                        <td className="p-2 text-left">
                          {transaction.itemName}
                        </td>
                        <td className="p-2 text-center">{transaction.size}</td>
                        <td className="p-2 text-center">
                          {transaction.quantity}
                        </td>
                        <td className="p-2 text-right">
                          {formatCurrency(transaction.itemPrice)}
                        </td>
                        <td className="p-2 text-left text-sm truncate max-w-[150px]">
                          {transaction.addOns}
                        </td>
                        <td className="p-2 text-right">
                          {formatCurrency(transaction.addOnsPrice)}
                        </td>
                        <td className="p-2 text-right font-medium">
                          {formatCurrency(transaction.totalCost)}
                        </td>
                        <td className="p-2 text-right">
                          {formatCurrency(transaction.amountReceived)}
                        </td>
                        <td className="p-2 text-right">
                          {formatCurrency(transaction.change)}
                        </td>
                        <td className="p-2 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.paymentMode === "Cash"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {transaction.paymentMode}
                          </span>
                        </td>
                        <td className="p-2 text-center font-mono text-xs whitespace-nowrap">
                          {transaction.referenceNo}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="13"
                        className="p-4 text-center text-gray-500"
                      >
                        No transaction records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ---------------- Pagination Controls ---------------- */}
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-4">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default TransactionHistoryReport;
