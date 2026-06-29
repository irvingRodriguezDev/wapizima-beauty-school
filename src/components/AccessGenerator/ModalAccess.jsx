import React from "react";
// Importación estricta de Grid2 de Material UI
import { Grid, IconButton, Modal, Typography, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarsIcon from "@mui/icons-material/Stars"; // Ícono sutil para el toque de alta gama
import { QRCodeSVG } from "qrcode.react";

const ModalAccess = ({ open, handleClose, COLORS, enrollment }) => {
  // Colores locales premium basados en tus tonos rosa establecidos
  const PINK_BRAND = "#DF228A";
  const SOFT_PINK_BG = "rgba(223, 34, 138, 0.03)";
  const TEXT_DARK = "#2A2628";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backdropFilter: "blur(8px)", // Desenfoque de fondo premium para centrar atención
      }}
    >
      <Grid
        container
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "36px",
          maxWidth: "400px",
          width: "100%",
          p: { xs: 4, sm: 5 },
          boxShadow: "0px 32px 80px rgba(223, 34, 138, 0.08)",
          outline: "none",
          position: "relative",
          textAlign: "center",
          border: "1px solid rgba(223, 34, 138, 0.12)",
          // Fondo decorativo con líneas radiales sutiles de la marca
          backgroundImage: `radial-gradient(circle at 50% -20%, rgba(223, 34, 138, 0.05) 0%, transparent 60%)`,
        }}
      >
        {/* Botón de cierre minimalist */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "#8A8487",
            backgroundColor: "#FAFAFA",
            "&:hover": {
              backgroundColor: "rgba(223, 34, 138, 0.05)",
              color: PINK_BRAND,
            },
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>

        {/* ENCABEZADO EDITORIAL */}
        <Grid size={12} sx={{ mt: 1, mb: 3 }}>
          <Typography
            variant='h4'
            component='h2'
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: TEXT_DARK,
              fontSize: "2.1rem",
              mb: 0.5,
            }}
          >
            Pase a Clase
          </Typography>

          <Typography
            variant='subtitle1'
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              color: TEXT_DARK,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              fontSize: "0.95rem",
              mb: 1.5,
            }}
          >
            {enrollment?.studentName || "Nombre Alumna"}
          </Typography>

          {/* Divisor estético elegante */}
          <Stack
            direction='row'
            spacing={1}
            sx={{ my: 1.5, justifyContent: "center", alignItems: "center" }}
          >
            <Grid
              sx={{
                width: "30px",
                height: "1px",
                backgroundColor: "rgba(223, 34, 138, 0.2)",
              }}
            />
            <StarsIcon
              sx={{ color: PINK_BRAND, fontSize: "1rem", opacity: 0.6 }}
            />
            <Grid
              sx={{
                width: "30px",
                height: "1px",
                backgroundColor: "rgba(223, 34, 138, 0.2)",
              }}
            />
          </Stack>

          {/* DETALLES DEL CURSO */}
          <Typography
            variant='body1'
            sx={{
              color: PINK_BRAND,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              lineHeight: 1.4,
            }}
          >
            {enrollment?.courseName}
          </Typography>

          <Typography
            variant='caption'
            sx={{
              color: "#655F62",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              display: "block",
              mt: 0.5,
            }}
          >
            Fecha: <strong>{enrollment?.fechaCurso}</strong>
          </Typography>
        </Grid>

        {/* CONTENEDOR DEL CÓDIGO QR ENMARCADO */}
        <Grid
          size={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            backgroundColor: SOFT_PINK_BG,
            border: "1px solid rgba(223, 34, 138, 0.08)",
            borderRadius: "28px",
            mb: 4,
            boxShadow: "inset 0px 4px 12px rgba(223, 34, 138, 0.01)",
            position: "relative",
          }}
        >
          {enrollment?.qr_code_token ? (
            <Grid
              sx={{
                p: 1.5,
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.04)",
              }}
            >
              <QRCodeSVG
                value={enrollment.qr_code_token}
                size={200}
                fgColor={TEXT_DARK}
                level='H' // Resiliencia de escaneo máxima ante pantallas oscuras
                includeMargin={false}
              />
            </Grid>
          ) : (
            <Typography variant='caption' sx={{ color: "#655F62" }}>
              Generando pase seguro...
            </Typography>
          )}
        </Grid>

        {/* PIE DE PÁGINA / REGLA DE TAQUILLA */}
        <Grid size={12}>
          <Typography
            variant='caption'
            sx={{
              color: TEXT_DARK,
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.75rem",
              opacity: 0.9,
            }}
          >
            Muestra este código al encargado en el salón
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalAccess;
