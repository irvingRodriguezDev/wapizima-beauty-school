import React, { useState } from "react";
// Eliminamos Box por completo e importamos estrictamente Grid2 como Grid
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  Modal,
  Stack,
  IconButton,
} from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { QRCodeSVG } from "qrcode.react";
import Layout from "../components/Landing/Layout";

const COLORS = {
  primary: "#E91E63", // Fucsia Icónico Wapizima
  accent: "#FF6097",
  dark: "#2A2628", // Oscuro Orgánico
  lightBg: "#FAFAFA",
};

const AccessGenerator = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrollment, setEnrollment] = useState(null); // Almacenará la inscripción encontrada
  const [openModalQR, setOpenModalQR] = useState(false); // Control del Modal del QR

  const handleSearchAccess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEnrollment(null);

    try {
      /* 🔥 AQUÍ IRÁ TU IMPLEMENTACIÓN CON SUPABASE / BACKEND:
        
        const { data, error } = await supabase
          .from('enrollments')
          .select('*, courses(*), users(*)')
          .eq('users.email', email.trim().toLowerCase())
          .eq('status_pago', 'LIQUIDADO') // Validar que ya pagó el 100%
          .gte('courses.fecha_inicio', new Date().toISOString().split('T')[0]) // Desde hoy
          .lte('courses.fecha_inicio', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Próximos 7 días

        Si no viene data o el qr_code_token está vacío, disparas el error custom.
      */

      // Simulando respuesta exitosa de la consulta de los próximos 7 días
      setTimeout(() => {
        const mockEnrollment = {
          id: "enr_99821",
          studentName: "Irving Rodriguez",
          courseName: "Masterclass Estructuras de Salón Avanzado",
          fechaCurso: "18 Jun 2026",
          // Si por alguna razón en tu base de datos el token sigue vacío, aquí simulamos que sí existe
          qr_code_token: "WAP-ENROLL-2026-IRV7781290X",
          liquidado: true,
        };

        // Simulación: Si encuentra un registro liquidado en la ventana de tiempo
        if (mockEnrollment.liquidado && mockEnrollment.qr_code_token) {
          setEnrollment(mockEnrollment);
        } else {
          setError(
            "No encontramos inscripciones liquidadas para los próximos 7 días con este correo electrónico.",
          );
        }
        setLoading(false);
      }, 1200);
    } catch (err) {
      setError(
        "Ocurrió un error al verificar tu pase de acceso. Intenta de nuevo.",
      );
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* FONDO LIENZO INFINITO */}
      <Grid
        container
        sx={{
          minHeight: "90vh",
          background: COLORS.lightBg,
          backgroundImage: `
            radial-gradient(circle at 100% 0%, rgba(245, 79, 156, 0.04) 0%, transparent 45%),
            radial-gradient(circle at 0% 100%, rgba(244, 114, 182, 0.02) 0%, transparent 40%)
          `,
          py: 8,
          alignItems: "center",
        }}
      >
        <Container maxWidth='sm'>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: "32px",
                  border: "1px solid rgba(245, 79, 156, 0.12)",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 24px 64px rgba(233, 30, 99, 0.03)",
                  textAlign: "center",
                }}
              >
                {/* ENCABEZADO EDITORIAL */}
                <Typography
                  variant='h4'
                  component='h1'
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: COLORS.dark,
                    fontSize: { xs: "2rem", md: "2.4rem" },
                    mb: 1,
                  }}
                >
                  Pase de Acceso Digital
                </Typography>

                <Typography
                  variant='body2'
                  sx={{
                    color: "#655F62",
                    fontFamily: "'Inter', sans-serif",
                    mb: 4,
                    px: { md: 2 },
                  }}
                >
                  Ingresa tu correo registrado para descargar el código QR de
                  entrada a tus talleres de esta semana. ✨
                </Typography>

                {/* FORMULARIO DE BÚSQUEDA (100% GRID) */}
                <Grid container component='form' onSubmit={handleSearchAccess}>
                  <Grid size={12} sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label='Correo Electrónico'
                      type='email'
                      variant='outlined'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='ejemplo@wapizima.com'
                      InputProps={{
                        startAdornment: (
                          <EmailOutlinedIcon
                            sx={{
                              color: COLORS.primary,
                              mr: 1.5,
                              fontSize: "1.2rem",
                            }}
                          />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          fontFamily: "'Inter', sans-serif",
                          "&.Mui-focused fieldset": {
                            borderColor: COLORS.primary,
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12} sx={{ mb: 3 }}>
                    <Button
                      type='submit'
                      variant='contained'
                      disableElevation
                      fullWidth
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color='inherit' />
                        ) : (
                          <QrCode2Icon />
                        )
                      }
                      sx={{
                        background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                        borderRadius: "99px",
                        py: 1.8,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: "0px 8px 24px rgba(233, 30, 99, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow: "0px 12px 28px rgba(233, 30, 99, 0.3)",
                        },
                      }}
                    >
                      {loading
                        ? "Verificando Inscripción..."
                        : "Buscar mis Talleres"}
                    </Button>
                  </Grid>
                </Grid>

                {/* MENSAJES DE ERROR */}
                {error && (
                  <Alert
                    severity='error'
                    sx={{
                      borderRadius: "16px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      textAlign: "left",
                    }}
                  >
                    {error}
                  </Alert>
                )}

                {/* TARJETA DE RECONOCIMIENTO EXITOSO (Próximos 7 días) */}
                {enrollment && (
                  <Grid
                    container
                    sx={{
                      mt: 3,
                      p: 3,
                      backgroundColor: "rgba(76, 175, 80, 0.03)",
                      borderRadius: "24px",
                      border: "1px solid rgba(76, 175, 80, 0.2)",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      size={12}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <CheckCircleOutlinedIcon
                        sx={{ color: "#4caf50", fontSize: "2.5rem", mb: 1 }}
                      />
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 800,
                          color: COLORS.dark,
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        ¡Inscripción Confirmada!
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        sx={{
                          color: "#4caf50",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          letterSpacing: "1px",
                          mt: 0.5,
                        }}
                      >
                        CUENTA LIQUIDADA
                      </Typography>
                    </Grid>

                    <Grid
                      size={12}
                      sx={{
                        textAlign: "left",
                        borderTop: "1px dashed rgba(0,0,0,0.08)",
                        pt: 2,
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant='caption'
                        sx={{
                          color: "#655F62",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Taller Próximo
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          fontWeight: 700,
                          color: COLORS.dark,
                          fontFamily: "'Inter', sans-serif",
                          mb: 1.5,
                        }}
                      >
                        {enrollment.courseName}
                      </Typography>

                      <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                        sx={{ color: "#655F62" }}
                      >
                        <CalendarMonthIcon
                          sx={{ fontSize: "1.1rem", color: COLORS.primary }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Fecha del evento:{" "}
                          <strong>{enrollment.fechaCurso}</strong>
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid size={12}>
                      <Button
                        variant='outlined'
                        fullWidth
                        onClick={() => setOpenModalQR(true)}
                        startIcon={<QrCode2Icon />}
                        sx={{
                          borderRadius: "99px",
                          py: 1.5,
                          borderColor: COLORS.primary,
                          color: COLORS.primary,
                          fontWeight: 700,
                          textTransform: "none",
                          fontFamily: "'Montserrat', sans-serif",
                          "&:hover": {
                            backgroundColor: "rgba(233, 30, 99, 0.04)",
                            borderColor: COLORS.accent,
                          },
                        }}
                      >
                        Ver mi Código QR de Entrada
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      {/* ================= MODAL PREMIUM PARA MOSTRAR EL QR SEGURO ================= */}
      <Modal
        open={openModalQR}
        onClose={() => setOpenModalQR(false)}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Grid
          container
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "32px",
            maxWidth: "380px",
            width: "100%",
            p: 4,
            boxShadow: "0px 32px 80px rgba(0,0,0,0.12)",
            outline: "none",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* Botón de cerrar superior */}
          <IconButton
            onClick={() => setOpenModalQR(false)}
            sx={{ position: "absolute", top: 16, right: 16, color: "#655F62" }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>

          <Grid size={12} sx={{ mt: 1, mb: 2 }}>
            <Typography
              variant='h6'
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                color: COLORS.dark,
              }}
            >
              Pase Digital Obligatorio
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "#655F62", fontFamily: "'Inter', sans-serif" }}
            >
              {enrollment?.studentName}
            </Typography>
          </Grid>

          {/* Celda del Contenedor del QR Real */}
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 3,
              backgroundColor: "#FAFAFA",
              border: "1px solid rgba(0,0,0,0.04)",
              borderRadius: "24px",
              mb: 3,
            }}
          >
            {enrollment?.qr_code_token && (
              <QRCodeSVG
                value={enrollment.qr_code_token}
                size={220}
                fgColor={COLORS.dark}
                level='H' // Alta recuperación de errores en pantallas con brillo bajo
                includeMargin={true}
              />
            )}
          </Grid>

          <Grid size={12}>
            <Typography
              variant='caption'
              sx={{
                color: COLORS.primary,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Muestra este código al staff en taquilla
            </Typography>
          </Grid>
        </Grid>
      </Modal>
    </Layout>
  );
};

export default AccessGenerator;
