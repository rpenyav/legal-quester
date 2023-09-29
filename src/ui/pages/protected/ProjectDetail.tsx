import { useEffect, useState } from "react";
import { useAuth } from "../../../infrastructure";
import { useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../../../app/state/hooks/useUserData";
import Swal from "sweetalert2";
import { ProjectDetailContent } from "../../components/protected/ProjectDetailContent";

import { useProject } from "../../../app/state/hooks/useProject";
import { ProjectDetailActions } from "../../components/protected/ProjectDetailActions";

export const ProjectDetail = () => {
  const { isAuthenticated, userData } = useAuth();
  const { id, typeOfCase, nombre } = useParams();
  const navigate = useNavigate();
  //   const { dataUser } = useUserData(userData?._id);

  const { data: project, isLoading, isError, error } = useProject(id!);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error!.message}</div>;
  }

  return (
    project && (
      <div className="detail">
        <div className="row mb-5">
          <div className="col-md-12">
            Home {">"} proyectos {">"}{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 order-md-1 order-2 pe-5">
            <ProjectDetailContent project={project} />
          </div>
          <div className="col-md-4 order-md-2 order-1">
            <ProjectDetailActions project={project} />
          </div>
        </div>
      </div>
    )
  );
};
