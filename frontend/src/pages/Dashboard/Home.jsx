import React from "react";
import ChartComponent from "../../components/Chart"; // Line Chart
import { GrTransaction } from "react-icons/gr";
import { GiMoneyStack } from "react-icons/gi";
import { MdInventory } from "react-icons/md";
import { RiFileDamageFill } from "react-icons/ri";

function Home() {
  const cardData = [
    {
      id: 1,
      icon: <GrTransaction className="text-black-500 w-8 h-8 mr-4" />,
      value: "1032",
      label: "Product Transaction",
    },
    {
      id: 2,
      icon: <GiMoneyStack className="text-black-500 w-8 h-8 mr-4" />,
      value: "2513",
      label: "Sales",
    },
    {
      id: 3,
      icon: <MdInventory className="text-black-500 w-8 h-8 mr-4" />,
      value: "1103",
      label: "Number of Stock In",
    },
    {
      id: 4,
      icon: <RiFileDamageFill className="text-black-500 w-8 h-8 mr-4" />,
      value: "1206",
      label: "Spoiled and Damaged Ingredients",
    },
  ];

  return (
    <div className="flex flex-col space-y-4 py-12 px-10">
      {/* Cards */}
      <div className="flex space-x-8">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="w-full h-[70px] border border-gray-300 rounded flex items-center p-4 shadow-md"
          >
            {card.icon}
            <div className="flex flex-col justify-center">
              <span className="text-[20px] font-semibold leading-none">
                {card.value}
              </span>
              <span className="text-[14px] text-gray-700 leading-tight">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-8 mt-5">
        {/* Chart takes most of the width */}

        <div className="w-3/5 space-x-8 border border-gray-300 rounded flex flex-col justify-start p-5 shadow-md">
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
