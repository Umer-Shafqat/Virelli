import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {

const [formData, setFormData] = useState({
name: "",
email: "",
subject: "",
message: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = (e) => {
e.preventDefault();

alert(
  "Thank you for contacting us! We will get back to you soon."
);

setFormData({
  name: "",
  email: "",
  subject: "",
  message: "",
});

};

return ( <section className="contact-page">


  {/* Light Header */}

  <div className="contact-header">

    <div className="contact-heading">

      <h1>
        Contact Us
      </h1>

      <p>
        Have a question? We would love to hear from you.
      </p>

    </div>

  </div>


  {/* Contact Content */}

  <div className="contact-content">

    <div className="contact-container">

      {/* Contact Information */}

      <div className="contact-info">

        <h2>
          Get In Touch
        </h2>

        <p>
          If you have any questions about our products,
          orders, delivery, or returns, feel free to
          contact us.
        </p>


        {/* Phone */}

        <div className="contact-item">

          <span>
            📞
          </span>

          <div>

            <h3>
              Phone
            </h3>

            <p>
              +92 322 7473989
            </p>

          </div>

        </div>


        {/* Email */}

        <div className="contact-item">

          <span>
            ✉️
          </span>

          <div>

            <h3>
              Email
            </h3>

            <p>
              support@virelli.com
            </p>

          </div>

        </div>


        {/* WhatsApp */}

        <div className="contact-item">

          <span>
            💬
          </span>

          <div>

            <h3>
              WhatsApp
            </h3>

            <p>
              +92 322 7473989
            </p>

          </div>

        </div>


        {/* Business Hours */}

        <div className="contact-item">

          <span>
            🕒
          </span>

          <div>

            <h3>
              Business Hours
            </h3>

            <p>
              Monday - Saturday
            </p>

            <p>
              10:00 AM - 8:00 PM
            </p>

          </div>

        </div>

      </div>


      {/* Contact Form */}

      <div className="contact-form">

        <h2>
          Send Us a Message
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>

  </div>

</section>

);
};

export default Contact;
