const Dashboard = () => {
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          Site Details
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium text-gray-600">Total Sites</h3>
            <p className="text-xl font-bold text-gray-800 sm:text-2xl">125</p>
          </div>
          <div className="rounded-lg border bg-white p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium text-gray-600">Active Sites</h3>
            <p className="text-xl font-bold text-gray-800 sm:text-2xl">98</p>
          </div>
          <div className="rounded-lg border bg-white p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium text-gray-600">Inactive Sites</h3>
            <p className="text-xl font-bold text-gray-800 sm:text-2xl">27</p>
          </div>
        </div>
      </div>

      {/* Site Distribution Chart */}
      <div className="mb-6 md:mb-8">
        <div className="rounded-lg border bg-white p-4">
          <div className="mx-auto aspect-[16/9] w-full max-w-2xl">
            {/* You can replace this with an actual chart component */}
            <div className="flex h-full items-center justify-center rounded-lg bg-gray-50">
              <div className="text-center">
                <div className="mb-2 text-sm font-medium text-gray-500">
                  Site Distribution
                </div>
                <div className="flex justify-center gap-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                    <span>Active Sites (65%)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                    <span>Inactive Sites (35%)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Contacts */}
      <div>
        <h2 className="mb-3 text-base font-semibold sm:text-lg md:mb-4 lg:text-xl">
          Company Contact
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
                <tr>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    Primary
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    John
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    Doe
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    john@example.com
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    +1 234-567-8900
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    Secondary
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    Jane
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    Smith
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    jane@example.com
                  </td>
                  <td className="px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                    +1 234-567-8901
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
