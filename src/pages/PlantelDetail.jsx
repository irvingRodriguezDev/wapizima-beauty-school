import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/Landing/Layout";
import PublicCoursesTabs from "../components/PublicCoursesTabs";
import {
  PublicSchoolProvider,
  usePublicSchool,
} from "../context/PublicSchoolContext";
import LoadingScreen from "../components/LoadingScreen";

// Componente Interno que consume el contexto y maneja la vista
const PlantelDetailContent = () => {
  const navigate = useNavigate();
  const { school, courses, loading, error } = usePublicSchool();

  if (loading) {
    return <LoadingScreen message='Cargando información del plantel...' />;
  }

  if (error || !school) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' color='error' mb={3}>
          No pudimos encontrar este plantel o no está disponible.
        </Typography>
        <Button variant='outlined' onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
      </Container>
    );
  }

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2, mt: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            variant='contained'
            sx={{
              backgroundColor: "#f06292",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "12px",
              "&:hover": { backgroundColor: "#ec407a" },
            }}
          >
            Volver a planteles
          </Button>
        </Box>

        <Container maxWidth='2xl' sx={{ py: 6 }}>
          {/* SECCIÓN 1: Header de la escuela */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              py: { xs: 5, md: 7 },
              px: 3,
              background: "linear-gradient(180deg, #FFF9FA 0%, #FFFFFF 100%)",
              borderRadius: "32px",
              border: "1px solid rgba(240, 98, 146, 0.15)",
              boxShadow: "0px 20px 40px rgba(242, 32, 140, 0.02)",
              mb: 6,
            }}
          >
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Playfair Display', 'Didot', 'Helvetica', serif",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                mb: 2,
                background:
                  "linear-gradient(135deg, #A81464 0%, #E2208C 50%, #F06292 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.5rem", sm: "3.5rem" },
                lineHeight: 1.1,
              }}
            >
              {school.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2.5,
                width: "100%",
                justifyContext: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "rgba(226, 32, 140, 0.3)",
                }}
              />
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#E2208C",
                }}
              />
              <Box
                sx={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "rgba(226, 32, 140, 0.3)",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                maxWidth: "550px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.02)",
                borderRadius: "50px",
                py: 1,
                px: 3,
                border: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              <LocationIcon sx={{ color: "#E2208C", fontSize: "1.2rem" }} />
              <Typography
                variant='body2'
                sx={{
                  color: "#555555",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: "0.3px",
                }}
              >
                {school.address}
              </Typography>
            </Box>
          </Box>

          {/* SECCIÓN 2: Título de la Oferta Educativa */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 800,
                color: "#2D2D2D",
                letterSpacing: "-0.5px",
                mb: 1,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-6px",
                  left: "25%",
                  width: "50%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, #F06292, transparent)",
                },
              }}
            >
              Nuestra Oferta Educativa
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: "#777777",
                fontWeight: 400,
                maxWidth: "500px",
                margin: "12px auto 0 auto",
                lineHeight: 1.6,
              }}
            >
              Elige el programa ideal diseñado por expertos para impulsar tu
              carrera al máximo nivel en el arte de las uñas.
            </Typography>
          </Box>

          {/* 🌟 PASAMOS LAS PROPS REALES DESDE EL CONTEXTO AQUÍ: */}
          <PublicCoursesTabs courses={courses} />
        </Container>
      </Box>
    </Layout>
  );
};

// Componente principal exportado que inyecta el Provider
const PlantelDetailPage = () => {
  const { slug } = useParams();

  return (
    <PublicSchoolProvider slug={slug}>
      <PlantelDetailContent />
    </PublicSchoolProvider>
  );
};

export default PlantelDetailPage;
