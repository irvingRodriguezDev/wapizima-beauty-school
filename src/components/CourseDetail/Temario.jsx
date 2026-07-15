import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
const Temario = ({ temario, expanded, handleChangeAccordion }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3.5, md: 5 },
        borderRadius: "32px", // Alineado a los 32px de la CourseCard y Beneficios
        border: "1px solid rgba(245, 79, 156, 0.06)",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 16px 40px rgba(233, 30, 99, 0.02)",
      }}
    >
      <Typography variant='h5' fontWeight='bold' gutterBottom color='#d81b60'>
        Temario del Curso
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Aprende paso a paso con nuestro programa diseñado para llevarte de cero
        a profesional.
      </Typography>
      <Divider sx={{ mb: 3, bgcolor: "#f06292" }} />

      {temario.length === 0 ? (
        <Typography variant='body2' color='text.secondary'>
          El temario se actualizará pronto.
        </Typography>
      ) : (
        temario.map((semana, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion
              key={index}
              expanded={expanded === panelId}
              onChange={handleChangeAccordion(panelId)}
              sx={{
                mb: 1.5,
                boxShadow: "none",
                border: "1px solid rgba(240, 98, 146, 0.2)",
                borderRadius: "8px !important",
                "&:before": { display: "none" }, // Quita la línea divisoria por defecto de MUI
                "&.Mui-expanded": {
                  bgcolor: "#fffdfd",
                  border: "1px solid #f06292",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#d81b60" }} />}
                sx={{ px: 2 }}
              >
                <Typography
                  fontWeight='600'
                  color={expanded === panelId ? "#d81b60" : "text.primary"}
                >
                  {semana.titulo}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 2, bgcolor: "#ffffff" }}>
                <List dense disablePadding>
                  {Array.isArray(semana.puntos) &&
                    semana.puntos.map((punto, pIdx) => (
                      <ListItem key={pIdx} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleOutlineOutlinedIcon
                            sx={{
                              color: "#f06292",
                              fontSize: "1.1rem",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={punto}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.secondary",
                          }}
                        />
                      </ListItem>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Paper>
  );
};

export default Temario;
