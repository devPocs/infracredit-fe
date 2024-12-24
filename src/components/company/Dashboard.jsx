import PropTypes from "prop-types";
const Dashboard = ({ company }) => {
  const companyContacts = company?.companyContacts || [];

  const calculateSiteMetrics = (company) => {
    if (!company || !company.projects)
      return { totalSites: 0, activeSites: 0, inactiveSites: 0 };
    const totalSites = company.projects.reduce((total, project) => {
      return total + (project.sites?.length || 0);
    }, 0);
    const { activeSites, inactiveSites } = company.projects.reduce(
      (acc, project) => {
        const activeCount =
          project.sites?.filter((site) => site.status === "Active").length || 0;
        const inactiveCount =
          project.sites?.filter((site) => site.status === "Inactive").length ||
          0;
        return {
          activeSites: acc.activeSites + activeCount,
          inactiveSites: acc.inactiveSites + inactiveCount,
        };
      },
      { activeSites: 0, inactiveSites: 0 },
    );
    return {
      totalSites,
      activeSites,
      inactiveSites,
    };
  };

  const siteMetrics = calculateSiteMetrics(company);
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          Sites Metrics
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <div className="border bg-mint p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium text-white">Total Sites</h3>
            <p className="text-xl font-bold text-white sm:text-2xl">
              {siteMetrics.totalSites}
            </p>
          </div>
          <div className="bg-sunset p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium text-white">Active Sites</h3>
            <p className="text-xl font-bold text-white sm:text-2xl">
              {siteMetrics.activeSites}
            </p>
          </div>
          <div className="bg-lagoon p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium text-white">Inactive Sites</h3>
            <p className="text-xl font-bold text-white sm:text-2xl">
              {siteMetrics.inactiveSites}
            </p>
          </div>
        </div>
      </div>
      {/* Site Distribution Chart */}
      {/* <div className="mb-6 md:mb-8"> */}
      {/* <div className="rounded-lg border bg-white p-4"> */}
      {/* <div className="mx-auto aspect-[16/9] w-full max-w-2xl"> */}

      {/* <div className="flex h-full items-center justify-center rounded-lg bg-gray-50"> */}
      {/* <div className="text-center"> */}
      {/* <div className="mb-2 text-sm font-medium text-gray-500"> */}
      {/* Site Distribution */}
      {/* </div> */}
      {/* <div className="flex justify-center gap-4 text-xs sm:text-sm"> */}
      {/* <span className="flex items-center gap-1"> */}
      {/* <span className="h-3 w-3 rounded-full bg-blue-500"></span> */}
      {/* <span>Active Sites (65%)</span> */}
      {/* </span> */}
      {/* <span className="flex items-center gap-1"> */}
      {/* <span className="h-3 w-3 rounded-full bg-gray-300"></span> */}
      {/* <span>Inactive Sites (35%)</span> */}
      {/* </span> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* Company Contacts */}
      <div>
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          Client Contact
        </h2>
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3 sm:text-sm">
                    Contact Type
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3 sm:text-sm">
                    First Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3 sm:text-sm">
                    Last Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3 sm:text-sm">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3 sm:text-sm">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {companyContacts.map((contact) => {
                  // Dummy names mapping based on contact type
                  const dummyNames = {
                    Primary: { firstName: "Matty", lastName: "Barnes" },
                    Secondary: { firstName: "Olamide", lastName: "Haastrup" },
                    Tertiary: { firstName: "Naomi", lastName: "Eric" },
                  };

                  const currentDummyName = dummyNames[contact.contactType] || {
                    firstName: "Unknown",
                    lastName: "User",
                  };

                  return (
                    <tr key={contact.id}>
                      <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                        {contact.contactType}
                      </td>
                      <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                        {contact.firstName || currentDummyName.firstName}
                      </td>
                      <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                        {contact.lastName || currentDummyName.lastName}
                      </td>
                      <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                        {contact.email}
                      </td>
                      <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                        {contact.phoneNumber}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
Dashboard.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
    companyName: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sites: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            status: PropTypes.string,
          }),
        ),
      }),
    ),
    companyContacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        contactType: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default Dashboard;
