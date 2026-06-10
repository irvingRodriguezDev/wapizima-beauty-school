import React from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const LoadingScreen = ({ message = "Cargando experiencia..." }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFBFD", // Fondo limpio institucional
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(229, 56, 136, 0.04) 0%, transparent 60%)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Stack
        spacing={3.5}
        alignItems='center'
        component={motion.div}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* 1. CONTENEDOR DEL SPINNER CROMADO EN BLOQUE */}
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          {/* Spinner Dinámico Principal */}
          <CircularProgress
            variant='indeterminate'
            size={54}
            thickness={4}
            sx={{
              color: "#E53888", // Rosa Wapizima de conversión
              animationDuration: "800ms", // Ritmo de giro continuo premium suave
              strokeLinecap: "round",
              zIndex: 2,
            }}
          />
          {/* Riel Estático Trasero de Precisión */}
          <CircularProgress
            variant='determinate'
            value={100}
            size={54}
            thickness={4}
            sx={{
              color: "rgba(229, 56, 136, 0.08)", // Base translúcida rosa suave
              position: "absolute",
              left: 0,
              zIndex: 1,
            }}
          />
        </Box>

        {/* 2. TEXTO DINÁMICO EDITORIAL DE ALTA JOYERÍA */}
        <Typography
          variant='h6'
          sx={{
            color: "#212121", // Tono oscuro nítido y elegante
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "5px", // Letraje expandido estilo pasarela/editorial
            textAlign: "center",
            textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
            pl: "5px", // Compensación óptica por el letter-spacing del final
          }}
        >
          {message}
        </Typography>

        {/* 3. DECORACIÓN DE MARCA (DESTELLO FLOTANTE ORGÁNICO) */}
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.92, 1.08, 0.92],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D82E7A", // Segundo tono rosa para profundidad
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 14 }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingScreen;
