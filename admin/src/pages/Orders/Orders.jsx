
import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

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
  const [updatingOrder, setUpdatingOrder] = useState("");

  // FETCH ALL ORDERS
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        setOrders([]);
        console.error("Admin token not found");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/order/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(
        "Fetch orders error:",
        error.response?.data || error.message
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // LOAD ORDERS
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // GET CUSTOMER NAME
  const getCustomerName = (order) => {
    const customer = order?.customer;

    if (typeof customer === "string") {
      return customer;
    }

    const firstName = customer?.firstName || "";
    const lastName = customer?.lastName || "";

    const fullName = `${firstName} ${lastName}`.trim();

    return (
      fullName ||
      customer?.name ||
      customer?.fullName ||
      order?.customerName ||
      order?.user?.name ||
      [
        order?.user?.firstName,
        order?.user?.lastName,
      ].filter(Boolean).join(" ") ||
      "N/A"
    );
  };

  // GET CUSTOMER EMAIL
  const getCustomerEmail = (order) => {
    return (
      order?.customer?.email ||
      order?.email ||
      order?.user?.email ||
      "N/A"
    );
  };

  // GET ORDER CODE
  const getOrderCode = (order) => {
    return order?._id
      ? order._id.slice(-8).toUpperCase()
      : "N/A";
  };

  // GET TOTAL AMOUNT
  const getTotalAmount = (order) => {
    return Number(
      order?.totalAmount || 0
    ).toLocaleString("en-PK");
  };

  // GET STATUS
  const getStatus = (order) => {
    return order?.status || "Pending";
  };

  // GET ORDER DATE
  const getOrderDate = (order) => {
    return order?.createdAt
      ? new Date(order.createdAt).toLocaleDateString("en-GB")
      : "N/A";
  };

  // STATUS CSS CLASS
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status pending";

      case "Cancelled":
        return "status cancelled";

      case "Shipping":
        return "status shipped";

      case "Delivered":
        return "status delivered";

      default:
        return "status";
    }
  };

  // UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        alert("Please login as admin again");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/order/status`,
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders((previousOrders) =>
          previousOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status:
                    response.data.order?.status || status,
                }
              : order
          )
        );

        alert("Order status updated successfully");
      } else {
        alert(
          response.data.message ||
          "Unable to update order status"
        );
      }
    } catch (error) {
      console.error(
        "Update status error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Error updating order status"
      );
    } finally {
      setUpdatingOrder("");
    }
  };

  return (
    <div className="order-page">
      <Sidebar />

      <div className="order-content">
        <Navbar />

        <div className="order-card">
          <div className="page-header">
            <h2>All Orders</h2>
          </div>

          {loading ? (
            <div className="loading">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-orders">
              <h3>No Orders Found</h3>
              <p>There are currently no customer orders.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Order Code</th>
                    <th>Customer</th>
                    <th>Email Address</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Update Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-code">
                        #{getOrderCode(order)}
                      </td>

                      <td>
                        {getCustomerName(order)}
                      </td>

                      <td>
                        {getCustomerEmail(order)}
                      </td>

                      <td>
                        PKR {getTotalAmount(order)}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            getStatus(order)
                          )}
                        >
                          {getStatus(order)}
                        </span>
                      </td>

                      <td>
                        {getOrderDate(order)}
                      </td>

                      <td>
                        <select
                          className="status-select"
                          value={getStatus(order)}
                          disabled={
                            updatingOrder === order._id
                          }
                          onChange={(e) =>
                            updateOrderStatus(
                              order._id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                          <option value="Shipping">
                            Shipping
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>
                        </select>

                        {updatingOrder === order._id && (
                          <small>Updating...</small>
                        )}
                      </td>
                    </tr>
                  ))}
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
