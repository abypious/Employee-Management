import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/employees" className="navbar-brand">
          Employee Management
        </Link>

        <div className="navbar-center">Welcome Admin</div>

        <button className="navbar-button">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
