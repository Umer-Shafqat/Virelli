import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Users.css";

const Users = () => {
  const backendUrl = "http://localhost:4000";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/list`);

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/user/${id}`
      );

      if (response.data.success) {
        alert("User deleted successfully.");
        fetchUsers();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete user.");
    }
  };

  return (
    <div className="users-page">
      <Sidebar />
      <Navbar />

      <div className="users-content">
        <div className="users-card">

          <div className="users-header">
            <h2>Registered Users</h2>
            <span>Total Users: {users.length}</span>
          </div>

          {loading ? (
            <h3 className="loading-text">Loading Users...</h3>
          ) : users.length === 0 ? (
            <h3 className="loading-text">No Users Found</h3>
          ) : (
            <div className="table-wrapper">
              <table className="users-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Orders</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>

                      <td>{index + 1}</td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>{user.orderCount}</td>

                      <td>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          className="delete-user-btn"
                          onClick={() => deleteUser(user._id)}
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

export default Users;