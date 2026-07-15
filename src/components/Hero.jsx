import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SouthIcon from "@mui/icons-material/South";
// ---- VARIANTES DE ANIMACIÓN (FRAMER MOTION) ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Ease cúbico premium
  },
};

const sparkVariants = {
  animate: {
    scale: [1, 1.12, 1],
    opacity: [0.3, 0.7, 0.3],
    rotate: [0, 8, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const Hero = ({ onDiscoverLocations }) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: { xs: "auto", md: "65vh" },
          display: "flex",
          alignItems: "center",
          // TRUCO DE UI: Fondo base limpio con esferas radiales (3 rosas) difuminadas al extremo
          background: "#FFFBFD",
          backgroundImage: `
          radial-gradient(circle at 10% 15%, rgba(255, 240, 245, 0.9) 0%, transparent 40%),
          radial-gradient(circle at 85% 20%, rgba(244, 114, 182, 0.18) 0%, rgba(255, 240, 245, 0.5) 35%, transparent 70%),
          radial-gradient(circle at 50% 90%, rgba(229, 56, 136, 0.05) 0%, transparent 50%)
        `,
          py: { xs: 12, md: 1 },
        }}
      >
        {/* ---- DECORACIONES SUTILES CON EL ROSA DE LA MARCA ---- */}
        <Box
          component={motion.div}
          variants={sparkVariants}
          animate='animate'
          sx={{
            position: "absolute",
            top: "15%",
            right: "10%",
            color: "rgba(244, 114, 182, 0.9)",
            display: { xs: "none", md: "block" },
            filter: "drop-shadow(0px 4px 12px rgba(229, 56, 136, 0.15))",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 45 }} />
        </Box>
        <Box
          component={motion.div}
          variants={sparkVariants}
          animate='animate'
          sx={{
            position: "absolute",
            top: "15%",
            left: "10%",
            color: "rgba(244, 114, 182, 0.9)",
            display: { xs: "none", md: "block" },
            filter: "drop-shadow(0px 4px 12px rgba(229, 56, 136, 0.15))",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 45 }} />
        </Box>
        <Box
          component={motion.div}
          variants={sparkVariants}
          animate='animate'
          sx={{
            position: "absolute",
            bottom: "18%",
            left: "8%",
            color: "rgba(229, 56, 136, 0.9)",
            display: { xs: "none", md: "block" },
            filter: "drop-shadow(0px 4px 12px rgba(229, 56, 136, 0.1))",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 30, transform: "scaleX(-1)" }} />
        </Box>
        <Box
          component={motion.div}
          variants={sparkVariants}
          animate='animate'
          sx={{
            position: "absolute",
            bottom: "18%",
            right: "8%",
            color: "rgba(229, 56, 136, 0.9)",
            display: { xs: "none", md: "block" },
            filter: "drop-shadow(0px 4px 12px rgba(229, 56, 136, 0.1))",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 30, transform: "scaleX(-1)" }} />
        </Box>

        <Container maxWidth='lg'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <Grid container sx={{ justifyContent: "center" }}>
              {/* 1. BADGE SUPERIOR DE MARCA REFINADO */}
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 5,
                      px: 3,
                      py: 1,
                      borderRadius: "50px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(244, 114, 182, 0.25)",
                      boxShadow: "0px 8px 24px rgba(229, 56, 136, 0.04)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <AutoAwesomeIcon sx={{ color: "#E53888", fontSize: 13 }} />
                    <Typography
                      variant='caption'
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "4px",
                        fontWeight: 700,
                        fontSize: { xs: "0.68rem", sm: "0.75rem" },
                        color: "#E53888",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      FORJANDO LÍDERES EN EL ARTE DE LAS UÑAS
                    </Typography>
                    <AutoAwesomeIcon sx={{ color: "#E53888", fontSize: 13 }} />
                  </Box>
                </motion.div>
              </Grid>

              {/* 2. TITULAR PRINCIPAL CON TIPOGRAFÍA EDITORIAL (SERIF + ITALIC REAL) */}
              <Grid size={12}>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant='h1'
                    align='center'
                    sx={{
                      fontWeight: 900,
                      color: "#212121",
                      lineHeight: { xs: 1.2, md: 1.15 },
                      fontSize: { xs: "2.4rem", sm: "3.8rem", md: "5rem" },
                      letterSpacing: "-0.5px",
                      mb: 4,
                    }}
                  >
                    EL PODER DE CREAR <br />
                    <Box
                      component='span'
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontWeight: "400",
                        // Gradiente de 3 tonos de rosa aplicado directamente al texto
                        background:
                          "linear-gradient(90deg, #E53888 0%, #F472B6 50%, #D82E7A 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        px: { xs: 0, sm: 2 },
                        display: "inline-block",
                      }}
                    >
                      TU PROPIO IMPERIO.
                    </Box>
                  </Typography>
                </motion.div>
              </Grid>

              {/* 3. PÁRRAFO EMPOWERED CON TIPOGRAFÍA ALTAMENTE LEGIBLE */}
              <Grid size={{ xs: 12, sm: 10, md: 9 }}>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant='body1'
                    align='center'
                    sx={{
                      color: "#554D4F",
                      fontSize: { xs: "1.05rem", md: "1.2rem" },
                      lineHeight: 1.8,
                      mb: 6,
                      fontFamily: "'Inter', sans-serif", // Limpieza absoluta para lectura
                    }}
                  >
                    No solo te enseñamos una técnica, te entregamos las llaves
                    de tu{" "}
                    <strong style={{ color: "#212121", fontWeight: 600 }}>
                      libertad financiera
                    </strong>
                    . Conviértete en una máster internacional con programas de
                    alto rendimiento diseñados para transformar tu pasión en un
                    negocio imparable.
                  </Typography>
                </motion.div>
              </Grid>

              {/* 4. LLAMADO A LA ACCIÓN CON EL ROSA EMBAJADOR */}
              {/* <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={onDiscoverLocations}
                    variant='outlined'
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      letterSpacing: "1.5px",
                      borderRadius: "12px",
                      color: "#E1218A",
                      px: 6,
                      py: 2.2,
                      bgcolor: "transparent",
                      borderColor: "#E1218A",
                      boxShadow: "0px 12px 30px rgba(229, 56, 136, 0.25)",
                      "&:hover": {
                        boxShadow: "0px 16px 35px rgba(229, 56, 136, 0.4)",
                      },
                    }}
                  >
                    Comienza tu transformación aquí{" "}
                  </Button>
                </motion.div>
              </Grid> */}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
