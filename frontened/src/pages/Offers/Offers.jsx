import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "./Offers.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000";

// =====================================================
// OFFER DATES
// =====================================================

const offerStartDate = new Date(
  "2026-08-09T00:00:00"
);

const offerEndDate = new Date(
  "2026-10-10T23:59:59"
);

// =====================================================
// OFFERS
// =====================================================

const Offers = () => {
  const [offers, setOffers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [offerActive, setOfferActive] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(null);

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (shoe) => {
    let productImages = [];

    // -----------------------------------------
    // NEW CLOUDINARY STRUCTURE
    // -----------------------------------------

    if (
      Array.isArray(shoe?.images) &&
      shoe.images.length > 0
    ) {
      productImages = shoe.images;
    }

    // -----------------------------------------
    // OLD STRUCTURE SUPPORT
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
  // OFFER COUNTDOWN
  // =====================================================

  useEffect(() => {

    const updateCountdown = () => {

      const now = new Date();

      // -----------------------------------------
      // BEFORE OFFER START
      // -----------------------------------------

      if (
        now < offerStartDate
      ) {
        setOfferActive(false);
        setTimeLeft(null);
        return;
      }

      // -----------------------------------------
      // AFTER OFFER END
      // -----------------------------------------

      if (
        now >= offerEndDate
      ) {
        setOfferActive(false);
        setTimeLeft(null);
        return;
      }

      // -----------------------------------------
      // OFFER ACTIVE
      // -----------------------------------------

      setOfferActive(true);

      const difference =
        offerEndDate.getTime() -
        now.getTime();

      const days = Math.floor(
        difference /
          (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference /
          (1000 * 60 * 60)) %
          24
      );

      const minutes = Math.floor(
        (difference /
          (1000 * 60)) %
          60
      );

      const seconds = Math.floor(
        (difference / 1000) %
          60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const timer =
      setInterval(
        updateCountdown,
        1000
      );

    return () => {
      clearInterval(timer);
    };

  }, []);

  // =====================================================
  // FETCH OFFER SHOES
  // =====================================================

  useEffect(() => {

    const fetchOffers =
      async () => {

        try {

          setLoading(true);

          const response =
            await axios.get(
              `${API_URL}/api/shoes/offers`
            );

          console.log(
            "Offers API:",
            response.data
          );

          if (
            response.data.success
          ) {

            setOffers(
              response.data.shoes || []
            );

          } else {

            setOffers([]);

          }

        } catch (error) {

          console.log(
            "Error fetching offers:",
            error
          );

          setOffers([]);

        } finally {

          setLoading(false);

        }
      };

    fetchOffers();

  }, []);

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="offers-page">

      {/* =================================================
          MEGA SALE
      ================================================= */}

      {offerActive &&
        timeLeft && (

          <div className="offer-sale-plate">

            <div className="sale-content">

              <div className="sale-title">
                🔥 MEGA SALE 🔥
              </div>

              <div className="sale-percent">
                20% OFF
              </div>

              <div className="sale-date">

                Offer ends on{" "}

                {offerEndDate.toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}

              </div>

              {/* ================= COUNTDOWN ================= */}

              <div className="countdown">

                {/* DAYS */}

                <div className="time-box">

                  <span>
                    {String(
                      timeLeft.days
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <small>
                    DAYS
                  </small>

                </div>

                <div className="colon">
                  :
                </div>

                {/* HOURS */}

                <div className="time-box">

                  <span>
                    {String(
                      timeLeft.hours
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <small>
                    HOURS
                  </small>

                </div>

                <div className="colon">
                  :
                </div>

                {/* MINUTES */}

                <div className="time-box">

                  <span>
                    {String(
                      timeLeft.minutes
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <small>
                    MIN
                  </small>

                </div>

                <div className="colon">
                  :
                </div>

                {/* SECONDS */}

                <div className="time-box">

                  <span>
                    {String(
                      timeLeft.seconds
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <small>
                    SEC
                  </small>

                </div>

              </div>

            </div>

          </div>
        )}

      {/* =================================================
          TITLE
      ================================================= */}

      <h1 className="offers-title">
        Special Offers
      </h1>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (

        <p className="loading">
          Loading...
        </p>

      ) : offers.length === 0 ? (

        /* =================================================
           NO OFFERS
        ================================================= */

        <div className="no-offers">

          <h2>
            No Offer Shoes
          </h2>

          <p>
            No shoes are currently
            available on offer.
          </p>

        </div>

      ) : (

        /* =================================================
           OFFER SHOES
        ================================================= */

        <div className="offers-container">

          {offers.map(
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
                    (
                      price *
                      discount
                    ) /
                      100
                );

              return (

                <div
                  className="offer-card"
                  key={shoe._id}
                >

                  {/* ================= IMAGE ================= */}

                  <div className="offer-image-box">

                    {imageUrl ? (

                      <img
                        src={imageUrl}
                        alt={
                          shoe.name ||
                          "Shoe"
                        }
                        className="offer-image"

                        onError={(e) => {

                          console.error(
                            "Offer image failed:",
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

                    <span className="offer-badge">
                      OFFER
                    </span>

                  </div>

                  {/* ================= INFORMATION ================= */}

                  <div className="offer-info">

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

export default Offers;