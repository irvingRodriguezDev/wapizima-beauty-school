import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { useUserLocation } from "../hooks/useUserLocation";
import { getDistanceKm } from "../utils/geoDistance";
import { supabase } from "../config/supabaseClient";
import PlantelCard from "../components/PlantelCard";
import { Link } from "react-router-dom";
import { parsePostGISPoint } from "../utils/geo";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ---- VARIANTES DE ANIMACIÓN ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
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

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase.from("schools").select("*");
        if (error) throw error;

        let escuelasProcesadas = data || [];
        const hasCoords = location?.lat && (location?.lon || location?.lng);

        if (hasCoords) {
          const userLat = location.lat;
          const userLon = location.lon || location.lng;

          escuelasProcesadas = escuelasProcesadas
            .map((school) => {
              const coords = parsePostGISPoint(school.location);
              const distance =
                coords.lat && coords.lng
                  ? getDistanceKm(
                      userLat,
                      userLon,
                      Number(coords.lat),
                      Number(coords.lng),
                    )
                  : 9999;

              return { ...school, lat: coords.lat, lng: coords.lng, distance };
            })
            .sort((a, b) => a.distance - b.distance);
        }
        setSchools(escuelasProcesadas);
      } catch (err) {
        console.error("Error cargando escuelas:", err.message);
      } finally {
        setLoadingSchools(false);
      }
    };

    if (!loadingLocation) fetchSchools();
  }, [location, loadingLocation]);

  // ✨ LOADER MINIMALISTA (Vidrio Traslúcido Rosa)
  if (loadingLocation || loadingSchools) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 20,
          background: "#FFF5F7",
        }}
      >
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.15, 1], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          sx={{ color: "#E53888", mb: 2, display: "flex" }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 50 }} />
        </Box>
        <Typography
          sx={{
            color: "#E53888",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Localizando academias cercanas...
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
          radial-gradient(circle at 10% 15%, rgba(255, 240, 245, 0.9) 0%, transparent 40%),
          radial-gradient(circle at 85% 20%, rgba(244, 114, 182, 0.18) 0%, rgba(255, 240, 245, 0.5) 35%, transparent 70%),
          radial-gradient(circle at 50% 90%, rgba(229, 56, 136, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      <Container maxWidth='xl'>
        {/* 1. ENCABEZADO EDITORIAL */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: "#212121",
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            ENCUENTRA TU ESPACIO <br />
            <Box
              component='span'
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: "400",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                px: 1,
              }}
            >
              Wapizima Beauty School
            </Box>
            <br />
            MÁS CERCANO.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "#554D4F",
              maxWidth: 600,
              margin: "0 auto",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {geoError
              ? "Explora todos nuestros planteles autorizados disponibles para ti."
              : "Academias ordenadas meticulosamente por cercanía en kilómetros según tu ubicación actual."}
          </Typography>
        </Box>

        {/* 2. GRID OPTIMIZADO */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-40px" }}
        >
          <Grid container spacing={4}>
            {schools.map((school, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                key={school.id}
              >
                <motion.div variants={itemVariants}>
                  <Link
                    to={`/plantel/${school.slug}`}
                    style={{ textDecoration: "none" }}
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
