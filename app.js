const SUPABASE_URL = "https://zkqfyejxkrkazhjovmwr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wxOGkyVKgF78gHFD7A8BzA__Z80Wnpw";
const SITE_URL = "https://topicalpastpapersigcse.github.io/TOPICAL-PAST-PAPERS/";
const PAYPAL_PLAN_ID = "P-58263651AM188451SNJOJBBQ";

const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const topics = [
  { id: "maths-number", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "01", title: "Number", count: 104, subtopics: ["Number properties, sets and surds", "Accuracy, bounds and standard form", "Number calculations and applications", "Ratio, proportion, rates and money", "Percentages, finance and growth"], questions: "assets/maths/maths-01-number-questions.pdf", answers: "assets/maths/maths-01-number-answers.pdf" },
  { id: "maths-algebra", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "02", title: "Algebra and Graphs", count: 233, subtopics: ["Algebraic manipulation", "Equations and inequalities", "Variation and formulae", "Sequences", "Functions", "Graphs and differentiation"], questions: "assets/maths/maths-02-algebra-graphs-questions.pdf", answers: "assets/maths/maths-02-algebra-graphs-answers.pdf" },
  { id: "maths-coordinate", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "03", title: "Coordinate Geometry", count: 34, subtopics: ["Coordinates, length and midpoint", "Gradients and equations of lines", "Parallel and perpendicular lines"], questions: "assets/maths/maths-03-coordinate-geometry-questions.pdf", answers: "assets/maths/maths-03-coordinate-geometry-answers.pdf" },
  { id: "maths-geometry", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "04", title: "Geometry", count: 29, subtopics: ["Circle geometry", "Constructions, loci and scale drawings", "Similarity and congruence"], questions: "assets/maths/maths-04-geometry-questions.pdf", answers: "assets/maths/maths-04-geometry-answers.pdf" },
  { id: "maths-mensuration", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "05", title: "Mensuration", count: 116, subtopics: ["Perimeter, area and compound shapes", "Circles, arcs and sectors", "Surface area and volume"], questions: "assets/maths/maths-05-mensuration-questions.pdf", answers: "assets/maths/maths-05-mensuration-answers.pdf" },
  { id: "maths-trigonometry", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "06", title: "Trigonometry", count: 50, subtopics: ["Pythagoras and right-angled trigonometry", "Sine rule, cosine rule and triangle area", "Bearings and three-dimensional trigonometry", "Trigonometric graphs and equations"], questions: "assets/maths/maths-06-trigonometry-questions.pdf", answers: "assets/maths/maths-06-trigonometry-answers.pdf" },
  { id: "maths-transformations", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "07", title: "Transformations and Vectors", count: 67, subtopics: ["Transformations", "Vectors"], questions: "assets/maths/maths-07-transformations-vectors-questions.pdf", answers: "assets/maths/maths-07-transformations-vectors-answers.pdf" },
  { id: "maths-probability", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "08", title: "Probability", count: 50, subtopics: ["Basic probability and relative frequency", "Combined probability and tree diagrams", "Venn diagrams and probability"], questions: "assets/maths/maths-08-probability-questions.pdf", answers: "assets/maths/maths-08-probability-answers.pdf" },
  { id: "maths-statistics", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "09", title: "Statistics", count: 68, subtopics: ["Data presentation", "Scatter diagrams and sampling", "Cumulative frequency and box plots", "Histograms"], questions: "assets/maths/maths-09-statistics-questions.pdf", answers: "assets/maths/maths-09-statistics-answers.pdf" },
  { id: "maths-legacy-matrices", subject: "maths", code: "0580 · Legacy practice · Removed syllabus content", number: "10", title: "Legacy Matrices", count: 2, subtopics: ["Matrices (legacy content removed from the current syllabus)"], questions: "assets/maths/maths-10-legacy-matrices-questions.pdf", answers: "assets/maths/maths-10-legacy-matrices-answers.pdf", legacy: true },
  { id: "physics-motion", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "01", title: "Motion, Forces and Energy", count: 79, subtopics: ["Scalars, vectors and motion", "Speed-time graphs and forces", "Forces, acceleration and Newton’s laws", "Momentum and impulse", "Circular motion and forces", "Density", "Pressure", "Moments and equilibrium", "Springs and Hooke’s law", "Work, energy, power and efficiency", "Mixed motion and forces"], questions: "assets/physics/physics-01-motion-forces-energy-premium.pdf" },
  { id: "physics-thermal", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "02", title: "Thermal Physics", count: 47, subtopics: ["Particle model and internal energy", "Gas pressure and kinetic model", "Specific heat capacity", "Specific latent heat and changes of state", "Evaporation", "Mixed thermal physics"], questions: "assets/physics/physics-02-thermal-physics-premium.pdf" },
  { id: "physics-waves", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "03", title: "Waves", count: 59, subtopics: ["Wave properties", "Reflection of waves", "Sound and ultrasound", "Light, refraction and lenses", "Electromagnetic spectrum", "Medical imaging", "Mixed waves"], questions: "assets/physics/physics-03-waves-premium.pdf" },
  { id: "physics-electricity", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "04", title: "Electricity and Magnetism", count: 102, subtopics: ["Current, charge and potential difference", "Electric circuits and resistance", "A.C. and D.C. circuits", "Magnetism and magnetic fields", "Electromagnetic induction", "Generators and motors", "Transformers", "Digital electronics and logic gates"], questions: "assets/physics/physics-04-electricity-magnetism-premium.pdf" },
  { id: "physics-nuclear", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "05", title: "Nuclear Physics", count: 39, subtopics: ["Atoms, nuclei and isotopes", "Alpha, beta and gamma radiation", "Half-life", "Nuclear fission and fusion", "Mixed radioactivity"], questions: "assets/physics/physics-05-nuclear-physics-premium.pdf" },
  { id: "physics-space", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "06", title: "Space Physics", count: 27, subtopics: ["Solar System and accretion model", "Comets and orbits", "Stars, galaxies and the Universe", "Moon phases and orbits", "Planets and the Solar System", "Mixed space physics"], questions: "assets/physics/physics-06-space-physics-premium.pdf" },
  { id: "chemistry-states", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "01", title: "States of Matter", count: 6, subtopics: ["Particle model and changes of state"], questions: "assets/chemistry/chemistry-01-states-of-matter-premium.pdf", answers: "assets/chemistry/chemistry-01-states-of-matter-answers.pdf" },
  { id: "chemistry-atoms", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "02", title: "Atoms, Elements and Compounds", count: 59, subtopics: ["Atomic structure", "Isotopes and ions", "Bonding and structures"], questions: "assets/chemistry/chemistry-02-atoms-elements-compounds-premium.pdf", answers: "assets/chemistry/chemistry-02-atoms-elements-compounds-answers.pdf" },
  { id: "chemistry-stoichiometry", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "03", title: "Stoichiometry", count: 33, subtopics: ["Moles", "Formulae and equations", "Chemical calculations"], questions: "assets/chemistry/chemistry-03-stoichiometry-premium.pdf", answers: "assets/chemistry/chemistry-03-stoichiometry-answers.pdf" },
  { id: "chemistry-electrochemistry", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "04", title: "Electrochemistry", count: 19, subtopics: ["Electrolysis", "Electrode reactions"], questions: "assets/chemistry/chemistry-04-electrochemistry-premium.pdf", answers: "assets/chemistry/chemistry-04-electrochemistry-answers.pdf" },
  { id: "chemistry-energetics", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "05", title: "Chemical Energetics", count: 3, subtopics: ["Exothermic and endothermic changes", "Bond energies"], questions: "assets/chemistry/chemistry-05-chemical-energetics-premium.pdf", answers: "assets/chemistry/chemistry-05-chemical-energetics-answers.pdf" },
  { id: "chemistry-reactions", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "06", title: "Chemical Reactions", count: 11, subtopics: ["Rates of reaction", "Equilibrium", "Redox and displacement"], questions: "assets/chemistry/chemistry-06-chemical-reactions-premium.pdf", answers: "assets/chemistry/chemistry-06-chemical-reactions-answers.pdf" },
  { id: "chemistry-acids", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "07", title: "Acids, Bases and Salts", count: 24, subtopics: ["Acids and bases", "Preparation of salts", "The pH scale"], questions: "assets/chemistry/chemistry-07-acids-bases-salts-premium.pdf", answers: "assets/chemistry/chemistry-07-acids-bases-salts-answers.pdf" },
  { id: "chemistry-periodic", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "08", title: "The Periodic Table", count: 10, subtopics: ["Groups in the Periodic Table", "Patterns and trends"], questions: "assets/chemistry/chemistry-08-periodic-table-premium.pdf", answers: "assets/chemistry/chemistry-08-periodic-table-answers.pdf" },
  { id: "chemistry-metals", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "09", title: "Metals", count: 20, subtopics: ["Properties of metals", "Reactivity series", "Extraction", "Corrosion"], questions: "assets/chemistry/chemistry-09-metals-premium.pdf", answers: "assets/chemistry/chemistry-09-metals-answers.pdf" },
  { id: "chemistry-environment", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "10", title: "Chemistry of the Environment", count: 14, subtopics: ["Air and water", "Climate", "Industrial chemistry"], questions: "assets/chemistry/chemistry-10-environment-premium.pdf", answers: "assets/chemistry/chemistry-10-environment-answers.pdf" },
  { id: "chemistry-organic", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "11", title: "Organic Chemistry", count: 56, subtopics: ["Hydrocarbons and fuels", "Functional groups", "Organic reactions", "Polymers"], questions: "assets/chemistry/chemistry-11-organic-chemistry-premium.pdf", answers: "assets/chemistry/chemistry-11-organic-chemistry-answers.pdf" },
  { id: "chemistry-experimental", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "12", title: "Experimental Techniques and Analysis", count: 1, subtopics: ["Separation methods", "Titration", "Chemical tests"], questions: "assets/chemistry/chemistry-12-experimental-analysis-premium.pdf", answers: "assets/chemistry/chemistry-12-experimental-analysis-answers.pdf" },
  { id: "accounting-fundamentals", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "01", title: "The Fundamentals of Accounting", count: 0, subtopics: ["Purpose of accounting", "Accounting equation"], questions: "assets/accounting/accounting-01-fundamentals-premium.pdf" },
  { id: "accounting-sources", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "02", title: "Sources and Recording of Data", count: 27, subtopics: ["Double-entry bookkeeping", "Books of prime entry"], questions: "assets/accounting/accounting-02-sources-recording-premium.pdf" },
  { id: "accounting-verification", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "03", title: "Verification of Accounting Records", count: 28, subtopics: ["Correction of errors", "Bank reconciliation", "Control accounts"], questions: "assets/accounting/accounting-03-verification-records-premium.pdf" },
  { id: "accounting-procedures", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "04", title: "Accounting Procedures", count: 21, subtopics: ["Capital and revenue expenditure", "Depreciation and disposal", "Irrecoverable debts and provisions", "Valuation of inventory"], questions: "assets/accounting/accounting-04-procedures-premium.pdf" },
  { id: "accounting-statements", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "05", title: "Preparation of Financial Statements", count: 41, subtopics: ["Sole traders", "Partnerships", "Limited companies", "Clubs and societies", "Manufacturing accounts", "Incomplete records"], questions: "assets/accounting/accounting-05-financial-statements-premium.pdf" },
  { id: "accounting-analysis", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "06", title: "Analysis and Interpretation", count: 13, subtopics: ["Calculation of accounting ratios", "Understanding and interpreting ratios"], questions: "assets/accounting/accounting-06-analysis-interpretation-premium.pdf" },
  { id: "accounting-principles", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "07", title: "Accounting Principles and Policies", count: 0, subtopics: ["Accounting principles", "Accounting policies"], questions: "assets/accounting/accounting-07-principles-policies-premium.pdf" }
];

