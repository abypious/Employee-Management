import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./employee.css";

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8080/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...employee,
      department: { id: parseInt(employee.departmentId || employee.department?.id, 10) },
      salary: parseFloat(employee.salary),
    };

    axios
      .put(`http://localhost:8080/api/employees/${id}`, payload)
      .then(() => navigate(`/employee/${id}`))
      .catch((err) => console.error(err));
  };

  if (!employee) {
    return (
      <div className="page">
        <h2>Update Employee</h2>
        <div className="page-content">
          <p>Loading employee details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Update Employee</h2>
      <div className="page-content">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="departmentId"
              value={employee.departmentId || employee.department?.id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={employee.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-edit">
              Update Employee
            </button>
            <button
              type="button"
              className="btn-back"
              onClick={() => navigate(`/employees`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
