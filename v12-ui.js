(() => {
  // Permanent owner access. The private owner key itself is never stored in this public file.
  const OWNER_STORAGE_KEY = 'igcse-study-hub-owner-access-v1';
  const OWNER_ACCESS_HASH = 'e1baa239f83a871f68397c89fa9cc1218d16b32d54fc1b9b537a2b2b6767d0dd';

  function isOwnerAccessActive() {
    try { return window.localStorage.getItem(OWNER_STORAGE_KEY) === OWNER_ACCESS_HASH; }
    catch { return false; }
  }
  window.isOwnerAccessActive = isOwnerAccessActive;

  // Make owner access count as Premium everywhere the existing app checks access.
  const baseIsPremiumActive = isPremiumActive;
  isPremiumActive = function ownerAwarePremiumActive() {
    return isOwnerAccessActive() || baseIsPremiumActive();
  };

  // A private owner link can activate permanent access on a browser without payment.
  // The key is removed from the address bar before verification and only its hash is public.
  (async () => {
    const url = new URL(window.location.href);
    const ownerKey = url.searchParams.get('owner_key');
    if (!ownerKey) return;

    url.searchParams.delete('owner_key');
    const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
    try { history.replaceState({}, '', cleanUrl); } catch {}

    try {
      const bytes = new TextEncoder().encode(ownerKey);
      const digestBuffer = await crypto.subtle.digest('SHA-256', bytes);
      const digest = Array.from(new Uint8Array(digestBuffer), byte => byte.toString(16).padStart(2, '0')).join('');
      if (digest !== OWNER_ACCESS_HASH) {
        if (typeof showToast === 'function') showToast('Owner access key is not valid.');
        return;
      }
      window.localStorage.setItem(OWNER_STORAGE_KEY, OWNER_ACCESS_HASH);
      window.location.reload();
    } catch {
      if (typeof showToast === 'function') showToast('Owner access could not be activated on this browser.');
    }
  })();

  const originalSubjectCard = subjectCard;
  const originalUpdatePaymentUI = updatePaymentUI;

  subjectCard = function enhancedSubjectCard(subject) {
    const html = originalSubjectCard(subject);
    const meta = subjectMeta[subject];
    if (!meta || meta.access === 'free' || !isPremiumActive()) return html;
    return html.replace('class="badge premium">♛ PREMIUM', 'class="badge active">✓ ACTIVE');
  };

  updatePaymentUI = function enhancedPaymentUI() {
    originalUpdatePaymentUI();
    const active = isPremiumActive();
    const owner = isOwnerAccessActive();
    const expiry = active && !owner ? formatExpiry(profile?.premium_until) : '';
    const topButton = document.querySelector('#premiumTop');
    const sideBox = document.querySelector('#premiumSideBox');
    const sideLabel = document.querySelector('#premiumSideLabel');
    const sideTitle = document.querySelector('#premiumSideTitle');
    const sideText = document.querySelector('#premiumSideText');
    const sideMeta = document.querySelector('#premiumSideMeta');
    const sideButton = document.querySelector('#upgradeSide');

    if (topButton) {
      topButton.classList.toggle('active', active);
      topButton.innerHTML = active
        ? (owner ? '<span>✓</span> Owner Access' : '<span>✓</span> Premium Active')
        : '<span>♛</span> Get 30-Day Access';
      topButton.disabled = active;
    }
    if (sideBox) sideBox.classList.toggle('active', active);
    if (sideLabel) sideLabel.textContent = active ? (owner ? 'OWNER' : 'ACTIVE') : 'PREMIUM';
    if (sideTitle) sideTitle.textContent = active
      ? (owner ? 'Owner access is active' : 'Premium is active')
      : 'Unlock premium subjects';
    if (sideText) sideText.textContent = active
      ? 'Mathematics, Physics and Accounting are fully unlocked.'
      : 'Mathematics, Physics and Accounting for 30 days.';
    if (sideMeta) sideMeta.textContent = active
      ? (owner ? 'Permanent owner access' : `Access until ${expiry}`)
      : 'US$20 once · no renewal';
    if (sideButton) {
      sideButton.textContent = active ? (owner ? '✓ Owner Access' : '✓ Premium Active') : 'Get 30-Day Access';
      sideButton.disabled = active;
    }
    if (owner && typeof els !== 'undefined' && els?.premiumExpiry) {
      els.premiumExpiry.textContent = 'Permanent owner access is active on this browser.';
    }

    if (!currentSubject) renderDashboardSubjects(document.querySelector('#globalSearch')?.value || '');
  };

  updatePaymentUI();
})();
