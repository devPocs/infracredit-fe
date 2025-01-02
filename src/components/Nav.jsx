import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./../assets/logo.jpg";
import { useAuth } from "../auth/AuthenticationContext";

const Nav = () => {
  const { userRole, companyId, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative bg-white shadow-md">
      <div className="flex items-center justify-between p-4 md:p-6 lg:px-10">
        <div className="h-10 md:h-16">
          <img className="h-full" src={logo} alt="logo" />
        </div>

        {/* Hamburger Button */}
        {isAuthenticated && (
          <button
            onClick={toggleMenu}
            className="text-mint md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}
        {/* Desktop Navigation */}

        {isAuthenticated && (
          <div className="hidden items-center gap-x-4 text-sm md:flex md:text-base lg:text-base">
            <Link to="/">
              <div className="text-mint">Home</div>
            </Link>

            {userRole === "Company" ? (
              <Link to={`/company/${companyId}`}>
                <div className="text-mint">Client</div>
              </Link>
            ) : (
              <>
                <Link to="/general-pipeline">
                  <div className="text-mint">General-Pipeline</div>
                </Link>
                <Link to="/user">
                  <div className="text-mint">Transactor</div>
                </Link>
                {userRole === "Admin" && (
                  <Link to="/admin">
                    <div className="text-mint">Admin</div>
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}

      {isMenuOpen && (
        <div className="absolute left-0 right-0 z-50 bg-white p-4 shadow-lg md:hidden">
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={toggleMenu}>
              <div className="text-mint">Home</div>
            </Link>

            {userRole === "Company" ? (
              <Link to={`/company/${companyId}`} onClick={toggleMenu}>
                <div className="text-mint">Client</div>
              </Link>
            ) : (
              <>
                <Link to="/general-pipeline" onClick={toggleMenu}>
                  <div className="text-mint">General-Pipeline</div>
                </Link>
                <Link to="/user" onClick={toggleMenu}>
                  <div className="text-mint">Transactor</div>
                </Link>
                {userRole === "Admin" && (
                  <Link to="/admin" onClick={toggleMenu}>
                    <div className="text-mint">Admin</div>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
