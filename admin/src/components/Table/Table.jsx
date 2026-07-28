import React from "react";
import "./Table.css";

const Table = () => {
  const orders = [
    {
      id: "#1001",
      customer: "Ali Khan",
      product: "Classic Sneakers",
      amount: "Rs. 4,500",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Ahmed Raza",
      product: "Leather Loafers",
      amount: "Rs. 5,800",
      status: "Pending",
    },
    {
      id: "#1003",
      customer: "Sara Ahmed",
      product: "Running Shoes",
      amount: "Rs. 6,200",
      status: "Shipped",
    },
    {
      id: "#1004",
      customer: "Usman Ali",
      product: "Sports Shoes",
      amount: "Rs. 3,900",
      status: "Cancelled",
    },
    {
      id: "#1005",
      customer: "Fatima Noor",
      product: "Casual Sneakers",
      amount: "Rs. 5,200",
      status: "Delivered",
    },
  ];

  return (
    <div className="table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.amount}</td>
              <td>
                <span
                  className={`status ${order.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;