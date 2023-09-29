import { useQuery } from "react-query";
import { Proyecto } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";

const fetchProjectById = async (projectId: string): Promise<Proyecto> => {
  const { data } = await axiosInstance.get(`/projects/${projectId}`);
  return data;
};

export const useProject = (projectId: string) => {
  return useQuery<Proyecto, Error>(["project", projectId], () =>
    fetchProjectById(projectId)
  );
};
