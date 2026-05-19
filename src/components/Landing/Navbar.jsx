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
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detecta el scroll para añadir una ligera sombra cuando el usuario baja
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
        position='sticky'
        elevation={0}
        sx={{
          background: trigger
            ? "transparent"
            : "radial-gradient(circle at 85% 20%, rgba(240, 98, 146, 0.08) 0%, rgba(255, 255, 255, 0) 60%)",
          backdropFilter: "blur(12px)",
          borderBottom: trigger
            ? "1px solid rgba(240, 98, 146, 0.15)"
            : "1px solid transparent",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "between",
            maxWidth: "lg",
            width: "100%",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* LOGO DE LA MARCA */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexGrow: 1,
              color: "#1a1a1a",
            }}
          >
            <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 22 }} />
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  fontWeight: 900,
                  letterSpacing: "1px",
                  background:
                    "linear-gradient(45deg, #1a1a1a 40%, #d81b60 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WAPIZIMA
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontWeight: 500,
                  color: "#f06292",
                  display: { xs: "none", sm: "block" },
                  mt: 0.5,
                }}
              >
                ACADEMY
              </Typography>
            </Link>
          </Box>

          {/* NAVEGACIÓN DESKTOP */}
          <Stack
            direction='row'
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Box
                key={item.label}
                component={motion.div}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  href={item.href}
                  sx={{
                    color: "#444",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    textTransform: "none",
                    px: 2,
                    borderRadius: "8px",
                    "&:hover": {
                      color: "#d81b60",
                      background: "rgba(240, 98, 146, 0.05)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Box>
            ))}

            {/* BOTÓN DE ACCIÓN DESTACADO */}
          </Stack>

          {/* MENÚ HAMBURGUESA (RESPONSIVO MÓVIL) */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: "#1a1a1a" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MENÚ DESPLEGABLE MÓVIL (DRAWER) */}
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        // PaperProps={{
        //   sx: {
        //     width: 260,
        //     background: "rgba(255, 255, 255, 0.95)",
        //     backdropFilter: "blur(10px)",
        //   },
        // }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Stack direction='row' spacing={1} mb={4}>
            <AutoAwesomeIcon sx={{ color: "#f06292" }} />
            <Typography variant='h6' fontWeight='900' color='#1a1a1a'>
              WAPIZIMA
            </Typography>
          </Stack>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={{ textAlign: "center", borderRadius: "10px", my: 0.5 }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            variant='contained'
            sx={{
              bgcolor: "#f06292",
              borderRadius: "20px",
              fontWeight: "800",
              mt: 4,
            }}
          >
            Inscribirme
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
