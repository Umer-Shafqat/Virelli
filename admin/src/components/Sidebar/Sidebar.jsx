import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "📊",
    },
    {
      name: "Add Shoe",
      path: "/add-shoe",
      icon: "👟",
    },
    {
      name: "List Shoes",
      path: "/list-shoes",
      icon: "📦",
    },
    {
      name: "Orders",
      path: "/orders",
      icon: "🛒",
    },
    {
      name: "Users",
      path: "/users",
      icon: "👤",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "📈",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Virelli Admin</h2>
        <p>Shoe Store Panel</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 Virelli</p>
      </div>
    </aside>
  );
};

export default Sidebar;