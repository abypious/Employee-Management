import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page.css";

function Salary() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch employees and departments
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/api/employees"),
      axios.get("http://localhost:8080/api/departments"),
    ])
      .then(([empRes, deptRes]) => {
        setEmployees(empRes.data);
        setFilteredEmployees(empRes.data);
        setDepartments(deptRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter employees based on search and department
  useEffect(() => {
    let filtered = employees;

    // Department filter
    if (selectedDepartment !== "All") {
      filtered = filtered.filter(
        (emp) => emp.department?.name === selectedDepartment
      );
    }

    // Search filter
    filtered = filtered.filter(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        (emp.department?.name || "").toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEmployees(filtered);
  }, [search, employees, selectedDepartment]);

  // Sorting function
  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...filteredEmployees].sort((a, b) => {
      const valA = a[key] || (a.department?.name ?? "");
      const valB = b[key] || (b.department?.name ?? "");
      if (typeof valA === "string") {
        return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return order === "asc" ? valA - valB : valB - valA;
      }
    });
    setSortKey(key);
    setSortOrder(order);
    setFilteredEmployees(sorted);
  };

  // Update salary
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
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading employee salaries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Salary Details</h2>

      {/* Search & Department Filter */}
      <div className="search-filter-container" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #ccc", flex: 1 }}
        />

        <select
          className="department-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #ccc" }}
        >
          <option value="All" disabled hidden>
            Select Department
          </option>
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
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
                <th>Department</th>
                <th onClick={() => handleSort("salary")} style={{ cursor: "pointer" }}>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department?.name}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button
                      className="btn btn-add"
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
