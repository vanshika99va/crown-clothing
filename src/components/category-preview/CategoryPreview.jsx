import React from "react";
import "./CategoryPreview.scss";
import ProductCard from "../product-card/ProductCard";
import { Link } from "react-router-dom";

function CategoryPreview({ title, products }) {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title}>
          <span>{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className="preview">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPreview;
