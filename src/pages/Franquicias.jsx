import React from "react";
import { Box, Typography, Grid, Button, Stack, Container } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Layout from "../components/Landing/Layout";

// ---- ANIMACIONES DINÁMICAS DE ENTRADA CON FRAMER MOTION ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] },
  },
};

const stepsData = [
  {
    num: "01",
    title: "Sistema de Gestión Totalmente Digitalizado",
    desc: "Olvida las complicaciones administrativas. Te entregamos un software exclusivo para el control de matrículas, asistencias, asignación de salones y cobros recurrentes de tus alumnas de manera automática.",
    icon: (
      <svg
        viewBox='0 0 24 24'
        width='28'
        height='28'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <line x1='18' y1='20' x2='18' y2='10'></line>
        <line x1='12' y1='20' x2='12' y2='4'></line>
        <line x1='6' y1='20' x2='6' y2='14'></line>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Abastecimiento Exclusivo y Protección de Zona",
    desc: "Garantizamos que serás la única academia Wapizima en tu área designada. Además, contarás con precios de distribuidor preferencial en toda nuestra línea de acrílicos, geles y herramientas artísticas.",
    icon: (
      <svg
        viewBox='0 0 24 24'
        width='28'
        height='28'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polygon points='12 2 22 8.5 12 15 2 8.5 12 2'></polygon>
        <polygon points='2 15.5 12 22 22 15.5'></polygon>
        <polyline points='2 12 12 18.5 22 12'></polyline>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Homologación Internacional de Másteres",
    desc: "Tus instructores recibirán capacitación directa de nuestros másteres globales en el corporativo. Aseguramos que la calidad académica de tu plantel se mantenga al más alto nivel competitivo del país.",
    icon: (
      <svg
        viewBox='0 0 24 24'
        width='28'
        height='28'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M22 10v6M2 10l10-5 10 5-10 5z'></path>
        <path d='M6 12v5c0 2 2 3 6 3s6-1 6-3v-5'></path>
      </svg>
    ),
  },
];

const FranquiciasSection = () => {
  return (
    <Layout>
      <Grid container spacing={2} id='franquicias' sx={{ padding: "20px" }}>
        <Grid size={12}>
          <AutoAwesomeIcon sx={{ color: "#E53888", fontSize: 14 }} />
          <Typography
            variant='caption'
            sx={{
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontWeight: 700,
              color: "#D82E7A",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Tu Próximo Gran Éxito Comercial
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.2rem", md: "3.4rem" },
              lineHeight: 1.15,
              color: "#212121",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Domina el mercado con un <br />
            <Box
              component='span'
              sx={{
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "400",
                color: "#E53888",
              }}
            >
              modelo llave en mano.
            </Box>
          </Typography>
        </Grid>
        <Grid size={12}>
          {stepsData.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <Grid
                container
                key={step.num}
                component={motion.div}
                variants={cardVariants}
                // Aquí se genera el zig-zag nativo invirtiendo la fila en pantallas grandes
                direction={isEven ? { xs: "column", md: "row-reverse" } : "row"}
                alignItems='center'
              >
                {/* Columna con el Contenido */}
                <Grid
                  size={{ xs: 12, md: 6 }}
                  sx={{
                    display: "flex",
                    justifyContent: isEven ? "flex-start" : "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "500px",
                      width: "100%",
                      p: { xs: 3.5, sm: 4 },
                      backgroundColor: "#FFFFFF",
                      border: "1px solid rgba(244, 114, 182, 0.15)",
                      borderRadius: "24px", // Suavizado premium
                      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.01)",
                      mx: { md: 4 },
                    }}
                  >
                    <Stack
                      direction='row'
                      mb={2.5}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          color: "#E53888",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography
                        variant='h3'
                        sx={{
                          fontWeight: 900,
                          color: "rgba(229, 56, 136, 0.2)",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "2.2rem",
                        }}
                      >
                        {step.num}
                      </Typography>
                    </Stack>

                    <Typography
                      variant='h4'
                      component='h3'
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        color: "#212121",
                        mb: 1.5,
                        letterSpacing: "0.3px",
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: "uppercase",
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant='body1'
                      sx={{
                        color: "#554D4F",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {step.desc}
                    </Typography>
                  </Box>
                </Grid>

                {/* Espaciador Nativo Limpio Ocupado en Desktop */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: { xs: "none", md: "block" } }}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid size={12}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            sx={{
              mt: { xs: 12, md: 16 },
              p: { xs: 4, sm: 6, md: 8 },
              borderRadius: "32px", // Cambiado a curvatura unificada suave
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(244, 114, 182, 0.22)",
              boxShadow: "0px 15px 40px rgba(229, 56, 136, 0.03)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Typography
              variant='h3'
              sx={{
                fontWeight: 800,
                color: "#212121",
                mb: 2,
                fontSize: { xs: "1.6rem", md: "2.2rem" },
                letterSpacing: "-0.5px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              ¿Estás lista para tomar el liderazgo?
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "#554D4F",
                maxWidth: 620,
                margin: "0 auto",
                mb: 5,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Si cuentas con el capital de inversión requerido y compartes
              nuestra pasión por revolucionar la industria de la belleza,
              queremos conocerte hoy mismo.
            </Typography>

            {/* BOTÓN CÁPSULA DE ALTA CONVERSIÓN */}
            <Button
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#E53888",
                color: "#FFFFFF",
                px: { xs: 4, sm: 6 },
                py: 2,
                borderRadius: "50px", // Formato cápsula premium unificada
                fontWeight: 700,
                textTransform: "none", // Más sofisticado que el uppercase forzado
                fontFamily: "'Montserrat', sans-serif",
                fontSize: { xs: "0.85rem", sm: "0.92rem" },
                letterSpacing: "0.5px",
                boxShadow: "0px 8px 25px rgba(229, 56, 136, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#D82E7A",
                  boxShadow: "0px 12px 30px rgba(229, 56, 136, 0.3)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Reúno los requisitos y quiero una franquicia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FranquiciasSection;
