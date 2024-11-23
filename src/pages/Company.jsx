import { useState, useEffect } from "react";
import Dashboard from "./../components/company/Dashboard";
import AllProjects from "./../components/company/AllProjects";
import { useCompany } from "./../features/company/hooks/useCompany";
import { useParams } from "react-router-dom";

const Company = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { company, fetchCompanyById, fetchProjectsByCompanyId } = useCompany();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCompanyById(id);
      fetchProjectsByCompanyId(id);
    }
  }, [id]);

  if (!company) {
    return;
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Company Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
          Company Name: {company.companyName}
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
          <Dashboard company={company} />
        ) : (
          <AllProjects
            projects={company.projects}
            companyName={company.companyName}
          />
        )}
      </div>
    </div>
  );
};

export default Company;
