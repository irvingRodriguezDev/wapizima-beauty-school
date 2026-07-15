import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PlantelCard = ({ school, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05, // Cascada elegante
      }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          background: "#FFFFFF",
          borderRadius: "28px", // Bordes más redondeados y modernos
          border: "1px solid rgba(240, 98, 146, 0.12)", // Rosa Wapizima ultra sutil
          overflow: "hidden",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "0px 8px 32px rgba(240, 98, 146, 0.01)",
          "&:hover": {
            transform: "translateY(-8px)",
            borderColor: "rgba(240, 98, 146, 0.35)",
            boxShadow: "0px 20px 40px rgba(240, 98, 146, 0.08)",
            "& .school-logo-container": {
              background:
                "radial-gradient(circle at center, rgba(253, 242, 245, 0.45) 0%, rgba(255, 255, 255, 1) 75%)",
            },
            "& .btn-card-action-imitation": {
              backgroundColor: "#d81b60",
              color: "#FFFFFF",
              transform: "scale(1.02)",
              boxShadow: "0px 8px 20px rgba(240, 98, 146, 0.25)",
            },
            "& .arrow-icon": {
              transform: "translateX(4px)",
            },
          },
        }}
      >
        {/* Contenedor del Logo (Estudio Fotográfico Minimalista) */}
        <Box
          className='school-logo-container'
          sx={{
            height: 170,
            background:
              "radial-gradient(circle at center, rgba(253, 242, 245, 0.25) 0%, rgba(255, 255, 255, 1) 75%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(240, 98, 146, 0.08)",
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
                filter: "drop-shadow(0px 8px 16px rgba(240, 98, 146, 0.06))",
              }}
            />
          ) : (
            // Placeholder Premium si no hay imagen
            <Box
              sx={{
                width: 65,
                height: 65,
                borderRadius: "50%",
                background: "#fdf2f5",
                border: "1px solid rgba(240, 98, 146, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 900,
                  color: "#f06292",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {school.name ? school.name.charAt(0).toUpperCase() : "W"}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Información del plantel */}
        <CardContent
          sx={{
            p: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant='h3'
              component='h3'
              sx={{
                fontWeight: 800,
                color: "#2A2628",
                mb: 1.5,
                fontSize: "1.15rem",
                letterSpacing: "-0.4px",
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: 1.3,
              }}
            >
              {school.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.2,
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ fontSize: 19, color: "#f06292", mt: 0.1 }}
              />
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: "#6B6567",
                  lineHeight: 1.5,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {school.address || "Dirección autorizada Wapizima"}
              </Typography>
            </Box>
          </Box>
          {school.distance !== null && school.distance < 9999 && (
            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(8px)",
                color: "#d81b60",
                px: 1.5,
                py: 0.6,
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(240, 98, 146, 0.95)",
              }}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: "0.95rem" }} />
              <Typography
                variant='caption'
                fontWeight='800'
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {school.distance} km de ti
              </Typography>
            </Box>
          )}
          {/* Botón de Acción Estético de Alta Fidelidad (Simulado sin anidamiento de botón) */}
          <Box
            className='btn-card-action-imitation'
            sx={{
              width: "100%",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
              py: 1.5,
              backgroundColor: "rgba(240, 98, 146, 0.04)",
              color: "#d81b60",
              border: "1px solid rgba(240, 98, 146, 0.2)",
              fontFamily: "'Montserrat', sans-serif",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span>Ver Academia y Cursos</span>
            <ArrowForwardIcon
              className='arrow-icon'
              sx={{
                fontSize: "1rem",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlantelCard;
