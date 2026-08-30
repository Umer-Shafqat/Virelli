/* Shoes.jsx */

import React, { useContext, useState, useEffect } from "react";
import "./Shoes.css";
import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Shoes = ({ limit, products }) => {
  const { shoes, addToCart, url } = useContext(StoreContext);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [shoeList, setShoeList] = useState([]);

  /* =====================================
     SET SHOE LIST
  ===================================== */

  useEffect(() => {
    const list = products || shoes || [];

    /*
      Make sure every shoe has an _id.

      Some products may come with:
      _id  -> MongoDB ID
      id   -> normal/frontend ID

      We convert id -> _id when necessary.
    */

    const normalizedList = list.map((shoe) => ({
      ...shoe,
      _id: shoe._id || shoe.id || shoe.shoeId,
    }));

    setShoeList(normalizedList);
  }, [products, shoes]);


  /* =====================================
     DISPLAYED SHOES
  ===================================== */

  const displayedShoes = limit
    ? shoeList.slice(0, limit)
    : shoeList;


  /* =====================================
     SELECT SIZE
  ===================================== */

  const handleSizeSelect = (shoeId, size) => {
    if (!shoeId) {
      alert("Shoe ID is missing");
      return;
    }

    setSelectedSizes((prev) => ({
      ...prev,
      [shoeId]: size,
    }));
  };


  /* =====================================
     RATING
  ===================================== */

  const handleRating = (shoeId, selectedRating) => {
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
              totalRatings: oldTotalRatings + 1,

              ratingSum:
                oldRatingSum + selectedRating,
            },
          };
        }

        return shoe;
      })
    );
  };


  /* =====================================
     ADD TO CART
  ===================================== */

  const handleAddToCart = (shoe) => {
    /*
      Get MongoDB ID or fallback ID.
    */
    const shoeId =
      shoe?._id ||
      shoe?.id ||
      shoe?.shoeId;

    const selectedSize =
      selectedSizes[shoeId];

    /* Check ID first */
    if (!shoeId) {
      alert("Shoe ID is missing");
      console.error(
        "Shoe object does not contain an ID:",
        shoe
      );
      return;
    }

    /* Check size */
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    /*
      Send the correct ID to StoreContext.
    */
    addToCart(shoeId, selectedSize);
  };


  /* =====================================
     RENDER
  ===================================== */

  return (
    <section className="shoes-section">

      {/* ================================
          HEADING
      ================================= */}

      <div className="shoes-heading">

        <h2>
          Our Shoes Collection
        </h2>

        <p>
          Explore all of our latest shoe designs
        </p>

      </div>


      {/* ================================
          SHOES GRID
      ================================= */}

      <div className="shoes-grid">

        {displayedShoes.length > 0 ? (

          displayedShoes.map((shoe, index) => {

            /* ============================
               GET SHOE ID
            ============================ */

            const shoeId =
              shoe?._id ||
              shoe?.id ||
              shoe?.shoeId;


            /* ============================
               PRICE
            ============================ */

            const price =
              Number(shoe.price || 0);

            const discount =
              Number(shoe.discount || 0);

            const discountedPrice =
              price -
              (price * discount) / 100;


            /* ============================
               RATING
            ============================ */

            const totalRatings =
              shoe.rating?.totalRatings || 0;

            const ratingSum =
              shoe.rating?.ratingSum || 0;

            const averageRating =
              totalRatings > 0
                ? ratingSum / totalRatings
                : 5;


            /* ============================
               SELECTED SIZE
            ============================ */

            const selectedSize =
              selectedSizes[shoeId];


            return (
              <div
                className="shoe-card"
                key={shoeId || index}
              >

                {/* ==========================
                    IMAGE
                =========================== */}

                <div className="shoe-image">

                  {discount > 0 && (
                    <span className="discount-badge">
                      {discount}% OFF
                    </span>
                  )}

                  <img
                    src={`${url}/images/${shoe.image}`}
                    alt={shoe.name || "Shoe"}
                  />

                </div>


                {/* ==========================
                    SHOE INFO
                =========================== */}

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


                  {/* ========================
                      RATING
                  ========================= */}

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
                      {averageRating.toFixed(1)}
                    </span>


                    <span className="rating-count">
                      ({totalRatings})
                    </span>

                  </div>


                  {/* ========================
                      PRICE
                  ========================= */}

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


                  {/* ========================
                      SIZE SELECTION
                  ========================= */}

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
                            selectedSize === size
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


                  {/* ========================
                      ADD TO CART
                  ======================== */}

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
          })

        ) : (

          <p className="no-shoes">
            No shoes available.
          </p>

        )}

      </div>

    </section>
  );
};

export default Shoes;