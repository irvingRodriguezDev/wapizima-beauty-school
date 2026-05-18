import React from "react";
import { Box } from "@mui/material";

import Hero from "../components/Hero";
import MarqueeCinta from "../components/MarqueeCinta";
import BeneficiosGrid from "../components/BeneficiosGrid";

const LandingPrincipal = ({ onDiscoverLocations }) => {
  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      {/* 1. Sección de Introducción de Impacto */}
      <Hero onDiscoverLocations={onDiscoverLocations} />

      {/* 2. Cinta de Texto en Movimiento Continuo */}
      <MarqueeCinta />

      {/* 3. Grid Minimalista de Beneficios Corporativos */}
      <BeneficiosGrid />
    </Box>
  );
};

export default LandingPrincipal;
