import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "react-query";
import { Usuario } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchUserData = async (identificador: string): Promise<Usuario> => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/user/${identificador}`
    );
    const userData = { ...response.data };
    delete userData.password;
    return userData;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("Sesión caducada, por favor inicie sesión de nuevo.");
      throw new Error("Unauthorized");
    } else {
      throw error;
    }
  }
};

const uploadToCloudinary = async (
  identificador: string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.post(`/user/upload`, formData);

  if (response.status !== 201 || !response.data.imageUrl) {
    console.log("Response:", response);
    throw new Error("Error al cargar la imagen al servidor");
  } else {
    const responseToData = await axiosInstance.put(
      `${API_URL}/user/${identificador}`,
      { profileImage: response.data.imageUrl }
    );
  }

  return response.data.imageUrl;
};

const updateUserData = async (
  identificador: string,
  dataToUpdate: Partial<Usuario>
): Promise<Usuario> => {
  const response = await axiosInstance.put(
    `${API_URL}/user/${identificador}`,
    dataToUpdate
  );
  Swal.fire({
    icon: "success",
    title: "Datos actualizados",
    text: "Los datos han sido actualizados exitosamente.",
    confirmButtonText: "OK",
    timer: 2000,
  });

  return response.data;
};

const uploadAndSaveUserData = async (
  identificador: string,
  dataToUpdate: Partial<Usuario>,
  file: File | null
) => {
  try {
    // let imageUrl;
    // console.log("flag3", file);
    // if (file) {
    //   imageUrl = await uploadToCloudinary(file);
    //   if (imageUrl) {
    //     console.log("flag2", imageUrl);
    //     dataToUpdate = { ...dataToUpdate, profileImage: imageUrl };
    //   }
    // }

    return await updateUserData(identificador, dataToUpdate);
  } catch (error) {
    console.error("Error en uploadAndSaveUserData:", error);
    throw error;
  }
};

export const useUserData = (identificador: string | undefined) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(!!identificador);
  const [unauthorized, setUnauthorized] = useState<boolean>(false); // Nuevo estado para manejar no autorizados

  // Uso de useQuery para obtener datos
  const { data, error, isLoading, isError } = useQuery<Usuario, Error>(
    ["userData", identificador],
    () => fetchUserData(identificador!),
    {
      enabled: shouldFetch,
      onError: (err) => {
        if (err.message === "Unauthorized") {
          setUnauthorized(true);
        }
      },
    }
  );

  // Uso de useMutation para actualizar datos
  const uploadAndUpdateMutation = useMutation(
    ({
      dataToUpdate,
      file,
    }: {
      dataToUpdate: Partial<Usuario>;
      file?: File | null;
    }) => {
      return uploadAndSaveUserData(identificador!, dataToUpdate, file!);
    }
  );

  useEffect(() => {
    setShouldFetch(!!identificador);
  }, [identificador]);

  if (isError) {
    console.error(
      "Ocurrió un error al obtener los datos del usuario:",
      error.message
    );
  }

  return {
    dataUser: data,
    error,
    isLoading,
    isError,
    uploadToCloudinary,
    unauthorized, // Devolvemos el nuevo estado
    // updateUser: updateMutation,
    uploadAndUpdate: uploadAndUpdateMutation,
  };
};
