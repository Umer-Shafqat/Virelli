import React, {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";

import axios from "axios";

import "./PlaceOrder.css";


const PlaceOrder = () => {

  const navigate = useNavigate();
  
  const location = useLocation();

const {
  subtotal = 0,
  deliveryCharges = 300,
  totalAmount = 300,
} = location.state || {};

  // =====================================
  // STORE CONTEXT
  // =====================================

  const {
    cartItems,
    token,
     shoes,
    setCartItems,
  } = useContext(
    StoreContext
  );


  // =====================================
  // FORM DATA
  // =====================================

  const [
    formData,
    setFormData
  ] = useState({

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    address: "",

    city: "",

    country: "Pakistan",

    paymentMethod: "Cash on Delivery",

  });


  // =====================================
  // ORDER LOADING
  // =====================================

  const [
    loading,
    setLoading
  ] = useState(false);

  const cartEntries =
    Object.entries(cartItems);


  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // =====================================
  // CONFIRM ORDER
  // =====================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();


    // =================================
    // CHECK LOGIN
    // =================================

    if (!token) {

      alert(
        "Please login first"
      );

      navigate("/login");

      return;

    }


    // =================================
    // CHECK CART
    // =================================

    if (
      cartEntries.length === 0
    ) {

      alert(
        "Your cart is empty"
      );

      return;

    }


    try {

      setLoading(true);


      // =================================
      // CREATE DETAILED ORDER ITEMS
      // =================================

      const orderItems =
        cartEntries
          .map(
            ([key, quantity]) => {

              // key example:
              // "1-43"

              const [
                shoeId,
                size
              ] = key.split("-");


              // Find shoe from assets
              const shoe =
                shoes.find(

                  (item) =>
                    item._id.toString() ===
                    shoeId

                );


              // If shoe doesn't exist
              if (!shoe) {

                return null;

              }


              // Return detailed item
              return {

                id:
                  shoe._id,

                name:
                  shoe.name,

                category:
                  shoe.category,

                type:
                  shoe.type,

                price:
                  shoe.price,

                 image: shoe.image,

                size:
                  Number(size),

                quantity:
                  Number(quantity),

                discount:
                  shoe.discount || 0,

                description:
                  shoe.description || "",

              };

            }
          )
          .filter(Boolean);


      // =================================
      // CHECK ORDER ITEMS
      // =================================

      if (
        orderItems.length === 0
      ) {

        alert(
          "No valid items found in cart"
        );

        return;

      }


      // =================================
      // ORDER DATA
      // =================================

      const orderData = {

        customer:
          formData,

        items:
          orderItems,

        subtotal,

        deliveryCharges,

        totalAmount,

      };


      // =================================
      // DEBUG
      // =================================

      console.log(
        "Sending Order:",
        orderData
      );


      console.log(
        "Order Items:",
        orderItems
      );


      // =================================
      // SEND ORDER TO BACKEND
      // =================================

      const response =
        await axios.post(

          "http://localhost:4000/api/order/place",

          orderData,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );


      // =================================
      // ORDER SUCCESS
      // =================================

      if (
        response.data.success
      ) {

        // Clear frontend cart
        setCartItems({});


        alert(
          "Your order has been placed successfully!"
        );


        // Navigate to My Orders
        navigate(
          "/my-orders"
        );

      }


    } catch (error) {

      console.log(
        "Place order error:",
        error
      );


      if (
        error.response?.status === 401
      ) {

        alert(
          "Session expired. Please login again."
        );

      } else {

        alert(

          error.response
            ?.data
            ?.message ||

          "Error placing order"

        );

      }

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // EMPTY CART
  // =====================================

  if (
    cartEntries.length === 0
  ) {

    return (

      <div className="empty-order">

        <h2>
          Your cart is empty
        </h2>

        <p>
          Please add some shoes
          before placing your order.
        </p>

        <button
          onClick={() =>
            navigate("/shoes")
          }
        >

          Continue Shopping

        </button>

      </div>

    );

  }


  return (

    <div className="place-order-page">

      <h1>
        Place Your Order
      </h1>


      <div className="place-order-container">

        <div className="delivery-section">

          <h2>
            Delivery Information
          </h2>


          <form
            onSubmit={
              handleSubmit
            }
          >


            <div className="name-fields">

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={
                  formData.firstName
                }
                onChange={
                  handleChange
                }
                required
              />


              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={
                  formData.lastName
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />


            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              required
            />


            <input
              type="text"
              name="address"
              placeholder="Complete Address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              required
            />


            <input
              type="text"
              name="city"
              placeholder="City"
              value={
                formData.city
              }
              onChange={
                handleChange
              }
              required
            />


            <input
              type="text"
              name="country"
              placeholder="Country"
              value={
                formData.country
              }
              onChange={
                handleChange
              }
              required
            />


            {/* =================================
                PAYMENT
            ================================= */}

            <div className="payment-section">

              <h2>
                Payment Method
              </h2>


              <label
                className="payment-option"
              >

                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={
                    formData.paymentMethod ===
                    "Cash on Delivery"
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  Cash on Delivery
                </span>

              </label>


              <label
                className="payment-option"
              >

                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={
                    formData.paymentMethod ===
                    "Online Payment"
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  Online Payment
                </span>

              </label>

            </div>


            <button
              type="submit"
              className="confirm-order-btn"
              disabled={loading}
            >

              {loading
                ? "Placing Order..."
                : "Confirm Order"
              }

            </button>

          </form>

        </div>


        {/* =================================
            ORDER SUMMARY
        ================================= */}

        <div className="order-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-items">

            {cartEntries.map(

              ([key, quantity]) => {

                const [
                  shoeId,
                  size
                ] = key.split("-");


                const shoe =
                  shoes.find(

                    (item) =>
                      item._id.toString() ===
                      shoeId

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
                   src={`http://localhost:4000/images/${shoe.image}`}
                   alt={shoe.name}
                  />


                    <div
                      className="summary-item-info"
                    >

                      <h3>
                        {shoe.name}
                      </h3>


                      <p>
                        Category:{" "}
                        {shoe.category}
                      </p>


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

                      ).toLocaleString(
                        "en-PK"
                      )}

                    </strong>

                  </div>

                );

              }

            )}

          </div>


          {/* =================================
              PRICE
          ================================= */}

          <div
            className="summary-prices"
          >

            <div
              className="summary-row"
            >

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


            <div
              className="summary-row"
            >

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


            <div
              className="summary-row total-row"
            >

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