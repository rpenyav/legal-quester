import React from "react";
import { Usuario } from "../../../types";

interface DashboardCandidateProps {
  userData: Partial<Usuario>;
}

export const DashboardCandidate: React.FC<DashboardCandidateProps> = ({
  userData,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h3>Buscar Casos</h3>
        </div>
        <div className="col-md-8">
          <h3>Lista de casos disponibles </h3>
        </div>
      </div>
    </div>
  );
};
