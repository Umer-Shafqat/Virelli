import React from "react";
import "./ReturnsExchange.css";

const ReturnsExchange = () => {
  return (
    <section className="returns-page">

      <div className="returns-header">
        <h1>Returns & Exchange</h1>
        <p>
          Our simple return and exchange policy for a better shopping experience.
        </p>
      </div>

      <div className="returns-container">

        <div className="returns-card">
          <h2>Return Policy</h2>
          <p>
            You can request a return within 7 days of receiving your order,
            provided the product is unused and in its original condition.
          </p>
        </div>

        <div className="returns-card">
          <h2>Exchange Policy</h2>
          <p>
            If you receive the wrong size or product, you can request an
            exchange within 7 days of delivery.
          </p>
        </div>

        <div className="returns-card">
          <h2>Product Condition</h2>
          <p>
            Products must be returned in their original packaging with
            tags and accessories included.
          </p>
        </div>

        <div className="returns-card">
          <h2>How to Request</h2>
          <p>
            Contact our customer support team with your order details
            to start a return or exchange request.
          </p>
        </div>

      </div>

    </section>
  );
};

export default ReturnsExchange;