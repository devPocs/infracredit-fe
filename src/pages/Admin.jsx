import { useState } from "react";
import DataTable from "../components/DataTable";
import CreateUser from "../components/forms/CreateUser";

const Admin = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const columns = [
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
  ];

  const handleCreateUserOpen = () => setIsCreateUserOpen(true);
  const handleCreateUserClose = () => setIsCreateUserOpen(false);

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4 md:mb-6">
        <div className="text-lg font-bold text-navy sm:text-xl lg:text-2xl">
          Admin Dashboard
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={handleCreateUserOpen}
            className="w-full rounded bg-green-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-600 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
          >
            Add Clie
          </button>
        </div>
      </div>
      <div className="mb-4 border-b border-gray-200"></div>

      {/* Overview Section
      <div className="mb-6 md:mb-8">
        <h2 className="lg:text-md mb-3 text-base font-semibold sm:text-lg md:mb-4">
          Users Overview
        </h2>
        <div className="grid gap-3 text-white sm:grid-cols-3 sm:gap-4">
          <div className="rounded border bg-mint p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Total Users</h3>
            <p className="text-xl font-bold sm:text-2xl">{users.length}</p>
          </div>
          <div className="rounded border bg-sunset p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Active Users</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {users.filter((user) => user.status === "Active").length}
            </p>
          </div>
          <div className="rounded border bg-lagoon p-3 text-sm shadow sm:p-4 sm:text-base">
            <h3 className="mb-2 font-medium">Pending Users</h3>
            <p className="text-xl font-bold sm:text-2xl">
              {users.filter((user) => user.status === "Pending").length}
            </p>
          </div>
        </div>
      </div> */}

      {/* Users Table Section */}
      <div>
        <h2 className="lg:text-md mb-3 text-base font-semibold sm:text-lg md:mb-4">
          All Users
        </h2>
        <DataTable columns={columns} data={users} />
      </div>

      {/* Modal */}
      {isCreateUserOpen && (
        <CreateUser
          onClose={handleCreateUserClose}
          onUserAdded={() => {
            // Refresh users list
            handleCreateUserClose();
          }}
        />
      )}
    </div>
  );
};

export default Admin;
