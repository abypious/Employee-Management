import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page.css";

function Salary() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleUpdateSalary = (id) => {
    const newSalary = prompt("Enter new salary:");
    if (!newSalary || isNaN(newSalary)) return;

    axios
      .put(`http://localhost:8080/api/employees/${id}`, { salary: parseFloat(newSalary) })
      .then(() => {
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === id ? { ...emp, salary: parseFloat(newSalary) } : emp))
        );
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Salary Management</h2>
        <div className="page-content">
          <p>Loading employee salaries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Salary Management</h2>
      <div className="page-content">
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department?.name}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleUpdateSalary(emp.id)}
                    >
                      Update Salary
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Salary;
