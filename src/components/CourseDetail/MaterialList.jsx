import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { CardTravel as MaterialIcon } from "@mui/icons-material";
const MaterialList = ({ currentCourse }) => {
  return (
    <Grid size={{ xs: 12, md: 4.5 }}>
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: "12px",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "rgba(186, 137, 146, 0.15)",
          position: "sticky",
          top: "40px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <MaterialIcon sx={{ color: "secondary.main", fontSize: "1.4rem" }} />
          <Typography
            variant='h6'
            component='h2'
            sx={{
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#BA8992",
            }}
          >
            Lista de Materiales
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(186, 137, 146, 0.12)" }} />

        <Box
          dangerouslySetInnerHTML={{
            __html:
              currentCourse.lista_materiales ||
              "<p>No se especifican materiales requeridos para este programa.</p>",
          }}
          sx={{
            color: "text.secondary",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            "& ul": { pl: 2.5, listStyleType: "'▪ '" },
            "& li": { mb: 1.5, color: "text.primary" },
          }}
        />

        <Box
          sx={{
            mt: 5,
            pt: 4,
            borderTop: "1px dashed",
            borderColor: "rgba(186, 137, 146, 0.25)",
            textAlign: "center",
          }}
        >
          <Typography
            variant='caption'
            sx={{
              mb: 0.5,
              fontWeight: 700,
              color: "text.secondary",
              letterSpacing: "1px",
            }}
          >
            INVERSIÓN TOTAL
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: "secondary.main",
              fontSize: "2rem",
            }}
          >
            {FormatCurrency(currentCourse.costo)}{" "}
            <Box
              component='span'
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "primary.main",
                ml: 0.5,
              }}
            >
              MXN
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default MaterialList;
