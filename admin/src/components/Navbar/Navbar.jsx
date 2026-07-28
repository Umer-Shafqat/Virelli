import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        <h2>Admin Dashboard</h2>
        <p>Manage your Virelli Shoe Store</p>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search shoes, orders, users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="navbar-right">
        <div className="admin-profile">
          <div className="profile-avatar">A</div>

          <div className="profile-info">
            <h4>Administrator</h4>
            <span>Admin Panel</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;