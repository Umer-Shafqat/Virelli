import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import "./Kids.css";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";


const Kids = () => {

  const {
    shoes,
    addToCart,
    url,
  } = useContext(StoreContext);


  const [shoeList, setShoeList] =
    useState([]);


  const [selectedSizes, setSelectedSizes] =
    useState({});


  // =====================================================
  // CURRENT IMAGES
  // =====================================================

  const [currentImages, setCurrentImages] =
    useState({});


  // =====================================================
  // HOVER INTERVALS
  // =====================================================

  const hoverIntervals =
    useRef({});


  // =====================================================
  // CATEGORIES THAT REQUIRE SIZE
  // =====================================================

  const sizeRequiredCategories = [
    "Shoes",
    "Hoodies",
    "Chapal",
    "Jackets",
  ];


  // =====================================================
  // CHECK IF PRODUCT REQUIRES SIZE
  // =====================================================

  const requiresSize = (shoe) => {

    const category = String(
      shoe?.category || ""
    )
      .trim()
      .toLowerCase();


    return sizeRequiredCategories.some(
      (requiredCategory) =>
        category ===
        requiredCategory.toLowerCase()
    );

  };


  // =====================================================
  // GET KIDS PRODUCTS
  // =====================================================

  useEffect(() => {

    if (Array.isArray(shoes)) {

      setShoeList(

        shoes.filter(
          (item) =>
            item.type?.toUpperCase() ===
            "KID"
        )

      );

    } else {

      setShoeList([]);

    }

  }, [shoes]);


  // =====================================================
  // GET PRODUCT IMAGES
  // =====================================================

  const getProductImages = (shoe) => {

    // =================================================
    // NEW MULTIPLE IMAGE STRUCTURE
    // =================================================

    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {

      return shoe.images.filter(
        (image) =>
          typeof image === "string" &&
          image.trim() !== ""
      );

    }


    // =================================================
    // OLD SINGLE IMAGE STRUCTURE
    // =================================================

    if (
      typeof shoe?.image === "string" &&
      shoe.image.trim() !== ""
    ) {

      return [shoe.image];

    }


    return [];

  };


  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }


    // =================================================
    // CLOUDINARY / EXTERNAL IMAGE
    // =================================================

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://")
      )
    ) {

      return image;

    }


    // =================================================
    // LOCAL IMAGE PATH
    // =================================================

    if (
      typeof image === "string" &&
      image.startsWith("/images/")
    ) {

      return `${url}${image}`;

    }


    // =================================================
    // LOCAL IMAGE FILENAME
    // =================================================

    if (
      typeof image === "string"
    ) {

      return `${url}/images/${image}`;

    }


    return "";

  };


  // =====================================================
  // SIZE SELECT
  // =====================================================

  const handleSizeSelect = (
    shoeId,
    size
  ) => {

    if (!shoeId) {

      alert(
        "Product ID is missing"
      );

      return;

    }


    setSelectedSizes((prev) => ({

      ...prev,

      [shoeId]: size,

    }));

  };


  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (shoe) => {

    const shoeId =
      shoe?._id ||
      shoe?.id ||
      shoe?.shoeId;


    // =================================================
    // CHECK PRODUCT ID
    // =================================================

    if (!shoeId) {

      alert(
        "Product ID is missing"
      );

      console.error(
        "Product object does not contain an ID:",
        shoe
      );

      return;

    }


    // =================================================
    // CHECK SIZE REQUIREMENT
    // =================================================

    const productRequiresSize =
      requiresSize(shoe);


    // =================================================
    // PRODUCTS THAT REQUIRE SIZE
    // =================================================

    if (productRequiresSize) {

      const selectedSize =
        selectedSizes[shoeId];


      if (!selectedSize) {

        alert(
          "Please select a size first"
        );

        return;

      }


      addToCart(
        shoe,
        selectedSize
      );

      return;

    }


    // =================================================
    // PRODUCTS THAT DO NOT REQUIRE SIZE
    // Caps / Watches
    // =================================================

    addToCart(
      shoe,
      "no-size"
    );

  };


  // =====================================================
  // RATING
  // =====================================================

  const handleRating = (
    shoeId,
    selectedRating
  ) => {

    setShoeList(
      (prevShoes) =>

        prevShoes.map(
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
                    selectedRating,

                },

              };

            }


            return shoe;

          }

        )

    );

  };


  // =====================================================
  // MOUSE ENTER
  // =====================================================

  const handleMouseEnter = (
    shoeId,
    images
  ) => {

    if (
      !shoeId ||
      !Array.isArray(images) ||
      images.length <= 1
    ) {

      return;

    }


    // =================================================
    // CLEAR EXISTING INTERVAL
    // =================================================

    if (
      hoverIntervals.current[
        shoeId
      ]
    ) {

      clearInterval(
        hoverIntervals.current[
          shoeId
        ]
      );

    }


    // =================================================
    // START FROM SECOND IMAGE
    // =================================================

    let currentIndex = 1;


    setCurrentImages((prev) => ({

      ...prev,

      [shoeId]:
        currentIndex,

    }));


    // =================================================
    // CYCLE THROUGH ALL IMAGES
    // =================================================

    hoverIntervals.current[
      shoeId
    ] = setInterval(() => {

      currentIndex =
        (currentIndex + 1) %
        images.length;


      setCurrentImages((prev) => ({

        ...prev,

        [shoeId]:
          currentIndex,

      }));

    }, 1000);

  };


  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = (
    shoeId
  ) => {

    // =================================================
    // STOP SLIDESHOW
    // =================================================

    if (
      hoverIntervals.current[
        shoeId
      ]
    ) {

      clearInterval(
        hoverIntervals.current[
          shoeId
        ]
      );

      delete hoverIntervals.current[
        shoeId
      ];

    }


    // =================================================
    // RETURN TO FIRST IMAGE
    // =================================================

    setCurrentImages((prev) => ({

      ...prev,

      [shoeId]: 0,

    }));

  };


  // =====================================================
  // MANUAL IMAGE CHANGE
  // =====================================================

  const handleImageChange = (
    shoeId,
    imageIndex
  ) => {

    // =================================================
    // STOP HOVER SLIDESHOW
    // =================================================

    if (
      hoverIntervals.current[
        shoeId
      ]
    ) {

      clearInterval(
        hoverIntervals.current[
          shoeId
        ]
      );

      delete hoverIntervals.current[
        shoeId
      ];

    }


    setCurrentImages((prev) => ({

      ...prev,

      [shoeId]:
        imageIndex,

    }));

  };


  // =====================================================
  // CLEANUP HOVER INTERVALS
  // VERCEL SAFE
  // =====================================================

  useEffect(() => {

    const intervals =
      hoverIntervals.current;


    return () => {

      Object.values(
        intervals
      ).forEach(
        (interval) => {

          clearInterval(
            interval
          );

        }
      );

    };

  }, []);


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <section className="kid-page">


      {/* =================================================
          HEADING
      ================================================= */}

      <div className="kid-heading">

        <h2>
          Kids' Collection
        </h2>

        <p>
          Explore our latest kids'
          products
        </p>

      </div>


      {/* =================================================
          PRODUCTS GRID
      ================================================= */}

      <div className="shoes-grid">

        {shoeList.length > 0 ? (

          shoeList.map((shoe) => {

            // =================================================
            // PRODUCT ID
            // =================================================

            const shoeId =
              shoe?._id ||
              shoe?.id ||
              shoe?.shoeId;


            // =================================================
            // PRICE
            // =================================================

            const price =
              Number(
                shoe.price || 0
              );


            const discount =
              Number(
                shoe.discount || 0
              );


            const discountedPrice =
              price -
              (
                price *
                discount
              ) /
                100;


            // =================================================
            // RATING
            // =================================================

            const averageRating =
              shoe.rating &&
              shoe.rating.totalRatings >
                0

                ? shoe.rating.ratingSum /
                  shoe.rating.totalRatings

                : 5;


            // =================================================
            // PRODUCT IMAGES
            // =================================================

            const productImages =
              getProductImages(shoe);


            // =================================================
            // CURRENT IMAGE INDEX
            // =================================================

            let currentImageIndex =
              currentImages[shoeId] ||
              0;


            if (
              currentImageIndex >=
              productImages.length
            ) {

              currentImageIndex = 0;

            }


            // =================================================
            // CURRENT IMAGE
            // =================================================

            const currentImage =
              productImages[
                currentImageIndex
              ];


            const imageUrl =
              getImageUrl(
                currentImage
              );


            // =================================================
            // PRODUCT SIZE REQUIREMENT
            // =================================================

            const productRequiresSize =
              requiresSize(shoe);


            // =================================================
            // SELECTED SIZE
            // =================================================

            const selectedSize =
              selectedSizes[shoeId];


            return (

              <div
                className="shoe-card"
                key={shoeId}

                // Hover entire card
                onMouseEnter={() =>
                  handleMouseEnter(
                    shoeId,
                    productImages
                  )
                }

                onMouseLeave={() =>
                  handleMouseLeave(
                    shoeId
                  )
                }
              >


                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="shoe-image">


                  {/* DISCOUNT */}

                  {discount > 0 && (

                    <span className="discount-badge">

                      {discount}% OFF

                    </span>

                  )}


                  {/* PRODUCT IMAGE */}

                  {imageUrl ? (

                    <img
                      src={imageUrl}

                      alt={
                        shoe.name ||
                        "Kids product"
                      }

                      draggable="false"

                      onError={(e) => {

                        console.error(
                          "Kids product image failed:",
                          e.currentTarget.src
                        );

                        e.currentTarget.style.display =
                          "none";

                      }}

                    />

                  ) : (

                    <div className="image-placeholder">

                      No Image

                    </div>

                  )}


                  {/* =================================================
                      IMAGE DOTS
                  ================================================= */}

                  {productImages.length > 1 && (

                    <div className="image-dots">

                      {productImages.map(
                        (
                          _,
                          imageIndex
                        ) => (

                          <button
                            key={
                              imageIndex
                            }

                            type="button"

                            className={
                              currentImageIndex ===
                              imageIndex

                                ? "image-dot active"

                                : "image-dot"
                            }

                            onClick={(e) => {

                              e.stopPropagation();

                              handleImageChange(
                                shoeId,
                                imageIndex
                              );

                            }}

                            aria-label={
                              `Show image ${
                                imageIndex +
                                1
                              }`
                            }

                          />

                        )
                      )}

                    </div>

                  )}

                </div>


                {/* =================================================
                    PRODUCT INFO
                ================================================= */}

                <div className="shoe-info">


                  {/* NAME */}

                  <h3>
                    {shoe.name}
                  </h3>


                  {/* CATEGORY */}

                  <p className="shoe-category">

                    {shoe.category}

                  </p>


                  {/* DESCRIPTION */}

                  {shoe.description && (

                    <p className="shoe-description">

                      {shoe.description}

                    </p>

                  )}


                  {/* =================================================
                      RATING
                  ================================================= */}

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

                            aria-label={
                              `Rate ${star} stars`
                            }

                          >

                            ★

                          </button>

                        )
                      )}

                    </div>


                    <span className="rating-number">

                      {averageRating.toFixed(
                        1
                      )}

                    </span>


                    <span className="rating-count">

                      (
                      {
                        shoe.rating
                          ?.totalRatings ||
                        0
                      }
                      )

                    </span>

                  </div>


                  {/* =================================================
                      PRICE
                  ================================================= */}

                  <div className="price-section">


                    <h4 className="shoe-price">

                      Rs.{" "}

                      {Math.round(
                        discountedPrice
                      ).toLocaleString(
                        "en-PK"
                      )}

                    </h4>


                    {discount > 0 && (

                      <span className="original-price">

                        Rs.{" "}

                        {price.toLocaleString(
                          "en-PK"
                        )}

                      </span>

                    )}

                  </div>


                  {/* =================================================
                      SIZES
                  ================================================= */}

                  {productRequiresSize && (

                    <div className="sizes">

                      <div className="size-buttons">

                        {(shoe.sizes || []).map(
                          (size) => (

                            <button
                              key={size}

                              type="button"

                              className={
                                selectedSize ===
                                size

                                  ? "selected-size"

                                  : ""
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

                    </div>

                  )}


                  {/* =================================================
                      ADD TO CART
                  ================================================= */}

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

          })

        ) : (

          <p className="no-shoes">

            No kids products available.

          </p>

        )}

      </div>

    </section>

  );

};


export default Kids;