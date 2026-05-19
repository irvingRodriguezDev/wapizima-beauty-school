export const parsePostGISPoint = (wkbHex) => {
  if (!wkbHex || typeof wkbHex !== "string" || wkbHex.length < 50) {
    return { lat: null, lng: null };
  }

  try {
    const match = wkbHex.match(/../g);
    if (!match) return { lat: null, lng: null };

    const bytes = new Uint8Array(match.map((w) => parseInt(w, 16)));
    const view = new DataView(bytes.buffer);
    const isLittleEndian = bytes[0] === 0x01;

    // PostGIS entrega primero la componente X y luego la Y
    const x = view.getFloat64(bytes.length - 16, isLittleEndian); // Ahora es la Longitud
    const y = view.getFloat64(bytes.length - 8, isLittleEndian); // Ahora es la Latitud

    // Retornamos mapeado correctamente al estándar de tu frontend
    return {
      lat: y, // El segundo valor (Y) es la Latitud
      lng: x, // El primer valor (X) es la Longitud
    };
  } catch (error) {
    console.error("Error parseando PostGIS Point:", error);
    return { lat: null, lng: null };
  }
};
