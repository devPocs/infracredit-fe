import { useContext, useEffect } from "react";
import { GeneralPipelineContext } from "../contexts/GeneralPipelineContext";
import { getAllCompaniesGenralPipeline} from "../../../apis/generalPipelineApis";
import { useLoading } from "../../loader/hooks/useLoading";

export const useGeneralPipeline = () => {
  const context = useContext(GeneralPipelineContext);
  const { setIsLoading } = useLoading();

  const fetchPipeline = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCompaniesGenralPipeline();
      context.setPipline(data);
    } catch (error) {
      console.error('Error the pipeline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPipeline();
  }, []);

  if (!context) {
    throw new Error("useGeneralPipeline must be used within GeneralProvider");
  }

  return { ...context, fetchPipeline };
};