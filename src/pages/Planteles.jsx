import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { useUserLocation } from "../hooks/useUserLocation";
import { getDistanceKm } from "../utils/geoDistance";
import { supabase } from "../config/supabaseClient";
import PlantelCard from "../components/PlantelCard";
import { Link } from "react-router-dom";

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
        // 1. Traemos las escuelas desde Supabase
        const { data, error } = await supabase.from("schools").select("*");
        if (error) throw error;

        let escuelasProcesadas = data || [];

        // OJO: Cambié location.lng por location.lon para hacer match con el proveedor IP/GPS anterior
        const tieneUbicacionValida =
          location?.lat && (location?.lon || location?.lng);

        if (tieneUbicacionValida) {
          const userLat = location.lat;
          const userLon = location.lon || location.lng; // Soporta ambas nomenclaturas por seguridad

          escuelasProcesadas = escuelasProcesadas
            .map((school) => {
              // Validamos que la escuela tenga coordenadas válidas antes de calcular
              if (!school.latitude || !school.longitude) {
                return { ...school, distance: 9999 }; // Las mandamos al final si no tienen GPS
              }

              const distance = getDistanceKm(
                userLat,
                userLon,
                Number(school.latitude),
                Number(school.longitude),
              );

              return { ...school, distance };
            })
            // Ordenamos de la más cercana a la más lejana
            .sort((a, b) => a.distance - b.distance);
        }

        setSchools(escuelasProcesadas);
      } catch (err) {
        console.error("Error cargando escuelas de Wapizima:", err.message);
      } finally {
        setLoadingSchools(false);
      }
    };

    // Solo ejecuta cuando la ubicación haya terminado de cargarse (sea exitosa o fallback)
    if (!loadingLocation) {
      fetchSchools();
    }
  }, [location, loadingLocation]); // Dependencias limpias y correctas

  // Loader perfectamente centrado relativo a la sección
  if (loadingLocation || loadingSchools) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 12,
        }}
      >
        <CircularProgress color='primary' thickness={5} />
        <Typography
          sx={{
            mt: 3,
            color: "text.secondary",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          Localizando los planteles más cercanos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box id='planteles' sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth='2xl'>
        {/* Encabezado de Sección con Estilo Editorial */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 900,
              color: "#1a1a1a",
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              letterSpacing: "-1.5px",
              mb: 2,
            }}
          >
            ENCUENTRA TU ESPACIO <br />
            <Box
              component='span'
              sx={{
                fontStyle: "italic",
                color: "#f06292",
                fontFamily: "serif",
                fontWeight: "400",
              }}
            >
              WAPIZIMA BEAUTY SCHOOL <br />
            </Box>
            MÁS CERCANO.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "text.secondary",
              maxWidth: 600,
              margin: "0 auto",
              fontSize: "1.05rem",
            }}
          >
            {geoError
              ? "Explora todos nuestros planteles autorizados disponibles para ti."
              : "Hemos detectado tu ubicación. Aquí tienes las academias ordenadas por cercanía en kilómetros."}
          </Typography>
        </Box>

        {/* Grid de Planteles */}
        <Grid container spacing={4}>
          {schools.map((school, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={school.id}>
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Planteles;
