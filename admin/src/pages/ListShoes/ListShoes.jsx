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
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete product.");
    }
  };

  const getProductImage = (shoe) => {
    if (Array.isArray(shoe.images) && shoe.images.length > 0) {
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
          <div className="page-header">
            <h2>All Shoes</h2>
            <span>Total: {shoes.length}</span>
          </div>

          {loading ? (
            <h3 className="loading-text">Loading Shoes...</h3>
          ) : shoes.length === 0 ? (
            <h3 className="loading-text">No Shoes Found</h3>
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
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {shoes.map((shoe) => (
                    <tr key={shoe._id}>
                      <td>
                        <img
                          src={getProductImage(shoe)}
                          alt={shoe.name}
                          className="shoe-image"
                          onError={(e) => {
                            e.target.src = "/no-image.png";
                          }}
                        />
                      </td>

                      <td>{shoe.name}</td>
                      <td>{shoe.category || "Shoes"}</td>
                      <td>{shoe.type}</td>
                      <td>Rs. {shoe.price}</td>
                      <td>{shoe.discount || 0}%</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteShoe(shoe._id)}
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
