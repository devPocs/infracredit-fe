// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { AuthContext } from "./AuthenticationContext";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      await instance.loginPopup();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    try {
      instance.logoutPopup();
      setUserRole(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const checkUserRole = async (email) => {
    try {
      const response = await fetch("/api/user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user role");
      }

      const data = await response.json();
      setUserRole(data.role);
    } catch (error) {
      console.error("Error checking user role:", error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accounts[0]) {
      checkUserRole(accounts[0].username);
    } else {
      setLoading(false);
    }
  }, [accounts]);

  const value = {
    userRole,
    loading,
    login,
    logout,
    isAuthenticated: !!accounts[0],
    userEmail: accounts[0]?.username,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
