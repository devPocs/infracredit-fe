import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./../components/company/Dashboard";
import AllProjects from "./../components/company/AllProjects";
import { useCompany } from "./../features/company/hooks/useCompany";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthenticationContext";
import { Loader } from "../components/Loader";

const Company = () => {
  const { userRole, companyId, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { company, fetchCompanyById, fetchProjectsByCompanyId } = useCompany();
  const { id } = useParams();

  // Calculate all metrics in one place
  const calculateMetrics = (companyData) => {
    if (!companyData?.projects) {
      return {
        totalProjects: 0,
        totalSites: 0,
        totalPvCapacity: 0,
        totalSize: 0,
      };
    }

    return companyData.projects.reduce(
      (acc, project) => {
        const projectSitesCount = project.sites?.length || 0;

        const projectTotals = project.sites?.reduce(
          (siteAcc, site) => ({
            pvCapacity: siteAcc.pvCapacity + (site.pvCapacitykWp || 0),
            size: siteAcc.size + (site.capex || 0),
          }),
          { pvCapacity: 0, size: 0 },
        ) || { pvCapacity: 0, size: 0 };

        return {
          totalProjects: acc.totalProjects + 1,
          totalSites: acc.totalSites + projectSitesCount,
          totalPvCapacity: acc.totalPvCapacity + projectTotals.pvCapacity,
          totalSize: acc.totalSize + projectTotals.size,
        };
      },
      {
        totalProjects: 0,
        totalSites: 0,
        totalPvCapacity: 0,
        totalSize: 0,
      },
    );
  };

  // Calculate metrics once when company data changes
  const metrics = calculateMetrics(company);

  useEffect(() => {
    if (id) {
      // Check if user is company and trying to access different company
      if (userRole === "Company" && companyId && String(companyId) !== id) {
        return;
      }
      fetchCompanyById(id);
      fetchProjectsByCompanyId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userRole, companyId]);

  if (loading) {
    return <Loader />;
  }

  // Convert companyId to string for comparison
  if (userRole === "Company" && companyId && String(companyId) !== id) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Company Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
          Client: {company.companyName}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`mr-4 px-1 py-2 text-sm font-medium sm:text-base ${
                activeTab === "dashboard"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-grey hover:border-b-2 hover:border-grey hover:text-grey"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`mr-4 px-1 py-2 text-sm font-medium sm:text-base ${
                activeTab === "projects"
                  ? "border-b-2 border-lagoon text-lagoon"
                  : "text-grey hover:border-b-2 hover:border-grey hover:text-grey"
              }`}
            >
              All Projects
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "dashboard" ? (
          <Dashboard company={company} metrics={metrics} />
        ) : (
          <AllProjects
            projects={company.projects}
            companyName={company.companyName}
            companyId={id}
            metrics={metrics}
          />
        )}
      </div>
    </div>
  );
};

export default Company;
