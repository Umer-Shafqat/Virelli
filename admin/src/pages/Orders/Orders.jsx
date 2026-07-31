import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Orders.css";

const Orders = () => {
  const backendUrl = "http://localhost:4000";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/list`);

      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId: id,
          status,
        }
      );

      if (response.data.success) {
        fetchOrders();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update order status.");
    }
  };

  return (
    <div className="orders-page">
      <Sidebar />
      <Navbar />

      <div className="orders-content">
        <div className="orders-card">

          <div className="orders-header">
            <h2>Orders Management</h2>
            <span>{orders.length} Orders</span>
          </div>

          {loading ? (
            <h3 className="loading-text">Loading Orders...</h3>
          ) : orders.length === 0 ? (
            <h3 className="loading-text">No Orders Found</h3>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-item" key={order._id}>

                  <div className="order-left">

                    <div className="order-icon">📦</div>

                    <div className="order-details">

                      <h3>
                        {order.customer?.firstName}{" "}
                        {order.customer?.lastName}
                      </h3>

                      <p>
                        <strong>Order ID:</strong>{" "}
                        {order._id.slice(-6).toUpperCase()}
                      </p>

                      <p>
                        {order.customer?.address}, {order.customer?.city}
                      </p>

                      <p>
                        {order.customer?.phone}
                      </p>

                      <p><strong>Email:</strong> {order.customer?.email}</p>
                     <p><strong>Country:</strong> {order.customer?.country}</p>
                      <p><strong>Payment:</strong> {order.customer?.paymentMethod}</p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <hr />

                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="order-product"
                        >
                        <img
  src={`http://localhost:4000/images/${item.image}`}
  alt={item.name}
/>
                          <div className="product-info">

                            <h4>{item.name}</h4>

                            <p>
                              <strong>Type:</strong> {item.type}
                            </p>

                            <p>
                              <strong>Size:</strong> {item.size}
                            </p>

                            <p>
                              <strong>Quantity:</strong>{" "}
                              {item.quantity}
                            </p>

                            <p>
                              <strong>Price:</strong> Rs. {item.price}
                            </p>

                          </div>
                        </div>
                      ))}

                      <hr />

                      <p>
                        <strong>Subtotal:</strong>{" "}
                        Rs. {order.subtotal || order.amount}
                      </p>

                      <p>
                        <strong>Total Amount:</strong>{" "}
                        Rs. {order.totalAmount || order.amount}
                      </p>

                    </div>

                  </div>

                  <div className="order-right">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Order Placed">
                        Order Placed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Orders;