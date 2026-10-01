import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "./NewArrival.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000";

const NewArrival = () => {
  const [newArrivals, setNewArrivals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {
    let productImages = [];

    // -----------------------------------------
    // NEW STRUCTURE
    // images: ["Cloudinary URL"]
    // -----------------------------------------

    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {
      productImages = shoe.images;
    }

    // -----------------------------------------
    // OLD STRUCTURE
    // image: "filename.jpg"
    // -----------------------------------------

    else if (shoe?.image) {
      productImages = [shoe.image];
    }

    if (productImages.length === 0) {
      return "";
    }

    const image =
      productImages[0];

    // -----------------------------------------
    // CLOUDINARY URL
    // -----------------------------------------

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://")
      )
    ) {
      return image;
    }

    // -----------------------------------------
    // OLD LOCAL IMAGE
    // -----------------------------------------

    if (
      typeof image === "string"
    ) {
      return `${API_URL}/images/${image}`;
    }

    return "";
  };

  // =====================================================
  // FETCH NEW ARRIVALS
  // =====================================================

  useEffect(() => {
    const fetchNewArrivals =
      async () => {

        try {

          setLoading(true);

          const response =
            await axios.get(
              `${API_URL}/api/shoes/new-arrivals`
            );

          console.log(
            "New Arrival API:",
            response.data
          );

          if (
            response.data.success
          ) {

            setNewArrivals(
              response.data.shoes || []
            );

          } else {

            setNewArrivals([]);

          }

        } catch (error) {

          console.log(
            "Error fetching new arrivals:",
            error
          );

          setNewArrivals([]);

        } finally {

          setLoading(false);

        }
      };

    fetchNewArrivals();

  }, []);

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="new-arrival-page">

      {/* =================================================
          TITLE
      ================================================= */}

      <h1 className="new-arrival-title">
        New Arrivals
      </h1>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (

        <p className="loading">
          Loading...
        </p>

      ) : newArrivals.length === 0 ? (

        /* =================================================
           NO NEW ARRIVALS
        ================================================= */

        <div className="no-arrivals">

          <h2>
            No New Arrivals
          </h2>

          <p>
            No shoes have been added as
            new arrivals.
          </p>

        </div>

      ) : (

        /* =================================================
           NEW ARRIVALS
        ================================================= */

        <div className="new-arrival-container">

          {newArrivals.map(
            (shoe) => {

              const imageUrl =
                getImageUrl(shoe);

              const price =
                Number(
                  shoe.price || 0
                );

              const discount =
                Number(
                  shoe.discount || 0
                );

              const discountedPrice =
                Math.round(
                  price -
                  (price * discount) /
                    100
                );

              return (

                <div
                  className="new-arrival-card"
                  key={shoe._id}
                >

                  {/* ================= IMAGE ================= */}

                  <div className="new-arrival-image-box">

                    {imageUrl ? (

                      <img
                        src={imageUrl}
                        alt={
                          shoe.name ||
                          "Shoe"
                        }
                        className="new-arrival-image"

                        onError={(e) => {

                          console.error(
                            "New arrival image failed:",
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

                    <span className="new-arrival-badge">
                      NEW
                    </span>

                  </div>

                  {/* ================= INFORMATION ================= */}

                  <div className="new-arrival-info">

                    <h2>
                      {shoe.name}
                    </h2>

                    <p className="shoe-category">
                      {shoe.type} •{" "}
                      {shoe.category}
                    </p>

                    {shoe.description && (
                      <p className="shoe-description">
                        {shoe.description}
                      </p>
                    )}

                    {/* ================= PRICE ================= */}

                    <div className="price-section">

                      {discount > 0 ? (

                        <>

                          <span className="old-price">
                            Rs.{" "}
                            {price.toLocaleString()}
                          </span>

                          <span className="new-price">
                            Rs.{" "}
                            {discountedPrice.toLocaleString()}
                          </span>

                          <span className="discount">
                            {discount}% OFF
                          </span>

                        </>

                      ) : (

                        <span className="new-price">
                          Rs.{" "}
                          {price.toLocaleString()}
                        </span>

                      )}

                    </div>

                  </div>

                </div>

              );
            }
          )}

        </div>

      )}

    </div>
  );
};

export default NewArrival;