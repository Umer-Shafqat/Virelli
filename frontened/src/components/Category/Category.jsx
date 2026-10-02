import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Category.css";

// =====================================================
// SHOES IMAGES
// =====================================================

import shoesCategory1 from "../../assets/shoesCategory.png";
import shoesCategory2 from "../../assets/shoesCategory2.png";
import shoesCategory3 from "../../assets/shoesCategory3.png";
import shoesCategory4 from "../../assets/shoesCategory4.png";

// =====================================================
// HOODIES IMAGES
// =====================================================

import hoodiesCategory1 from "../../assets/hoodiesCategory.png";
import hoodiesCategory2 from "../../assets/hoodiesCategory2.png";
import hoodiesCategory3 from "../../assets/hoodiesCategory3.png";
import hoodiesCategory4 from "../../assets/hoodiesCategory4.png";

// =====================================================
// JACKETS IMAGES
// =====================================================

import jacketCategory1 from "../../assets/jacketCategory.png";
import jacketCategory2 from "../../assets/jacketCategory2.png";
import jacketCategory3 from "../../assets/jacketCategory3.png";
import jacketCategory4 from "../../assets/jacketCategory4.png";

// =====================================================
// WATCHES IMAGES
// =====================================================

import watchCategory1 from "../../assets/watchCategory.png";
import watchCategory2 from "../../assets/watchCategory2.png";
import watchCategory3 from "../../assets/watchCategory3.png";
import watchCategory4 from "../../assets/watchCategory4.png";

// =====================================================
// CAPS IMAGES
// =====================================================

import capsCategory1 from "../../assets/capsCategory.png";
import capsCategory2 from "../../assets/capsCategory2.png";
import capsCategory3 from "../../assets/capsCategory3.png";
import capsCategory4 from "../../assets/capsCategory4.png";

const Category = () => {
  const navigate = useNavigate();

  // =====================================================
  // CURRENT IMAGES
  // =====================================================

  const [currentImages, setCurrentImages] =
    useState({});

  // =====================================================
  // HOVER INTERVALS
  // =====================================================

  const hoverIntervals =
    useRef({});

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    {
      name: "Shoes",

      images: [
        shoesCategory1,
        shoesCategory2,
        shoesCategory3,
        shoesCategory4,
      ],
    },

    {
      name: "Hoodies",

      images: [
        hoodiesCategory1,
        hoodiesCategory2,
        hoodiesCategory3,
        hoodiesCategory4,
      ],
    },

    {
      name: "Jackets",

      images: [
        jacketCategory1,
        jacketCategory2,
        jacketCategory3,
        jacketCategory4,
      ],
    },

    {
      name: "Watches",

      images: [
        watchCategory1,
        watchCategory2,
        watchCategory3,
        watchCategory4,
      ],
    },

    {
      name: "Caps",

      images: [
        capsCategory1,
        capsCategory2,
        capsCategory3,
        capsCategory4,
      ],
    },
  ];

  // =====================================================
  // CATEGORY CLICK
  // =====================================================

  const handleCategoryClick = (
    category
  ) => {
    navigate(
      `/shoes?category=${encodeURIComponent(
        category
      )}`
    );
  };

  // =====================================================
  // MOUSE ENTER
  // =====================================================

  const handleMouseEnter = (
    categoryIndex,
    images
  ) => {
    if (
      !Array.isArray(images) ||
      images.length <= 1
    ) {
      return;
    }

    // Clear existing interval
    if (
      hoverIntervals.current[
        categoryIndex
      ]
    ) {
      clearInterval(
        hoverIntervals.current[
          categoryIndex
        ]
      );
    }

    // Start with second image
    let currentIndex = 1;

    setCurrentImages((prev) => ({
      ...prev,
      [categoryIndex]: currentIndex,
    }));

    // =================================================
    // CYCLE THROUGH ALL IMAGES
    // =================================================

    hoverIntervals.current[
      categoryIndex
    ] = setInterval(() => {
      currentIndex =
        (currentIndex + 1) %
        images.length;

      setCurrentImages((prev) => ({
        ...prev,
        [categoryIndex]: currentIndex,
      }));
    }, 1000);
  };

  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = (
    categoryIndex
  ) => {
    // Stop slideshow
    if (
      hoverIntervals.current[
        categoryIndex
      ]
    ) {
      clearInterval(
        hoverIntervals.current[
          categoryIndex
        ]
      );

      delete hoverIntervals.current[
        categoryIndex
      ];
    }

    // Return to first image
    setCurrentImages((prev) => ({
      ...prev,
      [categoryIndex]: 0,
    }));
  };

  // =====================================================
  // MANUAL IMAGE CHANGE
  // =====================================================

  const handleImageChange = (
    categoryIndex,
    imageIndex
  ) => {
    // Stop hover slideshow
    if (
      hoverIntervals.current[
        categoryIndex
      ]
    ) {
      clearInterval(
        hoverIntervals.current[
          categoryIndex
        ]
      );

      delete hoverIntervals.current[
        categoryIndex
      ];
    }

    setCurrentImages((prev) => ({
      ...prev,
      [categoryIndex]: imageIndex,
    }));
  };

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    const intervals =
      hoverIntervals.current;

    return () => {
      Object.values(intervals).forEach(
        (interval) => {
          clearInterval(interval);
        }
      );
    };
  }, []);

  // =====================================================
  // CATEGORY ITEM
  // =====================================================

  const renderCategory = (
    item,
    index,
    prefix
  ) => {
    const currentImageIndex =
      currentImages[index] || 0;

    const currentImage =
      item.images[
        currentImageIndex
      ] || item.images[0];

    return (
      <div
        className="category-item"
        key={`${prefix}-${index}`}
        onClick={() =>
          handleCategoryClick(
            item.name
          )
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
        onMouseEnter={() =>
          handleMouseEnter(
            index,
            item.images
          )
        }
        onMouseLeave={() =>
          handleMouseLeave(index)
        }
      >
        {/* ================= IMAGE ================= */}

        <div className="category-image">

          <img
            src={currentImage}
            alt={item.name}
          />

          {/* ================= IMAGE DOTS ================= */}

          {item.images.length > 1 && (
            <div className="category-image-dots">

              {item.images.map(
                (_, imageIndex) => (
                  <button
                    key={imageIndex}
                    type="button"
                    className={
                      currentImageIndex ===
                      imageIndex
                        ? "category-image-dot active"
                        : "category-image-dot"
                    }
                    onClick={(e) => {
                      e.stopPropagation();

                      handleImageChange(
                        index,
                        imageIndex
                      );
                    }}
                    aria-label={`Show ${item.name} image ${
                      imageIndex + 1
                    }`}
                  />
                )
              )}

            </div>
          )}

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