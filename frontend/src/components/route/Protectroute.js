import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return null; // or show a loading indicator
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
