import React from "react";

import { Box, Typography, Container, Grid } from "@mui/material";
// Importamos Grid desde Grid2 para evitar fallos con la prop size
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { motion } from "framer-motion";
import Marquee from "../components/Marquee";
// Forzamos la importación limpia para evitar el error de "got: object"
// ---- VARIANTES DE ANIMACIÓN (SUAVES Y REFINADAS) ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const BeneficiosGrid = () => {
  const items = [
    {
      icon: <SchoolOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Aprende con Másteres",
      desc: "Clases impartidas por profesionales reconocidos a nivel nacional e internacional con experiencia real.",
      teach:
        "Carolina Tavera  •  Daniel Escobar  •  Marlene Castro  •  Karmen Medina  •  Yazmin Guadarrama  •  ",
    },
    {
      icon: <WorkspacePremiumOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Certificación Oficial",
      desc: "Al concluir tus talleres recibes un reconocimiento con valor curricular que respalda tu talento en la industria.",
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Aparta desde 30%",
      desc: "Inicia tu capacitación sin presiones financieras. Asegura tu lugar en el grupo con un pago inicial mínimo.",
    },
    {
      icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 28 }} />,
      title: "Kit de Producto Incluido",
      desc: "Acceso a lanzamientos exclusivos de la marca y material técnico de la línea original Wapizima.",
    },
  ];

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 14 },
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9FC 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Aura rosa de fondo estilizada */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          right: "-5%",
          width: { xs: 400, md: 650 },
          height: { xs: 400, md: 650 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229, 56, 136, 0.05) 0%, transparent 70%)",
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
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* 1. COLUMNA IZQUIERDA: BLOQUE EDITORIAL DE TÍTULO */}
          <Grid size={{ xs: 12, lg: 4.5 }}>
            <Box sx={{ position: { lg: "sticky" }, top: "120px" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#E53888",
                  letterSpacing: "3px",
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
                  fontWeight: 900,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3rem",
                    lg: "3.2rem",
                  },
                  lineHeight: 1.15,
                  letterSpacing: "-0.8px",
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
                      "linear-gradient(90deg, #E53888 10%, #FF7EB8 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                    mt: 0.5,
                  }}
                >
                  Wapizima
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "#655F62",
                  fontSize: "0.98rem",
                  lineHeight: 1.65,
                  fontWeight: 500,
                  textAlign: "center",
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: { lg: "340px" },
                }}
              >
                Diseñamos una experiencia educativa de primer nivel para que
                desarrolles tu talento con herramientas, soporte y
                certificaciones líderes en el mundo de las uñas.
              </Typography>
            </Box>
          </Grid>

          {/* 2. COLUMNA DERECHA: GRID DE TARJETAS */}
          <Grid size={{ xs: 12, lg: 7.5 }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {items.map((item, index) => (
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <motion.div
                    variants={itemVariants}
                    style={{ height: "100%" }}
                  >
                    <Box
                      sx={{
                        p: { xs: 4, md: 4.5 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "24px",
                        border: "1px solid rgba(245, 79, 156, 0.08)",
                        boxShadow: "0px 12px 32px rgba(245, 79, 156, 0.015)",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "relative",
                        overflow: "hidden",

                        "&:hover": {
                          transform: "translateY(-5px)",
                          borderColor: "rgba(229, 56, 136, 0.25)",
                          boxShadow: "0px 20px 40px rgba(229, 56, 136, 0.05)",
                          "& .icon-bg": {
                            background: "#E53888",
                            color: "#FFFFFF",
                            transform: "scale(1.05)",
                          },
                          "& .card-title": {
                            color: "#E53888",
                          },
                        },
                      }}
                    >
                      <Box
                        className='icon-bg'
                        sx={{
                          color: "#E53888",
                          mb: 3.5,
                          p: 1.8,
                          borderRadius: "14px",
                          backgroundColor: "#FFF5F8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography
                        className='card-title'
                        variant='h5'
                        sx={{
                          color: "#1F1A1C",
                          mb: 1.5,
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          textAlign: "center",
                          fontFamily: "'Montserrat', sans-serif",
                          letterSpacing: "-0.2px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant='body2'
                        sx={{
                          color: "#655F62",
                          lineHeight: 1.6,
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          textAlign: "center",
                          mb: item.teach ? 3 : 0,
                        }}
                      >
                        {item.desc}
                      </Typography>

                      {item.teach && (
                        <Box
                          sx={{
                            width: "100%",
                            mt: "auto",
                            pt: 2,
                            borderTop: "1px dashed rgba(229, 56, 136, 0.15)",
                          }}
                        >
                          <Marquee speed={40} gradient={false}>
                            <Typography
                              variant='body2'
                              sx={{
                                color: "#E53888",
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                fontFamily: "'Montserrat', sans-serif",
                                pr: 4,
                                letterSpacing: "0.5px",
                              }}
                            >
                              {item.teach}
                            </Typography>
                          </Marquee>
                        </Box>
                      )}
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
