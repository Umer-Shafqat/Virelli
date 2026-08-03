import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const { keyword } = useParams();

  const url = "http://localhost:4000";

  const [data, setData] = useState({
    shoes: [],
    users: [],
    orders: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${url}/api/admin/search?q=${keyword}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.success) {
        setData({
          shoes: res.data.shoes || [],
          users: res.data.users || [],
          orders: res.data.orders || [],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

  const noResults =
    data.shoes.length === 0 &&
    data.users.length === 0 &&
    data.orders.length === 0;

  return (
    <div className="search-page">
      <h1 className="search-title">
        Search Results for "{keyword}"
      </h1>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : noResults ? (
        <div className="no-results">
          No matching results found.
        </div>
      ) : (
        <>
          <div className="search-section">
            <h2>Shoes</h2>

            <div className="search-grid">
              {data.shoes.map((shoe) => (
                <div className="search-card" key={shoe._id}>
                  <h3>{shoe.name}</h3>
                  <p>Category: {shoe.category}</p>
                  <p>Type: {shoe.type}</p>
                  <p>Price: Rs. {shoe.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="search-section">
            <h2>Users</h2>

            <div className="search-grid">
              {data.users.map((user) => (
                <div className="search-card" key={user._id}>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="search-section">
            <h2>Orders</h2>

            <div className="search-grid">
              {data.orders.map((order) => (
                <div className="search-card" key={order._id}>
                  <h3>{order.customer?.name}</h3>
                  <p>Amount: Rs. {order.total}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;