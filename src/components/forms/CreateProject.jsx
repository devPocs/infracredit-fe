import { useState } from "react";
import PropTypes from "prop-types";
import { useCompany } from "../../features/company/hooks/useCompany";
import { toast } from "react-toastify";
import { useLoading } from "../../features/loader/hooks/useLoading";

const CreateProject = ({ onClose, companies }) => {
  const { setIsLoading } = useLoading();
  const [selectedCompany, setSelectedCompany] = useState("");

  const { addProject } = useCompany();
  const [projectName, setProjectName] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const projectData = { name: projectName, companyId: selectedCompany };
    setIsLoading(true);

    try {
      await addProject(projectData);
      toast.success("Project added successfully!");

      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to add project!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-2 sm:p-4">
      <div className="xs:max-w-xs relative w-full max-w-[280px] rounded-lg bg-white p-3 shadow-lg sm:max-w-md sm:p-4 md:p-6">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center text-2xl text-gray-500"
        >
          ×
        </button>

        <h2 className="mb-4 text-center text-base font-semibold sm:mb-6 sm:text-lg md:text-xl">
          Create Project
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs font-medium text-gray-700 sm:text-sm">
              Company
            </label>
            <select
              className="w-full rounded-md border px-2.5 py-1.5 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2 sm:text-sm"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a company
              </option>
              {/* eslint-disable-next-line react/prop-types */}
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs font-medium text-gray-700 sm:text-sm">
              Project Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border px-2.5 py-1.5 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2 sm:text-sm"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-1.5 text-xs text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:px-6 sm:py-2 sm:text-sm md:text-base"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateProject.propTypes = {
  onClose: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
};

export default CreateProject;
