import React, { useState } from "react";
import { shoes } from "../../assets/assets";
import "./Men.css";

const Men = () => {

  // Only MEN shoes
  const menShoes = shoes.filter(
    (shoe) => shoe.type === "MEN"
  );

  // Store updated ratings
  const [shoeList, setShoeList] = useState(menShoes);


  // Handle user rating
  const handleRating = (shoeId, selectedRating) => {

    setShoeList((prevShoes) =>
      prevShoes.map((shoe) => {

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
                oldRatingSum + selectedRating,
            },
          };
        }

        return shoe;

      })
    );
  };


  return (
    <section className="men-page">


      {/* Heading */}
      <div className="men-heading">

        <h2>
          Men's Shoes Collection
        </h2>

        <p>
          Explore our latest men's shoe designs
        </p>

      </div>



      {/* Shoes Grid */}
      <div className="shoes-grid">

        {shoeList.map((shoe) => {


          // Calculate discounted price
          const discountedPrice =
            shoe.price -
            (shoe.price *
              (shoe.discount || 0)) /
              100;


          // Calculate average rating
          // Default rating is 5
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


              {/* Shoe Image */}
              <div className="shoe-image">

                {/* Discount Badge */}
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



              {/* Shoe Information */}
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


                  {/* Total Ratings */}
                  <span className="rating-count">
                    (
                    {shoe.rating?.totalRatings ||
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



                {/* Add Cart */}
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

export default Men;