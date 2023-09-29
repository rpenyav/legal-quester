import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { SearchField } from "./SearchField";
import { Proyecto } from "../../../types";
import { anyadirIcon, eliminarGreyIcon, eliminarIcon } from "../../../assets";

//   habilidadesRequeridas: string[];

//   documentoAdjuntos?: string[];
//   tarifa?: number | string;
//   ?: string;

//   resultadosEsperados?: string;
//   ?: string[];

//   requisitosLegales?: string[];
//   cityOfProject?: string[];
//   typeOfCase: string[];

export const FormCreateProject = () => {
  const [nombre, setNombre] = useState<Proyecto | null>(null);
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [jurisdiccion, setJurisdiccion] = useState<Proyecto | null>(null);
  const [areaLegal, setAreaLegal] = useState<Proyecto | null>(null);
  const [cliente, setCliente] = useState<Proyecto | null>(null);
  const [prioridad, setPrioridad] = useState<Proyecto | null>(null);
  const [tarifa, setTarifa] = useState<Proyecto | null>(null);
  const [modalidadPago, setModalidadPago] = useState<Proyecto | null>(null);
  const [descripcion, setDescripcion] = useState<Proyecto | null>(null);

  const [currentEtapa, setCurrentEtapa] = useState("");
  const [etapasProyecto, setEtapasProyecto] = useState<string[]>([]);

  const handleSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    // Aquí es donde enviarás tus datos al servidor o realizarás alguna otra acción
    console.log(values);
    actions.setSubmitting(false);
  };

  const handleAddEtapa = () => {
    if (currentEtapa) {
      setEtapasProyecto([...etapasProyecto, currentEtapa]);
      setCurrentEtapa("");
    }
  };

  const handleRemoveEtapa = (indexToRemove: number) => {
    const newEtapasProyecto = etapasProyecto.filter(
      (_, index) => index !== indexToRemove
    );
    setEtapasProyecto(newEtapasProyecto);
  };

  return (
    <Formik
      initialValues={{ phone: "", fechaInicio: "", fechaFin: "" }}
      onSubmit={handleSubmit}
      // validate={tuFuncionDeValidacion} Si tienes un esquema de validación
    >
      {(formikProps) => (
        <Form>
          <div>
            <SearchField
              label="Introduzca el nombre o enunciado del proyecto"
              value={nombre}
              onChange={setNombre}
              type="date"
            />
          </div>

          <div className="row">
            <div className="col-md-3">
              <SearchField
                label="Fecha de inicio"
                value={fechaInicio}
                onChange={setFechaInicio}
                type="date"
              />
            </div>
            <div className="col-md-3">
              <SearchField
                label="Fecha de finalización"
                value={fechaFin}
                onChange={setFechaFin}
                type="date"
              />
            </div>
            <div className="col-md-3">
              <SearchField
                label="Prioridad"
                value={prioridad}
                onChange={setPrioridad}
                type="date"
              />
            </div>
            <div className="col-md-3">
              <SearchField
                label="Área legal"
                value={areaLegal}
                onChange={setAreaLegal}
                type="date"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <SearchField
                label="Cliente"
                value={cliente}
                onChange={setCliente}
                type="date"
              />
            </div>
            <div className="col-md-3">
              <SearchField
                label="Jurisdicción"
                value={jurisdiccion}
                onChange={setJurisdiccion}
                type="date"
              />
            </div>
            <div className="col-md-3">
              <SearchField
                label="Tarifa"
                value={tarifa}
                onChange={setTarifa}
                type="date"
              />
            </div>
            <div className="col-md-3">
              <SearchField
                label="Modalidad de pago"
                value={modalidadPago}
                onChange={setModalidadPago}
                type="date"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <SearchField
                label="Descripción principal del proyecto"
                value={descripcion}
                onChange={setDescripcion}
                type="date"
              />
            </div>
          </div>

          {/* //AQUI EMPIEZAN LOS ARRAYS PARA PUSHEAR */}

          <div className="row">
            <div className="col-md-12">
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Etapas del proyecto</h5>
                <div>
                  Pulse para crear una nueva etapa{" "}
                  <button
                    className="btn-icon ms-3"
                    type="button"
                    onClick={handleAddEtapa}
                  >
                    <img src={anyadirIcon} alt="añadir" className="icon-btn " />
                  </button>
                </div>
              </div>

              {etapasProyecto.map((etapa, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-start align-items-center"
                >
                  <SearchField
                    label={`Etapa ${index + 1}`}
                    value={etapa}
                    type="text"
                    readonly={true}
                    onChange={() => {}}
                  />
                  <button
                    className="btn-icon ms-3 mt-3"
                    type="button"
                    onClick={() => handleRemoveEtapa(index)}
                  >
                    <img
                      src={eliminarGreyIcon}
                      alt="quitar"
                      className="icon-btn "
                    />
                  </button>
                </div>
              ))}
              {/* Componente de entrada para la nueva etapa */}
              <SearchField
                label="Nueva etapa"
                value={currentEtapa}
                onChange={setCurrentEtapa}
                type="text"
              />
              <hr />
            </div>
          </div>

          {/* //AQUI TERMINAN LOS ARRAYS PARA PUSHEAR */}

          <Button type="submit" disabled={formikProps.isSubmitting}>
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};
