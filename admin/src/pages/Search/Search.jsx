import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.png";
import profile_image from "../../assets/profile_image.png";
import basket_icon from "../../assets/basket_icon.png";

import { StoreContext } from "../../Context/StoreContext/StoreContext";

const Navbar = () => {
  const { shoes, cartItems, token, logout } = useContext(StoreContext);

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [showCartMenu, setShowCartMenu] = useState(false);

  const navigate = useNavigate();

  // =====================================
  // CART COUNT
  // =====================================

  const cartCount = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    logout();

    alert("You have been signed out successfully!");

    navigate("/login");
  };

  // =====================================
  // SEARCH SHOES
  // =====================================

  const searchValue = search.trim().toLowerCase();

  const filteredShoes =
    searchValue === ""
      ? []
      : shoes.filter((shoe) => {
          const name = shoe.name?.toLowerCase() || "";
          const category = shoe.category?.toLowerCase() || "";
          const type = shoe.type?.toLowerCase() || "";
          const description = shoe.description?.toLowerCase() || "";

          return (
            name.includes(searchValue) ||
            category.includes(searchValue) ||
            type.includes(searchValue) ||
            description.includes(searchValue)
          );
        });

  // =====================================
  // CLICK SEARCH RESULT
  // =====================================

  const handleSearchResult = (shoe) => {
    // Change this route if you have a shoe details page
    navigate(`/shoes/${shoe._id}`);

    setSearch("");
    setShowSearch(false);
  };

  // =====================================
  // CART CLICK
  // =====================================

  const handleCartClick = () => {
    setShowCartMenu((prev) => !prev);
  };

  return (
    <nav className="navbar">

      {/* =====================================
          LOGO
      ===================================== */}

      <div className="navbar-left">

        <Link to="/">
          <img
            src={logo1}
            alt="Virelli Logo"
            className="logo"
          />
        </Link>

      </div>


      {/* =====================================
          MENU
      ===================================== */}

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
          <Link to="/newarrival">
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


      {/* =====================================
          NAVBAR ICONS
      ===================================== */}

      <div className="navbar-icons">


        {/* =====================================
            SEARCH
        ===================================== */}

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
                autoFocus
              />


              {/* SEARCH RESULTS */}

              {searchValue !== "" && (
                <div className="search-results">

                  {filteredShoes.length > 0 ? (

                    filteredShoes.map((shoe) => (

                      <div
                        key={shoe._id}
                        className="search-item"
                        onClick={() =>
                          handleSearchResult(shoe)
                        }
                      >

                        <img
                          src={`http://localhost:4000/images/${shoe.image}`}
                          alt={shoe.name}
                        />

                        <div>

                          <h4>
                            {shoe.name}
                          </h4>

                          <p>
                            {shoe.category}
                          </p>

                          <p>
                            Rs.{" "}
                            {shoe.price?.toLocaleString()}
                          </p>

                        </div>

                      </div>

                    ))

                  ) : (

                    <div className="no-search-results">
                      No shoes found.
                    </div>

                  )}

                </div>
              )}

            </>
          )}

        </div>


        {/* =====================================
            PROFILE / LOGOUT
        ===================================== */}

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


        {/* =====================================
            CART
        ===================================== */}

        <div className="cart-menu">

          <button
            className="cart-button"
            onClick={handleCartClick}
          >

            <img
              src={basket_icon}
              alt="Cart"
              className="basket-icon"
            />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </button>


          {/* CART DROPDOWN */}

          {showCartMenu && (

            <div className="cart-dropdown">

              <Link
                to="/cart"
                onClick={() =>
                  setShowCartMenu(false)
                }
              >
                🛒 View Cart
              </Link>

              <Link
                to="/myorders"
                onClick={() =>
                  setShowCartMenu(false)
                }
              >
                📦 My Orders
              </Link>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
