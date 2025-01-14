//const API_BASE_URL = "https://localhost:7140";
const API_BASE_URL =
  "https://capexpipelineapi-g2g8gygxghcxc2hz.eastus-01.azurewebsites.net/";

export const createCompany = async (formData) => {
  const payload = {
    companyName: formData.companyName,
    projectName: formData.projectName,
    companyContact: [],
  };

  const contactMap = {
    primaryContact: 1,
    secondaryContact: 2,
    tertiaryContact: 3,
  };

  for (const [contactType, data] of Object.entries(formData)) {
    if (contactType.includes("Contact") && data.firstName) {
      payload.companyContact.push({
        phoneNumber: data.phoneNumber,
        email: data.email,
        contactType: contactMap[contactType],
      });
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/Company/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create company");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};
export const addCompanyUserRole = async (userInfo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Users/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      throw new Error("Failed to add users' roles");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding users' roles:", error);
    throw error;
  }
};

export const getCompanyId = async (email) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Users/role-with-id?email=${email}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Company Id");
    }
    const data = await response.json();
    return data.companyId; // Return only the companyId
  } catch (error) {
    console.error("Error fetching company Id:", error);
    throw error;
  }
};

export const getAllCompanies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Company/companies`);
    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const getCompanyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Company/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Company");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
};

export const getProjectsByCompanyId = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Project/get-projects-by-company-id/${id}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Project:", error);
    throw error;
  }
};

export const createSite = async (projectCode, formData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Site/${projectCode}/createSite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create site");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating site:", error);
    throw error;
  }
};

export const getSites = async (projectCode) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Site/${projectCode}/sites`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Sites");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Sites:", error);
    throw error;
  }
};

export const updateSite = async (siteId, formData, projectId) => {
  console.log("updating site details...");
  try {
    console.log(siteId);
    const requestBody = {
      ...formData,
      Project: projectId, // Adding the Project field
    };

    const response = await fetch(`${API_BASE_URL}/api/Site/${siteId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update site");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating site:", error);
    throw error;
  }
};
