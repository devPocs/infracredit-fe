import { useState } from "react";
import DataTable from "./../components/DataTable";
import CreateCompany from "./../components/forms/CreateCompany";
import CreateProject from "./../components/forms/CreateProject";

const data = [
  { id: 1, name: "Company A", industry: "Finance", location: "New York" },
  {
    id: 2,
    name: "Company B",
    industry: "Technology",
    location: "San Francisco",
  },
];

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Industry", accessor: "industry" },
  { header: "Location", accessor: "location" },
];

const User = () => {
  const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const handleCreateCompanyOpen = () => setIsCreateCompanyOpen(true);
  const handleCreateCompanyClose = () => setIsCreateCompanyOpen(false);
  const handleCreateProjectOpen = () => setIsCreateProjectOpen(true);
  const handleCreateProjectClose = () => setIsCreateProjectOpen(false);

  const handleCreateProjectSubmit = (formData) => {
    console.log("Project Created:", formData);
    setIsCreateProjectOpen(false);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4 md:mb-6">
        <div className="text-lg font-bold sm:text-xl lg:text-2xl">
          Dashboard
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={handleCreateProjectOpen}
            className="w-full rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
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

      {/* Company Details Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          Company Details
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <div className="rounded border p-3 text-sm shadow sm:p-4 sm:text-base">
            Detail 1
          </div>
          <div className="rounded border p-3 text-sm shadow sm:p-4 sm:text-base">
            Detail 2
          </div>
          <div className="rounded border p-3 text-sm shadow sm:p-4 sm:text-base">
            Detail 3
          </div>
        </div>
      </div>

      {/* All Companies Section */}
      <div>
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          All Companies
        </h2>
        <DataTable
          columns={columns}
          data={data}
          onRowDoubleClick={(row) => console.log(row)}
        />
      </div>

      {/* Pop-up for Create Company Form */}
      {isCreateCompanyOpen && (
        <CreateCompany onClose={handleCreateCompanyClose} />
      )}

      {/* Pop-up for Create Project Form */}
      {isCreateProjectOpen && (
        <CreateProject
          onClose={handleCreateProjectClose}
          onSubmit={handleCreateProjectSubmit}
        />
      )}
    </div>
  );
};

export default User;
