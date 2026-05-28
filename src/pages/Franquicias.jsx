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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const FranquiciasSection = () => {
  return (
    <Layout>
      <Box
        id='franquicias'
        sx={{
          py: { xs: 12, md: 20 },
          bgcolor: "background.default", // Crema de estudio sutil
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* LÍNEA EJE CENTRAL MINIMALISTA */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "22%",
            bottom: "25%",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, rgba(186, 137, 146, 0.3) 15%, rgba(186, 137, 146, 0.3) 85%, transparent)",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "block" },
          }}
        />

        <Container maxWidth='xl'>
          {/* ---- ENCABEZADO EDITORIAL ---- */}
          <Box sx={{ textAlign: "center", mb: 14 }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <AutoAwesomeIcon sx={{ color: "secondary.main", fontSize: 14 }} />
              <Typography
                variant='caption'
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                  fontWeight: 800,
                  color: "secondary.main",
                }}
              >
                Tu Próximo Gran Éxito Comercial
              </Typography>
            </Stack>

            <Typography
              variant='h2'
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.4rem", md: "3.8rem" },
                lineHeight: 1.15,
                color: "primary.main",
                letterSpacing: "0.5px",
              }}
            >
              DOMINA EL MERCADO CON UN <br />
              <Box
                component='span'
                sx={{
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: "400",
                  color: "secondary.main",
                }}
              >
                MODELO LLAVE EN MANO.
              </Box>
            </Typography>
          </Box>

          {/* ---- FLUJO DINÁMICO EN ZIG-ZAG OPTIMIZADO ---- */}
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
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Box sx={{ pr: { md: 6 }, maxWidth: "540px" }}>
                <Stack direction='row' alignItems='center' spacing={2} mb={2.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      color: "secondary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      width='34'
                      height='34'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
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
                      fontWeight: 800,
                      color: "rgba(186, 137, 146, 0.25)",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    01
                  </Typography>
                </Stack>
                <Typography
                  variant='h4'
                  component='h3'
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    color: "primary.main",
                    mb: 2,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Sistema de Gestión Totalmente Digitalizado
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  Olvida las complicaciones administrativas. Te entregamos un
                  software exclusivo para el control de matrículas, asistencias,
                  asignación de salones y cobros recurrentes de tus alumnas de
                  manera automática.
                </Typography>
              </Box>
            </Grid>

            {/* Espaciador implícito mediante ordenamiento nativo en Desktop */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: { xs: "none", md: "block" } }}
            />

            {/* PASO 2: DERECHA */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: { xs: "none", md: "block" } }}
            />

            <Grid
              size={{ xs: 12, md: 6 }}
              component={motion.div}
              variants={cardRightVariants}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Box sx={{ pl: { md: 6 }, maxWidth: "540px" }}>
                <Stack direction='row' alignItems='center' spacing={2} mb={2.5}>
                  <Box sx={{ width: 44, height: 44, color: "secondary.main" }}>
                    <svg
                      viewBox='0 0 24 24'
                      width='34'
                      height='34'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
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
                      fontWeight: 800,
                      color: "rgba(186, 137, 146, 0.25)",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    02
                  </Typography>
                </Stack>
                <Typography
                  variant='h4'
                  component='h3'
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    color: "primary.main",
                    mb: 2,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Abastecimiento Exclusivo y Protección de Zona
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
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
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Box sx={{ pr: { md: 6 }, maxWidth: "540px" }}>
                <Stack direction='row' alignItems='center' spacing={2} mb={2.5}>
                  <Box sx={{ width: 44, height: 44, color: "secondary.main" }}>
                    <svg
                      viewBox='0 0 24 24'
                      width='34'
                      height='34'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
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
                      fontWeight: 800,
                      color: "rgba(186, 137, 146, 0.25)",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    03
                  </Typography>
                </Stack>
                <Typography
                  variant='h4'
                  component='h3'
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    color: "primary.main",
                    mb: 2,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Homologación Internacional de Másteres
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  Tus instructores recibirán capacitación directa de nuestros
                  másteres globales en el corporativo. Aseguramos que la calidad
                  académica de tu plantel se mantenga al más alto nivel
                  competitivo del país.
                </Typography>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: { xs: "none", md: "block" } }}
            />
          </Grid>

          {/* ---- SECCIÓN DE CONVERSIÓN EXCLUSIVA (CTA FLAT LUXURY) ---- */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            sx={{
              mt: { xs: 14, md: 20 },
              p: { xs: 4, sm: 6, md: 8 },
              borderRadius: "12px", // Ortogonal riguroso
              bgcolor: "background.paper", // Fondo blanco sólido contrastado
              border: "1px solid",
              borderColor: "rgba(186, 137, 146, 0.2)",
              textAlign: "center",
            }}
          >
            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                color: "primary.main",
                mb: 2,
                fontSize: { xs: "1.6rem", md: "2.3rem" },
                letterSpacing: "0.5px",
              }}
            >
              ¿Estás lista para tomar el liderazgo?
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "text.secondary",
                maxWidth: 620,
                margin: "0 auto",
                mb: 5,
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              Si cuentas con el capital de inversión requerido y compartes
              nuestra pasión por revolucionar la industria de la belleza,
              queremos conocerte hoy mismo.
            </Typography>

            {/* BOTÓN RECTANGULAR PREMIUM */}
            <Button
              variant='contained'
              color='secondary'
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: "primary.main",
                bgcolor: "secondary.main", // Contraste rotundo rosa viejo satinado
                px: { xs: 3, sm: 5 },
                py: 2.2,
                borderRadius: "12px", // Flat estricto
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                letterSpacing: "2px",
                boxShadow: "none", // Sin sombras pesadas
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "secondary.dark",
                  color: "#FFFFFF",
                  boxShadow: "none",
                },
              }}
            >
              Reuno todos los requisitos y quiero tener una franquicia
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default FranquiciasSection;
