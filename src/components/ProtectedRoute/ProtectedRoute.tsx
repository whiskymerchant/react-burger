import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router";
import { getCookie } from "../../utils/cookie";
import { IUserName } from "../../utils/api";

type TProtectedRouteProps = {
  children: ReactElement;
  user: string | undefined;

};

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, user }) => {
  if (!user) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return children;
};

export default ProtectedRoute;
