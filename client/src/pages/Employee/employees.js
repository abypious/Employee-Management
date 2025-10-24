import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./employee.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/employees")
      .then((res) => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  //search
  useEffect(() => {
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      (emp.department?.name || emp.department || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [search, employees]);

  //sorting
  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...filteredEmployees].sort((a, b) => {
      const valA = a[key] || (a.department?.name ?? "");
      const valB = b[key] || (b.department?.name ?? "");
      if (typeof valA === "string") {
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return order === "asc" ? valA - valB : valB - valA;
      }
    });
    setSortKey(key);
    setSortOrder(order);
    setFilteredEmployees(sorted);
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Employee Management</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Employee Management</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap:"2rem", justifyContent: "right"}}>
        
        <input
          type="text"
          placeholder="Search by name, email, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <button
          className="btn btn-add"
          onClick={() => navigate("/AddEmployee")}
        >
          Add Employee
        </button>
      </div>

      <div className="page-content">
        {filteredEmployees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>Id</th>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Name</th>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>Email</th>
                <th>Phone</th>
                <th onClick={() => handleSort("department")} style={{ cursor: "pointer" }}>Department</th>
                <th onClick={() => handleSort("jobTitle")} style={{ cursor: "pointer" }}>Job Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="employee-row"
                  onClick={() => navigate(`/EmployeeDetails/${emp.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department?.name || emp.department}</td>
                  <td>{emp.jobTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Employees;
