import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// ---- ESTILOS LUXURY ROSE GOLD UNIFICADOS ----
const LUXURY_STYLE = {
  roseGoldGradient:
    "linear-gradient(135deg, #ECC4C6 0%, #C3939B 25%, #F0CBD0 50%, #B8858E 75%, #925863 100%)",
  fontSans: "'Montserrat', 'Inter', sans-serif",
  fontSerif: "'Playfair Display', 'Cormorant Garamond', serif",
  cardShadowDefault: "0px 10px 30px rgba(146, 88, 99, 0.04)",
  cardShadowHover: "0px 20px 40px rgba(146, 88, 99, 0.12)",
};

const PlantelCard = ({ school, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
    >
      <Card
        sx={{
          background: "#FFFFFF",
          borderRadius: "24px", // Bordes más suaves y modernos de alta gama
          border: "1px solid rgba(195, 147, 155, 0.15)",
          boxShadow: LUXURY_STYLE.cardShadowDefault,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          "&:hover": {
            transform: "translateY(-8px)",
            borderColor: "rgba(195, 147, 155, 0.4)",
            boxShadow: LUXURY_STYLE.cardShadowHover,
            "& .school-logo-container": {
              background:
                "radial-gradient(circle at center, rgba(240, 203, 208, 0.2) 0%, rgba(255, 255, 255, 1) 70%)",
            },
            "& .btn-card-action": {
              transform: "scale(1.02)",
              filter: "brightness(1.05)",
            },
          },
        }}
      >
        {/* Contenedor del Logo (Efecto Estudio Limpio) */}
        <Box
          className='school-logo-container'
          sx={{
            height: 160,
            background:
              "radial-gradient(circle at center, rgba(240, 203, 208, 0.08) 0%, rgba(255, 255, 255, 1) 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(195, 147, 155, 0.1)",
            p: 4,
            position: "relative",
            transition: "background 0.4s ease",
          }}
        >
          {school.logo_url ? (
            <Box
              component='img'
              src={school.logo_url}
              alt={school.name}
              sx={{
                height: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.03))",
              }}
            />
          ) : (
            <Typography
              variant='h6'
              sx={{
                fontWeight: 900,
                letterSpacing: "2px",
                fontFamily: LUXURY_STYLE.fontSans,
                background: LUXURY_STYLE.roseGoldGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {school.name}
            </Typography>
          )}
        </Box>

        {/* Información del plantel */}
        <CardContent
          sx={{ p: 3.5, flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              color: "#212121",
              mb: 1.5,
              fontSize: "1.2rem",
              fontFamily: LUXURY_STYLE.fontSans,
              letterSpacing: "-0.5px",
            }}
          >
            {school.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 4,
              flexGrow: 1,
            }}
          >
            <LocationOnIcon
              sx={{ fontSize: 18, color: "#C3939B", mt: 0.2 }}
              strokeWidth={1.5}
            />
            <Typography
              variant='body2'
              sx={{
                flex: 1,
                fontWeight: 500,
                color: "#5A5455",
                fontFamily: LUXURY_STYLE.fontSans,
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {school.address || "Dirección no especificada"}
            </Typography>

            {/* Micro-Badge Geográfico Rose Gold */}
            {school.distance !== undefined && (
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(240, 203, 208, 0.3) 0%, rgba(195, 147, 155, 0.15) 100%)",
                  border: "1px solid rgba(195, 147, 155, 0.25)",
                  color: "#925863",
                  px: 1.4,
                  py: 0.4,
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  fontFamily: LUXURY_STYLE.fontSans,
                  whiteSpace: "nowrap",
                }}
              >
                {school.distance.toFixed(1)} km
              </Box>
            )}
          </Box>

          {/* Botón de Acción Estilo Cápsula */}
          <Button
            className='btn-card-action'
            fullWidth
            variant='contained'
            sx={{
              background: LUXURY_STYLE.roseGoldGradient,
              color: "#FFFFFF",
              borderRadius: "50px", // Botón redondo de alta costura
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              py: 1.5,
              boxShadow: "0px 4px 15px rgba(184, 133, 142, 0.2)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                boxShadow: "0px 8px 25px rgba(146, 88, 99, 0.35)",
              },
            }}
          >
            Ver Academia y Cursos
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlantelCard;
