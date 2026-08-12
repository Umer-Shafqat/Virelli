import React, { useEffect, useState } from "react";
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
    totalShoes: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH DASHBOARD DATA
  // =====================================

  const fetchDashboard = async () => {
    try {
     const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        `${url}/api/admin/dashboard`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setDashboard(response.data.dashboard);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const dashboardCards = [
    {
      title: "Total Shoes",
      value: dashboard.totalShoes,
      icon: "👟",
      color: "#2563eb",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      icon: "🛒",
      color: "#10b981",
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: "👥",
      color: "#f59e0b",
    },
    {
      title: "Revenue",
      value: `Rs. ${Number(dashboard.revenue).toLocaleString("en-PK")}`,
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
          <p>Welcome back! Here's an overview of your shoe store.</p>
        </section>

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
          <Table orders={dashboard.recentOrders} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;