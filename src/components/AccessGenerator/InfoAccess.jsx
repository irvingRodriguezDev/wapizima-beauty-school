import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModalAccess from "./ModalAccess";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const InfoAccess = ({ enrollment, COLORS }) => {
  const [openModalAccess, setOpenModalAccess] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const handleClickOpen = (data) => {
    setOpenModalAccess(true);
    setSelectedEnrollment(data);
  };
  return (
    <>
      <Grid
        container
        sx={{
          mt: 3,
          p: 3,
          backgroundColor: "rgba(76, 175, 80, 0.03)",
          borderRadius: "24px",
          border: "1px solid rgba(76, 175, 80, 0.2)",
          alignItems: "center",
        }}
      >
        <Grid
          size={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CheckCircleOutlinedIcon
            sx={{ color: "#4caf50", fontSize: "2.5rem", mb: 1 }}
          />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              color: COLORS.dark,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "1.1rem",
            }}
          >
            ¡Inscripción Confirmada!
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              color: "#4caf50",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "1px",
              mt: 0.5,
            }}
          >
            CUENTA LIQUIDADA
          </Typography>
        </Grid>

        <Grid
          size={12}
          sx={{
            textAlign: "left",
            borderTop: "1px dashed rgba(0,0,0,0.08)",
            pt: 2,
            mb: 3,
          }}
        >
          <Typography
            variant='caption'
            sx={{
              color: "#655F62",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            Taller Próximo
          </Typography>
          <Typography
            variant='body1'
            sx={{
              fontWeight: 700,
              color: COLORS.dark,
              fontFamily: "'Inter', sans-serif",
              mb: 1.5,
            }}
          >
            {enrollment.courseName}
          </Typography>

          <Stack
            direction='row'
            spacing={1}
            sx={{ color: "#655F62", alignItems: "center" }}
          >
            <CalendarMonthIcon sx={{ fontSize: "1.1rem", color: "#DF228A" }} />
            <Typography
              variant='body2'
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Fecha del evento: <strong>{enrollment.fechaCurso}</strong>
            </Typography>
          </Stack>
        </Grid>

        <Grid size={12}>
          <Button
            variant='outlined'
            fullWidth
            onClick={() => handleClickOpen(enrollment)}
            startIcon={<QrCode2Icon />}
            sx={{
              borderRadius: "99px",
              py: 1.5,
              borderColor: "#DF228A",
              color: "#DF228A",
              fontWeight: 700,
              textTransform: "none",
              fontFamily: "'Montserrat', sans-serif",
              "&:hover": {
                backgroundColor: "rgba(233, 30, 99, 0.04)",
                borderColor: "#DF228A",
              },
            }}
          >
            Ver mi Código QR de Entrada
          </Button>
        </Grid>
      </Grid>
      {selectedEnrollment && (
        <ModalAccess
          COLORS={COLORS}
          open={openModalAccess}
          enrollment={selectedEnrollment}
          handleClose={() => setOpenModalAccess(false)}
        />
      )}
    </>
  );
};

export default InfoAccess;
