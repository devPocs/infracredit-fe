import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import User from "./../pages/User";
import Company from "./../pages/Company";
import NotFound from "./../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout className="min-h-[calc(100vh-8rem)]" />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
