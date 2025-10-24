import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./employee.css";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch employee details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employees/${id}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/${id}`);
        alert("Employee deleted successfully");
        navigate("/employees"); // navigate back to list
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/UpdateEmployee/${id}`);
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Employee Details</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="page">
        <h2>Employee Details</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Employee not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Employee Details</h2>

      <div className="page-content" style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="employee-details-card" style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          lineHeight: "1.8",
        }}>
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Department:</strong> {employee.department?.name || employee.department}</p>
          <p><strong>Job Title:</strong> {employee.jobTitle}</p>
          <p><strong>Address:</strong> {employee.address || "N/A"}</p>
          <p><strong>Date Joined:</strong> {employee.dateJoined || "N/A"}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <button
            className="btn btn-edit"
            style={{ padding: "0.6rem 1.2rem", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={handleEdit}
          >
            Edit Employee
          </button>

          <button
            className="btn btn-delete"
            style={{ padding: "0.6rem 1.2rem", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={handleDelete}
          >
            Delete Employee
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            className="btn btn-back"
            style={{ padding: "0.5rem 1rem", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
            onClick={() => navigate("/employees")}
          >
            Back to Employees
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
