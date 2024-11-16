import { useState } from "react";
import DataTable from "./../components/DataTable";
import CreateCompany from "./../components/forms/CreateCompany";
import CreateProject from "./../components/forms/CreateProject";
// import { useCompany } from "./../features/hooks/useCompany";

const User = () => {
  // const { companies } = useCompany();
  const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const sampleCompanyData = [
    {
      id: 1,
      name: "Lekki Solar Power Co.",
      totalProjects: 15,
      totalSites: 25,
      pvCapacity: "150",
      capex: "2.5",
    },
    {
      id: 2,
      name: "Ikeja Renewable Energy Co.",
      totalProjects: 8,
      totalSites: 12,
      pvCapacity: "80",
      capex: "1.2",
    },
    {
      id: 3,
      name: "Power Merch Co.",
      totalProjects: 12,
      totalSites: 18,
      pvCapacity: "120",
      capex: "1.8",
    },
  ];

  const columns = [
    { header: "Company Name", accessor: "name" },
    { header: "Number of Projects", accessor: "totalProjects" },
    { header: "Number of Sites", accessor: "totalSites" },
    { header: "Total PV Capacity", accessor: "pvCapacity" },
    {
      header: "Total Capex (Billions)",
      accessor: "capex",
      cell: (value) => `N${value}B`,
    },
  ];

  const handleCreateCompanyOpen = () => setIsCreateCompanyOpen(true);
  const handleCreateCompanyClose = () => setIsCreateCompanyOpen(false);
  const handleCreateProjectOpen = () => setIsCreateProjectOpen(true);
  const handleCreateProjectClose = () => setIsCreateProjectOpen(false);

  const handleRowDoubleClick = (row) => {
    // Navigate to company page - implement based on your routing solution
    console.log("Navigating to company:", row.id);
    // Example: window.location.href = `/company/${row.id}`;
    // Or use your routing library's navigation method
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4 md:mb-6">
        <div className="text-lg font-bold text-navy sm:text-xl lg:text-2xl">
          User Dashboard
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={handleCreateProjectOpen}
            className="w-full bg-lagoon px-3 py-1.5 text-sm text-white transition-colors sm:w-auto sm:px-4 sm:py-2 sm:text-base"
          >
            Create Project
          </button>
          <button
            onClick={handleCreateCompanyOpen}
            className="w-full rounded bg-green-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-600 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
          >
            Create Company
          </button>
        </div>
      </div>

      {/* Company Overview Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="lg:text-md mb-3 text-base font-semibold sm:text-lg md:mb-4">
          Companies Overview
        </h2>
        <div className="grid gap-3 text-white sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <div className="rounded border bg-mint p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Total Companies</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {sampleCompanyData.length}
            </p>
          </div>
          <div className="rounded border bg-sunset p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Total Projects</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {sampleCompanyData.reduce(
                (sum, company) => sum + company.totalProjects,
                0,
              )}
            </p>
          </div>
          <div className="rounded border bg-lagoon p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Total Sites</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {sampleCompanyData.reduce(
                (sum, company) => sum + company.totalSites,
                0,
              )}
            </p>
          </div>
          <div className="rounded border bg-navy p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Total Capex(in billions)</h3>
            <p className="text-xl font-bold sm:text-2xl">
              N
              {sampleCompanyData.reduce(
                (sum, company) => sum + parseFloat(company.capex),
                0,
              )}
              B
            </p>
          </div>
        </div>
      </div>

      {/* All Companies Section */}
      <div>
        <h2 className="lg:text-md mb-3 text-base font-semibold sm:text-lg md:mb-4">
          All Companies
        </h2>
        <DataTable
          columns={columns}
          data={sampleCompanyData}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </div>

      {/* Modals */}
      {isCreateCompanyOpen && (
        <CreateCompany onClose={handleCreateCompanyClose} />
      )}
      {isCreateProjectOpen && (
        <CreateProject
          onClose={handleCreateProjectClose}
          onSubmit={(formData) => {
            console.log("Project Created:", formData);
            setIsCreateProjectOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default User;
