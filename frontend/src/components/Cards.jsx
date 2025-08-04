import React from "react";

function Card({ imgSrc, data, title }) {
  return (
    <div className="card">
      <img className="card-img" src={imgSrc} alt="Card Icon" />
      <div className="card-text">
        <h2 className="card-data">{data}</h2>
        <h4 className="card-title">{title}</h4>
      </div>
    </div>
  );
}

export default Card;
