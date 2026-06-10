import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicSchool } from "../context/PublicSchoolContext";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { motion, AnimatePresence } from "framer-motion";

import Layout from "../components/Landing/Layout";
import LoadingScreen from "../components/LoadingScreen";

import Banner from "../components/CourseDetail/Banner";
import DetailsAndDescription from "../components/CourseDetail/DetailsAndDescription";
import MaterialList from "../components/CourseDetail/MaterialList";
import InscriptionModal from "../components/inscriptions/InscriptionModal";
import { FormatCurrency } from "../utils/FormatCurrency";

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { currentCourse, fetchCourseDetailBySlug, loading, error } =
    usePublicSchool();
  const [openModalInscription, setOpenModalInscription] = useState(false);

  useEffect(() => {
    if (courseSlug) {
      fetchCourseDetailBySlug(courseSlug);
    }
  }, [courseSlug, fetchCourseDetailBySlug]);

  if (loading) {
    return <LoadingScreen message='Cargando detalles del programa...' />;
  }

  if (error || !currentCourse) {
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
            No pudimos encontrar este programa o no está disponible.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(-1)}
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />
            }
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Volver atrás
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* FONDO PREMIUM CON CONTINUIDAD VISUAL */}
      <Box
        sx={{
          background: "#FFFBFD",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(255, 240, 245, 0.7) 0%, transparent 25%)",
          pb: 16, // Espacio extra inferior para que la barra flotante no tape el contenido del pie de página
        }}
      >
        {/* 1. HERO BANNER DE ALTA GAMA */}
        <Banner currentCourse={currentCourse} />

        {/* 2. CONTENIDO PRINCIPAL EN BLOQUES COHESIVOS */}
        <Container maxWidth='xl' sx={{ pt: { xs: 6, md: 8 } }}>
          <Grid container spacing={5}>
            {/* COLUMNA IZQUIERDA: DETALLES Y DESCRIPCIÓN */}
            <DetailsAndDescription currentCourse={currentCourse} />

            {/* COLUMNA DERECHA: MATERIALES E INVERSIÓN */}
            <MaterialList currentCourse={currentCourse} />
          </Grid>
        </Container>

        {/* 3. BARRA FIJA INFERIOR INTERACTIVA (ESTILO CRISTAL ESMERILADO) */}
        <Box
          component={motion.div}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            py: { xs: 2, sm: 2.5 },
            px: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Contenedor Animado para el Botón de Compra */}
          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            sx={{ width: "100%", maxWidth: "550px" }}
          >
            <Button
              variant='contained'
              fullWidth
              onClick={() => setOpenModalInscription(true)}
              sx={{
                backgroundColor: "#E53888", // Rosa Wapizima principal
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.92rem",
                py: 1.8,
                borderRadius: "50px", // Botón cápsula icónico unificado
                letterSpacing: "1.5px",
                textTransform: "none",
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "0px 8px 25px rgba(229, 56, 136, 0.25)",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#D82E7A",
                },
              }}
            >
              Inscribirme al{" "}
              {currentCourse.tipo_curso === "Taller" ? "Taller" : "Curso"} Ahora
              por {FormatCurrency(currentCourse.costo)}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* MODAL DE INSCRIPCIÓN PREMIUM */}
      <AnimatePresence>
        {openModalInscription && (
          <InscriptionModal
            open={openModalInscription}
            onClose={() => setOpenModalInscription(false)}
            currentCourse={currentCourse}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default CourseDetailPage;
