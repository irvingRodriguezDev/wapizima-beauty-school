import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Box,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { initiateStripeCheckout } from "../../utils/StripeHelper";
import InscriptionForm from "./InscriptionForm";

const InscripcionModal = ({ open, onClose, currentCourse }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sanitización de estructuras seguras para calcular el costo real
  const planPagos = Array.isArray(currentCourse?.plan_pagos)
    ? currentCourse.plan_pagos
    : [];
  const costoTotalCalculado = planPagos.reduce(
    (acc, curr) => acc + (curr.monto || 0),
    0,
  );

  const handleSubmitInscription = async (formValues) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setErrorMessage("");

    const checkoutData = {
      name: formValues.name,
      phone: formValues.phone,
      email: formValues.email || null,
      cursoId: currentCourse.id,
      curso: currentCourse.titulo,
      tipo_curso: currentCourse.tipo_curso,
      schoolId: currentCourse.school_id,
      escuela: currentCourse?.escuela?.name,
      maestro: currentCourse.maestro,
      fecha_inicio: currentCourse.fecha_inicio,
      // Usamos el costo calculado dinámicamente como prioridad
      costo: costoTotalCalculado || currentCourse.costo,
      montoAPagar: formValues.montoAPagar,
    };

    const stripeAccountId = currentCourse?.escuela?.stripe_account_id;
    const result = await initiateStripeCheckout(checkoutData, stripeAccountId);

    if (!result.success) {
      setIsProcessing(false);
      setErrorMessage(result.error);
    }
  };

  const handleCloseModal = (event, reason) => {
    // Bloquear cierre accidental si se está procesando el cobro en Stripe
    if (
      isProcessing &&
      (reason === "backdropClick" || reason === "escapeKeyDown")
    ) {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      maxWidth='md'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "32px",
            border: "1px solid rgba(240, 98, 146, 0.15)", // Rosa muy sutil para encajar con Wapizima
            backgroundColor: "#FFFFFF",
            p: { xs: 1, sm: 2 },
            boxShadow: "0px 32px 64px rgba(233, 30, 99, 0.06)", // Sombra premium con tinte rosa
            position: "relative",
            overflowY: "hidden",
          },
        },
      }}
    >
      {/* Barra de progreso superior durante el procesamiento */}
      {isProcessing && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: "#fdf2f5",
            "& .MuiLinearProgress-bar": { bgcolor: "#f06292" },
          }}
        />
      )}

      <DialogTitle
        component='div'
        sx={{
          m: 0,
          px: 3,
          pt: 3,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant='h6'
            component='h2'
            sx={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#2A2628",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Asegura tu lugar
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: "#f06292",
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Proceso de Inscripción Segura
          </Typography>
        </Box>

        {!isProcessing && (
          <IconButton
            onClick={onClose}
            sx={{
              color: "#554D4F",
              bgcolor: "rgba(0, 0, 0, 0.03)",
              "&:hover": {
                color: "#f06292",
                bgcolor: "#fdf2f5",
              },
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1, border: "none" }}>
        <Typography
          variant='body2'
          sx={{
            mb: 3,
            lineHeight: 1.6,
            color: "#6B6567",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.92rem",
          }}
        >
          Estás a un paso de comenzar tu formación profesional en{" "}
          <strong
            style={{
              color: "#2A2628",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
            }}
          >
            {currentCourse?.titulo || "el curso seleccionado"} el dia{" "}
            {currentCourse.fecha_inicio}.
          </strong>
          <br />
          Escribe tus datos de acreditación a continuación y elige cómo deseas
          inscribirte. Puedes reservar con un pago parcial o liquidar el monto
          total.
        </Typography>

        {/* FEEDBACK DE ERROR OPTIMIZADO Y EDITORIAL */}
        {errorMessage && (
          <Grid
            container
            alignItems='center'
            spacing={1}
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "rgba(211, 47, 47, 0.02)",
              border: "1px solid rgba(211, 47, 47, 0.15)",
              borderRadius: "16px",
            }}
          >
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <ErrorOutlineOutlinedIcon
                sx={{ color: "#d32f2f", fontSize: "1.2rem" }}
              />
            </Grid>
            <Grid item xs>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: "#d32f2f",
                  fontSize: "0.85rem",
                }}
              >
                {errorMessage}
              </Typography>
            </Grid>
          </Grid>
        )}

        <Box
          sx={{
            opacity: isProcessing ? 0.6 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <InscriptionForm
            currentCourse={currentCourse}
            isProcessing={isProcessing}
            onSubmit={handleSubmitInscription}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InscripcionModal;
