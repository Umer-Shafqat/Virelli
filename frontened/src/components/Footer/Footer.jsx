import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import logo1 from "../../assets/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <Link to="/">
            <img
              src={logo1}
              alt="Virrelli"
              className="footer-logo"
            />
          </Link>

          <p>
            Premium footwear designed for
            comfort, confidence and style.
          </p>

       <div className="social-icons">

  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    f
  </a>

  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    ◎
  </a>

  <a
    href="https://www.tiktok.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
  >
    ♪
  </a>

  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    ▶
  </a>

</div>

        </div>


        {/* Shop */}
        <div className="footer-column">

          <h3>SHOP</h3>

          <Link to="/men">
            Men
          </Link>

          <Link to="/women">
            Women
          </Link>

          <Link to="/kids">
            Kids
          </Link>

          <Link to="/new">
            New Arrivals
          </Link>

          <Link to="/offers">
            Offers
          </Link>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>QUICK LINKS</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/faq">
            FAQ
          </Link>

        </div>


        {/* Customer Care */}
        <div className="footer-column">

          <h3>CUSTOMER CARE</h3>

          <Link to="/shipping">
            Shipping & Delivery
          </Link>

          <Link to="/returns">
            Returns & Exchange
          </Link>

          <Link to="/size-guide">
            Size Guide
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 Virrelli. All Rights Reserved.
        </p>

        <p>
  Designed by <strong>Umer Shafqat</strong> | Contact: <a href="tel:+923227473989">+92 322 7473989</a>
</p>

      </div>

    </footer>
  );
};

export default Footer;