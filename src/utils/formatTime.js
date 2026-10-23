/**
 * Formatea una hora.
 * @param {string} time - Hora en formato HH:mm:ss o HH:mm.
 * @param {boolean} use12Hour - true: 10:00 AM, false: 10:00.
 * @returns {string}
 */
export const formatTime = (time, use12Hour = false) => {
  if (!time) return "";

  const parts = String(time)
    .trim()
    .match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);

  if (!parts) return time;

  const hours = Number(parts[1]);
  const minutes = Number(parts[2]);

  if (hours > 23 || minutes > 59) return time;

  if (!use12Hour) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
};
