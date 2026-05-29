import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Landing/Layout";

const PagoExitoso = () => {
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
          {/* ÍCONO DE CONFIRMACIÓN EDITORIAL */}
          <CheckCircleOutlineOutlinedIcon
            sx={{
              fontSize: 52,
              color: "secondary.main",
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
              color: "secondary.main",
              display: "block",
              mb: 1,
            }}
          >
            Transacción Completada
          </Typography>

          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2rem", md: "2.6rem" },
              lineHeight: 1.2,
              color: "primary.main",
              letterSpacing: "0.5px",
              mb: 3,
            }}
          >
            ¡TU LUGAR ESTÁ <br />
            <Box
              component='span'
              sx={{
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "400",
                color: "secondary.main",
              }}
            >
              ASEGURADO!
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
            Hemos procesado tu inscripción de manera exitosa. Nuestro sistema
            automatizado está dando de alta tus credenciales de acceso. En unos
            minutos recibirás un correo de confirmación.
          </Typography>

          {/* ACCIONES COHERENTES CON LA PLATAFORMA */}
          <Stack spacing={2}>
            {/* <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<WhatsAppIcon />}
              href='https://wa.me/tu_numero_de_atencion' // Puedes dinamizarlo si guardas el cel de la escuela
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: "primary.main",
                bgcolor: "secondary.main",
                fontWeight: 800,
                py: 2,
                borderRadius: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "secondary.dark",
                  color: "#FFFFFF",
                  boxShadow: "none",
                },
              }}
            >
              Reportar Pago por WhatsApp
            </Button> */}

            <Button
              variant='text'
              fullWidth
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/")}
              sx={{
                color: "primary.main",
                fontWeight: 800,
                py: 1.5,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Volver al Inicio
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PagoExitoso;
