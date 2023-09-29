import React from "react";
import { Usuario } from "../../../types";

interface DashboardCompanyProps {
  userData: Partial<Usuario>;
}

export const DashboardCompany: React.FC<DashboardCompanyProps> = ({
  userData,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h3>Resumen de casos publicados</h3>
        </div>
        <div className="col-md-6">
          <h3>Candidaturas pendientes</h3>
        </div>
      </div>
    </div>
  );
};
