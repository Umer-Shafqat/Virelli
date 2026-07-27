import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";

import "./MyOrders.css";


const MyOrders = () => {

  // =====================================
  // STORE CONTEXT
  // =====================================

  const {
    token,
  } = useContext(
    StoreContext
  );


  // =====================================
  // STATE
  // =====================================

  const [
    orders,
    setOrders
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // =====================================
  // GET MY ORDERS
  // =====================================

  const fetchOrders = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await axios.get(

          "http://localhost:4000/api/order/myorders",

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }

        );


      if (
        response.data.success
      ) {

        // Newest orders first
        const sortedOrders =
          response.data.orders.sort(

            (a, b) =>

              new Date(b.createdAt) -
              new Date(a.createdAt)

          );


        setOrders(
          sortedOrders
        );

      } else {

        setError(
          response.data.message ||
          "Unable to load orders"
        );

      }


    } catch (error) {

      console.log(
        "Get orders error:",
        error
      );


      setError(

        error.response
          ?.data
          ?.message ||

        "Error loading your orders"

      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // FETCH ORDERS ON PAGE LOAD
  // =====================================

  useEffect(() => {

    if (token) {

      fetchOrders();

    } else {

      setLoading(false);

      setError(
        "Please login to see your orders"
      );

    }

  }, [token]);


  // =====================================
  // NOT LOGGED IN
  // =====================================

  if (
    !token &&
    !loading
  ) {

    return (

      <div className="my-orders-page">

        <div className="orders-message">

          <h2>
            Please Login First
          </h2>

          <p>
            You need to login to
            view your orders.
          </p>

        </div>

      </div>

    );

  }


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="my-orders-page">

        <div className="orders-message">

          <h2>
            Loading Orders...
          </h2>

        </div>

      </div>

    );

  }


  // =====================================
  // ERROR
  // =====================================

  if (error) {

    return (

      <div className="my-orders-page">

        <div className="orders-message">

          <h2>
            {error}
          </h2>

        </div>

      </div>

    );

  }


  // =====================================
  // NO ORDERS
  // =====================================

  if (
    orders.length === 0
  ) {

    return (

      <div className="my-orders-page">

        <div className="orders-message">

          <h2>
            No Orders Found
          </h2>

          <p>
            You have not placed
            any orders yet.
          </p>

        </div>

      </div>

    );

  }


  // =====================================
  // DISPLAY ORDERS
  // =====================================

  return (

    <div className="my-orders-page">

      <div className="my-orders-container">

        <h1>
          My Orders
        </h1>


        <p className="orders-subtitle">
          View all your previous orders
        </p>


        <div className="orders-list">

          {orders.map(
            (order) => (

              <div
                className="order-card"
                key={order._id}
              >


                {/* =================================
                    ORDER HEADER
                ================================= */}

                <div className="order-header">

                  <div>

                    <h2>
                      Order
                    </h2>

                    <p>
                      ID:{" "}
                      {order._id}
                    </p>

                    <p>

                      Date:{" "}

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}

                    </p>

                  </div>


                  <div className="order-status">

                    {order.status ||
                      "Pending"}

                  </div>

                </div>


                {/* =================================
                    CUSTOMER INFORMATION
                ================================= */}

                <div className="customer-info">

                  <h3>
                    Delivery Information
                  </h3>


                  <p>

                    <strong>
                      Name:
                    </strong>{" "}

                    {order.customer?.firstName}{" "}

                    {order.customer?.lastName}

                  </p>


                  <p>

                    <strong>
                      Email:
                    </strong>{" "}

                    {order.customer?.email}

                  </p>


                  <p>

                    <strong>
                      Phone:
                    </strong>{" "}

                    {order.customer?.phone}

                  </p>


                  <p>

                    <strong>
                      Address:
                    </strong>{" "}

                    {order.customer?.address},{" "}

                    {order.customer?.city},{" "}

                    {order.customer?.country}

                  </p>


                  <p>

                    <strong>
                      Payment:
                    </strong>{" "}

                    {order.customer?.paymentMethod}

                  </p>

                </div>


                {/* =================================
                    ORDER ITEMS
                ================================= */}

                <div className="order-items">

                  <h3>
                    Ordered Items
                  </h3>


                  {order.items?.map(

                    (item, index) => (

                      <div
                        className="order-item"
                        key={
                          `${item.id}-${item.size}-${index}`
                        }
                      >


                        {/* IMAGE */}

                        <div className="order-item-image">

                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                          />

                        </div>


                        {/* DETAILS */}

                        <div className="order-item-details">

                          <h4>
                            {item.name}
                          </h4>


                          <p>

                            Category:{" "}

                            {item.category}

                          </p>


                          <p>

                            Type:{" "}

                            {item.type}

                          </p>


                          <p>

                            Size:{" "}

                            {item.size}

                          </p>


                          <p>

                            Quantity:{" "}

                            {item.quantity}

                          </p>

                        </div>


                        {/* PRICE */}

                        <div className="order-item-price">

                          <p>
                            Price
                          </p>

                          <strong>

                            PKR{" "}

                            {Number(
                              item.price
                            ).toLocaleString(
                              "en-PK"
                            )}

                          </strong>


                          <p>

                            Total:{" "}

                            PKR{" "}

                            {(
                              item.price *
                              item.quantity

                            ).toLocaleString(
                              "en-PK"
                            )}

                          </p>

                        </div>

                      </div>

                    )

                  )}

                </div>


                {/* =================================
                    ORDER TOTAL
                ================================= */}

                <div className="order-total">

                  <div>

                    <span>
                      Subtotal
                    </span>

                    <strong>

                      PKR{" "}

                      {Number(
                        order.subtotal
                      ).toLocaleString(
                        "en-PK"
                      )}

                    </strong>

                  </div>


                  <div>

                    <span>
                      Delivery Charges
                    </span>

                    <strong>

                      PKR{" "}

                      {Number(
                        order.deliveryCharges
                      ).toLocaleString(
                        "en-PK"
                      )}

                    </strong>

                  </div>


                  <div className="grand-total">

                    <span>
                      Total Amount
                    </span>

                    <strong>

                      PKR{" "}

                      {Number(
                        order.totalAmount
                      ).toLocaleString(
                        "en-PK"
                      )}

                    </strong>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

};


export default MyOrders;