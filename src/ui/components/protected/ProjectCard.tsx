import React, { FC } from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { Proyecto } from "../../../types";
import { styled } from "styled-components";
import useOwner from "../../../app/state/hooks/useOwner";
import { heart, heartOutlined, shareIcon } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { formatProjectName } from "../../../helpers/formatUrl";

interface ProjectsCardProps {
  project: Proyecto;
}

export const ProjectCard: FC<ProjectsCardProps> = ({ project }) => {
  const {
    data: ownerData,
    isLoading,
    isError,
    error,
  } = useOwner(project.owner);
  const navigate = useNavigate();

  const handleCardClick = () => {
    const formattedName = formatProjectName(project.nombre);
    const url = `/${project._id}/${project.typeOfCase[0]}/${formattedName}`;
    navigate(url);
  };

  const handleButtonClick = (
    event: { stopPropagation: () => void },
    action: any
  ) => {
    event.stopPropagation(); // Detiene la propagación para que no se ejecute el onClick del card
    console.log(`Button ${action} clicked`);
  };

  if (isError) return <div>Error: {error!.message}</div>;

  return (
    <>
      <div
        className="card p-2 mb-4 dashboard card-hover"
        onClick={handleCardClick}
      >
        <div className="d-flex justify-content-start dashboard-card">
          {ownerData && ownerData!.profileImage ? (
            <div>
              <img
                src={ownerData!.profileImage}
                alt={ownerData!.companyName}
                className="logo-company"
              />
            </div>
          ) : null}
          <div className="ms-3 w-100">
            <h3>{project.nombre}</h3>
            <div className="description-text">{project.descripcion}</div>
            <hr />
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex align-items-end">
                <div onClick={(e) => handleButtonClick(e, "share")}>
                  <img src={shareIcon} alt="share" className="share-icon" />{" "}
                  compartir
                </div>
                <div
                  className="ms-3"
                  onClick={(e) => handleButtonClick(e, "save")}
                >
                  <img src={heart} alt="heart" className="share-icon" /> guardar
                </div>
              </div>
              <div>ver más {project._id}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
