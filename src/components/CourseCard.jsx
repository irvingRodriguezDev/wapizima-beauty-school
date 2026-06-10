import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FormatCurrency } from "../utils/FormatCurrency";

const CourseCard = ({ item }) => {
  return (
    <Card
      sx={{
        borderRadius: "24px", // Esquinas ligeramente más orgánicas y exclusivas
        boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.02)",
        border: "1px solid rgba(244, 114, 182, 0.15)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
        position: "relative",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: "rgba(229, 56, 136, 0.4)",
          boxShadow: "0px 20px 40px rgba(229, 56, 136, 0.08)",
          "& .img-flyer-premium": {
            transform: "scale(1.06)", // Zoom un poco más inmersivo
          },
          "& .btn-course-action": {
            boxShadow: "0px 8px 22px rgba(229, 56, 136, 0.3)",
            backgroundColor: "#D82E7A",
          },
        },
      }}
    >
      {/* CONTENEDOR MULTIMEDIA CON CAPAS TRIDIMENSIONALES */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 220,
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        }}
      >
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
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* 1. BADGE FLOTANTE GLASSMORPHISM (DISPONIBILIDAD) */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backdropFilter: "blur(12px) saturate(160%)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            color: "#D82E7A",
            px: 1.8,
            py: 0.6,
            borderRadius: "50px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            🔥 {item.lugares_disponibles} lugares disponibles
          </Typography>
        </Box>
      </Box>

      {/* CONTENIDO EDITORIAL */}
      <CardContent
        sx={{
          p: 3.5,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexGrow: 1, mb: 3 }}>
          {/* 2. MICRO-BADGE DE CATEGORÍA TEXTUAL (LOOK REVISTA DE MODA) */}
          {item.tipo_curso && (
            <Typography
              variant='caption'
              sx={{
                display: "block",
                color: "#E53888",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
                mb: 1,
              }}
            >
              {item.tipo_curso} Profesional
            </Typography>
          )}

          {/* Título del programa */}
          <Typography
            variant='h6'
            component='h3'
            sx={{
              fontWeight: 800,
              color: "#212121",
              lineHeight: 1.35,
              fontSize: "1.2rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.2px",
              mb: 1.5,
            }}
          >
            {item.maestro ? `${item.titulo} con ${item.maestro}` : item.titulo}
          </Typography>

          {/* Fechas en un formato mucho más minimalista y estético */}
          <Typography
            variant='body2'
            sx={{
              color: "#554D4F",
              fontWeight: 500,
              fontSize: "0.88rem",
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            🗓️ Disponible:{" "}
            {new Date(item.fecha_inicio).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(item.fecha_fin).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>

        {/* CONTENEDOR INFERIOR: PRECIO + BOTÓN DE ACCIÓN FLUIDO */}
        <Box sx={{ mt: "auto", mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2.5,
            }}
          >
            <Typography
              variant='h6'
              component='p'
              sx={{
                fontWeight: 900,
                color: "#E53888",
                fontSize: "1.4rem",
                letterSpacing: "-0.5px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {FormatCurrency(item.costo)}{" "}
              <Box
                component='span'
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#554D4F",
                  ml: 0.3,
                }}
              >
                MXN
              </Box>
            </Typography>
          </Box>

          <Link
            to={`/curso/${item.slug}`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button
              className='btn-course-action'
              variant='contained'
              fullWidth
              endIcon={
                <ArrowForwardIcon sx={{ fontSize: "14px !important" }} />
              }
              sx={{
                borderRadius: "50px",
                py: 1.4,
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "1px",
                textTransform: "none",
                backgroundColor: "#E53888",
                color: "#FFFFFF",
                fontFamily: "'Montserrat', sans-serif",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Ver Detalles
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
