import React, { useState } from "react";
// Importación estricta del nuevo Grid (Grid2) de Material UI
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
import Layout from "../components/Landing/Layout";
import { supabase } from "../config/supabaseClient";
import InfoAccess from "../components/AccessGenerator/InfoAccess";
// Instancia de tu cliente de Supabase (Ajusta la ruta según tu proyecto)

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
  const [enrollment, setEnrollment] = useState(null);
  const [openModalQR, setOpenModalQR] = useState(false);

  const handleSearchAccess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEnrollment(null);

    try {
      // 1. Calculamos las fechas límites para la ventana de 7 días (Formato YYYY-MM-DD)
      const hoy = new Date();
      const fechaHoyStr = hoy.toISOString().split("T")[0];

      const limiteSieteDias = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const fechaLimiteStr = limiteSieteDias.toISOString().split("T")[0];

      // 2. Consulta Real a Supabase uniendo estudiantes y cursos en un solo tiro
      const { data, error: supabaseErr } = await supabase
        .from("enrollments")
        .select(
          `
          id,
          status,
          qr_code_token,
          students!inner (
            name,
            email
          ),
          cursos!inner (
            titulo,
            fecha_inicio
          )
        `,
        )
        .eq("students.email", email) // Busca por correo limpio
        .eq("status", "completed") // Solo inscripciones liquidadas de mostrador o Stripe
        .gte("cursos.fecha_inicio", fechaHoyStr) // Desde hoy en adelante
        .lte("cursos.fecha_inicio", fechaLimiteStr) // Máximo 7 días en el futuro
        .maybeSingle(); // Retorna un objeto o null, evitando que truene si hay múltiples talleres

      if (supabaseErr) throw supabaseErr;

      // 3. Validamos si se encontró el registro y cuenta con su token generado
      if (data) {
        if (!data.qr_code_token) {
          setError(
            "Tu inscripción está liquidada, pero tu pase de acceso aún no ha sido timbrado. Por favor contacta al administrador.",
          );
          setLoading(false);
          return;
        }

        // Formateador estético para la fecha del taller
        const opcionesFecha = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const fechaFormateada = new Date(
          data.cursos.fecha_inicio + "T00:00:00",
        ).toLocaleDateString("es-MX", opcionesFecha);

        // Mapeamos la respuesta al estado de la vista
        setEnrollment({
          id: data.id,
          studentName: data.students.name,
          courseName: data.cursos.titulo,
          fechaCurso: fechaFormateada,
          qr_code_token: data.qr_code_token,
        });
      } else {
        setError(
          "No se encontraron pases de asistencia liquidados para este correo electrónico en los próximos 7 días.",
        );
      }
    } catch (err) {
      console.error("Error en consulta de accesos web:", err.message);
      setError(
        "Ocurrió un error al verificar tu pase de acceso. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
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

                <Grid container component='form' onSubmit={handleSearchAccess}>
                  <Grid size={12} sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label='Correo Electrónico'
                      type='email'
                      variant='outlined'
                      autoComplete='off'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='ejemplo@wapizima.com'
                      slotProps={{
                        input: {
                          startAdornment: (
                            <EmailOutlinedIcon
                              sx={{
                                color: "#DF228A",
                                mr: 1.5,
                                fontSize: "1.2rem",
                              }}
                            />
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          fontFamily: "'Inter', sans-serif",
                          "&.Mui-focused fieldset": {
                            borderColor: "#DF228A",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#DF228A",
                          fontWeight: "600",
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
                        background: `#DF228A`,
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
                        : "Buscar mis accesos"}
                    </Button>
                  </Grid>
                </Grid>

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

                {enrollment && (
                  <InfoAccess enrollment={enrollment} COLORS={COLORS} />
                  // <Grid
                  //   container
                  //   sx={{
                  //     mt: 3,
                  //     p: 3,
                  //     backgroundColor: "rgba(76, 175, 80, 0.03)",
                  //     borderRadius: "24px",
                  //     border: "1px solid rgba(76, 175, 80, 0.2)",
                  //     alignItems: "center",
                  //   }}
                  // >
                  //   <Grid
                  //     size={12}
                  //     sx={{
                  //       display: "flex",
                  //       flexDirection: "column",
                  //       alignItems: "center",
                  //       mb: 2,
                  //     }}
                  //   >
                  //     <CheckCircleOutlinedIcon
                  //       sx={{ color: "#4caf50", fontSize: "2.5rem", mb: 1 }}
                  //     />
                  //     <Typography
                  //       variant='h6'
                  //       sx={{
                  //         fontWeight: 800,
                  //         color: COLORS.dark,
                  //         fontFamily: "'Montserrat', sans-serif",
                  //         fontSize: "1.1rem",
                  //       }}
                  //     >
                  //       ¡Inscripción Confirmada!
                  //     </Typography>
                  //     <Typography
                  //       variant='subtitle2'
                  //       sx={{
                  //         color: "#4caf50",
                  //         fontWeight: 700,
                  //         fontSize: "0.75rem",
                  //         letterSpacing: "1px",
                  //         mt: 0.5,
                  //       }}
                  //     >
                  //       CUENTA LIQUIDADA
                  //     </Typography>
                  //   </Grid>

                  //   <Grid
                  //     size={12}
                  //     sx={{
                  //       textAlign: "left",
                  //       borderTop: "1px dashed rgba(0,0,0,0.08)",
                  //       pt: 2,
                  //       mb: 3,
                  //     }}
                  //   >
                  //     <Typography
                  //       variant='caption'
                  //       sx={{
                  //         color: "#655F62",
                  //         textTransform: "uppercase",
                  //         fontWeight: 700,
                  //         letterSpacing: "0.5px",
                  //       }}
                  //     >
                  //       Taller Próximo
                  //     </Typography>
                  //     <Typography
                  //       variant='body1'
                  //       sx={{
                  //         fontWeight: 700,
                  //         color: COLORS.dark,
                  //         fontFamily: "'Inter', sans-serif",
                  //         mb: 1.5,
                  //       }}
                  //     >
                  //       {enrollment.courseName}
                  //     </Typography>

                  //     <Stack
                  //       direction='row'
                  //       spacing={1}
                  //       sx={{ color: "#655F62", alignItems: "center" }}
                  //     >
                  //       <CalendarMonthIcon
                  //         sx={{ fontSize: "1.1rem", color: COLORS.primary }}
                  //       />
                  //       <Typography
                  //         variant='body2'
                  //         sx={{
                  //           fontFamily: "'Inter', sans-serif",
                  //           fontWeight: 500,
                  //         }}
                  //       >
                  //         Fecha del evento:{" "}
                  //         <strong>{enrollment.fechaCurso}</strong>
                  //       </Typography>
                  //     </Stack>
                  //   </Grid>

                  //   <Grid size={12}>
                  //     <Button
                  //       variant='outlined'
                  //       fullWidth
                  //       onClick={() => setOpenModalQR(true)}
                  //       startIcon={<QrCode2Icon />}
                  //       sx={{
                  //         borderRadius: "99px",
                  //         py: 1.5,
                  //         borderColor: COLORS.primary,
                  //         color: COLORS.primary,
                  //         fontWeight: 700,
                  //         textTransform: "none",
                  //         fontFamily: "'Montserrat', sans-serif",
                  //         "&:hover": {
                  //           backgroundColor: "rgba(233, 30, 99, 0.04)",
                  //           borderColor: COLORS.accent,
                  //         },
                  //       }}
                  //     >
                  //       Ver mi Código QR de Entrada
                  //     </Button>
                  //   </Grid>
                  // </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Layout>
  );
};

export default AccessGenerator;
