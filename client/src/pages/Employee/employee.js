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
      <div className="page">
        <h2>Employee Details</h2>
        <div className="page-content" >
          <p>Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="page">
        <h2>Employee Details</h2>
        <div className="page-content" >
          <p>Employee not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Employee Details</h2>

      <div className="employee-details-card" >
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Department:</strong> {employee.department?.name || "N/A"}</p>
        <p><strong>Job Title:</strong> {employee.jobTitle}</p>
        <p><strong>Salary:</strong> {employee.salary || "N/A"}</p>
        <p><strong>Date of Joining:</strong> {employee.dateOfJoining || "N/A"}</p>
        <p><strong>Address:</strong> {employee.address || "N/A"}</p>
        <p><strong>Date of Birth:</strong> {employee.dateOfBirth || "N/A"}</p>
        <p><strong>Gender:</strong> {employee.gender || "N/A"}</p>
        <p><strong>Marital Status:</strong> {employee.maritalStatus || "N/A"}</p>
        <p><strong>Emergency Contact:</strong> {employee.emergencyContact || "N/A"}</p>
        <p><strong>Manager:</strong> {employee.manager?.name || "N/A"}</p>
      </div>

        <div >
          <button className="btn btn-edit" onClick={handleEdit}
          >Edit Employee</button>

          <button
            className="btn btn-delete"
            onClick={handleDelete}
          >
            Delete Employee
          </button>
        </div>

        <div >
          <button
            className="btn btn-back"
            onClick={() => navigate(-1)}
          >
            Back to Employees
          </button>
        </div>
    </div>
  );
}

export default EmployeeDetails;
