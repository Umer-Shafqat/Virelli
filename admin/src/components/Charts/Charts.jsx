import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Charts.css";

const Charts = () => {
  const url = process.env.REACT_APP_API_URL;

  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDailySales = async () => {
    try {
      // Use admin token
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        `${url}/api/admin/daily-sales`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Daily Sales API:", response.data);

      if (response.data.success) {
        setDailySales(response.data.dailySales || []);
      } else {
        setDailySales([]);
      }
    } catch (error) {
      console.log(
        "Daily Sales Error:",
        error.response?.data || error.message
      );
      setDailySales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDailySales();
  }, []);

  const maxValue = Math.max(
    ...dailySales.map((item) => item.value),
    1
  );

  if (loading) {
    return (
      <div className="charts-container">
        <h2>Loading Revenue...</h2>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h2>Daily Revenue</h2>
        <p>Total revenue earned each day</p>
      </div>

      {dailySales.length === 0 ? (
        <div className="no-data">
          <p>No revenue data available.</p>
        </div>
      ) : (
        <div className="bar-chart">
          {dailySales.map((item) => (
            <div className="bar-item" key={item.day}>
              <span className="bar-value">
                Rs. {Number(item.value).toLocaleString("en-PK")}
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
      )}
    </div>
  );
};

export default Charts;