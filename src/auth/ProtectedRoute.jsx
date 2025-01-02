import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenticationContext";
import { useIsAuthenticated } from "@azure/msal-react";
import { Loader } from "./../components/Loader";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useIsAuthenticated();

  const { userRole, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
