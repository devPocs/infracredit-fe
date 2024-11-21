import { useContext } from "react";
import { GeneralPipelineContext } from "../features/generalPipeline/contexts/GeneralPipelineContext";
//import { useGeneralPipeline } from "../features/generalPipeline/hooks/useGeneralPipeline";

const GeneralPipeline = () => {
  const { pipeline } = useContext(GeneralPipelineContext);
  //const { fetchPipeline } = useGeneralPipeline();
  console.log(pipeline);
  return <div>This is the general pipeline page</div>;
};

export default GeneralPipeline;
