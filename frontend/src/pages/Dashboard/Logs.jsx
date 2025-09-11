import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaUser,
  FaTasks,
} from "react-icons/fa";
import DateRange from "../../components/DateRange"; // Custom date picker component
import DashboardLayout from "../../components/layouts/DashboardLayout";

// Sample activity log data
const data = [
  {
    id: 1,
    date: "June 14, 2025",
    time: "02:30 PM",
    user: "Admin",
    action: "Created",
    details: "Added new product 'Taro Bliss'-16 oz-₱85",
    status: "Success",
  },
  // ... rest of log entries
];

const Logs = () => {
  // Search & filter states
  const [query, setQuery] = React.useState("");
  const [userFilter, setUserFilter] = React.useState("All Users");
  const [actionFilter, setActionFilter] = React.useState("All Actions");
  const [dateRange, setDateRange] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;

  // Dropdown options
  const users = ["All Users", "Admin", "Manager", "Staff"];
  const actions = ["All Actions", "Created", "Deleted", "Updated", "Viewed"];

  // -------------------------------
  // Filtering Logic
  // -------------------------------
  const filteredProducts = data.filter((order) => {
    // Match search query (case-insensitive)
    const matchesSearch = order.details
      .toLowerCase()
      .includes(query.toLowerCase());

    // Match user filter
    const matchesUserFilter =
      userFilter === "All Users" || order.user === userFilter;

    // Match action filter
    const matchesActionFilter =
      actionFilter === "All Actions" || order.action === actionFilter;

    // Match date range (if selected)
    const orderDate = new Date(order.date + " " + order.time);
    const matchesDateFilter =
      !dateRange ||
      (orderDate >= new Date(dateRange.startDate) &&
        orderDate <=
          new Date(new Date(dateRange.endDate).setHours(23, 59, 59, 999)));

    return (
      matchesSearch &&
      matchesUserFilter &&
      matchesActionFilter &&
      matchesDateFilter
    );
  });

  // -------------------------------
  // Pagination Logic
  // -------------------------------
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

  // -------------------------------
  // Helper functions for styling
  // -------------------------------

  // Status color badge
  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Action text color
  const getActionColor = (action) => {
    switch (action) {
      case "Created":
        return "text-green-700";
      case "Updated":
        return "text-blue-700";
      case "Deleted":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  // Action icon
  const getActionIcon = (action) => {
    switch (action) {
      case "Created":
        return <FaPlusCircle className="text-green-700" />;
      case "Updated":
        return <FaEdit className="text-blue-700" />;
      case "Deleted":
        return <FaTrashAlt className="text-red-700" />;
      case "Viewed":
        return <FaEye className="text-gray-700" />;
      default:
        return null;
    }
  };

  // -------------------------------
  // UI Rendering
  // -------------------------------
  return (
    <DashboardLayout activeMenu="Activity Logs">
      <div className="p-4 min-h-screen flex flex-col transition-all duration-300">
        {/* -------------------- Main Table Content -------------------- */}
        <div className="bg-stone-100 p-2 rounded-lg border border-gray-200 flex flex-col transition-all duration-300 h-full">
          <strong className="text-lg">Activity Logs</strong>

          {/* Top Filters (Search, Dropdowns, Date Picker) */}
          <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search Bar */}
              <div className="flex-1 max-w-xs relative">
                <input
                  className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[38px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                  type="text"
                  placeholder="Search by Details"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page
                  }}
                />
                <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* User Filter Dropdown */}
              <div className="relative w-[200px]">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-9 w-full h-[38px] text-gray-500 p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                  value={userFilter}
                  onChange={(e) => {
                    setUserFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {users.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Filter Dropdown */}
              <div className="relative w-[200px]">
                <FaTasks className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-9 w-full h-[38px] text-gray-500 p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                  value={actionFilter}
                  onChange={(e) => {
                    setActionFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {actions.map((action) => (
                    <option key={action} value={action}>
                      {action}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Range Picker */}
            <DateRange
              onDateChange={(range) => {
                setDateRange(range);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Table Section */}
          <div className="mt-3 flex flex-col flex-grow">
            <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-250px)] overflow-hidden">
              <div
                className="overflow-y-auto flex-grow"
                style={{ scrollbarGutter: "stable" }}
              >
                <table className="w-full text-sm rounded-lg table-fixed">
                  {/* Table Header */}
                  <thead className="border-b-3 border-stone-100 text-center bg-white sticky top-0 z-10">
                    <tr>
                      <th className="p-2 text-left w-[150px] rounded-tl-lg">
                        TIMESTAMP
                      </th>
                      <th className="p-2 text-left w-[130px]">USER</th>
                      <th className="p-2 text-left w-[100px]">ACTION</th>
                      <th className="p-2 text-left w-[400px]">DETAILS</th>
                      <th className="p-2 w-[120px] rounded-tr-lg">STATUS</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y-3 divide-stone-100 text-center">
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          {/* Timestamp */}
                          <td className="p-2 text-left w-[150px]">
                            <div className="flex flex-col">
                              <span className="font-medium">{order.date}</span>
                              <span className="text-xs text-gray-500">
                                {order.time}
                              </span>
                            </div>
                          </td>

                          {/* User */}
                          <td className="p-2 w-[130px]">
                            <div className="flex items-center justify-left gap-1">
                              <FaRegCircleUser className="w-[25px] h-[25px] text-gray-300 flex-shrink-0" />
                              <span className="truncate">{order.user}</span>
                            </div>
                          </td>

                          {/* Action */}
                          <td
                            className={`p-2 w-[100px] font-medium ${getActionColor(
                              order.action
                            )}`}
                          >
                            <div className="flex items-center justify-start gap-1">
                              {getActionIcon(order.action)}
                              <span>{order.action}</span>
                            </div>
                          </td>

                          {/* Details */}
                          <td className="p-2 text-left w-[400px]">
                            <div className="truncate" title={order.details}>
                              {order.details}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="p-2 w-[120px]">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      // No results case
                      <tr>
                        <td
                          colSpan="5"
                          className="p-4 text-center text-gray-500"
                        >
                          No logs found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4">
              <div className="flex justify-end">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
