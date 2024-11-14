import DataTable from "./../DataTable";
const AllProjects = () => {
  // Dummy data for projects
  const projectsData = [
    {
      id: "PRJ001",
      name: "Site Renovation Phase 1",
      location: "New York",
      startDate: "2024-01-15",
      status: "Active",
      manager: "John Doe",
    },
    {
      id: "PRJ002",
      name: "Equipment Upgrade",
      location: "Los Angeles",
      startDate: "2024-02-01",
      status: "Planning",
      manager: "Jane Smith",
    },
    {
      id: "PRJ003",
      name: "Maintenance Contract A",
      location: "Chicago",
      startDate: "2024-03-15",
      status: "On Hold",
      manager: "Mike Johnson",
    },
  ];

  const projectColumns = [
    { header: "Project ID", accessor: "id" },
    { header: "Project Name", accessor: "name" },
    { header: "Location", accessor: "location" },
    { header: "Start Date", accessor: "startDate" },
    { header: "Status", accessor: "status" },
    { header: "Project Manager", accessor: "manager" },
  ];

  return (
    <div>
      <DataTable
        columns={projectColumns}
        data={projectsData}
        onRowDoubleClick={(row) => console.log(row)}
      />
    </div>
  );
};

export default AllProjects;
