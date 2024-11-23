import { useMemo } from "react";
import DataTable from "./../components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGeneralPipeline } from "../features/generalPipeline/hooks/useGeneralPipeline";

const GeneralPipeline = ({ pipelineData }) => {
  const navigate = useNavigate();
  const { pipeline } = useGeneralPipeline();

  // Transform data for the main company table
  const companyTableData = useMemo(
    () =>
      pipeline?.map((company) => {
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
          Id: company.companyId,
          companyName: company.companyName,
          totalprojects: company.projectCount,
          totalPvCapacity: totals.totalPvCapacity,
          totalBatteryCapacity: totals.totalBatteryCapacity,
          totalMeters: totals.totalMeters,
          totalSize: totals.totalSize,
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
      cell: (value) => `₦${value}B`,
    },
  ];

  const handleRowClick = (row) => {
    console.log(row);
    navigate(`/company/${row.Id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          General Pipeline Overview
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Companies</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {pipeline?.length || 0}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {pipeline?.reduce(
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
            ₦{" "}
            {companyTableData.reduce(
              (acc, company) => acc + company.totalSize,
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
