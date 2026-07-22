import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {

  const [activeIndex, setActiveIndex] =
    useState(null);


  const faqs = [

    {
      question:
        "How can I place an order?",

      answer:
        "Browse our shoe collection, select your favorite product, choose your size, and click the Add to Cart button. You can then proceed to checkout and complete your order."
    },

    {
      question:
        "Do you offer delivery?",

      answer:
        "Yes, we offer delivery services. Delivery time may vary depending on your location and order."
    },

    {
      question:
        "How can I choose the correct shoe size?",

      answer:
        "Each product displays the available shoe sizes. Select the size that normally fits you. We recommend checking our size guide before placing your order."
    },

    {
      question:
        "Can I return or exchange my shoes?",

      answer:
        "Yes, eligible products can be returned or exchanged according to our return policy. Please contact our support team for assistance."
    },

    {
      question:
        "What payment methods do you accept?",

      answer:
        "We support available online payment methods and cash-on-delivery options where available. Payment options may vary depending on your location."
    },

    {
      question:
        "How can I contact customer support?",

      answer:
        "You can contact us through our Contact Us page or send us an email. Our support team will respond as soon as possible."
    },

  ];


  const toggleFAQ = (index) => {

    if (activeIndex === index) {

      setActiveIndex(null);

    } else {

      setActiveIndex(index);

    }

  };


  return (
    <section className="faq-page">


      {/* Heading */}

      <div className="faq-heading">

        <h1>
          Frequently Asked Questions
        </h1>

        <p>
          Find answers to common questions
          about our shoe store.
        </p>

      </div>



      {/* FAQ Container */}

      <div className="faq-container">

        {faqs.map((faq, index) => (

          <div
            className={
              activeIndex === index
                ? "faq-item active"
                : "faq-item"
            }
            key={index}
          >


            {/* Question */}

            <button
              className="faq-question"
              onClick={() =>
                toggleFAQ(index)
              }
            >

              <span>
                {faq.question}
              </span>

              <span className="faq-icon">
                {activeIndex === index
                  ? "−"
                  : "+"}
              </span>

            </button>



            {/* Answer */}

            {activeIndex === index && (

              <div className="faq-answer">

                <p>
                  {faq.answer}
                </p>

              </div>

            )}

          </div>

        ))}

      </div>

    </section>
  );
};

export default FAQ;