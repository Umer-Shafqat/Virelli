import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import "./Popularshoes.css";
import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";

const Popularshoes = () => {
  const {
    shoes,
    addToCart,
    url,
  } = useContext(StoreContext);

  const [shoeList, setShoeList] = useState([]);
  const [selectedSizes, setSelectedSizes] =
    useState({});

  useEffect(() => {
    setShoeList(
      shoes.filter((shoe) => shoe.popular)
    );
  }, [shoes]);

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

  const handleSizeSelect = (
    shoeId,
    size
  ) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [shoeId]: size,
    }));
  };

  const handleAddToCart = (shoe) => {
    const requiresSize =
      shoe.requiresSize !== false;

    if (!requiresSize) {
      addToCart(shoe, "N/A");
      return;
    }

    const selectedSize =
      selectedSizes[shoe._id];

    if (
      !selectedSize ||
      String(selectedSize).trim() === ""
    ) {
      alert("Please select a size first");
      return;
    }

    addToCart(shoe, selectedSize);
  };

  const getImageUrl = (shoe) => {
    if (
      Array.isArray(shoe.images) &&
      shoe.images.length > 0
    ) {
      return `${url}/images/${shoe.images[0]}`;
    }

    if (shoe.image) {
      return `${url}/images/${shoe.image}`;
    }

    return "/placeholder.png";
  };

  return (
    <section className="shoes-section">
      <div className="shoes-heading">
        <h2>Popular Products</h2>

        <p>
          Check out our most popular products
        </p>
      </div>

      <div className="shoes-grid">
        {shoeList.map((shoe) => {
          const price =
            Number(shoe.price || 0);

          const discountedPrice =
            price -
            (price *
              (shoe.discount || 0)) /
              100;

          const averageRating =
            shoe.rating &&
            shoe.rating.totalRatings > 0
              ? shoe.rating.ratingSum /
                shoe.rating.totalRatings
              : 5;

          const requiresSize =
            shoe.requiresSize !== false;

          return (
            <div
              className="shoe-card"
              key={shoe._id}
            >
              <div className="shoe-image">
                {shoe.discount > 0 && (
                  <span className="discount-badge">
                    {shoe.discount}% OFF
                  </span>
                )}

                <img
                  src={getImageUrl(shoe)}
                  alt={shoe.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.png";
                  }}
                />
              </div>

              <div className="shoe-info">
                <h3>{shoe.name}</h3>

                <p className="shoe-category">
                  {shoe.category}
                </p>

                <p className="shoe-description">
                  {shoe.description}
                </p>

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

                <div className="price-section">
                  <h4 className="shoe-price">
                    Rs.{" "}
                    {discountedPrice.toLocaleString()}
                  </h4>

                  {shoe.discount > 0 && (
                    <span className="original-price">
                      Rs.{" "}
                      {price.toLocaleString()}
                    </span>
                  )}
                </div>

                {requiresSize && (
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