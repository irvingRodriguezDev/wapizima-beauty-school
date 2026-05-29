import { supabase } from "../config/supabaseClient";
export const initiateStripeCheckout = async (payload, stripeAccountId) => {
  try {
    // Invocamos la Edge Function de Supabase directamente
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { ...payload, stripeAccountId },
    });

    if (error) throw error;

    // Redirigimos directamente usando la URL segura generada por Stripe
    if (data?.url) {
      window.location.href = data.url;
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Error en Checkout Supabase:", error);
    return { success: false, error: error.message };
  }
};
