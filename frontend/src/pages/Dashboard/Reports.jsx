import React, { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { IoPrintSharp } from "react-icons/io5";
import DateRange from "../../components/DateRange";
import SalesReport from "../../components/Reports/SalesReport";

const SalesReportTable = ({ currentPage, itemsPerPage }) => (
  <div className="flex-1">
    <SalesReport currentPage={currentPage} itemsPerPage={itemsPerPage} />
  </div>
);

const StockReportTable = () => (
  <div className="p-8 text-center text-gray-500 flex-1 flex items-center justify-center">
    <div>
      <div className="text-4xl mb-4">📊</div>
      <h3 className="text-lg font-medium mb-2">Stock Report</h3>
      <p className="text-sm">Stock report table will be displayed here</p>
    </div>
  </div>
);

const SpoiledAndDamagedReportTable = () => (
  <div className="p-8 text-center text-gray-500 flex-1 flex items-center justify-center">
    <div>
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-medium mb-2">Spoiled and Damaged Report</h3>
      <p className="text-sm">
        Spoiled and damaged report table will be displayed here
      </p>
    </div>
  </div>
);

const SalesActivityReportTable = () => (
  <div className="p-8 text-center text-gray-500 flex-1 flex items-center justify-center">
    <div>
      <div className="text-4xl mb-4">📈</div>
      <h3 className="text-lg font-medium mb-2">Sales Activity Report</h3>
      <p className="text-sm">
        Sales activity report table will be displayed here
      </p>
    </div>
  </div>
);

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const totalPages = 5;
  const itemsPerPage = 10;

  const renderTable = () => {
    switch (selectedCategory) {
      case "sales":
        return (
          <SalesReportTable
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        );
      case "stocks":
        return <StockReportTable />;
      case "spoiled and damaged":
        return <SpoiledAndDamagedReportTable />;
      case "sales activity":
        return <SalesActivityReportTable />;
      default:
        return (
          <div className="p-8 text-center text-gray-500 flex-1 flex items-center justify-center">
            <div>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium mb-2">
                Select a Report Category
              </h3>
              <p className="text-sm">
                Please select a report category from the dropdown above to view
                the data
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col relative">
      <div
        className={`bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow transition-all duration-300 ${
          showDelete ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <strong className="text-lg">Reports</strong>

        {/* Top Controls */}
        <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            {/* Category Dropdown */}
            <div className="relative">
              <BiCategory className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-7 w-full h-[38px] text-gray-500 p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-300 transition-all duration-200"
              >
                <option value="">Select Report Category</option>
                <option value="sales">Sales Report</option>
                <option value="stocks">Stocks Report</option>
                <option value="spoiled and damaged">
                  Spoiled and Damaged Report
                </option>
                <option value="sales activity">Sales Activity</option>
              </select>
            </div>

            <div className="w-px h-8 bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white text-sm px-3 py-2 rounded h-[35px] shadow-md transition-colors">
                <PiMicrosoftExcelLogoFill className="text-lg" />
                Excel
              </button>
              <button className="flex items-center gap-1 bg-red-800 hover:bg-red-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md transition-colors">
                <FaFilePdf />
                PDF
              </button>
              <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded h-[35px] shadow-md transition-colors">
                <IoPrintSharp />
                Print
              </button>
            </div>
          </div>

          {/* Date Range */}
          <DateRange />
        </div>

        {/* Table Area (scrollable, fixed height) */}
        <div className="mt-3 flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-y-auto h-full">{renderTable()}</div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
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

      {/* Delete Modal */}
      {showDelete && (
        <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
      )}
    </div>
  );
};

export default Reports;
