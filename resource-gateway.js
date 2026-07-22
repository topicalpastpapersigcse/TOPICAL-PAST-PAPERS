// Subject resource gateway — four main options only.
(() => {
  const BUILD = '38';
  const hero = document.getElementById('subjectHero');
  const page = document.getElementById('subjectPage');
  const toolbar = page?.querySelector('.subject-toolbar');
  const grid = document.getElementById('topicGrid');
  const empty = document.getElementById('emptyTopics');
  if (!hero || !page || !toolbar || !grid || !empty) return;

  document.querySelectorAll('.extra-resource-hub,.topical-section-heading,.final-resource-hub,.website-tools-strip').forEach(el => el.remove());

  const style = document.createElement('style');
  style.id = 'resourceGatewayStyleV38';
  style.textContent = `
    .website-tools-strip{display:none!important}
    .final-resource-hub{position:relative;overflow:hidden;margin:26px 0 30px;padding:30px;border:1px solid rgba(85,115,190,.42);border-radius:24px;background:linear-gradient(145deg,#071124,#0a1022);box-shadow:0 22px 60px rgba(0,0,0,.3)}
    .final-resource-hub:before{content:"";position:absolute;width:390px;height:390px;border-radius:50%;right:-170px;top:-225px;background:rgba(90,65,255,.26);filter:blur(12px)}
    .final-resource-head{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:22px}
    .final-resource-head h2{margin:10px 0 6px;font-size:31px}.final-resource-head p{margin:0;color:#91a2c1;font-size:13px}.final-badge{padding:8px 12px;border-radius:999px;border:1px solid rgba(84,242,169,.34);background:rgba(26,180,112,.12);color:#5ff0b0;font-size:10px;font-weight:950;letter-spacing:.12em}
    .final-topical-button{position:relative;z-index:1;overflow:hidden;width:100%;min-height:145px;margin-bottom:18px;padding:24px 26px;border:1px solid rgba(70,235,192,.55);border-radius:21px;background:linear-gradient(115deg,#071827 0%,#0a2c38 48%,#12394b 100%);color:#fff;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:20px;text-align:left;box-shadow:0 20px 50px rgba(0,0,0,.38),0 0 34px rgba(43,220,176,.14);transition:.22s ease}
    .final-topical-button:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 82% 15%,rgba(61,232,189,.22),transparent 32%),linear-gradient(110deg,transparent 0 58%,rgba(255,197,70,.08) 100%);pointer-events:none}
    .final-topical-button:hover{transform:translateY(-5px);border-color:rgba(111,255,217,.8);box-shadow:0 28px 66px rgba(0,0,0,.46),0 0 42px rgba(50,229,184,.24)}
    .final-topical-button>span{position:relative;z-index:1}.final-topical-icon{display:grid;place-items:center;width:78px;height:78px;border-radius:20px;background:linear-gradient(145deg,#0c4d55,#16366c);border:1px solid rgba(105,255,220,.42);font-size:35px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 14px 30px rgba(0,0,0,.28)}
    .final-topical-copy{display:grid;gap:6px}.final-topical-copy small{font-size:10px;font-weight:950;letter-spacing:.15em;color:#70f0ca}.final-topical-copy strong{font-size:clamp(27px,2.4vw,38px);line-height:1;color:#fff}.final-topical-copy span{font-size:13px;color:#bed5dc;line-height:1.55}
    .final-topical-cta{display:grid;justify-items:end;gap:9px}.final-topical-status{padding:6px 10px;border:1px solid rgba(105,255,217,.38);border-radius:999px;background:rgba(13,91,75,.42);color:#7ff5d1;font-size:9px;font-weight:950;letter-spacing:.11em}.final-topical-action{padding:14px 18px;border-radius:12px;background:linear-gradient(100deg,#ffd768,#ffb633);color:#172033;font-size:14px;font-weight:950;box-shadow:0 13px 30px rgba(255,180,48,.22)}
    .final-resource-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.final-resource-card{min-height:230px;padding:22px;border:1px solid #1c3156;border-radius:19px;background:linear-gradient(150deg,#0b172b,#07101f);display:flex;flex-direction:column;transition:.22s ease}.final-resource-card:hover{transform:translateY(-5px);border-color:#4c73b4;box-shadow:0 20px 42px rgba(0,0,0,.34)}
    .final-card-top{display:flex;align-items:center;justify-content:space-between}.final-card-icon{display:grid;place-items:center;width:55px;height:55px;border-radius:15px;background:linear-gradient(145deg,#19356a,#30247b);font-size:25px}.final-card-status{padding:6px 9px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#9dabc3;font-size:9px;font-weight:950;letter-spacing:.1em}.final-resource-card h3{margin:19px 0 8px;font-size:21px}.final-resource-card p{margin:0 0 20px;color:#91a1bd;font-size:12px;line-height:1.65}
    .final-resource-card button{margin-top:auto;width:100%;min-height:49px;border-radius:12px;color:#fff;font-weight:950;border:1px solid rgba(255,255,255,.16);box-shadow:0 12px 28px rgba(0,0,0,.25);transition:.2s ease}.final-resource-card button:hover{transform:translateY(-2px);filter:brightness(1.15)}.final-notes button{background:linear-gradient(100deg,#1e67ff,#394cf0)}.final-mocks button{background:linear-gradient(100deg,#7b3ff2,#9846dc)}.final-predicted button{background:linear-gradient(100deg,#ed7b1f,#d94d45)}
    .final-topical-hidden{display:none!important}
    @media(max-width:1000px){.final-topical-button{grid-template-columns:auto 1fr}.final-topical-cta{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;width:100%}.final-resource-grid{grid-template-columns:1fr}}
    @media(max-width:620px){.final-resource-hub{padding:20px}.final-resource-head{display:grid}.final-badge{justify-self:start}.final-topical-button{grid-template-columns:1fr;padding:21px}.final-topical-cta{display:grid;justify-items:stretch}.final-topical-action{text-align:center}.final-topical-icon{width:62px;height:62px}.final-resource-card{padding:18px}}
  `;
  document.head.appendChild(style);

  const hub = document.createElement('section');
  hub.className = 'final-resource-hub';
  hub.innerHTML = `
    <div class="final-resource-head">
      <div><span class="eyebrow"><i></i> CHOOSE YOUR STUDY RESOURCE</span><h2 id="finalResourceTitle">Study resources</h2><p>Open topical practice, revision notes, mock papers or predicted papers.</p></div>
      <span class="final-badge">4 STUDY OPTIONS</span>
    </div>
    <button id="finalOpenTopical" class="final-topical-button" type="button">
      <span class="final-topical-icon">▦</span>
      <span class="final-topical-copy"><small>AVAILABLE NOW · REAL EXAM PRACTICE</small><strong>Topical Past Papers</strong><span>Open all question packs organised by syllabus topic, with available mark schemes.</span></span>
      <span class="final-topical-cta"><span class="final-topical-status">READY TO PRACTISE</span><span class="final-topical-action">View all topical papers →</span></span>
    </button>
    <div class="final-resource-grid">
      <article class="final-resource-card final-notes"><div class="final-card-top"><span class="final-card-icon">📘</span><span class="final-card-status">COMING SOON</span></div><h3>Revision Notes</h3><p>Clear syllabus notes, formulas, definitions, diagrams and exam tips organised by topic.</p><button type="button" data-final-resource="Revision Notes">Explore revision notes →</button></article>
      <article class="final-resource-card final-mocks"><div class="final-card-top"><span class="final-card-icon">📝</span><span class="final-card-status">COMING SOON</span></div><h3>Mock Papers</h3><p>Full timed practice papers designed to test the complete syllabus under exam conditions.</p><button type="button" data-final-resource="Mock Papers">Explore mock papers →</button></article>
      <article class="final-resource-card final-predicted"><div class="final-card-top"><span class="final-card-icon">✨</span><span class="final-card-status">COMING SOON</span></div><h3>Predicted Papers</h3><p>Focused practice covering important syllabus areas and likely question styles for 2026.</p><button type="button" data-final-resource="Predicted Papers">Explore predicted papers →</button></article>
    </div>`;

  hero.insertAdjacentElement('afterend', hub);
  [toolbar, grid, empty].forEach(el => el.classList.add('final-topical-hidden'));

  const updateTitle = () => {
    const name = hero.querySelector('h1')?.textContent?.trim() || 'Subject';
    const title = document.getElementById('finalResourceTitle');
    if (title) title.textContent = `${name} study resources`;
  };
  new MutationObserver(updateTitle).observe(hero, { childList:true, subtree:true });
  updateTitle();

  document.getElementById('finalOpenTopical')?.addEventListener('click', () => {
    const subject = new URLSearchParams(location.search).get('subject');
    const validSubjects = new Set(['maths','physics','chemistry','accounting']);
    location.href = validSubjects.has(subject)
      ? `topical-papers.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`
      : `index.html?build=${BUILD}`;
  });

  hub.addEventListener('click', event => {
    const button = event.target.closest('[data-final-resource]');
    if (!button) return;
    const name = hero.querySelector('h1')?.textContent?.trim() || 'this subject';
    if (typeof showToast === 'function') showToast(`${button.dataset.finalResource} for ${name} will appear here when the PDFs are uploaded.`);
  });
})();