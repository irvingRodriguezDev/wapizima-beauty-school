import React from "react";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { FormatCurrency } from "../../utils/FormatCurrency";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const MaterialList = ({ currentCourse }) => {
  // Cálculo dinámico para la facilidad del 30% de apartado
  const costoTotal = currentCourse?.costo || 0;
  const pagoInicial = costoTotal * 0.3;
  const saldoRestante = costoTotal * 0.7;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3.5, md: 4 },
        borderRadius: "32px", // Unificado con los bloques hermanos
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(245, 79, 156, 0.06)",
        boxShadow: "0px 16px 40px rgba(233, 30, 99, 0.02)",
        position: "sticky",
        top: "120px", // Espacio perfecto para convivir con el Navbar flotante
        zIndex: 10,
      }}
    >
      {/* Cabecera Editorial */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <CardTravelOutlinedIcon sx={{ color: "#E91E63", fontSize: "1.4rem" }} />
        <Typography
          variant='h6'
          component='h2'
          sx={{
            fontWeight: 800,
            fontSize: "1.05rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
            color: "#2A2628",
          }}
        >
          Lista de Materiales
        </Typography>
      </Box>

      <Divider sx={{ mb: 3, borderColor: "rgba(245, 79, 156, 0.08)" }} />

      {/* Listado de Materiales Inyectado Seguro */}
      <Box
        dangerouslySetInnerHTML={{
          __html:
            currentCourse.lista_materiales ||
            "<p>No se especifican materiales obligatorios. Todo el producto básico está incluido en la academia.</p>",
        }}
        sx={{
          color: "#655F62",
          fontSize: "0.92rem",
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.8,
          mb: 4,
          "& ul": { pl: 0, listStyleType: "none" },
          "& li": {
            mb: 2,
            color: "#2A2628",
            position: "relative",
            pl: 2.5,
            fontWeight: 500,
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "9px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#E91E63", // Viñeta rosa calibrada
            },
          },
        }}
      />
    </Paper>
  );
};

export default MaterialList;
