import React from "react";
import { Box, Typography, Grid, Button, Stack, Container } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Layout from "../components/Landing/Layout";

// ---- ANIMACIONES DINÁMICAS DE ENTRADA ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const cardLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const FranquiciasSection = () => {
  return (
    <Layout>
      <Box
        id='franquicias'
        sx={{
          py: { xs: 12, md: 22 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* LÍNEA DE FLUIDO CENTRAL DECORATIVA (SUTIL EN MÓVIL, VISIBLE EN DESKTOP) */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "25%",
            bottom: "20%",
            width: "2px",
            background:
              "linear-gradient(to bottom, transparent, rgba(240, 98, 146, 0.3) 15%, rgba(216, 27, 96, 0.3) 85%, transparent)",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "block" },
          }}
        />

        <Container maxWidth='lg'>
          {/* ---- ENCABEZADO REVOLUCIONARIO ---- */}
          <Box sx={{ textAlign: "center", mb: 14 }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 20 }} />
              <Typography
                variant='caption'
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "6px",
                  fontWeight: 900,
                  color: "#f06292",
                }}
              >
                Tu Próximo Gran Éxito Comercial
              </Typography>
            </Stack>
            <Typography
              variant='h2'
              sx={{
                fontWeight: 950,
                fontSize: { xs: "2.8rem", md: "4.5rem" },
                letterSpacing: "-2px",
                lineHeight: 1.05,
                color: "#1a1a1a",
              }}
            >
              DOMINA EL MERCADO CON UN <br />
              <Box
                component='span'
                sx={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(45deg, #d81b60 10%, #f06292 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "serif",
                  fontWeight: "400",
                }}
              >
                MODELO LLAVE EN MANO.
              </Box>
            </Typography>
          </Box>

          {/* ---- FLUJO DINÁMICO EN ZIG-ZAG ---- */}
          <Grid
            container
            spacing={{ xs: 8, md: 12 }}
            component={motion.div}
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* PASO 1: IZQUIERDA */}
            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={cardLeftVariants}
            >
              <Box sx={{ pr: { md: 4 } }}>
                <Stack direction='row' alignItems='center' spacing={2} mb={2}>
                  {/* ESPACIO PARA SVG DE SVG REPO (Eje: Business/Graph SVG) */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      color: "#d81b60",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Pega aquí directamente el <svg> de SVGRepo */}
                    <svg
                      viewBox='0 0 24 24'
                      width='40'
                      height='40'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <line x1='18' y1='20' x2='18' y2='10'></line>
                      <line x1='12' y1='20' x2='12' y2='4'></line>
                      <line x1='6' y1='20' x2='6' y2='14'></line>
                    </svg>
                  </Box>
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 900,
                      color: "rgba(240, 98, 146, 0.4)",
                      fontFamily: "serif",
                    }}
                  >
                    01
                  </Typography>
                </Stack>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 900,
                    color: "#1a1a1a",
                    mb: 2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  SISTEMA DE GESTIÓN TOTALMENTE DIGITALIZADO
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: "#555", lineHeight: 1.8 }}
                >
                  Olvida las complicaciones administrativas. Te entregamos un
                  software exclusivo para el control de matrículas, asistencias,
                  asignación de salones y cobros recurrentes de tus alumnas de
                  manera automática.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 0, md: 6 }} />{" "}
            {/* Espaciador para el efecto Zig-Zag */}
            {/* PASO 2: DERECHA */}
            <Grid size={{ xs: 0, md: 6 }} />
            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={cardRightVariants}
            >
              <Box sx={{ pl: { md: 4 } }}>
                <Stack direction='row' alignItems='center' spacing={2} mb={2}>
                  {/* ESPACIO PARA SVG DE SVG REPO (Eje: Diamond/Premium/Award SVG) */}
                  <Box sx={{ width: 50, height: 50, color: "#d81b60" }}>
                    <svg
                      viewBox='0 0 24 24'
                      width='40'
                      height='40'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polygon points='12 2 22 8.5 12 15 2 8.5 12 2'></polygon>
                      <polygon points='2 15.5 12 22 22 15.5'></polygon>
                      <polyline points='2 12 12 18.5 22 12'></polyline>
                    </svg>
                  </Box>
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 900,
                      color: "rgba(240, 98, 146, 0.4)",
                      fontFamily: "serif",
                    }}
                  >
                    02
                  </Typography>
                </Stack>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 900,
                    color: "#1a1a1a",
                    mb: 2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  ABASTECIMIENTO EXCLUSIVO Y PROTECCIÓN DE ZONA
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: "#555", lineHeight: 1.8 }}
                >
                  Garantizamos que serás la única academia Wapizima en tu área
                  designada. Además, contarás con precios de distribuidor
                  preferencial en toda nuestra línea de acrílicos, geles y
                  herramientas artísticas.
                </Typography>
              </Box>
            </Grid>
            {/* PASO 3: IZQUIERDA */}
            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={cardLeftVariants}
            >
              <Box sx={{ pr: { md: 4 } }}>
                <Stack direction='row' alignItems='center' spacing={2} mb={2}>
                  {/* ESPACIO PARA SVG DE SVG REPO (Eje: Teacher/Education/Certificate SVG) */}
                  <Box sx={{ width: 50, height: 50, color: "#d81b60" }}>
                    <svg
                      viewBox='0 0 24 24'
                      width='40'
                      height='40'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M22 10v6M2 10l10-5 10 5-10 5z'></path>
                      <path d='M6 12v5c0 2 2 3 6 3s6-1 6-3v-5'></path>
                    </svg>
                  </Box>
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 900,
                      color: "rgba(240, 98, 146, 0.4)",
                      fontFamily: "serif",
                    }}
                  >
                    03
                  </Typography>
                </Stack>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 900,
                    color: "#1a1a1a",
                    mb: 2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  HOMOLOGACIÓN INTERNACIONAL DE MÁSTERES
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: "#555", lineHeight: 1.8 }}
                >
                  Tus instructores recibirán capacitación directa de nuestros
                  másteres globales en el corporativo. Aseguramos que la calidad
                  académica de tu plantel se mantenga al más alto nivel
                  competitivo del país.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 0, md: 6 }} />
          </Grid>

          {/* ---- SECCIÓN DE CONVERSIÓN EXCLUSIVA (CTA DESTACADO) ---- */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{
              mt: { xs: 14, md: 20 },
              p: { xs: 5, md: 8 },
              borderRadius: "32px",
              bgcolor: "#fdf2f5",
              border: "2px dashed #f06292", // Estilo plano con corte asimétrico moderno
              textAlign: "center",
              position: "relative",
            }}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 900,
                color: "#1a1a1a",
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                letterSpacing: "-1px",
              }}
            >
              ¿Estás lista para tomar el liderazgo?
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: "#555",
                maxWidth: 650,
                margin: "0 auto",
                mb: 5,
                fontSize: "1.1rem",
              }}
            >
              Si cuentas con el capital de inversión requerido y compartes
              nuestra pasión por revolucionar la industria de la belleza,
              queremos conocerte hoy mismo.
            </Typography>

            {/* BOTÓN CON TU TEXTO DE ALTO IMPACTO */}
            <Button
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#d81b60",
                color: "#fff",
                px: { xs: 3, sm: 5 },
                py: 2.5,
                borderRadius: "20px",
                fontWeight: "900",
                textTransform: "none",
                fontSize: { xs: "0.95rem", sm: "1.15rem" },
                letterSpacing: "0.5px",
                boxShadow: "0 15px 35px rgba(216, 27, 96, 0.35)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  bgcolor: "#d81b60",
                  transform: "scale(1.03)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Reuno todos los requisitos y quiero tener una franquicia wapizima
              beauty school
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default FranquiciasSection;
