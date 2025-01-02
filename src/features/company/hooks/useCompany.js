import { useContext, useEffect } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import {
  getAllCompanies,
  getCompanyById,
  getProjectsByCompanyId,
  getSites,
} from "../../../apis/companyApis";
import { useLoading } from "../../loader/hooks/useLoading";
import { createCompany, createProject } from "../../../apis/userApis";
import { createSite } from "../../../apis/companyApis";

export const useCompany = () => {
  const context = useContext(CompanyContext);
  const { setIsLoading } = useLoading();

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCompanies();
      context.setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProjectsByCompanyId = async () => {
    setIsLoading(true);
    try {
      const data = await getProjectsByCompanyId();
      context.setProject(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanyById = async (id) => {
    setIsLoading(true);
    try {
      const data = await getCompanyById(id);
      context.setCompany(data);
    } catch (error) {
      "Error fetching company:", error;
    } finally {
      setIsLoading(false);
    }
  };
  const addCompany = async (companyData) => {
    setIsLoading(true);
    try {
      const newCompany = await createCompany(companyData);
      context.setCompanies((prevCompanies) => [...prevCompanies, newCompany]);

      return newCompany;
    } catch (error) {
      console.error("Error adding company:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (projectData) => {
    setIsLoading(true);
    try {
      const newProject = await createProject(projectData);
      context.setProject((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addSite = async (projectCode, formData) => {
    setIsLoading(true);
    try {
      const newSite = await createSite(projectCode, formData);
      context.setSite((prevSites) => [...prevSites, newSite]);
    } catch (error) {
      console.error("Error adding site:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSites = async (projectCode) => {
    setIsLoading(true);
    try {
      const data = await getSites(projectCode);
      context.setSites(data);
    } catch (error) {
      "Error fetching company:", error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (!context) {
    throw new Error("useCompany must be used within CompanyProvider");
  }

  return {
    ...context,
    fetchCompanies,
    fetchCompanyById,
    addCompany,
    addProject,
    addSite,
    fetchSites,
    fetchProjectsByCompanyId,
  };
};
