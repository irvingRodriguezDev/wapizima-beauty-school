import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicSchool } from "../context/PublicSchoolContext";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

import Layout from "../components/Landing/Layout";
import { FormatCurrency } from "../utils/FormatCurrency";
import LoadingScreen from "../components/LoadingScreen";

import Banner from "../components/CourseDetail/Banner";
import DetailsAndDescription from "../components/CourseDetail/DetailsAndDescription";
import MaterialList from "../components/CourseDetail/MaterialList";
import InscripcionModal from "../components/inscriptions/InscriptionModal";

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { school, currentCourse, fetchCourseDetailBySlug, loading, error } =
    usePublicSchool();

  useEffect(() => {
    if (courseSlug) {
      fetchCourseDetailBySlug(courseSlug);
    }
  }, [courseSlug, fetchCourseDetailBySlug]);

  const [openModalInscription, setOpenModalInscription] = useState(false);

  if (loading) {
    return <LoadingScreen message='Cargando detalles del programa...' />;
  }

  if (error || !currentCourse) {
    return (
      <Container
        sx={{ py: 12, textAlign: "center", bgcolor: "background.default" }}
      >
        <Typography
          variant='h5'
          color='primary.main'
          fontWeight={800}
          mb={3}
          sx={{ letterSpacing: "1px" }}
        >
          No pudimos encontrar este programa o no está disponible.
        </Typography>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => navigate(-1)}
          sx={{ borderRadius: 0 }}
        >
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Layout>
      <Box sx={{ bgcolor: "background.default", pb: 14 }}>
        {/* 1. HERO BANNER DE ALTA GAMA */}
        <Banner currentCourse={currentCourse} />
        {/* 2. CONTENIDO PRINCIPAL EN BLOQUES FLAT */}
        <Container maxWidth='xl' sx={{ pt: 8 }}>
          <Grid container spacing={5}>
            {/* COLUMNA IZQUIERDA: DETALLES Y DESCRIPCIÓN */}
            <DetailsAndDescription currentCourse={currentCourse} />
            {/* COLUMNA DERECHA: MATERIALES E INVERSIÓN STICKY */}
            <MaterialList currentCourse={currentCourse} />
          </Grid>
        </Container>

        {/* 3. BARRA FIJA INFERIOR CON BOTÓN ANIMADO PREMIUM */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            bgcolor: "transparent", // Cambiado a color sólido para dar contraste y enmarcar la animación
            borderTop: "1px solid",
            borderColor: "rgba(255, 255, 255, 0.1)",
            py: 2.5,
            px: 3,
            display: "flex",
            justifyContent: "center",
            // Definimos la animación de pulso/brinco elegante usando CSS puro
            "@keyframes elegantBounce": {
              "0%, 100%": {
                transform: "translateY(0)",
              },
              "10%": {
                transform: "translateY(-6px)", // Sube sutilmente
              },
              "20%": {
                transform: "translateY(1px)",
              },
              "30%": {
                transform: "translateY(-3px)", // Segundo brinco más pequeño
              },
              "40%": {
                transform: "translateY(0)", // Reposo
              },
            },
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={() => setOpenModalInscription(true)}
            sx={{
              width: "100%",
              maxWidth: "500px",
              color: "primary.main",
              bgcolor: "secondary.main",
              fontWeight: 800,
              fontSize: "0.95rem",
              py: 1.8,
              borderRadius: "12px", // Regresamos a 0 para mantener la consistencia ortogonal y plana
              letterSpacing: "3px",
              textTransform: "uppercase",
              // 🌟 APLICAMOS LA ANIMACIÓN: Dura 3 segundos en total y se repite infinitamente
              animation: "elegantBounce 3s ease-in-out infinite",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "secondary.dark",
                color: "#FFFFFF",
                animationPlayState: "paused", // Pausa el brinco cuando el usuario pasa el mouse encima para facilitar el clic
                transform: "scale(1.02)", // Cambia por una micro-expansión limpia al hacer hover
              },
            }}
          >
            Inscribirme al{" "}
            {currentCourse.tipo_curso === "Taller" ? "Taller" : "Curso"}
          </Button>
        </Box>
      </Box>
      <InscripcionModal
        open={openModalInscription}
        onClose={() => setOpenModalInscription(false)}
        currentCourse={currentCourse}
      />
    </Layout>
  );
};

export default CourseDetailPage;
