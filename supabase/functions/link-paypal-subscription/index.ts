import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing signed-in user.')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw new Error('Sign in again and retry.')

    const { subscription_id } = await req.json()
    if (!subscription_id || typeof subscription_id !== 'string') throw new Error('Missing PayPal subscription ID.')

    const clientId = Deno.env.get('PAYPAL_CLIENT_ID')!
    const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET')!
    const expectedPlan = Deno.env.get('PAYPAL_PLAN_ID')!
    const paypalBase = Deno.env.get('PAYPAL_BASE_URL') || 'https://api-m.paypal.com'

    const tokenRes = await fetch(`${paypalBase}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })
    if (!tokenRes.ok) throw new Error('Could not verify PayPal payment.')
    const token = await tokenRes.json()

    const subRes = await fetch(`${paypalBase}/v1/billing/subscriptions/${encodeURIComponent(subscription_id)}`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    if (!subRes.ok) throw new Error('PayPal subscription was not found.')
    const subscription = await subRes.json()

    if (subscription.plan_id !== expectedPlan) throw new Error('This subscription belongs to a different plan.')
    if (subscription.status !== 'ACTIVE') {
      return new Response(JSON.stringify({ active: false, status: subscription.status, message: 'PayPal is still confirming the subscription.' }), {
        status: 202, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const premiumUntil = subscription.billing_info?.next_billing_time || new Date(Date.now() + 31 * 86400000).toISOString()
    const payerEmail = subscription.subscriber?.email_address || null

    const { error: upsertError } = await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      avatar_url: user.user_metadata?.avatar_url || null,
      premium_until: premiumUntil,
      paypal_subscription_id: subscription_id,
      paypal_payer_email: payerEmail,
    }, { onConflict: 'id' })
    if (upsertError) throw upsertError

    return new Response(JSON.stringify({ active: true, premium_until: premiumUntil }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ active: false, message: error.message }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
