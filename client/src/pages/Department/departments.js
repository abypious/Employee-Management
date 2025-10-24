import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./department.css";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/departments")
      .then((res) => {
        setDepartments(res.data);
        setFilteredDepartments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
        setLoading(false);
      });
  }, []);

  // Search
  useEffect(() => {
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      (dept.description || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [search, departments]);

  // Sort
  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...filteredDepartments].sort((a, b) => {
      const valA = a[key] || "";
      const valB = b[key] || "";
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
    setFilteredDepartments(sorted);
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Departments</h2>
        <div className="page-content" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Departments</h2>

      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "right", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search departments"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", width: "250px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          className="btn btn-add"
          onClick={() => navigate("/AddDepartment")}
          style={{ padding: "0.5rem 1rem", borderRadius: "4px" }}
        >
          Add Department
        </button>
      </div>

      <div className="page-content">
        {filteredDepartments.length === 0 ? (
          <p>No departments found.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>ID</th>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Name</th>
                <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((dept) => (
                <tr
                  key={dept.id}
                  onClick={() => navigate(`/DepartmentDetails/${dept.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{dept.id}</td>
                  <td>{dept.name}</td>
                  <td>{dept.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Departments;