const subjectMeta = {
  chemistry: {
    name: 'Chemistry', code: '0620', icon: 'C', access: 'free', period: '2020-2025',
    description: 'Paper 4 topical questions with a matching answer booklet for every Chemistry topic.',
    note: '12 question banks + 12 answer booklets'
  },
  maths: {
    name: 'Mathematics', code: '0580', icon: 'M', access: 'premium', period: '2015-2024',
    description: 'Extended Paper 4 practice arranged by topic, with matching answer booklets for every section.',
    note: '10 question banks + 10 answer booklets'
  },
  physics: {
    name: 'Physics', code: '0625', icon: 'P', access: 'premium', period: '2021-2025',
    description: 'Paper 4 topical question banks covering motion, thermal physics, waves, electricity, nuclear and space physics.',
    note: '6 premium question banks - answers not included in this ZIP'
  },
  accounting: {
    name: 'Accounting', code: '0452', icon: 'A', access: 'premium', period: '2021-2025',
    description: 'Paper 2 topical question banks for recording, verification, procedures, statements and analysis.',
    note: '7 premium question banks - answers not included in this ZIP'
  }
};

const subjectOrder = ['chemistry', 'maths', 'physics', 'accounting'];
const premiumSubjects = new Set(['maths', 'physics', 'accounting']);

