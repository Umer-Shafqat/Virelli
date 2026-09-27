import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./ListShoes.css";

const ListShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_API_URL;

  // =================================
  // FETCH PRODUCTS
  // =================================
  const fetchShoes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/shoes/list`
      );

      console.log("List Shoes Response:", response.data);

      if (response.data.success) {
        setShoes(response.data.data || []);
      } else {
        alert(
          response.data.message ||
            "Unable to fetch products."
        );
      }
    } catch (error) {
      console.error("Fetch shoes error:", error);

      if (error.response) {
        console.error(
          "Server response:",
          error.response.data
        );
        console.error(
          "Status:",
          error.response.status
        );
      } else if (error.request) {
        console.error(
          "No response received from server."
        );
      }

      alert("Failed to fetch shoes.");
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // LOAD PRODUCTS
  // =================================
  useEffect(() => {
    fetchShoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =================================
  // DELETE PRODUCT
  // =================================
  const deleteShoe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/shoes/${id}`
      );

      if (response.data.success) {
        alert("Product deleted successfully.");

        fetchShoes();
      } else {
        alert(
          response.data.message ||
            "Unable to delete product."
        );
      }
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert("Unable to delete product.");
    }
  };

  // =================================
  // PRODUCT IMAGE
  // =================================
  const getProductImage = (shoe) => {
    if (
      Array.isArray(shoe.images) &&
      shoe.images.length > 0
    ) {
      return `${backendUrl}/images/${shoe.images[0]}`;
    }

    if (shoe.image) {
      return `${backendUrl}/images/${shoe.image}`;
    }

    return "/no-image.png";
  };

  return (
    <div className="listshoes-page">
      <Sidebar />

      <Navbar />

      <div className="listshoes-content">
        <div className="listshoes-card">

          {/* =========================
              HEADER
          ========================= */}
          <div className="page-header">
            <h2>All Products</h2>

            <span>
              Total: {shoes.length}
            </span>
          </div>

          {/* =========================
              LOADING
          ========================= */}
          {loading ? (
            <h3 className="loading-text">
              Loading Products...
            </h3>
          ) : shoes.length === 0 ? (
            /* =========================
               EMPTY
            ========================= */
            <h3 className="loading-text">
              No Products Found
            </h3>
          ) : (
            /* =========================
               PRODUCTS TABLE
            ========================= */
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
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {shoes.map((shoe) => (
                    <tr key={shoe._id}>

                      {/* IMAGE */}
                      <td>
                        <img
                          src={getProductImage(shoe)}
                          alt={shoe.name}
                          className="shoe-image"
                          onError={(e) => {
                            e.target.src =
                              "/no-image.png";
                          }}
                        />
                      </td>

                      {/* NAME */}
                      <td>
                        {shoe.name}
                      </td>

                      {/* CATEGORY */}
                      <td>
                        {shoe.category || "Shoes"}
                      </td>

                      {/* TYPE */}
                      <td>
                        {shoe.type || "-"}
                      </td>

                      {/* PRICE */}
                      <td>
                        Rs. {shoe.price}
                      </td>

                      {/* DISCOUNT */}
                      <td>
                        {shoe.discount || 0}%
                      </td>

                      {/* DELETE */}
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteShoe(shoe._id)
                          }
                        >
                          Delete
                        </button>
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

export default ListShoes;