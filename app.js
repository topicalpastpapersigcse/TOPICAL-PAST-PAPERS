const SUPABASE_URL = "https://zkqfyejxkrkazhjovmwr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wxOGkyVKgF78gHFD7A8BzA__Z80Wnpw";
const SITE_URL = "https://topicalpastpapersigcse.github.io/TOPICAL-PAST-PAPERS/";
const PAYPAL_PLAN_ID = "P-58263651AM188451SNJOJBBQ";

const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const topics = [
  { id: "maths-number", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "01", title: "Number", count: 104, subtopics: ["Number properties, sets and surds", "Accuracy, bounds and standard form", "Number calculations and applications", "Ratio, proportion, rates and money", "Percentages, finance and growth"], questions: "assets/maths/maths-01-number-questions.pdf", answers: "assets/maths/maths-01-number-answers.pdf" },
  { id: "maths-algebra", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "02", title: "Algebra and Graphs", count: 233, subtopics: ["Algebraic manipulation", "Equations and inequalities", "Variation and formulae", "Sequences", "Functions", "Graphs and differentiation"], questions: "assets/maths/maths-02-algebra-graphs-questions.pdf", answers: "assets/maths/maths-02-algebra-graphs-answers.pdf" },
  { id: "maths-coordinate", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "03", title: "Coordinate Geometry", count: 34, subtopics: ["Coordinates, length and midpoint", "Gradients and equations of lines", "Parallel and perpendicular lines"], questions: "assets/maths/maths-03-coordinate-geometry-questions.pdf", answers: "assets/maths/maths-03-coordinate-geometry-answers.pdf" },
  { id: "maths-geometry", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "04", title: "Geometry", count: 29, subtopics: ["Circle geometry", "Constructions, loci and scale drawings", "Similarity and congruence"], questions: "assets/maths/maths-04-geometry-questions.pdf", answers: "assets/maths/maths-04-geometry-answers.pdf" },
  { id: "maths-mensuration", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "05", title: "Mensuration", count: 116, subtopics: ["Perimeter, area and compound shapes", "Circles, arcs and sectors", "Surface area and volume"], questions: "assets/maths/maths-05-mensuration-questions.pdf", answers: "assets/maths/maths-05-mensuration-answers.pdf" },
  { id: "maths-trigonometry", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "06", title: "Trigonometry", count: 50, subtopics: ["Pythagoras and right-angled trigonometry", "Sine rule, cosine rule and triangle area", "Bearings and three-dimensional trigonometry", "Trigonometric graphs and equations"], questions: "assets/maths/maths-06-trigonometry-questions.pdf", answers: "assets/maths/maths-06-trigonometry-answers.pdf" },
  { id: "maths-transformations", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "07", title: "Transformations and Vectors", count: 67, subtopics: ["Transformations", "Vectors"], questions: "assets/maths/maths-07-transformations-vectors-questions.pdf", answers: "assets/maths/maths-07-transformations-vectors-answers.pdf" },
  { id: "maths-probability", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "08", title: "Probability", count: 50, subtopics: ["Basic probability and relative frequency", "Combined probability and tree diagrams", "Venn diagrams and probability"], questions: "assets/maths/maths-08-probability-questions.pdf", answers: "assets/maths/maths-08-probability-answers.pdf" },
  { id: "maths-statistics", subject: "maths", code: "0580 · Paper 4 · Last 5 years", number: "09", title: "Statistics", count: 68, subtopics: ["Data presentation", "Scatter diagrams and sampling", "Cumulative frequency and box plots", "Histograms"], questions: "assets/maths/maths-09-statistics-questions.pdf", answers: "assets/maths/maths-09-statistics-answers.pdf" },
  { id: "maths-legacy-matrices", subject: "maths", code: "0580 · Legacy practice · Removed syllabus content", number: "10", title: "Legacy Matrices", count: 2, subtopics: ["Matrices (legacy content removed from the current syllabus)"], questions: "assets/maths/maths-10-legacy-matrices-questions.pdf", answers: "assets/maths/maths-10-legacy-matrices-answers.pdf", legacy: true },
  { id: "physics-motion", subject: "physics", code: "0625 · Paper 4 · Last 5 years", number: "01", title: "Motion, Forces and Energy", count: 79, subtopics: ["Scalars, vectors and motion", "Speed-time graphs and forces", "Forces, acceleration and Newton’s laws", "Momentum and impulse", "Circular motion and forces", "Density", "Pressure", "Moments and equilibrium", "Springs and Hooke’s law", "Work, energy, power and efficiency", "Mixed motion and forces"], questions: "assets/physics/physics-01-motion-forces-energy-premium.pdf" },
  { id: "physics-thermal", subject: "physics", code: "0625 · Paper 4 · Last 5 years", number: "02", title: "Thermal Physics", count: 47, subtopics: ["Particle model and internal energy", "Gas pressure and kinetic model", "Specific heat capacity", "Specific latent heat and changes of state", "Evaporation", "Mixed thermal physics"], questions: "assets/physics/physics-02-thermal-physics-premium.pdf" },
  { id: "physics-waves", subject: "physics", code: "0625 · Paper 4 · Last 5 years", number: "03", title: "Waves", count: 59, subtopics: ["Wave properties", "Reflection of waves", "Sound and ultrasound", "Light, refraction and lenses", "Electromagnetic spectrum", "Medical imaging", "Mixed waves"], questions: "assets/physics/physics-03-waves-premium.pdf" },
  { id: "physics-electricity", subject: "physics", code: "0625 · Paper 4 · Last 5 years", number: "04", title: "Electricity and Magnetism", count: 102, subtopics: ["Current, charge and potential difference", "Electric circuits and resistance", "A.C. and D.C. circuits", "Magnetism and magnetic fields", "Electromagnetic induction", "Generators and motors", "Transformers", "Digital electronics and logic gates"], questions: "assets/physics/physics-04-electricity-magnetism-premium.pdf" },
  { id: "physics-nuclear", subject: "physics", code: "0625 · Paper 4 · Last 5 years", number: "05", title: "Nuclear Physics", count: 39, subtopics: ["Atoms, nuclei and isotopes", "Alpha, beta and gamma radiation", "Half-life", "Nuclear fission and fusion", "Mixed radioactivity"], questions: "assets/physics/physics-05-nuclear-physics-premium.pdf" },
  { id: "physics-space", subject: "physics", code: "0625 · Paper 4 · Last 5 years", number: "06", title: "Space Physics", count: 27, subtopics: ["Solar System and accretion model", "Comets and orbits", "Stars, galaxies and the Universe", "Moon phases and orbits", "Planets and the Solar System", "Mixed space physics"], questions: "assets/physics/physics-06-space-physics-premium.pdf" },
  { id: "chemistry-states", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "01", title: "States of Matter", count: 6, subtopics: ["Particle model and changes of state"], questions: "assets/chemistry/chemistry-01-states-of-matter-premium.pdf", answers: "assets/chemistry/chemistry-01-states-of-matter-answers.pdf" },
  { id: "chemistry-atoms", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "02", title: "Atoms, Elements and Compounds", count: 59, subtopics: ["Atomic structure", "Isotopes and ions", "Bonding and structures"], questions: "assets/chemistry/chemistry-02-atoms-elements-compounds-premium.pdf", answers: "assets/chemistry/chemistry-02-atoms-elements-compounds-answers.pdf" },
  { id: "chemistry-stoichiometry", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "03", title: "Stoichiometry", count: 33, subtopics: ["Moles", "Formulae and equations", "Chemical calculations"], questions: "assets/chemistry/chemistry-03-stoichiometry-premium.pdf", answers: "assets/chemistry/chemistry-03-stoichiometry-answers.pdf" },
  { id: "chemistry-electrochemistry", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "04", title: "Electrochemistry", count: 19, subtopics: ["Electrolysis", "Electrode reactions"], questions: "assets/chemistry/chemistry-04-electrochemistry-premium.pdf", answers: "assets/chemistry/chemistry-04-electrochemistry-answers.pdf" },
  { id: "chemistry-energetics", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "05", title: "Chemical Energetics", count: 3, subtopics: ["Exothermic and endothermic changes", "Bond energies"], questions: "assets/chemistry/chemistry-05-chemical-energetics-premium.pdf", answers: "assets/chemistry/chemistry-05-chemical-energetics-answers.pdf" },
  { id: "chemistry-reactions", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "06", title: "Chemical Reactions", count: 11, subtopics: ["Rates of reaction", "Equilibrium", "Redox and displacement"], questions: "assets/chemistry/chemistry-06-chemical-reactions-premium.pdf", answers: "assets/chemistry/chemistry-06-chemical-reactions-answers.pdf" },
  { id: "chemistry-acids", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "07", title: "Acids, Bases and Salts", count: 24, subtopics: ["Acids and bases", "Preparation of salts", "The pH scale"], questions: "assets/chemistry/chemistry-07-acids-bases-salts-premium.pdf", answers: "assets/chemistry/chemistry-07-acids-bases-salts-answers.pdf" },
  { id: "chemistry-periodic", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "08", title: "The Periodic Table", count: 10, subtopics: ["Groups in the Periodic Table", "Patterns and trends"], questions: "assets/chemistry/chemistry-08-periodic-table-premium.pdf", answers: "assets/chemistry/chemistry-08-periodic-table-answers.pdf" },
  { id: "chemistry-metals", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "09", title: "Metals", count: 20, subtopics: ["Properties of metals", "Reactivity series", "Extraction", "Corrosion"], questions: "assets/chemistry/chemistry-09-metals-premium.pdf", answers: "assets/chemistry/chemistry-09-metals-answers.pdf" },
  { id: "chemistry-environment", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "10", title: "Chemistry of the Environment", count: 14, subtopics: ["Air and water", "Climate", "Industrial chemistry"], questions: "assets/chemistry/chemistry-10-environment-premium.pdf", answers: "assets/chemistry/chemistry-10-environment-answers.pdf" },
  { id: "chemistry-organic", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "11", title: "Organic Chemistry", count: 56, subtopics: ["Hydrocarbons and fuels", "Functional groups", "Organic reactions", "Polymers"], questions: "assets/chemistry/chemistry-11-organic-chemistry-premium.pdf", answers: "assets/chemistry/chemistry-11-organic-chemistry-answers.pdf" },
  { id: "chemistry-experimental", subject: "chemistry", code: "0620 · Paper 4 · Last 5 years", number: "12", title: "Experimental Techniques and Analysis", count: 1, subtopics: ["Separation methods", "Titration", "Chemical tests"], questions: "assets/chemistry/chemistry-12-experimental-analysis-premium.pdf", answers: "assets/chemistry/chemistry-12-experimental-analysis-answers.pdf" },
  { id: "accounting-fundamentals", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "01", title: "The Fundamentals of Accounting", count: 0, subtopics: ["Purpose of accounting", "Accounting equation"], questions: "assets/accounting/accounting-01-fundamentals-premium.pdf" },
  { id: "accounting-sources", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "02", title: "Sources and Recording of Data", count: 27, subtopics: ["Double-entry bookkeeping", "Books of prime entry"], questions: "assets/accounting/accounting-02-sources-recording-premium.pdf" },
  { id: "accounting-verification", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "03", title: "Verification of Accounting Records", count: 28, subtopics: ["Correction of errors", "Bank reconciliation", "Control accounts"], questions: "assets/accounting/accounting-03-verification-records-premium.pdf" },
  { id: "accounting-procedures", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "04", title: "Accounting Procedures", count: 21, subtopics: ["Capital and revenue expenditure", "Depreciation and disposal", "Irrecoverable debts and provisions", "Valuation of inventory"], questions: "assets/accounting/accounting-04-procedures-premium.pdf" },
  { id: "accounting-statements", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "05", title: "Preparation of Financial Statements", count: 41, subtopics: ["Sole traders", "Partnerships", "Limited companies", "Clubs and societies", "Manufacturing accounts", "Incomplete records"], questions: "assets/accounting/accounting-05-financial-statements-premium.pdf" },
  { id: "accounting-analysis", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "06", title: "Analysis and Interpretation", count: 13, subtopics: ["Calculation of accounting ratios", "Understanding and interpreting ratios"], questions: "assets/accounting/accounting-06-analysis-interpretation-premium.pdf" },
  { id: "accounting-principles", subject: "accounting", code: "0452 · Paper 2 · Last 5 years", number: "07", title: "Accounting Principles and Policies", count: 0, subtopics: ["Accounting principles", "Accounting policies"], questions: "assets/accounting/accounting-07-principles-policies-premium.pdf" }
];

