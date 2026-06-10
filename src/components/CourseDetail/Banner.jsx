import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = ({ currentCourse }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "320px", md: "520px" },
        // Degradado refinado: Mezcla tonos oscuros en base con destellos rosados sutiles
        backgroundImage: `
          linear-gradient(180deg, rgba(20, 20, 20, 0.1) 0%, rgba(20, 20, 20, 0.6) 80%, rgba(20, 20, 20, 0.8) 100%),
          linear-gradient(45deg, rgba(229, 56, 136, 0.15) 0%, transparent 60%),
          url(${currentCourse.flayer_url || "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=1200&auto=format&fit=crop"})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        pb: { xs: 5, md: 7 },
        overflow: "hidden", // Para asegurar que las animaciones de los hijos no se corten
      }}
    >
      <Container maxWidth='xl' sx={{ position: "relative" }}>
        {/* BOTÓN REGRESAR ESTILO "VIDRIO FLOTANTE" (Reubicado y Estilizado) */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{
            position: "absolute",
            bottom: { xs: "85%", md: "90%" }, // Flota sobre la información
            left: { xs: 16, md: 24 },
          }}
        >
          <Button
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />
            }
            onClick={() => navigate(-1)}
            variant='contained'
            sx={{
              // Glassmorphism suave
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "1px",
              textTransform: "none",
              borderRadius: "50px", // Cápsula premium
              px: 2.5,
              py: 1,
              transition: "all 0.3s ease",
              fontFamily: "'Montserrat', sans-serif",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                transform: "translateX(-3px)",
              },
            }}
          >
            Volver
          </Button>
        </Box>

        {/* CONTENIDO PRINCIPAL ANIMADO */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Etiqueta tipo de programa premium */}
          <Box
            sx={{
              display: "inline-block",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(5px)",
              color: "#FFFFFF",
              px: 2.5,
              py: 0.8,
              borderRadius: "50px", // Cápsula
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              mb: 2.5,
            }}
          >
            {currentCourse.tipo_curso} Profesional
          </Box>

          {/* Título Serif del Programa (Estilo Alta Costura) */}
          <Typography
            variant='h1'
            sx={{
              color: "#FFFFFF",
              fontSize: { xs: "2.4rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', serif", // Tipografía Serif
              fontStyle: "italic", // Cursiva para un look más sofisticado
              fontWeight: 400, // Peso más ligero para un look editorial
              letterSpacing: "-0.5px",
              maxWidth: "950px",
              margin: "0 auto",
            }}
          >
            {currentCourse.titulo}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
