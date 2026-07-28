import React from "react";
import "./Charts.css";

const Charts = () => {
  const monthlySales = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 75 },
    { month: "Apr", value: 55 },
    { month: "May", value: 90 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 100 },
  ];

  const maxValue = Math.max(...monthlySales.map((item) => item.value));

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h2>Monthly Sales</h2>
        <p>Sales performance for the last 7 months</p>
      </div>

      <div className="bar-chart">
        {monthlySales.map((item) => (
          <div className="bar-item" key={item.month}>
            <span className="bar-value">{item.value}</span>

            <div
              className="bar"
              style={{
                height: `${(item.value / maxValue) * 220}px`,
              }}
            ></div>

            <span className="bar-label">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;