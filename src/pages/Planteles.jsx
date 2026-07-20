import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Container, Grid, Skeleton } from "@mui/material";
import { useUserLocation } from "../hooks/useUserLocation";
import { getDistanceKm } from "../utils/geoDistance";
import { supabase } from "../config/supabaseClient";
import PlantelCard from "../components/PlantelCard";
import { Link } from "react-router-dom";
import { parsePostGISPoint } from "../utils/geo";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Search from "../components/Search";
import { useDebounce } from "use-debounce";
import svgCity from "../assets/undraw_best-place_dhzp.svg";
// ---- VARIANTES DE ANIMACIÓN EDITORIAL ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

  // Inicializamos el input de búsqueda como string vacío
  const [search, setSearch] = useState("");
  const [debounceSearchText] = useDebounce(search, 350); // Reducido a 350ms para que se sienta más responsivo

  // 1. Petición única de escuelas al montar el componente
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

  // Helper para normalizar texto (elimina acentos y convierte a minúsculas)
  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remueve diacríticos/acentos
  };

  const orderedSchools = useMemo(() => {
    if (!schools.length) return [];

    const userLat = location?.lat;
    const userLon = location?.lon || location?.lng;
    const hasUserCoords = userLat != null && userLon != null;
    const cleanSearch = normalizeText(debounceSearchText);
    return (
      schools
        // A. Filtramos localmente sin tocar la base de datos
        .filter((school) => {
          if (!cleanSearch) return true; // Si no hay búsqueda, pasan todas

          const nameMatch = normalizeText(school.name).includes(cleanSearch);
          const addressMatch = normalizeText(school.address).includes(
            cleanSearch,
          );
          const stateMatch = normalizeText(school.state).includes(cleanSearch); // Por si tienes campo state en DB

          return nameMatch || addressMatch || stateMatch;
        })
        // B. Calculamos las distancias en tiempo real de las escuelas filtradas
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
        // C. Ordenamos por cercanía física (las que no tienen distancia van al final)
        .sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        })
    );
  }, [schools, location, debounceSearchText]);

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
        pt: { xs: 2, md: 5 },
      }}
    >
      <Container maxWidth='xl'>
        {/* 1. ENCABEZADO EDITORIAL */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
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
              display: "none",
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
            más cercano
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
              display: "none",
            }}
          >
            {geoError || !location
              ? "Explora todas nuestras academias autorizadas disponibles y comienza tu formación hoy mismo."
              : "Hemos detectado tu ubicación de forma segura para mostrarte los planteles ordenados de acuerdo a la distancia en tiempo real."}
          </Typography>
        </Box>

        {/* BUSCADOR DE PLANTELES */}
        <Box
          sx={{
            maxWidth: "100%",
            mx: "auto",
            mb: { xs: 2, md: 8 },
            mt: { xs: -4, md: 0 },
          }}
        >
          <Search
            titulo=''
            placeholder='Buscar academia por ciudad'
            search={search}
            setSearch={setSearch}
          />
        </Box>

        {/* 2. GRID DE PLANTELES */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {isCurrentlyLoading ? (
              Array.from(new Array(4)).map((_, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
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
            ) : orderedSchools.length > 0 ? (
              orderedSchools.map((school, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={school.id}>
                  <Link
                    to={`/academia/${school.slug}`}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <PlantelCard
                      school={school}
                      index={index}
                      onSelectSchool={onSelectSchool}
                    />
                  </Link>
                </Grid>
              ))
            ) : (
              // Empty State elegante si la búsqueda no arroja coincidencias
              <Grid size={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    py: { xs: 6, md: 10 }, // Espaciado vertical premium
                    px: 3,
                  }}
                >
                  {/* 1. La Ilustración (Controlada y estilizada) */}
                  <Box
                    component='img'
                    src={svgCity}
                    alt='No se encontraron planteles'
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 240, sm: 280 }, // Escalado perfecto para que no domine toda la pantalla
                      height: "auto",
                      mb: 4, // Espacio generoso hacia los textos para que respire
                      opacity: 0.9,
                      filter:
                        "drop-shadow(0px 8px 24px rgba(240, 98, 146, 0.08))", // Sutil profundidad rosa
                    }}
                  />

                  {/* 2. Bloque de Texto */}
                  <Typography
                    variant='h5' // Cambiado a h5 para mejor presencia
                    sx={{
                      color: "#2A2628",
                      fontWeight: 800,
                      fontFamily: "'Montserrat', sans-serif",
                      mb: 1.5,
                      fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Responsivo
                    }}
                  >
                    No encontramos planteles
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{
                      color: "#6B6567",
                      fontFamily: "'Inter', sans-serif",
                      maxWidth: 320, // Limitamos el ancho para que el texto no se extienda a lo largo y se lea mejor
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    Prueba buscando otra palabra clave o un estado diferente de
                    la república.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Planteles;
