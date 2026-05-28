import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link, useLocation } from "react-router-dom";

// ---- DIRECCIÓN EDITORIAL DE ALTA GAMA ----
const LUXURY_STYLE = {
  // Gradiente Oro Rosa pulido y balanceado (corrección de sintaxis incluida)
  roseGoldGradient:
    "linear-gradient(135deg, #E8C1C4 0%, #C99A80 30%, #F5D3D7 60%, #BA8992 100%)",
  brandGradient: "linear-gradient(135deg, #2D2526 20%, #734850 90%)",
  fontSans: "'Montserrat', 'Inter', sans-serif",

  // Colores sólidos corporativos de boutique
  bgSolid: "#FAF6F6",
  textPrimary: "#2D2526", // Ceniza profundo
  textSecondary: "#BA8992", // Rosa viejo atenuado
  borderSoft: "rgba(186, 137, 146, 0.2)",
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Detectamos scroll únicamente para añadir la línea de base divisoria
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Quiénes Somos", href: "/nosotros" },
    { label: "Franquicias", href: "/franquicias" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* BARRA DE NAVEGACIÓN COMPLETAMENTE OPACA Y ESTRUCTURAL */}
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          background: LUXURY_STYLE.bgSolid,
          borderBottom: trigger
            ? `1px solid ${LUXURY_STYLE.borderSoft}`
            : "1px solid transparent",
          boxShadow: trigger ? "0px 10px 30px rgba(45, 37, 38, 0.02)" : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 1200,
        }}
      >
        <Container maxWidth='xl' sx={{ px: { xs: 3, md: 6 } }}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              height: { xs: "70px", md: "90px" },
              transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              ...(trigger && {
                height: { xs: "65px", md: "76px" },
              }),
            }}
          >
            {/* 1. IDENTIDAD EDITORIAL */}
            <Link
              to='/'
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Box
                sx={{
                  background: LUXURY_STYLE.roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 22 }} />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.25rem", md: "1.45rem" },
                    lineHeight: 1,
                    letterSpacing: "5px",
                    fontFamily: LUXURY_STYLE.fontSans,
                    background: LUXURY_STYLE.brandGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  WAPIZIMA
                </Typography>
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "6px",
                    fontSize: "0.62rem",
                    color: LUXURY_STYLE.textSecondary,
                    fontFamily: LUXURY_STYLE.fontSans,
                    mt: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Academy
                </Typography>
              </Box>
            </Link>

            {/* 2. MENÚ DESKTOP MINIMALISTA (SIN GLASS NI PASTILLAS FLOTANTES) */}
            <Stack
              direction='row'
              spacing={4} // Mayor separación de estilo pasarela de moda
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Box key={item.label} position='relative'>
                    <Button
                      component={Link}
                      to={item.href}
                      sx={{
                        color: isActive
                          ? LUXURY_STYLE.textSecondary
                          : LUXURY_STYLE.textPrimary,
                        fontWeight: isActive ? 800 : 600,
                        fontSize: "0.9rem",
                        textTransform: "none",
                        fontFamily: LUXURY_STYLE.fontSans,
                        letterSpacing: "1.5px", // Tipografía más espaciada y premium
                        px: 1,
                        py: 0.5,
                        minWidth: "auto",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: LUXURY_STYLE.textSecondary,
                          background: "transparent", // Cero cajas de fondo
                        },
                      }}
                    >
                      {item.label}
                    </Button>

                    {/* Indicador de pestaña activa: Una línea minimalista de alta precisión */}
                    {isActive && (
                      <Box
                        component={motion.div}
                        layoutId='editorialActiveLine'
                        sx={{
                          position: "absolute",
                          bottom: "-6px",
                          left: 0,
                          width: "100%",
                          height: "2px",
                          background: LUXURY_STYLE.roseGoldGradient,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>

            {/* BOTÓN DE MENÚ PARA DISPOSITIVOS MÓVILES */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { md: "none" },
                color: LUXURY_STYLE.textPrimary,
                p: 1,
              }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Colchón de espacio idéntico para que el contenido inicie perfectamente alineado abajo */}
      <Box sx={{ height: { xs: "70px", md: "90px" } }} />

      {/* 3. DRAWER MÓVIL TOTALMENTE OPACO ESTILO BOUTIQUE PRIVADA */}
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            background: LUXURY_STYLE.bgSolid, // Opaco, sólido y pulcro
            boxShadow: "-10px 0px 40px rgba(45, 37, 38, 0.04)",
            borderLeft: `1px solid ${LUXURY_STYLE.borderSoft}`,
          },
        }}
      >
        <Box
          sx={{
            p: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header del Drawer */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 6,
            }}
          >
            <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  background: LUXURY_STYLE.roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 18 }} />
              </Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 900,
                  letterSpacing: "3px",
                  fontFamily: LUXURY_STYLE.fontSans,
                  fontSize: "1.1rem",
                  color: LUXURY_STYLE.textPrimary,
                }}
              >
                WAPIZIMA
              </Typography>
            </Stack>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: LUXURY_STYLE.textPrimary }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Enlaces de navegación del Drawer */}
          <List sx={{ flexGrow: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    to={item.href}
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: "0px", // Cortes limpios sin curvas innecesarias
                      py: 1.8,
                      px: 2,
                      borderLeft: isActive
                        ? `3px solid ${LUXURY_STYLE.textSecondary}`
                        : "3px solid transparent",
                      color: isActive
                        ? LUXURY_STYLE.textSecondary
                        : LUXURY_STYLE.textPrimary,
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(186, 137, 146, 0.03)",
                        color: LUXURY_STYLE.textSecondary,
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 800 : 600,
                        fontSize: "1.05rem",
                        fontFamily: LUXURY_STYLE.fontSans,
                        letterSpacing: "1px",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
