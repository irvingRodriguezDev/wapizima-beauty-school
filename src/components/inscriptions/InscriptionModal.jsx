import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { initiateStripeCheckout } from "../../utils/StripeHelper";
import InscriptionForm from "./InscriptionForm";

const InscripcionModal = ({ open, onClose, currentCourse }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitInscription = async (formValues) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setErrorMessage("");

    // Construimos el DTO con la data recibida del hijo
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
      costo: currentCourse.costo,
      montoAPagar: formValues.montoAPagar,
    };

    const stripeAccountId = currentCourse?.escuela?.stripe_account_id;

    // Ejecución hacia el checkout de Stripe Connect
    const result = await initiateStripeCheckout(checkoutData, stripeAccountId);

    if (!result.success) {
      setIsProcessing(false);
      setErrorMessage(result.error);
    }
  };

  const handleCloseModal = (event, reason) => {
    // Si está cargando Stripe, bloqueamos el cierre accidental por clicks traseros
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
      disableEscapeKeyDown={isProcessing}
      maxWidth='sm'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "28px", // Esquinas suaves consistentes con el ecosistema visual
            border: "1px solid rgba(244, 114, 182, 0.2)",
            backgroundColor: "#FFFFFF",
            p: { xs: 1.5, sm: 3 },
            boxShadow: "0px 24px 60px rgba(0, 0, 0, 0.15)",
          },
        },
      }}
    >
      {/* Cabecera del Modal */}
      <DialogTitle
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
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "#212121",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "-0.3px",
          }}
        >
          Asegura tu lugar
        </Typography>
        {!isProcessing && (
          <IconButton
            onClick={onClose}
            sx={{ color: "#554D4F", "&:hover": { color: "#E53888" } }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ p: 2, border: "none" }}>
        <Typography
          variant='body2'
          sx={{
            mb: 4,
            lineHeight: 1.6,
            color: "#554D4F",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.92rem",
          }}
        >
          Estás a un paso de comenzar tu formación en{" "}
          <strong
            style={{ color: "#212121", fontFamily: "'Montserrat', sans-serif" }}
          >
            {currentCourse?.titulo || "Seleccionado"}.
          </strong>
          <br />
          Completa tus datos de acreditación y elige cómo deseas inscribirte:
          puedes reservar tu lugar con un anticipo o realizar el pago total de
          tu inscripción.
        </Typography>

        {/* FEEDBACK DE ERROR ELEGANTE */}
        {errorMessage && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "rgba(216, 46, 122, 0.05)",
              border: "1px solid rgba(216, 46, 122, 0.2)",
              borderRadius: "14px",
            }}
          >
            <Typography
              variant='body2'
              color='error'
              sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              {errorMessage}
            </Typography>
          </Box>
        )}

        {/* INYECCIÓN DEL COMPONENTE HIJO LIVIANO */}
        <InscriptionForm
          currentCourse={currentCourse}
          isProcessing={isProcessing}
          onSubmit={handleSubmitInscription}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InscripcionModal;
