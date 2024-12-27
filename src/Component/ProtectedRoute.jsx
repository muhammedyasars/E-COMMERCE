import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, requiredRole }) => {
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) {
    return <Navigate to="/Loginpage" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
