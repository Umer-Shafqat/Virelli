import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    ShoppingCart,
    Users
} from "lucide-react";

import "./Sidebar.css";
import logo from "../../assets/logo1.png";

const Sidebar = () => {

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                <img src={logo} alt="logo" />

                <h2>Virelli</h2>

            </div>

            <nav>

                <NavLink to="/dashboard" className="nav-item">

                    <LayoutDashboard size={20} />

                    <span>Dashboard</span>

                </NavLink>

                <NavLink to="/add-shoe" className="nav-item">

                    <PlusCircle size={20} />

                    <span>Add Shoe</span>

                </NavLink>

                <NavLink to="/list-shoes" className="nav-item">

                    <List size={20} />

                    <span>List Shoes</span>

                </NavLink>

                <NavLink to="/orders" className="nav-item">

                    <ShoppingCart size={20} />

                    <span>Orders</span>

                </NavLink>

                <NavLink to="/users" className="nav-item">

                    <Users size={20} />

                    <span>Users</span>

                </NavLink>

            </nav>

        </div>

    );
};

export default Sidebar;