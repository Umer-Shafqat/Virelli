import React, { useContext, useState, useEffect } from "react";
import "./Shoes.css";

import { StoreContext } from "../../Context/StoreContext/StoreContext";


const Shoes = ({
  limit,
  products
}) => {

  // =====================================
  // GET ADD TO CART FROM STORE CONTEXT
  // =====================================

const {
  shoes,
  addToCart,
  url,
} = useContext(StoreContext);


  const [
    selectedSizes,
    setSelectedSizes
  ] = useState({});


  // =====================================
  // SHOE LIST
  // =====================================

  const [shoeList, setShoeList] = useState([]);

useEffect(() => {
  if (products) {
    setShoeList(products);
  } else {
    setShoeList(shoes);
  }
}, [products, shoes]);

  // =====================================
  // DISPLAY SHOES
  // =====================================

  const displayedShoes =
    limit
      ? shoeList.slice(0, limit)
      : shoeList;


  // =====================================
  // HANDLE SIZE SELECTION
  // =====================================

  const handleSizeSelect = (
    shoeId,
    size
  ) => {

    setSelectedSizes(
      (prevSizes) => ({

        ...prevSizes,

        [shoeId]: size

      })
    );

  };


  // =====================================
  // HANDLE RATING
  // =====================================

  const handleRating = (
    shoeId,
    selectedRating
  ) => {

    setShoeList(
      (prevShoes) => {

        return prevShoes.map(
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
                    selectedRating

                }

              };

            }


            // Return unchanged shoe
            return shoe;

          }
        );

      }
    );

  };


  // =====================================
  // HANDLE ADD TO CART
  // =====================================

  const handleAddToCart = (
    shoe
  ) => {

    // Get selected size
    // for THIS specific shoe

    const selectedSize =
      selectedSizes[shoe._id];


    // Check if size is selected

    if (!selectedSize) {

      alert(
        "Please select a size first"
      );

      return;

    }


    // Check shoe ID

    if (!shoe?._id) {

      alert(
        "Shoe ID is missing"
      );

      return;

    }


    // Debug information

    console.log(
      "Adding to cart:"
    );


    console.log(
      "Shoe ID:",
      shoe._id
    );


    console.log(
      "Shoe Name:",
      shoe.name
    );


    console.log(
      "Selected Size:",
      selectedSize
    );


    // Add to cart

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

        {displayedShoes.map(
          (shoe) => {


            // =========================
            // DISCOUNT PRICE
            // =========================

         const price = Number(shoe.price || 0);

const discountedPrice =
  price - (price * (shoe.discount || 0)) / 100;


            // =========================
            // AVERAGE RATING
            // =========================

            const averageRating =
              shoe.rating &&
              shoe.rating.totalRatings > 0

                ? shoe.rating.ratingSum /
                  shoe.rating.totalRatings

                : 5;


            // =========================
            // SELECTED SIZE
            // FOR CURRENT SHOE ONLY
            // =========================

            const selectedSize =
              selectedSizes[shoe._id];


            return (

              <div
                className="shoe-card"
                key={shoe._id}
              >


                {/* =========================
                    IMAGE
                ========================= */}

                <div className="shoe-image">

                  {shoe.discount > 0 && (

                    <span
                      className="discount-badge"
                    >

                      {shoe.discount}% OFF

                    </span>

                  )}


                  <img
  src={`${url}/images/${shoe.image}`}
  alt={shoe.name}
/>

                </div>


                {/* =========================
                    INFORMATION
                ========================= */}

                <div className="shoe-info">


                  {/* =========================
                      NAME
                  ========================= */}

                  <h3>
                    {shoe.name}
                  </h3>


                  {/* =========================
                      CATEGORY
                  ========================= */}

                  <p className="shoe-category">

                    {shoe.category}

                  </p>


                  {/* =========================
                      DESCRIPTION
                  ========================= */}

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


                    <span
                      className="rating-number"
                    >

                      {averageRating.toFixed(1)}

                    </span>


                    <span
                      className="rating-count"
                    >

                      (
                      {
                        shoe.rating
                          ?.totalRatings || 0
                      }
                      )

                    </span>

                  </div>


                  {/* =========================
                      PRICE
                  ========================= */}

                  <div className="price-section">


                    <h4
                      className="shoe-price"
                    >

                      Rs.{" "}

                      {
                        discountedPrice
                          .toLocaleString()
                      }

                    </h4>


                    {shoe.discount > 0 && (

                      <span
                        className="original-price"
                      >

                        Rs.{" "}

                        {
                          price.toLocaleString()
                        }

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

                          className={
                            selectedSize === size
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


                  {/* =========================
                      ADD TO CART
                  ========================= */}

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

          }
        )}

      </div>

    </section>

  );

};


export default Shoes;