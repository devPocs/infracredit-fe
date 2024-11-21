import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import User from "./../pages/User";
import Company from "./../pages/Company";
import ProjectSites from "./../components/company/ProjectSites";
import MoreData from "./../components/user/MoreData";
import NotFound from "./../pages/NotFound";
import GeneralPipeline from "../pages/GeneralPipeline";

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
        path: "user/more-data",
        element: <MoreData />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/general-pipeline",
        element: <GeneralPipeline />,
      },
      {
        path: "/company/project/:projectId/sites",
        element: <ProjectSites />,
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
