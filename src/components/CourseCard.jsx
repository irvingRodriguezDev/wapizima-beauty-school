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
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { FormatCurrency } from "../utils/FormatCurrency";
import FormatDate from "../utils/FormatDate";

const CourseCard = ({ item }) => {
  return (
    <Card
      sx={{
        borderRadius: "32px",
        boxShadow: "0px 16px 40px rgba(233, 30, 99, 0.02)",
        border: "1px solid rgba(245, 79, 156, 0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: "rgba(233, 30, 99, 0.2)",
          boxShadow: "0px 24px 48px rgba(233, 30, 99, 0.08)",
          "& .img-flyer-premium": {
            transform: "scale(1.05)",
          },
          "& .btn-course-action": {
            background: "linear-gradient(90deg, #E91E63 0%, #FF6097 100%)",
            boxShadow: "0px 8px 24px rgba(233, 30, 99, 0.25)",
          },
        },
      }}
    >
      {/* CONTENEDOR MULTIMEDIA */}
      <Box sx={{ position: "relative", overflow: "hidden", height: 280 }}>
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

        {/* BADGE FLOTANTE DISPONIBILIDAD */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            color: "#E91E63",
            px: 2,
            py: 0.8,
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 2,
          }}
        >
          <Box
            sx={{ position: "relative", display: "flex", width: 7, height: 7 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#E91E63",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#E91E63",
                animation: "pulseWave 1.8s infinite ease-in-out",
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
              fontSize: "0.7rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
            }}
          >
            {item.lugares_disponibles} lugares
          </Typography>
        </Box>
      </Box>

      {/* CONTENIDO EDITORIAL */}
      <CardContent
        sx={{ p: 4, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* BLOQUE INFORMATIVO SUPERIOR */}
        <Box sx={{ flexGrow: 1, mb: 3 }}>
          {item.tipo_curso && (
            <Typography
              variant='caption'
              sx={{
                display: "block",
                color: "#E91E63",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
                mb: 1,
              }}
            >
              {item.tipo_curso} Profesional
            </Typography>
          )}

          <Typography
            variant='h6'
            component='h3'
            sx={{
              fontWeight: 800,
              color: "#2A2628",
              lineHeight: 1.4,
              fontSize: "1.25rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.2px",
            }}
          >
            {item.maestro ? `${item.titulo} con ${item.maestro}` : item.titulo}
          </Typography>
        </Box>

        {/* CONTENEDOR INFERIOR: ENFASIS EN PRECIO + FECHA CENTRADA */}
        <Box
          sx={{ width: "100%", pt: 3, borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          {/* Bloque de Costo Máximo Impacto */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant='caption'
              sx={{
                color: "#655F62",
                fontWeight: 600,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 0.5,
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
                fontSize: "1.6rem", // Mayor tamaño para destacar el precio
                letterSpacing: "-0.5px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {FormatCurrency(item.costo)}
              <Box
                component='span'
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#E91E63",
                  ml: 0.5,
                }}
              >
                MXN
              </Box>
            </Typography>
          </Box>

          {/* Bloque de Fecha Centrado Limpio */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.8,
              color: "#655F62",
              mb: 3,
            }}
          >
            <CalendarTodayOutlinedIcon
              sx={{ fontSize: 14, color: "#E91E63" }}
            />
            <Typography
              variant='body2'
              sx={{
                fontWeight: 500,
                fontSize: "0.85rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {item.tipo_curso === "Taller" ? "El día " : "Del "}
              <b>{FormatDate(item.fecha_inicio)}</b>
              {item.tipo_curso === "Taller" ? " " : " Al "}{" "}
              <>
                {item.tipo_curso === "Taller" ? (
                  " "
                ) : (
                  <b>{FormatDate(item.fecha_fin)}</b>
                )}
              </>
            </Typography>
          </Box>

          {/* Botón de Acción Directa fullWidth */}
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
                borderRadius: "99px",
                py: 1.6,
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.5px",
                textTransform: "none",
                background: "#f86697",
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
