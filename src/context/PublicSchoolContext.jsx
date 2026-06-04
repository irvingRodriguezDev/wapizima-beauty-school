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
        // 1. Obtener la fecha de hoy en formato YYYY-MM-DD (Hora de México)
        const hoy = new Date().toLocaleDateString("sv-SE", {
          timeZone: "America/Mexico_City",
        });

        const { data: coursesData, error: coursesErr } = await supabase
          .from("cursos")
          .select(
            `
    id, 
    titulo, 
    descripcion, 
    costo, 
    maestro, 
    tipo_curso,
    flayer_url, 
    lista_materiales, 
    fecha_inicio, 
    fecha_fin, 
    created_at, 
    hora_inicio,
    hora_fin, 
    slug,
    salon_id,
    enrollments(count),
    salon:salones ( capacidad ) 
  `,
          ) // 🌟 LA MAGIA: Le decimos que use 'salon_id' para traer la relación y lo nombre como 'salon'
          .eq("school_id", schoolData.id)
          .gte("fecha_inicio", hoy)
          .order("created_at", { ascending: false });

        if (coursesErr) {
          console.error(
            "❌ Error de Supabase al buscar los cursos:",
            coursesErr,
          );
          throw coursesErr;
        }
        // 1. Inyectamos la propiedad 'lugares_disponibles' calculada en cada objeto
        const cursosConDisponibilidad = (coursesData || []).map((curso) => {
          // Validamos el conteo de inscritos de forma segura
          const inscritos = Array.isArray(curso.enrollments)
            ? curso.enrollments[0]?.count || 0
            : curso.enrollments?.count || 0;

          // Obtenemos la capacidad total del salón asignado
          const cupoMaximo = curso.salon?.capacidad || 0;

          // Calculamos la diferencia real
          const lugaresDisponibles = cupoMaximo - inscritos;

          // Retornamos el objeto clonado agregando la nueva propiedad para usar en UI
          return {
            ...curso,
            lugares_disponibles: lugaresDisponibles, // 👈 ¡Aquí nace tu nueva variable!
            total_inscritos: inscritos, // Opcional por si quieres poner "X alumnas inscritas"
          };
        });

        // 2. Filtramos para dejar únicamente los que tengan más de 0 lugares libres
        const cursosVisibles = cursosConDisponibilidad.filter(
          (curso) => curso.lugares_disponibles > 0,
        );

        // Guardamos el resultado en el estado
        setCourses(cursosVisibles);
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
      const { data, error: courseErr } = await supabase
        .from("cursos")
        .select(
          `id, titulo, descripcion, costo, maestro, tipo_curso, flayer_url, lista_materiales, fecha_inicio, school_id,
          fecha_fin, created_at, hora_inicio, hora_fin, video_presentacion_url, slug, escuela:schools(stripe_account_id, name)`,
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
