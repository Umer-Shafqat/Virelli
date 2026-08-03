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
            <th>Products</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item._id}>
                <td>{item._id.slice(-6).toUpperCase()}</td>

                <td>{item.userId?.name || "N/A"}</td>

                <td>
                  {item.items?.length
                    ? item.items.map((shoe) => shoe.name).join(", ")
                    : "N/A"}
                </td>

                <td>
                  Rs. {(item.totalAmount || 0).toLocaleString("en-PK")}
                </td>

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