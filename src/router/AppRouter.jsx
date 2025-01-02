import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";
import Home from "./../pages/Home";
import User from "./../pages/User";
import Company from "./../pages/Company";
import ProjectSites from "./../components/company/ProjectSites";
import NotFound from "./../pages/NotFound";
import GeneralPipeline from "./../pages/GeneralPipeline";
import Unauthorized from "./../pages/Unauthorized";
import { ProtectedRoute } from "./../auth/ProtectedRoute";
import Admin from "../pages/Admin";

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
        path: "/user",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "User"]}>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/:id",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "User", "Company"]}>
            <Company />
          </ProtectedRoute>
        ),
      },
      {
        path: "/general-pipeline",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "User"]}>
            <GeneralPipeline />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/project/:projectId/sites",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "User", "Company"]}>
            <ProjectSites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
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
