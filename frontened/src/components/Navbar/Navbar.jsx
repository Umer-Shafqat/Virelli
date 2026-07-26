import React, { useContext } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import "./Navbar.css";

import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.png";
import profile_image from "../../assets/profile_image.png";
import basket_icon from "../../assets/basket_icon.png";

import {
  StoreContext
} from "../../Context/StoreContext/StoreContext";


const Navbar = () => {

  // =====================================
  // STORE CONTEXT
  // =====================================

  const {
    cartItems,
    token,
    logout
  } = useContext(StoreContext);


  // =====================================
  // NAVIGATION
  // =====================================

  const navigate = useNavigate();


  // =====================================
  // CART TOTAL QUANTITY
  // =====================================

  const cartCount =
    Object.values(cartItems).reduce(
      (total, quantity) =>
        total + quantity,
      0
    );


  // =====================================
  // SIGN OUT
  // =====================================

  const handleLogout = () => {

    logout();

    alert(
      "You have been signed out successfully!"
    );

    navigate("/login");

  };


  return (

    <nav className="navbar">


      {/* =================================
          LOGO
      ================================= */}

      <div className="navbar-left">

        <Link to="/">

          <img
            src={logo1}
            alt="Virelli Logo"
            className="logo"
          />

        </Link>

      </div>


      {/* =================================
          MENU
      ================================= */}

      <ul className="navbar-menu">

        <li>
          <Link to="/">
            HOME
          </Link>
        </li>

        <li>
          <Link to="/men">
            MEN
          </Link>
        </li>

        <li>
          <Link to="/women">
            WOMEN
          </Link>
        </li>

        <li>
          <Link to="/kids">
            KIDS
          </Link>
        </li>

        <li>
          <Link to="/new">
            NEW ARRIVALS
          </Link>
        </li>

        <li>
          <Link to="/offers">
            OFFERS
          </Link>
        </li>

        <li>
          <Link to="/contact">
            CONTACT US
          </Link>
        </li>

      </ul>


      {/* =================================
          ICONS
      ================================= */}

      <div className="navbar-icons">


        {/* =================================
            SEARCH
        ================================= */}

        <img
          src={search_icon}
          alt="Search"
        />


        {/* =================================
            PROFILE / LOGIN / LOGOUT
        ================================= */}

        {token ? (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            SIGN OUT
          </button>

        ) : (

          <Link to="/login">

            <img
              src={profile_image}
              alt="Profile"
            />

          </Link>

        )}


        {/* =================================
            CART
        ================================= */}

        <Link
          to="/cart"
          className="cart"
        >

          <img
            src={basket_icon}
            alt="Cart"
          />


          {/* Cart Count */}

          {cartCount > 0 && (

            <span className="cart-count">

              {cartCount}

            </span>

          )}

        </Link>

      </div>

    </nav>

  );

};


export default Navbar;
