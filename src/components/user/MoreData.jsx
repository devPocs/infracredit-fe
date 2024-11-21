import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import DataTable from "./../DataTable";

const MoreData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, data } = location.state;

  // Different column configurations based on type
  const getColumns = () => {
    switch (type) {
      case "companies":
        return [
          { header: "Company Name", accessor: "name" },
          {
            header: "Size (₦ Billion)",
            accessor: "capex",
            cell: (value) => `₦${value}B`,
          },
          {
            header: "PV Capacity (kWp)",
            accessor: "pvCapacity",
            cell: (value) => `${value} kWp`,
          },
          { header: "Number of Meters", accessor: "numberOfMeters" },
        ];
      case "projects":
        return [
          { header: "S/N", accessor: "sn" },
          { header: "Project Name", accessor: "projectName" },
          { header: "Number of Sites", accessor: "numberOfSites" },
          {
            header: "Size (₦ Billion)",
            accessor: "capex",
            cell: (value) => `₦${(value / 1000000000).toFixed(2)}B`,
          },
          {
            header: "Total PV Capacity",
            accessor: "totalPVCapacity",
            cell: (value) => `${value} kWp`,
          },
        ];
      case "sites":
        return [
          { header: "Project Name", accessor: "projectName" },
          { header: "Site Name", accessor: "siteName" },
          {
            header: "Size (₦ Billion)",
            accessor: "capex",
            cell: (value) => `₦${(value / 1000000000).toFixed(2)}B`,
          },
          {
            header: "Battery Capacity",
            accessor: "batteryCapacity",
            cell: (value) => `${value} kWh`,
          },
          { header: "Number of Meters", accessor: "numberOfMeters" },
        ];
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (type) {
      case "companies":
        return "All Companies Details";
      case "projects":
        return "All Projects Details";
      case "sites":
        return "All Sites Details";
      default:
        return "Details";
    }
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <BsArrowLeft className="mr-2 h-5 w-5" />
            Back
          </button>
        </div>
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          {getTitle()}
        </h2>
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <DataTable
            columns={getColumns()}
            data={data}
            onRowDoubleClick={(row) => console.log(row)}
          />
        </div>
      </div>
    </div>
  );
};

export default MoreData;
