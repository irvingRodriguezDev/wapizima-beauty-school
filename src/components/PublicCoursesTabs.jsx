import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { FormatCurrency } from "../utils/FormatCurrency";
import { Link } from "react-router-dom";

// Paleta de colores Rosa de tu diseño
const COLORS = {
  primary: "#f06292", // Rosa principal
  secondary: "#fce4ec", // Rosa pastel para fondos y sutiles
  accent: "#ec407a", // Rosa fuerte para botones e interacciones
  textDark: "#2d2d2d", // Gris oscuro premium para títulos
};

const PublicCoursesTabs = ({ courses = [] }) => {
  const [tabValue, setTabValue] = useState(0);

  // Manejador del cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Clasificación estricta: Pestaña 0 = CURSOS, Pestaña 1 = TALLERES
  const filteredData = courses.filter((item) =>
    tabValue === 0 ? item.tipo_curso === "Curso" : item.tipo_curso === "Taller",
  );

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "#eaeaea",
          mb: 4,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor='inherit'
          TabIndicatorProps={{
            style: {
              backgroundColor: COLORS.primary,
              height: 3,
              borderRadius: "3px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 700,
              fontSize: "1.05rem",
              textTransform: "none",
              color: "#888",
              px: 4,
              transition: "0.3s",
              "&.Mui-selected": { color: COLORS.primary },
            },
          }}
        >
          <Tab label='📚 Cursos Completos' />
          <Tab label='🎨 Talleres Especializados' />
        </Tabs>
      </Box>

      {/* Grid de Cursos / Talleres */}
      <Grid container spacing={3}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0px 10px 35px rgba(240, 98, 146, 0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 15px 40px rgba(240, 98, 146, 0.12)",
                  },
                  border: "1px solid",
                  borderColor: COLORS.secondary,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component='img'
                  height='180'
                  image={
                    item.flayer_url ||
                    "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=600&auto=format&fit=crop"
                  } // Imagen bonita de stock si no hay banner_url
                  alt={item.titulo}
                  sx={{
                    borderTopLeftRadius: "24px",
                    borderTopRightRadius: "24px",
                  }}
                />

                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    {/* Nombre */}
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 700,
                        color: COLORS.textDark,
                        lineHeight: 1.3,
                        mb: 1,
                      }}
                    >
                      {item.maestro
                        ? `${item.titulo} con ${item.maestro}`
                        : item.titulo}
                    </Typography>

                    {/* Descripción Corta */}
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 3,
                      }}
                    >
                      Disponible del{" "}
                      {new Date(item.fecha_inicio).toLocaleDateString()} al{" "}
                      {new Date(item.fecha_fin).toLocaleDateString()}
                    </Typography>
                    {/* Precio Destacado */}
                    <Typography
                      variant='h6'
                      sx={{ fontWeight: 800, color: COLORS.accent, mb: 1 }}
                    >
                      {FormatCurrency(item.costo)}{" "}
                      <Box
                        component='span'
                        sx={{
                          fontSize: "0.55rem",
                          fontWeight: 400,
                          color: "text.secondary",
                        }}
                      >
                        MXN
                      </Box>
                    </Typography>
                  </Box>

                  {/* Botón de Acción Pública */}
                  <Link
                    to={`/curso/${item.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant='contained'
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        backgroundColor: COLORS.secondary,
                        color: COLORS.accent,
                        borderRadius: "14px",
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: COLORS.primary,
                          color: "white",
                          boxShadow: "0px 4px 15px rgba(240, 98, 146, 0.25)",
                        },
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant='body1' color='textSecondary'>
                No hay {tabValue === 0 ? "cursos" : "talleres"} disponibles en
                este momento.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PublicCoursesTabs;
