import skyline from "./../assets/skyline.jpg";
import { useAuth } from "../auth/AuthenticationContext";
import { useIsAuthenticated } from "@azure/msal-react";
import { Loader } from "../components/Loader";

const Home = () => {
  const { login, logout, userRole, loading } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row">
      {/* Left Side: Welcome Message and Auth Button */}
      <div className="flex w-full flex-col items-center justify-center p-8 text-gray-800 md:w-1/2">
        <h1 className="mb-6 text-center text-3xl font-semibold md:text-5xl">
          Welcome to Infracredit
        </h1>
        {loading ? (
          <Loader />
        ) : isAuthenticated && userRole ? (
          <div className="flex w-full max-w-xs flex-col items-center gap-4">
            <p className="text-center text-gray-600">
              You are logged in as {userRole}
            </p>
            <button
              onClick={logout}
              className="w-full rounded bg-red-500 p-2 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="w-full max-w-xs rounded bg-green-500 p-2 font-semibold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign in with Microsoft
          </button>
        )}
      </div>
      {/* Right Side: Skyline Image (Hidden on Mobile) */}
      <div
        className="hidden w-full bg-cover bg-center md:block md:w-1/2"
        style={{ backgroundImage: `url(${skyline})` }}
      ></div>
    </div>
  );
};

export default Home;
