import { useState } from "react";
import DataTable from "./../components/DataTable";
import CreateCompany from "./../components/forms/CreateCompany";
import CreateProject from "./../components/forms/CreateProject";
import { useNavigate } from "react-router-dom";
import { useCompany } from "./../features/company/hooks/useCompany";

const User = () => {
  const { companies } = useCompany();
  const navigate = useNavigate();

  const transformCompanyData = (companies) => {
    return companies.map((company) => {
      let totalCapex = 0;

      company.projects?.forEach((project) => {
        if (project.sites) {
          project.sites.forEach((site) => {
            totalCapex += Number(site.capex) || 0;
          });
        }
      });

      return {
        id: company.id,
        companyName: company.companyName,
        totalProjects: company.projects?.length || 0,
        totalSites: company.projects?.reduce(
          (total, project) => total + (project.sites?.length || 0),
          0,
        ),
        pvCapacity: company.projects?.reduce(
          (total, project) =>
            total +
            (project.sites?.reduce(
              (siteTotal, site) => siteTotal + (site?.pvCapacitykWp || 0),
              0,
            ) || 0),
          0,
        ),
        capex: totalCapex.toFixed(2),
      };
    });
  };

  const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const columns = [
    { header: "Id", accessor: "id" },
    { header: "Client Name", accessor: "companyName" },
    { header: "Number of Projects", accessor: "totalProjects" },
    { header: "Number of Sites", accessor: "totalSites" },
    { header: "Total PV Capacity (kWp)", accessor: "pvCapacity" },
    { header: "Capex (in Billions)", accessor: "capex" },
  ];

  const handleCreateCompanyOpen = () => setIsCreateCompanyOpen(true);
  const handleCreateCompanyClose = () => setIsCreateCompanyOpen(false);
  const handleCreateProjectOpen = () => setIsCreateProjectOpen(true);
  const handleCreateProjectClose = () => setIsCreateProjectOpen(false);

  const handleRowDoubleClick = (row) => {
    navigate(`/company/${row.id}`);
  };

  const handleCompaniesClick = () => {
    const companiesData = companies.map((company) => ({
      id: company.id,
      name: company.companyName,
      capex: company.capex,
      pvCapacity: company.pvCapacity,
    }));

    navigate("user/more-data", {
      state: {
        type: "companies",
        data: companiesData,
      },
    });
  };

  const handleProjectsClick = () => {
    const projectsData = companies.flatMap(
      (company) =>
        company.projects?.map((project) => ({
          projectName: project.name,
          numberOfSites: project.sites?.length || 0,
          capex:
            project.sites?.reduce(
              (total, site) => total + (site?.capex || 0),
              0,
            ) || 0,
          totalPVCapacity:
            project.sites?.reduce(
              (total, site) => total + (site?.pvCapacitykWp || 0),
              0,
            ) || 0,
        })) || [],
    );

    navigate("user/more-data", {
      state: {
        type: "projects",
        data: projectsData,
      },
    });
  };

  const handleSitesClick = () => {
    const sitesData = companies.flatMap(
      (company) =>
        company.projects?.flatMap(
          (project) =>
            project.sites?.map((site) => ({
              projectName: project.name,
              siteName: `${site.state} - ${site.localGovernment}`,
              capex: site.capex,
              batteryCapacity: site.batteryCapacity24MonthsKWh,
              numberOfMeters: site.numberOfMeters,
            })) || [],
        ) || [],
    );

    navigate("user/more-data", {
      state: {
        type: "sites",
        data: sitesData,
      },
    });
  };

  // Calculate total capex for overview section
  const totalCapex = companies.reduce((total, company) => {
    let companyCapex = 0;
    company.projects?.forEach((project) => {
      project.sites?.forEach((site) => {
        companyCapex += Number(site.capex) || 0;
      });
    });
    return total + companyCapex;
  }, 0);

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4 md:mb-6">
        <div className="text-lg font-bold text-navy sm:text-xl lg:text-2xl">
          Transactor Dashboard
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={handleCreateProjectOpen}
            className="w-full bg-lagoon px-3 py-1.5 text-sm text-white transition-colors sm:w-auto sm:px-4 sm:py-2 sm:text-base"
          >
            Add Project
          </button>
          <button
            onClick={handleCreateCompanyOpen}
            className="w-full rounded bg-green-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-600 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
          >
            Add Client
          </button>
        </div>
      </div>

      {/* Company Overview Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="lg:text-md mb-3 text-base font-semibold sm:text-lg md:mb-4">
          Clients Overview
        </h2>
        <div className="grid gap-3 text-white sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <div
            onClick={handleCompaniesClick}
            className="cursor-pointer rounded border bg-mint p-3 text-sm shadow hover:opacity-90 sm:p-4 sm:text-base"
          >
            <h3 className="mb-2 font-medium">Total Clients</h3>
            <p className="text-xl font-bold sm:text-2xl">{companies.length}</p>
          </div>
          <div
            onClick={handleProjectsClick}
            className="cursor-pointer rounded border bg-sunset p-3 text-sm shadow hover:opacity-90 sm:p-4 sm:text-base"
          >
            <h3 className="mb-2 font-medium">Total Projects</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {companies.reduce(
                (total, company) => total + (company.projects?.length || 0),
                0,
              )}
            </p>
          </div>
          <div
            onClick={handleSitesClick}
            className="cursor-pointer rounded border bg-lagoon p-3 text-sm shadow hover:opacity-90 sm:p-4 sm:text-base"
          >
            <h3 className="mb-2 font-medium">Total Sites</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {companies.reduce((total, company) => {
                const companySites =
                  company.projects?.reduce(
                    (projectTotal, project) =>
                      projectTotal + (project.sites?.length || 0),
                    0,
                  ) || 0;
                return total + companySites;
              }, 0)}
            </p>
          </div>
          <div className="rounded border bg-navy p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Total Capex (in Billions(₦))</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {totalCapex.toFixed(2)}
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
          data={transformCompanyData(companies)}
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
          companies={companies}
        />
      )}
    </div>
  );
};

export default User;
// const sampleCompanyData = [
//   {
//     id: 1,
//     name: "Lekki Solar Power Co.",
//     totalProjects: 15,
//     totalSites: 25,
//     pvCapacity: "150",
//     capex: "2.5",
//   },
//   {
//     id: 2,
//     name: "Ikeja Renewable Energy Co.",
//     totalProjects: 8,
//     totalSites: 12,
//     pvCapacity: "80",
//     capex: "1.2",
//   },
//   {
//     id: 3,
//     name: "Power Merch Co.",
//     totalProjects: 12,
//     totalSites: 18,
//     pvCapacity: "120",
//     capex: "1.8",
//   },
// ];
