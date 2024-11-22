import { useMemo } from "react";
import DataTable from "./../components/DataTable";
import { useNavigate } from "react-router-dom";

const GeneralPipeline = ({ pipelineData }) => {
  const navigate = useNavigate();

  // Transform data for the main company table
  const companyTableData = useMemo(
    () =>
      pipelineData?.map((company) => {
        const totals = company.projects.reduce(
          (acc, project) => ({
            totalPvCapacity:
              acc.totalPvCapacity + project.siteData.pvCapacitykWp,
            totalBatteryCapacity:
              acc.totalBatteryCapacity +
              project.siteData.batteryCapacity24MonthsKWh,
            totalMeters: acc.totalMeters + project.siteData.numberOfMeters,
            totalSize: acc.totalSize + project.siteData.size,
          }),
          {
            totalPvCapacity: 0,
            totalBatteryCapacity: 0,
            totalMeters: 0,
            totalSize: 0,
          },
        );

        return {
          companyName: company.companyName,
          companyId: company.companyId,
          projectCount: company.projectCount,
          totalPvCapacity: totals.totalPvCapacity,
          totalBatteryCapacity: totals.totalBatteryCapacity,
          totalMeters: totals.totalMeters,
          totalSize: totals.totalSize,
        };
      }) || [],
    [pipelineData],
  );

  const companyColumns = [
    {
      header: "Company Name",
      accessor: "companyName",
    },
    {
      header: "Total Projects",
      accessor: "projectCount",
    },
    {
      header: "Total PV Capacity (kWp)",
      accessor: "totalPvCapacity",
      cell: (value) => `${value.toLocaleString()} kWp`,
    },
    {
      header: "Total Battery Capacity (kWh)",
      accessor: "totalBatteryCapacity",
      cell: (value) => `${value.toLocaleString()} kWh`,
    },
    {
      header: "Total Meters",
      accessor: "totalMeters",
      cell: (value) => value.toLocaleString(),
    },
    {
      header: "Size (₦ Billion)",
      accessor: "totalSize",
      cell: (value) => `₦${(value / 1000000000).toFixed(2)}B`,
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/company/${row.company.id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          General Pipeline Overview
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of all companies and their projects
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Companies</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {pipelineData?.length || 0}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {pipelineData?.reduce(
              (acc, company) => acc + company.projectCount,
              0,
            ) || 0}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Total PV Capacity
          </h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {companyTableData
              .reduce((acc, company) => acc + company.totalPvCapacity, 0)
              .toLocaleString()}{" "}
            kWp
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Size</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            ₦
            {(
              companyTableData.reduce(
                (acc, company) => acc + company.totalSize,
                0,
              ) / 1000000000
            ).toFixed(2)}
            B
          </p>
        </div>
      </div>

      {/* Company Table */}
      <div className="rounded-lg bg-white shadow">
        <DataTable
          columns={companyColumns}
          data={companyTableData}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default GeneralPipeline;

// PropTypes
import PropTypes from "prop-types";

GeneralPipeline.propTypes = {
  pipelineData: PropTypes.arrayOf(
    PropTypes.shape({
      companyId: PropTypes.number.isRequired,
      companyName: PropTypes.string.isRequired,
      projectCount: PropTypes.number.isRequired,
      projects: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          projectCode: PropTypes.string.isRequired,
          siteCount: PropTypes.number.isRequired,
          siteData: PropTypes.shape({
            size: PropTypes.number.isRequired,
            pvCapacitykWp: PropTypes.number.isRequired,
            batteryCapacity24MonthsKWh: PropTypes.number.isRequired,
            numberOfMeters: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
};
