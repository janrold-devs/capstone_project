import React from "react";
import { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
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
  // State to hold the user's search input
  const [query, setQuery] = React.useState("");

  // State to track the current page number in pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // Number of products to display per page
  const itemsPerPage = 15;

  // Filter the product list based on the user's search query
  const filteredProducts = data.filter((order) =>
    order.firstname.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate the total number of pages based on the filtered results
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get the products to be shown on the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, // start index
    currentPage * itemsPerPage // end index (non-inclusive)
  );

  // Function to go to the previous page
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to go to the next page
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Delete Modal
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="p-6 min-h-screen flex flex-col">
        <div className="bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow">
          <strong className="text-lg">User Management</strong>

          {/* Top Controls Row */}
          <div
            className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4  p-2 rounded-lg shadow-sm"
            overflow-hidden
          >
            {/* Buttons - Left Side */}
            <div className="flex items-center gap-3">
              {/* Add Product Button */}
              <button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white text-sm p-2 rounded h-[35px] shadow-md">
                + Add User
              </button>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-gray-300"></div>

              {/* Export Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white text-sm px-3 py-2 rounded h-[35px] shadow-md">
                  <PiMicrosoftExcelLogoFill className="text-lg" />
                  Excel
                </button>

                <button className="flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md">
                  <FaFilePdf />
                  PDF
                </button>
                <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2  rounded h-[35px] shadow-md">
                  <IoPrintSharp />
                  Print
                </button>
              </div>
            </div>

            {/* Search Bar - Right Side */}
            <div className="flex-1 max-w-xs relative">
              <input
                className="p-3 pr-10 px-4 bg-gray-50 border border-gray-300 rounded-lg h-[35px] w-full shadow-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
                type="text"
                placeholder="Search by first name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
              <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="mt-3 flex flex-col flex-grow">
            <table className="bg-white w-full text-sm border-collapse rounded-lg shadow-sm overflow-hidden">
              <thead className="border-b-3 border-stone-100 text-center">
                <tr>
                  <th className="p-1">First Name</th>
                  <th className="p-1">Last Name</th>
                  <th className="p-1">Username</th>
                  <th className="p-1">Email</th>
                  <th className="p-1">Role</th>
                  <th className="p-1 w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-3 divide-stone-100 text-center">
                {paginatedProducts.map((order) => (
                  <tr key={order.id}>
                    <td className="p-1">{order.firstname}</td>
                    <td className="p-1">{order.lastname}</td>
                    <td className="p-1">{order.username}</td>
                    <td className="p-1">{order.email}</td>
                    <td className="p-1">{order.role}</td>
                    <td className="p-1 w-[150px]">
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
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-auto pt-4">
              <div className="flex justify-end">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-1 hover:underline disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 hover:underline disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
    </>
  );
};

export default Users;
