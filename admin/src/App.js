import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddShoe from "./pages/AddShoe/AddShoe";
import ListShoes from "./pages/ListShoes/ListShoes";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";
import Analytics from "./pages/Analytics/Analytics";
import Search from "./pages/Search/Search";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-shoe"
          element={
            <ProtectedRoute>
              <AddShoe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list-shoes"
          element={
            <ProtectedRoute>
              <ListShoes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route path="/search/:keyword" element={<Search />} />
     
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;