import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>My App</h1>
      <div className="nav-links">
        <NavLink to="/register" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Register
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Login
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
