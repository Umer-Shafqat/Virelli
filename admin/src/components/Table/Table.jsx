import React from "react";
import "./Table.css";

const Table = ({ orders = [] }) => {
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
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item._id}>
                {/* Order ID */}
                <td>{item._id.slice(-6).toUpperCase()}</td>

                {/* Customer Name */}
                <td>{item.userId?.name || "N/A"}</td>

                {/* Product Name(s) */}
                <td>
                  {item.items?.map((shoe) => shoe.name).join(", ") || "N/A"}
                </td>

                {/* Amount */}
                <td>Rs. {item.amount?.toLocaleString()}</td>

                {/* Status */}
                <td>
                  <span
                    className={`status ${item.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No recent orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;