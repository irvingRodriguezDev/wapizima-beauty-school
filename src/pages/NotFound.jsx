import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Fondo radial limpio con aura rosa Wapizima
        backgroundColor: "#FFFBFD",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(229, 56, 136, 0.05) 0%, transparent 70%)",
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Círculos difusos orgánicos usando Framer Motion para rendimiento óptimo */}
      <Box
        component={motion.div}
        animate={{ x: [0, 15, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          width: { xs: "280px", md: "500px" },
          height: { xs: "280px", md: "500px" },
          top: "-5%",
          right: "-5%",
          borderRadius: "50%",
          background: "rgba(244, 114, 182, 0.15)",
          filter: "blur(90px)",
          zIndex: 1,
        }}
      />
      <Box
        component={motion.div}
        animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        sx={{
          position: "absolute",
          width: { xs: "220px", md: "400px" },
          height: { xs: "220px", md: "400px" },
          bottom: "-5%",
          left: "-5%",
          borderRadius: "50%",
          background: "rgba(216, 46, 122, 0.1)",
          filter: "blur(80px)",
          zIndex: 1,
        }}
      />

      <Container maxWidth='sm' sx={{ position: "relative", zIndex: 2 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: "32px", // Bordes suaves premium
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            backgroundColor: "rgba(255, 255, 255, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0px 24px 60px rgba(229, 56, 136, 0.05)",
          }}
        >
          {/* Icono Destello Animado */}
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            sx={{ display: "inline-block", mb: 1 }}
          >
            <AutoAwesomeIcon sx={{ color: "#E53888", fontSize: "1.8rem" }} />
          </Box>

          {/* Gran 404 Flotante */}
          <Typography
            variant='h1'
            component={motion.div}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            sx={{
              fontSize: { xs: "5.5rem", md: "7.5rem" },
              fontWeight: 900,
              color: "#212121",
              lineHeight: 1,
              letterSpacing: "-3px",
              fontFamily: "'Montserrat', sans-serif",
              mb: 1,
              textShadow: "0px 10px 30px rgba(229, 56, 136, 0.08)",
            }}
          >
            404
          </Typography>

          <Typography
            variant='h4'
            component='h1'
            sx={{
              fontSize: { xs: "1.15rem", md: "1.3rem" },
              fontWeight: 800,
              color: "#212121",
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              fontFamily: "'Montserrat', sans-serif",
              mb: 2.5,
            }}
          >
            Página No Encontrada
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "#554D4F",
              mb: 5,
              lineHeight: 1.75,
              fontSize: "0.95rem",
              fontFamily: "'Inter', sans-serif",
              px: { xs: 0, sm: 2 },
            }}
          >
            El enlace que seguiste podría estar roto o el programa cambió de
            ruta. No te preocupes, el camino hacia{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                color: "#E53888",
                fontWeight: 600,
              }}
            >
              el diseño de tus sueños
            </span>{" "}
            sigue disponible.
          </Typography>

          {/* Botón de regreso estilo cápsula unificada */}
          <Button
            component={RouterLink}
            to='/'
            variant='contained'
            size='large'
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />
            }
            sx={{
              width: { xs: "100%", sm: "auto" },
              px: 4,
              py: 1.8,
              backgroundColor: "#E53888",
              color: "#FFFFFF",
              fontWeight: 700,
              borderRadius: "50px", // Formato de cápsula premium unificada
              letterSpacing: "1px",
              textTransform: "none",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0px 8px 25px rgba(229, 56, 136, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#D82E7A",
                boxShadow: "0px 12px 30px rgba(229, 56, 136, 0.3)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Volver al inicio
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
