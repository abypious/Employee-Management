import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/page.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    payroll: 0,
    pendingLeaves: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://localhost:8080/api/dashboard/stats")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setStats(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <div className="page">
        <h2>Dashboard Overview</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Dashboard Overview</h2>
      <div className="page-content">
        <div className="dashboard-cards">

          <div className="card card-clickable" onClick={() => navigate("/employees")}>
            <h3>Total Employees</h3>
            <p>{stats.totalEmployees}</p>
          </div>

          <div className="card card-clickable" onClick={() => navigate("/departments")}>
            <h3>Total Departments</h3>
            <p>{stats.totalDepartments}</p>
          </div>

          <div className="card card-clickable" onClick={() => navigate("/salary")}>
            <h3>Monthly Payroll</h3>
            <p>₹{stats?.monthlyPayroll?.toLocaleString() ?? "0"}</p>
          </div>

          <div className="card card-clickable" onClick={() => navigate("/leaves")}>
            <h3>Pending Leave Requests</h3>
            <p>{stats.pendingLeaves}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
