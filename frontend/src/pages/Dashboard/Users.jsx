import React, { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf, FaRegCircleUser } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const data = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    username: "Johnyy",
    email: "johndoe@gmail.com",
    role: "Staff",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    username: "JSmithy",
    email: "janesmith@gmail.com",
    role: "Manager",
  },
  {
    id: 3,
    firstname: "Michael",
    lastname: "Brown",
    username: "MikeB",
    email: "michaelbrown@gmail.com",
    role: "Staff",
  },
  {
    id: 4,
    firstname: "Emily",
    lastname: "Johnson",
    username: "EmJ",
    email: "emilyjohnson@gmail.com",
    role: "Admin",
  },
  {
    id: 5,
    firstname: "David",
    lastname: "Wilson",
    username: "DWils",
    email: "davidwilson@gmail.com",
    role: "Staff",
  },
  {
    id: 6,
    firstname: "Sophia",
    lastname: "Davis",
    username: "SophD",
    email: "sophiadavis@gmail.com",
    role: "Manager",
  },
  {
    id: 7,
    firstname: "James",
    lastname: "Taylor",
    username: "JTay",
    email: "jamestaylor@gmail.com",
    role: "Staff",
  },
  {
    id: 8,
    firstname: "Olivia",
    lastname: "Martinez",
    username: "OliM",
    email: "oliviamartinez@gmail.com",
    role: "Staff",
  },
  {
    id: 9,
    firstname: "William",
    lastname: "Anderson",
    username: "WillA",
    email: "williamanderson@gmail.com",
    role: "Admin",
  },
  {
    id: 10,
    firstname: "Ava",
    lastname: "Thomas",
    username: "AvaT",
    email: "avathomas@gmail.com",
    role: "Manager",
  },
  {
    id: 11,
    firstname: "Liam",
    lastname: "Harris",
    username: "LiamH",
    email: "liamharris@gmail.com",
    role: "Staff",
  },
];

const Users = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [showDelete, setShowDelete] = useState(false);

  const filteredProducts = data.filter((item) =>
    item.firstname.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 h-screen flex flex-col relative">
      {/* Main Content */}
      <div
        className={`bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow transition-all duration-300 ${
          showDelete ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <strong className="text-lg">User Management</strong>

        {/* Top Controls */}
        <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md">
              + Add User
            </button>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white text-sm px-3 py-2 rounded h-[35px] shadow-md">
                <PiMicrosoftExcelLogoFill className="text-lg" />
                Excel
              </button>
              <button className="flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                <FaFilePdf />
                PDF
              </button>
              <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                <IoPrintSharp />
                Print
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-xs relative">
            <input
              className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
              type="text"
              placeholder="Search by First Name"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
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
                      FIRST NAME
                    </th>
                    <th className="p-2 text-left w-[150px]">LAST NAME</th>
                    <th className="p-2 text-left w-[150px]">USERNAME</th>
                    <th className="p-2 text-left w-[200px]">EMAIL</th>
                    <th className="p-2 text-left w-[120px]">ROLE</th>
                    <th className="p-2 text-center w-[150px] rounded-tr-lg">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-3 divide-stone-100 text-center">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="p-2 text-left w-[150px] font-semibold">
                          {order.firstname}
                        </td>
                        <td className="p-2 text-left w-[150px]">
                          {order.lastname}
                        </td>
                        <td className="p-2 text-left w-[150px]">
                          {order.username}
                        </td>
                        <td className="p-2 text-left w-[200px]">
                          {order.email}
                        </td>
                        <td className="p-2 w-[120px]">
                          <div className="flex items-center justify-start gap-1">
                            <FaRegCircleUser className="w-[18px] h-[18px] text-gray-400" />
                            <span className="truncate">{order.role}</span>
                          </div>
                        </td>
                        <td className="p-2 w-[150px]">
                          <div className="flex items-center justify-center gap-3">
                            <button className="flex items-center gap-[3px] text-blue-600 hover:underline text-xs">
                              <FiEdit className="text-sm" />
                              Edit
                            </button>
                            <button
                              className="flex items-center gap-[3px] text-red-600 hover:underline text-xs"
                              onClick={() => setShowDelete(true)}
                            >
                              <RiDeleteBin5Line className="text-sm" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        No users found matching your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
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

      {/* Delete Modal */}
      {showDelete && (
        <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
      )}
    </div>
  );
};

export default Users;
