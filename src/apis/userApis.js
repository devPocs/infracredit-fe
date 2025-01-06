//const API_BASE_URL = `https://localhost:7140`;
const API_BASE_URL =
  "https://capexpipelineapi-g2g8gygxghcxc2hz.eastus-01.azurewebsites.net/";

export const createCompany = async (companyData) => {
  console.log(companyData);
  try {
    const response = await fetch(`${API_BASE_URL}/api/Company/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create company");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to create company");
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Project/add-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create project!");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to create project!");
  }
};
