import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { AuthContext } from "./AuthenticationContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getCompanyId } from "../apis/companyApis";

const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isValidUser, setIsValidUser] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);

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
      setIsValidUser(false);
      setCompanyId(null);
      setRedirectPath(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const checkUserRole = async (email) => {
    try {
      const response = await fetch(
        `https://localhost:7140/api/Users/role?email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user role");
      }
      const userData = await response.json();
      if (userData.role) {
        setUserRole(userData.role);
        setIsValidUser(true);

        if (userData.role === "Company") {
          const companyData = await getCompanyId(email);
          setCompanyId(companyData);
          setRedirectPath(`/company/${companyData}`);
        }
      } else {
        setUserRole(null);
        setIsValidUser(false);
        toast.error("Unauthorized access");
        logout();
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      setUserRole(null);
      setIsValidUser(false);
      toast.error("Unauthorized access");
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accounts[0]) {
      setLoading(true);
      checkUserRole(accounts[0].username);
    } else {
      setLoading(false);
      setIsValidUser(false);
    }
  }, [accounts]);

  const value = {
    userRole,
    loading,
    login,
    logout,
    isAuthenticated: isValidUser && !!accounts[0],
    userEmail: accounts[0]?.username,
    companyId,
    redirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
