import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "npm:stripe@14.22.0"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Eliminamos HTTP Client forzado de ESM para usar el nativo de Deno 2
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
    const { name, phone, email, cursoId, schoolId, montoAPagar, stripeAccountId, curso, tipo_curso, maestro, fecha_inicio, costo, escuela } = await req.json()
    const tipo = tipo_curso === "Curso" ? "Curso" : "Taller";
    
    // Llave de idempotencia única basada en la combinación del intento de compra
    const idempotencyKey = btoa(`${schoolId}-${cursoId}-${phone}-${montoAPagar}`);
    
    // 1. Buscar si el cliente ya existe en la cuenta de la escuela
    const customers = await stripe.customers.list({ email: email, limit: 1 }, { stripeAccount: stripeAccountId });
    let customerId;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // 2. Si no existe, lo creamos dentro de la cuenta conectada
      const customer = await stripe.customers.create({
        name: name,
        email: email,
        phone: phone,
        metadata: {
          plataforma_origen: "WBS",
          escuela: escuela?.toString() || '',
        }
      }, {
        stripeAccount: stripeAccountId
      });
      customerId = customer.id;
    }

    // 3. Generamos la sesión de Checkout corriendo DIRECTAMENTE en la cuenta conectada
    const session = await stripe.checkout.sessions.create({
      customer: customerId, // Ahora sí hará match perfecto
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: { name: `Inscripción al ${tipo} de ${curso} con ${maestro} el día ${fecha_inicio} ` },
          unit_amount: Math.round(montoAPagar * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/pago-exitoso`,
      cancel_url: `${req.headers.get('origin')}/inscripcion-cancelada`,
      
      // Guardamos la información temporal para recuperar en tu Webhook
      metadata: {
        name: name,
        phone: phone,
        email: email || '',
        cursoId: cursoId,
        schoolId: schoolId,
        montoPuro: montoAPagar.toString(),
        costo_curso: costo?.toString() || ''
      },
      // Al correr la sesión en la cuenta conectada, Stripe sabe por defecto 
      // que los fondos se procesan ahí mismo. Eliminamos transfer_data redundante.
    }, {
      idempotencyKey: idempotencyKey,
      stripeAccount: stripeAccountId // 🌟 ESTA ES LA MAGIA: Vincula toda la sesión al ecosistema de la escuela
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})