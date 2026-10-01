import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { useSearchParams } from "react-router-dom";

import "./Shoes.css";

import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Shoes = ({ limit, products }) => {
  const { shoes, addToCart, url } = useContext(StoreContext);

  const [searchParams] = useSearchParams();

  const selectedCategory =
    searchParams.get("category");

  const [selectedSizes, setSelectedSizes] =
    useState({});

  const [shoeList, setShoeList] =
    useState([]);

  const [currentImages, setCurrentImages] =
    useState({});

  const touchStartX = useRef({});

  // =====================================================
  // PREPARE SHOES
  // =====================================================

  useEffect(() => {
    const list =
      Array.isArray(products) && products.length > 0
        ? products
        : shoes || [];

    const normalizedList = list.map((shoe) => ({
      ...shoe,

      _id:
        shoe._id ||
        shoe.id ||
        shoe.shoeId,

      images:
        Array.isArray(shoe.images) &&
        shoe.images.length > 0
          ? shoe.images
          : shoe.image
          ? [shoe.image]
          : [],

      category: String(
        shoe.category || "Shoes"
      ).trim(),
    }));

    setShoeList(normalizedList);
  }, [products, shoes]);

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const categoryFilteredShoes = selectedCategory
    ? shoeList.filter((shoe) => {
        const productCategory = String(
          shoe.category || ""
        )
          .trim()
          .toLowerCase();

        const requestedCategory = String(
          selectedCategory || ""
        )
          .trim()
          .toLowerCase();

        return (
          productCategory === requestedCategory
        );
      })
    : shoeList;

  // =====================================================
  // LIMIT PRODUCTS
  // =====================================================

  const displayedShoes = limit
    ? categoryFilteredShoes.slice(0, limit)
    : categoryFilteredShoes;

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    // ---------------------------------------------------
    // CLOUDINARY / EXTERNAL IMAGE
    // ---------------------------------------------------

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://")
      )
    ) {
      return image;
    }

    // ---------------------------------------------------
    // OLD LOCAL IMAGE URL
    // ---------------------------------------------------

    if (
      typeof image === "string" &&
      image.startsWith("/images/")
    ) {
      return `${url}${image}`;
    }

    // ---------------------------------------------------
    // OLD LOCAL IMAGE FILENAME
    // ---------------------------------------------------

    if (typeof image === "string") {
      return `${url}/images/${image}`;
    }

    return "";
  };

  // =====================================================
  // SIZE SELECT
  // =====================================================

  const handleSizeSelect = (
    shoeId,
    size
  ) => {
    if (!shoeId) {
      alert("Shoe ID is missing");
      return;
    }

    setSelectedSizes((prev) => ({
      ...prev,
      [shoeId]: size,
    }));
  };

  // =====================================================
  // RATING
  // =====================================================

  const handleRating = (
    shoeId,
    selectedRating
  ) => {
    if (!shoeId) {
      return;
    }

    setShoeList((prevShoes) =>
      prevShoes.map((shoe) => {
        if (shoe._id === shoeId) {
          const oldTotalRatings =
            shoe.rating?.totalRatings || 0;

          const oldRatingSum =
            shoe.rating?.ratingSum || 0;

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
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (shoe) => {
    const shoeId =
      shoe?._id ||
      shoe?.id ||
      shoe?.shoeId;

    const selectedSize =
      selectedSizes[shoeId];

    if (!shoeId) {
      alert("Shoe ID is missing");

      console.error(
        "Shoe object does not contain an ID:",
        shoe
      );

      return;
    }

    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    addToCart(shoeId, selectedSize);
  };

  // =====================================================
  // TOUCH START
  // =====================================================

  const handleTouchStart = (
    shoeId,
    e
  ) => {
    touchStartX.current[shoeId] =
      e.touches[0].clientX;
  };

  // =====================================================
  // TOUCH END
  // =====================================================

  const handleTouchEnd = (
    shoeId,
    images,
    e
  ) => {
    if (
      touchStartX.current[shoeId] ===
        undefined ||
      images.length <= 1
    ) {
      return;
    }

    const touchEndX =
      e.changedTouches[0].clientX;

    const difference =
      touchStartX.current[shoeId] -
      touchEndX;

    if (Math.abs(difference) > 50) {
      setCurrentImages((prev) => {
        const currentIndex =
          prev[shoeId] || 0;

        let newIndex = currentIndex;

        // Swipe left
        if (difference > 0) {
          if (
            currentIndex <
            images.length - 1
          ) {
            newIndex =
              currentIndex + 1;
          }
        }

        // Swipe right
        else {
          if (currentIndex > 0) {
            newIndex =
              currentIndex - 1;
          }
        }

        return {
          ...prev,
          [shoeId]: newIndex,
        };
      });
    }

    delete touchStartX.current[shoeId];
  };

  // =====================================================
  // CHANGE IMAGE
  // =====================================================

  const handleImageChange = (
    shoeId,
    imageIndex
  ) => {
    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: imageIndex,
    }));
  };

  // =====================================================
  // MOUSE ENTER
  // =====================================================

  const handleMouseEnter = (
    shoeId,
    images
  ) => {
    if (images.length > 1) {
      setCurrentImages((prev) => ({
        ...prev,
        [shoeId]: 1,
      }));
    }
  };

  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = (
    shoeId
  ) => {
    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: 0,
    }));
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <section className="shoes-section">

        {/* ================= HEADING ================= */}

        <div className="shoes-heading">
          <h2>
            {selectedCategory
              ? `${selectedCategory} Collection`
              : "Our Collection"}
          </h2>

          <p>
            {selectedCategory
              ? `Explore our latest ${selectedCategory.toLowerCase()} products`
              : "Explore all of our latest shoe designs"}
          </p>
        </div>

        {/* ================= SHOES GRID ================= */}

        <div className="shoes-grid">

          {displayedShoes.length > 0 ? (

            displayedShoes.map(
              (shoe, index) => {

                // ---------------------------------------
                // SHOE ID
                // ---------------------------------------

                const shoeId =
                  shoe?._id ||
                  shoe?.id ||
                  shoe?.shoeId;

                // ---------------------------------------
                // IMAGES
                // ---------------------------------------

                const images =
                  Array.isArray(shoe.images) &&
                  shoe.images.length > 0
                    ? shoe.images
                    : shoe.image
                    ? [shoe.image]
                    : [];

                // ---------------------------------------
                // CURRENT IMAGE
                // ---------------------------------------

                let currentImageIndex =
                  currentImages[shoeId] || 0;

                if (
                  currentImageIndex >=
                  images.length
                ) {
                  currentImageIndex = 0;
                }

                const currentImage =
                  images[currentImageIndex];

                const imageUrl =
                  getImageUrl(currentImage);

                // ---------------------------------------
                // PRICE
                // ---------------------------------------

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

                // ---------------------------------------
                // RATING
                // ---------------------------------------

                const totalRatings =
                  shoe.rating
                    ?.totalRatings || 0;

                const ratingSum =
                  shoe.rating
                    ?.ratingSum || 0;

                const averageRating =
                  totalRatings > 0
                    ? ratingSum /
                      totalRatings
                    : 5;

                // ---------------------------------------
                // SELECTED SIZE
                // ---------------------------------------

                const selectedSize =
                  selectedSizes[shoeId];

                // ---------------------------------------
                // PRODUCT CARD
                // ---------------------------------------

                return (
                  <div
                    className="shoe-card"
                    key={
                      shoeId || index
                    }
                  >

                    {/* ================= IMAGE ================= */}

                    <div
                      className="shoe-image"

                      onMouseEnter={() =>
                        handleMouseEnter(
                          shoeId,
                          images
                        )
                      }

                      onMouseLeave={() =>
                        handleMouseLeave(
                          shoeId
                        )
                      }

                      onTouchStart={(e) =>
                        handleTouchStart(
                          shoeId,
                          e
                        )
                      }

                      onTouchEnd={(e) =>
                        handleTouchEnd(
                          shoeId,
                          images,
                          e
                        )
                      }
                    >

                      {/* Discount */}

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
                            "Shoe"
                          }
                          draggable="false"

                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
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

                      {/* Image Dots */}

                      {images.length > 1 && (
                        <div className="image-dots">

                          {images.map(
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

                      {/* Name */}

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
                          ({totalRatings})
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

                      <div className="sizes">

                        <span className="size-label">
                          Size:
                        </span>

                        {(shoe.sizes || []).map(
                          (size) => (
                            <button
                              key={size}
                              type="button"

                              className={
                                selectedSize ===
                                size
                                  ? "size-btn selected"
                                  : "size-btn"
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
              }
            )

          ) : (

            <p className="no-shoes">
              {selectedCategory
                ? `No ${selectedCategory.toLowerCase()} products available.`
                : "No shoes available."}
            </p>

          )}

        </div>

      </section>
    </>
  );
};

export default Shoes;