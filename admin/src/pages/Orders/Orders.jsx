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
        setOrders(response.data.data);
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
                        {order.address?.firstName}{" "}
                        {order.address?.lastName}
                      </h3>

                      <p>
                        {order.address?.street},{" "}
                        {order.address?.city}
                      </p>

                      <p>
                        {order.address?.phone}
                      </p>

                      <strong>
                        Rs. {order.amount}
                      </strong>

                      <div className="items-list">
                        {order.items?.map((item, index) => (
                          <p key={index}>
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                      </div>
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