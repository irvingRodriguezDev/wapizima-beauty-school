import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
const Search = ({ search, setSearch, titulo }) => {
  return (
    <Grid container spacing={2} sx={{ padding: "12px" }}>
      <Grid size={12}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: "4px",
            color: "#E1208C",
          }}
        >
          {titulo}
        </Typography>
        <TextField
          variant='outlined'
          fullWidth
          type='text'
          placeholder='Ej: Ciudad de México'
          autoComplete='off'
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              endAdornment: <SearchOutlinedIcon />,
            },
          }}
          sx={inputStyles}
        />
      </Grid>
    </Grid>
  );
};

export default Search;
