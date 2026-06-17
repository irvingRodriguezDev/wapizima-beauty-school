import React from "react";
// Importación estricta del nuevo Grid2 como Grid
import { Grid, Typography, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Layout from "../components/Landing/Layout";

// Variantes de Framer Motion con curvas de aceleración premium (Cubic Bezier)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] },
  },
};

const COLORS = {
  primary: "#D82E7A", // Rosa Intenso Wapizima
  accent: "#E53888", // Rosa Vibrante
  darkText: "#212121", // Negro Orgánico
  softText: "#554D4F", // Gris Editorial
  studioBg: "#FFFBFD", // Crema Translúcido Suave
  white: "#FFFFFF",
};

const QuienesSomos = () => {
  return (
    <Layout>
      {/* CONTENEDOR PRINCIPAL CON LIENZO DE LUZ SUTIL */}
      <Grid
        container
        sx={{
          minHeight: "85vh",
          py: { xs: 8, md: 12 },
          background: "#FAFAFA",
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(229, 56, 136, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(216, 46, 122, 0.02) 0%, transparent 45%)
          `,
          alignItems: "center",
        }}
      >
        <Container maxWidth='lg'>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            component={motion.from}
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* TAG DE CATEGORÍA EDITORIAL */}
            <Grid
              size={12}
              id='quienes-somos'
              component={motion.div}
              variants={itemVariants}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Stack
                direction='row'
                spacing={1.2}
                sx={{ alignItems: "center" }}
              >
                <AutoAwesomeIcon sx={{ color: COLORS.accent, fontSize: 16 }} />
                <Typography
                  variant='caption'
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "4px",
                    fontWeight: 800,
                    color: COLORS.primary,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                  }}
                >
                  Nuestra Esencia
                </Typography>
              </Stack>
            </Grid>

            {/* TÍTULO PRINCIPAL DE ALTA IMPACTACIÓN */}
            <Grid size={12} component={motion.div} variants={itemVariants}>
              <Typography
                variant='h2'
                component='h1'
                sx={{
                  fontWeight: 900,
                  color: COLORS.darkText,
                  fontSize: { xs: "2.4rem", sm: "3rem", md: "4rem" },
                  lineHeight: 1.15,
                  letterSpacing: "-0.8px",
                  fontFamily: "'Montserrat', sans-serif",
                  mb: 1,
                }}
              >
                Creamos el arte que <br />
                <Grid
                  component='span'
                  sx={{
                    fontStyle: "italic",
                    color: COLORS.accent,
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                  }}
                >
                  redefine industrias.
                </Grid>
              </Typography>
            </Grid>

            {/* PÁRRAFOS DE INTRODUCCIÓN ASIMÉTRICOS */}
            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={itemVariants}
            >
              <Typography
                variant='body1'
                sx={{
                  color: COLORS.darkText,
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  lineHeight: 1.85,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "justify",
                }}
              >
                En <strong>Wapizima Beauty School</strong> no creemos en los
                límites. Nacimos con el propósito firme de revolucionar el mundo
                del estilismo y la aplicación de uñas, fusionando la más alta
                calidad técnica con una mentalidad empresarial implacable.
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={itemVariants}
            >
              <Typography
                variant='body1'
                sx={{
                  color: COLORS.softText,
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  lineHeight: 1.85,
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "justify",
                }}
              >
                Más que una escuela, somos un movimiento de empoderamiento.
                Diseñamos espacios donde la creatividad florece y se convierte
                en libertad financiera, respaldando a cada una de nuestras
                alumnas con certificaciones oficiales y el prestigio de una
                marca líder en el mercado.
              </Typography>
            </Grid>

            {/* TARJETA DE MISIÓN */}
            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Grid
                container
                sx={{
                  p: { xs: 4, sm: 5 },
                  borderRadius: "32px",
                  border: "1px solid rgba(229, 56, 136, 0.12)",
                  backgroundColor: COLORS.studioBg,
                  boxShadow: "0px 10px 30px rgba(42, 36, 38, 0.01)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  height: "100%", // Mantiene las tarjetas alineadas en la misma altura
                  "&:hover": {
                    borderColor: COLORS.accent,
                    boxShadow: "0px 24px 48px rgba(229, 56, 136, 0.04)",
                  },
                }}
              >
                <Grid size={12}>
                  <Typography
                    variant='h6'
                    component='h3'
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: COLORS.darkText,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontFamily: "'Montserrat', sans-serif",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Grid component='span' sx={{ color: COLORS.accent }}>
                      ✦
                    </Grid>{" "}
                    Nuestra Misión
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: COLORS.softText,
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "justify",
                    }}
                  >
                    Dotar a miles de mujeres de las herramientas artísticas y
                    comerciales necesarias para adueñarse de su futuro económico
                    con total seguridad.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* TARJETA DE VISIÓN */}
            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Grid
                container
                sx={{
                  p: { xs: 4, sm: 5 },
                  borderRadius: "32px",
                  border: "1px solid rgba(229, 56, 136, 0.12)",
                  backgroundColor: COLORS.white,
                  boxShadow: "0px 10px 30px rgba(42, 36, 38, 0.01)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  height: "100%",
                  "&:hover": {
                    borderColor: COLORS.accent,
                    boxShadow: "0px 24px 48px rgba(229, 56, 136, 0.04)",
                  },
                }}
              >
                <Grid size={12}>
                  <Typography
                    variant='h6'
                    component='h3'
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: COLORS.darkText,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontFamily: "'Montserrat', sans-serif",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Grid component='span' sx={{ color: COLORS.accent }}>
                      ✦
                    </Grid>{" "}
                    La Visión
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: COLORS.darkText,
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "justify",
                    }}
                  >
                    Consolidarnos como la red de academias de belleza más
                    prestigiosa, innovadora y cercana del país, elevando el
                    estándar de la educación técnica profesional.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Layout>
  );
};

export default QuienesSomos;
