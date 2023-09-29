import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookie from "js-cookie";
import { Preference, Proyecto } from "../../../types";
import LoadingComponentSmall from "../LoadingComponentSmall";
import useProjects from "../../../app/state/hooks/useProjects";
import useSearch from "../../../app/state/hooks/useSearch";
import { ProjectCard } from "./ProjectCard";

const TotalProjects = styled.span`
  margin-right: 1rem;
`;

const Dropdown = styled.select`
  display: block;
  width: 250px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

interface ProjectsListProps {
  searchCriteria: {} | undefined;
  preferences: Preference | undefined;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  searchCriteria,
  preferences,
}) => {
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");

  const mytypes = preferences?.typeOfProjects;
  const mycity = preferences?.cityOfProjects;
  const myArea = preferences?.areaLegalProjects;

  const searchResults = useSearch(orderBy, searchCriteria);
  const projectResults = useProjects(orderBy, mytypes, mycity, myArea);

  console.log("FLAG 1", mytypes, mycity, myArea);

  const { projects, hasNextPage, fetchNextPage } = useMemo(() => {
    return searchCriteria ? searchResults : projectResults;
  }, [searchCriteria, searchResults, projectResults]);

  useEffect(() => {
    const orderByFromCookie = Cookie.get("orderBy");

    if (orderByFromCookie) {
      setOrderBy(orderByFromCookie as "asc" | "desc");
    }
  }, []);

  const handleOrderByChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value as "asc" | "desc";
    setOrderBy(newValue);
    Cookie.set("orderBy", newValue);
  };

  const hasMoreData = !!hasNextPage && projects.length > 0;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-5 ms-3 ">
        <TotalProjects>
          Proyectos disponibles con tus criterios establecidos:{" "}
          {projects.length}
        </TotalProjects>
        <Dropdown value={orderBy} onChange={handleOrderByChange}>
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguos primero</option>
        </Dropdown>
        <div className="divisor">&nbsp;</div>
      </div>
      <div className="mt-4 activity mt-5">
        <InfiniteScroll
          dataLength={projects.length}
          next={fetchNextPage}
          hasMore={hasMoreData}
          loader={<LoadingComponentSmall />}
          endMessage={
            projects.length > 0 ? (
              <p>
                <b>¡Has visto todas los proyectos!</b>
              </p>
            ) : null
          }
          scrollThreshold={0.9}
        >
          {projects && projects.length > 0 ? (
            projects
              .sort((a, b) => {
                if (orderBy === "asc") {
                  return (
                    new Date(a.fechaPublicacion!).getTime() -
                    new Date(b.fechaPublicacion!).getTime()
                  );
                } else {
                  return (
                    new Date(b.fechaPublicacion!).getTime() -
                    new Date(a.fechaPublicacion!).getTime()
                  );
                }
              })
              .map((project: Proyecto, index: number) => (
                <ProjectCard key={index} project={project} />
              ))
          ) : (
            <p className="text-center">
              No hay novedades disponibles para tus criterios establecidos
            </p>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};
