import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { supabase } from "../config/supabaseClient";
import Layout from "../components/Landing/Layout";
import PublicCoursesTabs from "../components/PublicCoursesTabs";
const PlantelDetailPage = () => {
  const { slug } = useParams(); // Recuperamos el ID o Slug desde la URL
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // Buscamos la escuela que coincida con el ID (o slug) de la URL
        const { data, error } = await supabase
          .from("schools")
          .select("*")
          .eq("slug", slug) // Cambiar a 'slug' si implementas slugs amigables
          .single();

        if (error) throw error;
        setSchool(data);
      } catch (err) {
        console.error("Error cargando el detalle del plantel:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (!school) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' color='error' mb={3}>
          No pudimos encontrar este plantel.
        </Typography>
        <Button variant='outlined' onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
      </Container>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2, mt: 2 }}>
          {/* Botón Flotante para regresar */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            variant='contained'
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { color: "#fff" },
            }}
          >
            Volver a planteles
          </Button>
        </Box>
        {/* Aquí empezaremos a armar la Landing interna de la Escuela */}
        <Container maxWidth='2xl' sx={{ py: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              py: { xs: 5, md: 7 }, // Más acolchado para dar sensación de amplitud y lujo
              px: 3,
              background: "linear-gradient(180deg, #FFF9FA 0%, #FFFFFF 100%)",
              borderRadius: "32px", // Bordes más orgánicos y suaves
              border: "1px solid rgba(240, 98, 146, 0.15)", // Borde rosa ultra-fino
              boxShadow: "0px 20px 40px rgba(242, 32, 140, 0.02)", // Sombra casi invisible pero que da profundidad
              mb: 6,
            }}
          >
            {/* Nombre de la Escuela con Efecto Metálico/Glow */}
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Playfair Display', 'Didot', 'Helvetica', serif",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                mb: 2,
                background:
                  "linear-gradient(135deg, #A81464 0%, #E2208C 50%, #F06292 100%)", // Gradiente con más profundidad (vino a rosa)
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.5rem", sm: "3.5rem" },
                lineHeight: 1.1,
              }}
            >
              {school.name}
            </Typography>

            {/* Divisor premium: Círculo y líneas flanqueantes */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2.5,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "rgba(226, 32, 140, 0.3)",
                }}
              />
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#E2208C",
                }}
              />
              <Box
                sx={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "rgba(226, 32, 140, 0.3)",
                }}
              />
            </Box>

            {/* Contenedor de la Dirección */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                maxWidth: "550px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.02)",
                borderRadius: "50px",
                py: 1,
                px: 3,
                border: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              <LocationIcon sx={{ color: "#E2208C", fontSize: "1.2rem" }} />
              <Typography
                variant='body2'
                sx={{
                  color: "#555555",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: "0.3px",
                }}
              >
                {school.address}
              </Typography>
            </Box>
          </Box>

          {/* SECCIÓN 2: Título de la Oferta Educativa (Elegante y Limpio fuera del bloque anterior) */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 800,
                color: "#2D2D2D", // Cambiado a gris oscuro para que se vea costoso y maduro
                letterSpacing: "-0.5px",
                mb: 1,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-6px",
                  left: "25%",
                  width: "50%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, #F06292, transparent)",
                },
              }}
            >
              Nuestra Oferta Educativa
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: "#777777",
                fontWeight: 400,
                maxWidth: "500px",
                margin: "12px auto 0 auto",
                lineHeight: 1.6,
              }}
            >
              Elige el programa ideal diseñado por expertos para impulsar tu
              carrera al máximo nivel en el arte de las uñas.
            </Typography>
          </Box>

          {/* Próximo paso: Meter aquí las secciones del plantel y sus cursos */}
          <PublicCoursesTabs />
        </Container>
      </Box>
    </Layout>
  );
};

export default PlantelDetailPage;
