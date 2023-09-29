type Language = "es" | "en";

const months: Record<Language, string[]> = {
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

// Convierte la fecha a formato 10/10/2023
export const toDateSlashFullYear = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

// Convierte la fecha a formato 10/10/23
export const toDateSlashShortYear = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${String(
    date.getFullYear()
  ).substr(-2)}`;
};

// Convierte la fecha a formato 10 de Octubre de 2023
export const toDateLong = (
  dateString: string | number | Date,
  lang: Language = "es"
) => {
  const date = new Date(dateString);
  const deOrOf = lang === "es" ? "de" : "of";
  return `${date.getDate()} ${deOrOf} ${
    months[lang][date.getMonth()]
  } ${deOrOf} ${date.getFullYear()}`;
};

// Convierte la fecha a formato 10 de Octubre
export const toDateAndMonth = (
  dateString: string | number | Date,
  lang: Language = "es"
) => {
  const date = new Date(dateString);
  const deOrOf = lang === "es" ? "de" : "of";
  return `${date.getDate()} ${deOrOf} ${months[lang][date.getMonth()]}`;
};

// Convierte la fecha a formato Octubre de 2023
export const toMonthAndYear = (
  dateString: string | number | Date,
  lang: Language = "es"
) => {
  const date = new Date(dateString);
  const deOrOf = lang === "es" ? "de" : "of";
  return `${months[lang][date.getMonth()]} ${deOrOf} ${date.getFullYear()}`;
};
