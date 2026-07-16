import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid, // Usando Grid v2 de MUI (compatible con la prop size)
} from "@mui/material";
import { SearchOff } from "@mui/icons-material";
import { useDebounce } from "use-debounce";
import CourseCard from "./CourseCard";
import Search from "./Search";

// Helper sencillo para remover acentos y facilitar búsquedas más naturales
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

  // Reducido a 350ms para un comportamiento táctil y de teclado súper responsivo
  const [debounceSearchText] = useDebounce(search, 350);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // ⚡ FILTRADO DOBLE: Por tipo de curso (Tab) y por texto de búsqueda (Debounced)
  const filteredData = courses.filter((item) => {
    // 1. Filtrado por tipo de curso
    const matchesTab =
      tabValue === 0
        ? item.tipo_curso === "Curso"
        : item.tipo_curso === "Taller";

    // 2. Filtrado por búsqueda de texto (título o descripción corta)
    const cleanQuery = cleanText(debounceSearchText);
    const matchesSearch =
      cleanQuery === "" ||
      cleanText(item.titulo).includes(cleanQuery) ||
      cleanText(item.maestro || item.descripcion).includes(cleanQuery);

    return matchesTab && matchesSearch;
  });

  return (
    <Box sx={{ width: "100%", margin: "0 auto", pt: 4 }}>
      {/* 1. SECCIÓN DE PESTAÑAS EDITORIALES */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid",
          borderColor: "rgba(229, 56, 136, 0.1)",
          mb: 5,
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
            "& .MuiTabs-indicator": {
              background: "linear-gradient(90deg, #E53888, #F472B6)",
              height: "3px",
              borderRadius: "3px 3px 0 0",
            },
            "& .MuiTab-root": {
              fontWeight: 700,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "'Montserrat', sans-serif",
              color: "#554D4F",
              px: { xs: 2, sm: 4 },
              pb: 2,
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                color: "#E53888",
                fontWeight: 800,
              },
            },
          }}
        >
          <Tab label='Cursos Completos' />
          <Tab label='Talleres Especializados' />
        </Tabs>
      </Box>

      {/* 2. BARRA DE BÚSQUEDA */}
      <Box sx={{ mb: 6 }}>
        <Search
          titulo={`Buscar en ${tabValue === 0 ? "Cursos" : "Talleres"}`}
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
          /* 4. ESTADO VACÍO EDITORIAL Y PREMIUM */
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
                  ? `No se encontró ningún ${tabValue === 0 ? "curso" : "taller"} que coincida con "${search}". Intenta con otra palabra clave.`
                  : `Actualmente no hay ${tabValue === 0 ? "cursos" : "talleres"} disponibles en esta categoría.`}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PublicCoursesTabs;
