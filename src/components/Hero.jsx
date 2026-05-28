import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// 🏆 CONSTANTES DE DISEÑO LUXURY: Paleta Rose Gold Líquido y Metálico
const LUXURY_STYLE = {
  // Gradiente complejo que simula el reflejo de la luz sobre el oro rosa pulido
  roseGoldGradient:
    "linear-gradient(135deg, #ECC4C6 0%, #C3939B 25%, #F0CBD0 50%, #B8858E 75%, #925863 100%)",
  textShadowChrome:
    "2px 2px 4px rgba(146, 88, 99, 0.15), 0px 0px 20px rgba(240, 203, 208, 0.4)",
  fontSerif: "'Playfair Display', 'Cormorant Garamond', 'Didot', serif",
  fontSans: "'Montserrat', 'Inter', sans-serif",
};

// ---- VARIANTES DE ANIMACIÓN (FRAMER MOTION) ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }, // Ease cúbico estilo Apple
};

const sparkVariants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.4, 0.8, 0.4],
    rotate: [0, 10, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

const Hero = ({ onDiscoverLocations }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        // Fondo con iluminación de estudio premium (Doble glow en esquinas opuestas)
        background: `
          radial-gradient(circle at 15% 15%, rgba(240, 203, 208, 0.25) 0%, rgba(255, 255, 255, 0) 50%),
          radial-gradient(circle at 85% 85%, rgba(184, 133, 142, 0.12) 0%, rgba(255, 255, 255, 0) 60%),
          #FAF6F6
        `,
        py: { xs: 10, md: 16 },
      }}
    >
      {/* ---- DECORACIONES PREMIUM (DESTELLOS METÁLICOS FLOTANTES) ---- */}
      <Box
        component={motion.div}
        variants={sparkVariants}
        animate='animate'
        sx={{
          position: "absolute",
          top: "12%",
          right: "12%",
          background: LUXURY_STYLE.roseGoldGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: { xs: "none", md: "block" },
          filter: "drop-shadow(0px 4px 10px rgba(184, 133, 142, 0.3))",
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 50 }} />
      </Box>

      <Box
        component={motion.div}
        variants={sparkVariants}
        animate='animate'
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "8%",
          background: LUXURY_STYLE.roseGoldGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: { xs: "none", md: "block" },
          filter: "drop-shadow(0px 4px 8px rgba(184, 133, 142, 0.2))",
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 35, transform: "scaleX(-1)" }} />
      </Box>

      <Container maxWidth='xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <Grid container justifyContent='center'>
            {/* 1. BADGE SUPERIOR DE MARCA (Look Editorial) */}
            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 4,
                    px: 3,
                    py: 1,
                    borderRadius: "50px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(195, 147, 155, 0.2)",
                    boxShadow: "0px 4px 20px rgba(146, 88, 99, 0.03)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <AutoAwesomeIcon sx={{ color: "#C3939B", fontSize: 14 }} />
                  <Typography
                    variant='caption'
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "5px",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      fontFamily: LUXURY_STYLE.fontSans,
                      color: "#A36D75",
                      textAlign: "center",
                    }}
                  >
                    FORJANDO LÍDERES EN EL ARTE DE LAS UÑAS
                  </Typography>
                  <AutoAwesomeIcon sx={{ color: "#C3939B", fontSize: 14 }} />
                </Box>
              </motion.div>
            </Grid>

            {/* 2. COPYS COMPRENSIVOS DE ALTO IMPACTO (TEXTO CROMADO) */}
            <Grid size={{ xs: 12, lg: 12 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant='h1'
                  align='center'
                  sx={{
                    fontWeight: 900,
                    color: "#212121",
                    lineHeight: { xs: 1.15, md: 1.1 },
                    fontSize: { xs: "2.6rem", sm: "4rem", md: "5.2rem" },
                    letterSpacing: "-1.5px",
                    fontFamily: LUXURY_STYLE.fontSans,
                    mb: 3,
                  }}
                >
                  EL PODER DE CREAR <br />
                  <Box
                    component='span'
                    sx={{
                      fontStyle: "italic",
                      background: LUXURY_STYLE.roseGoldGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: LUXURY_STYLE.fontSerif,
                      fontWeight: "400",
                      px: 2,
                      display: "inline-block",
                      filter: "drop-shadow(0px 2px 2px rgba(146, 88, 99, 0.1))",
                      textShadow: LUXURY_STYLE.textShadowChrome,
                    }}
                  >
                    TU PROPIO IMPERIO.
                  </Box>
                </Typography>
              </motion.div>
            </Grid>

            {/* 3. PARRAFO PRINCIPAL EMPOWERED */}
            <Grid size={{ xs: 12, sm: 9, lg: 12 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant='body1'
                  align='center'
                  sx={{
                    color: "#5A5455",
                    fontSize: { xs: "1.05rem", md: "1.25rem" },
                    lineHeight: 1.8,
                    mb: 6,
                    fontFamily: LUXURY_STYLE.fontSans,
                    fontWeight: 400,
                    letterSpacing: "0.2px",
                  }}
                >
                  No solo te enseñamos una técnica, te entregamos las llaves de
                  tu libertad financiera. Conviértete en una máster
                  internacional con programas de alto rendimiento diseñados para
                  transformar tu pasión en un negocio imparable.
                </Typography>
              </motion.div>
            </Grid>

            {/* 4. LLAMADO A LA ACCIÓN CENTRALIZADO PREMIUM */}
            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
              <motion.div variants={itemVariants}>
                <Button
                  onClick={onDiscoverLocations}
                  variant='contained'
                  endIcon={
                    <ArrowForwardIosIcon sx={{ fontSize: "10px !important" }} />
                  }
                  sx={{
                    background: LUXURY_STYLE.roseGoldGradient,
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "2px",
                    px: 5,
                    py: 2,
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: "0px 10px 30px rgba(184, 133, 142, 0.35)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0px 15px 35px rgba(146, 88, 99, 0.5)",
                      filter: "brightness(1.08)",
                    },
                  }}
                >
                  Comienza tu transformación aquí
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
