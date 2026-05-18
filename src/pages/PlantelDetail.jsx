import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { supabase } from "../config/supabaseClient";

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
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {/* Botón Flotante para regresar */}
      <Container maxWidth='lg' sx={{ pt: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            color: "#444",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { color: "#d81b60" },
          }}
        >
          Volver a planteles
        </Button>
      </Container>

      {/* Aquí empezaremos a armar la Landing interna de la Escuela */}
      <Container maxWidth='lg' sx={{ py: 6 }}>
        <Typography variant='h3' fontWeight='900' mb={1}>
          {school.name}
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          {school.address}
        </Typography>

        {/* Próximo paso: Meter aquí las secciones del plantel y sus cursos */}
      </Container>
    </Box>
  );
};

export default PlantelDetailPage;
