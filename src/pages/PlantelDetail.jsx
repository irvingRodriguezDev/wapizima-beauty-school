import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/Landing/Layout";
import PublicCoursesTabs from "../components/PublicCoursesTabs";
import { usePublicSchool } from "../context/PublicSchoolContext";
import LoadingScreen from "../components/LoadingScreen";

// Componente Interno que consume el contexto y maneja la vista refinada
const PlantelDetailPage = () => {
  const params = useParams();
  const { school, courses, loading, error, fetchPublicSchoolData } =
    usePublicSchool();
  const navigate = useNavigate();
  const { slug } = params;
  useEffect(() => {
    fetchPublicSchoolData(slug);
  }, [slug]);
  if (loading) {
    return <LoadingScreen message='Cargando información del plantel...' />;
  }

  if (error || !school) {
    return (
      <Container sx={{ py: 12, textAlign: "center" }}>
        <Typography
          variant='h5'
          color='text.primary'
          fontWeight={800}
          mb={3}
          sx={{ letterSpacing: "1px" }}
        >
          No pudimos encontrar este plantel o no está disponible.
        </Typography>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => navigate("/")}
        >
          Volver al Inicio
        </Button>
      </Container>
    );
  }

  return (
    <Layout>
      {/* Fondo plano y limpio alineado a la nueva paleta premium */}
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
        {/* BOTÓN REGRESAR - ESTILO MINIMALISTA */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: 4,
            pr: { xs: 3, md: 6 },
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            variant='text'
            color='primary'
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              borderRadius: 0,
              px: 2,
              "&:hover": {
                color: "secondary.main",
                background: "transparent",
              },
            }}
          >
            Volver a planteles
          </Button>
        </Box>

        <Container maxWidth='2xl' sx={{ pt: 2, pb: 6 }}>
          {/* SECCIÓN 1: HEADER EDITORIAL DEL PLANTEL */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              py: { xs: 6, md: 9 },
              px: 4,
              bgcolor: "background.paper",
              borderRadius: "12px", // Estructura ortogonal recta estilo galería de arte
              border: "1px solid",
              borderColor: "rgba(186, 137, 146, 0.15)", // Trazo fino del color de acento
              mb: 8,
            }}
          >
            {/* Título usando la tipografía Serif de Alta Costura heredada del tema */}
            <Typography
              variant='h2'
              component='h1'
              sx={{
                fontWeight: 900,
                color: "primary.main",
                fontSize: { xs: "2.4rem", sm: "3.6rem" },
                lineHeight: 1.15,
                mb: 3,
                maxWidth: "900px",
              }}
            >
              {school.name}
            </Typography>

            {/* Separador Lineal Geométrico Sutil */}
            <Box
              sx={{
                width: "60px",
                height: "2px",
                backgroundColor: "secondary.main",
                mb: 4,
              }}
            />

            {/* Cápsula de Ubicación Plana y Sofisticada */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                maxWidth: "600px",
                py: 1,
                px: 3,
                border: "1px solid",
                borderColor: "rgba(45, 37, 38, 0.1)",
                borderRadius: "50px",
              }}
            >
              <LocationIcon
                sx={{ color: "secondary.main", fontSize: "1.1rem" }}
              />
              <Typography
                variant='body2'
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                {school.address}
              </Typography>
            </Box>
          </Box>

          {/* SECCIÓN 2: TÍTULO DE LA OFERTA EDUCATIVA (ESTILO REVISTA) */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant='h4'
              component='h2'
              sx={{
                fontWeight: 800,
                color: "primary.main",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                mb: 2,
              }}
            >
              Nuestra Oferta Educativa
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: "text.secondary",
                maxWidth: "550px",
                margin: "0 auto",
                fontSize: "0.95rem",
              }}
            >
              Elige el programa ideal diseñado por expertos para impulsar tu
              carrera al máximo nivel en el arte de las uñas.
            </Typography>
          </Box>

          {/* 🌟 TABS QUE RECIBEN LA DATA DE CURSOS */}
          <PublicCoursesTabs courses={courses} />
        </Container>
      </Box>
    </Layout>
  );
};

export default PlantelDetailPage;
