import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // JWT stored on login

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
