import { useCallback } from "react";
import Swal from "sweetalert2";
import { axiosInstance } from "../../../infrastructure/axiosInstance";

interface UpdateIsActiveHook {
  updateIsActive: (newIsActive: boolean) => Promise<void>;
}

const confirmAction = async (actionText: string) => {
  return await Swal.fire({
    title: `¿Estás seguro de que quieres ${actionText} la cuenta?`,
    text: `Vas a ${actionText.toLowerCase()} la cuenta. ¿Quieres continuar?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Sí, ${actionText}`,
    cancelButtonText: "Cancelar",
  });
};

const updateServerState = async (userId: string, newIsActive: boolean) => {
  return await axiosInstance.put(`/user/${userId}`, { isActive: newIsActive });
};

const showAlert = async (actionText: string, isSuccess: boolean) => {
  const alertType = isSuccess ? "success" : "error";
  const alertMsg = isSuccess
    ? `La cuenta ha sido ${actionText.toLowerCase()} con éxito.`
    : `Ocurrió un error al ${actionText.toLowerCase()} la cuenta.`;

  return await Swal.fire(`${actionText} la Cuenta`, alertMsg, alertType);
};

export const useUpdateIsActive = (userId: string): UpdateIsActiveHook => {
  const updateIsActive = useCallback(
    async (newIsActive: boolean): Promise<void> => {
      const actionText = newIsActive ? "Activar" : "Desactivar";

      try {
        const result = await confirmAction(actionText);

        if (result.isConfirmed) {
          await updateServerState(userId, newIsActive);
          await showAlert(actionText, true);
          console.log(
            `El estado isActive ha sido actualizado a ${newIsActive}`
          );
        }
      } catch (error) {
        await showAlert(actionText, false);
        console.error(
          `Error al actualizar el estado isActive a ${newIsActive}:`,
          error
        );
      }
    },
    [userId]
  );

  return { updateIsActive };
};
