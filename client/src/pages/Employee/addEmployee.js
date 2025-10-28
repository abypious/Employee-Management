import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./employee.css";


function AddEmployee() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    jobTitle: "",
    dateOfJoining: "",
    salary: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    emergencyContact: "",
    managerId: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...employee,
      department: employee.departmentId ? { id: parseInt(employee.departmentId, 10) } : null,
      manager: employee.managerId ? { id: parseInt(employee.managerId, 10) } : null,
      salary: employee.salary ? parseFloat(employee.salary) : null,
    };

    axios.post("http://localhost:8080/api/employees", payload)
      .then(() => navigate("/employees"))
      .catch(err => console.error(err));
  };

  return (
    <div className="page">

     <div className="page-header">
        <span className="back-link" onClick={() => navigate(-1)}>
          ← Back
        </span>
      </div>

      <h2>Add New Employee</h2>
      <div className="center-form">
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {[
              { label: "Name *", type: "text", name: "name" },
              { label: "Email *", type: "email", name: "email" },
              { label: "Phone *", type: "text", name: "phone" },
              { label: "Job Title *", type: "text", name: "jobTitle" },
              { label: "Salary *", type: "number", name: "salary" },
              { label: "Date of Joining *", type: "date", name: "dateOfJoining" },
              { label: "Date of Birth *", type: "date", name: "dateOfBirth" },
              { label: "Emergency Contact", type: "text", name: "emergencyContact" },
            ].map((field) => (
              <div className="form-group" key={field.name}>
                <label>
                  {field.label.split("*")[0]}
                  {field.label.includes("*") && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={employee[field.name] || ""}
                  onChange={handleChange}
                  required={field.label.includes("*")}
                />
              </div>
            ))}

            <div className="form-group">
              <label>Department <span style={{ color: "red" }}>*</span></label>
              <select name="departmentId" value={employee.departmentId || ""} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Gender <span style={{ color: "red" }}>*</span></label>
              <select name="gender" value={employee.gender || ""} onChange={handleChange} required>
                {["", "Male", "Female", "Other"].map((g) => (
                  <option key={g} value={g}>{g || "Select Gender"}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Marital Status <span style={{ color: "red" }}>*</span></label>
              <select name="maritalStatus" value={employee.maritalStatus || ""} onChange={handleChange} required>
                {["", "Single", "Married", "Divorced"].map((m) => (
                  <option key={m} value={m}>{m || "Select Status"}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Manager</label>
              <select name="managerId" value={employee.managerId || ""} onChange={handleChange}>
                <option value="">Select Manager</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Address <span style={{ color: "red" }}>*</span></label>
              <textarea
                name="address"
                rows="3"
                value={employee.address || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button-group full-width">
            <button type="submit" className="btn btn-add">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
