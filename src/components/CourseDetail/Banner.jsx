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
        height: { xs: "360px", md: "500px", lg: "540px" },
        // Degradado multicapa calibrado para proteger legibilidad de los textos
        backgroundImage: `
          linear-gradient(180deg, rgba(20, 16, 17, 0.4) 0%, rgba(20, 16, 17, 0.2) 40%, rgba(20, 16, 17, 0.85) 100%),
          linear-gradient(90deg, rgba(233, 30, 99, 0.15) 0%, transparent 100%),
          url(${currentCourse.flayer_url || "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=1200&auto=format&fit=crop"})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "stretch", // Permite que el contenedor use todo el alto disponible
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          px: { xs: 3, md: 8 },
          pt: { xs: 4, md: 6 },
          pb: { xs: 5, md: 7 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Separa el botón (arriba) del título (abajo) de forma orgánica
        }}
      >
        {/* TOP ROW: BOTÓN REGRESAR (Ya no es absoluto, no colisiona) */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Button
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "11px !important" }} />
            }
            onClick={() => navigate(-1)}
            variant='contained'
            disableElevation
            sx={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "1px",
              textTransform: "none",
              borderRadius: "99px",
              px: 3,
              py: 1.2,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily: "'Montserrat', sans-serif",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                transform: "translateX(-4px)",
              },
            }}
          >
            Volver al catálogo
          </Button>
        </Box>

        {/* BOTTOM ROW: TEXTOS DE MARCA ALINEADOS CON ESTILO EDITORIAL */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // Alineación asimétrica a la izquierda
            textAlign: "left",
            maxWidth: { xs: "100%", md: "85%", lg: "70%" },
          }}
        >
          {/* Tag de Categoría de Producto */}
          <Box
            sx={{
              display: "inline-block",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#FFFFFF",
              px: 2.2,
              py: 0.6,
              borderRadius: "99px",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              mb: 2,
            }}
          >
            {currentCourse.tipo_curso || "Taller"} Especializado
          </Box>

          {/* Título de Impacto en Cursiva Elegante */}
          <Typography
            variant='h1'
            sx={{
              color: "#FFFFFF",
              fontSize: {
                xs: "2.2rem",
                sm: "3.2rem",
                md: "4.2rem",
                lg: "4.8rem",
              },
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.5px",
              textShadow: "0 4px 24px rgba(0,0,0,0.25)", // Sutil relieve sobre fondos complejos
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
