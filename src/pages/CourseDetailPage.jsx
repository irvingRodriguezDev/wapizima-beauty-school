import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicSchool } from "../context/PublicSchoolContext";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Landing/Layout";
import LoadingScreen from "../components/LoadingScreen";
import BannerMinimal from "../components/CourseDetail/BannerMinimal";
import DetailsAndDescription from "../components/CourseDetail/DetailsAndDescription";
import MaterialList from "../components/CourseDetail/MaterialList";
import InscriptionModal from "../components/inscriptions/InscriptionModal";
import Temario from "../components/CourseDetail/Temario";
import PlanPagos from "../components/CourseDetail/PlanPagos";
import FloattingButton from "../components/CourseDetail/FloattingButton";

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { currentCourse, fetchCourseDetailBySlug, loading, error } =
    usePublicSchool();
  const [openModalInscription, setOpenModalInscription] = useState(false);
  const [expanded, setExpanded] = useState("panel0");

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
              color: "#2A2628",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            No pudimos encontrar este programa o no está disponible.
          </Typography>
          <Button
            variant='contained'
            onClick={() => navigate(-1)}
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "11px !important" }} />
            }
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
            Volver atrás
          </Button>
        </Container>
      </Layout>
    );
  }

  // Sanitización de estructuras JSONB seguras
  const temario = Array.isArray(currentCourse.temario)
    ? currentCourse.temario
    : [];
  const planPagos = Array.isArray(currentCourse.plan_pagos)
    ? currentCourse.plan_pagos
    : [];

  // 1. 🔥 CÁLCULO DINÁMICO REAL: Costo total y apartado exacto desde tu JSONB
  const costoTotalCalculado = planPagos.reduce(
    (acc, curr) => acc + (curr.monto || 0),
    0,
  );

  // El pago inicial real es el primer hito configurado (ej: Inscripción con $500). Si no existe, fallback a 0
  const pagoInicialReal = planPagos[0]?.monto || 0;

  return (
    <Layout>
      {/* FONDO LIENZO INFINITO CON RADIAL BLUSH DE ALTA GAMA */}
      <Box
        sx={{
          background: "#FAFAFA",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(245, 79, 156, 0.04) 0%, transparent 50%)",
          pb: { xs: 16, md: 8 },
        }}
      >
        {/* HERO HEADER EDITORIAL */}
        <BannerMinimal currentCourse={currentCourse} />

        {/* CONTENEDOR DE MAQUETACIÓN RESPONSIVA */}
        <Container
          maxWidth='xl'
          sx={{
            px: { xs: 3, md: 8 },
            mt: { xs: 2, md: 6 },
            pb: 6,
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* ================= COLUMNA IZQUIERDA: FLUJO ACADÉMICO PRINCIPAL ================= */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Grid container spacing={4}>
                {/* 1. Detalles y Descripción del Curso */}
                <Grid size={12}>
                  <DetailsAndDescription currentCourse={currentCourse} />
                </Grid>

                {/* 2. Temario Interactivo por Semanas */}
                <Grid size={12}>
                  <Temario
                    temario={temario}
                    handleChangeAccordion={handleChangeAccordion}
                    expanded={expanded}
                  />
                </Grid>

                {/* 3. Lista de Materiales Requeridos */}
                <Grid size={12}>
                  <MaterialList currentCourse={currentCourse} />
                </Grid>

                {/* 4. 📱 INYECCIÓN ESTRATÉGICA EN MÓVIL: Muestra el plan de pagos solo en pantallas pequeñas */}
                <Grid
                  size={12}
                  sx={{ display: { xs: "block", lg: "none" }, mt: 2 }}
                >
                  <PlanPagos
                    planPagos={planPagos}
                    costoTotalCalculado={costoTotalCalculado}
                    currentCourse={currentCourse}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* ================= COLUMNA DERECHA: EXCLUSIVA ESCRITORIO (STICKY) ================= */}
            <Grid
              size={{ xs: 12, lg: 5 }}
              sx={{ display: { xs: "none", lg: "block" } }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: "120px",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {/* TARJETA DEL FLYER PREMIUM */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "32px",
                    overflow: "hidden",
                    border: "1px solid rgba(245, 79, 156, 0.08)",
                    boxShadow: "0px 24px 48px rgba(233, 30, 99, 0.02)",
                    backgroundColor: "#FFFFFF",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "24px",
                      overflow: "hidden",
                      width: "100%",
                      aspectRatio: "3/4",
                      backgroundColor: "#F9F9F9",
                    }}
                  >
                    <img
                      src={
                        currentCourse?.flayer_url ||
                        "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={currentCourse?.titulo || "Detalle del curso"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </Box>
                </Paper>

                {/* TARJETA DE CONVERSIÓN FINANCIERA */}
                <PlanPagos
                  planPagos={planPagos}
                  costoTotalCalculado={costoTotalCalculado}
                  currentCourse={currentCourse}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* BOTÓN FLOTANTE INFERIOR DINÁMICO */}
        <FloattingButton
          setOpenModalInscription={setOpenModalInscription}
          pagoInicial={pagoInicialReal}
        />
      </Box>

      {/* MODAL DE INSCRIPCIÓN */}
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
