import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Fondo con un degradado premium sutil que evoca el estilo estético de la escuela
        background:
          "linear-gradient(135deg, #FFF5F6 0%, #F5E3E6 50%, #E8D3D7 100%)",
        position: "relative",
        overflow: "hidden",
        px: 2,
        // Círculos difusos decorativos de fondo para dar profundidad de alta costura
        "&::before": {
          content: '""',
          position: "absolute",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          top: "-10%",
          right: "-10%",
          borderRadius: "50%",
          background: "rgba(237, 201, 208, 0.4)",
          filter: "blur(80px)",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: { xs: "250px", md: "400px" },
          height: { xs: "250px", md: "400px" },
          bottom: "-5%",
          left: "-5%",
          borderRadius: "50%",
          background: "rgba(186, 137, 146, 0.3)",
          filter: "blur(60px)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth='sm' sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: "24px",
            // Efecto Glassmorphism puro y elegante
            backdropFilter: "blur(16px) saturate(120%)",
            WebkitBackdropFilter: "blur(16px) saturate(120%)",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            boxShadow: "0 20px 40px rgba(186, 137, 146, 0.15)",
            // Animación de entrada suave para todo el contenedor
            animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ease-out",
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(30px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Icono de destello animado arriba */}
          <AutoAwesomeIcon
            sx={{
              color: "secondary.main",
              fontSize: "2rem",
              mb: 2,
              animation: "pulse 2s infinite ease-in-out",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)", opacity: 0.8 },
                "50%": { transform: "scale(1.2)", opacity: 1 },
              },
            }}
          />

          {/* Gran 404 con tipografía ultra-bold y animación flotante */}
          <Typography
            variant='h1'
            component='div'
            sx={{
              fontSize: { xs: "6rem", md: "8rem" },
              fontWeight: 950,
              color: "primary.main",
              lineHeight: 1,
              letterSpacing: "-2px",
              mb: 1,
              textShadow: "2px 4px 10px rgba(186, 137, 146, 0.2)",
              animation: "float 4s infinite ease-in-out",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            404
          </Typography>

          <Typography
            variant='h4'
            component='h1'
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              fontWeight: 800,
              color: "primary.main",
              textTransform: "uppercase",
              letterSpacing: "3px",
              mb: 2,
            }}
          >
            Página No Encontrada
          </Typography>

          <Typography
            variant='body1'
            color='text.secondary'
            sx={{
              mb: 5,
              lineHeight: 1.7,
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            El enlace que seguiste podría estar roto o la página fue removida.
            No te preocupes, el camino hacia el diseño de tus sueños sigue
            disponible.
          </Typography>

          {/* Botón de regreso estilizado con la consistencia del modal de pagos */}
          <Button
            component={RouterLink}
            to='/'
            variant='contained'
            color='secondary'
            size='large'
            startIcon={<ArrowBackIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              px: 4,
              py: 2,
              color: "primary.main",
              bgcolor: "secondary.main",
              fontWeight: 800,
              borderRadius: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              boxShadow: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "secondary.dark",
                color: "#FFFFFF",
                boxShadow: "0 8px 20px rgba(186, 137, 146, 0.3)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Volver al Inicio
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
