import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ---- DIRECCIÓN DE DISEÑO EDITORIAL SÓLIDO ----
const TAPE_STYLE = {
  // Fondo sólido, sofisticado y maduro en Rosa Viejo
  bgSolid: "#BA8992",
  // Color de texto en contraste de alta costura
  textContrast: "#2D2526",
  fontSans: "'Montserrat', 'Inter', sans-serif",
  // Sombra plana y ultra sutil para separación de capas
  boxShadow: "0px 4px 20px rgba(45, 37, 38, 0.02)",
};

// Animación fluida de marquesina infinita
const marqueeVariants = {
  animate: {
    x: [0, "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30, // Un ritmo un poco más pausado y exclusivo
        ease: "linear",
      },
    },
  },
};

const MarqueeCinta = () => {
  const marqueeItems = [
    { text: "ÚNETE A LA ACADEMIA NÚMERO UNO", highlight: true },
    { text: "SÉ PARTE DE LA COMUNIDAD WAPIZIMA", highlight: false },
    { text: "TRANSFORMA TU PASIÓN EN UN IMPERIO", highlight: true },
    { text: "EL MOMENTO DE EMPRENDER ES AHORA", highlight: false },
    { text: "CONTRATO Y RESPALDO DE MARCA LÍDER", highlight: true },
    { text: "CALIDAD PROFESIONAL INTERNACIONAL", highlight: false },
  ];

  // Renderizamos el bloque de ítems de forma limpia
  const renderMarqueeBlock = () => (
    <Stack
      direction='row'
      spacing={10} // Más aire entre frases para diseño editorial
      sx={{ alignItems: "center", flexShrink: 0 }}
    >
      {marqueeItems.map((item, i) => (
        <Stack
          key={i}
          direction='row'
          spacing={4}
          sx={{ alignItems: "center" }}
        >
          <Typography
            variant='button'
            sx={{
              fontWeight: item.highlight ? 800 : 500, // Jugamos con los pesos tipográficos en lugar de colores chillones
              letterSpacing: "4px", // Súper espaciado estilo alta joyería
              fontSize: { xs: "0.85rem", md: "1rem" },
              fontFamily: TAPE_STYLE.fontSans,
              color: TAPE_STYLE.textContrast,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {item.text}
          </Typography>
          <AutoAwesomeIcon
            sx={{
              color: TAPE_STYLE.textContrast,
              fontSize: 14,
              opacity: 0.6, // Sutil destello integrado al flujo del texto
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        background: TAPE_STYLE.bgSolid,
        py: 3, // Un poco más alta para darle un aire imponente a la tipografía
        overflow: "hidden",
        display: "flex",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        boxShadow: TAPE_STYLE.boxShadow,
        zIndex: 10,
        my: 8, // Separación generosa para dejar respirar el contenido superior e inferior
      }}
    >
      <Box
        component={motion.div}
        variants={marqueeVariants}
        animate='animate'
        sx={{
          display: "flex",
          gap: 10,
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {/* Bucle perfecto de dos bloques para renderizado continuo */}
        {renderMarqueeBlock()}
        {renderMarqueeBlock()}
      </Box>
    </Box>
  );
};

export default MarqueeCinta;
