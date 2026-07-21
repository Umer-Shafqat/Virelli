import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.png";
import profile_image from "../../assets/profile_image.png";
import basket_icon from "../../assets/basket_icon.png";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo - Click to open Home */}
      <div className="navbar-left">
        <Link to="/">
          <img
            src={logo1}
            alt="logo"
            className="logo"
          />
        </Link>
      </div>

      {/* Menu */}
      <ul className="navbar-menu">

        <li>
          <Link to="/">HOME</Link>
        </li>

        <li>
          <Link to="/men">MEN</Link>
        </li>

        <li>
          <Link to="/women">WOMEN</Link>
        </li>

        <li>
          <Link to="/kids">KIDS</Link>
        </li>

        <li>
          <Link to="/new">NEW ARRIVALS</Link>
        </li>

        <li>
          <Link to="/offers">OFFERS</Link>
        </li>

        <li>
          <Link to="/contact">CONTACT</Link>
        </li>

      </ul>

      {/* Icons */}
      <div className="navbar-icons">

        <img
          src={search_icon}
          alt="Search"
        />

        <img
          src={profile_image}
          alt="Profile"
        />

        <div className="cart">

          <img
            src={basket_icon}
            alt="Cart"
          />

          <span>0</span>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;