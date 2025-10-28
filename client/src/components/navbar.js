import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-text">Employee Management</div>
        </Link>

        <div className="navbar-right">
          <button className="icon-btn">
            <FaBell />
          </button>

          <div className="avatar-wrapper" ref={dropdownRef}>
            <div className="avatar" onClick={() => setProfileOpen(!profileOpen)}>A</div>
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <strong>Administrator</strong>
                </div>
                <hr />
                <button onClick={handleLogout} className="dropdown-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
