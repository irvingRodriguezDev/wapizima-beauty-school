import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Animación acelerada un poco (de 25s a 20s) para darle más dinamismo al llamado
const marqueeVariants = {
  animate: {
    x: [0, -1200],
    transition: {
      x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
    },
  },
};

const MarqueeCinta = () => {
  // Frases ultra-empoderadas de invitación a la comunidad
  const marqueeItems = [
    { text: "ÚNETE A LA ACADEMIA NÚMERO UNO", highlight: true },
    { text: "SÉ PARTE DE LACOMUNIDAD WAPIZIMA", highlight: false },
    { text: "TRANSFORMA TU PASIÓN EN UN IMPERIO", highlight: true },
    { text: "INCRÍBETE HOY Y ASEGURA TU LUGAR", highlight: false },
    { text: "EL MOMENTO DE EMPRENDER ES AHORA", highlight: true },
    { text: "APARTA TU LUGAR CON SOLO EL 10%", highlight: false },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#fdf2f5",
        borderTop: "2px solid rgba(240, 98, 146, 0.3)",
        borderBottom: "2px solid rgba(240, 98, 146, 0.3)",
        py: 2.2,
        whiteSpace: "nowrap",
        overflow: "hidden",
        display: "flex",
        // Mantenemos la asimetría rompedora de tus flyers impresos
        transform: "rotate(-1.5deg) scale(1.02)",
        my: 2,
        boxShadow: "0 6px 20px rgba(240, 98, 146, 0.05)",
      }}
    >
      <motion.div
        variants={marqueeVariants}
        animate='animate'
        style={{ display: "flex", gap: "4rem", paddingRight: "4rem" }}
      >
        {/* Duplicamos el array tres veces para asegurar que pantallas ultra-wide (como tu monitor) no vean cortes */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <Stack key={i} direction='row' spacing={3}>
            <Typography
              variant='button'
              sx={{
                fontWeight: 900,
                letterSpacing: "1.5px",
                fontSize: "1.1rem",
                // Truco de diseño: intercalamos rosa fuerte con gris oscuro para un look de revista premium
                color: item.highlight ? "#d81b60" : "#1a1a1a",
                transition: "color 0.3s",
              }}
            >
              {item.text}
            </Typography>
            <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 18 }} />
          </Stack>
        ))}
      </motion.div>
    </Box>
  );
};

export default MarqueeCinta;
