import React from "react";
import "./Header.css";
import hero1 from "../../assets/hero1.png";
import { useNavigate } from "react-router-dom";
import Popularshoes from "../Popularshoes/Popularshoes";

const Header = () => {

  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shoes");
  };

  return (
    <>
      {/* Hero Section */}

      <div className="header">

        <img
          src={hero1}
          alt="Hero Banner"
          className="header-img"
        />

        <div className="header-content">

          <h1>
            COMFORT.
            <span> QUALITY.</span>
            <span> STYLE.</span>
          </h1>

          <p>
            The perfect pair for every step.
          </p>

          <button onClick={handleShopNow}>
            Shop Now
          </button>

        </div>

      </div>

      {/* Only 6 Shoes */}

      <Popularshoes />

    </>
  );
};

export default Header;