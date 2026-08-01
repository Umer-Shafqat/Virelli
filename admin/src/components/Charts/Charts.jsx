import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Charts.css";

const Charts = () => {

  const url = "http://localhost:4000";

  const [monthlySales, setMonthlySales] = useState([]);

const getMonthlySales = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${url}/api/admin/monthly-sales`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setMonthlySales(response.data.monthlySales);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getMonthlySales();
  }, []);

  const maxValue = Math.max(
    ...monthlySales.map((item) => item.value),
    1
  );

  return (
    <div className="charts-container">

      <div className="charts-header">
        <h2>Monthly Revenue</h2>
        <p>Total revenue earned each month</p>
      </div>

      <div className="bar-chart">

        {monthlySales.map((item) => (

          <div className="bar-item" key={item.month}>

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
              {item.month}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Charts;