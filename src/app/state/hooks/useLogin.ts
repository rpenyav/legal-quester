import { useState } from "react";

import Cookies from "js-cookie";

import Swal from "sweetalert2";

import { AxiosError } from "axios";
import { Usuario } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Custom hook para gestionar el proceso de inicio de sesión del usuario.
 *
 * @returns Un objeto con las siguientes propiedades:
 * - `login`: Una función para iniciar sesión con las credenciales del usuario.
 * - `loading`: Un indicador booleano que muestra si la solicitud de inicio de sesión está en curso.
 * - `error`: Un mensaje de error si ocurre uno durante el proceso de inicio de sesión.
 */
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Función para iniciar sesión utilizando las credenciales proporcionadas por el usuario.
   *
   * @param data - Los datos del usuario para iniciar sesión.
   * @param rememberMe - Indicador para determinar si se debe recordar al usuario después de cerrar el navegador.
   * @returns `true` si el inicio de sesión fue exitoso, `false` en caso contrario.
   */
  const login = async (data: Usuario, rememberMe: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`${API_URL}/user/login`, data);

      if (response.data && response.data.access_token) {
        Cookies.set("access_token", response.data.access_token);
        // console.log("response.data.access_token", response.data.access_token);

        if (rememberMe) {
          localStorage.setItem("access_token", response.data.access_token); // Suponiendo que recibes un token como respuesta
        }

        return true;
      } else {
        throw new Error("Token not received");
      }
    } catch (err: unknown) {
      if ((err as AxiosError).response) {
        const axiosErr = err as AxiosError;

        if (axiosErr.response!.status === 401) {
          setError("Debe informar los datos de acceso correctos");

          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Los datos no parecen ser válidos.",
            confirmButtonText: "OK",
          });
        } else if (
          !axiosErr.response ||
          (axiosErr.response.status !== 200 && axiosErr.response.status !== 201)
        ) {
          setError(
            axiosErr.message || "Error desconocido al intentar iniciar sesión"
          );
          alert(error);
        }
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
