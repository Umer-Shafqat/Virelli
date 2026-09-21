import React from "react";
import "./Category.css";
import { assets } from "../../assets/assets";

const Category = () => {
  const categories = [
    {
      name: "Chapal",
      image: assets.chapal1,
      category: "Chapal",
    },
    {
      name: "Formal",
      image: assets.formal1,
      category: "Formal",
    },
    {
      name: "Kids",
      image: assets.kid1,
      category: "Kids",
    },
    {
      name: "Loafers",
      image: assets.loafer1,
      category: "Loafer",
    },
    {
      name: "Men",
      image: assets.men1,
      category: "Men",
    },
    {
      name: "Sneakers",
      image: assets.sneaker1,
      category: "Sneakers",
    },
    {
      name: "Women",
      image: assets.women1,
      category: "Women",
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