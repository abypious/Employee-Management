import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/leaves">Leaves</Link></li>
        <li><Link to="/salary">Salary</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
