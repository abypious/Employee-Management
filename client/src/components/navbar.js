import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/employees">Employee Management</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/employees">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-employee">Add Employee</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
