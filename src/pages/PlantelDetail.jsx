import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicSchool } from "../context/PublicSchoolContext";
// Eliminamos Box e importamos explícitamente Grid2 como Grid
import { Container, Typography, Button, Stack, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Layout from "../components/Landing/Layout";
import PublicCoursesTabs from "../components/PublicCoursesTabs";
import LoadingScreen from "../components/LoadingScreen";
import CustomWhatsApp from "../components/CustomWhatsApp";

const PlantelDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const { school, courses, loading, error, fetchPublicSchoolData } =
    usePublicSchool();

  useEffect(() => {
    fetchPublicSchoolData(slug);
  }, [slug]);

  if (loading) {
    return <LoadingScreen message='Cargando información del plantel...' />;
  }

  if (error || !school) {
    return (
      <Layout>
        <Container sx={{ py: 16, textAlign: "center" }}>
          <Typography
            variant='h5'
            fontWeight={800}
            mb={3}
            sx={{
              letterSpacing: "1px",
              color: "#2A2628",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            No pudimos encontrar este plantel o no está disponible en este
            momento.
          </Typography>
          <Button
            variant='contained'
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "99px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              background: "#E91E63",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Volver al Inicio
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* CONTENEDOR PRINCIPAL: Ahora es el Grid Raíz quien maneja el Lienzo Infinito */}
      <Grid
        container
        sx={{
          minHeight: "100vh",
          background: "#FAFAFA",
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(245, 79, 156, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 100% 60%, rgba(244, 114, 182, 0.03) 0%, transparent 35%)
          `,
          pb: 12,
        }}
      >
        <Container maxWidth='2xl' sx={{ px: { xs: 3, md: 8 } }}>
          <Grid container spacing={4}>
            {/* 1. SECCIÓN: BOTÓN REGRESAR */}
            <Grid size={12} sx={{ pt: 5, pb: 1, mt: -2, mb: 2 }}>
              <Button
                startIcon={
                  <ArrowBackIosNewIcon sx={{ fontSize: "11px !important" }} />
                }
                onClick={() => navigate("/")}
                variant='text'
                sx={{
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  letterSpacing: "0.5px",
                  textTransform: "none",
                  color: "#655F62",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  borderRadius: "99px",
                  px: 2.5,
                  py: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(245, 79, 156, 0.04)",
                    color: "#E91E63",
                    transform: "translateX(-4px)",
                    borderColor: "rgba(245, 79, 156, 0.15)",
                  },
                }}
              >
                Volver a Academias
              </Button>
            </Grid>

            {/* 2. SECCIÓN: HEADER EDITORIAL ASIMÉTRICO (100% Grid) */}
            <Grid
              size={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: { xs: -8, md: -2 },
                mb: { xs: 2 },
                pt: { xs: 2, md: 4 },
                pb: { xs: 4, md: 6 },
              }}
            >
              {/* Tag Premium con Emojis Controlados */}

              {/* Nombre de la Sede */}
              <Typography
                variant='h1'
                component='h1'
                sx={{
                  color: "#2A2628",
                  fontSize: { xs: "1.6rem", sm: "3.8rem", md: "1.9rem" },
                  lineHeight: 1.05,
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.5px",
                  mb: 3.5,
                  maxWidth: "1000px",
                }}
              >
                {school.name}
              </Typography>

              {/* Dirección estilo Boutique */}
              {/* <Stack
                direction='row'
                spacing={1.5}
                sx={{
                  alignItems: "center",
                  py: 1.2,
                  px: 2.5,
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  borderRadius: "50px",
                }}
              >
                <LocationOnIcon sx={{ color: "#E91E63", fontSize: "1.1rem" }} />
                <Typography
                  variant='body2'
                  sx={{
                    color: "#655F62",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {school.address || "Dirección no especificada"}
                </Typography>
              </Stack> */}
            </Grid>
            {/* 3. SECCIÓN: TÍTULO DE OFERTA EDUCATIVA */}
            {/* <Grid size={12} sx={{ mb: 2 }}>
              <Stack
                direction='row'
                spacing={1}
                sx={{
                  mb: 1.5,
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{
                    fontWeight: 800,
                    textAlign: "center",
                    color: "#2A2628",
                    letterSpacing: "1px",
                    fontSize: { xs: "1.4rem", md: "1.8rem" },
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Programas Disponibles
                </Typography>
                <span style={{ fontSize: "1.4rem", marginLeft: "8px" }}>
                  💅🏻
                </span>
              </Stack>
              <Stack
                direction='row'
                spacing={1}
                sx={{
                  mb: 1.5,
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    color: "#655F62",
                    maxWidth: "600px",
                    fontSize: "0.95rem",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  Elige el programa ideal diseñado por expertos para impulsar tu
                  carrera al máximo nivel en el arte de las uñas.
                </Typography>
              </Stack>
            </Grid> */}

            {/* 4. SECCIÓN: TABS CON LAS TARJETAS DE CURSOS */}
            <Grid size={12} sx={{ mt: -10 }}>
              <PublicCoursesTabs courses={courses} />
            </Grid>
          </Grid>
          {school.number_phone !== null && (
            <CustomWhatsApp
              phone={school.number_phone}
              name={school.name}
              logo={school.logo_url}
            />
          )}
        </Container>
      </Grid>
    </Layout>
  );
};

export default PlantelDetailPage;