const subjectMeta = {
  chemistry: {
    name: 'Chemistry', code: '0620', icon: 'C', access: 'free', period: 'Last 5 years',
    description: 'Every Chemistry syllabus topic includes topical questions from the last 5 years, with supplied mark schemes.',
    note: 'Complete syllabus coverage · Questions + mark schemes'
  },
  maths: {
    name: 'Mathematics', code: '0580', icon: 'M', access: 'premium', period: 'Last 5 years',
    description: 'Every Mathematics syllabus topic includes topical questions from the last 5 years, with supplied mark schemes.',
    note: 'Complete syllabus coverage · Questions + mark schemes'
  },
  physics: {
    name: 'Physics', code: '0625', icon: 'P', access: 'premium', period: 'Last 5 years',
    description: 'Every Physics syllabus topic includes topical questions selected from the last 5 years.',
    note: 'Complete syllabus coverage · Last 5 years'
  },
  accounting: {
    name: 'Accounting', code: '0452', icon: 'A', access: 'premium', period: 'Last 5 years',
    description: 'Every Accounting syllabus topic includes topical questions selected from the last 5 years.',
    note: 'Complete syllabus coverage · Last 5 years'
  }
};


const subjectOrder = ['maths','physics','chemistry','accounting'];
const palette = {
  maths:{cls:'maths-bg',icon:'M'}, physics:{cls:'physics-bg',icon:'P'}, chemistry:{cls:'chemistry-bg',icon:'C'}, accounting:{cls:'accounting-bg',icon:'A'}
};
const premiumSubjects = new Set(['maths','physics','accounting']);
let session = null;
let profile = null;
let paypalRenderedFor = null;
let currentSubject = null;

