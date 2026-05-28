import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Description as DescIcon } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const DetailsAndDescription = ({ currentCourse }) => {
  return (
    <Grid size={{ xs: 12, md: 7.5 }}>
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: "12px", // Ortogonal estricto
          border: "1px solid",
          borderColor: "rgba(186, 137, 146, 0.15)",
          bgcolor: "background.paper",
        }}
      >
        {/* Cabecera de la Sección */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <DescIcon sx={{ color: "secondary.main", fontSize: "1.5rem" }} />
          <Typography
            variant='h4'
            component='h2'
            sx={{
              fontSize: "1.3rem",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#BA8992",
            }}
          >
            Detalles del Programa
          </Typography>
        </Box>

        {/* BLOQUE INFORMATIVO DE CLASE (DURACIÓN E INSTRUCTOR) */}
        <Grid
          container
          spacing={3}
          sx={{
            bgcolor: "background.default",
            p: 3,
            mb: 5,
            borderRadius: "12px",
            borderLeft: "3px solid",
            borderColor: "secondary.main",
          }}
        >
          {/* Fecha y Horario */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", gap: 2 }}>
            <CalendarMonthIcon
              sx={{
                color: "secondary.main",
                mt: 0.3,
                fontSize: "1.3rem",
              }}
            />
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  display: "block",
                  mb: 0.5,
                }}
              >
                FECHA Y HORARIO
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "primary.main", fontWeight: 700, mb: 0.5 }}
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
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 600,
                }}
              >
                <AccessTimeIcon
                  sx={{ fontSize: "0.9rem", color: "secondary.main" }}
                />{" "}
                {currentCourse.hora_inicio} a {currentCourse.hora_fin}
              </Typography>
            </Box>
          </Grid>

          {/* Instructor Certificado */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", gap: 2 }}>
            <RecordVoiceOverIcon
              sx={{
                color: "secondary.main",
                mt: 0.3,
                fontSize: "1.3rem",
              }}
            />
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  display: "block",
                  mb: 0.5,
                }}
              >
                IMPARTIDO POR
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                  fontSize: "0.95rem",
                }}
              >
                {currentCourse.maestro}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  color: "secondary.main",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                Master Instructor Certificado
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Contenido HTML Seguro de la Descripción */}
        <Box
          dangerouslySetInnerHTML={{
            __html: currentCourse.descripcion,
          }}
          sx={{
            color: "text.primary",
            lineHeight: 1.8,
            fontSize: "0.95rem",
            mb: 4,
            "& p": { mb: 2.5 },
            "& ul, & ol": { pl: 3, mb: 2.5 },
            "& li": { mb: 1.2 },
            "& strong": { color: "primary.main", fontWeight: 800 },
          }}
        />

        {/* REPRODUCTOR TIKTOK ESTILO GALERÍA EDITORIAL */}
        {currentCourse.video_presentacion_url && (
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: "1px solid",
              borderColor: "rgba(186, 137, 146, 0.12)",
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: "primary.main",
                fontWeight: 800,
                mb: 3,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontSize: "0.85rem",
              }}
            >
              🎥 Conoce más sobre esta Masterclass
            </Typography>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "340px",
                margin: "0 auto",
                borderRadius: 0, // Recto y limpio
                overflow: "hidden",
                backgroundColor: "#000000",
                aspectRatio: { xs: "9/15", sm: "9/16" },
                border: "1px solid",
                borderColor: "rgba(186, 137, 146, 0.3)",
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
