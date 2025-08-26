import React from "react";
import ChartComponent from "../../components/Chart"; // Line Chart (custom chart component)
import { GrTransaction } from "react-icons/gr";
import { GiMoneyStack } from "react-icons/gi";
import { MdInventory } from "react-icons/md";
import { RiFileDamageFill } from "react-icons/ri";
import DashboardLayout from "../../components/layouts/DashboardLayout";

function Home() {
  // ---------------------- Dashboard Card Data ----------------------
  const cardData = [
    {
      id: 1,
      icon: <GrTransaction className="text-blue-600 w-6 h-6" />,
      value: "1032",
      label: "Product Transaction",
      change: "+34,938 this month",
      trend: "up", // used for styling (green if "up", red if "down")
    },
    {
      id: 2,
      icon: <GiMoneyStack className="text-green-600 w-6 h-6" />,
      value: "$32,560.00",
      label: "Sales",
      change: "+34,938 this month",
      trend: "up",
    },
    {
      id: 3,
      icon: <MdInventory className="text-purple-600 w-6 h-6" />,
      value: "1103",
      label: "Number of Stock In",
      change: "+34,938 this month",
      trend: "up",
    },
    {
      id: 4,
      icon: <RiFileDamageFill className="text-red-600 w-6 h-6" />,
      value: "1206",
      label: "Spoiled and Damaged Ingredients",
      change: "+34,938 this month",
      trend: "down",
    },
  ];

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
        {/* ---------------------- Main content area ---------------------- */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* ---------------------- Top Stats Cards ---------------------- */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {cardData.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Card header: icon + monthly change trend */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-gray-100">{card.icon}</div>
                  {/* Green if trend is up, red if down */}
                  <span
                    className={`text-sm font-medium ${
                      card.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </span>
                </div>

                {/* Card main value & label */}
                <div className="mt-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {card.value}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{card.label}</p>
                </div>

                {/* Progress bar (visual indicator of growth/decline) */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        card.trend === "up" ? "bg-green-500" : "bg-red-500"
                      }`}
                      // Different widths to visualize performance
                      style={{ width: card.trend === "up" ? "75%" : "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------------- Bottom Section ---------------------- */}
          <div className="flex-1 flex space-x-6 overflow-hidden">
            {/* --------- Chart Section --------- */}
            <div className="w-3/5 bg-white rounded-xl border border-gray-200 p-6 shadow-md overflow-hidden">
              <div className="h-full">
                {/* Line chart showing sales/transactions trend */}
                <ChartComponent />
              </div>
            </div>

            {/* --------- Best Selling Products Section --------- */}
            <div className="w-2/5 bg-white rounded-xl border border-gray-200 p-6 shadow-md overflow-hidden flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Best Selling Products
              </h2>

              {/* Scrollable list of products with sales data */}
              <div className="flex-1 overflow-y-auto">
                {[
                  { name: "Product A", sales: 1254 },
                  { name: "Product B", sales: 987 },
                  { name: "Product C", sales: 763 },
                  { name: "Product D", sales: 542 },
                  { name: "Product E", sales: 410 },
                  { name: "Product F", sales: 398 },
                  { name: "Product G", sales: 356 },
                  { name: "Product H", sales: 312 },
                  { name: "Product I", sales: 287 },
                  { name: "Product J", sales: 254 },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Product name */}
                    <span className="text-gray-700">{product.name}</span>
                    {/* Number of units sold */}
                    <span className="font-medium text-gray-900">
                      {product.sales} units
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
