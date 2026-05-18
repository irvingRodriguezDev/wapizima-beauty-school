import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
    },
  },
};

const MarqueeCinta = () => {
  const marqueeItems = [
    "MICROPINTURA EN GEL",
    "CERTIFICACIONES OFICIALES",
    "TALLERES PREMIUM",
    "ESTRUCTURAS DE SALÓN",
    "MANICURE RUSA",
    "PRODUCTOS EXCLUSIVOS",
  ];

  return (
    <Box
      sx={{
        bgcolor: "#fdf2f5",
        borderTop: "1px solid rgba(240, 98, 146, 0.2)",
        borderBottom: "1px solid rgba(240, 98, 146, 0.2)",
        py: 2.5,
        whiteSpace: "nowrap",
        overflow: "hidden",
        display: "flex",
        transform: "rotate(-1.5deg) scale(1.02)", // Rotación asimétrica de tu diseño
        my: 6,
        boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
      }}
    >
      <motion.div
        variants={marqueeVariants}
        animate='animate'
        style={{ display: "flex", gap: "4rem", paddingRight: "4rem" }}
      >
        {/* Duplicamos el array para que el bucle visual sea infinito sin cortes */}
        {[...marqueeItems, ...marqueeItems].map((text, i) => (
          <Stack key={i} direction='row' alignItems='center' spacing={1}>
            <Typography
              variant='subtitle1'
              fontWeight='800'
              sx={{ color: "#d81b60", letterSpacing: "1px" }}
            >
              {text}
            </Typography>
            <AutoAwesomeIcon sx={{ color: "#f06292", fontSize: 16 }} />
          </Stack>
        ))}
      </motion.div>
    </Box>
  );
};

export default MarqueeCinta;
