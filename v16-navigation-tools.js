// V16 — top study navigation and a clear strip showing the other study tools.
(() => {
  const BUILD = '34';
  const validSubjects = new Set(['maths', 'physics', 'chemistry', 'accounting']);
  const subjectNames = {
    maths: 'Mathematics',
    physics: 'Physics',
    chemistry: 'Chemistry',
    accounting: 'Accounting'
  };

  const subjectFromPage = () => {
    const querySubject = new URLSearchParams(location.search).get('subject');
    if (validSubjects.has(querySubject)) return querySubject;
    if (typeof currentSubject !== 'undefined' && validSubjects.has(currentSubject)) return currentSubject;
    return null;
  };

  const subjectUrl = subject => `index.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`;
  const topicalUrl = subject => `topical-papers.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`;

  function addStyles() {
    if (document.getElementById('v16NavigationToolsStyle')) return;
    const style = document.createElement('style');
    style.id = 'v16NavigationToolsStyle';
    style.textContent = `
      .topbar{grid-template-columns:auto auto minmax(240px,1fr) auto!important;gap:20px!important}
      .study-top-nav{display:flex;align-items:center;gap:6px;min-width:max-content;position:relative;z-index:30}
      .study-nav-item{position:relative}
      .study-nav-trigger{display:flex;align-items:center;gap:9px;min-height:42px;padding:0 12px;border:1px solid transparent;border-radius:10px;background:transparent;color:#eef4ff;font-size:15px;font-weight:800;white-space:nowrap;transition:.2s ease}
      .study-nav-trigger:hover,.study-nav-item.open .study-nav-trigger{color:#76f1cf;background:rgba(57,224,180,.08);border-color:rgba(89,232,194,.18)}
      .study-nav-chevron{font-size:13px;transition:transform .2s ease}.study-nav-item.open .study-nav-chevron{transform:rotate(180deg)}
      .study-nav-menu{position:absolute;top:calc(100% + 10px);left:0;width:250px;padding:9px;border:1px solid rgba(91,226,195,.22);border-radius:15px;background:linear-gradient(145deg,#071522,#0a1f2e);box-shadow:0 24px 58px rgba(0,0,0,.48);display:none;z-index:100}
      .study-nav-item.open .study-nav-menu{display:grid;animation:studyMenuIn .18s ease both}
      @keyframes studyMenuIn{from{opacity:0;transform:translateY(-7px)}to{opacity:1;transform:none}}
      .study-nav-menu a,.study-nav-menu button{display:grid;grid-template-columns:34px 1fr;align-items:center;gap:10px;width:100%;min-height:48px;padding:8px 10px;border:0;border-radius:11px;background:transparent;color:#dce7f7;text-align:left;text-decoration:none;transition:.18s ease}
      .study-nav-menu a:hover,.study-nav-menu button:hover{background:rgba(87,229,193,.10);color:#78f0cf;transform:translateX(2px)}
      .study-nav-menu .menu-emoji{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:rgba(61,105,180,.16);font-size:17px}
      .study-nav-menu b{display:block;font-size:13px}.study-nav-menu small{display:block;margin-top:2px;color:#8294ae;font-size:9px;font-weight:700}
      .website-tools-strip{position:relative;z-index:1;margin:0 0 18px;padding:17px;border:1px solid rgba(101,145,207,.24);border-radius:17px;background:linear-gradient(145deg,rgba(8,19,36,.96),rgba(7,15,29,.96))}
      .website-tools-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:12px}
      .website-tools-head div{display:flex;align-items:center;gap:9px}.website-tools-head strong{font-size:15px}.website-tools-head span{font-size:10px;color:#73edca;font-weight:900;letter-spacing:.11em}
      .website-tools-list{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
      .website-tool-chip{display:grid;grid-template-columns:42px minmax(0,1fr);align-items:center;gap:10px;min-height:70px;padding:11px;border:1px solid rgba(106,139,194,.2);border-radius:13px;background:rgba(10,24,44,.72);color:#f4f7ff;text-align:left;transition:.2s ease}
      .website-tool-chip:hover{transform:translateY(-3px);border-color:rgba(99,239,202,.42);background:rgba(12,33,52,.9);box-shadow:0 14px 28px rgba(0,0,0,.24)}
      .website-tool-emoji{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:linear-gradient(145deg,#173d67,#27256e);font-size:21px}
      .website-tool-chip b{display:block;font-size:12px}.website-tool-chip small{display:block;margin-top:4px;color:#8295b1;font-size:9px;line-height:1.35}
      .website-tool-chip[data-status="soon"] small::after{content:" · Coming soon";color:#ffc862}
      .website-tool-chip[data-status="ready"] small::after{content:" · Available";color:#6ff0c8}
      .website-tool-pulse{animation:websiteToolPulse .65s ease}
      @keyframes websiteToolPulse{0%,100%{box-shadow:none}50%{box-shadow:0 0 0 4px rgba(91,231,194,.18),0 18px 38px rgba(0,0,0,.32)}}
      @media(max-width:1180px){.topbar{grid-template-columns:auto auto minmax(210px,1fr) auto!important;gap:12px!important}.study-nav-trigger{font-size:13px;padding:0 9px}}
      @media(max-width:980px){.topbar .page-title{display:none!important}.topbar{grid-template-columns:auto auto minmax(200px,1fr) auto!important}.website-tools-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:760px){.topbar{height:auto!important;min-height:78px!important;grid-template-columns:auto minmax(0,1fr) auto!important;padding:10px 14px!important}.study-top-nav{grid-column:1/-1;grid-row:2;width:100%}.study-nav-item{flex:1}.study-nav-trigger{width:100%;justify-content:center}.study-nav-menu{width:min(280px,calc(100vw - 28px))}.study-nav-item:last-child .study-nav-menu{left:auto;right:0}.website-tools-head{align-items:flex-start}.website-tools-list{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function closeMenus(except = null) {
    document.querySelectorAll('.study-nav-item.open').forEach(item => {
      if (item !== except) item.classList.remove('open');
    });
  }

  function addTopNavigation() {
    const topbar = document.querySelector('.topbar');
    const search = topbar?.querySelector('.search');
    if (!topbar || !search || document.getElementById('studyTopNav')) return;

    const currentSubject = subjectFromPage();
    const nav = document.createElement('nav');
    nav.id = 'studyTopNav';
    nav.className = 'study-top-nav';
    nav.setAttribute('aria-label', 'Study navigation');
    nav.innerHTML = `
      <div class="study-nav-item">
        <button class="study-nav-trigger" type="button" aria-expanded="false">Start studying <span class="study-nav-chevron">⌄</span></button>
        <div class="study-nav-menu">
          <a href="index.html?build=${BUILD}"><span class="menu-emoji">🏠</span><span><b>All subjects</b><small>Return to the study dashboard</small></span></a>
          ${Object.entries(subjectNames).map(([key, name]) => `<a href="${subjectUrl(key)}"><span class="menu-emoji">${key === 'maths' ? '➗' : key === 'physics' ? '⚡' : key === 'chemistry' ? '🧪' : '📊'}</span><span><b>${name}</b><small>Open ${name.toLowerCase()} resources</small></span></a>`).join('')}
        </div>
      </div>
      <div class="study-nav-item">
        <button class="study-nav-trigger" type="button" aria-expanded="false">Study tools <span class="study-nav-chevron">⌄</span></button>
        <div class="study-nav-menu">
          <a href="${currentSubject ? topicalUrl(currentSubject) : `index.html?build=${BUILD}`}"><span class="menu-emoji">📚</span><span><b>Topical Past Papers</b><small>Questions arranged by topic</small></span></a>
          <button type="button" data-nav-tool="Revision Notes"><span class="menu-emoji">📘</span><span><b>Revision Notes</b><small>Key ideas, formulas and diagrams</small></span></button>
          <button type="button" data-nav-tool="Mock Papers"><span class="menu-emoji">📝</span><span><b>Mock Papers</b><small>Complete timed practice</small></span></button>
          <button type="button" data-nav-tool="Predicted Papers"><span class="menu-emoji">✨</span><span><b>Predicted Papers</b><small>Focused 2026 preparation</small></span></button>
          <a href="index.html?build=${BUILD}#progress"><span class="menu-emoji">📈</span><span><b>My Progress</b><small>Track completed topics</small></span></a>
        </div>
      </div>`;

    topbar.insertBefore(nav, search);

    nav.querySelectorAll('.study-nav-trigger').forEach(trigger => {
      trigger.addEventListener('click', event => {
        event.stopPropagation();
        const item = trigger.closest('.study-nav-item');
        const willOpen = !item.classList.contains('open');
        closeMenus(item);
        item.classList.toggle('open', willOpen);
        trigger.setAttribute('aria-expanded', String(willOpen));
      });
    });

    nav.addEventListener('click', event => {
      const tool = event.target.closest('[data-nav-tool]');
      if (!tool) return;
      const name = tool.dataset.navTool;
      const selector = name === 'Revision Notes' ? '.final-notes' : name === 'Mock Papers' ? '.final-mocks' : '.final-predicted';
      const card = document.querySelector(selector);
      closeMenus();
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('website-tool-pulse');
        requestAnimationFrame(() => card.classList.add('website-tool-pulse'));
      } else if (typeof showToast === 'function') {
        showToast(`${name} will appear here when the PDFs are uploaded.`);
      }
    });

    document.addEventListener('click', () => closeMenus());
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenus(); });
  }

  function addWebsiteToolsStrip() {
    const hub = document.querySelector('.final-resource-hub');
    const topicalButton = hub?.querySelector('.final-topical-button');
    if (!hub || !topicalButton || hub.querySelector('.website-tools-strip')) return false;

    const strip = document.createElement('section');
    strip.className = 'website-tools-strip';
    strip.setAttribute('aria-label', 'More study tools available on this website');
    strip.innerHTML = `
      <div class="website-tools-head">
        <div><span>🌟</span><strong>More study tools on this website</strong></div>
        <span>EXPLORE MORE</span>
      </div>
      <div class="website-tools-list">
        <button class="website-tool-chip" type="button" data-target-card=".final-notes" data-status="soon"><span class="website-tool-emoji">📘</span><span><b>Revision Notes</b><small>Formulas, diagrams and exam tips</small></span></button>
        <button class="website-tool-chip" type="button" data-target-card=".final-mocks" data-status="soon"><span class="website-tool-emoji">📝</span><span><b>Mock Papers</b><small>Full timed exam practice</small></span></button>
        <button class="website-tool-chip" type="button" data-target-card=".final-predicted" data-status="soon"><span class="website-tool-emoji">✨</span><span><b>Predicted Papers</b><small>Focused preparation for 2026</small></span></button>
        <button class="website-tool-chip" type="button" data-open-progress="true" data-status="ready"><span class="website-tool-emoji">📈</span><span><b>Progress Tracking</b><small>See completed topics and scores</small></span></button>
      </div>`;

    topicalButton.insertAdjacentElement('afterend', strip);

    strip.addEventListener('click', event => {
      const chip = event.target.closest('.website-tool-chip');
      if (!chip) return;
      if (chip.dataset.openProgress === 'true') {
        location.href = `index.html?build=${BUILD}#progress`;
        return;
      }
      const card = document.querySelector(chip.dataset.targetCard || '');
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.remove('website-tool-pulse');
      requestAnimationFrame(() => card.classList.add('website-tool-pulse'));
    });
    return true;
  }

  function initialise() {
    addStyles();
    addTopNavigation();
    if (addWebsiteToolsStrip()) return;
    const observer = new MutationObserver(() => {
      addTopNavigation();
      if (addWebsiteToolsStrip()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();