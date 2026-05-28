import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../config/supabaseClient";

const PublicSchoolContext = createContext(null);

export const PublicSchoolProvider = ({ slug, children }) => {
  const [school, setSchool] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  const fetchPublicSchoolData = useCallback(
    async (slug) => {
      // Si el slug no viene listo desde los params de la ruta, evitamos lanzar la petición
      if (!slug) {
        console.warn(
          "⚠️ PublicSchoolProvider: El 'slug' recibido es undefined o vacío.",
        );
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Buscamos la escuela por su slug
        const { data: schoolData, error: schoolErr } = await supabase
          .from("schools")
          .select("id, name, address")
          .eq("slug", slug)
          .maybeSingle(); // Usamos maybeSingle() para evitar que truene rudo si no encuentra concordancia

        if (schoolErr) {
          console.error(
            "❌ Error de Supabase al buscar la escuela:",
            schoolErr,
          );
          throw schoolErr;
        }

        if (!schoolData) {
          setSchool(null);
          setCourses([]);
          return;
        }

        setSchool(schoolData);

        // 2. Traemos sus cursos y talleres vinculados a su ID real
        // NOTA: Revisa si tu columna de estado se llama "active" o si se usa otra nomenclatura
        const { data: coursesData, error: coursesErr } = await supabase
          .from("cursos")
          .select(
            "id, titulo, descripcion, costo, maestro, tipo_curso, flayer_url, lista_materiales, fecha_inicio, fecha_fin, created_at, hora_inicio, hora_fin, slug",
          )
          .eq("school_id", schoolData.id)
          .order("created_at", { ascending: false });

        if (coursesErr) {
          console.error(
            "❌ Error de Supabase al buscar los cursos:",
            coursesErr,
          );
          throw coursesErr;
        }

        setCourses(coursesData || []);
      } catch (err) {
        console.error(
          "💥 Error crítico en el flujo de fetchPublicSchoolData:",
          err.message,
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [slug],
  );

  // Consulta un curso individual por su slug único
  const fetchCourseDetailBySlug = useCallback(async (courseSlug) => {
    if (!courseSlug) return;

    setLoading(true);
    setError(null);
    try {
      console.log(
        `🚀 Buscando detalle del curso individual para el slug: "${courseSlug}"`,
      );

      const { data, error: courseErr } = await supabase
        .from("cursos")
        .select(
          "id, titulo, descripcion, costo, maestro, tipo_curso, flayer_url, lista_materiales, fecha_inicio, fecha_fin, created_at, hora_inicio, hora_fin, video_presentacion_url, slug",
        )
        .eq("slug", courseSlug)
        .maybeSingle();

      if (courseErr) throw courseErr;

      if (!data) {
        console.warn(`🛑 No se encontró curso con el slug: "${courseSlug}"`);
      }

      setCurrentCourse(data);
    } catch (err) {
      console.error("❌ Error cargando detalle del curso:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PublicSchoolContext.Provider
      value={{
        school,
        courses,
        currentCourse,
        fetchCourseDetailBySlug,
        loading,
        error,
        fetchPublicSchoolData,
      }}
    >
      {children}
    </PublicSchoolContext.Provider>
  );
};

export const usePublicSchool = () => {
  const context = useContext(PublicSchoolContext);
  if (!context) {
    throw new Error(
      "usePublicSchool debe usarse dentro de PublicSchoolProvider",
    );
  }
  return context;
};
