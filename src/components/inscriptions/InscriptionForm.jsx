import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FormatCurrency } from "../../utils/FormatCurrency";

const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      borderColor: "rgba(240, 98, 146, 0.25)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#f06292",
      boxShadow: "0 0 0 4px rgba(240, 98, 146, 0.1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f06292",
      boxShadow: "0 0 0 4px rgba(240, 98, 146, 0.2)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#333",
    padding: "16px 20px",
    fontSize: "15px",
  },
  "& .MuiInputLabel-root": {
    color: "#f06292",
    fontWeight: "500",
    fontSize: "15px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#f06292",
    fontWeight: "600",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    marginLeft: "8px",
  },
};

const InscriptionForm = ({ currentCourse, isProcessing, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Estructuras JSONB seguras
  const planPagos = Array.isArray(currentCourse?.plan_pagos)
    ? currentCourse.plan_pagos
    : [];

  // 1. Cálculos reales desde el Plan de Pagos
  const costoTotalCalculado = planPagos.reduce(
    (acc, curr) => acc + (curr.monto || 0),
    0,
  );
  const montoApartadoReal = planPagos[0]?.monto || 500; // Por defecto 500 si no se ha configurado el plan

  // Estado para la opción de pago seleccionada: "apartado" o "total"
  const [opcionPago, setOpcionPago] = useState("apartado");

  // Determinar el monto final a pasar a Stripe
  const montoAPagar =
    opcionPago === "apartado" ? montoApartadoReal : costoTotalCalculado;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, montoAPagar });
  };

  return (
    <Box component='form' onSubmit={handleFormSubmit}>
      <Grid container spacing={1.5}>
        {/* CAMPOS DE CONTACTO */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            fullWidth
            label='Nombre Completo'
            name='name'
            disabled={isProcessing}
            autoComplete='off'
            onChange={handleChange}
            variant='outlined'
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            disabled={isProcessing}
            label='Teléfono (WhatsApp de preferencia)'
            name='phone'
            type='tel'
            onChange={handleChange}
            variant='outlined'
            sx={inputStyles}
            autoComplete='off'
          />
        </Grid>
        <Grid size={12}>
          <TextField
            required
            fullWidth
            label='Correo Electrónico'
            name='email'
            type='email'
            sx={inputStyles}
            disabled={isProcessing}
            autoComplete='off'
            onChange={handleChange}
            variant='outlined'
          />
        </Grid>

        {/* CONTENEDOR DE SELECCIÓN DE PAGO */}
        <Grid
          container
          spacing={2}
          sx={{
            mt: 1,
            p: 3,
            backgroundColor: "rgba(240, 98, 146, 0.02)",
            borderRadius: "24px",
            border: "8px solid rgba(240, 98, 146, 0.08)",
            opacity: isProcessing ? 0.6 : 1,
            pointerEvents: isProcessing ? "none" : "auto",
          }}
        >
          <Grid size={12}>
            <Typography
              variant='subtitle2'
              sx={{
                fontWeight: 800,
                color: "#2A2628",
                mb: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Selecciona tu modalidad de pago
            </Typography>
          </Grid>

          {/* Opción 1: Apartado */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              onClick={() => setOpcionPago("apartado")}
              sx={{
                p: 2,
                borderRadius: "16px",
                cursor: "pointer",
                textAlign: "center",
                border:
                  opcionPago === "apartado"
                    ? "2px solid #f06292"
                    : "2px solid rgba(0,0,0,0.04)",
                backgroundColor:
                  opcionPago === "apartado" ? "#fffdfd" : "#ffffff",
                boxShadow:
                  opcionPago === "apartado"
                    ? "0px 8px 24px rgba(240, 98, 146, 0.06)"
                    : "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "#f06292",
                },
              }}
            >
              <FavoriteBorderIcon
                sx={{ color: "#f06292", mb: 1, fontSize: "1.4rem" }}
              />
              <Typography
                variant='body2'
                fontWeight='700'
                color='#2A2628'
                fontFamily="'Montserrat', sans-serif"
              >
                Apartar Lugar
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
                sx={{ mt: 0.5 }}
              >
                Asegura tu cupo con solo {FormatCurrency(montoApartadoReal)}
              </Typography>
            </Paper>
          </Grid>

          {/* Opción 2: Liquidación total */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              onClick={() => setOpcionPago("total")}
              sx={{
                p: 2,
                borderRadius: "16px",
                cursor: "pointer",
                textAlign: "center",
                border:
                  opcionPago === "total"
                    ? "2px solid #f06292"
                    : "2px solid rgba(0,0,0,0.04)",
                backgroundColor: opcionPago === "total" ? "#fffdfd" : "#ffffff",
                boxShadow:
                  opcionPago === "total"
                    ? "0px 8px 24px rgba(240, 98, 146, 0.06)"
                    : "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "#f06292",
                },
              }}
            >
              <LocalMallOutlinedIcon
                sx={{ color: "#f06292", mb: 1, fontSize: "1.4rem" }}
              />
              <Typography
                variant='body2'
                fontWeight='700'
                color='#2A2628'
                fontFamily="'Montserrat', sans-serif"
              >
                Pago Completo
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
                sx={{ mt: 0.5 }}
              >
                Liquida la totalidad {FormatCurrency(costoTotalCalculado)}
              </Typography>
            </Paper>
          </Grid>

          {/* DESGLOSE ESTILO RECIBO EDITORIAL */}
          <Stack
            direction='row'
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              pt: 2.5,
              borderTop: "2px dashed rgba(240, 98, 146, 0.25)",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant='caption'
                display='block'
                sx={{
                  color: "#6B6567",
                  fontFamily: "'Inter', sans-serif",
                  mb: 0.5,
                }}
              >
                {opcionPago === "apartado"
                  ? "Estás pagando el apartado del curso"
                  : "Estás liquidando el costo del curso"}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 700,
                  color: "#2A2628",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Total a debitar hoy:
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 900,
                  color: "#d81b60",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.5rem",
                }}
              >
                {FormatCurrency(montoAPagar)}{" "}
                <Box
                  component='span'
                  sx={{
                    fontSize: "0.65rem",
                    color: "#6B6567",
                    fontWeight: 700,
                  }}
                >
                  MXN
                </Box>
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* BOTÓN DE ACCIÓN CON ESTADO LOADING INTEGRADO */}
        <Button
          type='submit'
          variant='contained'
          disabled={isProcessing}
          startIcon={
            isProcessing ? (
              <CircularProgress size={18} color='inherit' />
            ) : (
              <LockIcon />
            )
          }
          endIcon={isProcessing ? null : <ArrowForwardIcon />}
          sx={{
            width: "100%",
            backgroundColor: isProcessing
              ? "rgba(240, 98, 146, 0.7)"
              : "#f06292",
            color: "#FFFFFF !important",
            fontWeight: 700,
            fontSize: "0.85rem",
            py: 1.8,
            borderRadius: "50px",
            letterSpacing: "0.5px",
            textTransform: "none",
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0px 8px 25px rgba(240, 98, 146, 0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#d81b60",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(240, 98, 146, 0.5)",
              color: "rgba(255, 255, 255, 0.9) !important",
            },
          }}
        >
          {isProcessing
            ? "Redirigiendo a pasarela segura..."
            : `Pagar ${FormatCurrency(montoAPagar)} MXN`}
        </Button>
      </Grid>
    </Box>
  );
};

export default InscriptionForm;
