import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";

const DetailsAndDescription = ({ currentCourse }) => {
  // Extraer el ID de TikTok de forma ultra segura para evitar crashes
  const getTikTokId = (url) => {
    if (!url) return null;
    const parts = url.split("/video/");
    return parts[1] ? parts[1].split("?")[0] : null;
  };

  const tikTokId = getTikTokId(
    currentCourse?.video_presentation_url ||
      currentCourse?.video_presentacion_url,
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3.5, md: 5 },
        borderRadius: "32px", // Alineado a los 32px de la CourseCard y Beneficios
        border: "1px solid rgba(245, 79, 156, 0.06)",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 16px 40px rgba(233, 30, 99, 0.02)",
      }}
    >
      {/* Cabecera de la Sección Estilo Editorial */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
        <DescriptionOutlinedIcon
          sx={{ color: "#E91E63", fontSize: "1.5rem" }}
        />
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontSize: "1.15rem",
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
            color: "#2A2628",
          }}
        >
          Detalles del Programa
        </Typography>
      </Box>

      {/* BLOQUE INFORMATIVO DE ENTORNO PROFESIONAL */}
      <Box
        sx={{
          backgroundColor: "rgba(245, 79, 156, 0.02)", // Unificado al rosa Wapizima translúcido
          p: 4,
          mb: 5,
          borderRadius: "24px",
          border: "1px solid rgba(245, 79, 156, 0.06)",
        }}
      >
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {/* Fecha y Horario */}
          <Grid size={{ xs: 12, sm: 5.5 }} sx={{ display: "flex", gap: 2 }}>
            <CalendarMonthOutlinedIcon
              sx={{ color: "#E91E63", mt: 0.3, fontSize: "1.35rem" }}
            />
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "#655F62",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  display: "block",
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                FECHA Y HORARIO
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: "#2A2628",
                  fontWeight: 700,
                  mb: 0.5,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                }}
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

              {/* Reemplazo de Stack por Box con Flexbox Nativo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#655F62",
                }}
              >
                <AccessTimeOutlinedIcon
                  sx={{ fontSize: "0.9rem", color: "#E91E63" }}
                />
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {currentCourse.hora_inicio} a {currentCourse.hora_fin}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Separador Vertical unificado con la API de Grid Correcta */}
          <Grid
            size='auto'
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Divider
              orientation='vertical'
              flexItem
              sx={{ height: "80%", borderColor: "rgba(245, 79, 156, 0.12)" }}
            />
          </Grid>

          {/* Instructor Certificado */}
          <Grid size={{ xs: 12, sm: 5.5 }} sx={{ display: "flex", gap: 2 }}>
            <RecordVoiceOverOutlinedIcon
              sx={{ color: "#E91E63", mt: 0.3, fontSize: "1.35rem" }}
            />
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "#655F62",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  display: "block",
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                IMPARTIDO POR
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 800,
                  color: "#2A2628",
                  fontSize: "0.95rem",
                  fontFamily: "'Inter', sans-serif",
                  mb: 0.5,
                }}
              >
                {currentCourse.maestro}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  color: "#E91E63",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Master Instructor Certificado
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Contenido HTML Seguro de la Descripción */}
      <Box
        dangerouslySetInnerHTML={{
          __html: currentCourse.descripcion,
        }}
        sx={{
          color: "#655F62",
          lineHeight: 1.8,
          fontSize: "0.98rem",
          fontFamily: "'Inter', sans-serif",
          mb: 2,
          "& p": { mb: 2.5 },
          "& ul, & ol": { pl: 3, mb: 2.5 },
          "& li": { mb: 1.2 },
          "& strong": {
            color: "#2A2628",
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
          },
        }}
      />

      {/* REPRODUCTOR TIKTOK ESTILO SMARTPHONE SMART */}
      {tikTokId && (
        <Box
          sx={{
            mt: 6,
            pt: 5,
            borderTop: "1px solid rgba(245, 79, 156, 0.08)",
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              color: "#2A2628",
              fontWeight: 800,
              mb: 4,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
            }}
          >
            🎥 Conoce más sobre esta Masterclass
          </Typography>

          {/* Contenedor Celular Inteligente */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "310px",
              margin: "0 auto",
              borderRadius: "36px",
              overflow: "hidden",
              backgroundColor: "#000000",
              aspectRatio: "9/16",
              boxShadow: "0px 20px 48px rgba(233, 30, 99, 0.06)",
              border: "6px solid #2A2628", // Marco del dispositivo más estilizado e integrado
            }}
          >
            <iframe
              src={`https://www.tiktok.com/embed/v2/${tikTokId}`}
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
              scrolling='no'
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default DetailsAndDescription;
