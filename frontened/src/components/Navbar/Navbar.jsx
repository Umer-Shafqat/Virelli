import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.png";
import profile_image from "../../assets/profile_image.png";
import basket_icon from "../../assets/basket_icon.png";

import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Navbar = () => {

  // Get cart items from StoreContext
  const { cartItems } = useContext(StoreContext);

  return (
    <nav className="navbar">

      {/* Logo */}
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
          <Link to="/contact">CONTACT US</Link>
        </li>

      </ul>


      {/* Icons */}
      <div className="navbar-icons">

        {/* Search */}
        <img
          src={search_icon}
          alt="Search"
        />


        {/* Profile */}
        <Link to="/login">
  <img
    src={profile_image}
    alt="Profile"
  />
</Link>


        {/* Cart */}
        <Link
          to="/cart"
          className="cart"
        >

          <img
            src={basket_icon}
            alt="Cart"
          />

          {/* Cart Count */}
          {cartItems.length > 0 && (
            <span className="cart-count">
              {cartItems.length}
            </span>
          )}

        </Link>

      </div>

    </nav>
  );
};

export default Navbar;