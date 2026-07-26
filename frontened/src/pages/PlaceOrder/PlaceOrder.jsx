import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext/StoreContext";
import { shoes } from "../../assets/assets";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { cartItems } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
    paymentMethod: "Cash on Delivery",
  });

  // Delivery charges
  const deliveryCharges = 300;

  // Cart entries
  const cartEntries = Object.entries(cartItems);

  // Calculate subtotal
  const subtotal = cartEntries.reduce(
    (total, [key, quantity]) => {
      const [shoeId] = key.split("-");

      const shoe = shoes.find(
        (item) => item.id.toString() === shoeId
      );

      if (!shoe) {
        return total;
      }

      return total + shoe.price * quantity;
    },
    0
  );

  // Total amount
  const totalAmount = subtotal + deliveryCharges;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Confirm order
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      items: cartEntries,
      subtotal,
      deliveryCharges,
      totalAmount,
    };

    console.log("Order Data:", orderData);

    alert("Your order has been placed successfully!");

    // You can later navigate to order confirmation page
    // navigate("/order-success");
  };

  // If cart is empty
  if (cartEntries.length === 0) {
    return (
      <div className="empty-order">
        <h2>Your cart is empty</h2>

        <p>
          Please add some shoes before placing your order.
        </p>

        <button onClick={() => navigate("/shoes")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="place-order-page">

      <h1>Place Your Order</h1>

      <div className="place-order-container">

        {/* =========================
            CUSTOMER INFORMATION
        ========================= */}

        <div className="delivery-section">

          <h2>Delivery Information</h2>

          <form onSubmit={handleSubmit}>

            <div className="name-fields">

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Complete Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />

            {/* =========================
                PAYMENT METHOD
            ========================= */}

            <div className="payment-section">

              <h2>Payment Method</h2>

              <label className="payment-option">

                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={
                    formData.paymentMethod ===
                    "Cash on Delivery"
                  }
                  onChange={handleChange}
                />

                <span>Cash on Delivery</span>

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={
                    formData.paymentMethod ===
                    "Online Payment"
                  }
                  onChange={handleChange}
                />

                <span>Online Payment</span>

              </label>

            </div>

            <button
              type="submit"
              className="confirm-order-btn"
            >
              Confirm Order
            </button>

          </form>

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {/* Cart Items */}

          <div className="summary-items">

            {cartEntries.map(
              ([key, quantity]) => {

                const [
                  shoeId,
                  size
                ] = key.split("-");

                const shoe = shoes.find(
                  (item) =>
                    item.id.toString() === shoeId
                );

                if (!shoe) {
                  return null;
                }

                return (
                  <div
                    className="summary-item"
                    key={key}
                  >

                    <img
                      src={shoe.image}
                      alt={shoe.name}
                    />

                    <div className="summary-item-info">

                      <h3>
                        {shoe.name}
                      </h3>

                      <p>
                        Size: {size}
                      </p>

                      <p>
                        Quantity: {quantity}
                      </p>

                    </div>

                    <strong>
                      PKR{" "}
                      {(
                        shoe.price *
                        quantity
                      ).toLocaleString("en-PK")}
                    </strong>

                  </div>
                );

              }
            )}

          </div>


          {/* Price Details */}

          <div className="summary-prices">

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                PKR{" "}
                {subtotal.toLocaleString(
                  "en-PK"
                )}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Delivery Charges
              </span>

              <span>
                PKR{" "}
                {deliveryCharges.toLocaleString(
                  "en-PK"
                )}
              </span>

            </div>


            <div className="summary-row total-row">

              <strong>
                Total Amount
              </strong>

              <strong>
                PKR{" "}
                {totalAmount.toLocaleString(
                  "en-PK"
                )}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PlaceOrder;

