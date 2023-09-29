export const formatProjectName = (name: string) => {
  // Reducir la longitud a 50 caracteres
  let formattedName = name.slice(0, 50);

  // Convertir todo a minúsculas
  formattedName = formattedName.toLowerCase();

  // Reemplazar espacios por guiones
  formattedName = formattedName.replace(/\s+/g, "-");

  return formattedName;
};
