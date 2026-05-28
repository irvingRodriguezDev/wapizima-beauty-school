import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // El tono principal de la academia: Ceniza Profundo / Chocolate Cálido
    primary: {
      main: "#2D2526",
      dark: "#1A1516",
      light: "#423739",
      contrastText: "#FAF6F6",
    },
    // El tono de acento premium: Rosa Viejo / Oro Rosa Satinado Sólido
    secondary: {
      main: "#BA8992",
      dark: "#9E6F78",
      light: "#E8C1C4",
      contrastText: "#2D2526",
    },
    // Fondos de estudio fotográfico neutros (adiós a los pasteles ruidosos)
    background: {
      default: "#FAF6F6", // Fondo crema limpio de alta costura
      paper: "#FFFFFF", // Bloques puros para tarjetas y secciones planas
    },
    text: {
      primary: "#2D2526",
      secondary: "#736466",
    },
  },
  typography: {
    // Mezcla editorial perfecta: Serif para impacto, Sans para lectura limpia
    fontFamily: "'Montserrat', 'Inter', sans-serif",

    h1: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
      fontWeight: 900,
      letterSpacing: "2px",
      color: "#2D2526",
    },
    h2: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
      fontWeight: 800,
      letterSpacing: "1px",
      color: "#2D2526",
    },
    h3: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: "1.5px",
    },
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      lineHeight: 1.7,
      letterSpacing: "0.3px",
    },
    button: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      letterSpacing: "1.5px",
      textTransform: "none", // Adiós a las mayúsculas forzadas automáticas de MUI
    },
  },
  shape: {
    borderRadius: 0, // Cortes limpios y ortogonales de estilo arquitectónico de lujo
  },
  // Desactivamos sombras globales pesadas para asegurar un rendimiento plano impecable
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Botones planos, elegantes y modernos
      },
      styleOverrides: {
        root: {
          borderRadius: "50px", // Mantenemos las cápsulas estilizadas solo para botones de acción
          padding: "10px 24px",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid rgba(186, 137, 146, 0.15)", // Bordes finos en lugar de sombras sucias
        },
      },
    },
  },
});

export default theme;
