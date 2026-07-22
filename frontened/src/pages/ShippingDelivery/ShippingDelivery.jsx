import React from "react";
import "./ShippingDelivery.css";

const ShippingDelivery = () => {
  return (
    <section className="shipping-page">

      <div className="shipping-header">
        <h1>Shipping & Delivery</h1>
        <p>
          Everything you need to know about our shipping and delivery process.
        </p>
      </div>

      <div className="shipping-container">

        <div className="shipping-card">
          <h2>Delivery Time</h2>
          <p>
            We usually deliver orders within 3 to 7 business days,
            depending on your location.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Shipping Charges</h2>
          <p>
            Shipping charges may vary depending on your location and
            order size. The final shipping cost will be shown at checkout.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Order Tracking</h2>
          <p>
            Once your order has been shipped, you will receive the
            tracking information through your provided contact details.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Delivery Areas</h2>
          <p>
            We currently offer delivery across Pakistan. Delivery times
            may vary depending on the city and location.
          </p>
        </div>

      </div>

    </section>
  );
};

export default ShippingDelivery;