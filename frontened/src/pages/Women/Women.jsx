import React, {
  useContext,
  useState,
  useEffect,
} from "react";

import "./Women.css";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";


const Women = () => {

  const {
    shoes,
    addToCart,
  } = useContext(StoreContext);


  const [shoeList, setShoeList] =
    useState([]);

  const [selectedSizes, setSelectedSizes] =
    useState({});


  // =====================================================
  // SIZE REQUIRED CATEGORIES
  // =====================================================

  const sizeRequiredCategories = [
    "Shoes",
    "Hoodies",
    "Chapal",
    "Jackets",
  ];


  // =====================================================
  // CHECK IF PRODUCT REQUIRES SIZE
  // =====================================================

  const requiresSize = (shoe) => {

    const category = String(
      shoe?.category || ""
    )
      .trim()
      .toLowerCase();

    return sizeRequiredCategories.some(
      (requiredCategory) =>
        category ===
        requiredCategory.toLowerCase()
    );

  };


  // =====================================================
  // FILTER WOMEN PRODUCTS
  // =====================================================

  useEffect(() => {

    if (Array.isArray(shoes)) {

      setShoeList(

        shoes.filter(
          (item) =>
            item.type?.toUpperCase() ===
            "WOMEN"
        )

      );

    } else {

      setShoeList([]);

    }

  }, [shoes]);


  // =====================================================
  // SELECT SIZE
  // =====================================================

  const handleSizeSelect = (
    shoeId,
    size
  ) => {

    setSelectedSizes((prev) => ({

      ...prev,

      [shoeId]: size,

    }));

  };


  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (shoe) => {

    const shoeId =
      shoe?._id ||
      shoe?.id ||
      shoe?.shoeId;


    // -----------------------------------------
    // CHECK PRODUCT ID
    // -----------------------------------------

    if (!shoeId) {

      alert(
        "Product ID is missing"
      );

      return;

    }


    const productRequiresSize =
      requiresSize(shoe);


    // =========================================
    // PRODUCTS THAT REQUIRE SIZE
    // Shoes / Hoodies / Chapal / Jackets
    // =========================================

    if (productRequiresSize) {

      const selectedSize =
        selectedSizes[shoeId];


      if (!selectedSize) {

        alert(
          "Please select a size first"
        );

        return;

      }


      addToCart(
        shoe,
        selectedSize
      );

      return;

    }


    // =========================================
    // PRODUCTS THAT DO NOT REQUIRE SIZE
    // Caps / Watches
    // =========================================

    addToCart(
      shoe,
      "no-size"
    );

  };


  // =====================================================
  // RATING
  // =====================================================

  const handleRating = (
    shoeId,
    selectedRating
  ) => {

    setShoeList(
      (prevShoes) =>

        prevShoes.map(
          (shoe) => {

            if (
              shoe._id === shoeId
            ) {

              const oldTotalRatings =
                shoe.rating
                  ?.totalRatings || 0;


              const oldRatingSum =
                shoe.rating
                  ?.ratingSum || 0;


              return {

                ...shoe,

                rating: {

                  totalRatings:
                    oldTotalRatings + 1,

                  ratingSum:
                    oldRatingSum +
                    selectedRating,

                },

              };

            }


            return shoe;

          }

        )

    );

  };


  // =====================================================
  // CLOUDINARY IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {

    // -----------------------------------------
    // NEW CLOUDINARY STRUCTURE
    // -----------------------------------------

    if (
      Array.isArray(shoe.images) &&
      shoe.images.length > 0
    ) {

      const image =
        shoe.images[0];


      // Cloudinary URL

      if (
        typeof image === "string" &&
        (
          image.startsWith(
            "http://"
          ) ||
          image.startsWith(
            "https://"
          )
        )
      ) {

        return image;

      }


      // -----------------------------------------
      // OLD LOCAL IMAGE SUPPORT
      // -----------------------------------------

      if (
        typeof image === "string"
      ) {

        const API_URL =
          process.env.REACT_APP_API_URL ||
          "http://localhost:4000";

        return `${API_URL}/images/${image}`;

      }

    }


    // -----------------------------------------
    // OLD `image` FIELD SUPPORT
    // -----------------------------------------

    if (shoe.image) {

      if (
        typeof shoe.image === "string" &&
        (
          shoe.image.startsWith(
            "http://"
          ) ||
          shoe.image.startsWith(
            "https://"
          )
        )
      ) {

        return shoe.image;

      }


      const API_URL =
        process.env.REACT_APP_API_URL ||
        "http://localhost:4000";

      return `${API_URL}/images/${shoe.image}`;

    }


    return "";

  };


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <section className="women-page">


      {/* =================================================
          HEADING
      ================================================= */}

      <div className="women-heading">

        <h2>
          Women's Collection
        </h2>

        <p>
          Explore our latest women's
          products
        </p>

      </div>


      {/* =================================================
          SHOES GRID
      ================================================= */}

      <div className="shoes-grid">

        {shoeList.map((shoe) => {


          // =================================================
          // PRICE
          // =================================================

          const price =
            Number(shoe.price || 0);


          const discountedPrice =
            price -
            (
              price *
              Number(
                shoe.discount || 0
              )
            ) /
              100;


          // =================================================
          // RATING
          // =================================================

          const averageRating =
            shoe.rating &&
            shoe.rating.totalRatings > 0

              ? shoe.rating.ratingSum /
                shoe.rating.totalRatings

              : 5;


          // =================================================
          // IMAGE
          // =================================================

          const imageUrl =
            getImageUrl(shoe);


          // =================================================
          // SIZE REQUIREMENT
          // =================================================

          const productRequiresSize =
            requiresSize(shoe);


          // =================================================
          // CARD
          // =================================================

          return (

            <div
              className="shoe-card"
              key={shoe._id}
            >


              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="shoe-image">

                {shoe.discount > 0 && (

                  <span className="discount-badge">

                    {shoe.discount}% OFF

                  </span>

                )}


                {imageUrl ? (

                  <img
                    src={imageUrl}
                    alt={
                      shoe.name ||
                      "Women's Product"
                    }

                    onError={(e) => {

                      console.error(
                        "Women image failed:",
                        e.currentTarget.src
                      );

                      e.currentTarget.style.display =
                        "none";

                    }}

                  />

                ) : (

                  <div className="image-placeholder">

                    No Image

                  </div>

                )}

              </div>


              {/* =================================================
                  PRODUCT INFORMATION
              ================================================= */}

              <div className="shoe-info">


                {/* NAME */}

                <h3>
                  {shoe.name}
                </h3>


                {/* CATEGORY */}

                <p className="shoe-category">

                  {shoe.category}

                </p>


                {/* DESCRIPTION */}

                <p className="shoe-description">

                  {shoe.description}

                </p>


                {/* =================================================
                    RATING
                ================================================= */}

                <div className="rating">


                  <div className="stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <button
                          key={star}
                          type="button"

                          className={
                            star <=
                            Math.round(
                              averageRating
                            )

                              ? "star filled"

                              : "star"
                          }

                          onClick={() =>
                            handleRating(
                              shoe._id,
                              star
                            )
                          }
                        >

                          ★

                        </button>

                      )
                    )}

                  </div>


                  <span className="rating-number">

                    {averageRating.toFixed(
                      1
                    )}

                  </span>


                  <span className="rating-count">

                    (
                    {
                      shoe.rating
                        ?.totalRatings ||
                      0
                    }
                    )

                  </span>

                </div>


                {/* =================================================
                    PRICE
                ================================================= */}

                <div className="price-section">


                  <h4 className="shoe-price">

                    Rs.{" "}

                    {Math.round(
                      discountedPrice
                    ).toLocaleString(
                      "en-PK"
                    )}

                  </h4>


                  {shoe.discount > 0 && (

                    <span className="original-price">

                      Rs.{" "}

                      {price.toLocaleString(
                        "en-PK"
                      )}

                    </span>

                  )}

                </div>


                {/* =================================================
                    SIZES
                ================================================= */}

                {productRequiresSize && (

                  <div className="sizes">

                    <div className="size-buttons">

                      {(shoe.sizes || []).map(
                        (size) => (

                          <button
                            key={size}
                            type="button"

                            className={
                              selectedSizes[
                                shoe._id
                              ] === size

                                ? "selected-size"

                                : ""
                            }

                            onClick={() =>
                              handleSizeSelect(
                                shoe._id,
                                size
                              )
                            }
                          >

                            {size}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* =================================================
                    ADD TO CART
                ================================================= */}

                <button
                  className="add-cart"
                  type="button"

                  onClick={() =>
                    handleAddToCart(
                      shoe
                    )
                  }
                >

                  Add to Cart

                </button>


              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

};


export default Women;