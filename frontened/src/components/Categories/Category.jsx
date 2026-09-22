import React from "react";
import "./Category.css";
import { assets } from "../../assets/assets";

const Category = () => {
  const categories = [
    {
      name: "Chapal",
      image: assets.shoesCategory,
      category: "Chapal",
    },
    {
      name: "Jackets",
      image: assets.jacketcategory,
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
    <section className="categories">
      <div className="categories-heading">
        <p className="categories-subtitle">EXPLORE OUR COLLECTION</p>

        <h2>Shop By Category</h2>

        <p className="categories-description">
          Find the perfect footwear for every style and occasion.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <div className="category-image-container">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
            </div>

            <div className="category-content">
              <h3>{category.name}</h3>

              <button className="category-button">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;