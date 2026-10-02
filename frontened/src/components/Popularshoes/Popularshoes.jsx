import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import "./Popularshoes.css";
import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Popularshoes = () => {
  const { shoes, addToCart } =
    useContext(StoreContext);

  const [shoeList, setShoeList] = useState([]);
  const [selectedSizes, setSelectedSizes] =
    useState({});

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
    const category = shoe?.category || "";

    return sizeRequiredCategories.some(
      (requiredCategory) =>
        category.toLowerCase() ===
        requiredCategory.toLowerCase()
    );
  };

  // =====================================================
  // GET POPULAR PRODUCTS
  // =====================================================

  useEffect(() => {
    if (Array.isArray(shoes)) {
      setShoeList(
        shoes.filter((shoe) => shoe.popular)
      );
    } else {
      setShoeList([]);
    }
  }, [shoes]);

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
  // SIZE SELECT
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
    const selectedSize =
      selectedSizes[shoe._id];

    // ---------------------------------------------
    // PRODUCTS THAT REQUIRE SIZE
    // ---------------------------------------------

    if (requiresSize(shoe)) {
      if (!selectedSize) {
        alert("Please select a size first");
        return;
      }

      addToCart(shoe, selectedSize);
      return;
    }

    // ---------------------------------------------
    // PRODUCTS THAT DO NOT REQUIRE SIZE
    // Caps / Watches
    // ---------------------------------------------

    addToCart(shoe, "no-size");
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {
    if (
      !shoe ||
      !Array.isArray(shoe.images) ||
      shoe.images.length === 0
    ) {
      return "/placeholder.png";
    }

    const image = shoe.images[0];

    // New Cloudinary images
    if (
      typeof image === "string" &&
      image.startsWith("http")
    ) {
      return image;
    }

    // Old/local image path
    if (typeof image === "string") {
      return image.startsWith("/")
        ? image
        : `/images/${image}`;
    }

    return "/placeholder.png";
  };

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

        {shoeList.map((shoe) => {

          // -------------------------------------------
          // CHECK SIZE REQUIREMENT
          // -------------------------------------------

          const productRequiresSize =
            requiresSize(shoe);

          // -------------------------------------------
          // PRICE
          // -------------------------------------------

          const price =
            Number(shoe.price || 0);

          const discount =
            Number(shoe.discount || 0);

          const discountedPrice =
            price -
            (price * discount) / 100;

          // -------------------------------------------
          // RATING
          // -------------------------------------------

          const averageRating =
            shoe.rating &&
            shoe.rating.totalRatings > 0
              ? shoe.rating.ratingSum /
                shoe.rating.totalRatings
              : 5;

          // -------------------------------------------
          // IMAGE
          // -------------------------------------------

          const imageUrl =
            getImageUrl(shoe);

          return (

            <div
              className="shoe-card"
              key={shoe._id}
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

                <img
                  src={imageUrl}
                  alt={
                    shoe.name ||
                    "Product"
                  }
                  onError={(event) => {
                    event.currentTarget.src =
                      "/placeholder.png";
                  }}
                />

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

                <p className="shoe-description">
                  {shoe.description}
                </p>

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
                    {averageRating.toFixed(1)}
                  </span>

                  <span className="rating-count">
                    (
                    {shoe.rating
                      ?.totalRatings || 0}
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
                    handleAddToCart(shoe)
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

export default Popularshoes;