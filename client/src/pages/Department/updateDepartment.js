import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./department.css";

function UpdateDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/departments/${id}`)
      .then((res) => setDepartment(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/departments/${id}`, department)
      .then(() => navigate(`/department/${id}`))
      .catch((err) => console.error(err));
  };

  if (!department) {
    return (
      <div className="page">
        <h2>Update Department</h2>
        <div className="page-content">
          <p>Loading department details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">
        <span className="back-link" onClick={() => navigate(-1)}>
          ← Back
        </span>
      </div>

      <h2>Update Department</h2>
      <div className="center-form">
        <form className="department-form" onSubmit={handleSubmit} >
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

          <div className="button-group full-width">
            <button type="submit" className="btn btn-add" navigate={-1}> 
              Update Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDepartment;
