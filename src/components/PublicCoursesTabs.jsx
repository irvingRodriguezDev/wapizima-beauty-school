import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Grid } from "@mui/material";
import { SearchOff } from "@mui/icons-material";
import { useDebounce } from "use-debounce";
import CourseCard from "./CourseCard";
import Search from "./Search";

const cleanText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const PublicCoursesTabs = ({ courses = [] }) => {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");

  const [debounceSearchText] = useDebounce(search, 350);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredData = courses.filter((item) => {
    const matchesTab =
      tabValue === 0
        ? item.tipo_curso === "Curso"
        : item.tipo_curso === "Taller";

    const cleanQuery = cleanText(debounceSearchText);
    const matchesSearch =
      cleanQuery === "" ||
      cleanText(item.titulo).includes(cleanQuery) ||
      cleanText(item.maestro || item.descripcion).includes(cleanQuery);

    return matchesTab && matchesSearch;
  });

  return (
    <Box sx={{ width: "100%", margin: "0 auto", pt: 4, mt: -4 }}>
      {/* 1. SECCIÓN DE PESTAÑAS ULTRA PREMIUM (Estilo Segmented Control / Glassmorphism) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <Box
          sx={{
            p: 0.75,
            borderRadius: "20px",
            backgroundColor: "rgba(244, 114, 182, 0.05)", // Fondo rosa ultra sutil
            border: "1px solid rgba(229, 56, 136, 0.08)",
            backdropFilter: "blur(8px)",
            display: "inline-block",
            maxWidth: "100%",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor='inherit'
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{
              minHeight: 44,
              "& .MuiTabs-indicator": {
                // Indicador transformado en una píldora trasera flotante blanca premium
                backgroundColor: "#FFFFFF",
                height: "100%",
                borderRadius: "14px",
                boxShadow: "0px 6px 16px rgba(229, 56, 136, 0.12)",
                zIndex: 0,
              },
              "& .MuiTabs-flexContainer": {
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            <Tab
              label='Cursos Completos'
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.78rem", sm: "0.85rem" },
                textTransform: "none", // Menos agresivo que uppercase, se ve más editorial y moderno
                letterSpacing: "0.3px",
                fontFamily: "'Montserrat', sans-serif",
                color: "#6B6567",
                px: { xs: 3, sm: 5 },
                minHeight: 44,
                py: 1,
                borderRadius: "14px",
                transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                zIndex: 2,
                "&.Mui-selected": {
                  color: "#E53888", // Contraste rosa de la marca sobre la píldora blanca
                },
              }}
            />
            <Tab
              label='Talleres Especializados'
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.78rem", sm: "0.85rem" },
                textTransform: "none",
                letterSpacing: "0.3px",
                fontFamily: "'Montserrat', sans-serif",
                color: "#6B6567",
                px: { xs: 3, sm: 5 },
                minHeight: 44,
                py: 1,
                borderRadius: "14px",
                transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                zIndex: 2,
                "&.Mui-selected": {
                  color: "#E53888",
                },
              }}
            />
          </Tabs>
        </Box>
      </Box>

      {/* 2. BARRA DE BÚSQUEDA */}
      <Box sx={{ mb: 2, mt: -4 }}>
        <Search
          titulo=''
          placeholder={`Buscar en ${tabValue === 0 ? "Cursos" : "Talleres"}`}
          search={search}
          setSearch={setSearch}
        />
      </Box>

      {/* 3. GRID DE CURSOS / TALLERES */}
      <Grid container spacing={4}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={item.id}>
              <CourseCard item={item} />
            </Grid>
          ))
        ) : (
          /* 4. ESTADO VACÍO EDITORIAL */
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                py: 10,
                px: 3,
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                border: "1px dashed rgba(229, 56, 136, 0.2)",
              }}
            >
              <SearchOff
                sx={{ fontSize: 60, color: "#F472B6", mb: 2, opacity: 0.8 }}
              />
              <Typography
                variant='h6'
                sx={{
                  color: "#2A2628",
                  fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                  mb: 1,
                }}
              >
                No encontramos resultados
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  color: "#6B6567",
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: 380,
                  lineHeight: 1.6,
                }}
              >
                {search.trim() !== ""
                  ? `No se encontró ningún ${
                      tabValue === 0 ? "curso" : "taller"
                    } que coincida con "${search}". Intenta con otra palabra clave.`
                  : `Actualmente no hay ${
                      tabValue === 0 ? "cursos" : "talleres"
                    } disponibles en esta categoría.`}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PublicCoursesTabs;
