
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

  // GET ADMIN TOKEN
  const getAdminToken = () => {
    return localStorage.getItem("adminToken");
  };

  // FETCH ALL ORDERS
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const token = getAdminToken();

      if (!token) {
        console.error("Admin token not found. Please login again.");
        setOrders([]);
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
        "Error fetching orders:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // FETCH ORDERS ON PAGE LOAD
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);

      const token = getAdminToken();

      if (!token) {
        alert("Admin login required. Please login again.");
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

  // ORDER CODE
  const getOrderCode = (order) => {
    return order?._id
      ? order._id.slice(-8).toUpperCase()
      : "N/A";
  };

  // CUSTOMER NAME
  const getCustomerName = (order) => {
    const firstName =
      order?.customer?.firstName || "";

    const lastName =
      order?.customer?.lastName || "";

    return `${firstName} ${lastName}`.trim() || "N/A";
  };

  // CUSTOMER EMAIL
  const getCustomerEmail = (order) => {
    return order?.customer?.email || "N/A";
  };

  // TOTAL AMOUNT
  const getTotalAmount = (order) => {
    return Number(order?.totalAmount || 0).toLocaleString(
      "en-PK"
    );
  };

  // ORDER STATUS
  const getStatus = (order) => {
    return order?.status || "Pending";
  };

  // ORDER DATE
  const getOrderDate = (order) => {
    return order?.createdAt
      ? new Date(order.createdAt).toLocaleDateString(
          "en-GB"
        )
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

  return (
    <div className="admin">
      <Sidebar />

      <div className="admin-content">
        <Navbar />

        <div className="orders-page">
          <h2>All Orders</h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="orders-table-container">
              <table className="orders-table">
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
                      <td>
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
                          <span> Updating...</span>
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
