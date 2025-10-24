import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./department.css";

function DepartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/departments/${id}`)
      .then((res) => {
        setDepartment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching department:", err);
        setLoading(false);
      });
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

  if (loading) {
    return (
      <div className="page">
        <h2>Department Details</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading department details...</p>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="page">
        <h2>Department Details</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Department not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Department Details</h2>

      <div className="page-content" style={{ maxWidth: "600px", margin: "auto" }}>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            lineHeight: "1.8",
          }}
        >
          <p><strong>ID:</strong> {department.id}</p>
          <p><strong>Name:</strong> {department.name}</p>
          <p><strong>Description:</strong> {department.description || "N/A"}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <button
            className="btn btn-edit"
            style={{ padding: "0.6rem 1.2rem", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={handleEdit}
          >
            Edit Department
          </button>

          <button
            className="btn btn-delete"
            style={{ padding: "0.6rem 1.2rem", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={handleDelete}
          >
            Delete Department
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            className="btn btn-back"
            style={{ padding: "0.5rem 1rem", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
            onClick={() => navigate("/departments")}
          >
            Back to Departments
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetails;
