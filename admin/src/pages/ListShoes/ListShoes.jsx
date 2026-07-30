import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./ListShoes.css";

const ListShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "http://localhost:4000";

  // Fetch all shoes
  const fetchShoes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/shoes/list`);

      if (response.data.success) {
  setShoes(Array.isArray(response.data.data) ? response.data.data : []);
    }else {
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

  // Delete shoe
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
            <span>Total: {shoes?.length || 0}</span>
          </div>

          {loading ? (
            <h3 className="loading-text">Loading Shoes...</h3>
          ) : (shoes?.length || 0) === 0 ? (
            <h3 className="loading-text">No shoes found.</h3>
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
                  {(shoes || []).map((shoe) => (
                    <tr key={shoe._id}>
                      <td>
                        <img
                          src={`${backendUrl}/images/${shoe.image}`}
                          alt={shoe.name}
                          className="shoe-image"
                        />
                      </td>

                      <td>{shoe.name}</td>

                      <td>{shoe.category}</td>

                      <td>{shoe.type}</td>

                      <td>Rs. {shoe.price}</td>

                      <td>{shoe.discount}%</td>

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