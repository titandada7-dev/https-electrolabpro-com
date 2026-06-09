// Edge function: receives contact form submissions, validates, stores in DB.
// Public endpoint (no JWT required). Service role used server-side only.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface ContactPayload {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const nombre = (body.nombre ?? "").trim();
  const email = (body.email ?? "").trim();
  const asunto = (body.asunto ?? "").trim();
  const mensaje = (body.mensaje ?? "").trim();

  const errors: Record<string, string> = {};
  if (!nombre || nombre.length > 100) errors.nombre = "Nombre requerido (máx 100).";
  if (!email || email.length > 255 || !isEmail(email)) errors.email = "Email inválido.";
  if (!asunto || asunto.length > 200) errors.asunto = "Asunto requerido (máx 200).";
  if (!mensaje || mensaje.length > 2000) errors.mensaje = "Mensaje requerido (máx 2000).";

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ error: "Validación", fields: errors }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  const { error } = await supabase.from("contact_submissions").insert({
    nombre,
    email,
    asunto,
    mensaje,
    ip,
    user_agent: userAgent,
  });

  if (error) {
    console.error("contact insert failed", error);
    return new Response(JSON.stringify({ error: "No pudimos guardar tu mensaje. Probá de nuevo." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
