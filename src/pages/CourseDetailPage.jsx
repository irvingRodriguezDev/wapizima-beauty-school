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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { motion, AnimatePresence } from "framer-motion";

import Layout from "../components/Landing/Layout";
import LoadingScreen from "../components/LoadingScreen";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BannerMinimal from "../components/CourseDetail/BannerMinimal";
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
  const costoTotal = currentCourse?.costo || 0;
  const pagoInicial = costoTotal * 0.3;
  const saldoRestante = costoTotal * 0.7;
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

  return (
    <Layout>
      {/* FONDO LIENZO INFINITO */}
      <Box
        sx={{
          background: "#FAFAFA",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(245, 79, 156, 0.03) 0%, transparent 40%)",
          pb: { xs: 16, md: 8 }, // ✨ Aumentamos el padding inferior en móvil (xs) para que el botón flotante central no tape el final del contenido
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

                {/* 2. 🔥 Reubicación Estratégica: La Lista de Materiales ahora sigue inmediatamente abajo */}
                <Grid size={12}>
                  <MaterialList currentCourse={currentCourse} />
                </Grid>
              </Grid>
            </Grid>

            {/* ================= COLUMNA DERECHA: EXCLUSIVA ESCRITORIO ================= */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Grid
                container
                spacing={4}
                sx={{
                  position: "sticky",
                  top: "120px",
                  zIndex: 10,
                  // Ocultamos todo este bloque lateral en móvil y tablet; solo vive de 'lg' en adelante
                  display: { xs: "none", lg: "flex" },
                  flexDirection: "column",
                }}
              >
                {/* TARJETA DEL FLYER PREMIUM (Solo visible en Desktop) */}
                <Grid size={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: "32px",
                      overflow: "hidden",
                      border: "1px solid rgba(245, 79, 156, 0.06)",
                      boxShadow: "0px 16px 40px rgba(233, 30, 99, 0.02)",
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
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
                {/* TARJETA DE CONVERSIÓN: APARTADO INTELIGENTE (ESTILO FINANCIERO PREMIUM) */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "24px",
                    backgroundColor: "rgba(245, 79, 156, 0.02)",
                    border: "1px dashed rgba(245, 79, 156, 0.2)",
                  }}
                >
                  {/* Header del Bloque de Pago */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <AccountBalanceWalletOutlinedIcon
                      sx={{ fontSize: 16, color: "#E91E63" }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#E91E63",
                        fontSize: "0.72rem",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Plan de Inscripción Cómodo
                    </Typography>
                  </Box>

                  {/* Desglose Numérico */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      textAlign: "center",
                    }}
                  >
                    {/* Foco 1: El Apartado */}
                    <Box>
                      <Typography
                        variant='caption'
                        sx={{
                          color: "#655F62",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      >
                        Asegura tu lugar hoy con solo el 30%:
                      </Typography>
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: 900,
                          color: "#2A2628",
                          fontSize: "1.8rem",
                          fontFamily: "'Montserrat', sans-serif",
                          letterSpacing: "-0.5px",
                          mt: 0.5,
                        }}
                      >
                        {FormatCurrency(pagoInicial)}
                        <Box
                          component='span'
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: "#E91E63",
                            ml: 0.5,
                          }}
                        >
                          MXN
                        </Box>
                      </Typography>
                    </Box>

                    <Divider
                      sx={{
                        borderStyle: "dashed",
                        borderColor: "rgba(245, 79, 156, 0.12)",
                      }}
                    />

                    {/* Foco 2: Liquidación */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 1,
                      }}
                    >
                      <Typography
                        variant='caption'
                        sx={{ color: "#655F62", fontWeight: 600 }}
                      >
                        Liquidación el día del taller:
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          fontWeight: 700,
                          color: "#2A2628",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {FormatCurrency(saldoRestante)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* 3. 🔥 EL LLAMADO DE ACCIÓN PRINCIPAL MÓVIL: Siempre visible, centrado y magnético */}
        <Box
          component={motion.div}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          sx={{
            position: "fixed",
            bottom: "24px", // Separado sutilmente del borde inferior de la pantalla para el toque premium flotante
            left: 0,
            right: 0,
            zIndex: 1000,
            display: { xs: "flex", lg: "flex" }, // Visible en todo móvil/tablet y se apaga en desktop
            justifyContent: "center",
            px: 3,
            pointerEvents: "none", // Deja pasar los scrolls de fondo si tocan los extremos vacíos
          }}
        >
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            sx={{
              width: "100%",
              maxWidth: "440px",
              pointerEvents: "auto", // Reactiva los clicks exclusivamente en el área del botón
            }}
          >
            <Button
              variant='contained'
              disableElevation
              fullWidth
              onClick={() => setOpenModalInscription(true)}
              sx={{
                background: "linear-gradient(90deg, #E91E63 0%, #FF6097 100%)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.9rem",
                py: 1.8,
                borderRadius: "99px",
                letterSpacing: "0.8px",
                textTransform: "none",
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "0px 12px 32px rgba(229, 56, 136, 0.35)", // Sombra fucsia profunda Wapizima
              }}
            >
              Inscribirme ahora por {FormatCurrency(currentCourse.costo)}
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
