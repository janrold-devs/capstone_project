import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaRegCalendarAlt,
  FaUser,
  FaTasks,
} from "react-icons/fa";
import DateRange from "../../components/DateRange";

const data = [
  {
    id: 1,
    date: "June 13, 2025",
    time: "02:30 PM",
    user: "Admin",
    action: "Created",
    details: "Added new product 'Taro Bliss'-16 oz-₱85",
    status: "Success",
  },
  {
    id: 2,
    date: "June 13, 2025",
    time: "02:15 PM",
    user: "Manager",
    action: "Updated",
    details: "Modified product 'Strawberry Delight'-12 oz-₱75",
    status: "Success",
  },
  {
    id: 3,
    date: "June 13, 2025",
    time: "01:45 PM",
    user: "Admin",
    action: "Deleted",
    details: "Removed product 'Old Flavor'-8 oz-₱60",
    status: "Failed",
  },
  {
    id: 4,
    date: "June 13, 2025",
    time: "01:30 PM",
    user: "Staff",
    action: "Created",
    details: "Added new product 'Mango Supreme'-20 oz-₱95",
    status: "Success",
  },
  {
    id: 5,
    date: "June 13, 2025",
    time: "01:15 PM",
    user: "Manager",
    action: "Updated",
    details: "Modified inventory for 'Chocolate Fudge'-14 oz-₱80",
    status: "Success",
  },
  {
    id: 6,
    date: "June 13, 2025",
    time: "01:00 PM",
    user: "Admin",
    action: "Created",
    details: "Added new product 'Vanilla Dream'-16 oz-₱85",
    status: "Success",
  },
  {
    id: 7,
    date: "June 13, 2025",
    time: "12:45 PM",
    user: "Staff",
    action: "Updated",
    details: "Modified product 'Berry Blast'-10 oz-₱70",
    status: "Success",
  },
  {
    id: 8,
    date: "June 13, 2025",
    time: "12:30 PM",
    user: "Manager",
    action: "Deleted",
    details: "Removed expired product 'Winter Special'-12 oz-₱65",
    status: "Success",
  },
  {
    id: 9,
    date: "June 13, 2025",
    time: "12:15 PM",
    user: "Admin",
    action: "Created",
    details: "Added new product 'Tropical Mix'-18 oz-₱90",
    status: "Success",
  },
  {
    id: 10,
    date: "June 13, 2025",
    time: "12:00 PM",
    user: "Staff",
    action: "Updated",
    details: "Modified pricing for 'Classic Vanilla'-16 oz-₱85",
    status: "Failed",
  },
  {
    id: 11,
    date: "June 13, 2025",
    time: "12:15 PM",
    user: "Manager",
    action: "Approved",
    details: "Approved new inventory shipment",
    status: "Completed",
  },
  {
    id: 12,
    date: "June 13, 2025",
    time: "1:30 PM",
    user: "Staff",
    action: "Created",
    details: "Added new product 'Caramel Latte'-12 oz-₱95",
    status: "Pending",
  },
  {
    id: 13,
    date: "June 13, 2025",
    time: "2:45 PM",
    user: "Staff",
    action: "Deleted",
    details: "Removed expired product 'Matcha Frappe'-12 oz",
    status: "Completed",
  },
  {
    id: 14,
    date: "June 13, 2025",
    time: "3:20 PM",
    user: "System",
    action: "Automatic",
    details: "Daily sales report generated",
    status: "Completed",
  },
  {
    id: 15,
    date: "June 13, 2025",
    time: "4:05 PM",
    user: "Staff",
    action: "Updated",
    details: "Changed opening hours for weekends",
    status: "Pending",
  },
  {
    id: 16,
    date: "June 14, 2025",
    time: "9:00 AM",
    user: "Manager",
    action: "Approved",
    details: "Approved staff schedule changes",
    status: "Completed",
  },
  {
    id: 17,
    date: "June 14, 2025",
    time: "10:30 AM",
    user: "Staff",
    action: "Created",
    details: "Added seasonal product 'Mango Tango'-16 oz-₱110",
    status: "Completed",
  },
  {
    id: 18,
    date: "June 14, 2025",
    time: "11:45 AM",
    user: "Staff",
    action: "Updated",
    details: "Modified recipe for 'Hazelnut Coffee'",
    status: "Failed",
  },
  {
    id: 19,
    date: "June 14, 2025",
    time: "2:15 PM",
    user: "System",
    action: "Automatic",
    details: "Inventory restock alert triggered",
    status: "Pending",
  },
  {
    id: 20,
    date: "June 14, 2025",
    time: "3:50 PM",
    user: "Manager",
    action: "Deleted",
    details: "Removed discontinued supplier 'SweetSyrups Inc.'",
    status: "Completed",
  },
];

const Logs = () => {
  const [query, setQuery] = React.useState("");
  const [userFilter, setUserFilter] = React.useState("All Users");
  const [actionFilter, setActionFilter] = React.useState("All Actions");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;

  const users = ["All Users", "Admin", "Manager", "Staff"];
  const actions = ["All Actions", "Created", "Deleted", "Updated", "Viewed"];

  // Search Bar and Dropdown
  const filteredProducts = data.filter((order) => {
    const matchesSearch = order.details
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesUserFilter =
      userFilter === "All Users" || order.user === userFilter;
    const matchesActionFilter =
      actionFilter === "All Actions" || order.action === actionFilter;
    const matchesDateFilter =
      !selectedDate ||
      order.date ===
        new Date(selectedDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
    return (
      matchesSearch &&
      matchesUserFilter &&
      matchesActionFilter &&
      matchesDateFilter
    );
  });

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  return (
    <div className="p-6 h-screen flex flex-col">
      <div className="bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow">
        <strong className="text-lg">Activity Logs</strong>

        {/* Top Controls */}
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
                  setCurrentPage(1);
                }}
              />
              <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* User Dropdown */}
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

            {/* Action Dropdown */}
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

          {/* Date picker*/}
          <DateRange />
        </div>

        {/* Main Table */}
        <div className="mt-3 flex flex-col flex-grow">
          <div className="bg-white rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden">
            <div
              className="overflow-x-auto overflow-y-auto flex-grow max-h-[calc(100vh-280px)]"
              style={{ scrollbarGutter: "stable" }}
            >
              <table
                className="w-full text-sm rounded-lg table-fixed"
                style={{ minWidth: "900px" }}
              >
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
                <tbody className="divide-y-3 divide-stone-100 text-center">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        {/* Time */}
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
                            <FaRegCircleUser className="w-[25px] h-[25px] text-gray-400 flex-shrink-0" />
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
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        No logs found matching your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
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
  );
};

export default Logs;
