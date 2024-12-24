const API_BASE_URL = "https://localhost:7140";
// const API_BASE_URL =
//   "https://capexpipelineapi-g2g8gygxghcxc2hz.eastus-01.azurewebsites.net";

export const getCompanyGeneralPipeline = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/GeneralPipeline/company/${id}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch results!");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

export const getAllCompaniesGeneralPipeline = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/GeneralPipeline/allCompanies`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch results!");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};
