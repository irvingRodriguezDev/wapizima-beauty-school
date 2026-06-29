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
    // 🌟 Leer el flujo como un ArrayBuffer binario (Indispensable para Deno 2)
    const arrayBuffer = await req.arrayBuffer();
    const rawBody = new Uint8Array(arrayBuffer);
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    // 🌟 Validación asíncrona obligatoria para evitar el error de SubtleCrypto
    const event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret!);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // 🚀 Recuperamos la metadata exacta que inyectó 'create-checkout'
      const { name, phone, email, cursoId, schoolId, costo_curso, montoPuro, tipo_curso } = session.metadata;
      
      const montoPagadoStripe = session.amount_total / 100; // Pasamos de centavos a pesos decimales
      const costoTotalCurso = costo_curso ? parseFloat(costo_curso) : montoPagadoStripe;

      // 🔥 LÓGICA DINÁMICA: ¿Es pago parcial (apartado) o completo (liquidación)?
      const saldoRestante = costoTotalCurso - montoPagadoStripe;
      const esLiquidacionTotal = saldoRestante <= 0;

      const statusPago = esLiquidacionTotal ? 'completed' : 'active';
      const cumpleCondicionQR = tipo_curso === "Curso" || esLiquidacionTotal;
      // Solo generamos el QR si la cuenta está totalmente en ceros
      const secureTokenQR = cumpleCondicionQR
        ? `WBS-${crypto.randomUUID().substring(0, 8).toUpperCase()}`
        : null;

      // 1. VALIDAR O CREAR AL ESTUDIANTE
      let studentId;
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
          .select('id').single();
        
        if (errEst) throw errEst;
        studentId = newStudent.id;
      }

      // 2. CREAR INSCRIPCIÓN CON VALORES REALES (Parcial o Completo)
      const { data: newEnrollment, error: errEnr } = await supabase
        .from('enrollments')
        .insert({
          student_id: studentId,
          course_id: cursoId,
          total_amount: costoTotalCurso,
          payment_amount: montoPuro,
          status: statusPago, 
          qr_code_token: secureTokenQR, // 🔥 Se sella el QR sólo si pagó todo
          registration_source: "web_stripe",
        })
        .select('id').single();

      if (errEnr) throw errEnr;

      // 3. REGISTRAR EL ABONO EN LA TABLA DE PAGOS PARA AUDITORÍA
      const { error: errPay } = await supabase
        .from('payments')
        .insert({
          enrollment_id: newEnrollment.id,
          amount: montoPagadoStripe,
          payment_method: 'stripe_online',
          notes: esLiquidacionTotal 
            ? "Pago total liquidado por medio de la pasarela Stripe Checkout." 
            : `Apartado parcial en línea. Saldo restante a liquidar en taquilla: $${saldoRestante.toFixed(2)}`,
          transaction_id: session.payment_intent as string
        });

      if (errPay) throw errPay;
      
    }

    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("🚨 Error crítico en Webhook:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
})