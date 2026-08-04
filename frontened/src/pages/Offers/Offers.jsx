import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offers.css";

const Offers = () => {

  const url = "http://localhost:4000";

  const [offers, setOffers] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {

      const response = await axios.get(
        `${url}/api/shoes/offers`
      );

      if (response.data.success) {
        setOffers(response.data.shoes);
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (

    <div className="offers">

      <h1>Special Offers</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : offers.length === 0 ? (
        <h2>No Offers Available</h2>
      ) : (

        <div className="offer-grid">

          {offers.map((shoe) => (

            <div
              className="offer-card"
              key={shoe._id}
            >

              <span className="offer-badge">
                SALE
              </span>

              <img
                src={`${url}/images/${shoe.image}`}
                alt={shoe.name}
              />

              <h3>{shoe.name}</h3>

              <p>{shoe.category}</p>

              <div className="prices">

                <del>
                  Rs. {shoe.price}
                </del>

                <span>
                  Rs. {shoe.offerPrice}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Offers;