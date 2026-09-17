import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "npm:stripe@14.22.0"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature') || req.headers.get('Stripe-Signature');

  if (!signature) {
    return new Response("Falta la firma de Stripe", { status: 400 });
  }

  try {
    const arrayBuffer = await req.arrayBuffer();
    const rawBody = new Uint8Array(arrayBuffer);

    // Obtener los dos secretos cargados en Supabase
    const secretNative = Deno.env.get('STRIPE_WEBHOOK_SECRET_NATIVE') || Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const secretConnect = Deno.env.get('STRIPE_WEBHOOK_SECRET_CONNECT');

    let event: Stripe.Event | null = null;

    // 🌟 INTENTO 1: Validar con el Secret de la Cuenta Propia (Sede Propia)
    if (secretNative) {
      try {
        event = await stripe.webhooks.constructEventAsync(rawBody, signature, secretNative);
      } catch (_e) {
        // La firma no coincidió con el secret nativo, procederá al intento 2
      }
    }

    // 🌟 INTENTO 2: Validar con el Secret de Cuentas Conectadas (Franquicias)
    if (!event && secretConnect) {
      try {
        event = await stripe.webhooks.constructEventAsync(rawBody, signature, secretConnect);
      } catch (_e) {
        // La firma tampoco coincidió con el secret de connect
      }
    }

    // Si no coincidió con ninguno de los dos secrets, la petición no es legítima
    if (!event) {
      throw new Error("No se pudo verificar la firma de Stripe con ninguno de los secretos configurados.");
    }

    // 🌟 A PARTIR DE AQUÍ EL EVENTO ESTÁ 100% VALIDADO Y SE PROCESA IGUAL
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const {
        name,
        phone,
        email,
        cursoId,
        schoolId,
        costo_curso,
        montoPuro,
        tipo_curso,
      } = session.metadata || {};

      if (!schoolId || !cursoId) {
        throw new Error("Metadata incompleta en la sesión de Checkout.");
      }

      const montoPagadoStripe = (session.amount_total || 0) / 100;
      const costoTotalCurso = costo_curso ? parseFloat(costo_curso) : montoPagadoStripe;

      const saldoRestante = costoTotalCurso - montoPagadoStripe;
      const esLiquidacionTotal = saldoRestante <= 0;

      const statusPago = esLiquidacionTotal ? 'completed' : 'active';
      const cumpleCondicionQR = tipo_curso === "Curso" || esLiquidacionTotal;

      const secureTokenQR = cumpleCondicionQR
        ? `WBS-${crypto.randomUUID().substring(0, 8).toUpperCase()}`
        : null;

      // 1. VALIDAR O CREAR AL ESTUDIANTE
      let studentId: string;
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .eq('school_id', schoolId)
        .or(`phone.eq.${phone},email.eq.${email}`)
        .maybeSingle();

      if (existingStudent) {
        studentId = existingStudent.id;
      } else {
        const { data: newStudent, error: errEst } = await supabase
          .from('students')
          .insert({
            name: name,
            phone: phone,
            email: email || null,
            school_id: schoolId
          })
          .select('id')
          .single();

        if (errEst) throw errEst;
        studentId = newStudent.id;
      }

      // 2. CREAR INSCRIPCIÓN
      const { data: newEnrollment, error: errEnr } = await supabase
        .from('enrollments')
        .insert({
          student_id: studentId,
          course_id: cursoId,
          total_amount: costoTotalCurso,
          payment_amount: montoPuro ? parseFloat(montoPuro) : montoPagadoStripe,
          status: statusPago,
          qr_code_token: secureTokenQR,
          registration_source: "web_stripe",
        })
        .select('id')
        .single();

      if (errEnr) throw errEnr;

      // 3. REGISTRAR PAGO
      const transactionId = typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id || session.id;

      const { error: errPay } = await supabase
        .from('payments')
        .insert({
          enrollment_id: newEnrollment.id,
          amount: montoPagadoStripe,
          payment_method: 'stripe_online',
          notes: esLiquidacionTotal
            ? "Pago total liquidado por medio de la pasarela Stripe Checkout."
            : `Apartado parcial en línea. Saldo restante a liquidar en taquilla: $${saldoRestante.toFixed(2)}`,
          transaction_id: transactionId
        });

      if (errPay) throw errPay;
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("🚨 Error en Webhook de Stripe:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
})