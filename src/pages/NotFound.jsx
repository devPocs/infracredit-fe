import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br text-mint">
      <div className="text-center">
        <h1 className="text-mint-500 mb-4 text-9xl font-bold">404</h1>
        <p className="text-mint-700 mb-8 text-2xl">Page Not Found!</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-mint px-6 py-3 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
