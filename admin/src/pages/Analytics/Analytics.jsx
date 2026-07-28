import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Charts from "../../components/Charts/Charts";
import "./Analytics.css";

const Analytics = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rs. 1,250,000",
      icon: "💰",
      color: "#16a34a",
    },
    {
      title: "Orders",
      value: "548",
      icon: "🛒",
      color: "#2563eb",
    },
    {
      title: "Customers",
      value: "312",
      icon: "👥",
      color: "#f59e0b",
    },
    {
      title: "Products",
      value: "148",
      icon: "👟",
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="analytics-page">
      <Sidebar />
      <Navbar />

      <div className="analytics-content">
        <div className="analytics-header">
          <h2>Store Analytics</h2>
          <p>
            Monitor sales performance, revenue and overall store growth.
          </p>
        </div>

        <div className="analytics-cards">
          {stats.map((item, index) => (
            <div className="analytics-card" key={index}>
              <div
                className="analytics-icon"
                style={{ background: item.color }}
              >
                {item.icon}
              </div>

              <div className="analytics-info">
                <h4>{item.title}</h4>
                <h2>{item.value}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-chart">
          <Charts />
        </div>

        <div className="analytics-summary">

          <div className="summary-card">
            <h3>Top Selling Category</h3>
            <p>Sneakers</p>
          </div>

          <div className="summary-card">
            <h3>Highest Selling Brand</h3>
            <p>Virelli Sports</p>
          </div>

          <div className="summary-card">
            <h3>Monthly Growth</h3>
            <p className="growth">+18%</p>
          </div>

          <div className="summary-card">
            <h3>Average Order Value</h3>
            <p>Rs. 4,850</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;