const els = {
  accountButton: document.querySelector('#accountButton'),
  accountButtonText: document.querySelector('#accountButtonText'),
  accountDialog: document.querySelector('#accountDialog'),
  accountClose: document.querySelector('#accountClose'),
  signedOutAccount: document.querySelector('#signedOutAccount'),
  signedInAccount: document.querySelector('#signedInAccount'),
  googleSignInButton: document.querySelector('#googleSignInButton'),
  premiumGoogleButton: document.querySelector('#premiumGoogleButton'),
  signOutButton: document.querySelector('#signOutButton'),
  accountName: document.querySelector('#accountName'),
  accountEmail: document.querySelector('#accountEmail'),
  accountAvatar: document.querySelector('#accountAvatar'),
  avatarFallback: document.querySelector('#avatarFallback'),
  accountStatus: document.querySelector('#accountStatus'),
  accountExpiry: document.querySelector('#accountExpiry'),
  accountUpgradeButton: document.querySelector('#accountUpgradeButton'),
  navPremiumButton: document.querySelector('#navPremiumButton'),
  heroPremiumButton: document.querySelector('#heroPremiumButton'),
  sectionPremiumButton: document.querySelector('#sectionPremiumButton'),
  premiumDialog: document.querySelector('#premiumDialog'),
  premiumClose: document.querySelector('#premiumClose'),
  paymentSignedOut: document.querySelector('#paymentSignedOut'),
  paymentActive: document.querySelector('#paymentActive'),
  paymentReady: document.querySelector('#paymentReady'),
  paymentUserEmail: document.querySelector('#paymentUserEmail'),
  paymentMessage: document.querySelector('#paymentMessage'),
  premiumActiveText: document.querySelector('#premiumActiveText'),
  continuePremiumButton: document.querySelector('#continuePremiumButton'),
  subjectOverview: document.querySelector('#subjectOverview'),
  subjectSections: document.querySelector('#subjectSections'),
  jumpLinks: document.querySelector('#jumpLinks'),
  searchInput: document.querySelector('#searchInput'),
  resultCount: document.querySelector('#resultCount'),
  activeFilterLabel: document.querySelector('#activeFilterLabel'),
  emptyState: document.querySelector('#emptyState'),
  filterButtons: [...document.querySelectorAll('.filter-pill')],
  progressCircle: document.querySelector('#progressCircle'),
  progressPercent: document.querySelector('#progressPercent'),
  progressLabel: document.querySelector('#progressLabel'),
  panelProgressPercent: document.querySelector('#panelProgressPercent'),
  panelProgressText: document.querySelector('#panelProgressText'),
  pdfDialog: document.querySelector('#pdfDialog'),
  pdfFrame: document.querySelector('#pdfFrame'),
  dialogSubject: document.querySelector('#dialogSubject'),
  dialogTitle: document.querySelector('#dialogTitle'),
  dialogDownload: document.querySelector('#dialogDownload'),
  dialogClose: document.querySelector('#dialogClose'),
  continueButton: document.querySelector('#continueButton'),
  toast: document.querySelector('#toast')
};

