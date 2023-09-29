import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Question } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";

// Aquí definimos QuestionnaireData
interface QuestionnaireData {
  userId: string;
  questions: Question[];
}

// Cambia la URL del endpoint según tu configuración
const API_URL = "https://ejemplo.com/api/questionnaire"; // Cambia esto a tu URL

export function useSaveQuestionnaire() {
  const queryClient = useQueryClient();

  const saveQuestionnaire = async (data: QuestionnaireData) => {
    // Imprimir el objeto data para inspeccionarlo
    console.log("Datos enviados al guardar el cuestionario:", data);
    debugger;
    const response = await axiosInstance.post(`/questionnaires`, data);
    return response.data;
  };

  const { mutate } = useMutation(saveQuestionnaire, {
    onSuccess: (data) => {
      console.log("Cuestionario guardado:", data);
      // Invalidar la caché de preguntas después de guardar el cuestionario
      queryClient.invalidateQueries("questions");
    },
    onError: (error) => {
      console.error("Error al guardar el cuestionario:", error);
    },
  });

  return {
    saveQuestionnaire: (data: QuestionnaireData) => mutate(data),
  };
}
