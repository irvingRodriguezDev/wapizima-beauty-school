import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "npm:stripe@14.22.0"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      name,
      phone,
      email,
      cursoId,
      schoolId,
      montoAPagar,
      curso,
      tipo_curso,
      maestro,
      fecha_inicio,
      costo,
      escuela
    } = await req.json()

    const tipo = tipo_curso === "Curso" ? "Curso" : "Taller";

    // 🌟 PASO 0: VERIFICACIÓN DE LA ESCUELA Y TIPO DE NEGOCIO 🌟
    const { data: schoolData, error: schoolErr } = await supabase
      .from("schools")
      .select("id, name, is_franchise, stripe_account_id")
      .eq("id", schoolId)
      .single();

    if (schoolErr || !schoolData) {
      throw new Error("No se encontró la información del centro de capacitación.");
    }

    const isFranchise = Boolean(schoolData.is_franchise);
    const connectedAccountId = schoolData.stripe_account_id;

    if (isFranchise && !connectedAccountId) {
      throw new Error("Esta franquicia aún no ha configurado su cuenta para recibir pagos.");
    }

    // 🌟 PASO 1: VALIDACIÓN DE LUGARES DISPONIBLES EN TIEMPO REAL 🌟
    const { data: cursoData, error: dbErr } = await supabase
      .from("cursos")
      .select(`
        id,
        titulo,
        enrollments(count),
        salon:salones(capacidad)
      `)
      .eq("id", cursoId)
      .single();

    if (dbErr || !cursoData) {
      throw new Error("No se pudo verificar la información del curso.");
    }

    const inscritos = Array.isArray(cursoData.enrollments)
      ? (cursoData.enrollments[0]?.count || 0)
      : (cursoData.enrollments?.count || 0);

    const cupoMaximo = cursoData.salon?.capacidad || 0;
    const lugaresDisponibles = cupoMaximo - inscritos;

    if (lugaresDisponibles <= 0) {
      return new Response(
        JSON.stringify({ 
          error: "Lo sentimos, ya no quedan lugares disponibles para este curso o taller." 
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 422,
        }
      );
    }

    const idempotencyKey = crypto.randomUUID();
    let customerId: string;

    // 🌟 PASO 2: BÚSQUEDA O CREACIÓN DEL CLIENTE EN STRIPE 🌟
    if (isFranchise && connectedAccountId) {
      // --- FLUJO FRANQUICIA (Cuenta Conectada) ---
      const customers = await stripe.customers.list(
        { email: email, limit: 1 },
        { stripeAccount: connectedAccountId }
      );

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create(
          {
            name: name,
            email: email,
            phone: phone,
            metadata: {
              plataforma_origen: "WBS",
              escuela: escuela?.toString() || schoolData.name || '',
              school_id: schoolId.toString(),
              is_franchise: "true"
            }
          },
          { stripeAccount: connectedAccountId }
        );
        customerId = customer.id;
      }
    } else {
      // --- FLUJO SEDE PROPIA (Cuenta Directa / Nativa) ---
      const customers = await stripe.customers.list({ email: email, limit: 1 });

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          name: name,
          email: email,
          phone: phone,
          metadata: {
            plataforma_origen: "WBS",
            escuela: escuela?.toString() || schoolData.name || '',
            school_id: schoolId.toString(),
            is_franchise: "false"
          }
        });
        customerId = customer.id;
      }
    }

    // 🌟 PASO 3: GENERACIÓN DE LA SESIÓN DE CHECKOUT 🌟
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: { 
            name: `Inscripción al ${tipo} de ${curso} con ${maestro} el día ${fecha_inicio}` 
          },
          unit_amount: Math.round(montoAPagar * 100),
        },
        quantity: 1,
      }],
      metadata: {
        name: name,
        phone: phone,
        email: email || '',
        cursoId: cursoId.toString(),
        schoolId: schoolId.toString(),
        montoPuro: montoAPagar.toString(),
        costo_curso: costo?.toString() || '',
        tipo_curso: tipo_curso?.toString() || '',
        is_franchise: isFranchise ? "true" : "false"
      },
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/pago-exitoso`,
      cancel_url: `${req.headers.get('origin')}/inscripcion-cancelada`,
    };

    const session = (isFranchise && connectedAccountId)
      ? await stripe.checkout.sessions.create(sessionParams, { idempotencyKey, stripeAccount: connectedAccountId })
      : await stripe.checkout.sessions.create(sessionParams, { idempotencyKey });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
})