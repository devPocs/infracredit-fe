import { useContext, useEffect } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import { getAllCompanies } from "../../../apis/companyApis";
import { useLoading } from "../../loader/hooks/useLoading";
import { createCompany, createProject } from "../../../apis/userApis";

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

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (!context) {
    throw new Error("useCompany must be used within CompanyProvider");
  }

  return { ...context, fetchCompanies, addCompany, addProject };
};
