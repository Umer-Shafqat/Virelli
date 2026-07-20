import React from 'react';
import './Header.css';
import hero1 from '../../assets/hero1.png';

const Header = () => {
  return (
    <div className="header">
      <img src={hero1} alt="Hero Banner" className="header-img" />

      <div className="header-content">
        <h1>
         COMFORT.<span> QUALITY.</span><span>STYLE.</span><br />
</h1>
        <p>The perfect pair for every step.</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default Header;