const $ = s => document.querySelector(s);
const els = {
  dashboardPage: $('#dashboardPage'), subjectPage: $('#subjectPage'), subjectGrid: $('#subjectGrid'), sideSubjects: $('#sideSubjects'),
  subjectHero: $('#subjectHero'), topicGrid: $('#topicGrid'), topicSearch: $('#topicSearch'), globalSearch: $('#globalSearch'), emptyTopics: $('#emptyTopics'),
  topTitle: $('#topTitle'), topSubtitle: $('#topSubtitle'), premiumDialog: $('#premiumDialog'), closePremium: $('#closePremium'),
  signedOutPayment: $('#signedOutPayment'), signedInPayment: $('#signedInPayment'), premiumActive: $('#premiumActive'), payEmail: $('#payEmail'), paymentMessage: $('#paymentMessage'),
  toast: $('#toast'), progressRing: $('#progressRing'), ringText: $('#ringText'), overallPercent: $('#overallPercent'), progressText: $('#progressText')
};

function getCompleted(){try{return new Set(JSON.parse(localStorage.getItem('igcse-completed-topics')||'[]'))}catch{return new Set()}}
function isPremiumActive(){return !!(profile?.premium_until && new Date(profile.premium_until).getTime()>Date.now())}
function totalQuestions(subject){return topics.filter(t=>t.subject===subject).reduce((a,t)=>a+(t.count||0),0)}
function showToast(msg){els.toast.textContent=msg;els.toast.hidden=false;clearTimeout(showToast.t);showToast.t=setTimeout(()=>els.toast.hidden=true,3500)}
function subjectUrl(subject){return `index.html?subject=${encodeURIComponent(subject)}`}

