import { Usuario } from "./";

export interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
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
}
