import React from "react";
import "./Category.css";

import shoesCategory from "../../assets/shoesCategory.png";
import jacketCategory from "../../assets/jacketCategory.png";
import hoodiesCategory from "../../assets/hoodiesCategory.png";
import watchCategory from "../../assets/watchCategory.png";
import capsCategory from "../../assets/capsCategory.png";

const Category = () => {
  const categories = [
    {
      name: "Shoes",
      image: shoesCategory,
      category: "Shoes",
    },
    {
      name: "Jackets",
      image: jacketCategory,
      category: "Jackets",
    },
    {
      name: "Hoodies",
      image: hoodiesCategory,
      category: "Hoodies",
    },
    {
      name: "Watches",
      image: watchCategory,
      category: "Watches",
    },
    {
      name: "Caps",
      image: capsCategory,
      category: "Caps",
    },
  ];

  return (
    <section className="category-section">
      <h2>Shop By Category</h2>

      <div className="category-container">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <img src={item.image} alt={item.name} />

            <div className="category-overlay">
              <h3>{item.name}</h3>
              <p>SHOP NOW</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;