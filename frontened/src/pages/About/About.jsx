import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-page">

      {/* Hero Section */}
      <div className="about-hero">

        <div className="about-hero-content">

          <h1>
            About Our Store
          </h1>

          <p>
            Step into style, comfort, and confidence
            with shoes designed for every journey.
          </p>

        </div>

      </div>


      {/* About Content */}
      <div className="about-container">

        <div className="about-content">

          <h2>
            Who We Are
          </h2>

          <p>
            Welcome to our shoe store, your trusted
            destination for stylish and comfortable
            footwear for men, women, and kids.
          </p>

          <p>
            We believe that the right pair of shoes
            can make every step more confident.
            That's why we carefully select shoes
            that combine modern design, comfort,
            quality, and affordability.
          </p>

        </div>


        <div className="about-content">

          <h2>
            Our Mission
          </h2>

          <p>
            Our mission is to provide high-quality
            footwear that matches your lifestyle
            while offering an easy and enjoyable
            online shopping experience.
          </p>

        </div>


        {/* Features */}
        <div className="about-features">

          <div className="about-feature">

            <div className="feature-icon">
              👟
            </div>

            <h3>
              Quality Shoes
            </h3>

            <p>
              Carefully selected footwear designed
              for comfort and durability.
            </p>

          </div>


          <div className="about-feature">

            <div className="feature-icon">
              ⭐
            </div>

            <h3>
              Best Quality
            </h3>

            <p>
              We focus on providing stylish shoes
              with excellent quality.
            </p>

          </div>


          <div className="about-feature">

            <div className="feature-icon">
              🚚
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              We work to deliver your favorite shoes
              safely and quickly.
            </p>

          </div>


          <div className="about-feature">

            <div className="feature-icon">
              ❤️
            </div>

            <h3>
              Customer Satisfaction
            </h3>

            <p>
              Your satisfaction and shopping experience
              are our top priorities.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;