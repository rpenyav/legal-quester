import { useQuery } from "react-query";
import { Usuario } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";
import { useState } from "react";

const fetchOwnerById = async (identificador: string): Promise<Usuario> => {
  const { data } = await axiosInstance.get(`user/${identificador}`);
  return data;
};

const useOwner = (identificador: string) => {
  const [shouldFetch] = useState<boolean>(!!identificador);

  return useQuery<Usuario, Error>(
    ["owner", identificador],
    () => fetchOwnerById(identificador),
    {
      onError: (err) => {
        console.error(err);
      },
    }
  );
};

export default useOwner;
