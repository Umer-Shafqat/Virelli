import React from "react";
import { shoes } from "../../assets/assets";
import "./Shoes.css";

const Shoes = () => {

  return (
    <section className="shoes-section">

      <div className="shoes-heading">

        <h2>Our Shoes Collection</h2>

        <p>
          Explore all of our latest shoe designs
        </p>

      </div>

      <div className="shoes-grid">

        {shoes.map((shoe) => {

          // Calculate discounted price
          const discountedPrice =
            shoe.price -
            (shoe.price * (shoe.discount || 0)) / 100;

          // Calculate average rating
          const averageRating =
            shoe.rating && shoe.rating.totalRatings > 0
              ? shoe.rating.ratingSum / shoe.rating.totalRatings
              : 5;

          return (
            <div
              className="shoe-card"
              key={shoe.id}
            >

              {/* Image */}
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


              {/* Information */}
              <div className="shoe-info">

                <h3>
                  {shoe.name}
                </h3>

                <p className="shoe-category">
                  {shoe.category}
                </p>

                <p className="shoe-description">
                  {shoe.description}
                </p>


                {/* Rating */}
                <div className="rating">

                  <div className="stars">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <span
                        key={star}
                        className={
                          star <= Math.round(averageRating)
                            ? "star filled"
                            : "star"
                        }
                      >
                        ★
                      </span>

                    ))}

                  </div>

                  <span className="rating-number">
                    {averageRating.toFixed(1)}
                  </span>

                  <span className="rating-count">
                    ({shoe.rating?.totalRatings || 0})
                  </span>

                </div>


                {/* Price */}
                <div className="price-section">

                  <h4 className="shoe-price">
                    Rs. {discountedPrice.toLocaleString()}
                  </h4>

                  {shoe.discount > 0 && (
                    <span className="original-price">
                      Rs. {shoe.price.toLocaleString()}
                    </span>
                  )}

                </div>


                {/* Sizes */}
                <div className="sizes">

                  {shoe.sizes.map((size) => (

                    <button key={size}>
                      {size}
                    </button>

                  ))}

                </div>


                {/* Add Cart */}
                <button className="add-cart">
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