import { Box, Button } from "@mui/material";
import React from "react";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { motion, AnimatePresence } from "framer-motion";

const FloattingButton = ({ setOpenModalInscription, pagoInicial }) => {
  return (
    <Box
      component={motion.div}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        position: "fixed",
        bottom: "24px", // Separado sutilmente del borde inferior de la pantalla para el toque premium flotante
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: "flex", lg: "flex" }, // Visible en todo móvil/tablet y se apaga en desktop
        justifyContent: "center",
        px: 3,
        pointerEvents: "none", // Deja pasar los scrolls de fondo si tocan los extremos vacíos
      }}
    >
      <Box
        component={motion.div}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          width: "100%",
          maxWidth: "440px",
          pointerEvents: "auto", // Reactiva los clicks exclusivamente en el área del botón
        }}
      >
        <Button
          variant='contained'
          disableElevation
          fullWidth
          onClick={() => setOpenModalInscription(true)}
          sx={{
            background: "linear-gradient(90deg, #E91E63 0%, #FF6097 100%)",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.9rem",
            py: 1.8,
            borderRadius: "99px",
            letterSpacing: "0.8px",
            textTransform: "none",
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0px 12px 32px rgba(229, 56, 136, 0.35)", // Sombra fucsia profunda Wapizima
          }}
        >
          Apartar mi lugar ahora por {FormatCurrency(pagoInicial)} MXN
        </Button>
      </Box>
    </Box>
  );
};

export default FloattingButton;
