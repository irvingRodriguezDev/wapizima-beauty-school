import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";

// ---- VARIANTES DE ANIMACIÓN (FRAMER MOTION) ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const BeneficiosGrid = () => {
  const items = [
    {
      icon: <SchoolIcon sx={{ fontSize: 36 }} />,
      title: "Aprende con Másteres",
      desc: "Clases impartidas por profesionales reconocidos a nivel nacional e internacional.",
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 36 }} />,
      title: "Certificación Oficial",
      desc: "Al concluir tus talleres recibes un reconocimiento con valor curricular garantizado.",
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 36 }} />,
      title: "Aparta con el 10%",
      desc: "Inicia tu capacitación sin presiones financieras. Asegura tu lugar con un pago inicial mínimo.",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 36 }} />,
      title: "Kit de Producto Incluido",
      desc: "Acceso a lanzamientos exclusivos y material de la línea original Wapizima.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "#FFFBFD",
        backgroundImage: `
          radial-gradient(circle at 10% 15%, rgba(255, 240, 245, 0.9) 0%, transparent 40%),
          radial-gradient(circle at 85% 20%, rgba(244, 114, 182, 0.18) 0%, rgba(255, 240, 245, 0.5) 35%, transparent 70%),
          radial-gradient(circle at 50% 90%, rgba(229, 56, 136, 0.05) 0%, transparent 50%)
        `,
        position: "relative",
      }}
    >
      <Container maxWidth='xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container justifyContent='center'>
            {/* 1. TÍTULO DE SECCIÓN EDITORIAL */}
            <Grid size={12} sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
              <Typography
                variant='h2'
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", sm: "2.6rem", md: "3.4rem" },
                  letterSpacing: "-0.5px",
                  color: "#212121",
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
                      "linear-gradient(90deg, #E53888 0%, #F472B6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    px: 1,
                  }}
                >
                  Wapizima
                </Box>
              </Typography>
            </Grid>

            {/* 2. GRID DE TARJETAS FLOTANTES ROSA PREMIUM */}
            <Grid size={12}>
              <Grid container spacing={4} justifyContent='center'>
                {items.map((item, index) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                    key={index}
                  >
                    <motion.div
                      variants={itemVariants}
                      style={{ height: "100%" }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 4,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "24px",
                          border: "1px solid rgba(244, 114, 182, 0.15)", // Borde rosa ultra traslúcido
                          boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.02)",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          // Microinteracción Premium al pasar el cursor
                          "&:hover": {
                            transform: "translateY(-8px)",
                            borderColor: "rgba(229, 56, 136, 0.3)",
                            // Sutil aura rosa difuminada que simula iluminación desde atrás
                            boxShadow: "0px 20px 40px rgba(229, 56, 136, 0.08)",
                            "& .icon-container": {
                              transform: "scale(1.1)",
                              color: "#D82E7A",
                            },
                          },
                        }}
                      >
                        {/* Contenedor del Ícono con Transición */}
                        <Box
                          className='icon-container'
                          sx={{
                            color: "#E53888", // Rosa principal nativo
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition:
                              "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            filter:
                              "drop-shadow(0px 4px 8px rgba(229, 56, 136, 0.15))",
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Typography
                          variant='h6'
                          sx={{
                            color: "#212121",
                            mb: 2,
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant='body2'
                          sx={{
                            color: "#554D4F",
                            lineHeight: 1.7,
                            fontSize: "0.92rem",
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                            textAlign: "center", // Alineación centrada para un look de tarjetas más simétrico e internacional
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
      </Container>
    </Box>
  );
};

export default BeneficiosGrid;
