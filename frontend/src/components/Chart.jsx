import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// -------------------- Sample Sales Data by Time Range --------------------
const timeRangeData = {
  "This Week": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [1200, 1800, 1500, 2400, 2100, 3200, 2800],
    title: "Weekly Sales",
  },
  "This Month": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [8500, 10200, 9800, 12500],
    title: "Monthly Sales",
  },
  "This Year": {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [
      1000, 2200, 1900, 5000, 3300, 6100, 3000, 8200, 7400, 6900, 8500, 10400,
    ],
    title: "Yearly Sales",
  },
};

export default function ChartComponent() {
  // -------------------- State: Current Time Range --------------------
  const [timeRange, setTimeRange] = useState("This Month");

  // Fetch the data for the currently selected range
  const currentData = timeRangeData[timeRange];

  // -------------------- Chart Configuration --------------------
  const options = {
    responsive: true,
    tension: 0.4, // curve smoothness
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: currentData.title, // dynamic chart title based on selection
      },
    },
    scales: {
      y: {
        beginAtZero: true, // always start Y-axis at zero
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // subtle grid lines
        },
        ticks: {
          callback: function (value) {
            return "$" + value; // format values as currency
          },
        },
      },
      x: {
        grid: {
          display: false, // hide vertical grid lines
        },
      },
    },
  };

  // -------------------- Chart Data --------------------
  const data = {
    labels: currentData.labels, // X-axis labels (days/weeks/months)
    datasets: [
      {
        label: "Amount of Money",
        data: currentData.values, // Y-axis values (sales)
        borderColor: "rgba(250, 108, 90, 1)", // line color
        backgroundColor: "rgba(250, 109, 90, 0.4)", // fill color under line
        fill: true,
        tension: 0.4, // smooth curve
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* -------------------- Header: Title + Time Range Buttons -------------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">Sales Overview</h2>

        {/* Toggle between "This Week", "This Month", "This Year" */}
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          {Object.keys(timeRangeData).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? "bg-white text-red-400 shadow-sm" // active button style
                  : "text-gray-600 hover:text-gray-800" // inactive button style
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------- Line Chart -------------------- */}
      <div className="h-64 sm:h-80">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
