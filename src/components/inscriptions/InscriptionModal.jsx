import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  Button,
  Stack,
  Slider,
  Box,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { initiateStripeCheckout } from "../../utils/StripeHelper";
const InscripcionModal = ({ open, onClose, currentCourse }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Estados del formulario de inscripción
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    whatsapp: "",
    correo: "", // Opcional
  });

  // El costo total simulado u obtenido del objeto currentCourse
  const totalInscripcion = currentCourse?.costo || 1000;

  // Estado para el porcentaje a pagar (Rango: 40% a 100%)
  const [porcentaje, setPorcentaje] = useState(30);

  // Cálculo del monto exacto a cobrar en tiempo real
  const montoAPagar = (totalInscripcion * porcentaje) / 100;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    setErrorMessage("");

    // Preparamos los datos del alumno y el curso
    const checkoutData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      cursoId: currentCourse.id,
      curso: currentCourse.titulo,
      tipo_curso: currentCourse.tipo_curso,
      schoolId: currentCourse.school_id,
      escuela: currentCourse?.escuela?.name,
      maestro: currentCourse.maestro,
      fecha_inicio: currentCourse.fecha_inicio,
      costo: currentCourse.costo,
      montoAPagar: montoAPagar, // El monto dinámico calculado por tu slider (40% - 100%)
    };

    // Obtenemos el ID de Stripe Connect de la escuela actual
    const stripeAccountId = currentCourse?.escuela?.stripe_account_id;

    // 🔥 Llamamos al helper reutilizable
    const result = await initiateStripeCheckout(checkoutData, stripeAccountId);

    if (!result.success) {
      setIsProcessing(false);
      setErrorMessage(result.error); // Pintamos el error en el modal si falla
    }
    // Si es exitoso, la app redirige automáticamente fuera de tu sitio hacia Stripe
  };
  const handleCloseModal = (event, reason) => {
    if (
      isProcessing &&
      (reason === "backdropClick" || reason === "escapeKeyDown")
    ) {
      return; // Ignora el intento de cierre
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      disableEscapeKeyDown={isProcessing}
      maxWidth='sm'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "12px", // Consistencia estricta con el diseño plano
            border: "1px solid",
            borderColor: "rgba(237, 201, 208, 0.6)",
            bgcolor: "background.paper",
            p: 2,
          },
        },
      }}
    >
      {/* Encabezado del Modal */}
      <DialogTitle
        component='div'
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant='h3'
          component='h2'
          sx={{
            fontSize: "1.4rem",
            fontWeight: 900,
            color: "primary.main",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Asegurar mi Lugar
        </Typography>
        {!isProcessing && (
          <IconButton onClick={onClose} sx={{ color: "primary.main" }}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers={false} sx={{ p: 2 }}>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mb: 4, lineHeight: 1.6 }}
        >
          Estás por inscribirte al programa{" "}
          <strong>{currentCourse?.titulo || "Seleccionado"}</strong>. <br />{" "}
          Completa los datos solicitados y define el monto de tu pago inicial.
        </Typography>

        <Box component='form' onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Campo: Nombre Completo */}
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
                  sx: { borderRadius: "12px" },
                },
              }}
            />

            {/* Campo: WhatsApp */}
            <TextField
              required
              fullWidth
              disabled={isProcessing}
              label='Teléfono (Preferentemente WhatsApp)'
              name='phone'
              type='tel'
              onChange={handleChange}
              variant='outlined'
              autoComplete='off'
              slotProps={{
                input: {
                  sx: { borderRadius: "12px" },
                },
              }}
            />

            {/* Campo: Correo Electrónico (Opcional) */}
            <TextField
              fullWidth
              label='Correo Electrónico'
              name='email'
              type='email'
              disabled={isProcessing}
              autoComplete='off'
              onChange={handleChange}
              variant='outlined'
              required
              slotProps={{
                input: {
                  sx: { borderRadius: "12px" },
                },
              }}
              helperText='Lo usaremos para respaldar tus comprobantes de pago.'
            />

            {/* ---- CONTROL DE PAGO PERSONALIZADO DE INSCRIPCIÓN ---- */}
            <Box
              sx={{
                mt: 2,
                p: 3,
                bgcolor: "background.default",
                borderRadius: "12px",
                border: "1px solid rgba(186, 137, 146, 0.15)",
                opacity: isProcessing ? 0.6 : 1,
                pointerEvents: isProcessing ? "none" : "auto", // Bloquea interacción del slider
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                ¿Cuánto deseas abonar hoy?
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
                sx={{ mb: 3 }}
              >
                Puedes apartar tu lugar desde el 30% del costo total del
                programa.
              </Typography>

              {/* Slider Plano de Selección */}
              <Slider
                value={porcentaje}
                min={30}
                max={100}
                step={5}
                onChange={(e, newValue) => setPorcentaje(newValue)}
                valueLabelDisplay='auto'
                valueLabelFormat={(value) => `${value}%`}
                sx={{
                  color: "secondary.main",
                  height: 6,
                  "& .MuiSlider-thumb": {
                    borderRadius: 0,
                    width: 14,
                    height: 14,
                    backgroundColor: "primary.main",
                  },
                  "& .MuiSlider-track": { borderRadius: 0 },
                  "& .MuiSlider-rail": { borderRadius: 0 },
                }}
              />

              {/* Desglose Informativo del Cobro */}
              <Stack
                direction='row'
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 3,
                  pt: 2,
                  borderTop: "1px dashed rgba(186, 137, 146, 0.25)",
                }}
              >
                <Box>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    display='block'
                  >
                    Total Inscripción: ${totalInscripcion} MXN
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ fontWeight: 800, color: "primary.main" }}
                  >
                    Monto a pagar ({porcentaje}%):
                  </Typography>
                </Box>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 900, color: "secondary.main" }}
                >
                  $
                  {montoAPagar.toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  MXN
                </Typography>
              </Stack>
            </Box>

            {/* Botón de Envío Directo a Stripe Checkout */}
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              size='large'
              disabled={isProcessing} // 👈 Atributo HTML de deshabilitado
              endIcon={isProcessing ? null : <ArrowForwardIcon />}
              startIcon={isProcessing ? <LockIcon /> : null}
              sx={{
                width: "100%",
                color: "primary.main",
                bgcolor: "secondary.main",
                fontWeight: 800,
                py: 2,
                borderRadius: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "secondary.dark",
                  color: "#FFFFFF",
                  boxShadow: "none",
                },
              }}
            >
              {isProcessing ? (
                <Stack direction='row' alignItems='center' spacing={2}>
                  <CircularProgress size={18} color='inherit' />
                  <Typography
                    variant='button'
                    sx={{ fontWeight: 800, letterSpacing: "1px" }}
                  >
                    Redirigiendo a Pasarela Segura...
                  </Typography>
                </Stack>
              ) : (
                "Proceder al Pago Seguro"
              )}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InscripcionModal;
