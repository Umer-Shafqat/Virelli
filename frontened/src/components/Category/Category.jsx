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

  // =====================================================
  // CATEGORIES
  // =====================================================

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

  // =====================================================
  // CATEGORY CLICK
  // =====================================================

  const handleCategoryClick = (category) => {
    navigate(
      `/shoes?category=${encodeURIComponent(category)}`
    );
  };

  // =====================================================
  // CATEGORY ITEM
  // =====================================================

  const renderCategory = (
    item,
    index,
    prefix
  ) => {
    return (
      <div
        className="category-item"
        key={`${prefix}-${index}`}
        onClick={() =>
          handleCategoryClick(item.name)
        }
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            e.key === " "
          ) {
            e.preventDefault();

            handleCategoryClick(
              item.name
            );
          }
        }}
      >
        {/* ================= IMAGE ================= */}

        <div className="category-image">
          <img
            src={item.image}
            alt={item.name}
          />
        </div>

        {/* ================= CATEGORY NAME ================= */}

        <h3>
          {item.name}
        </h3>
      </div>
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <section className="category-section">

      {/* ================= TITLE ================= */}

      <h2 className="category-title">
        Shop by Category
      </h2>

      {/* ================= CATEGORY SLIDER ================= */}

      <div className="category-slider">

        <div className="category-track">

          {/* ================= FIRST SET ================= */}

          {categories.map(
            (item, index) =>
              renderCategory(
                item,
                index,
                "first"
              )
          )}

          {/* ================= SECOND SET =================
              Duplicate is intentional for
              infinite slider animation.
          */}

          {categories.map(
            (item, index) =>
              renderCategory(
                item,
                index,
                "second"
              )
          )}

        </div>

      </div>

    </section>
  );
};

export default Category;