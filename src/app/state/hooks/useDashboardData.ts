import { useMemo } from "react";
import { Usuario } from "../../../types";

export const useDashboardData = (dataUser: Usuario | null) => {
  // Extraer los datos para compañías
  const {
    companyName,
    nameCompanyRep,
    industryType,
    companySize,
    companyWebsite,
    location,
    companyDescription,
    openRoles,
  } = dataUser || {};

  const companyData = useMemo(
    () => ({
      companyName,
      nameCompanyRep,
      industryType,
      companySize,
      companyWebsite,
      location,
      companyDescription,
      openRoles,
    }),
    [dataUser]
  );

  // Extraer los datos para candidatos
  const {
    jobTitle,
    educationLevel,
    languages,
    certifications,
    portfolioUrl,
    resumeUrl,
    availability,
  } = dataUser || {};

  const candidateData = useMemo(
    () => ({
      jobTitle,
      educationLevel,
      languages,
      certifications,
      portfolioUrl,
      resumeUrl,
      availability,
    }),
    [dataUser]
  );

  // menú para compañías
  const isCompanyMenu = useMemo(
    () => [
      {
        title: "Publicar Nuevo Caso",
        link: "/new-case",
        subMenu: [
          { title: "Formulario de detalles del caso", link: "/case-details" },
          { title: "Cuestionario opcional", link: "/optional-quiz" },
          { title: "Solicitar documentos", link: "/request-documents" },
        ],
      },
      {
        title: "Mis Casos",
        link: "/my-cases",
        subMenu: [
          { title: "Lista de casos publicados", link: "/published-cases" },
          { title: "Candidaturas Recibidas", link: "/received-applications" },
          {
            title: "Ver candidaturas por caso",
            link: "/applications-per-case",
          },
          {
            title: "Aprobar/rechazar candidaturas",
            link: "/approve-reject-applications",
          },
          {
            title: "Solicitar la inserción del candidato en base de datos",
            link: "/request-database-insertion",
          },
        ],
      },
      { title: "Búsqueda de Abogados/Bufetes", link: "/search-lawyers" },
      { title: "Listado y filtros", link: "/list-and-filters" },
      { title: "Solicitar contrato", link: "/request-contract" },
    ],
    []
  );

  // menú para candidatos
  const isNotCompanyMenu = useMemo(
    () => [
      { title: "Dashboard", link: "/dashboard" },
      {
        title: "Resumen de candidaturas enviadas",
        link: "/applications-summary",
      },
      {
        title: "Alertas de casos nuevos según especialidad",
        link: "/new-case-alerts",
      },
      { title: "Buscar Casos", link: "/search-cases" },
      {
        title: "Mis Candidaturas",
        link: "/my-applications",
        subMenu: [
          { title: "Estado de cada candidatura", link: "/application-status" },
        ],
      },
      {
        title: "Mi Perfil",
        link: "/my-profile",
        subMenu: [
          {
            title: "Información personal y profesional",
            link: "/personal-professional-info",
          },
          {
            title: "Especialidades y experiencia",
            link: "/specialties-experience",
          },
          { title: "Documentos subidos", link: "/uploaded-documents" },
        ],
      },
    ],
    []
  );

  return { companyData, candidateData, isCompanyMenu, isNotCompanyMenu };
};
