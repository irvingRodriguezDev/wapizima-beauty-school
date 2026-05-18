import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const PlantelCard = ({ school, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        sx={{
          border: "1px solid rgba(240, 98, 146, 0.15)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
          borderRadius: "16px", // Siguiendo tu configuración de tema plano premium
          overflow: "hidden",
          background: "#fff",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            transform: "translateY(-6px)",
            border: "1px solid rgba(240, 98, 146, 0.4)",
          },
        }}
      >
        {/* Banner o contenedor del Logo */}
        <Box
          sx={{
            height: 150,
            bgcolor: "#fdf2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(240, 98, 146, 0.08)",
            p: 3,
          }}
        >
          {school.logo_url ? (
            <Box
              component='img'
              src={school.logo_url}
              alt={school.name}
              sx={{ height: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          ) : (
            <Typography
              variant='h6'
              color='primary'
              fontWeight='900'
              sx={{ letterSpacing: "0.5px" }}
            >
              {school.name}
            </Typography>
          )}
        </Box>

        {/* Información del plantel */}
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant='h6'
            fontWeight='800'
            color='#1a1a1a'
            mb={1}
            noWrap
            sx={{ letterSpacing: "-0.5px" }}
          >
            {school.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 3 }}>
            <LocationOnIcon sx={{ fontSize: 18, color: "#f06292" }} />
            <Typography
              variant='body2'
              color='textSecondary'
              noWrap
              sx={{ flex: 1, fontWeight: 500 }}
            >
              {school.address || "Dirección no especificada"}
            </Typography>

            {school.distance !== undefined && (
              <Typography
                variant='caption'
                sx={{
                  bgcolor: "rgba(240, 98, 146, 0.1)",
                  color: "#d81b60",
                  px: 1.2,
                  py: 0.5,
                  borderRadius: "20px",
                  fontWeight: "800",
                }}
              >
                {school.distance.toFixed(1)} km
              </Typography>
            )}
          </Box>

          <Button
            fullWidth
            variant='contained'
            sx={{
              bgcolor: "#f06292",
              color: "#fff",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "800",
              py: 1.2,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#d81b60",
                boxShadow: "0 6px 15px rgba(216, 27, 96, 0.2)",
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