function renderSideSubjects(){
  els.sideSubjects.innerHTML=subjectOrder.map(s=>{
    const m=subjectMeta[s],p=palette[s];
    return `<a class="side-subject ${currentSubject===s?'active':''}" href="${subjectUrl(s)}" target="_blank"><span class="subject-dot ${p.cls}">${p.icon}</span><span>${m.code} ${m.name}</span>${m.access==='free'?'<span class="side-free">★ FREE</span>':''}</a>`
  }).join('');
}

function subjectCard(s){
  const m=subjectMeta[s],p=palette[s], subjectTopics=topics.filter(t=>t.subject===s), free=m.access==='free';
  return `<article class="subject-card" data-name="${m.name.toLowerCase()} ${m.code}">
    <div class="subject-card-top"><div class="big-icon ${p.cls}">${p.icon}</div><span class="badge ${free?'free':'premium'}">${free?'★ FREE':'♛ PREMIUM'}</span></div>
    <div class="code">CAMBRIDGE IGCSE · ${m.code}</div><h3>${m.name}</h3>
    <p>Every topic in the syllabus includes organised topical questions from the last 5 years.</p>
    <div class="subject-stats"><span><b>${subjectTopics.length}</b> topics</span><span><b>${totalQuestions(s)}</b> questions</span></div>
    <button class="${p.cls}" type="button" data-open-subject="${s}">Open ${m.name} →</button>
  </article>`;
}

function renderDashboardSubjects(filter=''){
  const q=filter.trim().toLowerCase();
  els.subjectGrid.innerHTML=subjectOrder.filter(s=>{
    const m=subjectMeta[s]; return !q || `${m.name} ${m.code}`.toLowerCase().includes(q);
  }).map(subjectCard).join('');
}

