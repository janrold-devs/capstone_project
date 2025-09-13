import React, { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf, FaRegCircleUser } from "react-icons/fa6";
import { IoPrintSharp, IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddForm from "../../components/UserForms/AddForm";
import EditForm from "../../components/UserForms/EditForm";
import DashboardLayout from "../../components/layouts/DashboardLayout";

// --- Dummy user data ---
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
  // --- State Management ---
  const [query, setQuery] = useState(""); // search query (filters by first name)
  const [currentPage, setCurrentPage] = useState(1); // pagination control
  const itemsPerPage = 15; // items per page

  // Modal visibility states
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // --- Filtering logic (search by firstname) ---
  const filteredUsers = data.filter((item) =>
    item.firstname.toLowerCase().includes(query.toLowerCase())
  );

  // --- Pagination logic ---
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout activeMenu="Users">
      <div className="flex flex-col transition-all duration-300">
        {/* --- Main Container --- */}
        <div
          className={`bg-stone-100 p-2 rounded-lg border border-gray-200 flex flex-col transition-all duration-300 h-full ${
            showDelete || showAdd || showEdit
              ? "blur-sm pointer-events-none"
              : ""
          }`}
        >
          <strong className="text-lg">User Management</strong>

          {/* --- Top Controls Section --- */}
          <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              {/* Add User Button */}
              <button
                className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md"
                onClick={() => setShowAdd(true)}
              >
                + Add User
              </button>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-gray-300"></div>

              {/* Export Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white text-sm px-3 py-2 rounded h-[35px] shadow-md">
                  <PiMicrosoftExcelLogoFill className="text-lg" /> Excel
                </button>
                <button className="flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                  <FaFilePdf /> PDF
                </button>
                <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                  <IoPrintSharp /> Print
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xs relative">
              <input
                className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                type="text"
                placeholder="Search by First Name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1); // reset to first page when searching
                }}
              />
              <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* --- User Table --- */}
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

                  {/* Table Body */}
                  <tbody className="divide-y-3 divide-stone-100 text-center">
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-2 text-left font-semibold">
                            {user.firstname}
                          </td>
                          <td className="p-2 text-left">{user.lastname}</td>
                          <td className="p-2 text-left">{user.username}</td>
                          <td className="p-2 text-left">{user.email}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <FaRegCircleUser className="w-[18px] h-[18px] text-gray-400" />
                              <span className="truncate">{user.role}</span>
                            </div>
                          </td>

                          {/* Action Buttons (Edit / Delete) */}
                          <td className="p-2">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                className="flex items-center gap-[3px] text-blue-600 hover:underline text-xs"
                                onClick={() => setShowEdit(true)} // ✅ FIX: open EditForm, not AddForm
                              >
                                <FiEdit className="text-sm" /> Edit
                              </button>
                              <button
                                className="flex items-center gap-[3px] text-red-600 hover:underline text-xs"
                                onClick={() => setShowDelete(true)}
                              >
                                <RiDeleteBin5Line className="text-sm" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-4 text-center text-gray-500"
                        >
                          No users found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* --- Pagination Controls --- */}
          <div className="mt-4 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
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

        {/* --- Modals --- */}
        {showDelete && (
          <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
        )}
        {showAdd && (
          <AddForm isVisible={showAdd} onClose={() => setShowAdd(false)} />
        )}
        {showEdit && (
          <EditForm isVisible={showEdit} onClose={() => setShowEdit(false)} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;
