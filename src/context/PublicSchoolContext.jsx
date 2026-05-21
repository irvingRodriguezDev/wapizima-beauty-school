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
  const fetchPublicSchoolData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Buscamos la escuela por su slug
      const { data: schoolData, error: schoolErr } = await supabase
        .from("schools")
        .select("id, name, address")
        .eq("slug", slug)
        .single();

      if (schoolErr) throw schoolErr;

      if (schoolData) {
        setSchool(schoolData);

        // 2. Traemos sus cursos y talleres activos vinculados a su ID real
        const { data: coursesData, error: coursesErr } = await supabase
          .from("cursos")
          .select(
            "id, titulo, descripcion, costo, maestro,tipo_curso, flayer_url, lista_materiales, fecha_inicio, fecha_fin, created_at, hora_inicio, hora_fin, slug",
          )
          .eq("school_id", schoolData.id)
          .eq("status", "active")
          .order("created_at", { ascending: false });

        if (coursesErr) throw coursesErr;
        setCourses(coursesData || []);
      }
    } catch (err) {
      console.error("Error cargando la academia pública:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);
  // Agrega esta función dentro del proveedor para consultar un curso por su slug
  const fetchCourseDetailBySlug = useCallback(async (courseSlug) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: courseErr } = await supabase
        .from("cursos")
        .select(
          "id, titulo, descripcion, costo, maestro,tipo_curso, flayer_url, lista_materiales, fecha_inicio, fecha_fin, created_at, hora_inicio, hora_fin, video_presentacion_url, slug",
        )
        .eq("slug", courseSlug)
        .single();

      if (courseErr) throw courseErr;
      setCurrentCourse(data);
    } catch (err) {
      console.error("Error cargando detalle del curso:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicSchoolData();
  }, [fetchPublicSchoolData]);

  return (
    <PublicSchoolContext.Provider
      value={{
        school,
        courses,
        currentCourse,
        fetchCourseDetailBySlug,
        loading,
        error,
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
