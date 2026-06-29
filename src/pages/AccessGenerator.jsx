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
      // 2. Consulta a Supabase (Trae el array de registros que coincidan en fechas y correo)
      const { data: enrollmentsList, error: supabaseErr } = await supabase
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
          fecha_inicio,
          tipo_curso
        )
      `,
        )
        .eq("students.email", email)
        .in("status", ["completed", "active"]) // Permitimos ambos estados desde la consulta
        .gte("cursos.fecha_inicio", fechaHoyStr)
        .lte("cursos.fecha_inicio", fechaLimiteStr);

      if (supabaseErr) throw supabaseErr;

      // 3. Validamos de forma condicional en JavaScript la inscripción adecuada
      const data =
        enrollmentsList?.find((enrollment) => {
          const tipoCurso = enrollment.cursos?.tipo_curso;
          const estado = enrollment.status;

          // REGLA: Si es 'Curso', pasa con active o completed. Si es otra cosa, estrictamente completed.
          if (tipoCurso === "Curso") {
            return estado === "active" || estado === "completed";
          } else {
            return estado === "completed";
          }
        }) || null;

      // 4. Procesamos la inscripción válida encontrada
      if (data) {
        if (!data.qr_code_token) {
          setError(
            "Tu inscripción es válida, pero tu pase de acceso aún no ha sido timbrado. Por favor contacta al administrador.",
          );
          setLoading(false);
          return;
        }

        // Formateador estético para la fecha del taller/curso
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
          tipo_curso: data.cursos.tipo_curso,
        });
      } else {
        setError(
          "No se encontraron pases de asistencia válidos o vigentes para este correo electrónico en los próximos 7 días.",
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
