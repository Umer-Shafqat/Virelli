import React from "react";
import "./Category.css";
import { assets } from "../../assets/assets";

const Category = () => {
  const categories = [
    {
      name: "Shoes",
      image: assets.shoesCategory,
      category: "Shoes",
    },
    {
      name: "Jackets",
      image: assets.jacketCategory,
      category: "Jackets",
    },
    {
      name: "Hoodies",
      image: assets.hoodiesCategory,
      category: "Hoodies",
    },
    {
      name: "Watches",
      image: assets.watchCategory,
      category: "Watches",
    },
    {
      name: "Caps",
      image: assets.capsCategory,
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