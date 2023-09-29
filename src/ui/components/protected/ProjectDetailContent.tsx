import React, { FC } from "react";
import { Proyecto } from "../../../types";
import {
  toDateLong,
  toDateSlashFullYear,
} from "../../../helpers/dateConverters";
import BadgeCustom from "../BadgeCustom";

interface PropsDetail {
  project: Proyecto;
}

//   "areaLegal": ["Derecho de Familia", "Delitos"],
//   "cityOfProject": ["Islas Balears", "Barcelona"],
//   "typeOfCase": ["penal", "laboral"],
//   "estatus": "En Proceso",
//   "prioridad": "Media",
//   "documentoAdjuntos": ["help_desk_cambridgeshire.h263", "rupee_wooden.ics"],
//   "tarifa": "53.00",
//   "modalidadPago": "domiciliación bancaria",
//   "jurisdiccion": "Jurisdicción Penal",
//   "requisitosLegales": ["Maxime aperiam quod modi rerum enim.", "Nisi voluptatum repudiandae delectus velit eius suscipit."]
// }

export const ProjectDetailContent: FC<PropsDetail> = ({ project }) => {
  return (
    project && (
      <>
        <div>
          <h1>{project.nombre}</h1>
        </div>
        <div>
          <h6>Publicado el: {toDateLong(project.fechaPublicacion)}</h6>
        </div>
        <div>
          <strong>Cliente: {project.cliente}</strong>
        </div>

        <div className="d-flex justify-content-between">
          <p className="label-date">
            Fecha de inicio prevista: {toDateSlashFullYear(project.fechaInicio)}
          </p>
          <p className="label-date">
            Fecha de finalización estimada:{" "}
            {toDateSlashFullYear(project.fechaFin!)}
          </p>
        </div>

        <div className="description">
          <div className="row mb-4">
            <div className="col-md-12">
              <h5>Descripción</h5>
              {project.descripcion}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <h5>Habilidades requeridas</h5>
              {project.habilidadesRequeridas.map(
                (habilidad: string, index: number) => (
                  <BadgeCustom
                    key={index}
                    background="#6e0d2e"
                    fontSize="14px"
                    padding="6px 15px 6px 15px"
                  >
                    {habilidad}
                  </BadgeCustom>
                )
              )}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <h5>Resultados esperados</h5>
              {project.resultadosEsperados}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <h5>Etapas del proyecto</h5>
              {project.etapasProyecto &&
                project.etapasProyecto.map((etapa: string, index: number) => (
                  <div key={index}>{etapa}</div>
                ))}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <h5>Requisitos legales</h5>
              {project.requisitosLegales &&
                project.requisitosLegales.map(
                  (requisito: string, index: number) => (
                    <div key={index}>{requisito}</div>
                  )
                )}
            </div>
          </div>
        </div>
      </>
    )
  );
};
