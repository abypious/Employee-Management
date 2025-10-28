import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page.css";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/leaves") // assume your backend endpoint
  //     .then((res) => {
  //       setLeaves(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, []);

  const handleUpdateStatus = (id, status) => {
    axios
      .put(`http://localhost:8080/api/leaves/${id}`, { status })
      .then(() => {
        setLeaves((prev) =>
          prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
        );
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Leave Details</h2>
        <div className="page-content">
          <p>Loading leave records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Leave Management</h2>
      <div className="page-content">
        {leaves.length === 0 ? (
          <p>No leave records found.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.employee?.name}</td>
                  <td>{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>{leave.status}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleUpdateStatus(leave.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleUpdateStatus(leave.id, "Rejected")}
                    >
                      Reject
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

export default Leaves;
