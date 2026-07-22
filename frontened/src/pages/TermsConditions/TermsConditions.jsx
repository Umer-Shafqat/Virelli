import React from "react";
import "./TermsConditions.css";

const TermsConditions = () => {
  return (
    <section className="terms-page">

      <div className="terms-header">
        <h1>Terms & Conditions</h1>
        <p>
          Please read our terms and conditions before using our website.
        </p>
      </div>

      <div className="terms-container">

        <div className="terms-section">
          <h2>Website Usage</h2>
          <p>
            By using our website, you agree to follow these terms and
            conditions and use our services responsibly.
          </p>
        </div>

        <div className="terms-section">
          <h2>Products & Prices</h2>
          <p>
            We try to keep product information and prices accurate.
            However, prices and product availability may change without
            prior notice.
          </p>
        </div>

        <div className="terms-section">
          <h2>Orders</h2>
          <p>
            We reserve the right to cancel or reject an order if the
            product is unavailable or if there is an issue with the
            order information.
          </p>
        </div>

        <div className="terms-section">
          <h2>Customer Responsibility</h2>
          <p>
            Customers are responsible for providing correct contact and
            delivery information when placing an order.
          </p>
        </div>

        <div className="terms-section">
          <h2>Changes to Terms</h2>
          <p>
            We may update these terms and conditions from time to time.
            Any changes will be posted on this page.
          </p>
        </div>

      </div>

    </section>
  );
};

export default TermsConditions;