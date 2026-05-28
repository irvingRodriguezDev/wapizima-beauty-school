import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Banner = ({ currentCourse }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", md: "480px" },
        backgroundImage: `linear-gradient(180deg, rgba(45,37,38,0.2) 0%, rgba(45,37,38,0.7) 100%), url(${currentCourse.flayer_url || "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=1200&auto=format&fit=crop"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        pb: { xs: 5, md: 7 },
      }}
    >
      {/* BOTÓN REGRESAR MINIMALISTA */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant='text'
        sx={{
          position: "absolute",
          top: 24,
          left: { xs: 16, md: 40 },
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          borderRadius: 0,
          "&:hover": {
            color: "secondary.main",
            background: "transparent",
          },
        }}
      >
        Volver
      </Button>

      <Container maxWidth='xl'>
        {/* Etiqueta tipo de programa plana */}
        <Box
          sx={{
            display: "inline-block",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            color: "#FFFFFF",
            px: 2,
            py: 0.6,
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          {currentCourse.tipo_curso}
        </Box>

        {/* Título Serif del Programa */}
        <Typography
          variant='h1'
          sx={{
            color: "#FFFFFF",
            fontSize: { xs: "2.2rem", md: "3.8rem" },
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          {currentCourse.titulo}
        </Typography>
      </Container>
    </Box>
  );
};

export default Banner;
