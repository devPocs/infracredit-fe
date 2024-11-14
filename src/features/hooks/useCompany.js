import { useContext, useEffect } from "react";
import { CompanyContext } from "../context/CompanyContext";
import { getAllCompanies } from "../services/companyApi";
import { useLoading } from "../features/loader/hooks/useLoading";

export const useCompany = () => {
  const context = useContext(CompanyContext);
  const { setIsLoading } = useLoading();

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCompanies();
      context.setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
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

  return { ...context, fetchCompanies };
};