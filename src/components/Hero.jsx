import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = ({ onDiscoverLocations }) => {
  return (
    <Container
      maxWidth='2xl'
      sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}
    >
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <Grid container spacing={4} alignItems='center'>
          <Grid size={{ xs: 12, md: 9 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant='caption'
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  color: "#f06292",
                  display: "block",
                  mb: 2,
                }}
              >
                Nuestro camino juntas ✦ Wapizima Beauty School
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant='h2'
                component='h1'
                sx={{
                  fontWeight: 900,
                  color: "#212121",
                  lineHeight: 1.05,
                  fontSize: { xs: "2.6rem", sm: "3.8rem", md: "4.8rem" },
                  letterSpacing: "-1px",
                  mb: 3,
                }}
              >
                MÁS QUE UNA ACADEMIA, <br />
                <Box
                  component='span'
                  sx={{
                    fontStyle: "italic",
                    color: "#f06292",
                    fontFamily: "serif",
                    fontWeight: "400",
                  }}
                >
                  TU FUTURO ÉXITO.
                </Box>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant='body1'
                sx={{
                  color: "#666",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: 700,
                }}
              >
                Hemos diseñado un ecosistema de capacitación intensiva pensado
                exclusivamente para que desarrolles el máximo conocimiento en
                uñas, con los mejores másteres del país y un modelo de negocio
                altamente rentable desde el primer día.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant='contained'
                size='large'
                onClick={onDiscoverLocations}
                endIcon={<LocationOnIcon />}
                sx={{
                  bgcolor: "#d81b60",
                  color: "#fff",
                  px: 4,
                  py: 2,
                  borderRadius: "50px",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1.05rem",
                  boxShadow: "0 10px 25px rgba(216, 27, 96, 0.3)",
                  "&:hover": { bgcolor: "#c2185b" },
                }}
              >
                Encontrar mi plantel cercano
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Hero;
