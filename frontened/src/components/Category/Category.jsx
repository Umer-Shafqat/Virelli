import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Shoes",
      image: "/images/shoes-category.jpg",
      path: "/shoes",
    },
    {
      name: "Jackets",
      image: "/images/jackets-category.jpg",
      path: "/shoes",
    },
    {
      name: "Hoodies",
      image: "/images/hoodies-category.jpg",
      path: "/shoes",
    },
    {
      name: "Watches",
      image: "/images/watches-category.jpg",
      path: "/shoes",
    },
    {
      name: "Caps",
      image: "/images/caps-category.jpg",
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