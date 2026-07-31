import React, { useContext, useState, useEffect } from "react";
import "./Men.css";
import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Men = () => {
  const { shoes, addToCart, url } = useContext(StoreContext);

  const [shoeList, setShoeList] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    setShoeList(shoes.filter((item) => item.type === "MEN"));
  }, [shoes]);

  const handleSizeSelect = (shoeId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [shoeId]: size,
    }));
  };

  const handleAddToCart = (shoe) => {
    const selectedSize = selectedSizes[shoe._id];

    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    addToCart(shoe, selectedSize);
  };

  const handleRating = (shoeId, selectedRating) => {
    setShoeList((prevShoes) =>
      prevShoes.map((shoe) => {
        if (shoe._id === shoeId) {
          const oldTotalRatings = shoe.rating?.totalRatings || 0;
          const oldRatingSum = shoe.rating?.ratingSum || 0;

          return {
            ...shoe,
            rating: {
              totalRatings: oldTotalRatings + 1,
              ratingSum: oldRatingSum + selectedRating,
            },
          };
        }

        return shoe;
      })
    );
  };

  return (
    <section className="men-page">
      <div className="men-heading">
        <h2>Men's Shoes Collection</h2>
        <p>Explore our latest men's shoe designs</p>
      </div>

      <div className="shoes-grid">
        {shoeList.map((shoe) => {
          const price = Number(shoe.price || 0);

          const discountedPrice =
            price - (price * (shoe.discount || 0)) / 100;

          const averageRating =
            shoe.rating && shoe.rating.totalRatings > 0
              ? shoe.rating.ratingSum / shoe.rating.totalRatings
              : 5;

          return (
            <div className="shoe-card" key={shoe._id}>
              <div className="shoe-image">
                {shoe.discount > 0 && (
                  <span className="discount-badge">
                    {shoe.discount}% OFF
                  </span>
                )}

                <img
                  src={`${url}/images/${shoe.image}`}
                  alt={shoe.name}
                />
              </div>

              <div className="shoe-info">
                <h3>{shoe.name}</h3>

                <p className="shoe-category">{shoe.category}</p>

                <p className="shoe-description">
                  {shoe.description}
                </p>

                <div className="rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={
                          star <= Math.round(averageRating)
                            ? "star filled"
                            : "star"
                        }
                        onClick={() =>
                          handleRating(shoe._id, star)
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <span className="rating-number">
                    {averageRating.toFixed(1)}
                  </span>

                  <span className="rating-count">
                    ({shoe.rating?.totalRatings || 0})
                  </span>
                </div>

                <div className="price-section">
                  <h4 className="shoe-price">
                    Rs. {discountedPrice.toLocaleString()}
                  </h4>

                  {shoe.discount > 0 && (
                    <span className="original-price">
                      Rs. {price.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="sizes">
                  <div className="size-buttons">
                    {(shoe.sizes || []).map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={
                          selectedSizes[shoe._id] === size
                            ? "selected-size"
                            : ""
                        }
                        onClick={() =>
                          handleSizeSelect(shoe._id, size)
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="add-cart"
                  type="button"
                  onClick={() => handleAddToCart(shoe)}
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