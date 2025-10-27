import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]); // for selecting manager
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
      <h2>Add Employee</h2>
      <div className="page-content">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" value={employee.phone} onChange={handleChange} required />

          <select name="departmentId" value={employee.departmentId} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
          </select>

          <input type="text" name="jobTitle" placeholder="Job Title" value={employee.jobTitle} onChange={handleChange} required />
          <input type="date" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange} required />
          <input type="number" name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} required />

          {/* New fields */}
          <input type="text" name="address" placeholder="Address" value={employee.address} onChange={handleChange} />
          <input type="date" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} />
          <select name="gender" value={employee.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select name="maritalStatus" value={employee.maritalStatus} onChange={handleChange}>
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
          <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={employee.emergencyContact} onChange={handleChange} />

          <select name="managerId" value={employee.managerId} onChange={handleChange}>
            <option value="">Select Manager</option>
            {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
          </select>

          <div>
            <button type="submit">Save Employee</button>
            <button type="button" onClick={() => navigate("/employees")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
