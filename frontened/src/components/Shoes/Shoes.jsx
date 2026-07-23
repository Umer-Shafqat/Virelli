import React, {useContext,useState} from "react";

import { shoes } from "../../assets/assets";

import "./Shoes.css";

import {StoreContext} from "../../Context/StoreContext/StoreContext";


const Shoes = ({ limit, products }) => {

  // Get addToCart from StoreContext
  const {addToCart} = useContext(StoreContext);


  // Store shoes with updated ratings
 const [shoeList, setShoeList] = useState(
  products || shoes
);


  // Show limited shoes or all shoes
  const displayedShoes = limit
    ? shoeList.slice(0, limit)
    : shoeList;


  // =====================================
  // HANDLE RATING
  // =====================================

  const handleRating = (
    shoeId,
    selectedRating
  ) => {

    setShoeList((prevShoes) => {

      return prevShoes.map((shoe) => {

        if (shoe.id === shoeId) {

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
                selectedRating

            }

          };

        }


        // Return unchanged shoe
        return shoe;

      });

    });

  };


  return (

    <section className="shoes-section">


      {/* =========================
          HEADING
      ========================= */}

      <div className="shoes-heading">

        <h2>
          Our Shoes Collection
        </h2>

        <p>
          Explore all of our latest shoe designs
        </p>

      </div>


      {/* =========================
          SHOES GRID
      ========================= */}

      <div className="shoes-grid">

        {displayedShoes.map((shoe) => {


          // =========================
          // DISCOUNT PRICE
          // =========================

          const discountedPrice =
            shoe.price -
            (
              shoe.price *
              (shoe.discount || 0)
            ) / 100;


          // =========================
          // AVERAGE RATING
          // =========================

          const averageRating =
            shoe.rating &&
            shoe.rating.totalRatings > 0

              ? shoe.rating.ratingSum /
                shoe.rating.totalRatings

              : 5;


          return (

            <div
              className="shoe-card"
              key={shoe.id}
            >


              {/* =========================
                  IMAGE
              ========================= */}

              <div className="shoe-image">

                {shoe.discount > 0 && (

                  <span className="discount-badge">

                    {shoe.discount}% OFF

                  </span>

                )}


                <img
                  src={shoe.image}
                  alt={shoe.name}
                />

              </div>


              {/* =========================
                  INFORMATION
              ========================= */}

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

                <p className="shoe-description">

                  {shoe.description}

                </p>


                {/* =========================
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
                              shoe.id,
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
                    {shoe.rating?.totalRatings || 0}
                    )

                  </span>

                </div>


                {/* =========================
                    PRICE
                ========================= */}

                <div className="price-section">


                  <h4 className="shoe-price">

                    Rs.{" "}

                    {discountedPrice.toLocaleString()}

                  </h4>


                  {shoe.discount > 0 && (

                    <span className="original-price">

                      Rs.{" "}

                      {shoe.price.toLocaleString()}

                    </span>

                  )}

                </div>


                {/* =========================
                    SIZES
                ========================= */}

                <div className="sizes">

                  {(shoe.sizes || []).map(
                    (size) => (

                      <button
                        key={size}
                        type="button"
                      >

                        {size}

                      </button>

                    )
                  )}

                </div>


                {/* =========================
                    ADD TO CART
                ========================= */}

                <button
                  className="add-cart"
                  type="button"

                  onClick={() =>
                    addToCart(shoe)
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


export default Shoes;