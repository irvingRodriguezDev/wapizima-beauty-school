import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// ✨ Importación limpia de la librería externa
import Marquee from "../components/Marquee";

const MarqueeCinta = () => {
  const marqueeItems = [
    { text: "ÚNETE A LA ACADEMIA NÚMERO UNO", highlight: true },
    { text: "SÉ PARTE DE LA COMUNIDAD WAPIZIMA", highlight: false },
    { text: "TRANSFORMA TU PASIÓN EN UN IMPERIO", highlight: true },
    { text: "EL MOMENTO DE EMPRENDER ES AHORA", highlight: false },
    { text: "RESPALDO TOTAL DE UNA MARCA LÍDER", highlight: true },
    { text: "CALIDAD PROFESIONAL INTERNACIONAL", highlight: false },
  ];

  return (
    <Box
      sx={{
        py: 2.5,
        overflow: "hidden",
        display: "flex",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        zIndex: 10,
        my: 6, // Margen generoso entre secciones
        // Gradiente de 3 tonos rosa oficial de Wapizima
        background:
          "linear-gradient(90deg, #D82E7A 0%, #E53888 50%, #F472B6 100%)",
        boxShadow: "0px 10px 30px rgba(229, 56, 136, 0.15)",
      }}
    >
      {/* 🚀 COMPONENTE DE LA LIBRERÍA DEBIDAMENTE CONFIGURADO */}
      <Marquee gradient={false} speed={45} play={true}>
        <Stack
          direction='row'
          spacing={8} // Separación uniforme manejada por flexbox
          sx={{ alignItems: "center", pr: 8 }} // 'pr' evita que el último y primer elemento se peguen al ciclar
        >
          {marqueeItems.map((item, i) => (
            <Stack
              key={i}
              direction='row'
              spacing={4}
              sx={{ alignItems: "center" }}
            >
              <Typography
                variant='button'
                sx={{
                  fontWeight: item.highlight ? 800 : 400,
                  letterSpacing: "3px", // Espaciado premium editorial
                  fontSize: { xs: "0.8rem", md: "0.95rem" },
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#FFFFFF", // Contraste limpio sobre el rosa
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  opacity: item.highlight ? 1 : 0.85,
                }}
              >
                {item.text}
              </Typography>
              <AutoAwesomeIcon
                sx={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  opacity: 0.9,
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Marquee>
    </Box>
  );
};

export default MarqueeCinta;
