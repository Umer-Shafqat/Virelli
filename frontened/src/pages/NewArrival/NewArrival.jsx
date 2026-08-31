import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewArrival.css";

const API_URL =
  process.env.REACT_APP_API_URL || "${process.env.REACT_APP_API_URL}";

const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH NEW ARRIVALS
  // =====================================

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/api/shoes/new-arrivals`
        );

        console.log(
          "New Arrival API:",
          response.data
        );

        if (response.data.success) {
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

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="new-arrival-page">

      {/* TITLE */}

      <h1 className="new-arrival-title">
        New Arrivals
      </h1>

      {/* LOADING */}

      {loading ? (
        <p className="loading">
          Loading...
        </p>
      ) : newArrivals.length === 0 ? (

        /* NO NEW ARRIVALS */

        <div className="no-arrivals">
          <h2>No New Arrivals</h2>

          <p>
            No shoes have been added as new arrivals.
          </p>
        </div>

      ) : (

        /* NEW ARRIVALS */

        <div className="new-arrival-container">

          {newArrivals.map((shoe) => (

            <div
              className="new-arrival-card"
              key={shoe._id}
            >

              {/* IMAGE */}

              <div className="new-arrival-image-box">

                <img
                  src={`${API_URL}/images/${shoe.image}`}
                  alt={shoe.name}
                  className="new-arrival-image"
                />

                <span className="new-arrival-badge">
                  NEW
                </span>

              </div>

              {/* INFORMATION */}

              <div className="new-arrival-info">

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
                        {Number(
                          shoe.price || 0
                        ).toLocaleString()}
                      </span>

                      <span className="new-price">
                        Rs.{" "}
                        {Math.round(
                          Number(shoe.price || 0) -
                            (
                              Number(shoe.price || 0) *
                              Number(shoe.discount || 0)
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

export default NewArrival;