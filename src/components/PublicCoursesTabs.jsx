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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FormatCurrency } from "../utils/FormatCurrency";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const PublicCoursesTabs = ({ courses = [] }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filtrado estricto por tipo
  const filteredData = courses.filter((item) =>
    tabValue === 0 ? item.tipo_curso === "Curso" : item.tipo_curso === "Taller",
  );

  return (
    <Box sx={{ width: "100%", margin: "0 auto", pt: 4 }}>
      {/* 1. SECCIÓN DE PESTAÑAS EDITORIALES */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid",
          borderColor: "rgba(229, 56, 136, 0.1)",
          mb: 6,
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

      {/* 2. GRID DE CURSOS / TALLERES */}
      <Grid container spacing={4}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={item.id}>
              <CourseCard item={item} />
            </Grid>
          ))
        ) : (
          /* Estado Vacío Estilizado */
          <Grid size={12}>
            <Box sx={{ textAlign: "center", py: 12 }}>
              <Typography
                variant='body1'
                sx={{
                  color: "#554D4F",
                  letterSpacing: "0.5px",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
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
