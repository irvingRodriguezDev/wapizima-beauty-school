import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import TeacherIcon from "@mui/icons-material/AutoStoriesOutlined";
import { FormatCurrency } from "../utils/FormatCurrency";
import FormatDate from "../utils/FormatDate";

const CourseCard = ({ item }) => {
  return (
    <Card
      sx={{
        borderRadius: "28px",
        boxShadow: "0px 16px 45px rgba(229, 56, 136, 0.03)",
        border: "1px solid rgba(245, 79, 156, 0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "rgba(229, 56, 136, 0.25)",
          boxShadow: "0px 24px 50px rgba(229, 56, 136, 0.09)",
          "& .img-flyer-premium": {
            transform: "scale(1.04)",
          },
          "& .btn-course-action": {
            background: "linear-gradient(90deg, #E53888 0%, #F472B6 100%)",
            boxShadow: "0px 8px 24px rgba(229, 56, 136, 0.2)",
            transform: "scale(1.01)",
          },
        },
      }}
    >
      {/* 📸 CONTENEDOR MULTIMEDIA ANCLADO */}
      <Box sx={{ position: "relative", overflow: "hidden", height: 260 }}>
        <CardMedia
          component='img'
          className='img-flyer-premium'
          image={
            item.flayer_url ||
            "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=600&auto=format&fit=crop"
          }
          alt={item.titulo}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* 🏷️ BADGE FLOTANTE DE CATEGORÍA (CURSO / TALLER) */}
        {/* <Chip
          label={
            item.tipo_curso === "Taller"
              ? "Taller Intensivo"
              : "Curso Certificado"
          }
          size='small'
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 2,
            backgroundColor:
              item.tipo_curso === "Taller" ? "#FFF3E0" : "#FDE0F1",
            color: item.tipo_curso === "Taller" ? "#ED6C0E" : "#E53888",
            fontWeight: 800,
            fontSize: "0.65rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            borderRadius: "8px",
            border: "none",
          }}
        /> */}

        {/* 🟢 BADGE FLOTANTE: LUGARES DISPONIBLES CON PULSO ANIMADO */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            color: "#2A2628",
            px: 1.8,
            py: 0.6,
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 2,
            boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
          }}
        >
          <Box
            sx={{ position: "relative", display: "flex", width: 6, height: 6 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#4caf50", // Color verde para indicar disponibilidad activa
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                animation: "pulseWave 2s infinite ease-in-out",
                "@keyframes pulseWave": {
                  "0%": { transform: "scale(1)", opacity: 1 },
                  "100%": { transform: "scale(3.5)", opacity: 0 },
                },
              }}
            />
          </Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "0.68rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.4px",
            }}
          >
            {item.lugares_disponibles} lugares
          </Typography>
        </Box>
      </Box>

      {/* 📝 CONTENIDO EDITORIAL PREMIUM */}
      <CardContent
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Cuerpo informativo principal */}
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          {/* Nombre de la Master Instructora */}
          {item.maestro && (
            <Stack
              direction='row'
              spacing={0.5}
              sx={{ mb: 1, opacity: 0.85, alignItems: "center" }}
            >
              <TeacherIcon sx={{ fontSize: 14, color: "#E53888" }} />
              <Typography
                variant='caption'
                sx={{
                  fontWeight: 700,
                  color: "#6B6567",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Master: {item.maestro}
              </Typography>
            </Stack>
          )}

          {/* Título de la capacitación */}
          <Typography
            variant='h6'
            component='h3'
            sx={{
              fontWeight: 800,
              color: "#2A2628",
              lineHeight: 1.35,
              fontSize: "1.1rem",
              fontFamily: "'Montserrat', sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden", // Mantiene simétrica la altura de la card si hay títulos muy largos
              height: 44,
            }}
          >
            {item.titulo}
          </Typography>
        </Box>

        {/* 📊 SECCIÓN INFERIOR: COSTO + CALENDARIO DISTRIBUIDO */}
        <Box
          sx={{
            width: "100%",
            pt: 2.5,
            borderTop: "1px dashed rgba(229, 56, 136, 0.12)",
          }}
        >
          <Stack
            direction='column'
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 2.5,
            }}
          >
            {/* Bloque Financiero */}
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "#8B8285",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                }}
              >
                Inversión
              </Typography>
              <Typography
                variant='h5'
                component='p'
                sx={{
                  fontWeight: 900,
                  color: "#2A2628",
                  fontSize: "1.25rem",
                  fontFamily: "'Montserrat', sans-serif",
                  lineHeight: 1.1,
                }}
              >
                {FormatCurrency(item.costo)}
                <Box
                  component='span'
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    color: "#E53888",
                    ml: 0.5,
                  }}
                >
                  MXN
                </Box>
              </Typography>
            </Box>

            {/* Bloque de Calendario a la Derecha */}
            <Box sx={{ textAlign: "right", maxWidth: "60%" }}>
              <Stack
                direction='row'
                sx={{
                  mb: 0.25,
                  alignItems: "center",
                  spacing: 0.5,
                  justifyContent: "center",
                }}
              >
                <CalendarIcon sx={{ fontSize: 13, color: "#8B8285" }} />
                <Typography
                  variant='caption'
                  sx={{
                    color: "#8B8285",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Fecha / Hora{" "}
                </Typography>
              </Stack>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  fontFamily: "'Inter', sans-serif",
                  color: "#554D4F",
                }}
              >
                {item.tipo_curso === "Taller" ? "" : " "}
                <span style={{ color: "#2A2628" }}>
                  {FormatDate(item.fecha_inicio)} / {item.hora_inicio}
                </span>
              </Typography>
            </Box>
          </Stack>

          {/* ⚡ Botón de Acción Directa Call-To-Action */}
          <Link
            to={`/curso/${item.slug}`}
            style={{ textDecoration: "none", display: "block", width: "100%" }}
          >
            <Button
              className='btn-course-action'
              variant='contained'
              disableElevation
              fullWidth
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: "16px", // Acabado squircle en sintonía con las nuevas directrices
                py: 1.4,
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                background: "#E53888",
                color: "#FFFFFF",
                fontFamily: "'Montserrat', sans-serif",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Ver detalles del{" "}
              {item.tipo_curso === "Taller" ? "Taller" : "Curso"}
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
