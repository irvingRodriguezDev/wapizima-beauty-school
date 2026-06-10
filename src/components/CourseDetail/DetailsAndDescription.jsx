import React from "react";
import { Box, Grid, Paper, Typography, Divider, Stack } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const DetailsAndDescription = ({ currentCourse }) => {
  return (
    <Grid size={{ xs: 12, md: 7.5 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, md: 5 },
          borderRadius: "24px", // Esquinas suaves premium coordinadas
          border: "1px solid rgba(244, 114, 182, 0.18)",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.02)",
        }}
      >
        {/* Cabecera de la Sección Estilo Editorial */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
          <DescriptionIcon sx={{ color: "#E53888", fontSize: "1.6rem" }} />
          <Typography
            variant='h4'
            component='h2'
            sx={{
              fontSize: "1.25rem",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              color: "#212121",
            }}
          >
            Detalles del Programa
          </Typography>
        </Box>

        {/* BLOQUE INFORMATIVO DE ENTORNO PROFESIONAL */}
        <Box
          sx={{
            backgroundColor: "rgba(229, 56, 136, 0.03)", // Fondo rosa translúcido muy sutil
            p: 3,
            mb: 5,
            borderRadius: "20px",
            border: "1px solid rgba(229, 56, 136, 0.08)",
          }}
        >
          <Grid container spacing={3}>
            {/* Fecha y Horario */}
            <Grid item xs={12} sm={6} sx={{ display: "flex", gap: 2 }}>
              <CalendarMonthIcon
                sx={{ color: "#E53888", mt: 0.2, fontSize: "1.4rem" }}
              />
              <Box>
                <Typography
                  variant='caption'
                  sx={{
                    color: "#554D4F",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    display: "block",
                    mb: 0.8,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  FECHA Y HORARIO
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: "#212121",
                    fontWeight: 700,
                    mb: 0.8,
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
                <Stack
                  direction='row'
                  spacing={0.5}
                  sx={{ alignItems: "center" }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: "0.95rem", color: "#D82E7A" }}
                  />
                  <Typography
                    variant='caption'
                    sx={{
                      color: "#554D4F",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {currentCourse.hora_inicio} a {currentCourse.hora_fin}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            {/* Separador Vertical solo visible en pantallas medianas o superiores */}
            <Grid
              item
              xs={12}
              sm='auto'
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Divider
                orientation='vertical'
                flexItem
                sx={{ height: "100%", borderColor: "rgba(229, 56, 136, 0.15)" }}
              />
            </Grid>

            {/* Instructor Certificado */}
            <Grid item xs={12} sm={5.5} sx={{ display: "flex", gap: 2 }}>
              <RecordVoiceOverIcon
                sx={{ color: "#E53888", mt: 0.2, fontSize: "1.4rem" }}
              />
              <Box>
                <Typography
                  variant='caption'
                  sx={{
                    color: "#554D4F",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    display: "block",
                    mb: 0.8,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  IMPARTIDO POR
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 800,
                    color: "#212121",
                    fontSize: "0.95rem",
                    fontFamily: "'Inter', sans-serif",
                    mb: 0.3,
                  }}
                >
                  {currentCourse.maestro}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{
                    color: "#D82E7A",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "0.2px",
                  }}
                >
                  Master Instructor Certificado
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Contenido HTML Seguro de la Descripción Pulido */}
        <Box
          dangerouslySetInnerHTML={{
            __html: currentCourse.descripcion,
          }}
          sx={{
            color: "#554D4F",
            lineHeight: 1.8,
            fontSize: "0.98rem",
            fontFamily: "'Inter', sans-serif",
            mb: 2,
            "& p": { mb: 2.5 },
            "& ul, & ol": { pl: 3, mb: 2.5 },
            "& li": { mb: 1.2 },
            "& strong": {
              color: "#212121",
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
            },
          }}
        />

        {/* REPRODUCTOR TIKTOK ESTILO SMARTPHONE SMART */}
        {currentCourse.video_presentacion_url && (
          <Box
            sx={{
              mt: 6,
              pt: 5,
              borderTop: "1px solid rgba(244, 114, 182, 0.15)",
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: "#212121",
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

            {/* Contenedor con Aspecto de Pantalla de Teléfono Premium */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "320px",
                margin: "0 auto",
                borderRadius: "32px", // Bordes redondeados imitando un teléfono móvil
                overflow: "hidden",
                backgroundColor: "#000000",
                aspectRatio: "9/16",
                boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.08)",
                border: "4px solid #212121", // Sutil marco simulando bisel de celular
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
                scrolling='no'
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default DetailsAndDescription;
