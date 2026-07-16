import React, { useState } from "react";
import { Box, IconButton, Typography, Avatar, Fade, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

const CustomWhatsApp = ({ phone, name, logo, bottom = 40 }) => {
  const [open, setOpen] = useState(false);

  // Mensaje dinámico enfocado puramente en la resolución de dudas
  const defaultMessage = `Hola, tengo una duda sobre el proceso de inscripcion a los talleres/cursos. ¿Me podrían apoyar?`;

  const handleSend = () => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  // Horario de atención: Lunes a Sábado, 9:00 AM a 5:00 PM
  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Lunes...
  const hour = now.getHours();

  const isWorkingDay = day >= 1 && day <= 6;
  const isWorkingHour = hour >= 9 && hour < 17;
  const isOpen = isWorkingDay && isWorkingHour;

  return (
    <>
      {/* 🔘 BOTÓN FLOTANTE PRINCIPAL */}
      <Box
        sx={{
          position: "fixed",
          bottom: bottom,
          right: { xs: 16, sm: 24 },
          zIndex: 9999,
        }}
      >
        {/* Onda de pulso premium (sutil y minimalista) */}
        <Box
          sx={{
            position: "absolute",
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "rgba(13, 236, 61, 0.72)",
            animation: "pulse 2.5s infinite ease-out",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.9 },
              "70%": { transform: "scale(1.5)", opacity: 0 },
              "100%": { opacity: 0 },
            },
          }}
        />

        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            width: 56,
            height: 56,
            background: open
              ? "linear-gradient(135deg, #0ed442 0%, #40db10 100%)"
              : "linear-gradient(135deg, #0ed442 0%, #40db10 100%)", // Verde esmeralda de lujo
            color: "#fff",
            boxShadow: open
              ? "0px 12px 24px rgba(0, 0, 0, 0.15)"
              : "0px 12px 28px rgba(13, 92, 70, 0.25)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            "&:hover": {
              transform: "scale(1.05) translateY(-2px)",
              boxShadow: open
                ? "0px 16px 30px rgba(0, 0, 0, 0.2)"
                : "0px 16px 30px rgba(13, 92, 70, 0.35)",
            },
          }}
        >
          {open ? (
            <CloseRoundedIcon sx={{ fontSize: 24 }} />
          ) : (
            <WhatsAppIcon sx={{ fontSize: 26 }} />
          )}
        </IconButton>
      </Box>

      {/* 💬 POPUP PREMIUM DE DUDAS */}
      <Fade in={open}>
        <Box
          sx={{
            position: "fixed",
            bottom: bottom + 76,
            right: { xs: 16, sm: 24 },
            width: { xs: "calc(100vw - 32px)", sm: 340 }, // 100% responsivo en móviles con márgenes consistentes
            maxWidth: 340,
            borderRadius: "24px",
            overflow: "hidden",
            zIndex: 9999,
            backdropFilter: "blur(20px)",
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.88))",
            boxShadow:
              "0 24px 60px rgba(42, 38, 40, 0.08), 0 8px 16px rgba(0, 0, 0, 0.02)",
            border: "1px solid rgba(229, 56, 136, 0.12)", // Línea rosa Wapizima ultra sutil
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER (Look Mesa de Ayuda) */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #121212 0%, #202020 100%)", // Fondo oscuro premium para contraste elegante
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "#fff",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <Avatar
                src={logo}
                alt={name}
                sx={{
                  width: 44,
                  height: 44,
                  border: "1.5px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <QuestionAnswerOutlinedIcon
                  sx={{ fontSize: 20, color: "#f06292" }}
                />
              </Avatar>

              {/* Punto de estado activo */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 1,
                  right: 1,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: isOpen ? "#10B981" : "#EF4444", // Indicadores limpios
                  border: "2px solid #121212",
                }}
              />
            </Box>

            {/* Contenedor de Textos con bloqueo de desbordamiento */}
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textTransform: "uppercase",
                  color: "#ff6fa5", // Acento rosa característico
                  mb: 0.2,
                }}
              >
                {name}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Ayuda via whatsapp
              </Typography>
            </Box>
          </Box>

          {/* BODY */}
          <Box
            sx={{
              p: 3,
              bgcolor: "rgba(253, 242, 245, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {/* Burbuja del agente */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 2,
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                border: "1px solid rgba(229, 56, 136, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#2A2628",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Hola de Wapizima 👋🏻
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#6B6567",
                  lineHeight: 1.5,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                ¿Tienes alguna **duda académica, de costos o inscripciones**?
                Escríbenos directamente para asesorarte de inmediato de manera
                personalizada.
              </Typography>
            </Box>

            {/* Separador elegante para indicar canal oficial de dudas */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "1px",
                  bgcolor: "rgba(229, 56, 136, 0.08)",
                  flex: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  color: "#A0AEC0",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Canal de dudas generales
              </Typography>
              <Box
                sx={{
                  height: "1px",
                  bgcolor: "rgba(229, 56, 136, 0.08)",
                  flex: 1,
                }}
              />
            </Box>

            {/* BOTÓN DE ACCIÓN ACCESIBLE */}
            <Zoom in={open}>
              <Box
                onClick={handleSend}
                sx={{
                  background: isOpen
                    ? "linear-gradient(135deg, #0D5C46 0%, #083D2E 100%)"
                    : "linear-gradient(135deg, #A0AEC0 0%, #718096 100%)",
                  pointerEvents: isOpen ? "auto" : "none",
                  opacity: isOpen ? 1 : 0.75,
                  color: "#fff",
                  textAlign: "center",
                  py: 1.5,
                  borderRadius: "12px", // Bordes más cuadrados y sobrios que lucen sofisticados
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  fontFamily: "'Montserrat', sans-serif",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isOpen
                    ? "0px 6px 20px rgba(13, 92, 70, 0.2)"
                    : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: isOpen
                      ? "0px 10px 24px rgba(13, 92, 70, 0.3)"
                      : "none",
                  },
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 18 }} />
                {isOpen ? "Iniciar Consulta" : "Fuera de Servicio"}
              </Box>
            </Zoom>

            {/* HORARIO PIE DE PÁGINA */}
            <Typography
              sx={{
                fontSize: "0.68rem",
                textAlign: "center",
                color: "#718096",
                fontWeight: 500,
              }}
            >
              Atención de Lunes a viernes — 9:00 AM a 5:00 PM <br /> Atencion
              Sabados — 12:00 PM a 5:00 PM
            </Typography>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default CustomWhatsApp;
