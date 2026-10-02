import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Category.css";

// =====================================================
// CATEGORY IMAGES
// =====================================================

import shoesCategory from "../../assets/shoesCategory.png";
import hoodiesCategory from "../../assets/hoodiesCategory.png";
import jacketCategory from "../../assets/jacketCategory.png";
import watchCategory from "../../assets/watchCategory.png";
import capsCategory from "../../assets/capsCategory.png";


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
        shoesCategory,
        shoesCategory,
        shoesCategory,
        shoesCategory,
      ],
    },

    {
      name: "Hoodies",

      images: [
        hoodiesCategory,
        hoodiesCategory,
        hoodiesCategory,
        hoodiesCategory,
      ],
    },

    {
      name: "Jackets",

      images: [
        jacketCategory,
        jacketCategory,
        jacketCategory,
        jacketCategory,
      ],
    },

    {
      name: "Watches",

      images: [
        watchCategory,
        watchCategory,
        watchCategory,
        watchCategory,
      ],
    },

    {
      name: "Caps",

      images: [
        capsCategory,
        capsCategory,
        capsCategory,
        capsCategory,
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
    categoryId,
    images
  ) => {

    if (
      !Array.isArray(images) ||
      images.length <= 1
    ) {

      return;

    }


    // =================================================
    // CLEAR EXISTING INTERVAL
    // =================================================

    if (
      hoverIntervals.current[
        categoryId
      ]
    ) {

      clearInterval(
        hoverIntervals.current[
          categoryId
        ]
      );

    }


    // =================================================
    // START WITH SECOND IMAGE
    // =================================================

    let currentIndex = 1;


    setCurrentImages((prev) => ({

      ...prev,

      [categoryId]:
        currentIndex,

    }));


    // =================================================
    // CYCLE THROUGH IMAGES
    // =================================================

    hoverIntervals.current[
      categoryId
    ] = setInterval(() => {

      currentIndex =
        (currentIndex + 1) %
        images.length;


      setCurrentImages((prev) => ({

        ...prev,

        [categoryId]:
          currentIndex,

      }));

    }, 1000);

  };


  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = (
    categoryId
  ) => {

    // =================================================
    // STOP SLIDESHOW
    // =================================================

    if (
      hoverIntervals.current[
        categoryId
      ]
    ) {

      clearInterval(
        hoverIntervals.current[
          categoryId
        ]
      );

      delete hoverIntervals.current[
        categoryId
      ];

    }


    // =================================================
    // RETURN TO FIRST IMAGE
    // =================================================

    setCurrentImages((prev) => ({

      ...prev,

      [categoryId]: 0,

    }));

  };


  // =====================================================
  // MANUAL IMAGE CHANGE
  // =====================================================

  const handleImageChange = (
    categoryId,
    imageIndex
  ) => {

    // =================================================
    // STOP HOVER SLIDESHOW
    // =================================================

    if (
      hoverIntervals.current[
        categoryId
      ]
    ) {

      clearInterval(
        hoverIntervals.current[
          categoryId
        ]
      );

      delete hoverIntervals.current[
        categoryId
      ];

    }


    // =================================================
    // CHANGE IMAGE
    // =================================================

    setCurrentImages((prev) => ({

      ...prev,

      [categoryId]:
        imageIndex,

    }));

  };


  // =====================================================
  // CLEANUP
  // VERCEL SAFE
  // =====================================================

  useEffect(() => {

    const intervals =
      hoverIntervals.current;


    return () => {

      Object.values(
        intervals
      ).forEach(
        (interval) => {

          clearInterval(
            interval
          );

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

    // =================================================
    // UNIQUE CATEGORY ID
    // =================================================

    const categoryId =
      `${prefix}-${index}`;


    // =================================================
    // CURRENT IMAGE INDEX
    // =================================================

    const currentImageIndex =
      currentImages[
        categoryId
      ] || 0;


    // =================================================
    // CURRENT IMAGE
    // =================================================

    const currentImage =
      item.images[
        currentImageIndex
      ] ||
      item.images[0];


    return (

      <div
        className="category-item"

        key={categoryId}

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
            categoryId,
            item.images
          )
        }

        onMouseLeave={() =>
          handleMouseLeave(
            categoryId
          )
        }

      >

        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="category-image">

          <img
            src={currentImage}
            alt={item.name}
          />


          {/* =================================================
              IMAGE DOTS
          ================================================= */}

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
                        categoryId,
                        imageIndex
                      );

                    }}

                    aria-label={
                      `Show ${
                        item.name
                      } image ${
                        imageIndex + 1
                      }`
                    }

                  />

                )
              )}

            </div>

          )}

        </div>


        {/* =================================================
            CATEGORY NAME
        ================================================= */}

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


      {/* =================================================
          TITLE
      ================================================= */}

      <h2 className="category-title">

        Shop by Category

      </h2>


      {/* =================================================
          CATEGORY SLIDER
      ================================================= */}

      <div className="category-slider">

        <div className="category-track">


          {/* =================================================
              FIRST SET
          ================================================= */}

          {categories.map(
            (item, index) =>
              renderCategory(
                item,
                index,
                "first"
              )
          )}


          {/* =================================================
              SECOND SET
              Duplicate for infinite slider
          ================================================= */}

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