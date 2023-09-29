import { FC } from "react";
import { Proyecto } from "../../../types";
import useOwner from "../../../app/state/hooks/useOwner";

interface PropsDetailActions {
  project: Proyecto;
}

export const ProjectDetailActions: FC<PropsDetailActions> = ({ project }) => {
  const {
    data: ownerData,
    isLoading,
    isError,
    error,
  } = useOwner(project.owner);

  if (isError) return <div>Error: {error!.message}</div>;

  return (
    project && (
      <>
        <div>
          <ul>
            <li>{project.areaLegal}</li>
            <li>
              {project.cityOfProject &&
                project.cityOfProject.map(
                  (ciudades: string, index: number, arr: string[]) => (
                    <span key={index}>
                      {ciudades}
                      {index < arr.length - 1 && ", "}
                    </span>
                  )
                )}
            </li>

            <li>
              {project.typeOfCase &&
                project.typeOfCase.map(
                  (typeofcase: string, index: number, arr: string[]) => (
                    <span key={index}>
                      {typeofcase}
                      {index < arr.length - 1 && ", "}
                    </span>
                  )
                )}
            </li>
            <li>Status: {project.estatus}</li>
            <li>Prioridad: {project.prioridad}</li>
            <li>Jurisdiccion: {project.jurisdiccion}</li>
            <li>Tarifa: {project.tarifa}€/hora</li>
            <li>Modalidad del pago: {project.modalidadPago}</li>
          </ul>
          <hr />
          <h5>Documentos adjuntos</h5>
          {project.documentoAdjuntos &&
            project.documentoAdjuntos.map(
              (documento: string, index: number, arr: string[]) => (
                <span key={index}>
                  {documento}
                  {index < arr.length - 1 && ", "}
                </span>
              )
            )}
          <hr />
          <h5>Promueve</h5>

          <div className="row mt-3">
            <div className="col-3">
              {ownerData && ownerData!.profileImage ? (
                <div>
                  <img
                    src={ownerData!.profileImage}
                    alt={ownerData!.companyName}
                    className="logo-company"
                  />
                </div>
              ) : null}
            </div>
            <div className="col-9">
              <h4>{ownerData?.companyName}</h4>
              <p>{ownerData?.email}</p>

              {ownerData?.socialLinks &&
                ownerData.socialLinks.map(
                  (social: string, index: number, arr: string[]) => (
                    <p className="m-0 p-0" key={index}>
                      {social}
                    </p>
                  )
                )}
            </div>
          </div>
        </div>
      </>
    )
  );
};
