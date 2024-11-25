import DataTable from "./../DataTable";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AllProjects = ({ projects, companyName, companyId }) => {
  const calculateProjectMetrics = (projects) => {
    if (!projects || !Array.isArray(projects)) {
      return {
        totalSites: 0,
        totalPvCapacity: 0,
        totalCapex: 0,
      };
    }

    return projects.reduce(
      (acc, project) => {
        const sitesCount = project.sites?.length || 0;
        const projectPvCapacity =
          project.sites?.reduce(
            (total, site) => total + (site?.pvCapacitykWp || 0),
            0,
          ) || 0;

        const projectCapex =
          project.sites?.reduce(
            (total, site) => total + (site?.capex || 0),
            0,
          ) || 0;

        return {
          totalSites: acc.totalSites + sitesCount,
          totalPvCapacity: acc.totalPvCapacity + projectPvCapacity,
          totalCapex: acc.totalCapex + projectCapex,
        };
      },
      {
        totalSites: 0,
        totalPvCapacity: 0,
        totalCapex: 0,
      },
    );
  };
  const navigate = useNavigate();

  const projectMetrics = calculateProjectMetrics(projects);

  const tableData = projects.map((project) => ({
    projectCode: project.projectCode,
    projectName: project.name,
    numberOfSites: projectMetrics.totalSites,
    capex: projectMetrics.totalCapex,
    totalPVCapacity: projectMetrics.totalPvCapacity,
  }));

  const projectColumns = [
    {
      header: "Project Name",
      accessor: "projectName",
    },
    {
      header: "Number of Sites",
      accessor: "numberOfSites",
    },
    {
      header: "Size (₦ Billion)",
      accessor: "capex",
      cell: (value) => `₦${(value / 1000000000).toFixed(2)}B`,
    },
    {
      header: "Total PV Capacity (kWp)",
      accessor: "totalPVCapacity",
      cell: (value) => `${value} kWp`,
    },
  ];

  const handleRowDoubleClick = (tableRow) => {
    const fullProject = projects.find(
      (p) => p.projectCode === tableRow.projectCode,
    );

    navigate(`/company/project/${fullProject.projectCode}/sites`, {
      state: {
        sites: fullProject.sites,
        projectName: fullProject.name,
        companyName: companyName,
        projectCode: fullProject.projectCode,
        companyId: companyId,
      },
    });
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          All Projects
        </h2>
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <DataTable
            columns={projectColumns}
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
      sn: PropTypes.string,
      projectCode: PropTypes.string,
      projectId: PropTypes.string,
      name: PropTypes.string,
      numberOfSites: PropTypes.number,
      capex: PropTypes.number,
      totalPVCapacity: PropTypes.number,
      sitesData: PropTypes.array,
    }),
  ).isRequired,
  companyName: PropTypes.string,
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
