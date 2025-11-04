import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;

  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-4 pt-4">
        <img
          src={image ? image : "https://i.ibb.co.com/84YCgRfN/demo-app-5.webp"}
          alt={title}
          className="rounded-xl"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://i.ibb.co.com/84YCgRfN/demo-app-5.webp"; // Direct image link
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          Price: ${price_min} - {price_max}
        </p>
        <div className="card-actions">
          <Link
            to={`/productDetails/${_id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
