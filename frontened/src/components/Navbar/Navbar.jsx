import React, { useContext } from "react";
import {Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.png";
import profile_image from "../../assets/profile_image.png";
import basket_icon from "../../assets/basket_icon.png";
import {StoreContext} from "../../Context/StoreContext/StoreContext";

const Navbar = () => {

  const {shoes,cartItems,token,logout} = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [showCartMenu, setShowCartMenu] = useState(false);
  const navigate = useNavigate();

  const cartCount =
    Object.values(cartItems).reduce(
      (total, quantity) =>
        total + quantity,
      0
    );

   
  const handleLogout = () => {

    logout();

    alert(
      "You have been signed out successfully!"
    );

    navigate("/login");

  };

  const filteredShoes =
  search.trim() === ""
    ? []
    : shoes.filter(
        (shoe) =>
          shoe.name.toLowerCase().includes(search.toLowerCase()) ||
          shoe.category.toLowerCase().includes(search.toLowerCase()) ||
          shoe.type.toLowerCase().includes(search.toLowerCase())
      );


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
          <Link to="/NewArrival">
            NEW ARRIVAL
          </Link>
        </li>

        <li>
          <Link to="/Offers">
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

      <div className="search-box">
  <img
    src={search_icon}
    alt="Search"
    className="search-icon"
    onClick={() => setShowSearch(!showSearch)}
  />

  {showSearch && (
    <>
      <input
        type="text"
        placeholder="Search shoes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredShoes.length > 0 && (
        <div className="search-results">
          {filteredShoes.map((shoe) => (
            <div
              key={shoe._id}
              className="search-item"
              onClick={() => {
                navigate("/shoes"); // Change this later if you have a shoe details page
                setSearch("");
                setShowSearch(false);
              }}
            >
             <img
  src={`http://localhost:4000/images/${shoe.image}`}
  alt={shoe.name}
/>

              <div>
                <h4>{shoe.name}</h4>
                <p>Rs. {shoe.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {search && filteredShoes.length === 0 && (
        <div className="search-results">
          <p style={{ padding: "10px" }}>No shoes found.</p>
        </div>
      )}
    </>
  )}
</div>

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

       <div
  className="cart-menu"
  onMouseEnter={() => setShowCartMenu(true)}
  onMouseLeave={() => setShowCartMenu(false)}
>
  <div className="cart">
    <img
      src={basket_icon}
      alt="Cart"
    />

    {cartCount > 0 && (
      <span className="cart-count">
        {cartCount}
      </span>
    )}
  </div>

  {showCartMenu && (
    <div className="cart-dropdown">
      <Link to="/cart">🛒 View Cart</Link>
      <Link to="/my-orders">📦 My Orders</Link>
    </div>
  )}
</div>
      </div>

    </nav>

  );

};


export default Navbar;
