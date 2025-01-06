import { useContext, useEffect } from "react";
import { GeneralPipelineContext } from "../contexts/GeneralPipelineContext";
import { getAllCompaniesGeneralPipeline } from "../../../apis/generalPipelineApis";
import { getAllCompaniesGeneralPipelineByMonth } from "../../../apis/generalPipelineApis";

import { useLoading } from "../../loader/hooks/useLoading";

export const useGeneralPipeline = () => {
  const context = useContext(GeneralPipelineContext);
  const { setIsLoading } = useLoading();

  const fetchPipeline = async (duration = "all") => {
    setIsLoading(true);
    try {
      let data;
      if (duration === "all") {
        data = await getAllCompaniesGeneralPipeline();
      } else {
        data = await getAllCompaniesGeneralPipelineByMonth(duration);
      }
      context.setPipeline(data);
    } catch (error) {
      console.error("Error fetching the pipeline:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPipeline(context.selectedDuration);
  }, [context.selectedDuration]);

  if (!context) {
    throw new Error("useGeneralPipeline must be used within GeneralProvider");
  }

  return {
    ...context,
    fetchPipeline,
  };
};
