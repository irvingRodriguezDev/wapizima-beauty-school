import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f06292', // El rosa vibrante de Floreciendo Juntas
      dark: '#d81b60',
      light: '#f8bbd0',
    },
    secondary: {
      main: '#635bff', // El morado de Stripe por si usas acentos
    },
    background: {
      default: '#fdf2f5', // Un fondo rosa pastel ultra suave
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h4: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16, // Bordes redondeados y modernos para tus tarjetas flat
  },
});

export default theme;
