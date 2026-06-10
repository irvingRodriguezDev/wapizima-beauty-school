import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // El rosa fuerte, vibrante y con energía de Wapizima (foco de atención y CTAs)
    primary: {
      main: "#E53888",
      dark: "#D82E7A",
      light: "#F472B6",
      contrastText: "#FFFFFF",
    },
    // El rosa intermedio/chicle que nos ayuda a amalgamar las transiciones
    secondary: {
      main: "#F472B6",
      dark: "#E53888",
      light: "#FBCFE8",
      contrastText: "#FFFFFF",
    },
    // Fondos limpios basados en rosas pastel ultra suaves para evitar la fatiga visual
    background: {
      default: "#FFF5F7", // Fondo aura rosa sumamente sutil y limpio
      paper: "#FFFFFF", // Bloques puros para tarjetas y secciones flotantes
    },
    text: {
      primary: "#2D2526", // Mantenemos un contraste oscuro elegante para lectura
      secondary: "#6B5A5C", // Texto secundario suave
    },
    // PROPIEDAD PERSONALIZADA: Gradientes de 3 colores oficiales de la marca
    gradients: {
      // Transición perfecta: Rosa fuerte -> Rosa medio -> Rosa pastel/luz
      wapizima:
        "linear-gradient(135deg, #ed7bb0eb 0%, #eb88bb 50%, #FFF0F5 100%)",
      // Un gradiente más sutil e iluminado ideal para secciones grandes o fondos de tarjetas
      wapizimaSoft: "linear-gradient(180deg, #FFF0F5 0%, #FFF5F7 100%)",
      // Gradiente radial tipo "Aura" para los fondos de la Landing Principal
      wapizimaAura:
        "radial-gradient(circle at 50% 50%, #FFF0F5 0%, #FFF5F7 100%)",
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Inter', sans-serif",

    h1: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
      fontWeight: 900,
      letterSpacing: "0.5px",
      color: "#2D2526",
    },
    h2: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
      fontWeight: 800,
      letterSpacing: "0.5px",
      color: "#2D2526",
    },
    h3: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      letterSpacing: "0.5px",
    },
    body1: {
      fontFamily: "'Inter', sans-serif", // Inter maneja mejor la lectura fluida en pantallas
      fontWeight: 500,
      lineHeight: 1.7,
      letterSpacing: "0.1px",
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "none",
    },
  },
  shape: {
    // Cambiamos los cortes ortogonales rectos por bordes más orgánicos y amigables (curvas finas)
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "50px", // Botones tipo cápsula estilizados perfectos para la marca
          padding: "12px 28px",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            transform: "translateY(-2px)", // Sutil microinteracción premium al pasar el mouse
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // Tarjetas suaves y estéticas
          boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.05)", // Sombra rosa sumamente sutil, nada "sucia"
          border: "1px solid rgba(244, 114, 182, 0.15)", // Borde fino en rosa de transición
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
