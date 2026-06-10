import React from "react";
import { Box, Typography, Grid, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Layout from "../components/Landing/Layout";

// Variantes de Framer Motion optimizadas para un escalado sutil de alta costura
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] },
  },
};

const QuienesSomos = () => {
  return (
    <Layout>
      <Box
        id='quienes-somos'
        sx={{
          py: { xs: 12, md: 18 },
          backgroundColor: "#FFFFFF", // Fondo puro para contrastar con las secciones crema radiales
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={{ xs: 8, md: 12 }} alignItems='center'>
            {/* COLUMNA IZQUIERDA: MANIFIESTO EDITORIAL (TEXTO DE PODER) */}
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {/* Etiqueta superior estilo pasarela */}
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1.2}
                  sx={{ mb: 2.5 }}
                >
                  <AutoAwesomeIcon sx={{ color: "#E53888", fontSize: 14 }} />
                  <Typography
                    variant='caption'
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      fontWeight: 700,
                      color: "#D82E7A", // Rosa Intenso
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    Nuestra Esencia
                  </Typography>
                </Stack>

                {/* Encabezado Principal Serif */}
                <Box component={motion.div} variants={textVariants}>
                  <Typography
                    variant='h2'
                    component='h2'
                    sx={{
                      fontWeight: 900,
                      color: "#212121",
                      fontSize: { xs: "2.2rem", md: "3.4rem" },
                      lineHeight: 1.15,
                      letterSpacing: "-0.5px",
                      fontFamily: "'Montserrat', sans-serif",
                      mb: 4,
                    }}
                  >
                    Creamos el arte que <br />
                    <Box
                      component='span'
                      sx={{
                        fontStyle: "italic",
                        color: "#E53888",
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: "400",
                      }}
                    >
                      redefine industrias.
                    </Box>
                  </Typography>
                </Box>

                {/* Párrafos de Cuerpo Editoriales */}
                <Box component={motion.div} variants={textVariants}>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "#212121",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                      mb: 3,
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "left", // Alineación limpia natural
                    }}
                  >
                    En <strong>Wapizima Beauty School</strong> no creemos en los
                    límites. Nacimos con el propósito firme de revolucionar el
                    mundo del estilismo y la aplicación de uñas, fusionando la
                    más alta calidad técnica con una mentalidad empresarial
                    implacable.
                  </Typography>

                  <Typography
                    variant='body1'
                    sx={{
                      color: "#554D4F",
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "left",
                    }}
                  >
                    Más que una escuela, somos un movimiento de empoderamiento.
                    Diseñamos espacios donde la creatividad florece y se
                    convierte en libertad financiera, respaldando a cada una de
                    nuestras alumnas con certificaciones oficiales y el
                    prestigio de una marca líder en el mercado.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* COLUMNA DERECHA: LOS PILARES EN DISEÑO PREMIUM */}
            <Grid item xs={12} md={6}>
              <Stack
                spacing={3.5}
                component={motion.div}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {/* Pilar 1: Misión (Bloque Premium Estilizado) */}
                <Box
                  variants={cardVariants}
                  component={motion.div}
                  sx={{
                    p: { xs: 4, sm: 5 },
                    borderRadius: "24px", // Esquinas suaves integradas
                    border: "1px solid rgba(244, 114, 182, 0.18)",
                    backgroundColor: "#FFFBFD", // Crema translúcido suave de estudio
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      borderColor: "#E53888",
                      boxShadow: "0px 12px 35px rgba(229, 56, 136, 0.04)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant='h4'
                    component='h3'
                    mb={2}
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#212121",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    ✦ Nuestra Misión
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "#554D4F",
                      fontSize: "0.92rem",
                      lineHeight: 1.75,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "left",
                    }}
                  >
                    Dotar a miles de mujeres de las herramientas artísticas y
                    comerciales necesarias para adueñarse de su futuro económico
                    con total seguridad.
                  </Typography>
                </Box>

                {/* Pilar 2: Visión (Bloque Puro Contrastado) */}
                <Box
                  variants={cardVariants}
                  component={motion.div}
                  sx={{
                    p: { xs: 4, sm: 5 },
                    borderRadius: "24px",
                    border: "1px solid rgba(244, 114, 182, 0.18)",
                    backgroundColor: "#FFFFFF", // Blanco puro para mantener ritmo visual asimétrico
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      borderColor: "#E53888",
                      boxShadow: "0px 12px 35px rgba(229, 56, 136, 0.04)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant='h4'
                    component='h3'
                    mb={2}
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#212121",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    ✦ La Visión
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "#554D4F",
                      fontSize: "0.92rem",
                      lineHeight: 1.75,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "left",
                    }}
                  >
                    Consolidarnos como la red de academias de belleza más
                    prestigiosa, innovadora y cercana del país, elevando el
                    estándar de la educación técnica profesional.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default QuienesSomos;
