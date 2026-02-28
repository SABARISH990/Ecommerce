import React from "react";
import {Link} from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].image} // first image
            alt={product.name}
            className="card-img-top"
          />
        ) : (
          <img
            src="https://via.placeholder.com/150" // fallback image
            alt="no image"
            className="card-img-top"
          />
        )}
        <div className="card-body">
          <h5 className="card-title">
             <Link to={"/product/"+product._id}>{product.name}</Link>
            </h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">₹ {product.price}</p>
               {/* Rating Stars (always 5 stars) */}
  <div className="mb-2">
    <span style={{ color: "#f5c518" }}>★</span>
    <span style={{ color: "#f5c518" }}>★</span>
    <span style={{ color: "#f5c518" }}>★</span>
    <span style={{ color: "#f5c518" }}>★</span>
    <span style={{ color: "#f5c518" }}>★</span>
  </div>



           <Link to={"/product/"+product._id} href='#' id="view_btn" className="btn btn-block">View Details</Link>
        </div>
      </div>
    </div>
  );
}
