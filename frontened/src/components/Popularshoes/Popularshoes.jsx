import React, { useState } from "react";
import { shoes } from "../../assets/assets";
import "./Popularshoes.css";

const Popularshoes = () => {

  // Show only first 6 shoes
  const displayedShoes = shoes.slice(0, 6);

  // Store updated shoe ratings
  const [shoeList, setShoeList] = useState(displayedShoes);


  // Handle user rating
  const handleRating = (shoeId, selectedRating) => {

    setShoeList((prevShoes) =>
      prevShoes.map((shoe) => {

        // Find selected shoe
        if (shoe.id === shoeId) {

          // Previous ratings
          const oldTotalRatings =
            shoe.rating?.totalRatings || 0;

          const oldRatingSum =
            shoe.rating?.ratingSum || 0;


          // Add new rating
          return {
            ...shoe,

            rating: {
              totalRatings:
                oldTotalRatings + 1,

              ratingSum:
                oldRatingSum + selectedRating,
            },
          };
        }

        // Other shoes remain unchanged
        return shoe;

      })
    );
  };


  return (
    <section className="shoes-section">


      {/* ================= HEADING ================= */}

      <div className="shoes-heading">

        <h2>
          Demanded Articles
        </h2>

        <p>
          Check out our popular shoe designs
        </p>

      </div>



      {/* ================= SHOES GRID ================= */}

      <div className="shoes-grid">


        {shoeList.map((shoe) => {


          // Calculate discounted price
          const discountedPrice =
            shoe.price -
            (shoe.price * (shoe.discount || 0)) / 100;



          // Calculate average rating
          // Default is 5 stars
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


              {/* ================= IMAGE ================= */}

              <div className="shoe-image">


                {/* Discount Badge */}
                {shoe.discount > 0 && (

                  <span className="discount-badge">
                    {shoe.discount}% OFF
                  </span>

                )}


                {/* Shoe Image */}
                <img
                  src={shoe.image}
                  alt={shoe.name}
                />

              </div>



              {/* ================= INFORMATION ================= */}

              <div className="shoe-info">


                {/* Shoe Name */}
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



                  {/* Average Rating */}
                  <span className="rating-number">
                    {averageRating.toFixed(1)}
                  </span>



                  {/* Number Of Ratings */}
                  <span className="rating-count">
                    (
                    {shoe.rating?.totalRatings ||
                      0}
                    )
                  </span>


                </div>



                {/* ================= PRICE ================= */}

                <div className="price-section">


                  {/* Discounted Price */}
                  <h4 className="shoe-price">

                    Rs.{" "}
                    {discountedPrice.toLocaleString()}

                  </h4>



                  {/* Original Price */}
                  {shoe.discount > 0 && (

                    <span className="original-price">

                      Rs.{" "}
                      {shoe.price.toLocaleString()}

                    </span>

                  )}


                </div>



                {/* ================= SIZES ================= */}

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



                {/* ================= ADD CART ================= */}

                <button
                  className="add-cart"
                  type="button"
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