
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import Charts from "../../components/Charts/Charts";
import Table from "../../components/Table/Table";
import "./Dashboard.css";

const Dashboard = () => {
  const url = process.env.REACT_APP_API_URL;

  const [dashboard, setDashboard] = useState({
    totalItems: 0,
    totalShoes: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Admin token not found. Please login again.");
        return;
      }

      const response = await axios.get(
        `${url}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Dashboard API Response:", response.data);

      if (response.data.success) {
        setDashboard((prev) => ({
          ...prev,
          ...response.data.dashboard,
        }));
      } else {
        setError(response.data.message || "Unable to load dashboard.");
      }
    } catch (error) {
      console.log("Dashboard API Error:", error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dashboardCards = [
    {
      title: "Total Items",
      value: dashboard.totalItems ?? dashboard.totalShoes ?? 0,
      icon: "👟",
      color: "#2563eb",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders ?? 0,
      icon: "🛒",
      color: "#10b981",
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers ?? 0,
      icon: "👥",
      color: "#f59e0b",
    },
    {
      title: "Revenue",
      value: `Rs. ${Number(dashboard.revenue || 0).toLocaleString("en-PK")}`,
      icon: "💰",
      color: "#ef4444",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <section className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's an overview of your store.</p>
        </section>

        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <section className="dashboard-cards">
          {dashboardCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          ))}
        </section>

        <section className="dashboard-chart">
          <Charts />
        </section>

        <section className="dashboard-table">
          <h2>Recent Orders</h2>
          <Table orders={dashboard.recentOrders || []} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
