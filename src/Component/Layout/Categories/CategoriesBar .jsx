import React from "react";
import "./CategoriesBar.css"; // Your custom styles
import "bootstrap/dist/css/bootstrap.min.css";

const CategoriesBar = ({ onCategorySelect }) => {
  const categories = [
    "All",
    "Toys",
    "Furniture",
    "Clothing",
    "Feeding",
    "Bath",
    "Safety",
    "Travel",
  ];

  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-center">
        {categories.map((category) => (
          <div
            key={category}
            className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center mb-2"
          >
            <button
              className="btn category-btn-baby w-100 text-white bg-info"
              onClick={() => onCategorySelect(category)}
              style={{ borderRadius: "10px" }}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesBar;