function updateProgress(){
  const done=getCompleted().size, pct=Math.round(done/topics.length*100);
  els.overallPercent.textContent=`${pct}%`; els.ringText.textContent=`${pct}%`; els.progressText.textContent=`${done} of ${topics.length} topics completed`;
  els.progressRing.style.setProperty('--angle',`${pct*3.6}deg`);
}

function openSubject(subject){ window.open(subjectUrl(subject),'_blank','noopener'); }
function showDashboard(){
  currentSubject=null; els.dashboardPage.hidden=false; els.subjectPage.hidden=true; els.topTitle.textContent='Dashboard'; els.topSubtitle.textContent='Topical IGCSE Past Papers';
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.dataset.page==='dashboard')); renderSideSubjects();
}

function topicCard(topic){
  const meta=subjectMeta[topic.subject], p=palette[topic.subject], free=meta.access==='free', unlocked=free||isPremiumActive();
  const answer=!!topic.answers;
  return `<article class="topic-card" data-search="${(topic.title+' '+topic.subtopics.join(' ')).toLowerCase()}">
    <div class="topic-head"><div class="topic-number ${p.cls}">${topic.number}</div><div><h3>${topic.title}</h3><div class="topic-code">${topic.code}</div></div></div>
    <div class="topic-info"><span class="chip">${topic.count||'Topic'} questions</span><span class="chip">${answer?'Questions + mark scheme':'Question paper'}</span><span class="chip">${free?'Free':unlocked?'Premium active':'Premium'}</span></div>
    <ul class="subtopic-list">${topic.subtopics.slice(0,5).map(x=>`<li>${x}</li>`).join('')}</ul>
    <div class="topic-actions">
      <button class="${unlocked?'primary '+p.cls:'locked'}" data-resource="questions" data-id="${topic.id}" type="button">${unlocked?'Open questions ↗':'🔒 Unlock questions'}</button>
      ${answer?`<button class="${unlocked?'':'locked'}" data-resource="answers" data-id="${topic.id}" type="button">${unlocked?'Mark scheme ↗':'🔒 Unlock mark scheme'}</button>`:''}
    </div>
  </article>`;
}

function renderSubjectPage(subject, filter=''){
  currentSubject=subject; const meta=subjectMeta[subject], p=palette[subject];
  if(!meta){showDashboard();return}
  els.dashboardPage.hidden=true; els.subjectPage.hidden=false; els.topTitle.textContent=meta.name; els.topSubtitle.textContent=`Cambridge IGCSE ${meta.code}`;
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.remove('active')); renderSideSubjects();
  const subTopics=topics.filter(t=>t.subject===subject), ans=subTopics.filter(t=>t.answers).length;
  els.subjectHero.className=`subject-hero ${p.cls}`;
  els.subjectHero.innerHTML=`<div><span class="eyebrow" style="color:#fff9">CAMBRIDGE IGCSE ${meta.code}</span><h1>${meta.name}</h1><p>Every topic in the syllabus has topical questions from the last 5 years. Open question papers and supplied mark schemes in separate full-screen tabs.</p></div><div class="hero-metrics"><div><strong>${subTopics.length}</strong><span>Syllabus topics</span></div><div><strong>${totalQuestions(subject)}</strong><span>Questions</span></div><div><strong>${ans}</strong><span>Mark schemes</span></div><div><strong>${meta.access==='free'?'Free':'Premium'}</strong><span>Access</span></div></div>`;
  const q=filter.trim().toLowerCase(); const filtered=subTopics.filter(t=>!q || `${t.title} ${t.subtopics.join(' ')}`.toLowerCase().includes(q));
  els.topicGrid.innerHTML=filtered.map(topicCard).join(''); els.emptyTopics.hidden=filtered.length>0;
}

function openPdf(file){
  const url=new URL(file,window.location.href); url.hash='view=FitH'; const w=window.open(url.href,'_blank','noopener,noreferrer');
  if(!w) showToast('Allow pop-ups for this website, then try again.');
}
function requestResource(topic,kind){
  const unlocked=subjectMeta[topic.subject].access==='free'||isPremiumActive();
  if(!unlocked){showPremium();return}
  const file=kind==='answers'?topic.answers:topic.questions; if(file) openPdf(file);
}

