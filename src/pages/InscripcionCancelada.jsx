import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { motion } from "framer-motion";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Landing/Layout";

const InscripcionCancelada = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        py: 12,
      }}
    >
      <Container maxWidth='sm'>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            p: { xs: 4, sm: 6 },
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "rgba(186, 137, 146, 0.2)",
            textAlign: "center",
            borderRadius: "12px",
          }}
        >
          {/* ÍCONO DE CANCELADO / PREVENCIÓN */}
          <ErrorOutlineOutlinedIcon
            sx={{
              fontSize: 52,
              color: "rgba(186, 137, 146, 0.6)",
              mb: 3,
              strokeWidth: 1,
            }}
          />

          <Typography
            variant='caption'
            sx={{
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontWeight: 800,
              color: "text.secondary",
              display: "block",
              mb: 1,
            }}
          >
            Proceso Interrumpido
          </Typography>

          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.2,
              color: "primary.main",
              letterSpacing: "0.5px",
              mb: 3,
            }}
          >
            PAGO NO <br />
            <Box
              component='span'
              sx={{
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "400",
                color: "primary.main",
              }}
            >
              PROCESADO.
            </Box>
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "text.secondary",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              mb: 5,
            }}
          >
            La operación fue cancelada o rechazada por la institución bancaria.
            No se ha realizado ningún cargo a tu cuenta y tu base de datos se
            mantiene intacta. Puedes volver a intentarlo de inmediato.
          </Typography>

          {/* BOTONES ORTOGONALES DE REINTENTO */}
          <Stack spacing={2}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              startIcon={<ArrowBackOutlinedIcon />}
              onClick={() => navigate(-1)} // Regresa al formulario/modal anterior de manera nativa
              sx={{
                color: "#FFFFFF",
                bgcolor: "primary.main",
                fontWeight: 800,
                py: 2,
                borderRadius: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "none",
                },
              }}
            >
              Volver a Intentar
            </Button>

            <Button
              variant='outlined'
              fullWidth
              startIcon={<HelpOutlineOutlinedIcon />}
              href='https://wa.me/tu_numero_de_atencion'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: "primary.main",
                borderColor: "rgba(186, 137, 146, 0.4)",
                fontWeight: 800,
                py: 1.8,
                borderRadius: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(186, 137, 146, 0.05)",
                },
              }}
            >
              Solicitar Soporte
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default InscripcionCancelada;
