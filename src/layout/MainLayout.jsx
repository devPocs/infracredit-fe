import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthenticationContext";
import { useEffect } from "react";

const MainLayout = () => {
  const { redirectPath } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [redirectPath, navigate]);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
