import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const BeneficiosGrid = () => {
  const items = [
    {
      icon: <SchoolIcon sx={{ fontSize: 45 }} />,
      title: "Aprende con Másteres",
      desc: "Clases impartidas por profesionales reconocidos a nivel nacional e internacional.",
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 45 }} />,
      title: "Certificación Oficial",
      desc: "Al concluir tus talleres recibes un reconocimiento con valor curricular garantizado.",
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 45 }} />,
      title: "Aparta con el 10%",
      desc: "Inicia tu capacitación sin presiones financieras. Asegura tu lugar con un pago inicial mínimo.",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 45 }} />,
      title: "Kit de Producto Incluido",
      desc: "Acceso a lanzamientos exclusivos y material de la línea original Wapizima.",
    },
  ];

  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant='h4' fontWeight='800' sx={{ color: "#212121" }}>
          ✨ Los beneficios de estudiar en{" "}
          <Box component='span' sx={{ color: "#f06292" }}>
            Wapizima
          </Box>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
            <Box
              sx={{
                textAlign: "center",
                px: 2,
                borderRight: {
                  md:
                    index !== items.length - 1
                      ? "1px dashed rgba(0,0,0,0.1)"
                      : "none",
                },
              }}
            >
              <Box sx={{ color: "#d81b60", mb: 2 }}>{item.icon}</Box>
              <Typography
                variant='h6'
                fontWeight='bold'
                sx={{ color: "#212121", mb: 1, fontSize: "1.1rem" }}
              >
                {item.title}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "#666", lineHeight: 1.6 }}
              >
                {item.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BeneficiosGrid;
