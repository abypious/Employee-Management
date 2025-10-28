import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit3, Trash2 } from "lucide-react"; // icons
import "./employee.css";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

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
        navigate("/employees");
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
      <div className="page center-content">
        <h2>Employee Details</h2>
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="page center-content">
        <h2>Employee Details</h2>
        <p>Employee not found.</p>
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

      <h2>Employee Details</h2>
      <div className="center-form">
        <div className="employee-form details-view">
          <div className="top-right-buttons">
            <button className="icon-btn edit" onClick={handleEdit} title="Edit Employee">
              <Edit3 size={18} />
            </button>
            <button className="icon-btn delete" onClick={handleDelete} title="Delete Employee">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>ID</label>
              <p>{employee.id}</p>
            </div>

            <div className="form-group">
              <label>Name</label>
              <p>{employee.name}</p>
            </div>

            <div className="form-group">
              <label>Email</label>
              <p>{employee.email}</p>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <p>{employee.phone}</p>
            </div>

            <div className="form-group">
              <label>Department</label>
              <p>{employee.department?.name || "N/A"}</p>
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <p>{employee.jobTitle}</p>
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <p>{employee.dateOfJoining || "N/A"}</p>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <p>{employee.dateOfBirth || "N/A"}</p>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <p>{employee.gender || "N/A"}</p>
            </div>

            <div className="form-group">
              <label>Marital Status</label>
              <p>{employee.maritalStatus || "N/A"}</p>
            </div>

            <div className="form-group">
              <label>Emergency Contact</label>
              <p>{employee.emergencyContact || "N/A"}</p>
            </div>

            <div className="form-group">
              <label>Manager</label>
              <p>{employee.manager?.name || "N/A"}</p>
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <p>{employee.address || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
