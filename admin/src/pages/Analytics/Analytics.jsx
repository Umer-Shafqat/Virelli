import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Charts from "../../components/Charts/Charts";
import "./Analytics.css";

const Analytics = () => {

  const backendUrl = "http://localhost:4000";

  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    topSellingCategory: "-",
    monthlyGrowth: "0%",
    averageOrderValue: 0,
  });

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/analytics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setAnalytics(response.data.analytics);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: `Rs. ${analytics.totalRevenue.toLocaleString()}`,
      icon: "💰",
      color: "#16a34a",
    },
    {
      title: "Orders",
      value: analytics.totalOrders,
      icon: "🛒",
      color: "#2563eb",
    },
    {
      title: "Customers",
      value: analytics.totalCustomers,
      icon: "👥",
      color: "#f59e0b",
    },
    {
      title: "Products",
      value: analytics.totalProducts,
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
          <p>Monitor sales performance, revenue and overall store growth.</p>
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
            <p>{analytics.topSellingCategory}</p>
          </div>

          <div className="summary-card">
            <h3>Monthly Growth</h3>
            <p className="growth">{analytics.monthlyGrowth}</p>
          </div>

          <div className="summary-card">
            <h3>Average Order Value</h3>
            <p>Rs. {analytics.averageOrderValue.toLocaleString()}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytics;