import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./department.css";

function DepartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/departments/${id}`);
        setDepartment(res.data);
      } catch (err) {
        console.error("Error fetching department:", err);
      }
    };

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/departments/${id}/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    Promise.all([fetchDepartment(), fetchEmployees()]).finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`http://localhost:8080/api/departments/${id}`);
        alert("Department deleted successfully");
        navigate("/departments");
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/UpdateDepartment/${id}`);
  };

  const handleEmployeeClick = (employeeId) => {
    navigate(`/EmployeeDetails/${employeeId}`);
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Department Details</h2>
        <div className="page-content">
          <p style={{ textAlign: "center" }}>Loading department details...</p>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="page">
        <h2>Department Details</h2>
        <div className="page-content">
          <p style={{ textAlign: "center" }}>Department not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Department Details</h2>

      <div className="page-content">
        <p><strong>ID:</strong> {department.id}</p>
        <p><strong>Name:</strong> {department.name}</p>
        <p><strong>Description:</strong> {department.description || "N/A"}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
          <button className="btn btn-edit" onClick={handleEdit}>Edit Department</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete Department</button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button className="btn btn-back" onClick={() => navigate("/departments")}>
            Back to Departments
          </button>
        </div>

        {/* Employee List */}
        <div className="employee-section">
          <h3>Employees in this Department</h3>
          {employees.length > 0 ? (
            <div className="employee-grid">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="employee-card"
                  onClick={() => handleEmployeeClick(emp.id)}
                >
                  <h4>{emp.name}</h4>
                  <p><strong>Role:</strong> {emp.role || "N/A"}</p>
                  <p><strong>Email:</strong> {emp.email || "N/A"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-employees">No employees found in this department.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetails;
