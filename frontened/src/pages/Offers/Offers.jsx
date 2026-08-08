import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offers.css";

const Offers = () => {
  const url = "http://localhost:4000";

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH OFFER SHOES
  // =====================================

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `${url}/api/shoes/offers`
      );

      console.log("Offers API:", response.data);

      if (response.data.success) {
        setOffers(response.data.shoes);
      }
    } catch (error) {
      console.log("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="offers-page">

      {/* PAGE TITLE */}
      <h1 className="offers-title">
        Special Offers
      </h1>

      {/* LOADING */}
      {loading ? (
        <p className="loading">
          Loading...
        </p>
      ) : offers.length === 0 ? (

        /* NO OFFERS */
        <div className="no-offers">
          <h2>No Offer Shoes</h2>

          <p>
            No shoes are currently available on offer.
          </p>
        </div>

      ) : (

        /* OFFER SHOES */
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
                  {shoe.type} • {shoe.category}
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
                        {Number(shoe.price).toLocaleString()}
                      </span>

                      <span className="new-price">
                        Rs.{" "}
                        {Math.round(
                          Number(shoe.price) -
                            (Number(shoe.price) *
                              Number(shoe.discount)) /
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
                      {Number(shoe.price).toLocaleString()}
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
