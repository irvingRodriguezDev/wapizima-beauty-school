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
    // 🌟 Leer el flujo como un ArrayBuffer binario
    const arrayBuffer = await req.arrayBuffer();
    const rawBody = new Uint8Array(arrayBuffer);

    // Deno.env.get es sincrónico nativamente (sin await)
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    // 🌟 CORRECCIÓN CRUCIAL: 'await' junto con 'constructEventAsync'
    const event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret!);
    
    console.log(`✅ ¡Firma validada con éxito! Evento: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      // 🚀 Recuperamos los metadatos mapeados desde tu formulario
      const { name, phone, email, cursoId, schoolId, costo_curso } = session.metadata
      const montoTotal = session.amount_total / 100

      // 1. VALIDAR O CREAR AL ESTUDIANTE (Haciendo match con tu base de datos)
      let studentId;
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .eq('school_id', schoolId)
        .or(`phone.eq.${phone},email.eq.${email}`)
        .maybeSingle()

      if (existingStudent) {
        studentId = existingStudent.id
      } else {
        const { data: newStudent, error: errEst } = await supabase
          .from('students')
          .insert({
            name: name,
            phone: phone,
            email: email || null,
            school_id: schoolId
          })
          .select('id').single()
        
        if (errEst) throw errEst
        studentId = newStudent.id
      }

      // 2. CREAR INSCRIPCIÓN DIRECTAMENTE ACTIVA (Zero-Waste)
      const { data: newEnrollment, error: errEnr } = await supabase
        .from('enrollments')
        .insert({
          student_id: studentId,
          course_id: cursoId,
          status: 'active',
          total_amount: costo_curso,
          registration_source: "web_stripe",
          payment_amount: montoTotal,
        })
        .select('id').single()

      if (errEnr) throw errEnr

      // 3. REGISTRAR EL PAGO DIRECTAMENTE COMO COMPLETADO
      const { error: errPay } = await supabase
        .from('payments')
        .insert({
          enrollment_id: newEnrollment.id,
          amount: montoTotal,
          payment_method: 'stripe_online',
          notes: "Pago realizado por medio de la plataforma de stripe",
          transaction_id: session.payment_intent as string
        })

      if (errPay) throw errPay
      
      console.log(`✨ Transacción limpia y exitosa para el alumno ID: ${studentId}`);
    }

    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error(`❌ Error procesando Webhook: ${error.message}`);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }
})