import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Home from "../pages/Home";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
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
    <Grid container spacing={2}>
      <Grid size={12} sx={{ textAlign: "center", mb: 5, mt: 2 }}>
        <Typography variant='h4' fontWeight='800' sx={{ color: "#212121" }}>
          ✨ Los beneficios de estudiar en{" "}
          <Box component='span' sx={{ color: "#f06292" }}>
            Wapizima
          </Box>
        </Typography>
      </Grid>

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
      <Grid
        size={12}
        sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}
      >
        <motion.div variants={itemVariants}>
          <Button
            variant='contained'
            // onClick={onDiscoverLocations}
            endIcon={<LocationOnIcon />}
            sx={{
              bgcolor: "#d81b60",
              color: "#fff",
              px: 6,
              py: 2.2,
              borderRadius: "50px",
              fontWeight: "800",
              textTransform: "none",
              fontSize: "1.1rem",
              letterSpacing: "0.5px",
              boxShadow: "0 12px 30px rgba(216, 27, 96, 0.4)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "#d81b60",
                transform: "scale(1.03)",
                boxShadow: "0 15px 35px rgba(216, 27, 96, 0.6)",
              },
            }}
          >
            Comienza tu transformación aquí
          </Button>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default BeneficiosGrid;
