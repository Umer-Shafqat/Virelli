import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

import shoesCategory from "../../assets/shoesCategory.png";
import hoodiesCategory from "../../assets/hoodiesCategory.png";
import jacketCategory from "../../assets/jacketCategory.png";
import watchCategory from "../../assets/watchCategory.png";
import capsCategory from "../../assets/capsCategory.png";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Shoes",
      image: shoesCategory,
    },
    {
      name: "Hoodies",
      image: hoodiesCategory,
    },
    {
      name: "Jackets",
      image: jacketCategory,
    },
    {
      name: "Watches",
      image: watchCategory,
    },
    {
      name: "Caps",
      image: capsCategory,
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/shoes?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="category-section">
      <h2 className="category-title">
        Shop by Category
      </h2>

      <div className="category-slider">
        <div className="category-track">

          {/* First set */}
          {categories.map((item, index) => (
            <div
              className="category-item"
              key={`first-${index}`}
              onClick={() =>
                handleCategoryClick(item.name)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCategoryClick(item.name);
                }
              }}
            >
              <div className="category-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <h3>{item.name}</h3>
            </div>
          ))}

          {/* Duplicate set */}
          {categories.map((item, index) => (
            <div
              className="category-item"
              key={`second-${index}`}
              onClick={() =>
                handleCategoryClick(item.name)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCategoryClick(item.name);
                }
              }}
            >
              <div className="category-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <h3>{item.name}</h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Category;
