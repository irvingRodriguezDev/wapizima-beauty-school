/**
 * Calcula la distancia en kilómetros entre dos coordenadas usando la Fórmula de Haversine.
 * Versión optimizada sin Stacks de cálculo repetitivo.
 */
export const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  // Si alguna coordenada falta, evita que rompa la app devolviendo una distancia infinita o cero
  if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;

  const R = 6371; // Radio de la Tierra en km

  // Función helper para convertir grados a radianes de forma limpia
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Retorna la distancia exacta en Kilómetros
};
