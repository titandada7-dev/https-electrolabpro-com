// Edge function: receives contact form submissions, validates, stores in DB,
// and notifies the site owner via Gmail (using the linked google_mail connector).
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toBase64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function encodeSubject(s: string): string {
  return `=?UTF-8?B?${btoa(unescape(encodeURIComponent(s)))}?=`;
}

function buildRawEmail(opts: {
  to: string;
  subject: string;
  replyTo: string;
  html: string;
  text: string;
}): string {
  const boundary = "elp_" + Math.random().toString(36).slice(2);
  const headers = [
    `To: ${opts.to}`,
    `Reply-To: ${opts.replyTo}`,
    `Subject: ${encodeSubject(opts.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const body = [
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    opts.text,
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    opts.html,
    `--${boundary}--`,
    "",
  ].join("\r\n");

  return toBase64Url(headers + "\r\n" + body);
}

async function sendGmailNotification(payload: {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  ip: string | null;
}): Promise<void> {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gmailKey = Deno.env.get("GOOGLE_MAIL_API_KEY");
  if (!lovableKey || !gmailKey) {
    console.warn("Gmail credentials missing, skipping notification");
    return;
  }

  const text =
    `Nuevo mensaje desde el formulario de contacto de ElectroLab Pro\n\n` +
    `Nombre: ${payload.nombre}\n` +
    `Email: ${payload.email}\n` +
    `Asunto: ${payload.asunto}\n` +
    `IP: ${payload.ip ?? "—"}\n\n` +
    `Mensaje:\n${payload.mensaje}\n`;

  const html =
    `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0f172a">` +
    `<h2 style="margin:0 0 16px;color:#1e3a8a">📩 Nuevo mensaje · ElectroLab Pro</h2>` +
    `<table style="width:100%;border-collapse:collapse;font-size:14px">` +
    `<tr><td style="padding:6px 0;color:#64748b;width:90px">Nombre</td><td><strong>${escapeHtml(payload.nombre)}</strong></td></tr>` +
    `<tr><td style="padding:6px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>` +
    `<tr><td style="padding:6px 0;color:#64748b">Asunto</td><td>${escapeHtml(payload.asunto)}</td></tr>` +
    `<tr><td style="padding:6px 0;color:#64748b">IP</td><td>${escapeHtml(payload.ip ?? "—")}</td></tr>` +
    `</table>` +
    `<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />` +
    `<div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px">${escapeHtml(payload.mensaje)}</div>` +
    `<p style="margin-top:20px;font-size:12px;color:#94a3b8">Respondé directamente a este mail para contestarle a ${escapeHtml(payload.nombre)}.</p>` +
    `</div>`;

  const raw = buildRawEmail({
    to: "me",
    replyTo: `${payload.nombre} <${payload.email}>`,
    subject: `[ElectroLab Pro] ${payload.asunto}`,
    text,
    html,
  });

  const res = await fetch(
    "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    },
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("Gmail send failed", res.status, errText);
  }
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

  try {
    await sendGmailNotification({ nombre, email, asunto, mensaje, ip });
  } catch (e) {
    console.error("notification error", e);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
