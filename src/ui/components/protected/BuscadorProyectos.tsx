import React, { FC, useEffect, useState } from "react";
import { SearchField } from "./SearchField"; // Asegúrate de que la ruta sea correcta
import cities from "../../../infrastructure/cities";
import {
  legalAreas,
  caseTypes,
  jurisdictions,
} from "../../../infrastructure/legalConstants";
import { ButtonGlobal } from "../ButtonGlobal";

interface ProjectsListProps {
  returnedSearchCriteria: (searchCriteria: any) => void;
  handleReset: () => void;
}

export const BuscadorProyectos: FC<ProjectsListProps> = ({
  returnedSearchCriteria,
  handleReset,
}) => {
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaPublicacion, setFechaPublicacion] = useState<Date | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");
  const [areaLegal, setAreaLegal] = useState<string>("");
  const [jurisdiccion, setJurisdiccion] = useState<string>("");
  const [typeOfCase, setTypeOfCase] = useState<string>("");
  const [cityOfProject, setCityOfProject] = useState<string>("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [descripcionError, setDescripcionError] = useState<string>("");
  const [fechaPublicacionError, setFechaPublicacionError] =
    useState<string>("");

  useEffect(() => {
    // Validación para la descripción
    if (descripcion.length > 250) {
      setDescripcionError(
        "La descripción no puede tener más de 250 caracteres"
      );
    } else {
      setDescripcionError("");
    }

    // Validación para la fecha de publicación
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    if (fechaPublicacion && fechaPublicacion > ayer) {
      setFechaPublicacionError(
        "La fecha de publicación no puede ser posterior a ayer"
      );
    } else {
      setFechaPublicacionError("");
    }

    const isAnyFieldFilled = [
      fechaInicio,
      fechaPublicacion,
      descripcion,
      areaLegal,
      jurisdiccion,
      typeOfCase,
      cityOfProject,
    ].some((field) => field !== null && field !== "");

    setIsButtonDisabled(!isAnyFieldFilled);
  }, [
    fechaInicio,
    fechaPublicacion,
    descripcion,
    areaLegal,
    jurisdiccion,
    typeOfCase,
    cityOfProject,
  ]);

  const handleSearchClick = () => {
    const searchCriteria = {
      fechaInicio,
      fechaPublicacion,
      descripcion,
      areaLegal,
      jurisdiccion,
      typeOfCase,
      cityOfProject,
    };
    returnedSearchCriteria(searchCriteria);
  };

  const handleLocalReset = () => {
    //Restablecer
    setFechaInicio(null);
    setFechaPublicacion(null);
    setDescripcion("");
    setAreaLegal("");
    setJurisdiccion("");
    setTypeOfCase("");
    setCityOfProject("");

    handleReset();
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          {descripcionError && (
            <div className="alert alert-danger" role="alert">
              {descripcionError}
            </div>
          )}
          {fechaPublicacionError && (
            <div className="alert alert-danger" role="alert">
              {fechaPublicacionError}
            </div>
          )}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <SearchField
            label="Fecha de inicio"
            value={fechaInicio}
            onChange={setFechaInicio}
            type="date"
          />
        </div>
        <div className="col-md-6">
          <SearchField
            label="Fecha de publicación"
            value={fechaPublicacion}
            onChange={setFechaPublicacion}
            type="date"
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <SearchField
            label="Area Legal"
            value={areaLegal}
            onChange={setAreaLegal}
            type="select"
            options={legalAreas}
          />
        </div>
        <div className="col-md-6">
          <SearchField
            label="Jurisdicción"
            value={jurisdiccion}
            onChange={setJurisdiccion}
            type="select"
            options={jurisdictions}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <SearchField
            label="Tipo de Caso"
            value={typeOfCase}
            onChange={setTypeOfCase}
            type="select"
            options={caseTypes}
          />
        </div>
        <div className="col-md-6">
          <SearchField
            label="Ciudad"
            value={cityOfProject}
            onChange={setCityOfProject}
            type="select"
            options={cities}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <SearchField
            label="Descripción"
            type="textarea"
            value={descripcion}
            onChange={setDescripcion}
            rows={2}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-5 text-center">
          <ButtonGlobal bgColor="#41557f" onClick={handleLocalReset}>
            Reset
          </ButtonGlobal>{" "}
        </div>
        <div className="col-md-7 text-center">
          <ButtonGlobal
            disabled={
              isButtonDisabled || !!fechaPublicacionError || !!descripcionError
            }
            onClick={handleSearchClick}
          >
            Buscar
          </ButtonGlobal>
        </div>
      </div>
    </div>
  );
};
