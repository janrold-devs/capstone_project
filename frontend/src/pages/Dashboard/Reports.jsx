import React, { useState } from "react";
import Delete from "../../components/Delete";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { IoPrintSharp } from "react-icons/io5";
import DateRange from "../../components/DateRange";
import SalesReport from "../../components/Reports/SalesReport";
import SalesActivity from "../../components/Reports/SalesActivity";
import SpoilageReport from "../../components/Reports/SpoilageReport";
import StocksReport from "../../components/Reports/StocksReport";

const Reports = () => {
  // State to manage delete modal visibility
  const [showDelete, setShowDelete] = useState(false);

  // State to track which report category is selected
  const [selectedCategory, setSelectedCategory] = useState("");

  /**
   * Function to dynamically render the correct report
   * based on the category chosen from the dropdown.
   */
  const renderTable = () => {
    switch (selectedCategory) {
      case "sales":
        return <SalesReport />; // Sales report component (handles its own pagination)
      case "stocks":
        return <StocksReport />; // Stocks report component
      case "spoiled and damaged":
        return <SpoilageReport />; // Spoilage/damage report component
      case "sales activity":
        return <SalesActivity />; // Sales activity logs
      default:
        // Placeholder when no category is selected
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
      {/* Main container with blur effect when delete modal is open */}
      <div
        className={`bg-stone-100 p-4 rounded-lg border border-gray-200 flex flex-col flex-grow transition-all duration-300 ${
          showDelete ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <strong className="text-lg">Reports</strong>

        {/* ---------------- Top Controls ---------------- */}
        <div className="bg-white text-sm mt-3 flex flex-wrap items-center justify-between gap-4 p-2 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            {/* Category Dropdown to select report type */}
            <div className="relative">
              <BiCategory className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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

            {/* Divider Line */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Export Buttons (Excel, PDF, Print) */}
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

          {/* Date Range Picker (custom component) */}
          <DateRange />
        </div>

        {/* ---------------- Report Display Area ---------------- */}
        <div className="mt-4 flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          {renderTable()}
        </div>
      </div>

      {/* ---------------- Delete Modal ---------------- */}
      {showDelete && (
        <Delete isVisible={showDelete} onClose={() => setShowDelete(false)} />
      )}
    </div>
  );
};

export default Reports;
