import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewArrival.css";

const NewArrival = () => {
  const url = "http://localhost:4000";

  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(
        url + "/api/shoes/new-arrivals"
      );

      if (response.data.success) {
        setShoes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div className="new-arrival">
      <h1>New Arrivals</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : shoes.length === 0 ? (
        <h2>No New Arrivals</h2>
      ) : (
        <div className="shoe-grid">
          {shoes.map((shoe) => (
            <div className="shoe-card" key={shoe._id}>
              <img
                src={`${url}/images/${shoe.image}`}
                alt={shoe.name}
              />

              <h3>{shoe.name}</h3>

              <p>{shoe.category}</p>

              <span>Rs. {shoe.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrival;