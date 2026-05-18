import React from "react";
import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Layout from "../components/Landing/Layout";

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const QuienesSomos = () => {
  return (
    <Layout>
      <Box
        id='quienes-somos'
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: "#fff",
          position: "relative",
          overflow: "hidden",
          // Un sutil gradiente de fondo en la esquina opuesta al Hero para equilibrar visualmente
          background:
            "radial-gradient(circle at 15% 80%, rgba(240, 98, 146, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
        }}
      >
        <Container maxWidth='2xl'>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems='center'>
            {/* COLUMNA IZQUIERDA: MANIFIESTO EDITORIAL (TEXTO DE PODER) */}
            <Grid size={12}>
              <Box
                component={motion.div}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-100px" }}
              >
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  sx={{ mb: 3 }}
                >
                  <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 16 }} />
                  <Typography
                    variant='caption'
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      fontWeight: 800,
                      color: "#f06292",
                    }}
                  >
                    Nuestra Esencia
                  </Typography>
                </Stack>

                <motion.div variants={textVariants}>
                  <Typography
                    variant='h3'
                    component='h2'
                    sx={{
                      fontWeight: 900,
                      color: "#1a1a1a",
                      fontSize: { xs: "2.4rem", md: "3.8rem" },
                      lineHeight: 1.1,
                      letterSpacing: "-1.5px",
                      mb: 4,
                    }}
                  >
                    CREAMOS EL ARTE QUE <br />
                    <Box
                      component='span'
                      sx={{
                        fontStyle: "italic",
                        color: "#f06292",
                        fontFamily: "serif",
                        fontWeight: "400",
                      }}
                    >
                      REDEFINE INDUSTRIAS.
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div variants={textVariants}>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "#555",
                      fontSize: "1.2rem",
                      lineHeight: 1.8,
                      mb: 3,
                      fontWeight: 400,
                    }}
                  >
                    En **Wapizima Beauty School** no creemos en los límites.
                    Nacimos con el propósito firme de revolucionar el mundo del
                    estilismo y la aplicación de uñas, fusionando la más alta
                    calidad técnica con una mentalidad empresarial implacable.
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: "#666",
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
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
            <Grid size={12}>
              <Stack
                spacing={4}
                component={motion.div}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.15 }}
              >
                {/* Pilar 1: Misión */}
                <Box
                  variants={cardVariants}
                  component={motion.div}
                  sx={{
                    p: 4,
                    borderRadius: "16px",
                    border: "1px solid rgba(240, 98, 146, 0.15)",
                    bgcolor: "#fdf2f5",
                    transition: "border 0.3s",
                    "&:hover": { border: "1px solid rgba(240, 98, 146, 0.4)" },
                  }}
                >
                  <Typography
                    variant='h6'
                    fontWeight='900'
                    color='#1a1a1a'
                    mb={1}
                    sx={{ letterSpacing: "-0.5px" }}
                  >
                    ✦ Nuestra Misión
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#555'
                    sx={{ lineHeight: 1.6 }}
                  >
                    Dotar a miles de mujeres de las herramientas artísticas y
                    comerciales necesarias para adueñarse de su futuro económico
                    con total seguridad.
                  </Typography>
                </Box>

                {/* Pilar 2: Visión */}
                <Box
                  variants={cardVariants}
                  component={motion.div}
                  sx={{
                    p: 4,
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    bgcolor: "#fff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
                    transition: "border 0.3s",
                    "&:hover": { border: "1px solid rgba(240, 98, 146, 0.2)" },
                  }}
                >
                  <Typography
                    variant='h6'
                    fontWeight='900'
                    color='#1a1a1a'
                    mb={1}
                    sx={{ letterSpacing: "-0.5px" }}
                  >
                    ✦ La Visión
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#555'
                    sx={{ lineHeight: 1.6 }}
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
