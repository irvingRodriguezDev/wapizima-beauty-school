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
    <Box sx={{ width: "100%", margin: "0 auto", pt: 2 }}>
      {/* SECCIÓN DE PESTAÑAS EDITORIALES */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid",
          borderColor: "rgba(45, 37, 38, 0.08)",
          mb: 6,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor='inherit'
          TabIndicatorProps={{
            style: {
              backgroundColor: "#BA8992", // Color secundario (Rosa Viejo)
              height: 2,
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 700,
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "2px", // Letraje de pasarela
              color: "text.secondary",
              px: { xs: 2, sm: 4 },
              pb: 2,
              transition: "color 0.3s ease",
              "&.Mui-selected": {
                color: "secondary.main",
                fontWeight: 900,
              },
            },
          }}
        >
          <Tab label='Cursos Completos' />
          <Tab label='Talleres Especializados' />
        </Tabs>
      </Box>

      {/* GRID DE COMPONENTES FLAT */}
      <Grid container spacing={4}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={item.id}>
              <Card
                sx={{
                  borderRadius: "12px", // Ortogonal puro, estricto diseño flat
                  boxShadow: "none",
                  border: "1px solid",
                  borderColor: "rgba(186, 137, 146, 0.18)", // Borde fino en tono de acento
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  bgcolor: "background.paper",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    borderColor: "secondary.main",
                    transform: "translateY(-4px)", // Elevación flat sutil sin sombras ruidosas
                  },
                }}
              >
                <CardMedia
                  component='img'
                  height='200'
                  image={
                    item.flayer_url ||
                    "https://images.unsplash.com/photo-1604654894610-df490651e56c?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={item.titulo}
                  sx={{
                    borderRadius: 0,
                    filter: "brightness(0.96)", // Sutil matiz para integrar la foto al fondo
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
                    {/* Nombre del Curso / Maestro */}
                    <Typography
                      variant='h6'
                      component='h3'
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        lineHeight: 1.3,
                        letterSpacing: "0.5px",
                        fontSize: "1.1rem",
                        mb: 1.5,
                      }}
                    >
                      {item.maestro
                        ? `${item.titulo} con ${item.maestro}`
                        : item.titulo}
                    </Typography>

                    {/* Rango de Fechas Minimalista */}
                    <Typography
                      variant='body2'
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        letterSpacing: "0.2px",
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
                      component='p'
                      sx={{
                        fontWeight: 900,
                        color: "secondary.main",
                        mb: 2.5,
                        fontSize: "1.25rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {FormatCurrency(item.costo)}{" "}
                      <Box
                        component='span'
                        sx={{
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          color: "text.secondary",
                          ml: 0.5,
                        }}
                      >
                        MXN
                      </Box>
                    </Typography>
                  </Box>

                  {/* Botón de Acción Sólido Premium */}
                  <Link
                    to={`/curso/${item.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: "12px", // Botón rectangular alineado a la estética de la tarjeta
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        backgroundColor: "primary.main",
                        color: "background.default",
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.contrastText",
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
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography
                variant='body1'
                sx={{
                  color: "text.secondary",
                  letterSpacing: "1px",
                  fontWeight: 500,
                }}
              >
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
