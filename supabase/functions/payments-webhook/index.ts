import { createClient } from 'npm:@supabase/supabase-js@2';
import { verifyWebhook, EventName, getPaddleClient, type PaddleEnv } from '../_shared/paddle.ts';

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }
  return _supabase;
}

const PLAN_NAMES: Record<string, string> = {
  premium_monthly: 'Premium mensual',
  premium_yearly: 'Premium anual',
};

async function sendWelcomeEmail(userId: string, priceId: string) {
  try {
    const { data: userResp } = await getSupabase().auth.admin.getUserById(userId);
    const email = (userResp as any)?.user?.email;
    if (!email) {
      console.warn('No email for user, skipping welcome', { userId });
      return;
    }
    const name =
      (userResp as any)?.user?.user_metadata?.full_name ||
      (userResp as any)?.user?.user_metadata?.name ||
      undefined;
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const res = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
      body: JSON.stringify({
        templateName: 'welcome-premium',
        recipientEmail: email,
        idempotencyKey: `welcome-premium-${userId}-${priceId}`,
        templateData: {
          name,
          plan: PLAN_NAMES[priceId] || 'Premium',
          manageUrl: 'https://electrolabpro.com/account',
        },
      }),
    });
    if (!res.ok) console.warn('send-transactional-email failed', res.status, await res.text());
  } catch (e) {
    console.error('sendWelcomeEmail error', e);
  }
}

async function handleSubscriptionCreated(data: any, env: PaddleEnv) {
  const { id, customerId, items, status, currentBillingPeriod, customData } = data;
  const userId = customData?.userId;
  if (!userId) { console.error('No userId in customData'); return; }
  const item = items[0];
  const priceId = item.price.importMeta?.externalId;
  const productId = item.product.importMeta?.externalId;
  if (!priceId || !productId) {
    console.warn('Skipping subscription: missing importMeta.externalId');
    return;
  }
  const { data: existing } = await getSupabase()
    .from('subscriptions')
    .select('id')
    .eq('paddle_subscription_id', id)
    .maybeSingle();
  const isNew = !existing;
  await getSupabase().from('subscriptions').upsert({
    user_id: userId,
    paddle_subscription_id: id,
    paddle_customer_id: customerId,
    product_id: productId,
    price_id: priceId,
    status,
    current_period_start: currentBillingPeriod?.startsAt,
    current_period_end: currentBillingPeriod?.endsAt,
    environment: env,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'paddle_subscription_id' });
  if (isNew && (status === 'active' || status === 'trialing')) {
    await sendWelcomeEmail(userId, priceId);
  }
}

async function handleSubscriptionUpdated(data: any, env: PaddleEnv) {
  const { id, status, currentBillingPeriod, scheduledChange } = data;
  await getSupabase().from('subscriptions').update({
    status,
    current_period_start: currentBillingPeriod?.startsAt,
    current_period_end: currentBillingPeriod?.endsAt,
    cancel_at_period_end: scheduledChange?.action === 'cancel',
    updated_at: new Date().toISOString(),
  }).eq('paddle_subscription_id', id).eq('environment', env);
}

async function handleSubscriptionCanceled(data: any, env: PaddleEnv) {
  await getSupabase().from('subscriptions').update({
    status: 'canceled',
    cancel_at_period_end: true,
    current_period_end: data.currentBillingPeriod?.endsAt ?? data.canceledAt,
    updated_at: new Date().toISOString(),
  }).eq('paddle_subscription_id', data.id).eq('environment', env);
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const url = new URL(req.url);
  const env = (url.searchParams.get('env') || 'sandbox') as PaddleEnv;
  try {
    const event = await verifyWebhook(req, env);
    switch (event.eventType) {
      case EventName.SubscriptionCreated: await handleSubscriptionCreated(event.data, env); break;
      case EventName.SubscriptionUpdated: await handleSubscriptionUpdated(event.data, env); break;
      case EventName.SubscriptionCanceled: await handleSubscriptionCanceled(event.data, env); break;
      default: console.log('Unhandled event:', event.eventType);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Webhook error:', e);
    return new Response('Webhook error', { status: 400 });
  }
});
