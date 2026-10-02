import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import "./Popularshoes.css";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";

const Popularshoes = () => {
  const {
    shoes,
    addToCart,
  } = useContext(StoreContext);

  const [shoeList, setShoeList] =
    useState([]);

  const [selectedSizes, setSelectedSizes] =
    useState({});

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
  // CATEGORIES THAT REQUIRE SIZE
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
  // GET POPULAR PRODUCTS
  // =====================================================

  useEffect(() => {
    if (Array.isArray(shoes)) {
      setShoeList(
        shoes.filter(
          (shoe) => shoe.popular
        )
      );
    } else {
      setShoeList([]);
    }
  }, [shoes]);

  // =====================================================
  // GET PRODUCT IMAGES
  // =====================================================

  const getProductImages = (shoe) => {
    const API_URL =
      process.env.REACT_APP_API_URL ||
      "http://localhost:4000";

    // =================================================
    // NEW MULTIPLE IMAGES STRUCTURE
    // =================================================

    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {
      return shoe.images
        .filter(
          (image) =>
            typeof image === "string" &&
            image.trim() !== ""
        )
        .map((image) => {
          // Cloudinary / external image
          if (
            image.startsWith("http://") ||
            image.startsWith("https://")
          ) {
            return image;
          }

          // Local image path
          if (
            image.startsWith("/images/")
          ) {
            return `${API_URL}${image}`;
          }

          return `${API_URL}/images/${image}`;
        });
    }

    // =================================================
    // OLD SINGLE IMAGE STRUCTURE
    // =================================================

    if (
      typeof shoe?.image === "string" &&
      shoe.image.trim() !== ""
    ) {
      // Cloudinary / external image
      if (
        shoe.image.startsWith("http://") ||
        shoe.image.startsWith("https://")
      ) {
        return [shoe.image];
      }

      // Local image path
      if (
        shoe.image.startsWith("/images/")
      ) {
        return [
          `${API_URL}${shoe.image}`,
        ];
      }

      return [
        `${API_URL}/images/${shoe.image}`,
      ];
    }

    return [];
  };

  // =====================================================
  // SELECT SIZE
  // =====================================================

  const handleSizeSelect = (
    shoeId,
    size
  ) => {
    if (!shoeId) {
      alert("Product ID is missing");
      return;
    }

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

    // =================================================
    // CHECK PRODUCT ID
    // =================================================

    if (!shoeId) {
      alert(
        "Product ID is missing"
      );

      console.error(
        "Product object does not contain an ID:",
        shoe
      );

      return;
    }

    const productRequiresSize =
      requiresSize(shoe);

    // =================================================
    // PRODUCTS THAT REQUIRE SIZE
    // Shoes / Hoodies / Chapal / Jackets
    // =================================================

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

    // =================================================
    // PRODUCTS THAT DO NOT REQUIRE SIZE
    // Caps / Watches
    // =================================================

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
        const currentId =
          shoe?._id ||
          shoe?.id ||
          shoe?.shoeId;

        if (
          currentId === shoeId
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
      })
    );
  };

  // =====================================================
  // MOUSE ENTER
  // =====================================================

  const handleMouseEnter = (
    shoeId,
    images
  ) => {
    if (
      !shoeId ||
      !Array.isArray(images) ||
      images.length <= 1
    ) {
      return;
    }

    // Clear existing interval
    if (
      hoverIntervals.current[shoeId]
    ) {
      clearInterval(
        hoverIntervals.current[shoeId]
      );
    }

    // Start with second image
    let currentIndex = 1;

    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: currentIndex,
    }));

    // =================================================
    // CYCLE THROUGH ALL IMAGES
    // =================================================

    hoverIntervals.current[shoeId] =
      setInterval(() => {
        currentIndex =
          (currentIndex + 1) %
          images.length;

        setCurrentImages((prev) => ({
          ...prev,
          [shoeId]: currentIndex,
        }));
      }, 1000);
  };

  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = (
    shoeId
  ) => {
    // Stop slideshow
    if (
      hoverIntervals.current[shoeId]
    ) {
      clearInterval(
        hoverIntervals.current[shoeId]
      );

      delete hoverIntervals.current[
        shoeId
      ];
    }

    // Return to first image
    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: 0,
    }));
  };

  // =====================================================
  // MANUAL IMAGE CHANGE
  // =====================================================

  const handleImageChange = (
    shoeId,
    imageIndex
  ) => {
    // Stop hover slideshow
    if (
      hoverIntervals.current[shoeId]
    ) {
      clearInterval(
        hoverIntervals.current[shoeId]
      );

      delete hoverIntervals.current[
        shoeId
      ];
    }

    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: imageIndex,
    }));
  };

  // =====================================================
  // CLEANUP HOVER INTERVALS
  // VERCEL SAFE
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
  // RENDER
  // =====================================================

  return (
    <section className="shoes-section">

      {/* ================= HEADING ================= */}

      <div className="shoes-heading">

        <h2>
          Popular Products
        </h2>

        <p>
          Check out our most popular products
        </p>

      </div>

      {/* ================= PRODUCTS GRID ================= */}

      <div className="shoes-grid">

        {shoeList.length > 0 ? (

          shoeList.map((shoe) => {

            // -------------------------------------------
            // PRODUCT ID
            // -------------------------------------------

            const shoeId =
              shoe?._id ||
              shoe?.id ||
              shoe?.shoeId;

            // -------------------------------------------
            // CHECK SIZE REQUIREMENT
            // -------------------------------------------

            const productRequiresSize =
              requiresSize(shoe);

            // -------------------------------------------
            // PRICE
            // -------------------------------------------

            const price =
              Number(
                shoe.price || 0
              );

            const discount =
              Number(
                shoe.discount || 0
              );

            const discountedPrice =
              price -
              (price * discount) /
                100;

            // -------------------------------------------
            // RATING
            // -------------------------------------------

            const averageRating =
              shoe.rating &&
              shoe.rating.totalRatings >
                0

                ? shoe.rating.ratingSum /
                  shoe.rating.totalRatings

                : 5;

            // -------------------------------------------
            // PRODUCT IMAGES
            // -------------------------------------------

            const productImages =
              getProductImages(shoe);

            // -------------------------------------------
            // CURRENT IMAGE INDEX
            // -------------------------------------------

            let currentImageIndex =
              currentImages[shoeId] ??
              0;

            if (
              currentImageIndex >=
              productImages.length
            ) {
              currentImageIndex = 0;
            }

            // -------------------------------------------
            // CURRENT IMAGE
            // -------------------------------------------

            const imageUrl =
              productImages[
                currentImageIndex
              ] ||
              productImages[0] ||
              "";

            // -------------------------------------------
            // SELECTED SIZE
            // -------------------------------------------

            const selectedSize =
              selectedSizes[shoeId];

            return (

              <div
                className="shoe-card"
                key={shoeId}

                onMouseEnter={() =>
                  handleMouseEnter(
                    shoeId,
                    productImages
                  )
                }

                onMouseLeave={() =>
                  handleMouseLeave(
                    shoeId
                  )
                }
              >

                {/* ================= IMAGE ================= */}

                <div className="shoe-image">

                  {/* Discount Badge */}

                  {discount > 0 && (
                    <span className="discount-badge">
                      {discount}% OFF
                    </span>
                  )}

                  {/* Product Image */}

                  {imageUrl ? (

                    <img
                      src={imageUrl}
                      alt={
                        shoe.name ||
                        "Product"
                      }
                      draggable="false"

                      onError={(event) => {
                        console.error(
                          "Popular product image failed:",
                          event.currentTarget.src
                        );

                        event.currentTarget.src =
                          "/placeholder.png";
                      }}
                    />

                  ) : (

                    <div className="image-placeholder">
                      No Image
                    </div>

                  )}

                  {/* ================= IMAGE DOTS ================= */}

                  {productImages.length >
                    1 && (

                    <div className="image-dots">

                      {productImages.map(
                        (
                          _,
                          imageIndex
                        ) => (

                          <button
                            key={
                              imageIndex
                            }
                            type="button"

                            className={
                              currentImageIndex ===
                              imageIndex
                                ? "image-dot active"
                                : "image-dot"
                            }

                            onClick={(e) => {
                              e.stopPropagation();

                              handleImageChange(
                                shoeId,
                                imageIndex
                              );
                            }}

                            aria-label={`Show image ${
                              imageIndex +
                              1
                            }`}
                          />

                        )
                      )}

                    </div>

                  )}

                </div>

                {/* ================= INFO ================= */}

                <div className="shoe-info">

                  {/* Product Name */}

                  <h3>
                    {shoe.name}
                  </h3>

                  {/* Category */}

                  <p className="shoe-category">
                    {shoe.category}
                  </p>

                  {/* Description */}

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
                                shoeId,
                                star
                              )
                            }

                            aria-label={`Rate ${star} stars`}
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
                      {Math.round(
                        discountedPrice
                      ).toLocaleString(
                        "en-PK"
                      )}
                    </h4>

                    {discount > 0 && (

                      <span className="original-price">
                        Rs.{" "}
                        {price.toLocaleString(
                          "en-PK"
                        )}
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
                                selectedSize ===
                                size
                                  ? "selected-size"
                                  : ""
                              }

                              onClick={() =>
                                handleSizeSelect(
                                  shoeId,
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
            No popular products available.
          </p>

        )}

      </div>

    </section>
  );
};

export default Popularshoes;