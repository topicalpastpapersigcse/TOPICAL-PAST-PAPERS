(() => {
  const SUPABASE_URL = "https://zkqfyejxkrkazhjovmwr.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wxOGkyVKgF78gHFD7A8BzA__Z80Wnpw";
  const SITE_URL = "https://topicalpastpapersigcse.github.io/TOPICAL-PAST-PAPERS/";
  const PAYPAL_PLAN_ID = "P-58263651AM188451SNJOJBBQ";
  const PENDING_KEY = "igcse-pending-paypal-subscription";
  const client = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  let rendered = false;
  let linking = false;
  const $ = (s) => document.querySelector(s);
  const toast = (message) => {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { el.hidden = true; }, 3600);
  };
  const pendingId = () => localStorage.getItem(PENDING_KEY) || "";
  const savePending = (id) => id && localStorage.setItem(PENDING_KEY, id);
  const clearPending = () => localStorage.removeItem(PENDING_KEY);

  async function activeProfile() {
    if (!client) return null;
    const { data: auth } = await client.auth.getSession();
    const user = auth.session?.user;
    if (!user) return null;
    const { data } = await client.from("profiles").select("premium_until").eq("id", user.id).maybeSingle();
    return { user, active: !!(data?.premium_until && new Date(data.premium_until).getTime() > Date.now()) };
  }

  async function updateUi() {
    const profile = await activeProfile();
    const pending = pendingId();
    const checkout = $("#checkoutPayment");
    const signIn = $("#postPaymentSignIn");
    const linkingBox = $("#linkingPremium");
    const activeBox = $("#premiumActive");
    if (!checkout || !signIn || !linkingBox || !activeBox) return;
    checkout.hidden = !!profile?.active || !!pending;
    signIn.hidden = !!profile?.active || !pending || !!profile?.user;
    linkingBox.hidden = !!profile?.active || !pending || !profile?.user;
    activeBox.hidden = !profile?.active;
    if (profile?.active) {
      clearPending();
      return;
    }
    if (pending && profile?.user) await linkSubscription(pending, profile.user);
    if (!pending) renderPayPal();
  }

  function renderPayPal() {
    if (rendered || pendingId() || !window.paypal?.Buttons) return;
    const container = $("#paypal-button-container-P-58263651AM188451SNJOJBBQ");
    if (!container) return;
    rendered = true;
    container.innerHTML = "";
    window.paypal.Buttons({
      style: { shape: "pill", color: "blue", layout: "vertical", label: "subscribe", height: 50 },
      createSubscription(_data, actions) {
        const message = $("#paymentMessage");
        if (message) message.textContent = "Opening secure PayPal checkout…";
        return actions.subscription.create({
          plan_id: PAYPAL_PLAN_ID,
          application_context: { shipping_preference: "NO_SHIPPING", user_action: "SUBSCRIBE_NOW" }
        });
      },
      onApprove(data) {
        savePending(data.subscriptionID);
        const message = $("#paymentMessage");
        if (message) message.textContent = "Payment approved. Sign in with Google to activate Premium.";
        toast("Payment approved. Sign in with Google to activate Premium.");
        updateUi();
      },
      onCancel() {
        const message = $("#paymentMessage");
        if (message) message.textContent = "Payment cancelled. You were not charged.";
      },
      onError() {
        rendered = false;
        const message = $("#paymentMessage");
        if (message) message.textContent = "PayPal could not complete the subscription. Please try again.";
      }
    }).render(container).catch(() => {
      rendered = false;
      const message = $("#paymentMessage");
      if (message) message.textContent = "PayPal button could not load. Refresh and try again.";
    });
  }

  async function linkSubscription(subscriptionId, user) {
    if (!client || linking) return;
    linking = true;
    const email = $("#payEmail");
    if (email) email.textContent = user.email || "your account";
    try {
      const { data, error } = await client.functions.invoke("link-paypal-subscription", {
        body: { subscription_id: subscriptionId }
      });
      if (error) throw error;
      if (!data?.active) throw new Error(data?.message || "Subscription is not active yet.");
      clearPending();
      toast("Premium access is now active.");
      location.reload();
    } catch (error) {
      const box = $("#linkingPremium");
      if (box) box.innerHTML = `<div class="success">Your payment was approved, but automatic activation is still being confirmed.<br><small>${String(error.message || "Please refresh shortly.").replace(/[<>&]/g, "")}</small></div>`;
      toast("Payment saved. Premium activation is still being confirmed.");
    } finally {
      linking = false;
    }
  }

  async function signInAfterPayment(event) {
    if (!pendingId() || !client) return;
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const { error } = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: SITE_URL } });
    if (error) toast(error.message);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const premiumDialog = $("#premiumDialog");
    [$("#premiumTop"), $("#upgradeSide")].forEach((button) => button?.addEventListener("click", () => setTimeout(updateUi, 40)));
    premiumDialog?.addEventListener("toggle", () => { if (premiumDialog.open) updateUi(); });
    $("#googleSignIn")?.addEventListener("click", signInAfterPayment, true);
    updateUi();
  });
  client?.auth.onAuthStateChange(() => setTimeout(updateUi, 50));
})();
