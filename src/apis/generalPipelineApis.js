const API_BASE_URL = "https://localhost:7140";

export const getCompanyGeneralPipeline = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/GeneralPipeline/company/${id}`,
    );
    if (!response.ok) {
      console.log(response);
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
    console.log("getting companies pipeline...");
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
