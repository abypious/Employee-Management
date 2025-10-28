import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUsers,         
  FaBuilding,    
  FaMoneyCheckAlt,
  FaAmbulance,        
  FaCog    
} from "react-icons/fa";
import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/employees", label: "Employees", icon: <FaUsers /> },
    { to: "/departments", label: "Departments", icon: <FaBuilding /> },
    { to: "/salary", label: "Salary", icon: <FaMoneyCheckAlt /> },
    { to: "/leaves", label: "Leaves", icon: <FaAmbulance /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <aside className="sidebar">

      <nav className="sidebar-nav" role="navigation">
        <ul className="sidebar-menu">
          {menu.map(item => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to} className={active ? "active" : ""}>
                <Link to={item.to} className="menu-link">
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
