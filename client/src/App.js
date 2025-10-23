import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./pages/employeelist";
import AddEmployee from "./pages/employeelist";
import EditEmployee from "./pages/employeelist";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn && <Navbar />}

      <div className="container mt-3">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EditEmployee />
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