import React from "react";
import ChartComponent from "../../components/Chart"; // This is your Line chart

function Home() {
  const cardData = [
    {
      id: 1,
      icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
      value: "1032",
      label: "Product Transaction",
    },
    {
      id: 2,
      icon: "https://cdn-icons-png.flaticon.com/512/1170/1170627.png",
      value: "2513",
      label: "Sales",
    },
    {
      id: 3,
      icon: "https://cdn-icons-png.flaticon.com/512/1170/1170638.png",
      value: "1103",
      label: "Number of Stock In",
    },
    {
      id: 4,
      icon: "https://cdn-icons-png.flaticon.com/512/1170/1170638.png",
      value: "1206",
      label: "Number of Spoiled and Damaged Ingredients",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 py-12 px-10">
      <h2 className="text-[35px] font-semibold">Dashboard</h2>

      {/* Cards */}
      <div className="flex space-x-8">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="w-1/5 h-[110px] border border-gray-300 rounded flex items-center p-5"
          >
            <img src={card.icon} alt="icon" className="w-10 h-10 mr-4" />
            <div className="flex flex-col justify-center">
              <span className="text-[30px] font-semibold leading-none">
                {card.value}
              </span>
              <span className="text-[17px] text-gray-700 leading-tight">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-8 mt-5">
        {/* Chart takes most of the width */}
        <div className="w-3/5">
          <ChartComponent />
        </div>

        {/* Best Selling Products */}
        <div className="w-1/5">
          <div className="h-full border border-gray-300 rounded flex flex-col justify-start p-5 shadow-md">
            <span className="text-[20px] font-semibold text-center text-gray-800 leading-snug">
              Best Selling Products
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
