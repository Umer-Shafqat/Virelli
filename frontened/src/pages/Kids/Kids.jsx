import React, {
  useContext,
  useState,
  useEffect,
} from "react";

import "./Kids.css";

import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Kids = () => {
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
  // GET KIDS PRODUCTS
  // =====================================================

  useEffect(() => {
    if (Array.isArray(shoes)) {
      setShoeList(
        shoes.filter(
          (item) =>
            item.type?.toUpperCase() === "KID"
        )
      );
    } else {
      setShoeList([]);
    }
  }, [shoes]);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {
    let productImages = [];

    // New structure: images array
    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {
      productImages = shoe.images;
    }

    // Old structure: single image
    else if (shoe?.image) {
      productImages = [shoe.image];
    }

    if (productImages.length === 0) {
      return "";
    }

    const image = productImages[0];

    // -----------------------------------------
    // CLOUDINARY IMAGE
    // -----------------------------------------

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://")
      )
    ) {
      return image;
    }

    // -----------------------------------------
    // OLD LOCAL IMAGE
    // -----------------------------------------

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

    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    addToCart(
      shoe,
      selectedSize
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
    <section className="kid-page">

      {/* ================= HEADING ================= */}

      <div className="kid-heading">

        <h2>
          Kids' Collection
        </h2>

        <p>
          Explore our latest kids'
          products
        </p>

      </div>

      {/* ================= SHOES GRID ================= */}

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

            return (

              <div
                className="shoe-card"
                key={shoe._id}
              >

                {/* ================= IMAGE ================= */}

                <div className="shoe-image">

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
                        "Kids shoe"
                      }

                      onError={(e) => {
                        console.error(
                          "Kids product image failed:",
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
            No kids products available.
          </p>

        )}

      </div>

    </section>
  );
};

export default Kids;