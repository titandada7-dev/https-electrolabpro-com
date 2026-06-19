// Admin-only broadcaster: emails opted-in Premium users about new Premium content.
// Each recipient gets an individually-queued send via send-transactional-email.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BodySchema = z.object({
  contentTitle: z.string().min(1).max(160),
  contentDescription: z.string().max(500).optional(),
  contentUrl: z.string().url().optional(),
  campaignId: z.string().min(1).max(80).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const authHeader = req.headers.get('Authorization') ?? ''
    if (!authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: userData, error: userErr } = await userClient.auth.getUser()
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE)
    const { data: isAdmin } = await admin.rpc('has_role', { _user_id: userData.user.id, _role: 'admin' })
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const { contentTitle, contentDescription, contentUrl, campaignId } = parsed.data
    const campaign = campaignId ?? crypto.randomUUID()

    const { data: subs, error: subsErr } = await admin
      .from('premium_content_subscribers')
      .select('user_id, email, opted_in')
      .eq('opted_in', true)
    if (subsErr) {
      return new Response(JSON.stringify({ error: subsErr.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    let queued = 0
    let failed = 0
    for (const row of (subs ?? [])) {
      try {
        const res = await admin.functions.invoke('send-transactional-email', {
          body: {
            templateName: 'premium-content-update',
            recipientEmail: row.email,
            idempotencyKey: `premium-update-${campaign}-${row.user_id}`,
            templateData: { contentTitle, contentDescription, contentUrl },
          },
        })
        if (res.error) failed++; else queued++
      } catch {
        failed++
      }
    }

    return new Response(JSON.stringify({ ok: true, campaignId: campaign, queued, failed, total: subs?.length ?? 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
