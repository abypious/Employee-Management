import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./employee.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const navigate = useNavigate();

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

  // Filter and search
  useEffect(() => {
    let filtered = employees;

    if (selectedDepartment !== "All") {
      filtered = filtered.filter(
        (emp) => emp.department?.name === selectedDepartment
      );
    }

    filtered = filtered.filter(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        (emp.department?.name || emp.department || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredEmployees(filtered);
    setCurrentPage(1); // reset to first page on filter/search change
  }, [search, employees, selectedDepartment]);

  // Sorting
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

  // Pagination calculations
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Employee Details</h2>
        <div
          className="page-content"
          style={{ textAlign: "center", padding: "2rem" }}
        >
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Employee Management</h2>

      <div className="search-filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="department-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
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

        <button
          className="btn btn-add"
          onClick={() => navigate("/AddEmployee")}
        >
          Add +
        </button>
      </div>

      {/* Table */}
      <div className="page-content">
        {filteredEmployees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <>
            <table className="employee-table">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("id")}
                    style={{ cursor: "pointer" }}
                  >
                    ID
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    style={{ cursor: "pointer" }}
                  >
                    Name
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    style={{ cursor: "pointer" }}
                  >
                    Email
                  </th>
                  <th>Phone</th>
                  <th
                    onClick={() => handleSort("department")}
                    style={{ cursor: "pointer" }}
                  >
                    Department
                  </th>
                  <th
                    onClick={() => handleSort("jobTitle")}
                    style={{ cursor: "pointer" }}
                  >
                    Job Title
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp) => (
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

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => handlePageChange(num + 1)}
                  className={currentPage === num + 1 ? "active-page" : ""}
                >
                  {num + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Employees;
