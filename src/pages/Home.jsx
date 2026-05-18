import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useUserLocation } from "../hooks/useUserLocation";
import { getDistanceKm } from "../utils/geoDistance";
import { supabase } from "../config/supabaseClient"; // Tu configuración de Supabase

const Home = ({ onSelectSchool }) => {
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
        const { data, error } = await supabase.from("schools").select("*"); // Traemos las escuelas autorizadas

        if (error) throw error;

        let escuelasProcesadas = data;

        // Si tenemos la ubicación del usuario, calculamos distancias y ordenamos
        if (location.lat && location.lng) {
          escuelasProcesadas = data
            .map((school) => {
              const distance = getDistanceKm(
                location.lat,
                location.lng,
                school.latitude,
                school.longitude,
              );
              return { ...school, distance };
            })
            .sort((a, b) => a.distance - b.distance); // De menor a mayor distancia
        }

        setSchools(escuelasProcesadas);
      } catch (err) {
        console.error("Error cargando escuelas:", err.message);
      } finally {
        setLoadingSchools(false);
      }
    };

    if (!loadingLocation) {
      fetchSchools();
    }
  }, [location, loadingLocation]);

  if (loadingLocation || loadingSchools) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress color='primary' />
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Buscando las academias más cercanas...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, margin: "0 auto" }}>
      {/* Encabezado Principal */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant='h3'
          component='h1'
          fontWeight='800'
          sx={{
            background: "linear-gradient(45deg, #d81b60 30%, #f06292 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Encuentra tu Academia Ideal
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          {geoError
            ? "Mostrando todas las academias disponibles."
            : "Centros de capacitación ordenados por cercanía a tu ubicación actual."}
        </Typography>
      </Box>

      {/* Grid de Escuelas con Animación de Framer Motion */}
      <Grid container spacing={4}>
        {schools.map((school, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={school.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  border: "1px solid rgba(240, 98, 146, 0.15)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "#fff",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                {/* Logo o Banner de la escuela */}
                <Box
                  sx={{
                    height: 140,
                    bgcolor: "#fdf2f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.03)",
                  }}
                >
                  {school.logo_url ? (
                    <Box
                      component='img'
                      src={school.logo_url}
                      alt={school.name}
                      sx={{ height: 80, objectFit: "contain" }}
                    />
                  ) : (
                    <Typography variant='h6' color='primary' fontWeight='bold'>
                      {school.name}
                    </Typography>
                  )}
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography variant='h6' fontWeight='bold' mb={1} noWrap>
                    {school.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 3,
                      color: "text.secondary",
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 18, color: "#f06292" }} />
                    <Typography variant='body2' noWrap sx={{ flex: 1 }}>
                      {school.address || "Dirección no especificada"}
                    </Typography>
                    {school.distance !== undefined && (
                      <Typography
                        variant='caption'
                        sx={{
                          bgcolor: "rgba(240, 98, 146, 0.1)",
                          color: "#d81b60",
                          px: 1,
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: "bold",
                        }}
                      >
                        a {school.distance.toFixed(1)} km
                      </Typography>
                    )}
                  </Box>

                  <Button
                    fullWidth
                    variant='contained'
                    onClick={() => onSelectSchool(school)}
                    sx={{
                      bgcolor: "#f06292",
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#d81b60" },
                    }}
                  >
                    Ver Academia y Cursos
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
