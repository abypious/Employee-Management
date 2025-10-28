import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./employee.css";

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
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

    axios
      .get("http://localhost:8080/api/employees")
      .then((res) => setManagers(res.data))
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
      manager: employee.managerId
        ? { id: parseInt(employee.managerId, 10) }
        : employee.manager,
      salary: parseFloat(employee.salary),
    };

    axios
      .put(`http://localhost:8080/api/employees/${id}`, payload)
      .then(() => navigate(`/employee/${id}`))
      .catch((err) => console.error(err));
  };

  if (!employee) {
    return (
      <div className="page center-content">
        <h2>Update Employee</h2>
        <p>Loading employee details...</p>
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

      <h2>Update Employee</h2>
      <div className="center-form">
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-grid">
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
              <label>Nationality</label>
              <select
                name="nationality"
                value={employee.nationality || ""}
                onChange={handleChange}
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
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
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={employee.dateOfBirth || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={employee.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marital Status</label>
              <select
                name="maritalStatus"
                value={employee.maritalStatus || ""}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            <div className="form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={employee.emergencyContact || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Manager</label>
              <select
                name="managerId"
                value={employee.managerId || employee.manager?.id || ""}
                onChange={handleChange}
              >
                <option value="">Select Manager</option>
                {managers.map((mgr) => (
                  <option key={mgr.id} value={mgr.id}>
                    {mgr.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                rows="3"
                value={employee.address || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-group full-width">
            <button type="submit" className="btn btn-add">
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
