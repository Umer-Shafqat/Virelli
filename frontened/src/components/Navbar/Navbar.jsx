import React from "react";
import "./Navbar.css";

import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.png";
import profile_image from "../../assets/profile_image.png";
import basket_icon from "../../assets/basket_icon.png";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-left">
        <img src={logo1} alt="logo" className="logo" />
      </div>

      {/* Menu */}
      <ul className="navbar-menu">
        <li><a href="/">HOME</a></li>
        <li><a href="/men">MEN</a></li>
        <li><a href="/women">WOMEN</a></li>
        <li><a href="/kids">KIDS</a></li>
        <li><a href="/new">NEW ARRIVALS</a></li>
        <li><a href="/offers">OFFERS</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>

      {/* Icons */}
      <div className="navbar-icons">

        <img src={search_icon} alt="" />

        <img src={profile_image} alt="" />

        <div className="cart">
          <img src={basket_icon} alt="" />
          <span>0</span>
        </div>

      </div>

    </nav>
  );
};

export default Navbar;