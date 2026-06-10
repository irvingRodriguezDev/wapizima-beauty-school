import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const PlantelCard = ({ school, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05, // Efecto cascada fino
      }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          background: "#FFFFFF",
          borderRadius: "24px", // Esquinas suaves premium
          border: "1px solid rgba(244, 114, 182, 0.15)", // Borde rosa sutil
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "0px 8px 24px rgba(229, 56, 136, 0.02)",
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: "rgba(229, 56, 136, 0.35)",
            boxShadow: "0px 16px 32px rgba(229, 56, 136, 0.06)",
            "& .school-logo-container": {
              // Iluminación de estudio rosa que se intensifica al hacer hover
              background:
                "radial-gradient(circle at center, rgba(251, 207, 232, 0.25) 0%, rgba(255, 255, 255, 1) 75%)",
            },
            "& .btn-card-action": {
              boxShadow: "0px 10px 25px rgba(229, 56, 136, 0.35)",
            },
          },
        }}
      >
        {/* Contenedor del Logo (Efecto Estudio Fotográfico Limpio) */}
        <Box
          className='school-logo-container'
          sx={{
            height: 160,
            background:
              "radial-gradient(circle at center, rgba(251, 207, 232, 0.1) 0%, rgba(255, 255, 255, 1) 75%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(244, 114, 182, 0.1)",
            p: 3.5,
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
                filter: "drop-shadow(0px 4px 12px rgba(229, 56, 136, 0.04))",
              }}
            />
          ) : (
            <Typography
              variant='h6'
              sx={{
                fontWeight: 900,
                letterSpacing: "1.5px",
                color: "#E53888",
                fontFamily: "'Montserrat', sans-serif",
                textAlign: "center",
              }}
            >
              {school.name}
            </Typography>
          )}
        </Box>

        {/* Información del plantel */}
        <CardContent
          sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              color: "#212121",
              mb: 1,
              fontSize: "1.15rem",
              letterSpacing: "-0.3px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {school.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 3.5,
              flexGrow: 1,
            }}
          >
            <LocationOnIcon
              sx={{ fontSize: 18, color: "#E53888", mt: 0.2 }} // Ícono rosa Wapizima
            />
            <Typography
              variant='body2'
              sx={{
                flex: 1,
                fontWeight: 500,
                color: "#554D4F",
                lineHeight: 1.5,
                fontFamily: "'Inter', sans-serif",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {school.address || "Dirección no especificada"}
            </Typography>

            {/* Micro-Badge de Kilómetros en Cristal Rosa */}
            {school.distance !== undefined && school.distance < 9999 && (
              <Box
                sx={{
                  background: "rgba(229, 56, 136, 0.06)",
                  border: "1px solid rgba(229, 56, 136, 0.15)",
                  color: "#D82E7A",
                  px: 1.5,
                  py: 0.4,
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  whiteSpace: "nowrap",
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.2px",
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
            color='primary' // Usa directamente tu rosa #E53888
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.88rem",
              letterSpacing: "0.5px",
              py: 1.3,
              bgcolor: "#E03392",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0px 6px 20px rgba(229, 56, 136, 0.18)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
