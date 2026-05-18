import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPrincipal from "./pages/LandingPrincipal";
import PlantelDetailPage from "./pages/PlantelDetail";
import QuienesSomos from "./pages/QuienesSomos";
import FranquiciasSection from "./pages/Franquicias";

function App() {
  const navigate = useNavigate();

  // Esta función se ejecutará cuando den clic en "Ver Academia y Cursos"
  const handleSelectSchool = (school) => {
    // Si tu tabla de Supabase tiene un campo "slug" (ej. "plantel-toluca") lo usas, si no, usamos el id.
    const schoolIdentifier = school.slug || school.id;
    navigate(`/plantel/${schoolIdentifier}`);
  };

  return (
    <Routes>
      {/* Ruta Principal: Home + Beneficios + Listado Geolocalizado */}
      <Route
        path='/'
        element={<LandingPrincipal onSelectSchool={handleSelectSchool} />}
      />

      {/* Ruta Dinámica: Landing Page de la Escuela Seleccionada */}
      <Route path='/plantel/:slug' element={<PlantelDetailPage />} />
      <Route path='/nosotros' element={<QuienesSomos />} />
      <Route path='/franquicias' element={<FranquiciasSection />} />
      {/* Ruta de escape por si escriben cualquier otra cosa (404) */}
      <Route
        path='*'
        element={
          <div
            style={{
              padding: "4rem",
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            <h2>404 - Ruta no encontrada</h2>
            <p>Regresa al inicio de Wapizima Beauty School.</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
