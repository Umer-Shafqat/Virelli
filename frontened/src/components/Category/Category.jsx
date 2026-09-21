import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

import shoesCategory from "../../assets/shoes-category.jpeg";
import jacketsCategory from "../../assets/jackets-category.jpg";
import hoodiesCategory from "../../assets/hoodies-category.jpg";
import watchesCategory from "../../assets/watches-category.jpg";
import capsCategory from "../../assets/caps-category.jpg";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Shoes",
      image: shoesCategory,
      path: "/shoes",
    },
    {
      name: "Jackets",
      image: jacketsCategory,
      path: "/shoes",
    },
    {
      name: "Hoodies",
      image: hoodiesCategory,
      path: "/shoes",
    },
    {
      name: "Watches",
      image: watchesCategory,
      path: "/shoes",
    },
    {
      name: "Caps",
      image: capsCategory,
      path: "/shoes",
    },
  ];

  return (
    <section className="category-section">
      <div className="category-heading">
        <p>EXPLORE VIRELLI</p>
        <h2>Shop By Category</h2>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category.name}
            onClick={() => navigate(category.path)}
          >
            <img src={category.image} alt={category.name} />
            <div className="category-overlay">
              <h3>{category.name}</h3>
              <span>SHOP NOW</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
