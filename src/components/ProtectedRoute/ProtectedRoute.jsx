import React from "react";
import { Navigate, useLocation } from "react-router";
import { getCookie } from "../../utils/cookie";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return children;
};

export default ProtectedRoute;
