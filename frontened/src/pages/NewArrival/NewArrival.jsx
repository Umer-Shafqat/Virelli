import React, { useEffect, useState } from "react";
import axios from "axios";
import Shoes from "../../components/Shoes/Shoes";
import Footer from "../../components/Footer/Footer";
import "./NewArrival.css";

const NewArrival = () => {
  const url = "http://localhost:4000";

  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const res = await axios.get(`${url}/api/shoes/new-arrivals`);

      if (res.data.success) {
        setShoes(res.data.shoes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newarrival-page">

      <div className="newarrival-content">
        <h2 className="newarrival-title">New Arrivals</h2>

        <div className="shoe-grid">
          {shoes.length > 0 ? (
  shoes.map((shoe) => (
    <Shoes
      key={shoe._id}
      shoe={shoe}
    />
  ))
) : (
  <h3 className="empty-message">
    No New Arrival Shoes Available
  </h3>
)}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;