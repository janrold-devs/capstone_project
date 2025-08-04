import React from "react";
import Card from "../../components/Cards";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="card-container">
        <Card
          imgSrc="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
          data="10XX"
          title="Product Transaction"
        />
        <Card
          imgSrc="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
          data="20XX"
          title="Sales"
        />
        <Card
          imgSrc="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
          data="30XX"
          title="Number of Stock In"
        />
        <Card
          imgSrc="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
          data="40XX"
          title="Number of Spoiled and Damaged Ingredients"
        />
      </div>

      {/* For Sale and Best Selling Card */}
      <div className="card-container">
        <Card
          imgSrc="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
          data="40XX"
          title="Sales"
        />
        <Card
          imgSrc="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
          data="40XX"
          title="Best Selling Products"
        />
      </div>
    </>
  );
};

export default Home;
