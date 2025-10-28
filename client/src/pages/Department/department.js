import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit3, Trash2 } from "lucide-react"; // icons
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
      <div className="page center-content">
        <h2>Department Details</h2>
        <p>Loading department details...</p>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="page center-content">
        <h2>Department Details</h2>
        <p>Department not found.</p>
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

      <h2>Department Details</h2>
      <div className="center-form">
        <div className="department-form details-view">
          {/* Top-right icons */}
          <div className="top-right-buttons">
            <button className="icon-btn edit" onClick={handleEdit} title="Edit Department">
              <Edit3 size={18} />
            </button>
            <button className="icon-btn delete" onClick={handleDelete} title="Delete Department">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>ID</label>
              <p>{department.id}</p>
            </div>

            <div className="form-group">
              <label>Name</label>
              <p>{department.name}</p>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <p>{department.description || "N/A"}</p>
            </div>
          </div>

          {/* Employee list section */}
          <div className="department-section">
            <h3>Employees in this Department</h3>
            {employees.length > 0 ? (
              <div className="department-grid">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="department-card"
                    onClick={() => handleEmployeeClick(emp.id)}
                  >
                    <h4>{emp.name}</h4>
                    <p><strong>Role:</strong> {emp.role || "N/A"}</p>
                    <p><strong>Email:</strong> {emp.email || "N/A"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-departments">No employees found in this department.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetails;
