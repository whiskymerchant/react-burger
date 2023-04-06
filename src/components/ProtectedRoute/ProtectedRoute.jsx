import React from "react";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = (user, children) => {
  location = useLocation();

  if (user) {
    return <Navigate to={{ pathname: "/" }} />;

  }

  if (!user) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return children
};

export default ProtectedRoute;
