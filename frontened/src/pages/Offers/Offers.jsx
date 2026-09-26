import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offers.css";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

const offerStartDate = new Date(
  "2026-08-09T00:00:00"
);

const offerEndDate = new Date(
  "2026-10-10T23:59:59"
);

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [offerActive, setOfferActive] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      if (now < offerStartDate) {
        setOfferActive(false);
        setTimeLeft(null);
        return;
      }

      if (now >= offerEndDate) {
        setOfferActive(false);
        setTimeLeft(null);
        return;
      }

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

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/api/shoes/offers`
        );

        console.log(
          "Offers API:",
          response.data
        );

        if (response.data.success) {
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

  const getImageUrl = (shoe) => {
    if (
      Array.isArray(shoe.images) &&
      shoe.images.length > 0
    ) {
      return `${API_URL}/images/${shoe.images[0]}`;
    }

    if (shoe.image) {
      return `${API_URL}/images/${shoe.image}`;
    }

    return "/placeholder.png";
  };

  return (
    <div className="offers-page">
      {offerActive && timeLeft && (
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

            <div className="countdown">
              <div className="time-box">
                <span>
                  {String(
                    timeLeft.days
                  ).padStart(2, "0")}
                </span>

                <small>DAYS</small>
              </div>

              <div className="colon">:</div>

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.hours
                  ).padStart(2, "0")}
                </span>

                <small>HOURS</small>
              </div>

              <div className="colon">:</div>

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.minutes
                  ).padStart(2, "0")}
                </span>

                <small>MIN</small>
              </div>

              <div className="colon">:</div>

              <div className="time-box">
                <span>
                  {String(
                    timeLeft.seconds
                  ).padStart(2, "0")}
                </span>

                <small>SEC</small>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="offers-title">
        Special Offers
      </h1>

      {loading ? (
        <p className="loading">
          Loading...
        </p>
      ) : offers.length === 0 ? (
        <div className="no-offers">
          <h2>No Offer Shoes</h2>

          <p>
            No shoes are currently
            available on offer.
          </p>
        </div>
      ) : (
        <div className="offers-container">
          {offers.map((shoe) => (
            <div
              className="offer-card"
              key={shoe._id}
            >
              <div className="offer-image-box">
                <img
                  src={getImageUrl(shoe)}
                  alt={shoe.name}
                  className="offer-image"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.png";
                  }}
                />

                <span className="offer-badge">
                  OFFER
                </span>
              </div>

              <div className="offer-info">
                <h2>{shoe.name}</h2>

                <p className="shoe-category">
                  {shoe.type} • {shoe.category}
                </p>

                <p className="shoe-description">
                  {shoe.description}
                </p>

                <div className="price-section">
                  {Number(shoe.discount) > 0 ? (
                    <>
                      <span className="old-price">
                        Rs.{" "}
                        {Number(
                          shoe.price || 0
                        ).toLocaleString()}
                      </span>

                      <span className="new-price">
                        Rs.{" "}
                        {Math.round(
                          Number(
                            shoe.price || 0
                          ) -
                            (
                              Number(
                                shoe.price || 0
                              ) *
                              Number(
                                shoe.discount || 0
                              )
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
                        shoe.price || 0
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