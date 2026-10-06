import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "./Orders.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH ALL ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/order/list`
      );

      console.log("Orders Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        alert(
          response.data.message ||
            "Unable to fetch orders."
        );
      }
    } catch (error) {
      console.error("Fetch orders error:", error);

      if (error.response) {
        console.error(
          "Server response:",
          error.response.data
        );
      }

      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // ORDER CODE
  // =====================================================

  const getOrderCode = (order) => {
    return (
      order.orderCode ||
      order.order_code ||
      order.orderId ||
      order.orderID ||
      order._id ||
      "N/A"
    );
  };

  // =====================================================
  // CUSTOMER NAME
  // =====================================================

  const getCustomerName = (order) => {
    if (order.customerName) return order.customerName;

    if (order.user?.name) return order.user.name;

    if (order.user?.firstName || order.user?.lastName) {
      return `${order.user?.firstName || ""} ${
        order.user?.lastName || ""
      }`.trim();
    }

    if (order.address?.firstName || order.address?.lastName) {
      return `${order.address?.firstName || ""} ${
        order.address?.lastName || ""
      }`.trim();
    }

    return order.name || "Customer";
  };

  // =====================================================
  // CUSTOMER EMAIL
  // =====================================================

  const getCustomerEmail = (order) => {
    return (
      order.email ||
      order.user?.email ||
      order.customerEmail ||
      "-"
    );
  };

  // =====================================================
  // TOTAL AMOUNT
  // =====================================================

  const getTotalAmount = (order) => {
    const amount =
      order.amount ??
      order.totalAmount ??
      order.total ??
      order.price ??
      0;

    return Number(amount).toLocaleString("en-PK");
  };

  // =====================================================
  // ORDER STATUS
  // =====================================================

  const getStatus = (order) => {
    return (
      order.status ||
      order.orderStatus ||
      "Pending"
    );
  };

  // =====================================================
  // ORDER DATE
  // =====================================================

  const getOrderDate = (order) => {
    const date =
      order.createdAt ||
      order.date ||
      order.orderDate;

    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    const value = String(status).toLowerCase();

    if (
      value === "delivered" ||
      value === "completed"
    ) {
      return "status delivered";
    }

    if (
      value === "cancelled" ||
      value === "canceled"
    ) {
      return "status cancelled";
    }

    if (
      value === "shipped" ||
      value === "out for delivery"
    ) {
      return "status shipped";
    }

    return "status pending";
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="order-page">
      <Sidebar />

      <Navbar />

      <div className="order-content">
        <div className="order-card">

          {/* HEADER */}
          <div className="page-header">
            <div>
              <h2>Orders</h2>
              <p>View orders placed by customers</p>
            </div>

            <span>
              Total Orders: {orders.length}
            </span>
          </div>

          {/* LOADING */}
          {loading ? (
            <h3 className="loading-text">
              Loading Orders...
            </h3>
          ) : orders.length === 0 ? (
            <div className="empty-orders">
              <h3>No Orders Found</h3>
              <p>
                Orders will appear here when a customer
                places an order.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="order-table">

                <thead>
                  <tr>
                    <th>Order Code</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, index) => {
                    const status = getStatus(order);

                    return (
                      <tr
                        key={
                          order._id ||
                          getOrderCode(order) ||
                          index
                        }
                      >
                        <td>
                          <strong className="order-code">
                            {getOrderCode(order)}
                          </strong>
                        </td>

                        <td>
                          {getCustomerName(order)}
                        </td>

                        <td>
                          {getCustomerEmail(order)}
                        </td>

                        <td>
                          Rs. {getTotalAmount(order)}
                        </td>

                        <td>
                          <span
                            className={getStatusClass(
                              status
                            )}
                          >
                            {status}
                          </span>
                        </td>

                        <td>
                          {getOrderDate(order)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