let session = null;
let profile = null;
let activeSubject = 'all';
let paypalRenderedForUser = null;
let pendingPremiumFile = null;
let toastTimer = null;

function isPremiumActive() {
  if (!profile?.premium_until) return false;
  return new Date(profile.premium_until).getTime() > Date.now();
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

function showToast(message) {
  if (!els.toast) return;
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { els.toast.hidden = true; }, 4500);
}

function setPaymentMessage(message, type = '') {
  if (!els.paymentMessage) return;
  els.paymentMessage.textContent = message;
  els.paymentMessage.className = `payment-message ${type}`.trim();
}

function getCompleted() {
  try { return new Set(JSON.parse(localStorage.getItem('igcse-completed-topics') || '[]')); }
  catch { return new Set(); }
}

function saveCompleted(set) {
  localStorage.setItem('igcse-completed-topics', JSON.stringify([...set]));
}

function countCompleted(subject = null) {
  const completed = getCompleted();
  return topics.filter(topic => completed.has(topic.id) && (!subject || topic.subject === subject)).length;
}

function updateProgress() {
  const count = countCompleted();
  const percent = Math.round((count / topics.length) * 100);
  if (els.progressPercent) els.progressPercent.textContent = `${percent}%`;
  if (els.progressLabel) els.progressLabel.textContent = `${count} of ${topics.length} topics completed`;
  if (els.panelProgressPercent) els.panelProgressPercent.textContent = `${percent}%`;
  if (els.panelProgressText) els.panelProgressText.textContent = `${count} of ${topics.length} topics completed`;
  if (els.progressCircle) els.progressCircle.style.setProperty('--progress', `${percent * 3.6}deg`);
}

