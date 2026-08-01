import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Charts.css";

const Charts = () => {

  const url = "http://localhost:4000";

 const [dailySales, setDailySales] = useState([]);

const getDailySales = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${url}/api/admin/daily-sales`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setDailySales(response.data.dailySales);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getDailySales();
  }, []);

  const maxValue = Math.max(
    ...dailySales.map((item) => item.value),
    1
  );

  return (
    <div className="charts-container">

      <div className="charts-header">
        <h2>Daily Revenue</h2>
        <p>Total revenue earned each day</p>
      </div>

      <div className="bar-chart">

        {dailySales.map((item) => (

          <div className="bar-item" key={item.day}>

            <span className="bar-value">
              Rs. {item.value.toLocaleString()}
            </span>

            <div
              className="bar"
              style={{
                height: `${(item.value / maxValue) * 220}px`,
              }}
            ></div>

            <span className="bar-label">
              {item.day}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Charts;