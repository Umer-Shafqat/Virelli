import React, { useContext, useState, useEffect, useRef } from "react";
import "./Shoes.css";
import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Shoes = ({ limit, products }) => {
  const { shoes, addToCart, url } = useContext(StoreContext);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [shoeList, setShoeList] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const touchStartX = useRef({});

  useEffect(() => {
    const list = products || shoes || [];

    const normalizedList = list.map((shoe) => ({
      ...shoe,
      _id: shoe._id || shoe.id || shoe.shoeId,
    }));

    setShoeList(normalizedList);
  }, [products, shoes]);

  const displayedShoes = limit
    ? shoeList.slice(0, limit)
    : shoeList;

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

  const handleAddToCart = (shoe) => {
    const shoeId =
      shoe?._id ||
      shoe?.id ||
      shoe?.shoeId;

    const selectedSize =
      selectedSizes[shoeId];

    if (!shoeId) {
      alert("Shoe ID is missing");
      console.error(
        "Shoe object does not contain an ID:",
        shoe
      );
      return;
    }

    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    addToCart(shoeId, selectedSize);
  };

  const handleTouchStart = (shoeId, e) => {
    touchStartX.current[shoeId] =
      e.touches[0].clientX;
  };

  const handleTouchEnd = (shoeId, images, e) => {
    if (touchStartX.current[shoeId] === undefined) {
      return;
    }

    const touchEndX =
      e.changedTouches[0].clientX;

    const difference =
      touchStartX.current[shoeId] - touchEndX;

    if (Math.abs(difference) > 50) {
      setCurrentImages((prev) => {
        const currentIndex =
          prev[shoeId] || 0;

        let newIndex = currentIndex;

        if (difference > 0) {
          if (currentIndex < images.length - 1) {
            newIndex = currentIndex + 1;
          }
        } else {
          if (currentIndex > 0) {
            newIndex = currentIndex - 1;
          }
        }

        return {
          ...prev,
          [shoeId]: newIndex,
        };
      });
    }

    delete touchStartX.current[shoeId];
  };

  const handleImageChange = (shoeId, imageIndex) => {
    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: imageIndex,
    }));
  };

  const handleMouseEnter = (shoeId, images) => {
    if (images.length > 1) {
      setCurrentImages((prev) => ({
        ...prev,
        [shoeId]: 1,
      }));
    }
  };

  const handleMouseLeave = (shoeId) => {
    setCurrentImages((prev) => ({
      ...prev,
      [shoeId]: 0,
    }));
  };

  return (
    <section className="shoes-section">

      <div className="shoes-heading">

        <h2>
          Our Shoes Collection
        </h2>

        <p>
          Explore all of our latest shoe designs
        </p>

      </div>

      <div className="shoes-grid">

        {displayedShoes.length > 0 ? (

          displayedShoes.map((shoe, index) => {

            const shoeId =
              shoe?._id ||
              shoe?.id ||
              shoe?.shoeId;

            const images =
              shoe.images?.length > 0
                ? shoe.images
                : shoe.image
                ? [shoe.image]
                : [];

            const currentImageIndex =
              currentImages[shoeId] || 0;

            const price =
              Number(shoe.price || 0);

            const discount =
              Number(shoe.discount || 0);

            const discountedPrice =
              price -
              (price * discount) / 100;

            const totalRatings =
              shoe.rating?.totalRatings || 0;

            const ratingSum =
              shoe.rating?.ratingSum || 0;

            const averageRating =
              totalRatings > 0
                ? ratingSum / totalRatings
                : 5;

            const selectedSize =
              selectedSizes[shoeId];

            return (
              <div
                className="shoe-card"
                key={shoeId || index}
              >

                <div
                  className="shoe-image"
                  onMouseEnter={() =>
                    handleMouseEnter(
                      shoeId,
                      images
                    )
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(shoeId)
                  }
                  onTouchStart={(e) =>
                    handleTouchStart(
                      shoeId,
                      e
                    )
                  }
                  onTouchEnd={(e) =>
                    handleTouchEnd(
                      shoeId,
                      images,
                      e
                    )
                  }
                >

                  {discount > 0 && (
                    <span className="discount-badge">
                      {discount}% OFF
                    </span>
                  )}

                  {images.length > 0 && (
                    <img
                      src={`${url}/images/${images[currentImageIndex]}`}
                      alt={shoe.name || "Shoe"}
                      draggable="false"
                    />
                  )}

                  {images.length > 1 && (
                    <div className="image-dots">

                      {images.map(
                        (_, imageIndex) => (
                          <button
                            key={imageIndex}
                            type="button"
                            className={
                              currentImageIndex ===
                              imageIndex
                                ? "image-dot active"
                                : "image-dot"
                            }
                            onClick={() =>
                              handleImageChange(
                                shoeId,
                                imageIndex
                              )
                            }
                            aria-label={`Show image ${
                              imageIndex + 1
                            }`}
                          />
                        )
                      )}

                    </div>
                  )}

                </div>

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