function getSubjectTopics(subject) { return topics.filter(topic => topic.subject === subject); }
function getSubjectQuestionTotal(subject) { return getSubjectTopics(subject).reduce((sum, topic) => sum + (topic.count || 0), 0); }

function subjectOverviewMarkup(subject) {
  const meta = subjectMeta[subject];
  const free = meta.access === 'free';
  const unlocked = free || isPremiumActive();
  const answerCount = getSubjectTopics(subject).filter(topic => topic.answers).length;
  return `
    <article class="subject-overview-card" data-subject="${subject}">
      <div class="subject-overview-top">
        <div class="subject-emblem">${meta.icon}</div>
        <span class="access-label ${free ? 'free' : unlocked ? 'active' : 'premium'}">${free ? 'Free access' : unlocked ? 'Premium active' : 'Premium locked'}</span>
      </div>
      <div class="subject-code">${meta.code} · ${meta.period}</div>
      <h3>${meta.name}</h3>
      <p>${meta.description}</p>
      <div class="overview-stats">
        <span><b>${getSubjectTopics(subject).length}</b> topics</span>
        <span><b>${getSubjectQuestionTotal(subject)}</b> questions</span>
        <span><b>${answerCount}</b> answer booklets</span>
      </div>
      <a class="subject-link subject-jump" href="#section-${subject}" data-set-subject="${subject}">${free || unlocked ? `Open ${meta.name}` : `View locked ${meta.name}`} <span aria-hidden="true">→</span></a>
    </article>`;
}

function cardMarkup(topic) {
  const meta = subjectMeta[topic.subject];
  const free = meta.access === 'free';
  const unlocked = free || isPremiumActive();
  const completed = getCompleted().has(topic.id);
  const shownSubtopics = topic.subtopics.slice(0, 4);
  const more = topic.subtopics.length - shownSubtopics.length;
  const countText = topic.legacy ? `${topic.count} legacy questions` : topic.count ? `${topic.count} question${topic.count === 1 ? '' : 's'}` : 'Topic outline';
  const answerLabel = topic.answers ? 'Questions + answers' : 'Questions only';
  return `
    <article class="topic-card ${unlocked ? '' : 'locked'}" data-id="${topic.id}" data-subject="${topic.subject}">
      <div class="card-top">
        <div class="card-headline">
          <div>
            <div class="card-topline"><i></i>${meta.name} · Topic ${topic.number}</div>
            <h4>${topic.title}</h4>
          </div>
          <button class="card-button complete-button ${completed ? 'completed' : ''}" type="button" data-complete="${topic.id}" aria-label="${completed ? 'Mark topic incomplete' : 'Mark topic complete'}">${completed ? '✓' : '○'}</button>
        </div>
        <div class="topic-code">${topic.code}</div>
        <div class="topic-meta">
          <span class="meta-chip">${countText}</span>
          <span class="meta-chip">${answerLabel}</span>
          <span class="meta-chip access-chip ${free ? 'free' : unlocked ? 'active' : 'premium'}">${free ? 'Free' : unlocked ? 'Unlocked' : 'Premium'}</span>
        </div>
      </div>
      <div class="subtopics">
        ${shownSubtopics.map(item => `<span class="subtopic-pill">${item}</span>`).join('')}
        ${topic.subtopics.slice(4).map(item => `<span class="subtopic-pill extra-subtopic" hidden>${item}</span>`).join('')}
      </div>
      ${more > 0 ? `<button class="subtopics-toggle" type="button" data-more="${more}">+ ${more} more subtopic${more === 1 ? '' : 's'}</button>` : ''}
      ${topic.legacy ? '<div class="legacy-note">Legacy content removed from the current syllabus. Use only for extra practice.</div>' : ''}
      ${!topic.answers && (topic.subject === 'physics' || topic.subject === 'accounting') ? '<div class="answer-note">Answer booklet is not included in the files currently supplied for this topic.</div>' : ''}
      <div class="card-actions">
        <div class="open-group">
          <button class="card-button ${unlocked ? 'primary' : 'unlock'} open-resource" type="button" data-topic-id="${topic.id}" data-file="${topic.questions}" data-kind="Questions">${unlocked ? '▤ Open questions' : '🔒 Unlock questions'}</button>
          ${topic.answers ? `<button class="card-button ${unlocked ? '' : 'unlock'} open-resource" type="button" data-topic-id="${topic.id}" data-file="${topic.answers}" data-kind="Answers">${unlocked ? '✓ Open answers' : '🔒 Unlock answers'}</button>` : ''}
        </div>
      </div>
    </article>`;
}

