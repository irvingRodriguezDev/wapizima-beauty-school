const FormatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";

  // Al separar por guiones, JavaScript crea la fecha local exacta sin restar horas
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) return "Fecha inválida";

  const formatted = date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export default FormatDate;
