import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Slider,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import { FormatCurrency } from "../../utils/FormatCurrency";
const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      borderColor: "rgba(216,46,136,0.3)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 0 0 4px rgba(216,46,136,0.1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 0 0 4px rgba(216,46,136,0.2)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#333",
    padding: "16px 20px",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root": {
    color: "#D82E7A",
    fontWeight: "500",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#D82E7A",
    fontWeight: "600",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "14px",
    marginLeft: "8px",
  },
};
const InscriptionForm = ({ currentCourse, isProcessing, onSubmit }) => {
  const totalInscripcion = currentCourse?.costo || 0;
  const [porcentaje, setPorcentaje] = useState(30);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const montoAPagar = (totalInscripcion * porcentaje) / 100;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Le pasamos la data limpia y el monto calculado al padre
    onSubmit({ ...formData, montoAPagar });
  };

  return (
    <Box component='form' onSubmit={handleFormSubmit}>
      <Stack spacing={3}>
        {/* INPUTS ESTILO PREMIUM STUDIO */}
        <TextField
          required
          fullWidth
          label='Nombre Completo'
          name='name'
          disabled={isProcessing}
          autoComplete='off'
          onChange={handleChange}
          variant='outlined'
          slotProps={{
            input: {
              sx: { borderRadius: "16px", fontFamily: "'Inter', sans-serif" },
            },
            inputLabel: {
              sx: { fontFamily: "'Montserrat', sans-serif", fontWeight: 500 },
            },
          }}
          sx={inputStyles}
        />

        <TextField
          required
          fullWidth
          disabled={isProcessing}
          label='Teléfono (Preferentemente WhatsApp)'
          name='phone'
          type='tel'
          onChange={handleChange}
          variant='outlined'
          sx={inputStyles}
          autoComplete='off'
          slotProps={{
            input: {
              sx: { borderRadius: "16px", fontFamily: "'Inter', sans-serif" },
            },
            inputLabel: {
              sx: { fontFamily: "'Montserrat', sans-serif", fontWeight: 500 },
            },
          }}
        />

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
          slotProps={{
            input: {
              sx: { borderRadius: "16px", fontFamily: "'Inter', sans-serif" },
            },
            inputLabel: {
              sx: { fontFamily: "'Montserrat', sans-serif", fontWeight: 500 },
            },
          }}
          helperText='Lo usaremos para respaldar tus comprobantes de pago de forma segura.'
          FormHelperTextProps={{
            sx: {
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              ml: 1,
            },
          }}
        />

        {/* SECCIÓN DEL SLIDER GLOW DE STRIPE */}
        <Box
          sx={{
            mt: 1,
            p: 3,
            backgroundColor: "rgba(229, 56, 136, 0.02)",
            borderRadius: "24px",
            border: "1px solid rgba(229, 56, 136, 0.08)",
            opacity: isProcessing ? 0.6 : 1,
            pointerEvents: isProcessing ? "none" : "auto",
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 800,
              color: "#212121",
              mb: 0.5,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            ¿Cuánto deseas abonar hoy?
          </Typography>
          <Typography
            variant='caption'
            display='block'
            sx={{ mb: 3, color: "#554D4F", fontFamily: "'Inter', sans-serif" }}
          >
            Puedes apartar tu lugar desde el 30% del costo total del programa.
          </Typography>

          {/* Slider Premium Suave Estilo Redondeado */}
          <Slider
            value={porcentaje}
            min={30}
            max={100}
            step={5}
            onChange={(e, newValue) => setPorcentaje(newValue)}
            valueLabelDisplay='auto'
            valueLabelFormat={(value) => `${value}%`}
            sx={{
              color: "#E53888",
              height: 6,
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                backgroundColor: "#FFFFFF",
                border: "4px solid #E53888",
                boxShadow: "0px 4px 10px rgba(229, 56, 136, 0.2)",
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0px 0px 0px 8px rgba(229, 56, 136, 0.16)",
                },
              },
              "& .MuiSlider-track": { borderRadius: "10px" },
              "& .MuiSlider-rail": {
                borderRadius: "10px",
                backgroundColor: "rgba(229, 56, 136, 0.12)",
              },
            }}
          />

          {/* DESGLOSE ESTILO RECIBO EDITORIAL */}
          <Stack
            direction='row'
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              pt: 2.5,
              borderTop: "1px dashed rgba(229, 56, 136, 0.2)",
            }}
          >
            <Box>
              <Typography
                variant='caption'
                display='block'
                sx={{
                  color: "#554D4F",
                  fontFamily: "'Inter', sans-serif",
                  mb: 0.5,
                }}
              >
                Inversión Total: {FormatCurrency(totalInscripcion)} MXN
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 700,
                  color: "#212121",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Monto a pagar inicial ({porcentaje}%):
              </Typography>
            </Box>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 900,
                color: "#E53888",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5rem",
              }}
            >
              {FormatCurrency(montoAPagar)}{" "}
              <Box
                component='span'
                sx={{ fontSize: "0.75rem", color: "#554D4F", fontWeight: 700 }}
              >
                MXN
              </Box>
            </Typography>
          </Stack>
        </Box>

        {/* BOTÓN DE ACCIÓN CON ESTADO LOADING INTEGRADO */}
        <Button
          type='submit'
          variant='contained'
          disabled={isProcessing} // Bloquea clics repetidos de la alumna
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
              ? "rgba(229, 56, 136, 0.7)"
              : "#E53888",
            color: "#FFFFFF !important", // Forzamos el color blanco del texto e íconos
            fontWeight: 700,
            fontSize: "0.95rem",
            py: 1.8,
            borderRadius: "50px", // Nuestra icónica cápsula premium
            letterSpacing: "1px",
            textTransform: "none",
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0px 8px 25px rgba(229, 56, 136, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#D82E7A",
            },
            // Estilos específicos cuando el botón se deshabilita por procesamiento
            "&.Mui-disabled": {
              backgroundColor: "rgba(229, 56, 136, 0.6)",
              color: "rgba(255, 255, 255, 0.9) !important",
            },
          }}
        >
          {isProcessing
            ? "Redirigiendo a pasarela segura..."
            : "Proceder al Pago Seguro"}
        </Button>
      </Stack>
    </Box>
  );
};

export default InscriptionForm;
