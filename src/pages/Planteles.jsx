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

// ---- ESTILOS LUXURY ROSE GOLD ----
const LUXURY_STYLE = {
  roseGoldGradient:
    "linear-gradient(135deg, #ECC4C6 0%, #C3939B 25%, #F0CBD0 50%, #B8858E 75%, #925863 100%)",
  fontSerif: "'Playfair Display', 'Cormorant Garamond', 'Didot', serif",
  fontSans: "'Montserrat', 'Inter', sans-serif",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase.from("schools").select("*");
        if (error) throw error;

        let escuelasProcesadas = data || [];
        const tieneUbicacionValida =
          location?.lat && (location?.lon || location?.lng);

        if (tieneUbicacionValida) {
          const userLat = location.lat;
          const userLon = location.lon || location.lng;

          escuelasProcesadas = escuelasProcesadas
            .map((school) => {
              const coordsDecodificadas = parsePostGISPoint(school.location);
              const schoolLat = coordsDecodificadas.lat;
              const schoolLng = coordsDecodificadas.lng;

              if (!schoolLat || !schoolLng) {
                return { ...school, lat: null, lng: null, distance: 9999 };
              }

              const distance = getDistanceKm(
                userLat,
                userLon,
                Number(schoolLat),
                Number(schoolLng),
              );

              return {
                ...school,
                lat: schoolLat,
                lng: schoolLng,
                distance,
              };
            })
            .sort((a, b) => a.distance - b.distance);
        }

        setSchools(escuelasProcesadas);
      } catch (err) {
        console.error("Error cargando escuelas de Wapizima:", err.message);
      } finally {
        setLoadingSchools(false);
      }
    };

    if (!loadingLocation) {
      fetchSchools();
    }
  }, [location, loadingLocation]);

  // ✨ LOADER PREMIUM CON IDENTIDAD COSMÉTICA (0% aburrido)
  if (loadingLocation || loadingSchools) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 16,
          background: "#FAF6F6",
        }}
      >
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            background: LUXURY_STYLE.roseGoldGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 60 }} />
        </Box>
        <Typography
          sx={{
            color: "#A36D75",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "3px",
            fontFamily: LUXURY_STYLE.fontSans,
            textTransform: "uppercase",
            textAlign: "center",
            px: 2,
          }}
        >
          Localizando espacios cercanos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box id='planteles' sx={{ py: { xs: 8, md: 14 }, background: "#FAF6F6" }}>
      <Container maxWidth='xl'>
        {/* 1. ENCABEZADO EDITORIAL DE ALTA GAMA */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: "#212121",
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
              fontFamily: LUXURY_STYLE.fontSans,
              mb: 3,
            }}
          >
            ENCUENTRA TU ESPACIO <br />
            <Box
              component='span'
              sx={{
                fontFamily: LUXURY_STYLE.fontSerif,
                fontStyle: "italic",
                fontWeight: "400",
                background: LUXURY_STYLE.roseGoldGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                py: 0.5,
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
              color: "#5A5455",
              maxWidth: 650,
              margin: "0 auto",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              lineHeight: 1.7,
              fontFamily: LUXURY_STYLE.fontSans,
              fontWeight: 400,
            }}
          >
            {geoError
              ? "Explora todos nuestros planteles autorizados disponibles para ti."
              : "Hemos detectado tu ubicación. Aquí tienes las academias ordenadas meticulosamente por cercanía en kilómetros."}
          </Typography>
        </Box>

        {/* 2. GRID DE PLANTELES CON ENTRADA SUAVE ANIMADA */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid container spacing={4}>
            {schools.map((school, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }}
                key={school.id}
              >
                <motion.div variants={itemVariants}>
                  <Link
                    to={`/plantel/${school.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
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
