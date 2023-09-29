import { useState } from "react";
import Swal from "sweetalert2";

import useLogin from "./useLogin";
import { Usuario } from "../../../types";

const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Custom hook para gestionar el proceso de registro del usuario.
 *
 * @returns Un objeto con las siguientes propiedades:
 * - `register`: Una función para registrar a un nuevo usuario.
 * - `loading`: Un indicador booleano que muestra si la solicitud de registro está en curso.
 * - `error`: Un mensaje de error si ocurre uno durante el proceso de registro.
 */
export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();

  /**
   * Función para registrar a un nuevo usuario.
   *
   * @param user - Los datos del usuario para el registro.
   * @returns `true` si el registro fue exitoso, `false` en caso contrario.
   */
  const register = async (user: Usuario) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200 || response.status === 201) {
        const rememberme = true;
        // Iniciar sesión después de un registro exitoso
        const loginSuccess = await login(user, rememberme);

        Swal.fire({
          icon: "success",
          title: "Bienvenida/o",
          text: "Enseguida te redireccionaremos a tu área privada.",
        });

        if (loginSuccess) {
          return true;
        } else {
          setError("Registro exitoso, pero hubo un error al iniciar sesión.");
          Swal.fire({
            icon: "error",
            title: "¡Oops!",
            text: "Registro exitoso, pero hubo un error al iniciar sesión.",
          });
          return false;
        }
      }

      if (response.status === 409) {
        setError("El usuario ya existe");
        Swal.fire({
          icon: "error",
          title: "¡Oops!",
          text: "El usuario ya existe.",
        });
        return false;
      }

      if (response.status === 401) {
        setError("Debe proporcionar datos válidos");
        Swal.fire({
          icon: "error",
          title: "¡Oops!",
          text: "Debe proporcionar datos válidos.",
        });
        return false;
      }
      setError("Se produjo un error al intentar registrarse");
      Swal.fire({
        icon: "error",
        title: "¡Oops!",
        text: "Se produjo un error al intentar registrarse.",
      });
      return false;
    } catch (error) {
      setError("Hubo un error en la red o el servidor");
      Swal.fire({
        icon: "error",
        title: "¡Oops!",
        text: "Hubo un error en la red o el servidor.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
