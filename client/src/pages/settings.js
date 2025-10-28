import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/page.css";

function Settings() {
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    password: "",
    notifications: true,
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/settings")
  //     .then((res) => setSettings(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8080/api/settings", settings)
      .then(() => alert("Settings updated successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="page">
      <h2>Settings</h2>
      <div className="settings-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={settings.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          </div>

          <div className="button-group">
            <button type="reset" className="btn btn-add"> {/*change type to submit when working on settings */}
              Save Settings
             </button> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
