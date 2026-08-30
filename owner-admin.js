// Permanent owner access tied to the signed-in owner account.
(() => {
  const OWNER_EMAIL_SHA256 = 'c5f5094fe1c811c12ef841c74f54185a31e95bf19bab95572a4f5fa5d6417f9c';
  let ownerActive = false;

  async function sha256(text) {
    const bytes = new TextEncoder().encode(String(text || '').trim().toLowerCase());
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function refreshOwnerState() {
    const email = session?.user?.email || '';
    if (!email) { ownerActive = false; return false; }
    try { ownerActive = (await sha256(email)) === OWNER_EMAIL_SHA256; }
    catch { ownerActive = false; }
    return ownerActive;
  }

  window.isOwnerAccessActive = () => ownerActive;

  const customerPremiumActive = isPremiumActive;
  isPremiumActive = function ownerOrCustomerPremiumActive() {
    return ownerActive || customerPremiumActive();
  };

  const originalLoadProfile = loadProfile;
  loadProfile = async function ownerAwareLoadProfile() {
    await refreshOwnerState();
    await originalLoadProfile();
  };

  const params = new URLSearchParams(location.search);
  if (params.get('owner') === '1' && !session?.user && supabaseClient) {
    supabaseClient.auth.getSession().then(async ({ data }) => {
      if (data?.session) return;
      const redirect = new URL(SITE_URL, location.href);
      redirect.searchParams.set('owner', '1');
      redirect.searchParams.set('build', '40');
      await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirect.href } });
    }).catch(console.error);
  }

  supabaseClient?.auth.onAuthStateChange(async (_event, nextSession) => {
    session = nextSession;
    await refreshOwnerState();
    if (ownerActive) {
      await originalLoadProfile();
      updatePaymentUI();
      if (currentSubject) renderSubjectPage(currentSubject, els.topicSearch.value);
    }
  });
})();
