import { useInfiniteQuery } from "react-query";
import { Proyecto } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";
import { useMemo } from "react";

type FetchProjectsResponse = {
  hasMore: any;
  projects: Proyecto[];
};

const extractStringFromObject = (obj: any) => {
  return Object.keys(obj)
    .filter((key) => !isNaN(Number(key))) // Filtrar sólo las claves numéricas
    .sort((a, b) => Number(a) - Number(b)) // Ordenar las claves numéricas
    .map((key) => obj[key]) // Obtener el valor de cada clave
    .join(""); // Unirlos para formar una cadena
};

const fetchProjects = async ({
  pageParam = 1,
  limit = 30,
  orderBy = "desc",
  mytypes,
  mycity,
  myArea,
}: {
  pageParam?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  mytypes?: string[];
  mycity?: string[];
  myArea?: string[];
}) => {
  const params: { [key: string]: string | string[] | number | undefined } = {
    page: pageParam,
    limit: limit,
    order: orderBy,
  };

  const myRealTypes = mytypes
    ? mytypes.map(extractStringFromObject).join(",")
    : undefined;
  const myRealCity = mycity
    ? mycity.map(extractStringFromObject).join(",")
    : undefined;
  const myRealArea = myArea
    ? myArea.map(extractStringFromObject).join(",")
    : undefined;

  if (myRealTypes) {
    params.typeOfProject = myRealTypes;
  }
  if (myRealCity) {
    params.cityOfProject = myRealCity;
  }
  if (myRealArea) {
    params.areaLegal = myRealArea;
  }

  const response = await axiosInstance.get(`/projects`, { params });
  const responseData = response.data as FetchProjectsResponse;
  console.log(response.data);
  return responseData;
};

const useProjects = (
  orderBy: "asc" | "desc" = "desc",
  mytypes?: string[],
  mycity?: string[],
  myArea?: string[]
) => {
  const queryKey = useMemo(
    () => ["projects", orderBy, mytypes, mycity, myArea],
    [orderBy, mytypes, mycity, myArea]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error: rawError,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam }) =>
      fetchProjects({ pageParam, limit: 30, orderBy, mytypes, mycity, myArea }),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
      keepPreviousData: true,
    }
  );

  const filteredProjects = useMemo(() => {
    return (
      data?.pages.flatMap((page) => {
        return page.projects;
      }) || []
    );
  }, [data]);

  return {
    projects: filteredProjects,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading || isFetchingNextPage,
    error: rawError ? (rawError as Error).message : null,
  };
};

export default useProjects;
