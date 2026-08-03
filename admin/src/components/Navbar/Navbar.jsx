import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

const searchNow = () => {
  if (!search.trim()) return;

  navigate(`/search/${search}`);
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
  className="search-input"
  placeholder="Search shoes, orders, users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      searchNow();
    }
  }}
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