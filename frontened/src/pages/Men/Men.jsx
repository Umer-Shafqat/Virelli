import React, {
  useContext,
  useState,
  useEffect,
} from "react";

import "./Men.css";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";

const Men = () => {
  const {
    shoes,
    addToCart,
    url,
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
  // GET MEN PRODUCTS
  // =====================================================

  useEffect(() => {
    if (Array.isArray(shoes)) {
      setShoeList(
        shoes.filter(
          (item) =>
            item.type?.toUpperCase() === "MEN"
        )
      );
    } else {
      setShoeList([]);
    }
  }, [shoes]);

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {
    let productImages = [];

    // New database structure
    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {
      productImages = shoe.images;
    }

    // Old database structure
    else if (shoe?.image) {
      productImages = [shoe.image];
    }

    if (productImages.length === 0) {
      return "";
    }

    const image = productImages[0];

    // =================================================
    // CLOUDINARY IMAGE
    // =================================================

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://")
      )
    ) {
      return image;
    }

    // =================================================
    // OLD LOCAL IMAGE
    // =================================================

    if (typeof image === "string") {
      return `${url}/images/${image}`;
    }

    return "";
  };

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

    if (!shoeId) {
      alert("Product ID is missing");
      return;
    }

    const productRequiresSize =
      requiresSize(shoe);

    // ===============================================
    // PRODUCTS THAT REQUIRE SIZE
    // ===============================================

    if (productRequiresSize) {
      const selectedSize =
        selectedSizes[shoeId];

      if (!selectedSize) {
        alert("Please select a size first");
        return;
      }

      addToCart(
        shoe,
        selectedSize
      );

      return;
    }

    // ===============================================
    // PRODUCTS THAT DO NOT REQUIRE SIZE
    // Caps / Watches
    // ===============================================

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
    setShoeList((prevShoes) =>
      prevShoes.map((shoe) => {

        if (shoe._id === shoeId) {

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
      })
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <section className="men-page">

      {/* ================= HEADING ================= */}

      <div className="men-heading">

        <h2>
          Men's Collection
        </h2>

        <p>
          Explore our latest men's products
        </p>

      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="shoes-grid">

        {shoeList.length > 0 ? (

          shoeList.map((shoe) => {

            // -----------------------------------------
            // PRICE
            // -----------------------------------------

            const price =
              Number(shoe.price || 0);

            const discount =
              Number(
                shoe.discount || 0
              );

            const discountedPrice =
              price -
              (price * discount) /
                100;

            // -----------------------------------------
            // RATING
            // -----------------------------------------

            const averageRating =
              shoe.rating &&
              shoe.rating.totalRatings >
                0

                ? shoe.rating.ratingSum /
                  shoe.rating.totalRatings

                : 5;

            // -----------------------------------------
            // IMAGE
            // -----------------------------------------

            const imageUrl =
              getImageUrl(shoe);

            // -----------------------------------------
            // SIZE REQUIREMENT
            // -----------------------------------------

            const productRequiresSize =
              requiresSize(shoe);

            return (

              <div
                className="shoe-card"
                key={shoe._id}
              >

                {/* ================= IMAGE ================= */}

                <div className="shoe-image">

                  {discount > 0 && (
                    <span className="discount-badge">
                      {discount}% OFF
                    </span>
                  )}

                  {imageUrl ? (

                    <img
                      src={imageUrl}
                      alt={
                        shoe.name ||
                        "Men's product"
                      }

                      onError={(e) => {
                        console.error(
                          "Men product image failed:",
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

                {/* ================= INFO ================= */}

                <div className="shoe-info">

                  <h3>
                    {shoe.name}
                  </h3>

                  <p className="shoe-category">
                    {shoe.category}
                  </p>

                  {shoe.description && (
                    <p className="shoe-description">
                      {shoe.description}
                    </p>
                  )}

                  {/* ================= RATING ================= */}

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
                      {shoe.rating
                        ?.totalRatings ||
                        0}
                      )
                    </span>

                  </div>

                  {/* ================= PRICE ================= */}

                  <div className="price-section">

                    <h4 className="shoe-price">
                      Rs.{" "}
                      {discountedPrice.toLocaleString()}
                    </h4>

                    {discount > 0 && (

                      <span className="original-price">
                        Rs.{" "}
                        {price.toLocaleString()}
                      </span>

                    )}

                  </div>

                  {/* ================= SIZES ================= */}

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

                  {/* ================= CART ================= */}

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
          })

        ) : (

          <p className="no-shoes">
            No men's products available.
          </p>

        )}

      </div>

    </section>
  );
};

export default Men;