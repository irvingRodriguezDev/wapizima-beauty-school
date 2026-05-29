import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";

// ---- ESTILOS LUXURY ROSE GOLD ----
const LUXURY_STYLE = {
  roseGoldGradient:
    "linear-gradient(135deg, #ECC4C6 0%, #C3939B 25%, #F0CBD0 50%, #B8858E 75%, #925863 100%)",
  fontSerif: "'Playfair Display', 'Cormorant Garamond', 'Didot', serif",
  fontSans: "'Montserrat', 'Inter', sans-serif",
  // Efecto cristal/espejo sutil para las tarjetas de beneficios
  glassCard: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
    borderRadius: "24px",
    border: "1px solid rgba(195, 147, 155, 0.18)",
    boxShadow: "0px 10px 30px rgba(146, 88, 99, 0.04)",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const BeneficiosGrid = ({ onDiscoverLocations }) => {
  const items = [
    {
      icon: <SchoolIcon sx={{ fontSize: 38 }} />,
      title: "Aprende con Másteres",
      desc: "Clases impartidas por profesionales reconocidos a nivel nacional e internacional.",
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 38 }} />,
      title: "Certificación Oficial",
      desc: "Al concluir tus talleres recibes un reconocimiento con valor curricular garantizado.",
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 38 }} />,
      title: "Aparta con el 10%",
      desc: "Inicia tu capacitación sin presiones financieras. Asegura tu lugar con un pago inicial mínimo.",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 38 }} />,
      title: "Kit de Producto Incluido",
      desc: "Acceso a lanzamientos exclusivos y material de la línea original Wapizima.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "#FAF6F6",
        position: "relative",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* 1. TÍTULO PREMIUM DE SECCIÓN */}
        <Grid container sx={{ px: 2, justifyContent: "center" }}>
          <Grid size={12} sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <Typography
              variant='h2'
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                letterSpacing: "-1px",
                color: "#212121",
                fontFamily: LUXURY_STYLE.fontSans,
              }}
            >
              Los beneficios de estudiar en{" "}
              <Box
                component='span'
                sx={{
                  fontFamily: LUXURY_STYLE.fontSerif,
                  fontStyle: "italic",
                  fontWeight: "400",
                  background: LUXURY_STYLE.roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Wapizima
              </Box>
            </Typography>
          </Grid>

          {/* 2. GRID DE TARJETAS CON GLASSMORPHISM */}
          <Grid size={12}>
            <Grid container spacing={3} sx={{ justifyContent: "center" }}>
              {items.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={index}>
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        ...LUXURY_STYLE.glassCard,
                        textAlign: "center",
                        p: 4,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          background: "#FFFFFF",
                          boxShadow: "0px 20px 40px rgba(146, 88, 99, 0.1)",
                          borderColor: "rgba(195, 147, 155, 0.4)",
                        },
                      }}
                    >
                      {/* Ícono Cromado Metálico */}
                      <Box
                        sx={{
                          background: LUXURY_STYLE.roseGoldGradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          mb: 2.5,
                          filter:
                            "drop-shadow(0px 4px 6px rgba(146, 88, 99, 0.2))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography
                        variant='h6'
                        sx={{
                          color: "#212121",
                          mb: 1.5,
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          fontFamily: LUXURY_STYLE.fontSans,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant='body2'
                        sx={{
                          color: "#5A5455",
                          lineHeight: 1.7,
                          fontSize: "0.92rem",
                          fontFamily: LUXURY_STYLE.fontSans,
                          fontWeight: 400,
                          textAlign: "justify",
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
      </motion.div>
    </Box>
  );
};

export default BeneficiosGrid;
