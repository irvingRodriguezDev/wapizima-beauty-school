import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Animación fluida e infinita sin saltos visuales
const marqueeVariants = {
  animate: {
    x: [0, "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25, // Un ritmo continuo pero elegante
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
    { text: "RESPALDO TOTAL DE UNA MARCA LÍDER", highlight: true },
    { text: "CALIDAD PROFESIONAL INTERNACIONAL", highlight: false },
  ];

  // Renderizado del bloque de ítems (se duplica para el loop infinito perfecto)
  const renderMarqueeBlock = () => (
    <Stack
      direction='row'
      spacing={8} // Separación armónica entre frases
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
              // Jugamos con el peso visual: Bold extremo vs Medium fino
              fontWeight: item.highlight ? 800 : 400,
              letterSpacing: "3px", // Espaciado premium de alta costura
              fontSize: { xs: "0.8rem", md: "0.95rem" },
              fontFamily: "'Montserrat', sans-serif",
              color: "#FFFFFF", // Blanco puro para un contraste limpio sobre el rosa
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              opacity: item.highlight ? 1 : 0.85,
            }}
          >
            {item.text}
          </Typography>
          <AutoAwesomeIcon
            sx={{
              color: "#FFFFFF",
              fontSize: 14,
              opacity: 0.5, // Destello integrado sutilmente
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        py: 2.5,
        overflow: "hidden",
        display: "flex",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        zIndex: 10,
        my: 6, // Margen generoso para dejar respirar las secciones adyacentes
        // INTERSECCIÓN VISUAL: El gradiente de 3 tonos rosa oficial de Wapizima
        background:
          "linear-gradient(90deg, #D82E7A 0%, #E53888 50%, #F472B6 100%)",
        boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.15)", // Sutil aura debajo de la cinta
      }}
    >
      <Box
        component={motion.div}
        variants={marqueeVariants}
        animate='animate'
        sx={{
          display: "flex",
          gap: 8,
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {/* El bloque duplicado garantiza que la animación nunca se corte en pantallas ultra-wide */}
        {renderMarqueeBlock()}
        {renderMarqueeBlock()}
      </Box>
    </Box>
  );
};

export default MarqueeCinta;