async function loadProfile(){
  if(!session?.user||!supabaseClient){profile=null;return}
  const {data}=await supabaseClient.from('profiles').select('*').eq('id',session.user.id).maybeSingle(); profile=data||null;
}
async function refreshAuth(){
  if(!supabaseClient)return; const {data}=await supabaseClient.auth.getSession(); session=data.session; await loadProfile(); updatePaymentUI(); if(currentSubject)renderSubjectPage(currentSubject,els.topicSearch.value);
}
async function signIn(){
  if(!supabaseClient)return showToast('Google sign-in could not load.');
  const {error}=await supabaseClient.auth.signInWithOAuth({provider:'google',options:{redirectTo:SITE_URL}}); if(error)showToast(error.message);
}
function showPremium(){els.premiumDialog.showModal();updatePaymentUI();if(session?.user&&!isPremiumActive())setTimeout(renderPayPal,100)}
function updatePaymentUI(){
  const active=isPremiumActive(); els.signedOutPayment.hidden=!!session; els.signedInPayment.hidden=!session||active; els.premiumActive.hidden=!active;
  if(session){els.payEmail.textContent=session.user.email||''; if(!active)setTimeout(renderPayPal,50)}
}
function renderPayPal(){
  if(!session?.user||isPremiumActive()||!window.paypal?.Buttons)return; if(paypalRenderedFor===session.user.id)return;
  const c=$('#paypal-button-container-P-58263651AM188451SNJOJBBQ'); if(!c)return; c.innerHTML=''; paypalRenderedFor=session.user.id;
  window.paypal.Buttons({style:{shape:'pill',color:'blue',layout:'vertical',label:'subscribe',height:50},
    createSubscription(_d,a){els.paymentMessage.textContent='Opening secure PayPal checkout…';return a.subscription.create({plan_id:PAYPAL_PLAN_ID,custom_id:session.user.id,application_context:{shipping_preference:'NO_SHIPPING',user_action:'SUBSCRIBE_NOW'}})},
    onApprove(){els.paymentMessage.textContent='Subscription approved. Premium activation is being confirmed.';showToast('Subscription approved. Refresh shortly if access is not active yet.')},
    onCancel(){els.paymentMessage.textContent='Payment cancelled. You were not charged.'},onError(){els.paymentMessage.textContent='PayPal could not complete the subscription.'}
  }).render(c).catch(()=>{paypalRenderedFor=null;els.paymentMessage.textContent='PayPal button could not load. Refresh and try again.'});
}

els.subjectGrid.addEventListener('click',e=>{const b=e.target.closest('[data-open-subject]');if(b)openSubject(b.dataset.openSubject)});
els.sideSubjects.addEventListener('click',e=>{const a=e.target.closest('a');if(a&&innerWidth<760)document.querySelector('.sidebar').classList.remove('open')});
els.topicGrid.addEventListener('click',e=>{const b=e.target.closest('[data-resource]');if(!b)return;const t=topics.find(x=>x.id===b.dataset.id);if(t)requestResource(t,b.dataset.resource)});
els.topicSearch.addEventListener('input',()=>renderSubjectPage(currentSubject,els.topicSearch.value));
els.globalSearch.addEventListener('input',()=>{if(currentSubject){els.topicSearch.value=els.globalSearch.value;renderSubjectPage(currentSubject,els.globalSearch.value)}else renderDashboardSubjects(els.globalSearch.value)});
$('#exploreSubjects').addEventListener('click',()=>$('#subjects').scrollIntoView({behavior:'smooth'}));
$('#continueStudy').addEventListener('click',()=>{const last=localStorage.getItem('igcse-last-subject')||'maths';openSubject(last)});
$('#backSubjects').addEventListener('click',()=>window.open('index.html#subjects','_blank','noopener'));
$('#premiumTop').addEventListener('click',showPremium);$('#upgradeSide').addEventListener('click',showPremium);els.closePremium.addEventListener('click',()=>els.premiumDialog.close());$('#googleSignIn').addEventListener('click',signIn);
$('#mobileMenu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
els.premiumDialog.addEventListener('click',e=>{const r=els.premiumDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)els.premiumDialog.close()});

const params=new URLSearchParams(location.search); const requested=params.get('subject');
renderDashboardSubjects();updateProgress();if(requested&&subjectMeta[requested]){localStorage.setItem('igcse-last-subject',requested);renderSubjectPage(requested)}else showDashboard();
supabaseClient?.auth.onAuthStateChange(async(_e,s)=>{session=s;await loadProfile();updatePaymentUI();if(currentSubject)renderSubjectPage(currentSubject,els.topicSearch.value)});
refreshAuth().catch(console.error);