function sectionMarkup(subject, subjectTopics) {
  const meta = subjectMeta[subject];
  const free = meta.access === 'free';
  const unlocked = free || isPremiumActive();
  const answerCount = subjectTopics.filter(topic => topic.answers).length;
  return `
    <section class="subject-section" id="section-${subject}" data-subject="${subject}">
      <div class="subject-section-head">
        <div>
          <div class="subject-title-wrap">
            <div class="subject-icon">${meta.icon}</div>
            <div><h3>${meta.name}</h3><p>${meta.code} · ${meta.period} · ${meta.note}</p></div>
          </div>
          <div class="subject-summary">${meta.description}</div>
        </div>
        <div class="subject-mini-stats">
          <div><strong>${subjectTopics.length}</strong><span>topics</span></div>
          <div><strong>${subjectTopics.reduce((sum, topic) => sum + (topic.count || 0), 0)}</strong><span>questions</span></div>
          <div><strong>${answerCount}</strong><span>answers</span></div>
          <div><strong>${free ? 'FREE' : unlocked ? 'OPEN' : 'LOCKED'}</strong><span>access</span></div>
        </div>
      </div>
      <div class="topic-grid">${subjectTopics.map(cardMarkup).join('')}</div>
    </section>`;
}

function filteredTopics() {
  const term = els.searchInput.value.trim().toLowerCase();
  return topics.filter(topic => {
    const matchesSubject = activeSubject === 'all' || topic.subject === activeSubject;
    const haystack = [topic.title, topic.code, subjectMeta[topic.subject].name, ...topic.subtopics].join(' ').toLowerCase();
    return matchesSubject && haystack.includes(term);
  });
}

function renderOverview() { els.subjectOverview.innerHTML = subjectOrder.map(subjectOverviewMarkup).join(''); }

function renderLibrary() {
  const filtered = filteredTopics();
  const visibleSubjects = subjectOrder.filter(subject => filtered.some(topic => topic.subject === subject));
  els.subjectSections.innerHTML = visibleSubjects.map(subject => sectionMarkup(subject, filtered.filter(topic => topic.subject === subject))).join('');
  els.jumpLinks.innerHTML = visibleSubjects.map(subject => `<a class="jump-link subject-jump" href="#section-${subject}" data-set-subject="${subject}">${subjectMeta[subject].name}</a>`).join('');
  els.resultCount.textContent = `${filtered.length} topic${filtered.length === 1 ? '' : 's'}`;
  els.activeFilterLabel.textContent = activeSubject === 'all' ? 'across all four subjects' : `in ${subjectMeta[activeSubject].name}`;
  els.emptyState.hidden = filtered.length !== 0;
  els.subjectSections.hidden = filtered.length === 0;
  updateProgress();
}

function updateAccountUI() {
  const user = session?.user;
  const premium = isPremiumActive();
  els.accountButton?.classList.toggle('signed-in', Boolean(user));
  if (els.accountButtonText) els.accountButtonText.textContent = user ? (premium ? 'Premium account' : 'My account') : 'Sign in';
  if (els.signedOutAccount) els.signedOutAccount.hidden = Boolean(user);
  if (els.signedInAccount) els.signedInAccount.hidden = !user;

  if (user) {
    const metadata = user.user_metadata || {};
    const name = metadata.full_name || metadata.name || user.email?.split('@')[0] || 'Account';
    els.accountName.textContent = name;
    els.accountEmail.textContent = user.email || '';
    els.avatarFallback.textContent = name.charAt(0).toUpperCase();
    const avatar = metadata.avatar_url || metadata.picture;
    if (avatar) { els.accountAvatar.src = avatar; els.accountAvatar.hidden = false; els.avatarFallback.hidden = true; }
    else { els.accountAvatar.hidden = true; els.avatarFallback.hidden = false; }
    if (premium) {
      els.accountStatus.textContent = 'Premium active';
      els.accountExpiry.textContent = `Full premium access until ${formatDate(profile.premium_until)}.`;
      els.accountUpgradeButton.hidden = true;
    } else {
      els.accountStatus.textContent = 'Free account';
      els.accountExpiry.textContent = 'Chemistry is free. Maths, Physics and Accounting require premium access.';
      els.accountUpgradeButton.hidden = false;
    }
  }

  if (els.paymentSignedOut) els.paymentSignedOut.hidden = Boolean(user);
  if (els.paymentActive) els.paymentActive.hidden = !(user && premium);
  if (els.paymentReady) els.paymentReady.hidden = !(user && !premium);
  if (user && els.paymentUserEmail) els.paymentUserEmail.textContent = user.email || 'Google account';
  if (user && premium && els.premiumActiveText) els.premiumActiveText.textContent = `Your premium access is active until ${formatDate(profile.premium_until)}.`;
}

