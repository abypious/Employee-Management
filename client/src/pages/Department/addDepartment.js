import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./department.css";

function AddDepartment() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/departments", department)
      .then(() => navigate("/departments"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="page">
      <h2>Add Department</h2>
      <div className="page-content">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Department Name</label>
            <input
              type="text"
              name="name"
              value={department.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-add">Save Department</button>
            <button
              type="button"
              className="btn-back"
              onClick={() => navigate("/departments")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;
