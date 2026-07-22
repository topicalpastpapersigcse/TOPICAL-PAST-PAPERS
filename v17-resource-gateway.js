// V17 — featured topical-papers gateway and upgraded study-resource cards.
(() => {
  const subjectPage = document.getElementById('subjectPage');
  const subjectHero = document.getElementById('subjectHero');
  const subjectToolbar = subjectPage?.querySelector('.subject-toolbar');
  const topicGrid = document.getElementById('topicGrid');
  const emptyTopics = document.getElementById('emptyTopics');

  if (!subjectPage || !subjectHero || !subjectToolbar || !topicGrid || document.getElementById('extraResourceHub')) return;

  const style = document.createElement('style');
  style.textContent = `
    .extra-resource-hub{position:relative;overflow:hidden;margin:24px 0 28px;padding:30px;border:1px solid rgba(75,108,179,.38);border-radius:24px;background:linear-gradient(145deg,rgba(7,16,34,.99),rgba(8,13,29,.99));box-shadow:0 22px 60px rgba(0,0,0,.3)}
    .extra-resource-hub:before{content:"";position:absolute;width:360px;height:360px;border-radius:50%;right:-150px;top:-210px;background:rgba(86,70,255,.24);filter:blur(10px);pointer-events:none}
    .extra-resource-head{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px}
    .extra-resource-head h2{margin:10px 0 7px;font-size:31px;letter-spacing:-.035em}
    .extra-resource-head p{margin:0;max-width:760px;color:#91a2c1;font-size:13px;line-height:1.65}
    .extra-resource-new{flex:0 0 auto;padding:8px 12px;border:1px solid rgba(77,236,158,.31);border-radius:999px;background:rgba(35,219,130,.12);color:#50efa6;font-size:10px;font-weight:950;letter-spacing:.12em}

    .topical-launcher{position:relative;z-index:1;overflow:hidden;width:100%;min-height:142px;margin:0 0 18px;padding:24px 26px;border:1px solid rgba(122,161,255,.6);border-radius:20px;background:linear-gradient(115deg,#145cf4 0%,#3758f2 48%,#7737ec 100%);color:#fff;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:20px;text-align:left;box-shadow:0 18px 48px rgba(39,83,255,.36),inset 0 1px 0 rgba(255,255,255,.2);transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
    .topical-launcher:before{content:"";position:absolute;inset:-120% auto -120% -30%;width:34%;transform:rotate(18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);animation:topicalShine 4s ease-in-out infinite}
    .topical-launcher:after{content:"";position:absolute;width:210px;height:210px;border-radius:50%;right:-45px;top:-80px;background:rgba(255,255,255,.14);filter:blur(3px)}
    .topical-launcher:hover{transform:translateY(-4px) scale(1.006);border-color:#b9d0ff;box-shadow:0 24px 62px rgba(55,78,255,.5),0 0 35px rgba(104,80,255,.26),inset 0 1px 0 rgba(255,255,255,.28)}
    .topical-launcher:active{transform:translateY(-1px) scale(.998)}
    .topical-launcher-icon{position:relative;z-index:1;display:grid;place-items:center;width:76px;height:76px;border-radius:20px;background:rgba(5,18,62,.3);border:1px solid rgba(255,255,255,.25);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),0 16px 32px rgba(0,0,0,.2);font-size:35px}
    .topical-launcher-copy{position:relative;z-index:1;display:grid;gap:6px}
    .topical-launcher-copy small{font-size:10px;font-weight:950;letter-spacing:.15em;color:#dce8ff}
    .topical-launcher-copy strong{font-size:clamp(25px,2.2vw,36px);line-height:1.05;letter-spacing:-.035em}
    .topical-launcher-copy span{font-size:13px;line-height:1.55;color:#e5ecff}
    .topical-launcher-cta{position:relative;z-index:1;display:grid;justify-items:end;gap:9px;min-width:210px}
    .topical-launcher-status{padding:6px 10px;border:1px solid rgba(103,255,190,.42);border-radius:999px;background:rgba(6,69,49,.36);color:#70ffc1;font-size:9px;font-weight:950;letter-spacing:.11em}
    .topical-launcher-action{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 18px;border-radius:12px;background:#fff;color:#1839a8;font-size:14px;font-weight:950;box-shadow:0 12px 28px rgba(0,0,0,.22)}
    .topical-launcher-action b{font-size:20px;transition:transform .2s ease}.topical-launcher:hover .topical-launcher-action b{transform:translateY(3px)}
    @keyframes topicalShine{0%,55%{left:-35%}75%,100%{left:120%}}

    .extra-resource-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
    .extra-resource-card{position:relative;overflow:hidden;min-height:232px;padding:22px;border:1px solid #1b2f52;border-radius:19px;background:linear-gradient(150deg,#0b172b,#07101f);display:flex;flex-direction:column;transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}
    .extra-resource-card:hover{transform:translateY(-5px);border-color:#496fae;box-shadow:0 20px 42px rgba(0,0,0,.34),0 0 26px var(--resource-shadow)}
    .extra-resource-card:after{content:"";position:absolute;width:145px;height:145px;border-radius:50%;right:-60px;bottom:-75px;background:var(--resource-glow);filter:blur(4px);opacity:.75}
    .resource-notes{--resource-glow:rgba(47,107,255,.42);--resource-shadow:rgba(47,107,255,.14);--button-a:#1e67ff;--button-b:#394cf0}
    .resource-mocks{--resource-glow:rgba(141,70,255,.42);--resource-shadow:rgba(141,70,255,.14);--button-a:#7b3ff2;--button-b:#9846dc}
    .resource-predicted{--resource-glow:rgba(255,139,36,.42);--resource-shadow:rgba(255,139,36,.14);--button-a:#ed7b1f;--button-b:#d94d45}
    .extra-resource-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
    .extra-resource-icon{display:grid;place-items:center;width:55px;height:55px;border-radius:15px;background:linear-gradient(145deg,#19356a,#30247b);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 0 30px rgba(72,81,255,.2);font-size:25px;color:#fff}
    .extra-resource-status{padding:6px 9px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#9dabc3;font-size:9px;font-weight:950;letter-spacing:.1em}
    .extra-resource-card h3{margin:19px 0 8px;font-size:21px}
    .extra-resource-card p{margin:0 0 20px;color:#91a1bd;font-size:12px;line-height:1.65}
    .extra-resource-card button{position:relative;z-index:1;overflow:hidden;margin-top:auto;width:100%;min-height:48px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:linear-gradient(100deg,var(--button-a),var(--button-b));color:#fff;font-weight:950;box-shadow:0 12px 28px rgba(0,0,0,.25);transition:transform .2s ease,filter .2s ease,box-shadow .2s ease}
    .extra-resource-card button:before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.24) 50%,transparent 75%);transform:translateX(-120%);transition:transform .55s ease}
    .extra-resource-card button:hover{transform:translateY(-2px);filter:brightness(1.12);box-shadow:0 16px 34px rgba(0,0,0,.32)}
    .extra-resource-card button:hover:before{transform:translateX(120%)}

    .topical-section-heading{margin:8px 0 15px;padding:0 2px;scroll-margin-top:100px}
    .topical-section-heading h2{margin:8px 0 5px;font-size:29px;letter-spacing:-.03em}
    .topical-section-heading p{margin:0;color:#8391aa;font-size:12px}
    .topical-content-collapsed{display:none!important}
    .topical-content-reveal{animation:topicalReveal .42s ease both}
    @keyframes topicalReveal{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

    @media(max-width:1000px){.topical-launcher{grid-template-columns:auto 1fr}.topical-launcher-cta{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;width:100%;min-width:0}.extra-resource-grid{grid-template-columns:1fr}.extra-resource-card{min-height:190px}}
    @media(max-width:620px){.extra-resource-hub{padding:20px;border-radius:19px}.extra-resource-head{display:grid}.extra-resource-head h2{font-size:25px}.extra-resource-new{justify-self:start}.topical-launcher{grid-template-columns:1fr;padding:21px}.topical-launcher-icon{width:60px;height:60px;font-size:28px}.topical-launcher-cta{display:grid;justify-items:stretch}.topical-launcher-action{width:100%}.extra-resource-card{padding:18px}}
    @media(prefers-reduced-motion:reduce){.topical-launcher:before{animation:none}.topical-content-reveal{animation:none}}
  `;
  document.head.appendChild(style);

  const hub = document.createElement('section');
  hub.id = 'extraResourceHub';
  hub.className = 'extra-resource-hub';
  hub.setAttribute('aria-labelledby', 'extraResourceTitle');
  hub.innerHTML = `
    <div class="extra-resource-head">
      <div>
        <span class="eyebrow"><i></i> CHOOSE YOUR STUDY RESOURCE</span>
        <h2 id="extraResourceTitle">Study resources</h2>
        <p>Open topical practice first, or choose revision notes, mock papers and predicted papers.</p>
      </div>
      <span class="extra-resource-new">4 STUDY OPTIONS</span>
    </div>

    <button class="topical-launcher" id="openTopicalPapers" type="button" aria-expanded="false">
      <span class="topical-launcher-icon">▦</span>
      <span class="topical-launcher-copy">
        <small>AVAILABLE NOW · REAL EXAM PRACTICE</small>
        <strong>Topical Past Papers</strong>
        <span>Open every question pack organised by syllabus topic, with available mark schemes.</span>
      </span>
      <span class="topical-launcher-cta">
        <span class="topical-launcher-status">READY TO PRACTISE</span>
        <span class="topical-launcher-action">View all topical papers <b>↓</b></span>
      </span>
    </button>

    <div class="extra-resource-grid">
      <article class="extra-resource-card resource-notes">
        <div class="extra-resource-card-top"><span class="extra-resource-icon">▤</span><span class="extra-resource-status">COMING SOON</span></div>
        <h3>Revision Notes</h3>
        <p>Clear syllabus notes, key formulas, definitions, diagrams and exam tips arranged by topic.</p>
        <button type="button" data-study-resource="Revision Notes">Explore revision notes →</button>
      </article>
      <article class="extra-resource-card resource-mocks">
        <div class="extra-resource-card-top"><span class="extra-resource-icon">⌁</span><span class="extra-resource-status">COMING SOON</span></div>
        <h3>Mock Papers</h3>
        <p>Full timed practice papers designed to test the complete syllabus under exam conditions.</p>
        <button type="button" data-study-resource="Mock Papers">Explore mock papers →</button>
      </article>
      <article class="extra-resource-card resource-predicted">
        <div class="extra-resource-card-top"><span class="extra-resource-icon">✦</span><span class="extra-resource-status">COMING SOON</span></div>
        <h3>Predicted Papers</h3>
        <p>Focused practice built around important syllabus areas and likely question styles for 2026.</p>
        <button type="button" data-study-resource="Predicted Papers">Explore predicted papers →</button>
      </article>
    </div>`;

  const topicalHeading = document.createElement('div');
  topicalHeading.id = 'topicalPapersSection';
  topicalHeading.className = 'topical-section-heading topical-content-collapsed';
  topicalHeading.innerHTML = `
    <span class="eyebrow"><i></i> TOPICAL PRACTICE</span>
    <h2>Topical Past Papers</h2>
    <p>Choose a topic below to open its question paper and mark scheme.</p>`;

  subjectHero.insertAdjacentElement('afterend', hub);
  subjectToolbar.insertAdjacentElement('beforebegin', topicalHeading);

  const topicalElements = [topicalHeading, subjectToolbar, topicGrid, emptyTopics];
  topicalElements.forEach(element => element.classList.add('topical-content-collapsed'));

  function currentSubjectName() {
    return subjectHero.querySelector('h1')?.textContent?.trim() || 'this subject';
  }

  function updateResourceHeading() {
    const heading = document.getElementById('extraResourceTitle');
    if (heading) heading.textContent = `${currentSubjectName()} study resources`;
  }

  function revealTopicalPapers() {
    topicalElements.forEach(element => {
      element.classList.remove('topical-content-collapsed');
      element.classList.add('topical-content-reveal');
    });

    // Preserve the app's own empty-state visibility after removing our collapsed class.
    if (emptyTopics.hidden) emptyTopics.classList.remove('topical-content-reveal');

    const launcher = document.getElementById('openTopicalPapers');
    launcher?.setAttribute('aria-expanded', 'true');
    const action = launcher?.querySelector('.topical-launcher-action');
    const status = launcher?.querySelector('.topical-launcher-status');
    if (action) action.innerHTML = 'Topical papers opened <b>✓</b>';
    if (status) status.textContent = 'NOW OPEN';

    topicalHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  new MutationObserver(updateResourceHeading).observe(subjectHero, { childList: true, subtree: true });
  updateResourceHeading();

  document.getElementById('openTopicalPapers')?.addEventListener('click', revealTopicalPapers);

  hub.addEventListener('click', event => {
    const button = event.target.closest('[data-study-resource]');
    if (!button) return;
    const resource = button.dataset.studyResource;
    const message = `${resource} for ${currentSubjectName()} will appear here when the PDFs are uploaded.`;
    if (typeof showToast === 'function') showToast(message);
  });
})();
