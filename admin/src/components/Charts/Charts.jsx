
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Charts.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://virelli.onrender.com";

const Charts = () => {
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDailySales = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          `${API_URL}/api/admin/daily-sales`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Daily Sales API:", response.data);

        if (response.data.success) {
          const sales = response.data.dailySales || [];

          const formattedSales = sales.map((item, index) => ({
            day:
              item.day ||
              item.date ||
              item._id ||
              `Day ${index + 1}`,

            value: Number(
              item.value ??
              item.revenue ??
              item.totalRevenue ??
              item.total ??
              0
            ),
          }));

          setDailySales(formattedSales);
        } else {
          setDailySales([]);
        }
      } catch (error) {
        console.error(
          "Daily Sales Error:",
          error.response?.data || error.message
        );

        setDailySales([]);
      } finally {
        setLoading(false);
      }
    };

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
        <div className="bar-chart-wrapper">
          <div className="bar-chart">
            {dailySales.map((item, index) => {
              const barHeight =
                item.value > 0
                  ? Math.max(
                      (item.value / maxValue) * 220,
                      5
                    )
                  : 0;

              return (
                <div
                  className="bar-item"
                  key={`${item.day}-${index}`}
                >
                  <span className="bar-value">
                    Rs. {item.value.toLocaleString("en-PK")}
                  </span>

                  <div
                    className="bar"
                    style={{
                      height: `${barHeight}px`,
                    }}
                    title={`Revenue: Rs. ${item.value.toLocaleString("en-PK")}`}
                  ></div>

                  <span className="bar-label">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;
