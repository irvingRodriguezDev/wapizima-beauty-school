import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPrincipal from "./pages/LandingPrincipal";
import QuienesSomos from "./pages/QuienesSomos";
import FranquiciasSection from "./pages/Franquicias";
import CourseDetailPage from "./pages/CourseDetailPage";
import PlantelDetailPage from "./pages/PlantelDetail";
import PagoExitoso from "./pages/PagoExitoso";
import InscripcionCancelada from "./pages/InscripcionCancelada";
import NotFound from "./pages/NotFound";
import AccessGenerator from "./pages/AccessGenerator";

function App() {
  const navigate = useNavigate();

  // Esta función se ejecutará cuando den clic en "Ver Academia y Cursos"
  const handleSelectSchool = (school) => {
    // Si tu tabla de Supabase tiene un campo "slug" (ej. "plantel-toluca") lo usas, si no, usamos el id.
    const schoolIdentifier = school.slug || school.id;
    navigate(`/academia/${schoolIdentifier}`);
  };

  return (
    <Routes>
      {/* Ruta Principal: Home + Beneficios + Listado Geolocalizado */}
      <Route
        path='/'
        element={<LandingPrincipal onSelectSchool={handleSelectSchool} />}
      />

      {/* Ruta Dinámica: Landing Page de la Escuela Seleccionada */}
      <Route path='/academia/:slug' element={<PlantelDetailPage />} />
      <Route path='/curso/:courseSlug' element={<CourseDetailPage />} />
      <Route path='/nosotros' element={<QuienesSomos />} />
      <Route path='/franquicias' element={<FranquiciasSection />} />
      <Route path='/pago-exitoso' element={<PagoExitoso />} />
      <Route path='/inscripcion-cancelada' element={<InscripcionCancelada />} />
      <Route path='/generador-accesos' element={<AccessGenerator />} />
      {/* Ruta de escape por si escriben cualquier otra cosa (404) */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
