import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Layout from "../components/Landing/Layout";
import PublicCoursesTabs from "../components/PublicCoursesTabs";
import { usePublicSchool } from "../context/PublicSchoolContext";
import LoadingScreen from "../components/LoadingScreen";

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
              color: "#212121",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            No pudimos encontrar este plantel o no está disponible en este
            momento.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
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
      {/* FONDO PREMIUM: Continuidad visual con doble iluminación difuminada en las esquinas */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "#FFFBFD",
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(255, 240, 245, 0.9) 0%, transparent 35%),
            radial-gradient(circle at 100% 50%, rgba(244, 114, 182, 0.12) 0%, transparent 40%)
          `,
          pb: 12,
        }}
      >
        <Container maxWidth='xl'>
          {/* BOTÓN REGRESAR - UBICACIÓN NATURAL (IZQUIERDA) */}
          <Box sx={{ pt: 4, pb: 2 }}>
            <Button
              startIcon={
                <ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />
              }
              onClick={() => navigate("/")}
              variant='text'
              sx={{
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "1.5px",
                textTransform: "none",
                color: "#554D4F",
                transition: "all 0.3s ease",
                fontFamily: "'Montserrat', sans-serif",
                "&:hover": {
                  color: "#E53888",
                  background: "transparent",
                  transform: "translateX(-3px)",
                },
              }}
            >
              Volver a Academias
            </Button>
          </Box>

          {/* SECCIÓN 1: HEADER EDITORIAL MODELO "STUDIO GLOW" */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              py: { xs: 6, md: 8 },
              px: { xs: 3, md: 6 },
              backgroundColor: "#FFFFFF",
              borderRadius: "32px", // Bordes súper suaves consistentes con el diseño de las Cards
              border: "1px solid rgba(244, 114, 182, 0.2)",
              boxShadow: "0px 12px 40px rgba(229, 56, 136, 0.03)",
              mb: 8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Título de Sede con Fuente de Revista de Moda */}
            <Typography
              variant='h1'
              component='h1'
              sx={{
                fontWeight: 900,
                color: "#212121",
                fontSize: { xs: "2.2rem", sm: "3.2rem", md: "3.8rem" },
                letterSpacing: "-0.5px",
                lineHeight: 1.15,
                mb: 3,
                maxWidth: "900px",
              }}
            >
              <Box
                component='span'
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: "400",
                  background:
                    "linear-gradient(90deg, #E53888 0%, #F472B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {school.name}
              </Box>
            </Typography>

            {/* Cápsula de Ubicación Refinada */}
            <Stack
              direction='row'
              spacing={1.5}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "700px",
                py: 1.2,
                px: 3,
                backgroundColor: "rgba(229, 56, 136, 0.04)",
                border: "1px solid rgba(229, 56, 136, 0.15)",
                borderRadius: "50px",
              }}
            >
              <LocationOnIcon sx={{ color: "#E53888", fontSize: "1.15rem" }} />
              <Typography
                variant='body2'
                sx={{
                  color: "#554D4F",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.2px",
                }}
              >
                {school.address || "Dirección no especificada"}
              </Typography>
            </Stack>
          </Box>

          {/* SECCIÓN 2: SEPARADOR Y TÍTULO DE OFERTA EDUCATIVA */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant='h4'
              component='h2'
              sx={{
                fontWeight: 800,
                color: "#212121",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontSize: { xs: "1.3rem", md: "1.6rem" },
                fontFamily: "'Montserrat', sans-serif",
                mb: 1.5,
              }}
            >
              Nuestra Oferta Educativa
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: "#554D4F",
                maxWidth: "500px",
                margin: "0 auto",
                fontSize: "0.95rem",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
              }}
            >
              Elige el programa ideal diseñado por expertos para impulsar tu
              carrera al máximo nivel en el arte de las uñas.
            </Typography>
          </Box>

          {/* TABS CON LA DATA DE CURSOS (Se renderizan automáticamente con la nueva interfaz premium) */}
          <PublicCoursesTabs courses={courses} />
        </Container>
      </Box>
    </Layout>
  );
};

export default PlantelDetailPage;
