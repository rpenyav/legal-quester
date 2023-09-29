import { Usuario } from "./usuario";

export interface Proyecto {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaPublicacion: Date;
  fechaFin?: Date;
  habilidadesRequeridas: string[];
  candidatosAplicantes?: Usuario[];
  candidatoSeleccionado?: Usuario;
  // Campos nuevos
  areaLegal: string;
  estatus: string;
  prioridad: string;
  documentoAdjuntos?: string[];
  tarifa?: number | string;
  modalidadPago?: string;
  cliente?: string;
  resultadosEsperados?: string;
  etapasProyecto?: string[];
  jurisdiccion?: string;
  requisitosLegales?: string[];
  cityOfProject?: string[];
  typeOfCase: string[];
  owner: string;
  surveyNumber: string;
}
