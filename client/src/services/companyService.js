// ./services/companyService.js

const apiUrl = "http://localhost:3001/companies";

export const getCompanies = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return null;
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating company:", error);
  }
};
export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await fetch(`${apiUrl}/${companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating company:", error.message);
    return { error: "Error updating company" };
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const response = await fetch(`${apiUrl}/${companyId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting company:", error);
  }
};
