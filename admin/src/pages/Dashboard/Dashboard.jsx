import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import Charts from "../../components/Charts/Charts";
import Table from "../../components/Table/Table";

import "./Dashboard.css";

const Dashboard = () => {
  const dashboardCards = [
    {
      title: "Total Shoes",
      value: "150",
      icon: "👟",
      color: "#2563eb",
    },
    {
      title: "Total Orders",
      value: "320",
      icon: "🛒",
      color: "#10b981",
    },
    {
      title: "Total Users",
      value: "95",
      icon: "👥",
      color: "#f59e0b",
    },
    {
      title: "Revenue",
      value: "Rs. 425,000",
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
          <Table />
        </section>

      </main>
    </div>
  );
};

export default Dashboard;