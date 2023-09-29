import React, { useState } from "react";
import { Usuario } from "../../../types";
import _ from "lodash";

import { BuscadorProyectos, ProjectsList } from "../../components";

interface DashboardCandidateProps {
  userData: Partial<Usuario>;
}

export const DashboardCandidate: React.FC<DashboardCandidateProps> = ({
  userData,
}) => {
  const [searchCriteria, setSearchCriteria] = useState<any>(null);

  const handleSearch = (newCriteria: any) => {
    if (!_.isEqual(newCriteria, searchCriteria)) {
      setSearchCriteria(newCriteria);
    }
  };
  const handleReset = () => {
    setSearchCriteria(null);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h3>Buscador de proyectos</h3>
          <BuscadorProyectos
            returnedSearchCriteria={handleSearch}
            handleReset={handleReset}
          />
        </div>
        <div className="col-md-8 ps-5">
          <h3>Lista de casos disponibles </h3>
          <ProjectsList
            searchCriteria={searchCriteria}
            preferences={userData?.preferences}
          />
        </div>
      </div>
    </div>
  );
};
