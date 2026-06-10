import React from "react";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { FormatCurrency } from "../../utils/FormatCurrency";
import CardTravelIcon from "@mui/icons-material/CardTravel";

const MaterialList = ({ currentCourse }) => {
  return (
    <Grid size={{ xs: 12, md: 4.5 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, md: 4 },
          borderRadius: "24px", // Suavizado unificado
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(244, 114, 182, 0.18)",
          boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.02)",
          position: "sticky",
          top: "100px", // Ajustado para dar aire con el navbar flotante
          zIndex: 10,
        }}
      >
        {/* Cabecera Editorial */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <CardTravelIcon sx={{ color: "#E53888", fontSize: "1.5rem" }} />
          <Typography
            variant='h6'
            component='h2'
            sx={{
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              color: "#212121",
            }}
          >
            Lista de Materiales
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(229, 56, 136, 0.1)" }} />

        {/* Listado de Materiales Inyectado Seguro */}
        <Box
          dangerouslySetInnerHTML={{
            __html:
              currentCourse.lista_materiales ||
              "<p>No se especifican materiales requeridos para este programa.</p>",
          }}
          sx={{
            color: "#554D4F",
            fontSize: "0.92rem",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.75,
            "& ul": { pl: 2, listStyleType: "none" }, // Quitamos la viñeta por defecto gris
            "& li": {
              mb: 1.8,
              color: "#212121",
              position: "relative",
              pl: 2.5,
              // Viñeta rosa personalizada premium estilizada
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "8px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#E53888",
              },
            },
          }}
        />

        {/* CONTENEDOR DE INVERSIÓN TOTAL ESTILO TICKET DE LUJO */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: "16px",
            background:
              "linear-gradient(145deg, rgba(229, 56, 136, 0.02) 0%, rgba(216, 46, 122, 0.05) 100%)",
            border: "1px dashed rgba(229, 56, 136, 0.2)",
            textAlign: "center",
          }}
        >
          <Typography
            variant='caption'
            sx={{
              mb: 0.5,
              fontWeight: 700,
              color: "#554D4F",
              letterSpacing: "2px",
              display: "block",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            COSTO
          </Typography>

          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: "#E53888",
              fontSize: "2.1rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.5px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            {FormatCurrency(currentCourse.costo)}
            <Box
              component='span'
              sx={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#554D4F",
              }}
            >
              MXN
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default MaterialList;
