import React, { useEffect, useState } from "react";
import axios from "axios";
import Shoes from "../../components/Shoes/Shoes";
import Footer from "../../components/Footer/Footer";
import "./Offers.css";

const Offers = () => {
  const url = "http://localhost:4000";

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${url}/api/shoes/offers`);

      if (res.data.success) {
        setOffers(res.data.shoes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="offers-page">

      <div className="offers-content">

        <h2 className="offers-title">
          Special Offers
        </h2>

        <div className="shoe-grid">
          {offers.length > 0 ? (
            offers.map((shoe) => (
              <Shoes
                key={shoe._id}
                shoe={shoe}
              />
            ))
          ) : (
            <h3 className="empty-message">
              No Offer Shoes Available
            </h3>
          )}
        </div>

      </div>
    </div>
  );
};

export default Offers;