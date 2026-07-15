import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { motion } from "framer-motion";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Landing/Layout";

const InscripcionCancelada = () => {
  const navigate = useNavigate();

  // URL de soporte directo configurado para rescate de carritos / inscripciones interrumpidas
  const WHATSAPP_SOPORTE =
    "https://wa.me/521234567890?text=Hola!%20Tuve%20un%20inconveniente%20al%20procesar%20mi%20pago%20para%20el%20curso.%20%C2%BFIndicas%20c%C3%B3mo%20proceder?";

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          background: "#FFFBFD",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(229, 56, 136, 0.03) 0%, transparent 60%)",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth='sm'>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }}
            sx={{
              p: { xs: 4, sm: 6 },
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(244, 114, 182, 0.2)",
              textAlign: "center",
              borderRadius: "32px", // Esquinas suaves unificadas con todo el flujo público
              boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.02)",
            }}
          >
            {/* ÍCONO DE INTERRUPCIÓN CON ATENCIÓN DETENIDA ANIMADA */}
            <Box
              component={motion.div}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{ display: "inline-block", mb: 3 }}
            >
              <ErrorOutlineOutlinedIcon
                sx={{
                  fontSize: 60,
                  color: "#D82E7A", // Rosa intenso elegante para alertas sin ser agresivo
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
                color: "#554D4F",
                display: "block",
                fontFamily: "'Montserrat', sans-serif",
                mb: 1.5,
              }}
            >
              Proceso Interrumpido
            </Typography>

            <Typography
              variant='h2'
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.1rem", md: "2.6rem" },
                lineHeight: 1.15,
                color: "#212121",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-0.5px",
                mb: 3,
              }}
            >
              Pago no <br />
              <Box
                component='span'
                sx={{
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: "400",
                  color: "#E53888",
                }}
              >
                procesado
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
                px: { xs: 0, sm: 1 },
              }}
            >
              La operación fue cancelada o el emisor de la tarjeta declinó la
              transacción. No se ha realizado ningún cargo a tu cuenta bancaria.
              Descuida, puedes regresar e intentar con otro método de pago de
              inmediato.
            </Typography>

            {/* ACCIONES DE RESCATE PREMIUM COMPATIBLES */}
            <Stack spacing={2} sx={{ maxWidth: "400px", margin: "0 auto" }}>
              {/* Botón de Acción Principal: Reintentar */}
              <Button
                variant='contained'
                fullWidth
                startIcon={
                  <ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />
                }
                onClick={() => navigate("/")} // Retorno natural al detalle/modal previo
                sx={{
                  backgroundColor: "#E53888", // Rosa primario de conversión
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  py: 1.6,
                  borderRadius: "50px", // Formato cápsula premium
                  textTransform: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: "0px 6px 20px rgba(229, 56, 136, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#D82E7A",
                    boxShadow: "0px 8px 25px rgba(229, 56, 136, 0.3)",
                  },
                }}
              >
                Ir al inicio
              </Button>

              {/* Botón de Acción Secundario: Soporte Técnico Especializado */}
              <Button
                component='a'
                href={WHATSAPP_SOPORTE}
                target='_blank'
                rel='noopener noreferrer'
                variant='outlined'
                fullWidth
                startIcon={<WhatsAppIcon />}
                sx={{
                  color: "#554D4F",
                  borderColor: "rgba(229, 56, 136, 0.25)",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: "50px",
                  textTransform: "none",
                  fontSize: "0.88rem",
                  fontFamily: "'Montserrat', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#E53888",
                    backgroundColor: "rgba(229, 56, 136, 0.02)",
                    color: "#E53888",
                  },
                }}
              >
                Asistencia por WhatsApp
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default InscripcionCancelada;
