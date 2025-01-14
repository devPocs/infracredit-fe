import { createContext, useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState([]);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [site, setSite] = useState([]);
  const [sites, setSites] = useState([]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        setCompanies,
        company,
        setCompany,
        project,
        setProject,
        projects,
        setProjects,
        site,
        setSite,
        sites,
        setSites,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
