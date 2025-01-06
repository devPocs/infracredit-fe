import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import PropTypes from "prop-types";
import DataTable from "./../DataTable";
import CreateSite from "./../forms/CreateSite";
import SiteDetails from "./../company/SiteDetails";

const ProjectSites = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sites, projectName, companyName, projectCode, companyId } =
    location.state;

  const [isCreateSiteOpen, setIsCreateSiteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("all");

  // Transform and filter sites data for table display
  const tableData = sites
    .filter((site) => {
      if (selectedDuration === "all") return true;
      return site.months === parseInt(selectedDuration);
    })
    .map((site) => ({
      id: site.id,
      state: site.state,
      localGovernment: site.localGovernment,
      pvCapacitykWp: site.pvCapacitykWp,
      capex: site.capex,
      months: site.months,
      status: site.status,
    }));

  const columns = [
    { header: "State", accessor: "state" },
    { header: "LGA", accessor: "localGovernment" },
    { header: "PV Capacity (kWp)", accessor: "pvCapacitykWp" },
    {
      header: "Capex (in Billions(₦))",
      accessor: "capex",
      cell: (value) => `${value.toLocaleString()}`,
    },
    { header: "Duration (Months)", accessor: "months" },
    { header: "Status", accessor: "status" },
  ];

  const handleCreateSiteOpen = () => setIsCreateSiteOpen(true);
  const handleCreateSiteClose = () => setIsCreateSiteOpen(false);

  const handleRowDoubleClick = (tableRow) => {
    const fullSite = sites.find((s) => s.id === tableRow.id);
    setSelectedSite(fullSite);
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedSite(null);
  };

  return (
    <div className="relative min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4 md:mb-6">
        <div className="text-lg font-bold text-navy sm:text-xl lg:text-2xl">
          Sites
        </div>
        <button
          onClick={handleCreateSiteOpen}
          className="w-full rounded bg-lagoon px-3 py-1.5 text-sm text-white transition-colors hover:bg-lagoon sm:w-auto sm:px-4 sm:py-2 sm:text-base"
        >
          Add Site
        </button>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="rounded border p-3 text-sm shadow sm:p-4 sm:text-base">
            <span className="text-xl font-bold">Client:</span>{" "}
            <span className="font-semibold text-navy">{companyName}</span>
          </div>
          <div className="rounded border p-3 text-sm shadow sm:p-4 sm:text-base">
            <span className="text-xl font-bold">Project:</span>{" "}
            <span className="font-semibold text-navy">{projectName}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mb-4">
          <h2 className="text-base font-semibold sm:text-lg lg:text-xl">
            Project Sites
          </h2>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-medium">Filter by duration:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDuration("all")}
                className={`rounded px-3 py-1 ${
                  selectedDuration === "all"
                    ? "bg-lagoon text-white"
                    : "text-grey"
                }`}
              >
                All
              </button>
              {[12, 24, 36].map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedDuration(months.toString())}
                  className={`rounded px-3 py-1 ${
                    selectedDuration === months.toString()
                      ? "bg-lagoon text-white"
                      : "bg-gray-100 text-grey"
                  }`}
                >
                  {months} months
                </button>
              ))}
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={tableData}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </div>

      {/* Back button positioned at bottom left */}
      <div className="mb-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <BsArrowLeft className="mr-2 h-5 w-5" />
          Back to Projects
        </button>
      </div>

      {/* Modals */}
      {isCreateSiteOpen && (
        <CreateSite
          onClose={handleCreateSiteClose}
          companyName={companyName}
          projectName={projectName}
          projectCode={projectCode}
          companyId={companyId}
        />
      )}
      {isDetailsOpen && selectedSite && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 py-6">
            <SiteDetails
              site={selectedSite}
              onBack={handleDetailsClose}
              projectName={projectName}
              companyName={companyName}
              projectId={projectCode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

ProjectSites.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object),
  projectName: PropTypes.string,
  companyName: PropTypes.string,
  onBack: PropTypes.func,
};

export default ProjectSites;
