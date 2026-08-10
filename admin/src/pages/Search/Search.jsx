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

  // =====================================
  // FETCH SEARCH RESULTS
  // =====================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${url}/api/admin/search?q=${encodeURIComponent(keyword)}`,
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
      console.log("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD WHEN KEYWORD CHANGES
  // =====================================

  useEffect(() => {
    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  // =====================================
  // NO RESULTS
  // =====================================

  const noResults =
    data.shoes.length === 0 &&
    data.users.length === 0 &&
    data.orders.length === 0;

  // =====================================
  // UI
  // =====================================

  return (
    <div className="search-page">

      <h1>
        Search Results for "{keyword}"
      </h1>

      {loading ? (
        <div className="loading">
          Loading...
        </div>
      ) : noResults ? (
        <div className="no-results">
          No matching results found.
        </div>
      ) : (
        <>

          {/* =====================================
              SHOES
          ===================================== */}

          {data.shoes.length > 0 && (
            <div className="search-section">

              <h2>Shoes</h2>

              <div className="search-grid">

                {data.shoes.map((shoe) => (
                  <div
                    className="search-card"
                    key={shoe._id}
                  >

                    {shoe.image && (
                      <img
                        src={`${url}/images/${shoe.image}`}
                        alt={shoe.name}
                        className="search-shoe-image"
                      />
                    )}

                    <h3>
                      {shoe.name}
                    </h3>

                    <p>
                      Category: {shoe.category}
                    </p>

                    <p>
                      Type: {shoe.type}
                    </p>

                    <p>
                      Price: Rs.{" "}
                      {shoe.price?.toLocaleString()}
                    </p>

                    {shoe.discount > 0 && (
                      <p>
                        Discount: {shoe.discount}%
                      </p>
                    )}

                  </div>
                ))}

              </div>

            </div>
          )}


          {/* =====================================
              USERS
          ===================================== */}

          {data.users.length > 0 && (
            <div className="search-section">

              <h2>Users</h2>

              <div className="search-grid">

                {data.users.map((user) => (
                  <div
                    className="search-card"
                    key={user._id}
                  >

                    <h3>
                      {user.name}
                    </h3>

                    <p>
                      {user.email}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          )}


          {/* =====================================
              ORDERS
          ===================================== */}

          {data.orders.length > 0 && (
            <div className="search-section">

              <h2>Orders</h2>

              <div className="search-grid">

                {data.orders.map((order) => (
                  <div
                    className="search-card"
                    key={order._id}
                  >

                    <h3>
                      {order.customer?.name ||
                        order.user?.name ||
                        "Customer"}
                    </h3>

                    <p>
                      Amount: Rs.{" "}
                      {order.total?.toLocaleString()}
                    </p>

                    <p>
                      Status: {order.status}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
};

export default Search;
