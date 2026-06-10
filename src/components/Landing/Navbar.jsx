import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
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
import { Link, useLocation } from "react-router-dom";
import LogoWapizima from "../../assets/Logo_Wapizima.webp";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Cambia sutilmente los valores cuando el usuario hace scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
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
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          // Base de vidrio: Blanco ultra traslúcido (0.4) que se vuelve un poco más sólido al hacer scroll (0.7)
          background: trigger
            ? "rgba(255, 255, 255, 0.75)"
            : "rgba(255, 255, 255, 0.4)",
          // El secreto del Glassmorphism: Desenfoque de fondo de alta densidad
          backdropFilter: "blur(11.1px)",
          WebkitBackdropFilter: "blur(11.1px)",
          // Línea divisoria milimétrica con reflejo rosa para que no se pierda en fondos blancos
          borderBottom: trigger
            ? "1px solid rgba(229, 56, 136, 0.12)"
            : "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Container maxWidth='xl' sx={{ px: { xs: 3, md: 6 } }}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              // Transición de altura fluida al hacer scroll
              height: { xs: "75px", md: "95px" },
              transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              ...(trigger && {
                height: { xs: "65px", md: "75px" },
              }),
            }}
          >
            {/* 1. IDENTIDAD */}
            <Link
              to='/'
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <img
                  src={LogoWapizima}
                  alt='Wapizima Academy'
                  style={{
                    width: "auto",
                    height: trigger ? "45px" : "55px", // El logo se encoge sutilmente con el scroll
                    transition: "height 0.4s ease",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Link>

            {/* 2. MENÚ DESKTOP (Botones limpios sobre el vidrio) */}
            <Stack
              direction='row'
              spacing={5}
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
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "0.9rem",
                        textTransform: "none",
                        letterSpacing: "1.2px",
                        px: 1,
                        py: 0.5,
                        minWidth: "auto",
                        color: isActive ? "#E53888" : "#2D2526",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          background: "transparent",
                          color: "#E53888",
                        },
                      }}
                    >
                      {item.label}
                    </Button>

                    {/* Indicador activo: Línea orgánica difuminada abajo del texto */}
                    {isActive && (
                      <Box
                        component={motion.div}
                        layoutId='glassActiveLine'
                        sx={{
                          position: "absolute",
                          bottom: "-4px",
                          left: "20%",
                          width: "60%",
                          height: "3px",
                          borderRadius: "2px",
                          background:
                            "linear-gradient(90deg, #E53888, #F472B6)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>

            {/* BOTÓN MÓVIL */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { md: "none" },
                color: "#2D2526",
                p: 1,
              }}
            >
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* REEMPLAZO DEL COLCHÓN: Mantenemos la estructura limpia */}
      <Box sx={{ height: { xs: "75px", md: "95px" } }} />

      {/* 3. DRAWER MÓVIL CON EFECTO VIDRIO ESMERILADO */}
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(25px)",
            borderLeft: "1px solid rgba(229, 56, 136, 0.1)",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 5,
            }}
          >
            <img
              src={LogoWapizima}
              alt='Logo'
              style={{ height: "35px", width: "auto" }}
            />
            <IconButton onClick={handleDrawerToggle} sx={{ color: "#2D2526" }}>
              <CloseIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Box>

          <List sx={{ flexGrow: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <ListItem key={item.label} disablePadding sx={{ mb: 1.5 }}>
                  <ListItemButton
                    component={Link}
                    to={item.href}
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: "12px",
                      py: 1.5,
                      px: 2,
                      color: isActive ? "#E53888" : "#2D2526",
                      backgroundColor: isActive
                        ? "rgba(229, 56, 136, 0.06)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(229, 56, 136, 0.03)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "1rem",
                        letterSpacing: "0.5px",
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
