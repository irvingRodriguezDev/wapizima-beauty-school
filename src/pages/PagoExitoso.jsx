import React from "react";
import { Box, Typography, Button, Stack, Container, Zoom } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Landing/Layout";

const PagoExitoso = () => {
  const navigate = useNavigate();

  // Reemplaza con el número real de soporte de la escuela o dinámica correspondiente
  const WHATSAPP_SOPORTE =
    "https://wa.me/521234567890?text=Hola!%20Acabo%20de%20inscribirme%20a%20un%20curso%20y%20me%20gustar%C3%ADa%20validar%20mis%20accesos.";

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          background: "#FFFBFD",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(229, 56, 136, 0.04) 0%, transparent 60%)",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth='sm'>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            sx={{
              p: { xs: 4, sm: 6 },
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(244, 114, 182, 0.2)",
              textAlign: "center",
              borderRadius: "32px", // Curvatura premium unificada
              boxShadow: "0px 20px 50px rgba(229, 56, 136, 0.04)",
              position: "relative",
            }}
          >
            {/* ÍCONO DE CONFIRMACIÓN CON MICRO-ANIMACIÓN POP */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              sx={{ display: "inline-block", mb: 3 }}
            >
              <CheckCircleOutlineOutlinedIcon
                sx={{
                  fontSize: 64,
                  color: "#E53888",
                  strokeWidth: 1,
                }}
              />
            </Box>

            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontWeight: 700,
                color: "#D82E7A",
                display: "block",
                fontFamily: "'Montserrat', sans-serif",
                mb: 1.5,
              }}
            >
              ✨ Transacción Completada ✨
            </Typography>

            <Typography
              variant='h2'
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.1rem", md: "2.8rem" },
                lineHeight: 1.15,
                color: "#212121",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-0.5px",
                mb: 3,
              }}
            >
              ¡Tu lugar está <br />
              <Box
                component='span'
                sx={{
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: "400",
                  color: "#E53888",
                }}
              >
                asegurado!
              </Box>
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "#554D4F",
                fontSize: "0.95rem",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.8,
                mb: 5,
                px: { xs: 0, sm: 2 },
              }}
            >
              Hemos procesado tu inscripción de manera exitosa. Nuestro sistema
              está generando tus credenciales de acceso automatizadas. En un par
              de minutos recibirás un correo de confirmación con tu recibo.
            </Typography>

            {/* BOTONES DE ACCIÓN UNIFICADOS */}
            <Stack spacing={2} sx={{ maxWidth: "400px", margin: "0 auto" }}>
              {/* Botón Principal: WhatsApp (Conversión Secundaria de Tranquilidad) */}
              {/* <Button
                component='a'
                href={WHATSAPP_SOPORTE}
                target='_blank'
                rel='noopener noreferrer'
                variant='contained'
                fullWidth
                startIcon={<WhatsAppIcon />}
                sx={{
                  backgroundColor: "#25D366", // Verde WhatsApp nativo pero estilizado premium
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  py: 1.6,
                  borderRadius: "50px", // Botón cápsula icónico
                  textTransform: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: "0px 6px 20px rgba(37, 211, 102, 0.25)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#128C7E",
                    boxShadow: "0px 8px 25px rgba(37, 211, 102, 0.35)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Notificar por WhatsApp
              </Button> */}

              {/* Botón Secundario: Regresar al Catálogo */}
              <Button
                variant='text'
                fullWidth
                startIcon={
                  <ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />
                }
                onClick={() => navigate(-1)}
                sx={{
                  color: "#554D4F",
                  fontWeight: 700,
                  py: 1.5,
                  letterSpacing: "0.5px",
                  textTransform: "none",
                  fontSize: "0.88rem",
                  fontFamily: "'Montserrat', sans-serif",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#E53888",
                  },
                }}
              >
                Volver a la Academia
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default PagoExitoso;
