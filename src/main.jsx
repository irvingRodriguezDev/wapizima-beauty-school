import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme.js";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { PublicSchoolProvider } from "./context/PublicSchoolContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PublicSchoolProvider>
        {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <App />
        {/* </ThemeProvider> */}
      </PublicSchoolProvider>
    </BrowserRouter>
  </StrictMode>,
);
