import React, {
  useContext,
  useState
} from "react";

import { shoes } from "../../assets/assets";
import "./Popularshoes.css";

import {
  StoreContext
} from "../../Context/StoreContext/StoreContext";


const Popularshoes = () => {

  // =====================================
  // GET ADD TO CART FROM STORE CONTEXT
  // =====================================

  const {
    addToCart
  } = useContext(StoreContext);


  // =====================================
  // SHOW ONLY FIRST 6 SHOES
  // =====================================

  const displayedShoes =
    shoes.slice(0, 6);


  // =====================================
  // STORE UPDATED RATINGS
  // =====================================

  const [
    shoeList,
    setShoeList
  ] = useState(
    displayedShoes
  );


  // =====================================
  // STORE SELECTED SIZE
  // =====================================

  const [
    selectedSizes,
    setSelectedSizes
  ] = useState({});


  // =====================================
  // HANDLE RATING
  // =====================================

  const handleRating = (
    shoeId,
    selectedRating
  ) => {

    setShoeList(
      (prevShoes) =>

        prevShoes.map(
          (shoe) => {

            if (
              shoe.id ===
              shoeId
            ) {

              const oldTotalRatings =
                shoe.rating
                  ?.totalRatings ||
                0;

              const oldRatingSum =
                shoe.rating
                  ?.ratingSum ||
                0;

              return {

                ...shoe,

                rating: {

                  totalRatings:
                    oldTotalRatings +
                    1,

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


  // =====================================
  // HANDLE SIZE SELECTION
  // =====================================

  const handleSizeSelect = (
    shoeId,
    size
  ) => {

    setSelectedSizes(
      (prev) => ({

        ...prev,

        [shoeId]:
          size,

      })
    );

  };


  // =====================================
  // HANDLE ADD TO CART
  // =====================================

  const handleAddToCart = (
    shoe
  ) => {

    const selectedSize =
      selectedSizes[
        shoe.id
      ];


    // Check if size selected

    if (!selectedSize) {

      alert(
        "Please select a size first"
      );

      return;

    }


    // Add shoe and selected size

    addToCart(
      shoe,
      selectedSize
    );

  };


  return (

    <section className="shoes-section">


      {/* =========================
          HEADING
      ========================= */}

      <div className="shoes-heading">

        <h2>
          Demanded Articles
        </h2>

        <p>
          Check out our popular
          shoe designs
        </p>

      </div>



      {/* =========================
          SHOES GRID
      ========================= */}

      <div className="shoes-grid">


        {shoeList.map(
          (shoe) => {


            // =====================================
            // DISCOUNTED PRICE
            // =====================================

            const discountedPrice =
              shoe.price -

              (
                shoe.price *
                (
                  shoe.discount ||
                  0
                )
              ) /

              100;



            // =====================================
            // AVERAGE RATING
            // =====================================

            const averageRating =

              shoe.rating &&
              shoe.rating.totalRatings >
                0

                ?

                shoe.rating.ratingSum /
                shoe.rating.totalRatings

                :

                5;



            return (

              <div
                className="shoe-card"
                key={shoe.id}
              >


                {/* =========================
                    SHOE IMAGE
                ========================= */}

                <div className="shoe-image">


                  {/* Discount Badge */}

                  {shoe.discount >
                    0 && (

                    <span
                      className="discount-badge"
                    >

                      {shoe.discount}
                      % OFF

                    </span>

                  )}


                  {/* Shoe Image */}

                  <img
                    src={shoe.image}
                    alt={shoe.name}
                  />

                </div>



                {/* =========================
                    SHOE INFORMATION
                ========================= */}

                <div className="shoe-info">


                  {/* Shoe Name */}

                  <h3>
                    {shoe.name}
                  </h3>



                  {/* Category */}

                  <p
                    className="shoe-category"
                  >

                    {shoe.category}

                  </p>



                  {/* Description */}

                  <p
                    className="shoe-description"
                  >

                    {shoe.description}

                  </p>



                  {/* =========================
                      RATING
                  ========================= */}

                  <div className="rating">


                    {/* Stars */}

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

                                ?

                                "star filled"

                                :

                                "star"

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



                    {/* Average Rating */}

                    <span
                      className="rating-number"
                    >

                      {averageRating.toFixed(
                        1
                      )}

                    </span>



                    {/* Number Of Ratings */}

                    <span
                      className="rating-count"
                    >

                      (
                      {
                        shoe.rating
                          ?.totalRatings ||
                        0
                      }
                      )

                    </span>


                  </div>



                  {/* =========================
                      PRICE
                  ========================= */}

                  <div
                    className="price-section"
                  >


                    {/* Discounted Price */}

                    <h4
                      className="shoe-price"
                    >

                      Rs.{" "}

                      {discountedPrice.toLocaleString(
                        "en-GB"
                      )}

                    </h4>



                    {/* Original Price */}

                    {shoe.discount >
                      0 && (

                      <span
                        className="original-price"
                      >

                        Rs.{" "}

                        {shoe.price.toLocaleString(
                          "en-GB"
                        )}

                      </span>

                    )}


                  </div>



                  {/* =========================
                      SELECT SIZE
                  ========================= */}

                  <div className="sizes">

                    {(shoe.sizes || []).map(
                      (size) => (

                        <button
                          key={size}
                          type="button"

                          className={
                            selectedSizes[
                              shoe.id
                            ] === size

                              ?

                              "size-btn selected"

                              :

                              "size-btn"
                          }

                          onClick={() =>
                            handleSizeSelect(
                              shoe.id,
                              size
                            )
                          }
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
        )}


      </div>

    </section>

  );

};


export default Popularshoes;