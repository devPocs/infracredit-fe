import { useMemo, useState } from "react";
import DataTable from "./../components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGeneralPipeline } from "../features/generalPipeline/hooks/useGeneralPipeline";

const GeneralPipeline = () => {
  const navigate = useNavigate();
  const { pipeline } = useGeneralPipeline();
  const [selectedDuration, setSelectedDuration] = useState("all");

  const companyTableData = useMemo(() => {
    if (selectedDuration === "all") {
      // Use your original calculation for "all"
      return (
        pipeline?.map((company) => {
          const companyTotals = company.projects.reduce(
            (projectAcc, project) => {
              const projectSitesCount = project.siteCount || 0;
              const projectData = project.siteData || {
                size: 0,
                pvCapacitykWp: 0,
                batteryCapacity24MonthsKWh: 0,
                numberOfMeters: 0,
              };

              return {
                totalCapex: projectAcc.totalCapex + (projectData.size || 0),
                totalPvCapacity:
                  projectAcc.totalPvCapacity + (projectData.pvCapacitykWp || 0),
                totalBatteryCapacity:
                  projectAcc.totalBatteryCapacity +
                  (projectData.batteryCapacity24MonthsKWh || 0),
                totalMeters:
                  projectAcc.totalMeters + (projectData.numberOfMeters || 0),
                totalSites: projectAcc.totalSites + projectSitesCount,
              };
            },
            {
              totalCapex: 0,
              totalPvCapacity: 0,
              totalBatteryCapacity: 0,
              totalMeters: 0,
              totalSites: 0,
            },
          );

          return {
            Id: company.companyId,
            companyName: company.companyName,
            totalProjects: company.projects?.length || 0,
            totalSites: companyTotals.totalSites,
            totalPvCapacity: companyTotals.totalPvCapacity,
            totalBatteryCapacity: companyTotals.totalBatteryCapacity,
            totalMeters: companyTotals.totalMeters,
            totalCapex: companyTotals.totalCapex,
          };
        }) || []
      );
    } else {
      // Filter for specific duration
      return (
        pipeline
          ?.map((company) => {
            // Only process companies that have sites with matching duration
            const filteredProjects = company.projects
              .map((project) => ({
                ...project,
                sites: project.sites?.filter(
                  (site) => site.months === parseInt(selectedDuration),
                ),
              }))
              .filter((project) => project.sites?.length > 0);

            if (filteredProjects.length === 0) return null;

            // Calculate totals for filtered projects
            const companyTotals = filteredProjects.reduce(
              (projectAcc, project) => ({
                totalCapex:
                  projectAcc.totalCapex +
                  project.sites.reduce(
                    (sum, site) => sum + (site.capex || 0),
                    0,
                  ),
                totalPvCapacity:
                  projectAcc.totalPvCapacity +
                  project.sites.reduce(
                    (sum, site) => sum + (site.pvCapacitykWp || 0),
                    0,
                  ),
                totalBatteryCapacity:
                  projectAcc.totalBatteryCapacity +
                  project.sites.reduce(
                    (sum, site) => sum + (site.batteryCapacity24MonthsKWh || 0),
                    0,
                  ),
                totalMeters:
                  projectAcc.totalMeters +
                  project.sites.reduce(
                    (sum, site) => sum + (site.numberOfMeters || 0),
                    0,
                  ),
                totalSites: projectAcc.totalSites + project.sites.length,
              }),
              {
                totalCapex: 0,
                totalPvCapacity: 0,
                totalBatteryCapacity: 0,
                totalMeters: 0,
                totalSites: 0,
              },
            );

            return {
              Id: company.id,
              companyName: company.companyName,
              totalProjects: filteredProjects.length,
              totalSites: companyTotals.totalSites,
              totalPvCapacity: companyTotals.totalPvCapacity,
              totalBatteryCapacity: companyTotals.totalBatteryCapacity,
              totalMeters: companyTotals.totalMeters,
              totalCapex: companyTotals.totalCapex,
            };
          })
          .filter(Boolean) || []
      );
    }
  }, [pipeline, selectedDuration]);
  const companyColumns = [
    {
      header: "Company Name",
      accessor: "companyName",
    },
    {
      header: "Total Projects",
      accessor: "totalProjects",
    },
    {
      header: "Total PV Capacity (kWp)",
      accessor: "totalPvCapacity",
      cell: (value) => value.toLocaleString(),
    },
    {
      header: "Total Battery Capacity (kWh)",
      accessor: "totalBatteryCapacity",
      cell: (value) => value.toLocaleString(),
    },
    {
      header: "Total Meters",
      accessor: "totalMeters",
      cell: (value) => value.toLocaleString(),
    },
    {
      header: "Capex (₦ Billion)",
      accessor: "totalCapex",
      cell: (value) => `₦${value}B`,
    },
  ];
  const handleRowClick = (row) => {
    navigate(`/company/${row.Id}`);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
          OEM Capex Pipeline Tracker
        </h1>

        {/* Duration Filter - Responsive */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700">Filter by duration:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDuration("all")}
              className={`px-3 py-1.5 text-sm transition-colors ${
                selectedDuration === "all"
                  ? "bg-lagoon text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {[12, 24, 36].map((months) => (
              <button
                key={months}
                onClick={() => setSelectedDuration(months.toString())}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  selectedDuration === months.toString()
                    ? "bg-lagoon text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {months} months
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards - Responsive Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-sunset p-4 shadow-lg">
          <h3 className="text-sm font-medium text-white/90">Total Companies</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            {pipeline?.length || 0}
          </p>
        </div>
        <div className="bg-lagoon p-4 shadow-lg">
          <h3 className="text-sm font-medium text-white/90">Total Projects</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            {companyTableData.reduce(
              (acc, company) => acc + company.totalProjects,
              0,
            )}
          </p>
        </div>
        <div className="bg-mint p-4 shadow-lg">
          <h3 className="text-sm font-medium text-white/90">
            Total PV Capacity
          </h3>
          <p className="mt-2 text-2xl font-bold text-white">
            {companyTableData
              .reduce((acc, company) => acc + company.totalPvCapacity, 0)
              .toLocaleString()}{" "}
            kWp
          </p>
        </div>
        <div className="bg-[#172b4d] p-4 shadow-lg">
          <h3 className="text-sm font-medium text-white/90">Total Capex</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            ₦
            {companyTableData
              .reduce((acc, company) => acc + company.totalCapex, 0)
              .toFixed(3)}
            B
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden bg-white shadow-lg">
        <div className="overflow-x-auto">
          <DataTable
            columns={companyColumns}
            data={companyTableData}
            onRowDoubleClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralPipeline;
