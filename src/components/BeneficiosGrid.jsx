import React from "react";
import { Box, Typography, Grid, Container, Stack } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { motion } from "framer-motion";

// ---- VARIANTES DE ANIMACIÓN (ELEGANTES Y SUAVES) ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const BeneficiosGrid = () => {
  // Íconos cambiados a sus versiones "Outlined" para un look más fino y minimalista
  const items = [
    {
      icon: <SchoolOutlinedIcon sx={{ fontSize: 32 }} />,
      title: "Aprende con Másteres",
      desc: "Clases impartidas por profesionales reconocidos a nivel nacional e internacional.",
    },
    {
      icon: <WorkspacePremiumOutlinedIcon sx={{ fontSize: 32 }} />,
      title: "Certificación Oficial",
      desc: "Al concluir tus talleres recibes un reconocimiento con valor curricular garantizado.",
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 32 }} />,
      title: "Aparta desde 30%",
      desc: "Inicia tu capacitación sin presiones financieras. Asegura tu lugar con un pago inicial mínimo.",
    },
    {
      icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 32 }} />,
      title: "Kit de Producto Incluido",
      desc: "Acceso a lanzamientos exclusivos y material de la línea original Wapizima.",
    },
  ];

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 10, md: 16 },
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Aura rosa de fondo estilo iluminación de pasarela */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 79, 156, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth='xl' sx={{ px: { xs: 3, md: 8 } }}>
        <Grid
          container
          spacing={{ xs: 6, lg: 8 }}
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-120px" }}
        >
          {/* 1. COLUMNA IZQUIERDA: BLOQUE EDITORIAL DE TÍTULO */}
          <Grid size={{ xs: 12, lg: 4 }} sx={{ position: "relative" }}>
            <Box sx={{ position: { lg: "sticky" }, top: "140px" }}>
              {/* Mini tag de sección */}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#E53888",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  mb: 2,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                — Tu Futuro Profesional
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "2.4rem",
                    sm: "2.8rem",
                    md: "3.2rem",
                    lg: "3.5rem",
                  },
                  lineHeight: 1.15,
                  letterSpacing: "-1px",
                  color: "#1F1A1C",
                  mb: 3,
                }}
              >
                Los beneficios de estudiar en{" "}
                <Box
                  component='span'
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontWeight: "400",
                    background:
                      "linear-gradient(90deg, #E53888 0%, #FF7EB8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                    mt: 1,
                  }}
                >
                  Wapizima
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "#655F62",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  maxWidth: { lg: "320px" },
                }}
              >
                Diseñamos una experiencia educativa premium para que desarrolles
                tu talento con herramientas y certificaciones líderes en la
                industria de las uñas.
              </Typography>
            </Box>
          </Grid>

          {/* 2. COLUMNA DERECHA: GRID DE TARJETAS ASIMÉTRICAS */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {items.map((item, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div
                    variants={itemVariants}
                    style={{ height: "100%" }}
                  >
                    <Box
                      sx={{
                        p: { xs: 4, md: 5 },
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Alineación a la izquierda para un look más moderno/editorial
                        backgroundColor: "#FFFFFF",
                        borderRadius: "32px", // Esquinas más amplias y orgánicas
                        border: "1px solid rgba(245, 79, 156, 0.06)",
                        boxShadow: "0px 16px 40px rgba(245, 79, 156, 0.02)",
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "relative",
                        overflow: "hidden",

                        "&:hover": {
                          transform: "translateY(-6px)",
                          borderColor: "rgba(245, 79, 156, 0.2)",
                          boxShadow: "0px 24px 48px rgba(245, 79, 156, 0.06)",
                          "& .icon-bg": {
                            background: "rgba(245, 79, 156, 0.08)",
                            color: "#E53888",
                            transform: "rotate(4deg) scale(1.05)",
                          },
                        },
                      }}
                    >
                      {/* Contenedor del Ícono tipo Badge Flotante */}
                      <Box
                        className='icon-bg'
                        sx={{
                          color: "#655F62", // Color neutro al inicio para no saturar visualmente
                          mb: 4,
                          p: 2,
                          borderRadius: "18px",
                          backgroundColor: "#FFF5F8", // Fondo rosa muy sutil
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography
                        variant='h5'
                        sx={{
                          color: "#1F1A1C",
                          mb: 1.5,
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          fontFamily: "'Montserrat', sans-serif",
                          letterSpacing: "-0.2px",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant='body2'
                        sx={{
                          color: "#655F62",
                          lineHeight: 1.65,
                          fontSize: "0.92rem",
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          textAlign: "center",
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BeneficiosGrid;
