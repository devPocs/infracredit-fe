import { Link } from "react-router-dom";
import skyline from "./../assets/skyline.jpg";

const Home = () => {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row">
      {/* Left Side: Welcome Message and Login Button */}
      <div className="flex w-full flex-col items-center justify-center p-8 text-gray-800 md:w-1/2">
        <h1 className="mb-6 text-center text-3xl font-semibold md:text-5xl">
          Welcome to Infracredit
        </h1>
        <Link to="/login" className="w-full max-w-xs">
          <button
            type="button"
            className="w-full rounded bg-green-500 p-2 font-semibold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </Link>
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
