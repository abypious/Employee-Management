import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/Employee/employees";
import Departments from "./pages//Department/departments";
import Leaves from "./pages/leaves";
import Salary from "./pages/salary";
import Settings from "./pages/settings";
import EmployeeDetails from "./pages/Employee/employee";
import DepartmentDetails from "./pages/Department/department";
import AddEmployee from "./pages/Employee/addEmployee";
import AddDepartment from "./pages/Department/addDepartment";
import UpdateEmployee from "./pages/Employee/updateEmployee";
import UpdateDepartment from "./pages/Department/updateDepartment";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);

const handleLoginState = (state) => {
  setIsLoggedIn(state);
  localStorage.setItem("isLoggedIn", state);
};

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={handleLoginState} />}
      {isLoggedIn && <Sidebar />}

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/login" element={ isLoggedIn ? ( <Navigate to="/dashboard" replace /> ) : 
              (<Login setIsLoggedIn={handleLoginState} />)
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Employees />
              </ProtectedRoute>
            }
          />

          <Route
            path="/departments"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Departments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaves"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Leaves />
              </ProtectedRoute>
            }
          />

          <Route
            path="/salary"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Salary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/EmployeeDetails/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EmployeeDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/UpdateEmployee/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UpdateEmployee />
              </ProtectedRoute>
            }
          />


          <Route
            path="/DepartmentDetails/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DepartmentDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/UpdateDepartment/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UpdateDepartment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AddEmployee"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AddDepartment"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddDepartment />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
