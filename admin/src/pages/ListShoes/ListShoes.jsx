import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./ListShoes.css";

const ListShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "https://virelli.onrender.com";

  const fetchShoes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/shoes/list`
      );

      if (response.data.success) {
        setShoes(response.data.data || []);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch shoes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  // ================================
  // Delete Shoe
  // ================================
  const deleteShoe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shoe?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/shoes/${id}`
      );

      if (response.data.success) {
        alert("Shoe deleted successfully.");
        fetchShoes();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete shoe.");
    }
  };

  return (
    <div className="listshoes-page">
      <Sidebar />
      <Navbar />

      <div className="listshoes-content">
        <div className="listshoes-card">

          <div className="page-header">
            <h2>All Shoes</h2>
            <span>Total: {shoes.length}</span>
          </div>

          {loading ? (
            <h3 className="loading-text">
              Loading Shoes...
            </h3>
          ) : shoes.length === 0 ? (
            <h3 className="loading-text">
              No Shoes Found
            </h3>
          ) : (
            <div className="table-wrapper">
              <table className="shoe-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Requires Size</th>
                    <th>Sizes</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {shoes.map((shoe) => {
                    // Old products without requiresSize
                    // are treated as requiring a size.
                    const requiresSize =
                      shoe.requiresSize !== false;

                    return (
                      <tr key={shoe._id}>
                        {/* Image */}
                        <td>
                          <img
                            src={`${backendUrl}/images/${shoe.image}`}
                            alt={shoe.name}
                            className="shoe-image"
                            onError={(e) => {
                              e.target.src =
                                "/no-image.png";
                            }}
                          />
                        </td>

                        {/* Name */}
                        <td>
                          {shoe.name}
                        </td>

                        {/* Category */}
                        <td>
                          {shoe.category}
                        </td>

                        {/* Type */}
                        <td>
                          {shoe.type}
                        </td>

                        {/* Price */}
                        <td>
                          Rs.{" "}
                          {Number(
                            shoe.price || 0
                          ).toLocaleString()}
                        </td>

                        {/* Discount */}
                        <td>
                          {shoe.discount || 0}%
                        </td>

                        {/* Requires Size */}
                        <td>
                          <span
                            className={
                              requiresSize
                                ? "size-required"
                                : "size-not-required"
                            }
                          >
                            {requiresSize
                              ? "Yes"
                              : "No"}
                          </span>
                        </td>

                        {/* Sizes */}
                        <td>
                          {requiresSize ? (
                            Array.isArray(
                              shoe.sizes
                            ) &&
                            shoe.sizes.length > 0 ? (
                              shoe.sizes.join(", ")
                            ) : (
                              "No sizes"
                            )
                          ) : (
                            "N/A"
                          )}
                        </td>

                        {/* Delete */}
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteShoe(
                                shoe._id
                              )
                            }
                          >
                            Delete
                          </button>
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

export default ListShoes;