import DataTable from "./../DataTable";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AllProjects = ({ projects, companyName, companyId, metrics }) => {
  const navigate = useNavigate();

  const tableData = projects.map((project) => ({
    projectCode: project.projectCode,
    projectName: project.name,
    numberOfSites: project.sites?.length || 0,
    capex:
      project.sites?.reduce((total, site) => total + (site?.capex || 0), 0) ||
      0,
    totalPVCapacity:
      project.sites?.reduce(
        (total, site) => total + (site?.pvCapacitykWp || 0),
        0,
      ) || 0,
  }));

  const columns = [
    { header: "Project Name", accessor: "projectName" },
    { header: "Number of Sites", accessor: "numberOfSites" },
    {
      header: "Capex (in Billions)",
      accessor: "capex",
      cell: (value) => `${value}`,
    },
    {
      header: "Total PV Capacity (kWp)",
      accessor: "totalPVCapacity",
      cell: (value) => `${value}`,
    },
  ];

  const handleRowDoubleClick = (tableRow) => {
    const fullProject = projects.find(
      (p) => p.projectCode === tableRow.projectCode,
    );

    navigate(`/company/project/${fullProject.projectCode}/sites`, {
      state: {
        sites: fullProject.sites || [],
        projectName: fullProject.name,
        companyName: companyName,
        projectCode: fullProject.projectCode,
        companyId: companyId,
      },
    });
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
        <div className="border bg-mint p-3 text-sm shadow sm:p-4 sm:text-base">
          <h3 className="mb-2 font-medium text-white">Total Projects</h3>
          <p className="text-xl font-bold text-white sm:text-2xl">
            {metrics.totalProjects}
          </p>
        </div>
        <div className="border bg-lagoon p-3 text-sm shadow sm:p-4 sm:text-base">
          <h3 className="mb-2 font-medium text-white">Total Projects</h3>
          <p className="text-xl font-bold text-white sm:text-2xl">
            {metrics.totalSites}
          </p>
        </div>
      </div>
      <div className="mb-6 md:mb-8">
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          All Projects
        </h2>
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <DataTable
            columns={columns}
            data={tableData}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </div>
      </div>
    </div>
  );
};

AllProjects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      projectCode: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sites: PropTypes.arrayOf(
        PropTypes.shape({
          capex: PropTypes.number,
          pvCapacitykWp: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  companyName: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired, // Changed to string since it comes from URL params
  metrics: PropTypes.shape({
    totalProjects: PropTypes.number.isRequired,
    totalSites: PropTypes.number.isRequired,
    totalPvCapacity: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
  }).isRequired,
};

export default AllProjects;

// const projectsData = [
//   {
//     sn: "1",
//     projectId: "PRJ001",
//     projectName: "Epe Solar Power Installation",
//     numberOfSites: 3,
//     capex: 75000000,
//     totalPVCapacity: 450,
//     sitesData: [
//       {
//         id: 1,
//         state: "Lagos",
//         localGovernment: "Ikeja",
//         pvCapacitykWp: 150,
//         capex: 25000000,
//         months: 24,
//         status: "Active",
//         sector: "Commercial",
//         batteryCapacity24MonthsKWh: 200,
//         pvPreferredBrand: "SunPower",
//         batteryPreferredBrand: "Tesla",
//         inverterBrand: "SMA",
//         numberOfMeters: 5,
//         meterBrand: "Schneider",
//         cableSupplierOrOEM: "ABB",
//         cable16mmService: 100,
//         cable25mmHouseWiring: 200,
//         cable70mmAAC: 150,
//         cable50mmAAC: 100,
//         cable16mmRecline: 75,
//         cable100mmAAC: 50,
//         cable90mmAAC: 40,
//         cable35mmBattery: 60,
//         cable10mmSolar: 80,
//         cable6mmSolar: 90,
//         cable120mmACC: 30,
//       },
//       {
//         id: 2,
//         state: "Ogun",
//         localGovernment: "Abeokuta",
//         pvCapacitykWp: 200,
//         capex: 35000000,
//         months: 36,
//         status: "Inactive",
//         sector: "Industrial",
//         batteryCapacity24MonthsKWh: 300,
//         pvPreferredBrand: "LG",
//         batteryPreferredBrand: "LG",
//         inverterBrand: "Siemens",
//         numberOfMeters: 8,
//         meterBrand: "GE",
//         cableSupplierOrOEM: "Siemens",
//         cable16mmService: 150,
//         cable25mmHouseWiring: 250,
//         cable70mmAAC: 180,
//         cable50mmAAC: 120,
//         cable16mmRecline: 85,
//         cable100mmAAC: 60,
//         cable90mmAAC: 45,
//         cable35mmBattery: 70,
//         cable10mmSolar: 90,
//         cable6mmSolar: 100,
//         cable120mmACC: 40,
//       },
//       {
//         id: 3,
//         state: "Rivers",
//         localGovernment: "Port Harcourt",
//         pvCapacitykWp: 100,
//         capex: 15000000,
//         months: 12,
//         status: "Active",
//         sector: "Residential",
//         batteryCapacity24MonthsKWh: 150,
//         pvPreferredBrand: "Canadian Solar",
//         batteryPreferredBrand: "PowerB",
//         inverterBrand: "Huawei",
//         numberOfMeters: 3,
//         meterBrand: "ABB",
//         cableSupplierOrOEM: "Nexans",
//         cable16mmService: 80,
//         cable25mmHouseWiring: 150,
//         cable70mmAAC: 120,
//         cable50mmAAC: 90,
//         cable16mmRecline: 65,
//         cable100mmAAC: 40,
//         cable90mmAAC: 35,
//         cable35mmBattery: 50,
//         cable10mmSolar: 70,
//         cable6mmSolar: 80,
//         cable120mmACC: 25,
//       },
//     ],
//   },
// ];
