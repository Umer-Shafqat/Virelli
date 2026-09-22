import React from "react";
import "./Category.css";
import { assets } from "../../assets/assets";

const Category = () => {

  const categories = [
    {
      name: "Shoes",
      image: assets.shoesCategory,
    },
    {
      name: "Hoodies",
      image: assets.hoodiesCategory,
    },
    {
      name: "Jackets",
      image: assets.jacketCategory,
    },
    {
      name: "Watches",
      image: assets.watchCategory,
    },
    {
      name: "Caps",
      image: assets.capsCategory,
    },
  ];

  return (
    <section className="category-section">

      <h2 className="category-title">
        Shop by Category
      </h2>

      <div className="category-list">

        {categories.map((category, index) => (

          <div className="category-item" key={index}>

            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
              />
            </div>

            <h3>{category.name}</h3>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Category;