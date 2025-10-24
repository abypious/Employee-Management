import React from "react";
import "../styles/page.css"; 

function Dashboard() {
  return (
    <div className="page">
      <h2>Dashboard Overview</h2>

      <div className="page-content">
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Employees</h3>
            <p>48</p>
          </div>
          <div className="card">
            <h3>Total Departments</h3>
            <p>6</p>
          </div>
          <div className="card">
            <h3>Monthly Payroll</h3>
            <p>$120,000</p>
          </div>
          <div className="card">
            <h3>Pending Leave Requests</h3>
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;