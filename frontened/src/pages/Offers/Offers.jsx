import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offers.css";

const Offers = () => {
  const url = "http://localhost:4000";

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // 50% OFFER DATE
  // =====================================

 const offerStartDate = new Date("2026-08-9T00:00:00");
const offerEndDate = new Date("2026-08-30T23:59:59");

  const [offerActive, setOfferActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // =====================================
  // OFFER COUNTDOWN
  // =====================================

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      // Before offer starts
      if (now < offerStartDate) {
        setOfferActive(false);
        setTimeLeft(null);
        return;
      }

      // After offer ends
      if (now >= offerEndDate) {
        setOfferActive(false);
        setTimeLeft(null);
        return;
      }

      // Offer is active
      setOfferActive(true);

      const difference = offerEndDate - now;

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const timer = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(timer);
  }, []);

  // =====================================
  // FETCH OFFER SHOES
  // =====================================

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `${url}/api/shoes/offers`
      );

      console.log(
        "Offers API:",
        response.data
      );

      if (response.data.success) {
        setOffers(response.data.shoes);
      }
    } catch (error) {
      console.log(
        "Error fetching offers:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="offers-page">

      {/* =====================================
          ANIMATED 50% OFFER PLATE
      ===================================== */}

      {offerActive && timeLeft && (
        <div className="offer-sale-plate">

          <div className="sale-content">

            <div className="sale-title">
              🔥 MEGA SALE 🔥
            </div>

            <div className="sale-percent">
              50% OFF
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

            {/* COUNTDOWN */}

            <div className="countdown">

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.days
                  ).padStart(2, "0")}
                </span>

                <small>
                  DAYS
                </small>
              </div>

              <div className="colon">
                :
              </div>

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.hours
                  ).padStart(2, "0")}
                </span>

                <small>
                  HOURS
                </small>
              </div>

              <div className="colon">
                :
              </div>

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.minutes
                  ).padStart(2, "0")}
                </span>

                <small>
                  MIN
                </small>
              </div>

              <div className="colon">
                :
              </div>

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.seconds
                  ).padStart(2, "0")}
                </span>

                <small>
                  SEC
                </small>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================
          PAGE TITLE
      ===================================== */}

      <h1 className="offers-title">
        Special Offers
      </h1>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <p className="loading">
          Loading...
        </p>

      ) : offers.length === 0 ? (

        /* =====================================
           NO OFFERS
        ===================================== */

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

        /* =====================================
           OFFER SHOES
        ===================================== */

        <div className="offers-container">

          {offers.map((shoe) => (

            <div
              className="offer-card"
              key={shoe._id}
            >

              {/* IMAGE */}

              <div className="offer-image-box">

                <img
                  src={`${url}/images/${shoe.image}`}
                  alt={shoe.name}
                  className="offer-image"
                />

                {/* OFFER BADGE */}

                <span className="offer-badge">
                  OFFER
                </span>

              </div>

              {/* INFORMATION */}

              <div className="offer-info">

                <h2>
                  {shoe.name}
                </h2>

                <p className="shoe-category">
                  {shoe.type} •{" "}
                  {shoe.category}
                </p>

                <p className="shoe-description">
                  {shoe.description}
                </p>

                {/* PRICE */}

                <div className="price-section">

                  {Number(shoe.discount) > 0 ? (

                    <>

                      <span className="old-price">
                        Rs.{" "}
                        {Number(
                          shoe.price
                        ).toLocaleString()}
                      </span>

                      <span className="new-price">
                        Rs.{" "}
                        {Math.round(
                          Number(shoe.price) -
                          (
                            Number(shoe.price) *
                            Number(shoe.discount)
                          ) /
                          100
                        ).toLocaleString()}
                      </span>

                      <span className="discount">
                        {shoe.discount}% OFF
                      </span>

                    </>

                  ) : (

                    <span className="new-price">
                      Rs.{" "}
                      {Number(
                        shoe.price
                      ).toLocaleString()}
                    </span>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Offers;