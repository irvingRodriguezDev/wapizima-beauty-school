import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ---- VARIANTES DE ANIMACIÓN (FRAMER MOTION) ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const sparkVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    rotate: [0, 15, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const Hero = ({ onDiscoverLocations }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 85% 20%, rgba(240, 98, 146, 0.08) 0%, rgba(255, 255, 255, 0) 60%)",
        py: { xs: 8, md: 14 },
      }}
    >
      {/* ---- DECORACIONES SUTILES DE FONDO (0 BYTES EN IMÁGENES) ---- */}
      <Box
        component={motion.div}
        variants={sparkVariants}
        animate='animate'
        sx={{
          position: "absolute",
          top: "15%",
          right: "10%",
          color: "#f8bbd0",
          display: { xs: "none", md: "block" },
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 60 }} />
      </Box>

      <Box
        component={motion.div}
        variants={sparkVariants}
        animate='animate'
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          color: "#fdf2f5",
          display: { xs: "none", md: "block" },
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 40, transform: "scaleX(-1)" }} />
      </Box>

      <Container maxWidth='2xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <Grid
            container
            spacing={4}
            justifyContent='center'
            alignItems='center'
          >
            {/* 1. BADGE SUPERIOR DE MARCA */}
            <Grid size={12}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 18 }} />
                  <Typography
                    variant='caption'
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "4px",
                      fontWeight: 800,
                      color: "#f06292",
                    }}
                  >
                    FORJANDO LÍDERES EN EL ARTE DE LAS UÑAS
                  </Typography>
                  <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 18 }} />
                </Box>
              </motion.div>
            </Grid>

            {/* 2. COPYS COMPRENSIVOS DE ALTO IMPACTO */}
            <Grid size={12}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant='h1'
                  align='center'
                  sx={{
                    fontWeight: 900,
                    color: "#1a1a1a",
                    lineHeight: { xs: 1.1, md: 1.05 },
                    fontSize: { xs: "2.8rem", sm: "4.2rem", md: "5.5rem" },
                    letterSpacing: "-2px",
                    mb: 3,
                  }}
                >
                  EL PODER DE CREAR <br />
                  <Box
                    component='span'
                    sx={{
                      fontStyle: "italic",
                      background:
                        "linear-gradient(45deg, #d81b60 30%, #f06292 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "serif",
                      fontWeight: "400",
                      px: 2,
                    }}
                  >
                    TU PROPIO IMPERIO.
                  </Box>
                </Typography>
              </motion.div>
            </Grid>

            {/* 3. PARRAFO PRINCIPAL EMPOWERED */}
            <Grid size={12}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant='body1'
                  align='center'
                  sx={{
                    color: "#555",
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    lineHeight: 1.8,
                    mb: 5,
                    fontWeight: 400,
                  }}
                >
                  No solo te enseñamos una técnica, te entregamos las llaves de
                  tu libertad financiera. Conviértete en una máster
                  internacional con programas de alto rendimiento diseñados para
                  transformar tu pasión en un negocio imparable.
                </Typography>
              </motion.div>
            </Grid>

            {/* 4. LLAMADO A LA ACCIÓN CENTRALIZADO */}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
