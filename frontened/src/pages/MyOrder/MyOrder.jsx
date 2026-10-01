import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  StoreContext,
} from "../../Context/StoreContext/StoreContext";

import "./MyOrder.css";

// =====================================================
// API URL
// =====================================================

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000";

// =====================================================
// MY ORDERS
// =====================================================

const MyOrders = () => {
  const { token } =
    useContext(StoreContext);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (item) => {
    // -----------------------------------------
    // New order structure: item.images
    // -----------------------------------------

    if (
      Array.isArray(item?.images) &&
      item.images.length > 0
    ) {
      const image = item.images[0];

      // Cloudinary URL
      if (
        typeof image === "string" &&
        (
          image.startsWith("http://") ||
          image.startsWith("https://")
        )
      ) {
        return image;
      }

      // Old local image
      if (
        typeof image === "string"
      ) {
        return `${API_URL}/images/${image}`;
      }
    }

    // -----------------------------------------
    // Existing order structure: item.image
    // -----------------------------------------

    if (item?.image) {

      // Cloudinary URL
      if (
        typeof item.image === "string" &&
        (
          item.image.startsWith("http://") ||
          item.image.startsWith("https://")
        )
      ) {
        return item.image;
      }

      // Old local image
      return `${API_URL}/images/${item.image}`;
    }

    return "";
  };

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrders = async () => {

      if (!token) {
        setLoading(false);
        setError(
          "Please login to see your orders"
        );
        return;
      }

      try {

        setLoading(true);
        setError("");

        const response =
          await axios.get(
            `${API_URL}/api/order/myorders`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          "MY ORDERS RESPONSE:",
          response.data
        );

        if (response.data.success) {

          const sortedOrders = [
            ...(response.data.orders || []),
          ].sort(
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
          error.response?.data?.message ||
            "Error loading your orders"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchOrders();

  }, [token]);

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!token && !loading) {
    return (
      <div className="my-orders-page">

        <div className="orders-message">

          <h2>
            Please Login First
          </h2>

          <p>
            You need to login to view
            your orders.
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // LOADING
  // =====================================================

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

  // =====================================================
  // ERROR
  // =====================================================

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

  // =====================================================
  // NO ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <div className="my-orders-page">

        <div className="orders-message">

          <h2>
            No Orders Found
          </h2>

          <p>
            You have not placed any
            orders yet.
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ORDERS
  // =====================================================

  return (
    <div className="my-orders-page">

      <div className="my-orders-container">

        <h1>
          My Orders
        </h1>

        <p className="orders-subtitle">
          View all your previous orders
        </p>

        {/* =================================================
            ORDERS LIST
        ================================================= */}

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              {/* =================================================
                  ORDER HEADER
              ================================================= */}

              <div className="order-header">

                <div>

                  <h2>
                    Order
                  </h2>

                  <p>
                    ID: {order._id}
                  </p>

                  <p>
                    Date:{" "}
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )
                      : "N/A"}
                  </p>

                </div>

                <div className="order-status">

                  {order.status ||
                    "Pending"}

                </div>

              </div>

              {/* =================================================
                  CUSTOMER INFORMATION
              ================================================= */}

              <div className="customer-info">

                <h3>
                  Delivery Information
                </h3>

                <p>
                  <strong>
                    Name:
                  </strong>{" "}
                  {order.customer
                    ?.firstName || ""}{" "}
                  {order.customer
                    ?.lastName || ""}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {order.customer
                    ?.email || ""}
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>{" "}
                  {order.customer
                    ?.phone || ""}
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {order.customer
                    ?.address || ""}

                  {order.customer
                    ?.city
                    ? `, ${order.customer.city}`
                    : ""}

                  {order.customer
                    ?.country
                    ? `, ${order.customer.country}`
                    : ""}
                </p>

                <p>
                  <strong>
                    Payment:
                  </strong>{" "}
                  {order.customer
                    ?.paymentMethod ||
                    "Cash on Delivery"}
                </p>

              </div>

              {/* =================================================
                  ORDER ITEMS
              ================================================= */}

              <div className="order-items">

                <h3>
                  Ordered Items
                </h3>

                {order.items?.map(
                  (item, index) => {

                    const imageUrl =
                      getImageUrl(item);

                    return (
                      <div
                        className="order-item"
                        key={`${item.id || item._id || "item"}-${item.size || ""}-${index}`}
                      >

                        {/* ================= IMAGE ================= */}

                        <div className="order-item-image">

                          {imageUrl ? (

                            <img
                              src={imageUrl}
                              alt={
                                item.name ||
                                "Shoe"
                              }

                              onError={(e) => {

                                console.error(
                                  "Order image failed:",
                                  e.currentTarget.src
                                );

                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          ) : (

                            <div className="image-placeholder">
                              No Image
                            </div>

                          )}

                        </div>

                        {/* ================= DETAILS ================= */}

                        <div className="order-item-details">

                          <h4>
                            {item.name ||
                              "Unknown Shoe"}
                          </h4>

                          <p>
                            Category:{" "}
                            {item.category ||
                              "N/A"}
                          </p>

                          <p>
                            Type:{" "}
                            {item.type ||
                              "N/A"}
                          </p>

                          <p>
                            Size:{" "}
                            {item.size ||
                              "N/A"}
                          </p>

                          <p>
                            Quantity:{" "}
                            {Number(
                              item.quantity ||
                                0
                            )}
                          </p>

                        </div>

                        {/* ================= PRICE ================= */}

                        <div className="order-item-price">

                          <p>
                            Price
                          </p>

                          <strong>
                            PKR{" "}
                            {Number(
                              item.price ||
                                0
                            ).toLocaleString(
                              "en-PK"
                            )}
                          </strong>

                          <p>
                            Total: PKR{" "}
                            {(
                              Number(
                                item.price ||
                                  0
                              ) *
                              Number(
                                item.quantity ||
                                  0
                              )
                            ).toLocaleString(
                              "en-PK"
                            )}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* =================================================
                  ORDER TOTAL
              ================================================= */}

              <div className="order-total">

                <div>

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    PKR{" "}
                    {Number(
                      order.subtotal ||
                        0
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
                      order.deliveryCharges ||
                        0
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
                      order.totalAmount ||
                        0
                    ).toLocaleString(
                      "en-PK"
                    )}
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyOrders;