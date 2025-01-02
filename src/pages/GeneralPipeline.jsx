import { useMemo } from "react";
import DataTable from "./../components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGeneralPipeline } from "../features/generalPipeline/hooks/useGeneralPipeline";

const GeneralPipeline = () => {
  const navigate = useNavigate();
  const { pipeline } = useGeneralPipeline();

  const companyTableData = useMemo(
    () =>
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
          Id: company.id,
          companyName: company.companyName,
          totalProjects: company.projects?.length || 0,
          totalSites: companyTotals.totalSites,
          totalPvCapacity: companyTotals.totalPvCapacity,
          totalBatteryCapacity: companyTotals.totalBatteryCapacity,
          totalMeters: companyTotals.totalMeters,
          totalCapex: companyTotals.totalCapex,
        };
      }) || [],
    [pipeline],
  );
  const companyColumns = [
    {
      header: "Company Name",
      accessor: "companyName",
    },
    {
      header: "Total Projects",
      accessor: "totalProjects", // Changed from projectCount
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
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          OEM Capex Pipeline Tracker
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-sunset p-4 shadow">
          <h3 className="text-sm font-medium text-white">Total Companies</h3>
          <p className="mt-2 text-2xl font-semibold text-white">
            {pipeline?.length || 0}
          </p>
        </div>
        <div className="bg-lagoon p-4 shadow">
          <h3 className="text-sm font-medium text-white">Total Projects</h3>
          <p className="mt-2 text-2xl font-semibold text-white">
            {companyTableData.reduce(
              (acc, company) => acc + company.totalProjects,
              0,
            )}
          </p>
        </div>
        <div className="bg-mint p-4 shadow">
          <h3 className="text-sm font-medium text-white">Total PV Capacity</h3>
          <p className="mt-2 text-2xl font-semibold text-white">
            {companyTableData
              .reduce((acc, company) => acc + company.totalPvCapacity, 0)
              .toLocaleString()}{" "}
            kWp
          </p>
        </div>
        <div className="bg-[#172b4d] p-4 shadow">
          <h3 className="text-sm font-medium text-white">Total Size</h3>
          <p className="mt-2 text-2xl font-semibold text-white">
            ₦
            {companyTableData.reduce(
              (acc, company) => acc + company.totalCapex,
              0,
            )}
            B
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <DataTable
          columns={companyColumns}
          data={companyTableData}
          onRowDoubleClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default GeneralPipeline;
