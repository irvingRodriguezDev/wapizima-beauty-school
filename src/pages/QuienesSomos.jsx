import React from "react";
import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Layout from "../components/Landing/Layout";

// Variantes de Framer Motion optimizadas para una entrada sutil y elegante
const textVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const QuienesSomos = () => {
  return (
    <Layout>
      <Box
        id='quienes-somos'
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: "background.paper", // Fondo puro para contrastar con las secciones crema
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={{ xs: 8, md: 12 }} alignItems='center'>
            {/* COLUMNA IZQUIERDA: MANIFIESTO EDITORIAL (TEXTO DE PODER) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component={motion.div}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Etiqueta superior estilo pasarela */}
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  sx={{ mb: 3 }}
                >
                  <AutoAwesomeIcon
                    sx={{ color: "secondary.main", fontSize: 14 }}
                  />
                  <Typography
                    variant='caption'
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      fontWeight: 800,
                      color: "secondary.main", // Rosa Viejo Satinado
                    }}
                  >
                    Nuestra Esencia
                  </Typography>
                </Stack>

                {/* Encabezado Principal Serif */}
                <motion.div variants={textVariants}>
                  <Typography
                    variant='h2'
                    component='h2'
                    sx={{
                      fontWeight: 900,
                      color: "primary.main",
                      fontSize: { xs: "2.4rem", md: "3.4rem" },
                      lineHeight: 1.15,
                      letterSpacing: "0.5px",
                      mb: 4,
                    }}
                  >
                    CREAMOS EL ARTE QUE <br />
                    <Box
                      component='span'
                      sx={{
                        fontStyle: "italic",
                        color: "secondary.main",
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: "400",
                      }}
                    >
                      REDEFINE INDUSTRIAS.
                    </Box>
                  </Typography>
                </motion.div>

                {/* Párrafos de Cuerpo Editoriales */}
                <motion.div variants={textVariants}>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "text.primary",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                      mb: 3,
                      fontWeight: 500,
                      textAlign: "justify",
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
                      color: "text.secondary",
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                      textAlign: "justify",
                    }}
                  >
                    Más que una escuela, somos un movimiento de empoderamiento.
                    Diseñamos espacios donde la creatividad florece y se
                    convierte en libertad financiera, respaldando a cada una de
                    nuestras alumnas con certificaciones oficiales y el
                    prestigio de una marca líder en el mercado.
                  </Typography>
                </motion.div>
              </Box>
            </Grid>

            {/* COLUMNA DERECHA: LOS PILARES EN DISEÑO PLANO (PREMIUM) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                spacing={4}
                component={motion.div}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.15 }}
              >
                {/* Pilar 1: Misión (Bloque plano crema con trazo sutil) */}
                <Box
                  variants={cardVariants}
                  component={motion.div}
                  sx={{
                    p: 4,
                    borderRadius: "12px", // Ortogonal puro para evitar el look genérico redondeado
                    border: "1px solid",
                    borderColor: "rgba(186, 137, 146, 0.2)",
                    bgcolor: "background.default", // Crema suave de estudio fotográfico
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant='h4'
                    component='h3'
                    color='primary.main'
                    mb={2}
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    ✦ Nuestra Misión
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      textAlign: "justify",
                    }}
                  >
                    Dotar a miles de mujeres de las herramientas artísticas y
                    comerciales necesarias para adueñarse de su futuro económico
                    con total seguridad.
                  </Typography>
                </Box>

                {/* Pilar 2: Visión (Bloque plano blanco puro contrastado) */}
                <Box
                  variants={cardVariants}
                  component={motion.div}
                  sx={{
                    p: 4,
                    borderRadius: "12px", // Consistencia arquitectónica recta
                    border: "1px solid",
                    borderColor: "rgba(45, 37, 38, 0.08)",
                    bgcolor: "background.paper", // Blanco para generar ritmo visual entre pilares
                    boxShadow: "none", // Cero sombras complejas para conservar el rendimiento flat en móviles
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant='h4'
                    component='h3'
                    color='primary.main'
                    mb={2}
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    ✦ La Visión
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      textAlign: "justify",
                    }}
                  >
                    Consolidarnos como la red de academias de belleza más
                    prestigiosa, innovadora y cercana del país, elevando el
                    estándar de la educación técnica.
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
