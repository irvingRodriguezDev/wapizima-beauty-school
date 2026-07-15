import React from "react";
import { Box } from "@mui/material";

import Hero from "../components/Hero";
import MarqueeCinta from "../components/MarqueeCinta";
import BeneficiosGrid from "../components/BeneficiosGrid";
import Layout from "../components/Landing/Layout";
import Planteles from "./Planteles";

const LandingPrincipal = ({ onDiscoverLocations }) => {
  return (
    <Layout>
      {/* 1. Sección de Introducción de Impacto */}
      {/* <Hero onDiscoverLocations={onDiscoverLocations} /> */}

      {/* 2. Cinta de Texto en Movimiento Continuo */}

      {/* 3. Grid Minimalista de Beneficios Corporativos */}
      {/* <BeneficiosGrid /> */}
      <Planteles />
      {/* <MarqueeCinta /> */}
    </Layout>
  );
};

export default LandingPrincipal;
