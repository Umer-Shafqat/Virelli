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

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/order/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================================
  // PRINT ORDER
  // ================================

  const printOrder = (order) => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
      <head>
        <title>Order Invoice</title>

        <style>
          body{
            font-family:Arial,sans-serif;
            padding:30px;
            color:#222;
          }

          h1,h2,h3{
            margin:5px 0;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          table,th,td{
            border:1px solid #ddd;
          }

          th,td{
            padding:10px;
            text-align:left;
          }

          .section{
            margin-top:20px;
          }

          .total{
            margin-top:20px;
            font-size:18px;
            font-weight:bold;
          }
        </style>

      </head>

      <body>

        <h1>Virelli Shoes Store</h1>
        <h2>Customer Invoice</h2>

        <div class="section">

          <h3>Customer Information</h3>

          <p><strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>

          <p><strong>Email:</strong> ${order.customer.email}</p>

          <p><strong>Phone:</strong> ${order.customer.phone}</p>

          <p><strong>Address:</strong> ${order.customer.address}</p>

          <p><strong>City:</strong> ${order.customer.city}</p>

          <p><strong>Country:</strong> ${order.customer.country}</p>

          <p><strong>Payment:</strong> ${order.customer.paymentMethod}</p>

          <p><strong>Status:</strong> ${order.status}</p>

          <p><strong>Date:</strong> ${new Date(
            order.createdAt
          ).toLocaleString()}</p>

          <p><strong>Order ID:</strong> ${order._id}</p>

        </div>

        <div class="section">

          <h3>Products</h3>

          <table>

            <thead>

              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>

            </thead>

            <tbody>

              ${order.items
                .map(
                  (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.type}</td>
                      <td>${item.size}</td>
                      <td>${item.quantity}</td>
                      <td>Rs. ${item.price}</td>
                    </tr>
                  `
                )
                .join("")}

            </tbody>

          </table>

        </div>

        <div class="total">

          <p>Subtotal : Rs. ${order.subtotal}</p>

          <p>Delivery Charges : Rs. ${order.deliveryCharges}</p>

          <p>Total Amount : Rs. ${order.totalAmount}</p>

        </div>

      </body>
      </html>
    `);

   printWindow.document.close();

printWindow.onload = () => {
  printWindow.focus();
  printWindow.print();

  printWindow.onafterprint = () => {
    printWindow.close();
  };
};
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

                      <p>{order.customer?.phone}</p>

                      <p>
                        <strong>Email:</strong> {order.customer?.email}
                      </p>

                      <p>
                        <strong>Country:</strong> {order.customer?.country}
                      </p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.customer?.paymentMethod}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <hr />

                      {order.items?.map((item, index) => (
                        <div className="order-product" key={index}>

                          <img
                            src={
                              item.image?.startsWith("/static")
                                ? `http://localhost:3000${item.image}`
                                : `${backendUrl}/images/${item.image}`
                            }
                            alt={item.name}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />

                          <div className="product-info">

                            <h4>{item.name}</h4>

                            <p><strong>Type:</strong> {item.type}</p>

                            <p><strong>Size:</strong> {item.size}</p>

                            <p><strong>Quantity:</strong> {item.quantity}</p>

                            <p><strong>Price:</strong> Rs. {item.price}</p>

                          </div>

                        </div>
                      ))}

                      <hr />

                      <p>
                        <strong>Subtotal:</strong> Rs.{" "}
                        {order.subtotal || order.amount}
                      </p>

                      <p>
                        <strong>Total Amount:</strong> Rs.{" "}
                        {order.totalAmount || order.amount}
                      </p>

                    </div>

                  </div>

                  <div className="order-right">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      className="print-order-btn"
                      onClick={() => printOrder(order)}
                    >
                      Print Order
                    </button>

                    {(order.status === "Delivered" ||
                      order.status === "Cancelled") && (
                      <button
                        className="delete-order-btn"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete Order
                      </button>
                    )}

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