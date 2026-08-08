import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewArrival.css";

const NewArrival = () => {
  const url = "http://localhost:4000";

  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(
        `${url}/api/shoes/new-arrivals`
      );

      console.log("New Arrival API:", response.data);

      if (response.data.success) {
        setNewArrivals(response.data.shoes);
      }

    } catch (error) {
      console.log(
        "Error fetching new arrivals:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div className="new-arrival-page">

      <h1 className="new-arrival-title">
        New Arrivals
      </h1>

      {loading ? (
        <p className="loading">
          Loading...
        </p>
      ) : newArrivals.length === 0 ? (
        <div className="no-arrivals">
          <h2>No New Arrivals</h2>
          <p>
            No shoes have been added as new arrivals.
          </p>
        </div>
      ) : (

        <div className="new-arrival-container">

          {newArrivals.map((shoe) => (

            <div
              className="new-arrival-card"
              key={shoe._id}
            >

              <div className="new-arrival-image-box">

                <img
                  src={`${url}/images/${shoe.image}`}
                  alt={shoe.name}
                  className="new-arrival-image"
                />

                <span className="new-arrival-badge">
                  NEW
                </span>

              </div>

              <div className="new-arrival-info">

                <h2>{shoe.name}</h2>

                <p className="shoe-category">
                  {shoe.type} • {shoe.category}
                </p>

                <p className="shoe-description">
                  {shoe.description}
                </p>

                <div className="price-section">

                  {shoe.discount > 0 ? (
                    <>
                      <span className="old-price">
                        Rs. {Number(shoe.price).toLocaleString()}
                      </span>

                      <span className="new-price">
                        Rs.{" "}
                        {Math.round(
                          shoe.price -
                            (shoe.price * shoe.discount) / 100
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

export default NewArrival;