async function loadProfile() {
  if (!session?.user || !supabaseClient) { profile = null; return; }
  const { data, error } = await supabaseClient.from('profiles').select('premium_until, paypal_subscription_id, email, full_name, avatar_url').eq('id', session.user.id).maybeSingle();
  if (error) console.warn('Unable to load profile:', error.message);
  profile = data || null;
}

async function refreshUserState() {
  if (!supabaseClient) { updateAccountUI(); renderOverview(); renderLibrary(); return; }
  const { data } = await supabaseClient.auth.getSession();
  session = data.session;
  await loadProfile();
  updateAccountUI();
  renderOverview();
  renderLibrary();
  if (session?.user && !isPremiumActive()) renderPayPalButton();
}

async function signInWithGoogle() {
  if (!supabaseClient) { showToast('Google sign-in could not load. Refresh and try again.'); return; }
  const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: SITE_URL } });
  if (error) showToast(`Google sign-in could not start: ${error.message}`);
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  session = null; profile = null; paypalRenderedForUser = null;
  updateAccountUI(); renderOverview(); renderLibrary();
  els.accountDialog.close();
  showToast('You have signed out.');
}

function showAccountDialog() { updateAccountUI(); els.accountDialog.showModal(); }
function showPremiumDialog() { updateAccountUI(); els.premiumDialog.showModal(); if (session?.user && !isPremiumActive()) setTimeout(renderPayPalButton, 50); }

function openPdf(topic, file, kind) {
  localStorage.setItem('igcse-last-opened', JSON.stringify({ topicId: topic.id, file, kind }));
  const pdfUrl = new URL(file, window.location.href);
  pdfUrl.hash = 'view=FitH';
  const opened = window.open(pdfUrl.href, '_blank', 'noopener,noreferrer');
  if (!opened) {
    showToast('Your browser blocked the new PDF tab. Allow pop-ups for this website and try again.');
  }
}

function requestResource(topic, file, kind) {
  if (topic.subject === 'chemistry' || isPremiumActive()) { openPdf(topic, file, kind); return; }
  pendingPremiumFile = { topic, file, kind };
  showPremiumDialog();
}

async function waitForPremiumActivation(subscriptionId) {
  setPaymentMessage('Subscription approved. Confirming premium access…');
  const started = Date.now();
  while (Date.now() - started < 90000) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loadProfile();
    if (isPremiumActive()) {
      updateAccountUI(); renderOverview(); renderLibrary();
      setPaymentMessage('Payment confirmed. Premium access is active.', 'success');
      showToast('Premium access is active.');
      if (pendingPremiumFile) {
        const pending = pendingPremiumFile; pendingPremiumFile = null;
        setTimeout(() => { els.premiumDialog.close(); openPdf(pending.topic, pending.file, pending.kind); }, 800);
      }
      return;
    }
  }
  setPaymentMessage(`PayPal approved subscription ${subscriptionId}, but account confirmation is still processing. Refresh this page in one minute.`, 'error');
}

function renderPayPalButton() {
  if (!session?.user || isPremiumActive()) return;
  if (!window.paypal?.Buttons) { setPaymentMessage('PayPal is still loading. Close and reopen this window in a moment.'); return; }
  if (paypalRenderedForUser === session.user.id) return;
  const container = document.querySelector(`#paypal-button-container-${PAYPAL_PLAN_ID}`);
  if (!container) return;
  container.innerHTML = '';
  paypalRenderedForUser = session.user.id;

  window.paypal.Buttons({
    style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe', height: 48 },
    createSubscription(_data, actions) {
      setPaymentMessage('Opening secure PayPal subscription checkout…');
      return actions.subscription.create({
        plan_id: PAYPAL_PLAN_ID,
        custom_id: session.user.id,
        application_context: { shipping_preference: 'NO_SHIPPING', user_action: 'SUBSCRIBE_NOW' }
      });
    },
    async onApprove(data) { await waitForPremiumActivation(data.subscriptionID); },
    onCancel() { setPaymentMessage('Payment was cancelled. You have not been charged.'); },
    onError(error) { console.error('PayPal error:', error); setPaymentMessage('PayPal could not complete the subscription. Try again or use another eligible payment method.', 'error'); }
  }).render(container).catch(error => {
    console.error('PayPal render error:', error);
    paypalRenderedForUser = null;
    setPaymentMessage('The PayPal subscription button could not load. Refresh the page and try again.', 'error');
  });
}

