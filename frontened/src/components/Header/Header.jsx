import React from "react";
import "./Header.css";
import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.png";
import { useNavigate } from "react-router-dom";
import Popularshoes from "../Popularshoes/Popularshoes";

const Header = () => {

  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shoes");
  };

  return (
    <>
      <div className="header">

        <picture>
          {/* Mobile Hero */}
          <source
            media="(max-width: 600px)"
            srcSet={hero2}
          />

          {/* Desktop Hero */}
          <img
            src={hero1}
            alt="Hero Banner"
            className="header-img"
          />
        </picture>

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

      <Popularshoes />

    </>
  );
};

export default Header;