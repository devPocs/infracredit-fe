import { createContext, useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const GeneralPipelineContext = createContext();

export const GeneralPipelineProvider = ({ children }) => {
  const [pipeline, setPipeline] = useState([]);

  return (
    <GeneralPipelineContext.Provider value={{ pipeline, setPipeline }}>
      {children}
    </GeneralPipelineContext.Provider>
  );
};

GeneralPipelineProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
