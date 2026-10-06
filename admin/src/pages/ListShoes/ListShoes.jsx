import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "../ListShoes/ListShoes.css";

// =====================================================
// API URL
// =====================================================

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

// =====================================================
// LIST SHOES
// =====================================================

const ListShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchShoes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/shoes/list`
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

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  useEffect(() => {
    fetchShoes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const deleteShoe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/shoes/${id}`
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

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getProductImage = (shoe) => {
    // ===================================================
    // CLOUDINARY IMAGES
    // ===================================================

    if (
      Array.isArray(shoe.images) &&
      shoe.images.length > 0
    ) {
      const image = shoe.images[0];

      // Cloudinary URL
      if (
        typeof image === "string" &&
        (
          image.startsWith("http://") ||
          image.startsWith("https://")
        )
      ) {
        return image;
      }

      // Old local image support
      if (typeof image === "string") {
        return `${API_URL}/images/${image}`;
      }
    }

    // ===================================================
    // OLD SINGLE IMAGE FIELD
    // ===================================================

    if (shoe.image) {
      // If already a Cloudinary URL
      if (
        typeof shoe.image === "string" &&
        (
          shoe.image.startsWith("http://") ||
          shoe.image.startsWith("https://")
        )
      ) {
        return shoe.image;
      }

      // Old local image
      return `${API_URL}/images/${shoe.image}`;
    }

    // ===================================================
    // NO IMAGE
    // ===================================================

    return "/no-image.png";
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="listshoes-page">

      {/* SIDEBAR */}
      <Sidebar />

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="listshoes-content">

        <div className="listshoes-card">

          {/* HEADER */}

          <div className="page-header">
            <h2>All Products</h2>

            <span>
              Total: {shoes.length}
            </span>
          </div>

          {/* LOADING */}

          {loading ? (
            <h3 className="loading-text">
              Loading Products...
            </h3>

          ) : shoes.length === 0 ? (

            /* EMPTY */

            <h3 className="loading-text">
              No Products Found
            </h3>

          ) : (

            /* PRODUCTS TABLE */

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
                          alt={shoe.name || "Shoe"}
                          className="shoe-image"
                          onError={(e) => {
                            console.error(
                              "Product image failed:",
                              e.currentTarget.src
                            );

                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
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
                        Rs.{" "}
                        {Number(
                          shoe.price || 0
                        ).toLocaleString("en-PK")}
                      </td>

                      {/* DISCOUNT */}

                      <td>
                        {Number(
                          shoe.discount || 0
                        )}
                        %
                      </td>

                      {/* DELETE */}

                      <td>
                        <button
                          className="delete-btn"
                          type="button"
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