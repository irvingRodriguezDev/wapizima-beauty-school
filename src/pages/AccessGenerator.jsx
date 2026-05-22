import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  QrCode2 as QrIcon,
  PhoneAndroid as PhoneIcon,
  CheckCircleOutline as SuccessIcon,
} from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react"; // Librería estándar para pintar el QR en React

const COLORS = {
  primary: "#f06292",
  accent: "#e2208c",
  dark: "#2D2D2D",
  lightBg: "#FFF9FA",
};

const AccessGenerator = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessData, setAccessData] = useState(null); // Almacenará el token generado

  const handleGenerateAccess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAccessData(null);

    try {
      /* AQUÍ IRÁ TU LLAMADA A SUPABASE:
        1. Buscar inscripción con el teléfono.
        2. Validar que el curso asociado sea el día de hoy.
        3. Validar que el pago esté LIQUIDADO (saldo pendiente === 0).
      */

      // Simulando una respuesta exitosa del backend tras validar todo:
      setTimeout(() => {
        const mockResponse = {
          valid: true,
          studentName: "Irving Rodriguez",
          courseName: "Masterclass Estructuras de Salón",
          token: "WAP-XONA-2026-XYZ890", // Token único generado al momento
        };

        if (mockResponse.valid) {
          setAccessData(mockResponse);
        } else {
          setError(
            "La inscripción no está liquidada o no hay cursos para hoy.",
          );
        }
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Error al consultar el acceso. Verifica los datos.");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: "32px",
          border: "1px solid rgba(240, 98, 146, 0.15)",
          background: "linear-gradient(180deg, #FFF9FA 0%, #FFFFFF 100%)",
          boxShadow: "0px 20px 50px rgba(242, 32, 140, 0.04)",
          textAlign: "center",
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            color: COLORS.dark,
            mb: 1,
          }}
        >
          Generador de Accesos
        </Typography>
        <Typography variant='body2' color='textSecondary' sx={{ mb: 4 }}>
          Ingresa el teléfono registrado para generar tu pase dinámico de hoy.
        </Typography>

        {/* Formulario de Búsqueda */}
        <Box component='form' onSubmit={handleGenerateAccess} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label='Número de Teléfono (WhatsApp)'
            variant='outlined'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder='Ej. 7221234567'
            InputProps={{
              startAdornment: (
                <PhoneIcon sx={{ color: COLORS.primary, mr: 1 }} />
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                "&.Mui-focused fieldset": { borderColor: COLORS.accent },
              },
            }}
          />

          <Button
            type='submit'
            variant='contained'
            fullWidth
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={20} color='inherit' />
              ) : (
                <QrIcon />
              )
            }
            sx={{
              background: "linear-gradient(90deg, #E2208C 0%, #F06292 100%)",
              borderRadius: "16px",
              py: 1.6,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0px 6px 20px rgba(226, 32, 140, 0.25)",
              "&:hover": {
                background: "linear-gradient(90deg, #A81464 0%, #E2208C 100%)",
              },
            }}
          >
            {loading ? "Verificando..." : "Obtener mi Pase QR"}
          </Button>
        </Box>

        {error && (
          <Alert severity='error' sx={{ borderRadius: "14px", mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 🌟 RENDERIZADO DEL PASALUJO / QR DINÁMICO */}
        {accessData && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: "#fff",
              borderRadius: "24px",
              border: "2px solid #e8f5e9",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SuccessIcon sx={{ color: "#4caf50", fontSize: "3rem", mb: 1 }} />
            <Typography
              variant='h6'
              sx={{ fontWeight: 800, color: COLORS.dark }}
            >
              ¡Acceso Autorizado!
            </Typography>
            <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
              {accessData.studentName} — {accessData.courseName}
            </Typography>

            {/* Contenedor del QR */}
            <Box
              sx={{
                p: 2,
                bgcolor: "#fff",
                border: "1px solid #eee",
                borderRadius: "16px",
                mb: 2,
              }}
            >
              <QRCodeSVG
                value={accessData.token}
                size={180}
                fgColor={COLORS.dark}
                level='H'
              />
            </Box>

            <Typography
              variant='caption'
              sx={{
                color: COLORS.accent,
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              MUESTRA ESTE QR EN LA ENTRADA
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AccessGenerator;
