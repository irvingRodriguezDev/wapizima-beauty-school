import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
// Importamos Grid2 (el componente de Grid moderno y optimizado de MUI)
import { useUserLocation } from "../hooks/useUserLocation";
import { getDistanceKm } from "../utils/geoDistance";
import { supabase } from "../config/supabaseClient";
import PlantelCard from "../components/PlantelCard";
import { Link } from "react-router-dom";
import { parsePostGISPoint } from "../utils/geo";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ---- VARIANTES DE ANIMACIÓN OPTIMIZADAS ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Planteles = ({ onSelectSchool }) => {
  const {
    location,
    loading: loadingLocation,
    error: geoError,
  } = useUserLocation();

  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(true);

  // 1. Petición única de escuelas (Se desvincula de la ubicación para evitar múltiples hits de base de datos)
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase
          .from("schools")
          .select("*")
          .order("name", { ascending: true }); // Orden por defecto por si no hay geo-permisos

        if (error) throw error;
        setSchools(data || []);
      } catch (err) {
        console.error("Error cargando escuelas:", err.message);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  // 2. Procesamiento y ordenamiento por distancia usando useMemo
  // Esto evita recálculos costosos y renders infinitos en el cliente
  const orderedSchools = useMemo(() => {
    if (!schools.length) return [];

    const userLat = location?.lat;
    const userLon = location?.lon || location?.lng;
    const hasUserCoords = userLat != null && userLon != null;

    return schools
      .map((school) => {
        const coords = parsePostGISPoint(school.location);
        const hasSchoolCoords =
          coords && coords.lat != null && coords.lng != null;

        const distance =
          hasUserCoords && hasSchoolCoords
            ? getDistanceKm(
                Number(userLat),
                Number(userLon),
                Number(coords.lat),
                Number(coords.lng),
              )
            : 9999; // Distancia ficticia alta para mandar al final las sin coordenadas

        return {
          ...school,
          lat: coords?.lat ?? null,
          lng: coords?.lng ?? null,
          distance: parseFloat(distance.toFixed(1)), // Redondeado limpio
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }, [schools, location]);

  // ✨ LOADER PREMIUM (Diseño limpio y minimalista)
  if (loadingLocation || loadingSchools) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          background: "#FFF5F7",
        }}
      >
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          sx={{ color: "#E53888", mb: 3, display: "flex" }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 45 }} />
        </Box>
        <Typography
          sx={{
            color: "#E53888",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Buscando planteles cercanos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      id='planteles'
      sx={{
        background: "#FFFBFD",
        backgroundImage: `
          radial-gradient(circle at 8% 12%, rgba(255, 240, 245, 0.7) 0%, transparent 40%),
          radial-gradient(circle at 90% 15%, rgba(244, 114, 182, 0.12) 0%, rgba(255, 240, 245, 0.4) 35%, transparent 70%),
          radial-gradient(circle at 50% 90%, rgba(229, 56, 136, 0.03) 0%, transparent 50%)
        `,
        pb: { xs: 8, md: 12 },
        pt: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth='xl'>
        {/* 1. ENCABEZADO EDITORIAL */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: "#1C1C1C",
              fontSize: { xs: "1.85rem", sm: "2.6rem", md: "3.2rem" },
              letterSpacing: "-0.8px",
              lineHeight: 1.15,
              mb: 2.5,
              textTransform: "uppercase",
            }}
          >
            Encuentra tu espacio <br />
            <Box
              component='span'
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: "400",
                color: "#E53888",
                textTransform: "none",
                display: "inline-block",
              }}
            >
              Wapizima Beauty School
            </Box>
            <br />
            más cercano.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "#5C5456",
              maxWidth: 580,
              margin: "0 auto",
              fontSize: { xs: "0.9rem", md: "1.05rem" },
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.6,
            }}
          >
            {geoError || !location
              ? "Explora todas nuestras academias autorizadas disponibles para ti."
              : "Academias ordenadas meticulosamente por cercanía en kilómetros según tu ubicación actual."}
          </Typography>
        </Box>

        {/* 2. GRID TOTALMENTE RESPONSIVO Y FLUIDO */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {orderedSchools.map((school, index) => (
              <Grid
                key={school.id}
                size={{ xs: 12, sm: 6, md: 4, xl: 3 }} // Sintaxis nativa de Grid2
              >
                <motion.div variants={itemVariants} style={{ height: "100%" }}>
                  <Link
                    to={`/academia/${school.slug}`}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      height: "100%",
                    }}
                  >
                    <PlantelCard
                      school={school}
                      index={index}
                      onSelectSchool={onSelectSchool}
                    />
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Planteles;
