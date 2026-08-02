import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import Charts from "../../components/Charts/Charts";
import Table from "../../components/Table/Table";

import "./Dashboard.css";

const Dashboard = () => {

  const url = "http://localhost:4000";

  const [dashboard, setDashboard] = useState({
    totalShoes: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    recentOrders: [],
  });

  const getDashboard = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/dashboard`);

      if (response.data.success) {
        setDashboard(response.data.dashboard);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);


const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:4000/api/admin/dashboard",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("API Response:", response.data);

    if (response.data.success) {
      setDashboard(response.data.dashboard);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  console.log("Dashboard Mounted");
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
      value: `Rs. ${dashboard.revenue.toLocaleString()}`,
      icon: "💰",
      color: "#ef4444",
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Navbar />

      <main className="dashboard-content">

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

      </main>
    </div>
  );
};

export default Dashboard;