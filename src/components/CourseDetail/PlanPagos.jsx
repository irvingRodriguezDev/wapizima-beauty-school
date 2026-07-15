import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FormatCurrency } from "../../utils/FormatCurrency";
const PlanPagos = ({ currentCourse, costoTotalCalculado, planPagos }) => {
  return (
    <Paper
      elevation={0}
      variant='outlined'
      sx={{
        p: 3,
        borderRadius: "25px",
        borderColor: "rgba(240, 98, 146, 0.3)",
        position: "sticky",
        top: "24px",
        bgcolor: "#fffdfd",
      }}
    >
      <Typography
        variant='h6'
        fontWeight='bold'
        color='#d81b60'
        gutterBottom
        align='center'
      >
        Información de Inscripción
      </Typography>

      <Divider sx={{ my: 2, bgcolor: "#fdf2f5" }} />

      {/* Datos Rápidos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <CalendarTodayIcon sx={{ color: "#f06292" }} />
          <Typography variant='body2' color='text.secondary'>
            <strong>Inicia:</strong>{" "}
            {currentCourse.fecha_inicio || "Por definir"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ScheduleIcon sx={{ color: "#f06292" }} />
          <Typography variant='body2' color='text.secondary'>
            <strong>Horario:</strong> {currentCourse.hora_inicio} a{" "}
            {currentCourse.hora_fin}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AttachMoneyIcon sx={{ color: "#f06292" }} />
          <Typography variant='body2' color='text.secondary'>
            <strong>Inversión Total:</strong>
            {FormatCurrency(Number(costoTotalCalculado))} MXN
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, bgcolor: "#fdf2f5" }} />

      {/* Plan de Pagos Detallado */}
      <Typography
        variant='subtitle2'
        fontWeight='bold'
        color='#d81b60'
        sx={{ mb: 1.5 }}
      >
        Esquema de Pagos Cómodos
      </Typography>

      {planPagos.length === 0 ? (
        <Typography variant='caption' color='text.secondary'>
          Contacta a la escuela para conocer los planes de pago disponibles.
        </Typography>
      ) : (
        <TableContainer
          component={Box}
          sx={{ maxHeight: "auto", overflowY: "hidden" }}
        >
          <Table size='small'>
            <TableHead>
              <TableRow
                sx={{
                  "& th": { borderBottom: "1.5px solid #f06292" },
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#d81b60",
                    pl: 0,
                  }}
                >
                  Concepto
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    fontWeight: "bold",
                    color: "#d81b60",
                    pr: 0,
                  }}
                >
                  Monto
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planPagos.map((pago, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  <TableCell sx={{ pl: 0, py: 1 }}>
                    <Typography variant='body2' fontWeight='500'>
                      {pago.concepto}
                    </Typography>
                    {pago.observacion && (
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        display='block'
                      >
                        {pago.observacion}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      pr: 0,
                      fontWeight: "600",
                      color: "#d81b60",
                    }}
                  >
                    {FormatCurrency(parseFloat(pago.monto || 0))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          bgcolor: "#fdf2f5",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Typography variant='caption' color='#d81b60' fontWeight='bold'>
          ¡Puedes apartar tu lugar hoy mismo desde{" "}
          {FormatCurrency(Number(planPagos[0]?.monto))} pesos!
        </Typography>
      </Box>
    </Paper>
  );
};

export default PlanPagos;
