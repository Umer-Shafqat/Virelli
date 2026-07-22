import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <section className="policy-page">

      <div className="policy-header">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy and security are important to us.
        </p>
      </div>

      <div className="policy-container">

        <div className="policy-section">
          <h2>Information We Collect</h2>
          <p>
            We may collect information such as your name, email address,
            phone number, delivery details, and order information when
            you use our website.
          </p>
        </div>

        <div className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>
            Your information is used to process orders, provide customer
            support, improve our services, and communicate with you about
            your orders.
          </p>
        </div>

        <div className="policy-section">
          <h2>Data Security</h2>
          <p>
            We take reasonable steps to protect your personal information
            and keep it secure.
          </p>
        </div>

        <div className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about our privacy policy, please contact
            our customer support team.
          </p>
        </div>

      </div>

    </section>
  );
};

export default PrivacyPolicy;