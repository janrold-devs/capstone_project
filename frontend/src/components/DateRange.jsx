import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { IoCalendarOutline } from "react-icons/io5";

const DateRange = ({ onDateChange }) => {
  const [isShowDateRange, setIsShowDateRange] = useState(false);
  const [state, setState] = useState(null); // null means "all dates"

  const handleClear = () => {
    setState(null);
    setIsShowDateRange(false);
    if (onDateChange) onDateChange(null);
  };

  const handleSelect = (item) => {
    const selection = item.selection;
    setState([selection]);
    if (onDateChange) onDateChange(selection);
  };

  const handleClose = (e) => {
    if (e.target.id === "calendar-wrapper") {
      setIsShowDateRange(false);
    }
  };

  return (
    <div className="flex items-center justify-between max-w-full relative gap-4">
      {/* Selected Date Text */}
      <h3 className="text-gray-700 text-sm font-medium whitespace-nowrap">
        {state
          ? `${state[0].startDate.toDateString()} - ${state[0].endDate.toDateString()}`
          : "All Dates"}
      </h3>

      {/* Button to open calendar */}
      <button
        onClick={() => setIsShowDateRange(true)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
      >
        <IoCalendarOutline className="text-lg text-gray-500" />
        <span className="text-gray-600">Select Date Range</span>
      </button>

      {/* Full-screen overlay like Delete modal */}
      {isShowDateRange && (
        <div
          id="calendar-wrapper"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={false}
              showDateDisplay={false}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={
                state || [
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                  },
                ]
              }
              direction="horizontal"
              rangeColors={["#E8A7AC"]}
            />

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleClear}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear
              </button>
              <button
                onClick={() => setIsShowDateRange(false)}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRange;
