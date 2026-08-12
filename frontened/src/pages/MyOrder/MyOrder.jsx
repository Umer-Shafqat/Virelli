import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext/StoreContext";
import "./MyOrder.css";

const MyOrders = () => {
  const { token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend URL from Vercel environment variable
  const url = process.env.REACT_APP_API_URL;

  const fetchOrders = useCallback(async () => {
    if (!token) {
      setLoading(false);
      setError("Please login to see your orders");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${url}/api/order/myorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("MY ORDERS RESPONSE:", response.data);

      if (response.data.success) {
        const sortedOrders = [...(response.data.orders || [])].sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
      } else {
        setError(
          response.data.message || "Unable to load orders"
        );
      }
    } catch (error) {
      console.log("Get orders error:", error);

      setError(
        error.response?.data?.message ||
          "Error loading your orders"
      );
    } finally {
      setLoading(false);
    }
  }, [token, url]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Not logged in
  if (!token && !loading) {
    return (
      <div className="my-orders-page">
        <div className="orders-message">
          <h2>Please Login First</h2>
          <p>You need to login to view your orders.</p>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="my-orders-page">
        <div className="orders-message">
          <h2>Loading Orders...</h2>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="my-orders-page">
        <div className="orders-message">
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  // No orders
  if (orders.length === 0) {
    return (
      <div className="my-orders-page">
        <div className="orders-message">
          <h2>No Orders Found</h2>
          <p>You have not placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <div className="my-orders-container">
        <h1>My Orders</h1>

        <p className="orders-subtitle">
          View all your previous orders
        </p>

        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* ORDER HEADER */}
              <div className="order-header">
                <div>
                  <h2>Order</h2>

                  <p>ID: {order._id}</p>

                  <p>
                    Date:{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="order-status">
                  {order.status || "Pending"}
                </div>
              </div>

              {/* CUSTOMER INFORMATION */}
              <div className="customer-info">
                <h3>Delivery Information</h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customer?.firstName || ""}{" "}
                  {order.customer?.lastName || ""}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.customer?.email || ""}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.customer?.phone || ""}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.customer?.address || ""},{" "}
                  {order.customer?.city || ""},{" "}
                  {order.customer?.country || ""}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.customer?.paymentMethod ||
                    "Cash on Delivery"}
                </p>
              </div>

              {/* ORDER ITEMS */}
              <div className="order-items">
                <h3>Ordered Items</h3>

                {order.items?.map((item, index) => (
                  <div
                    className="order-item"
                    key={`${item.id}-${item.size}-${index}`}
                  >
                    <div className="order-item-image">
                      <img
                        src={`${url}/images/${item.image}`}
                        alt={item.name}
                      />
                    </div>

                    <div className="order-item-details">
                      <h4>{item.name}</h4>

                      <p>Category: {item.category}</p>

                      <p>Type: {item.type}</p>

                      <p>Size: {item.size}</p>

                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <div className="order-item-price">
                      <p>Price</p>

                      <strong>
                        PKR{" "}
                        {Number(
                          item.price || 0
                        ).toLocaleString("en-PK")}
                      </strong>

                      <p>
                        Total: PKR{" "}
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toLocaleString("en-PK")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORDER TOTAL */}
              <div className="order-total">
                <div>
                  <span>Subtotal</span>

                  <strong>
                    PKR{" "}
                    {Number(
                      order.subtotal || 0
                    ).toLocaleString("en-PK")}
                  </strong>
                </div>

                <div>
                  <span>Delivery Charges</span>

                  <strong>
                    PKR{" "}
                    {Number(
                      order.deliveryCharges || 0
                    ).toLocaleString("en-PK")}
                  </strong>
                </div>

                <div className="grand-total">
                  <span>Total Amount</span>

                  <strong>
                    PKR{" "}
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString("en-PK")}
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