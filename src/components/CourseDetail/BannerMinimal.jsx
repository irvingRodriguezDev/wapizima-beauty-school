import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BannerMinimal = ({ currentCourse }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        pt: { xs: 5, md: 2 },
        pb: { xs: 2, md: 4 }, // Reducido drásticamente porque ahora se integra al layout continuo
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Destello de marca ultra sutil en el fondo (Glow Effect al 4% de opacidad) */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "5%",
          width: "45%",
          height: "140%",
          background:
            "radial-gradient(circle, rgba(245, 79, 156, 0.05) 0%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth='xl'
        sx={{
          px: { xs: 3, md: 8 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, md: 5 },
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* BOTÓN REGRESAR MINIMALISTA ESTILO "TEXTO FLOTANTE" */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button
            startIcon={
              <ArrowBackIosNewIcon
                sx={{
                  fontSize: "11px !important",
                  stroke: "currentColor",
                  strokeWidth: 1,
                }}
              />
            }
            onClick={() => navigate(-1)}
            variant='text'
            sx={{
              color: "#655F62", // Gris suave de la paleta corporativa
              fontWeight: 600,
              fontSize: "0.82rem",
              letterSpacing: "0.5px",
              borderRadius: "99px",
              px: 2,
              py: 1,
              fontFamily: "'Montserrat', sans-serif",
              textTransform: "none",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                backgroundColor: "rgba(245, 79, 156, 0.04)",
                color: "#E91E63",
                transform: "translateX(-4px)",
                borderColor: "rgba(245, 79, 156, 0.15)",
              },
            }}
          >
            Volver al catálogo
          </Button>
        </Box>

        {/* TEXTOS EDITORIALES SOBERBIOS */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          sx={{ maxWidth: { xs: "100%", lg: "100%" } }}
        >
          {/* Tag de categoría estilizado en alta costura */}
          <Box
            sx={{
              display: "inline-block",
              border: "1px solid rgba(245, 79, 156, 0.2)",
              background: "rgba(245, 79, 156, 0.03)",
              color: "#E91E63", // Fucsia icónico
              px: 2.2,
              py: 0.6,
              borderRadius: "99px",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              mb: 2,
            }}
          >
            {currentCourse.tipo_curso || "Taller"} Especializado
          </Box>

          {/* Título Serif Editorial Monumental */}
          <Typography
            variant='h1'
            sx={{
              color: "#2A2628", // Tono oscuro orgánico premium
              fontSize: { xs: "2.4rem", sm: "3.5rem", md: "4.8rem" },
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            {currentCourse.titulo}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BannerMinimal;
