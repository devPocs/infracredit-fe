const API_BASE_URL = "https://localhost:7140";

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
    console.log("payload", payload);
    const response = await fetch(`${API_BASE_URL}/api/Company/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to create company");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const getAllCompanies = async () => {
  try {
    console.log("getting companies");
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
  console.log("id", id);
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