function setActiveFilter(subject) {
  activeSubject = subject;
  els.filterButtons.forEach(button => {
    const active = button.dataset.subject === subject;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  renderLibrary();
}

function closeOnBackdrop(dialog, event) {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
}

els.filterButtons.forEach(button => button.addEventListener('click', () => setActiveFilter(button.dataset.subject)));
els.searchInput.addEventListener('input', renderLibrary);
els.subjectOverview.addEventListener('click', event => { if (event.target.closest('.subject-jump')) setActiveFilter('all'); });
els.jumpLinks.addEventListener('click', event => { if (event.target.closest('.subject-jump')) setActiveFilter('all'); });

els.subjectSections.addEventListener('click', event => {
  const resourceButton = event.target.closest('.open-resource');
  if (resourceButton) {
    const topic = topics.find(item => item.id === resourceButton.dataset.topicId);
    if (topic) requestResource(topic, resourceButton.dataset.file, resourceButton.dataset.kind);
    return;
  }
  const completeButton = event.target.closest('[data-complete]');
  if (completeButton) {
    const completed = getCompleted();
    if (completed.has(completeButton.dataset.complete)) completed.delete(completeButton.dataset.complete); else completed.add(completeButton.dataset.complete);
    saveCompleted(completed); renderLibrary(); return;
  }
  const toggle = event.target.closest('.subtopics-toggle');
  if (toggle) {
    const extras = toggle.closest('.topic-card').querySelectorAll('.extra-subtopic');
    const opening = extras[0]?.hidden;
    extras.forEach(item => { item.hidden = !opening; });
    toggle.textContent = opening ? 'Show fewer subtopics' : `+ ${toggle.dataset.more} more subtopic${toggle.dataset.more === '1' ? '' : 's'}`;
  }
});

els.accountButton.addEventListener('click', showAccountDialog);
els.accountClose.addEventListener('click', () => els.accountDialog.close());
els.premiumClose.addEventListener('click', () => els.premiumDialog.close());
els.googleSignInButton.addEventListener('click', signInWithGoogle);
els.premiumGoogleButton.addEventListener('click', signInWithGoogle);
els.signOutButton.addEventListener('click', signOut);
els.navPremiumButton.addEventListener('click', showPremiumDialog);
els.heroPremiumButton.addEventListener('click', showPremiumDialog);
els.sectionPremiumButton.addEventListener('click', showPremiumDialog);
els.accountUpgradeButton.addEventListener('click', () => { els.accountDialog.close(); showPremiumDialog(); });
els.continuePremiumButton.addEventListener('click', () => { els.premiumDialog.close(); document.querySelector('#section-maths')?.scrollIntoView({ behavior: 'smooth' }); });
els.dialogClose.addEventListener('click', () => els.pdfDialog.close());
els.pdfDialog.addEventListener('close', () => { els.pdfFrame.src = 'about:blank'; });
els.accountDialog.addEventListener('click', event => closeOnBackdrop(els.accountDialog, event));
els.premiumDialog.addEventListener('click', event => closeOnBackdrop(els.premiumDialog, event));
els.pdfDialog.addEventListener('click', event => closeOnBackdrop(els.pdfDialog, event));

els.continueButton.addEventListener('click', () => {
  try {
    const last = JSON.parse(localStorage.getItem('igcse-last-opened') || 'null');
    if (!last) return document.querySelector('#subjects').scrollIntoView({ behavior: 'smooth' });
    const topic = topics.find(item => item.id === last.topicId);
    if (topic) requestResource(topic, last.file, last.kind);
  } catch { document.querySelector('#subjects').scrollIntoView({ behavior: 'smooth' }); }
});

document.addEventListener('keydown', event => {
  if (event.key === '/' && document.activeElement !== els.searchInput) { event.preventDefault(); els.searchInput.focus(); }
});

supabaseClient?.auth.onAuthStateChange(async (_event, newSession) => {
  session = newSession;
  await loadProfile();
  updateAccountUI(); renderOverview(); renderLibrary();
  if (session?.user && !isPremiumActive()) setTimeout(renderPayPalButton, 100);
});

renderOverview();
renderLibrary();
updateAccountUI();
refreshUserState().catch(error => { console.error('Initialisation error:', error); updateAccountUI(); });
