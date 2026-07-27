import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import AddShoe from "./pages/AddShoe/AddShoe";
import ListShoes from "./pages/ListShoes/ListShoes";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

        <div className="app-content">

          <Navbar />

          <div className="page-content">

            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/add-shoe" element={<AddShoe />} />

              <Route path="/list-shoes" element={<ListShoes />} />

              <Route path="/orders" element={<Orders />} />

              <Route path="/users" element={<Users />} />

            </Routes>

          </div>

        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;