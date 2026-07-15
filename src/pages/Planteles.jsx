import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Container, Grid, Skeleton } from "@mui/material";
import { useUserLocation } from "../hooks/useUserLocation";
import { getDistanceKm } from "../utils/geoDistance";
import { supabase } from "../config/supabaseClient";
import PlantelCard from "../components/PlantelCard";
import { Link } from "react-router-dom";
import { parsePostGISPoint } from "../utils/geo";
import { motion } from "framer-motion"; // 🛠️ Corregido: Se quitó la importación inexistente de 'distance' que podía causar warning
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// ---- VARIANTES DE ANIMACIÓN EDITORIAL ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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

  // 1. Petición única de escuelas
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase
          .from("schools")
          .select("*")
          .order("name", { ascending: true });

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

  // 2. Procesamiento y ordenamiento dinámico por distancia geoespacial
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
            : null;

        return {
          ...school,
          lat: coords?.lat ?? null,
          lng: coords?.lng ?? null,
          distance: distance != null ? parseFloat(distance.toFixed(1)) : null,
        };
      })
      .sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });
  }, [schools, location]);

  const isCurrentlyLoading = loadingLocation || loadingSchools;

  return (
    <Box
      id='planteles'
      sx={{
        background: "#FFFBFD",
        backgroundImage: `
          radial-gradient(circle at 10% 8%, rgba(240, 98, 146, 0.05) 0%, transparent 45%),
          radial-gradient(circle at 90% 20%, rgba(240, 98, 146, 0.06) 0%, rgba(255, 240, 245, 0.2) 40%, transparent 80%),
          radial-gradient(circle at 50% 90%, rgba(240, 98, 146, 0.02) 0%, transparent 60%)
        `,
        pb: { xs: 10, md: 14 },
        pt: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth='xl'>
        {/* 1. ENCABEZADO EDITORIAL DE ALTO IMPACTO */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#fdf2f5",
              px: 2,
              py: 0.8,
              borderRadius: "50px",
              mb: 3,
              border: "1px solid rgba(240, 98, 146, 0.2)",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "1rem", color: "#f06292" }} />
            <Typography
              variant='caption'
              sx={{
                color: "#d81b60",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Ubicación Inteligente Activa
            </Typography>
          </Box>

          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: "#2A2628",
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
              letterSpacing: "-1px",
              lineHeight: 1.1,
              mb: 2.5,
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Encuentra tu espacio <br />
            <Box
              component='span'
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: "400",
                color: "#f06292",
                textTransform: "none",
                display: "inline-block",
                position: "relative",
                "&::after": {
                  content: "''",
                  position: "absolute",
                  bottom: "5px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  bgcolor: "rgba(240, 98, 146, 0.3)",
                  borderRadius: "2px",
                },
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
              color: "#6B6567",
              maxWidth: 620,
              margin: "0 auto",
              fontSize: { xs: "0.92rem", md: "1.05rem" },
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.65,
            }}
          >
            {geoError || !location
              ? "Explora todas nuestras academias autorizadas disponibles y comienza tu formación hoy mismo."
              : "Hemos detectado tu ubicación de forma segura para mostrarte los planteles ordenados de acuerdo a la distancia en tiempo real."}
          </Typography>
        </Box>

        {/* 2. GRID DE PLANTELES CON ANIMACIONES Y CONTROLES DE CARGA */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {isCurrentlyLoading
              ? // Esqueletos de carga adaptados a la grilla clásica de MUI v5
                Array.from(new Array(4)).map((_, idx) => (
                  <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#fff",
                        borderRadius: "24px",
                        border: "1px solid rgba(0,0,0,0.03)",
                      }}
                    >
                      <Skeleton
                        variant='rectangular'
                        height={220}
                        sx={{ borderRadius: "18px", mb: 2 }}
                      />
                      <Skeleton
                        variant='text'
                        width='60%'
                        height={25}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton variant='text' width='40%' height={20} />
                    </Box>
                  </Grid>
                ))
              : orderedSchools.map((school, index) => (
                  <Grid key={school.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Link
                      to={`/academia/${school.slug}`}
                      style={{
                        textDecoration: "none",
                        display: "block",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      {/* Badge Dinámico de Distancia Premium (Solo si hay coordenadas de usuario validas) */}

                      <PlantelCard
                        school={school}
                        index={index}
                        onSelectSchool={onSelectSchool}
                      />
                    </Link>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Planteles;
