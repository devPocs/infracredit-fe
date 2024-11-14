import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username or Email Address
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
              placeholder="Enter your username or email"
              required
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              👁️
            </span>
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-green-500 focus:ring-0"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-green-500 p-2 font-semibold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="/forgot-password" className="hover:underline">
            Lost your password?
          </a>
          <br />
          <a
            href="/"
            className="mt-2 inline-block text-green-500 hover:underline"
          >
            ← Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
