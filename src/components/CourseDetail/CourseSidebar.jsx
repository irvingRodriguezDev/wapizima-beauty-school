import React from "react";
import { Box, Paper, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MaterialList from "./MaterialList";

// Recibimos onEnrollClick para detonar el modal desde el contenedor flotante
const CourseSidebar = ({ currentCourse, onEnrollClick }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: "120px", // Calibrado para dar aire y convivir limpio con el Navbar flotante
        display: "flex",
        flexDirection: "column",
        gap: 4,
        zIndex: 10,
      }}
    >
      {/* TARJETA PREMIUM DEL FLYER */}

      {/* COMPONENTE DE MATERIALES Y PLAN DE ABONOS (Desglose cómodo del 30%) */}
      <MaterialList currentCourse={currentCourse} />

      {/* BOTÓN PRIMARIO DE INSCRIPCIÓN VINCULADO AL MODAL DE COBRO */}
      <Button
        variant='contained'
        disableElevation
        fullWidth
        onClick={onEnrollClick} // Conexión directa al flujo de Stripe Checkout
        endIcon={<ArrowForwardIcon />}
        sx={{
          borderRadius: "99px",
          py: 2.2,
          fontWeight: 700,
          fontSize: "0.95rem",
          letterSpacing: "0.5px",
          textTransform: "none",
          background: "linear-gradient(90deg, #E91E63 0%, #FF6097 100%)",
          color: "#FFFFFF",
          fontFamily: "'Montserrat', sans-serif",
          boxShadow: "0px 12px 28px rgba(233, 30, 99, 0.16)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0px 16px 36px rgba(233, 30, 99, 0.25)",
          },
        }}
      >
        Inscribirme al taller ahora
      </Button>
    </Box>
  );
};

export default CourseSidebar;
