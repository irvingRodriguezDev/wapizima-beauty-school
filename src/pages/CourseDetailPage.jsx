import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicSchool } from "../context/PublicSchoolContext";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  CardTravel as MaterialIcon,
  Description as DescIcon,
  MonetizationOn as PriceIcon,
} from "@mui/icons-material";
import Layout from "../components/Landing/Layout";
import { FormatCurrency } from "../utils/FormatCurrency";
import LoadingScreen from "../components/LoadingScreen";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const COLORS = {
  primary: "#f06292",
  secondary: "#fce4ec",
  accent: "#e2208c",
  dark: "#212121",
  lightBg: "#FFF9FA",
};

const CourseDetailPage = () => {
  const { courseSlug } = useParams(); // Atrapamos el slug del curso desde la URL
  const navigate = useNavigate();
  const { currentCourse, fetchCourseDetailBySlug, loading, error } =
    usePublicSchool();

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
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' color='error' mb={3}>
          No pudimos encontrar este programa.
        </Typography>
        <Button variant='outlined' onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Layout>
      {/* Hero Banner Premium */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "280px", md: "450px" },
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%), url(${currentCourse.flayer_url || "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=1200&auto=format&fit=crop"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          pb: { xs: 4, md: 6 },
        }}
      >
        {/* Botón flotante superior para regresar */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: COLORS.dark,
            fontWeight: 700,
            borderRadius: "12px",
            textTransform: "none",
            px: 2,
            "&:hover": { backgroundColor: "#fff", transform: "scale(1.03)" },
            transition: "0.2s",
          }}
        >
          Volver
        </Button>

        <Container maxWidth='lg'>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              px: 2,
              py: 0.5,
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "1px",
              mb: 2,
            }}
          >
            ✨ {currentCourse.tipo_curso}
          </Box>
          <Typography
            variant='h2'
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "2.3rem", md: "4rem" },
              fontFamily: "'Playfair Display', serif",
              textShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              lineHeight: 1.1,
            }}
          >
            {currentCourse.titulo}
          </Typography>
        </Container>
      </Box>

      {/* Contenido Principal */}
      <Container maxWidth='2xl' sx={{ pt: 6, pb: 16 }}>
        <Grid container spacing={5}>
          {/* Columna Izquierda: Temario / Descripción */}
          <Grid size={{ xs: 12, md: 7.5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "32px",
                border: "1px solid rgba(240, 98, 146, 0.12)",
                background: "#fff",
                boxShadow: "0px 15px 45px rgba(242, 32, 140, 0.01)",
              }}
            >
              {/* Título de la Sección */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}
              >
                <DescIcon sx={{ color: COLORS.primary, fontSize: "1.8rem" }} />
                <Typography
                  variant='h5'
                  sx={{ fontWeight: 800, color: COLORS.dark }}
                >
                  Detalles del Programa
                </Typography>
              </Box>

              {/* 🌟 BLOQUE DE INFO DE CLASE CON ICONOS PREMIUM */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2.5, sm: 4 },
                  backgroundColor: COLORS.lightBg,
                  p: 3,
                  borderRadius: "20px",
                  border: "1px solid rgba(240, 98, 146, 0.08)",
                  mb: 4,
                }}
              >
                {/* Fecha y Hora */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    flex: 1,
                  }}
                >
                  <CalendarMonthIcon sx={{ color: COLORS.accent, mt: 0.3 }} />
                  <Box>
                    <Typography
                      variant='caption'
                      sx={{
                        color: "#777",
                        fontWeight: 600,
                        display: "block",
                        mb: 0.2,
                      }}
                    >
                      FECHA Y HORARIO
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: COLORS.dark, fontWeight: 700, mb: 0.5 }}
                    >
                      {new Date(currentCourse.fecha_inicio).toLocaleDateString(
                        "es-MX",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        color: "#555",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: "0.9rem", color: COLORS.primary }}
                      />{" "}
                      {currentCourse.hora_inicio} a {currentCourse.hora_fin}
                    </Typography>
                  </Box>
                </Box>

                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{
                    display: { xs: "none", sm: "block" },
                    borderColor: "rgba(240, 98, 146, 0.15)",
                  }}
                />

                {/* Instructor / Maestro */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    flex: 1,
                  }}
                >
                  <RecordVoiceOverIcon sx={{ color: COLORS.accent, mt: 0.3 }} />
                  <Box>
                    <Typography
                      variant='caption'
                      sx={{
                        color: "#777",
                        fontWeight: 600,
                        display: "block",
                        mb: 0.2,
                      }}
                    >
                      IMPARTIDO POR
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: 800, color: COLORS.dark }}
                    >
                      {currentCourse.maestro}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{ color: COLORS.primary, fontWeight: 500 }}
                    >
                      Master Instructor Certificado
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Descripción en HTML */}
              <Box
                dangerouslySetInnerHTML={{ __html: currentCourse.descripcion }}
                sx={{
                  color: "#444",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  mb: 5,
                  "& p": { mb: 2 },
                  "& ul, & ol": { pl: 3, mb: 2 },
                  "& li": { mb: 1 },
                  "& strong": { color: COLORS.dark, fontWeight: 700 },
                }}
              />

              {/* 🎥 REPRODUCTOR DINÁMICO DE TIKTOK SIN DESBORDE */}
              {currentCourse.video_presentacion_url && (
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      color: COLORS.dark,
                      fontWeight: 800,
                      mb: 1.5,
                      letterSpacing: "0.5px",
                    }}
                  >
                    🎥 CONOCE MÁS SOBRE ESTA MASTERCLASS:
                  </Typography>

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "340px", // Mantenemos el enfoque estandar de feed vertical
                      margin: "0 auto",
                      borderRadius: "28px", // Bordes más redondeados y pulidos estilo luxury
                      overflow: "hidden", // 🔒 Bloquea absolutamente cualquier scroll o desborde interno del iframe
                      boxShadow: "0px 20px 45px rgba(242, 32, 140, 0.1)",
                      backgroundColor: "#000",
                      // Usamos un truco de padding dinámico o un aspectRatio flexible para teléfonos y web
                      aspectRatio: { xs: "9/15", sm: "9/16" },
                      border: "1px solid rgba(240, 98, 146, 0.2)",
                    }}
                  >
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${currentCourse.video_presentacion_url.split("/video/")[1]?.split("?")[0]}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      scrolling='no' // Evita que el usuario pueda scrollear la interfaz interna de TikTok
                    />
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Columna Derecha: Lista de Materiales Requeridos */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "32px",
                backgroundColor: COLORS.lightBg,
                border: "1px dashed rgba(240, 98, 146, 0.3)",
                position: "sticky",
                top: "24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                }}
              >
                <MaterialIcon
                  sx={{ color: COLORS.accent, fontSize: "1.6rem" }}
                />
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 800, color: COLORS.dark }}
                >
                  Lista de Materiales
                </Typography>
              </Box>
              <Divider
                sx={{ mb: 2.5, borderColor: "rgba(240, 98, 146, 0.15)" }}
              />

              {/* RENDERIZADO HTML SEGURO PARA MATERIALES */}
              <Box
                dangerouslySetInnerHTML={{
                  __html:
                    currentCourse.lista_materiales ||
                    "<p>No se especifican materiales requeridos.</p>",
                }}
                sx={{
                  color: "#555",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  "& ul": { pl: 2, listStyleType: "'✨ '" },
                  "& li": { mb: 1.2 },
                }}
              />

              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid rgba(240, 98, 146, 0.15)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant='caption'
                  color='textSecondary'
                  display='block'
                  sx={{ mb: 0.5, fontWeight: 600 }}
                >
                  INVERSIÓN TOTAL
                </Typography>
                <Typography
                  variant='h3'
                  sx={{ fontWeight: 900, color: COLORS.accent }}
                >
                  {FormatCurrency(currentCourse.costo)}{" "}
                  <Box
                    component='span'
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 500,
                      color: COLORS.dark,
                    }}
                  >
                    MXN
                  </Box>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 🔒 BARRA FIJA INFERIOR - GLASSMORPHISM CON BOTÓN CENTRADO SIEMPRE VISIBLE */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "transparent",
          py: 2.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant='contained'
          size='large'
          sx={{
            minWidth: { xs: "85%", sm: "400px" },
            background: "linear-gradient(90deg, #E2208C 0%, #F06292 100%)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.1rem",
            py: 1.6,
            borderRadius: "18px",
            textTransform: "none",
            boxShadow: "0px 8px 25px rgba(226, 32, 140, 0.35)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #A81464 0%, #E2208C 100%)",
              boxShadow: "0px 12px 30px rgba(226, 32, 140, 0.5)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() =>
            console.log(
              "Iniciar pasarela/flujo de inscripción para el curso:",
              currentCourse.id,
            )
          }
        >
          Inscribirme
        </Button>
      </Box>
    </Layout>
  );
};

export default CourseDetailPage;
