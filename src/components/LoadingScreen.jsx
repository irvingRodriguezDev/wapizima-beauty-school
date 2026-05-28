import React from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ---- CONSTANTES DE DISEÑO EDITORIAL ----
const LOADER_STYLE = {
  bgSolid: "#FAF6F6", // El fondo crema limpio de la marca
  textPrimary: "#2D2526", // Ceniza profundo para máxima elegancia
  textSecondary: "#BA8992", // Rosa viejo para acentos sutiles
  fontSans: "'Montserrat', 'Inter', sans-serif",
};

const LoadingScreen = ({ message = "Cargando experiencia..." }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: LOADER_STYLE.bgSolid,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Stack
        spacing={4}
        alignItems='center'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 1. CONTENEDOR DEL SPINNER CROMADO EN BLOQUE */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant='indeterminate'
            size={50}
            thickness={3.5}
            sx={{
              color: LOADER_STYLE.textPrimary, // Carga en el color principal de la marca
              animationDuration: "750ms", // Ritmo de giro más sofisticado y suave
              strokeLinecap: "round",
            }}
          />
          <CircularProgress
            variant='determinate'
            value={100}
            size={50}
            thickness={3.5}
            sx={{
              color: "rgba(186, 137, 146, 0.25)", // Base sutil en rosa viejo
              position: "absolute",
              left: 0,
            }}
          />
        </Box>

        {/* 2. TEXTO DINÁMICO EDITORIAL */}
        <Typography
          variant='h6'
          sx={{
            color: LOADER_STYLE.textPrimary,
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "4px", // Letraje expandido estilo alta joyería
            textAlign: "center",
            textTransform: "uppercase", // Estilo sobrio de pasarela
            fontFamily: LOADER_STYLE.fontSans,
          }}
        >
          {message}
        </Typography>

        {/* 3. DECORACIÓN DE MARCA (DESTELLO INFÍNITO) */}
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: LOADER_STYLE.textSecondary,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 16 }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingScreen;
