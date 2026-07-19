const SUPABASE_URL = "https://zkqfyejxkrkazhjovmwr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wxOGkyVKgF78gHFD7A8BzA__Z80Wnpw";
const SITE_URL = "https://topicalpastpapersigcse.github.io/TOPICAL-PAST-PAPERS/";
const PAYPAL_PLAN_ID = "P-58263651AM188451SNJOJBBQ";
const PREMIUM_DAYS = 30;

const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

const topics = [
  {
    "id": "chemistry-states",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "01",
    "title": "States of Matter",
    "count": 6,
    "subtopics": [
      "Particle model and changes of state"
    ],
    "questions": "assets/chemistry/chemistry-01-states-of-matter-premium.pdf"
  },
  {
    "id": "chemistry-atoms",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "02",
    "title": "Atoms, Elements and Compounds",
    "count": 59,
    "subtopics": [
      "Atomic structure",
      "Isotopes and ions",
      "Bonding and structures"
    ],
    "questions": "assets/chemistry/chemistry-02-atoms-elements-compounds-premium.pdf"
  },
  {
    "id": "chemistry-stoichiometry",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "03",
    "title": "Stoichiometry",
    "count": 33,
    "subtopics": [
      "Moles",
      "Formulae and equations",
      "Chemical calculations"
    ],
    "questions": "assets/chemistry/chemistry-03-stoichiometry-premium.pdf"
  },
  {
    "id": "chemistry-electrochemistry",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "04",
    "title": "Electrochemistry",
    "count": 19,
    "subtopics": [
      "Electrolysis",
      "Electrode reactions"
    ],
    "questions": "assets/chemistry/chemistry-04-electrochemistry-premium.pdf"
  },
  {
    "id": "chemistry-energetics",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "05",
    "title": "Chemical Energetics",
    "count": 3,
    "subtopics": [
      "Exothermic and endothermic changes",
      "Bond energies"
    ],
    "questions": "assets/chemistry/chemistry-05-chemical-energetics-premium.pdf"
  },
  {
    "id": "chemistry-reactions",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "06",
    "title": "Chemical Reactions",
    "count": 11,
    "subtopics": [
      "Rates of reaction",
      "Equilibrium",
      "Redox and displacement"
    ],
    "questions": "assets/chemistry/chemistry-06-chemical-reactions-premium.pdf"
  },
  {
    "id": "chemistry-acids",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "07",
    "title": "Acids, Bases and Salts",
    "count": 24,
    "subtopics": [
      "Acids and bases",
      "Preparation of salts",
      "The pH scale"
    ],
    "questions": "assets/chemistry/chemistry-07-acids-bases-salts-premium.pdf"
  },
  {
    "id": "chemistry-periodic",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "08",
    "title": "The Periodic Table",
    "count": 10,
    "subtopics": [
      "Groups in the Periodic Table",
      "Patterns and trends"
    ],
    "questions": "assets/chemistry/chemistry-08-periodic-table-premium.pdf"
  },
  {
    "id": "chemistry-metals",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "09",
    "title": "Metals",
    "count": 20,
    "subtopics": [
      "Properties of metals",
      "Reactivity series",
      "Extraction",
      "Corrosion"
    ],
    "questions": "assets/chemistry/chemistry-09-metals-premium.pdf"
  },
  {
    "id": "chemistry-environment",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "10",
    "title": "Chemistry of the Environment",
    "count": 14,
    "subtopics": [
      "Air and water",
      "Climate",
      "Industrial chemistry"
    ],
    "questions": "assets/chemistry/chemistry-10-environment-premium.pdf"
  },
  {
    "id": "chemistry-organic",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "11",
    "title": "Organic Chemistry",
    "count": 56,
    "subtopics": [
      "Hydrocarbons and fuels",
      "Functional groups",
      "Organic reactions",
      "Polymers"
    ],
    "questions": "assets/chemistry/chemistry-11-organic-chemistry-premium.pdf"
  },
  {
    "id": "chemistry-experimental",
    "subject": "chemistry",
    "code": "0620 · Paper 4 · 2020–2025",
    "number": "12",
    "title": "Experimental Techniques and Analysis",
    "count": 1,
    "subtopics": [
      "Separation methods",
      "Titration",
      "Chemical tests"
    ],
    "questions": "assets/chemistry/chemistry-12-experimental-analysis-premium.pdf"
  },
  {
    "id": "maths-number",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "01",
    "title": "Number",
    "count": 104,
    "subtopics": [
      "Number properties, sets and surds",
      "Accuracy, bounds and standard form",
      "Number calculations and applications",
      "Ratio, proportion, rates and money",
      "Percentages, finance and growth"
    ],
    "questions": "assets/maths/maths-01-number-questions.pdf",
    "answers": "assets/maths/maths-01-number-answers.pdf"
  },
  {
    "id": "maths-algebra",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "02",
    "title": "Algebra and Graphs",
    "count": 233,
    "subtopics": [
      "Algebraic manipulation",
      "Equations and inequalities",
      "Variation and formulae",
      "Sequences",
      "Functions",
      "Graphs and differentiation"
    ],
    "questions": "assets/maths/maths-02-algebra-graphs-questions.pdf",
    "answers": "assets/maths/maths-02-algebra-graphs-answers.pdf"
  },
  {
    "id": "maths-coordinate",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "03",
    "title": "Coordinate Geometry",
    "count": 34,
    "subtopics": [
      "Coordinates, length and midpoint",
      "Gradients and equations of lines",
      "Parallel and perpendicular lines"
    ],
    "questions": "assets/maths/maths-03-coordinate-geometry-questions.pdf",
    "answers": "assets/maths/maths-03-coordinate-geometry-answers.pdf"
  },
  {
    "id": "maths-geometry",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "04",
    "title": "Geometry",
    "count": 29,
    "subtopics": [
      "Circle geometry",
      "Constructions, loci and scale drawings",
      "Similarity and congruence"
    ],
    "questions": "assets/maths/maths-04-geometry-questions.pdf",
    "answers": "assets/maths/maths-04-geometry-answers.pdf"
  },
  {
    "id": "maths-mensuration",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "05",
    "title": "Mensuration",
    "count": 116,
    "subtopics": [
      "Perimeter, area and compound shapes",
      "Circles, arcs and sectors",
      "Surface area and volume"
    ],
    "questions": "assets/maths/maths-05-mensuration-questions.pdf",
    "answers": "assets/maths/maths-05-mensuration-answers.pdf"
  },
  {
    "id": "maths-trigonometry",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "06",
    "title": "Trigonometry",
    "count": 50,
    "subtopics": [
      "Pythagoras and right-angled trigonometry",
      "Sine rule, cosine rule and triangle area",
      "Bearings and three-dimensional trigonometry",
      "Trigonometric graphs and equations"
    ],
    "questions": "assets/maths/maths-06-trigonometry-questions.pdf",
    "answers": "assets/maths/maths-06-trigonometry-answers.pdf"
  },
  {
    "id": "maths-transformations",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "07",
    "title": "Transformations and Vectors",
    "count": 67,
    "subtopics": [
      "Transformations",
      "Vectors"
    ],
    "questions": "assets/maths/maths-07-transformations-vectors-questions.pdf",
    "answers": "assets/maths/maths-07-transformations-vectors-answers.pdf"
  },
  {
    "id": "maths-probability",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "08",
    "title": "Probability",
    "count": 50,
    "subtopics": [
      "Basic probability and relative frequency",
      "Combined probability and tree diagrams",
      "Venn diagrams and probability"
    ],
    "questions": "assets/maths/maths-08-probability-questions.pdf",
    "answers": "assets/maths/maths-08-probability-answers.pdf"
  },
  {
    "id": "maths-statistics",
    "subject": "maths",
    "code": "0580 · Paper 4 · 2015–2024",
    "number": "09",
    "title": "Statistics",
    "count": 68,
    "subtopics": [
      "Data presentation",
      "Scatter diagrams and sampling",
      "Cumulative frequency and box plots",
      "Histograms"
    ],
    "questions": "assets/maths/maths-09-statistics-questions.pdf",
    "answers": "assets/maths/maths-09-statistics-answers.pdf"
  },
  {
    "id": "physics-motion",
    "subject": "physics",
    "code": "0625 · Paper 4 · 2021–2025",
    "number": "01",
    "title": "Motion, Forces and Energy",
    "count": 79,
    "subtopics": [
      "Scalars, vectors and motion",
      "Speed-time graphs and forces",
      "Forces, acceleration and Newton’s laws",
      "Momentum and impulse",
      "Circular motion and forces",
      "Density",
      "Pressure",
      "Moments and equilibrium",
      "Springs and Hooke’s law",
      "Work, energy, power and efficiency",
      "Mixed motion and forces"
    ],
    "questions": "assets/physics/physics-01-motion-forces-energy-premium.pdf"
  },
  {
    "id": "physics-thermal",
    "subject": "physics",
    "code": "0625 · Paper 4 · 2021–2025",
    "number": "02",
    "title": "Thermal Physics",
    "count": 47,
    "subtopics": [
      "Particle model and internal energy",
      "Gas pressure and kinetic model",
      "Specific heat capacity",
      "Specific latent heat and changes of state",
      "Evaporation",
      "Mixed thermal physics"
    ],
    "questions": "assets/physics/physics-02-thermal-physics-premium.pdf"
  },
  {
    "id": "physics-waves",
    "subject": "physics",
    "code": "0625 · Paper 4 · 2021–2025",
    "number": "03",
    "title": "Waves",
    "count": 59,
    "subtopics": [
      "Wave properties",
      "Reflection of waves",
      "Sound and ultrasound",
      "Light, refraction and lenses",
      "Electromagnetic spectrum",
      "Medical imaging",
      "Mixed waves"
    ],
    "questions": "assets/physics/physics-03-waves-premium.pdf"
  },
  {
    "id": "physics-electricity",
    "subject": "physics",
    "code": "0625 · Paper 4 · 2021–2025",
    "number": "04",
    "title": "Electricity and Magnetism",
    "count": 102,
    "subtopics": [
      "Current, charge and potential difference",
      "Electric circuits and resistance",
      "A.C. and D.C. circuits",
      "Magnetism and magnetic fields",
      "Electromagnetic induction",
      "Generators and motors",
      "Transformers",
      "Digital electronics and logic gates"
    ],
    "questions": "assets/physics/physics-04-electricity-magnetism-premium.pdf"
  },
  {
    "id": "physics-nuclear",
    "subject": "physics",
    "code": "0625 · Paper 4 · 2021–2025",
    "number": "05",
    "title": "Nuclear Physics",
    "count": 39,
    "subtopics": [
      "Atoms, nuclei and isotopes",
      "Alpha, beta and gamma radiation",
      "Half-life",
      "Nuclear fission and fusion",
      "Mixed radioactivity"
    ],
    "questions": "assets/physics/physics-05-nuclear-physics-premium.pdf"
  },
  {
    "id": "physics-space",
    "subject": "physics",
    "code": "0625 · Paper 4 · 2021–2025",
    "number": "06",
    "title": "Space Physics",
    "count": 27,
    "subtopics": [
      "Solar System and accretion model",
      "Comets and orbits",
      "Stars, galaxies and the Universe",
      "Moon phases and orbits",
      "Planets and the Solar System",
      "Mixed space physics"
    ],
    "questions": "assets/physics/physics-06-space-physics-premium.pdf"
  },
  {
    "id": "accounting-sources",
    "subject": "accounting",
    "code": "0452 · Paper 2 · 2021–2025",
    "number": "02",
    "title": "Sources and Recording of Data",
    "count": 27,
    "subtopics": [
      "Double-entry bookkeeping",
      "Books of prime entry"
    ],
    "questions": "assets/accounting/accounting-02-sources-recording-premium.pdf"
  },
  {
    "id": "accounting-verification",
    "subject": "accounting",
    "code": "0452 · Paper 2 · 2021–2025",
    "number": "03",
    "title": "Verification of Accounting Records",
    "count": 28,
    "subtopics": [
      "Correction of errors",
      "Bank reconciliation",
      "Control accounts"
    ],
    "questions": "assets/accounting/accounting-03-verification-records-premium.pdf"
  },
  {
    "id": "accounting-procedures",
    "subject": "accounting",
    "code": "0452 · Paper 2 · 2021–2025",
    "number": "04",
    "title": "Accounting Procedures",
    "count": 21,
    "subtopics": [
      "Capital and revenue expenditure",
      "Depreciation and disposal",
      "Irrecoverable debts and provisions",
      "Valuation of inventory"
    ],
    "questions": "assets/accounting/accounting-04-procedures-premium.pdf"
  },
  {
    "id": "accounting-statements",
    "subject": "accounting",
    "code": "0452 · Paper 2 · 2021–2025",
    "number": "05",
    "title": "Preparation of Financial Statements",
    "count": 41,
    "subtopics": [
      "Sole traders",
      "Partnerships",
      "Limited companies",
      "Clubs and societies",
      "Manufacturing accounts",
      "Incomplete records"
    ],
    "questions": "assets/accounting/accounting-05-financial-statements-premium.pdf"
  },
  {
    "id": "accounting-analysis",
    "subject": "accounting",
    "code": "0452 · Paper 2 · 2021–2025",
    "number": "06",
    "title": "Analysis and Interpretation",
    "count": 13,
    "subtopics": [
      "Calculation of accounting ratios",
      "Understanding and interpreting ratios"
    ],
    "questions": "assets/accounting/accounting-06-analysis-interpretation-premium.pdf"
  }
];

const subjectMeta = {
  chemistry: {
    name: "Chemistry",
    code: "0620",
    initial: "C",
    access: "free",
    period: "2020–2025",
    description: "All Chemistry topic packs are free to open without signing in or paying.",
    note: "12 free topical question banks",
  },
  maths: {
    name: "Mathematics",
    code: "0580",
    initial: "M",
    access: "premium",
    period: "2015–2024 archive",
    description: "Extended Paper 4 questions organised by topic, with matching answer booklets.",
    note: "Questions and answers included",
  },
  physics: {
    name: "Physics",
    code: "0625",
    initial: "P",
    access: "premium",
    period: "2021–2025",
    description: "Recent Paper 4 practice covering motion, thermal physics, waves, electricity, nuclear and space physics.",
    note: "6 recent five-year topic banks",
  },
  accounting: {
    name: "Accounting",
    code: "0452",
    initial: "A",
    access: "premium",
    period: "2021–2025",
    description: "Paper 2 practice for recording, verification, procedures, financial statements and analysis.",
    note: "Only sections containing questions are shown",
  },
};

const subjectOrder = ["chemistry", "maths", "physics", "accounting"];
const premiumSubjects = new Set(["maths", "physics", "accounting"]);

const els = {
  accountButton: document.querySelector("#accountButton"),
  accountButtonText: document.querySelector("#accountButtonText"),
  accountDialog: document.querySelector("#accountDialog"),
  accountClose: document.querySelector("#accountClose"),
  signedOutAccount: document.querySelector("#signedOutAccount"),
  signedInAccount: document.querySelector("#signedInAccount"),
  googleSignInButton: document.querySelector("#googleSignInButton"),
  premiumGoogleButton: document.querySelector("#premiumGoogleButton"),
  signOutButton: document.querySelector("#signOutButton"),
  accountName: document.querySelector("#accountName"),
  accountEmail: document.querySelector("#accountEmail"),
  accountAvatar: document.querySelector("#accountAvatar"),
  avatarFallback: document.querySelector("#avatarFallback"),
  accountStatus: document.querySelector("#accountStatus"),
  accountExpiry: document.querySelector("#accountExpiry"),
  accountUpgradeButton: document.querySelector("#accountUpgradeButton"),
  heroPremiumButton: document.querySelector("#heroPremiumButton"),
  sectionPremiumButton: document.querySelector("#sectionPremiumButton"),
  premiumDialog: document.querySelector("#premiumDialog"),
  premiumClose: document.querySelector("#premiumClose"),
  paymentSignedOut: document.querySelector("#paymentSignedOut"),
  paymentActive: document.querySelector("#paymentActive"),
  paymentReady: document.querySelector("#paymentReady"),
  paymentUserEmail: document.querySelector("#paymentUserEmail"),
  paymentMessage: document.querySelector("#paymentMessage"),
  premiumActiveText: document.querySelector("#premiumActiveText"),
  continuePremiumButton: document.querySelector("#continuePremiumButton"),
  subjectOverview: document.querySelector("#subjectOverview"),
  subjectSections: document.querySelector("#subjectSections"),
  searchInput: document.querySelector("#searchInput"),
  resultCount: document.querySelector("#resultCount"),
  activeFilterLabel: document.querySelector("#activeFilterLabel"),
  emptyState: document.querySelector("#emptyState"),
  filterButtons: [...document.querySelectorAll(".filter-pill")],
  summaryProgressText: document.querySelector("#summaryProgressText"),
  summaryProgressBar: document.querySelector("#summaryProgressBar"),
  pdfDialog: document.querySelector("#pdfDialog"),
  pdfFrame: document.querySelector("#pdfFrame"),
  dialogSubject: document.querySelector("#dialogSubject"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDownload: document.querySelector("#dialogDownload"),
  pdfClose: document.querySelector("#pdfClose"),
  toast: document.querySelector("#toast"),
};

let session = null;
let profile = null;
let activeSubject = "all";
let paypalRenderedForUser = null;
let pendingPremiumFile = null;
let toastTimer = null;

function isPremiumActive() {
  if (!profile?.premium_until) return false;
  return new Date(profile.premium_until).getTime() > Date.now();
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { els.toast.hidden = true; }, 4200);
}

function setPaymentMessage(message, type = "") {
  els.paymentMessage.textContent = message;
  els.paymentMessage.className = `payment-message ${type}`.trim();
}

function getCompleted() {
  try { return new Set(JSON.parse(localStorage.getItem("igcse-completed-topics") || "[]")); }
  catch { return new Set(); }
}

function saveCompleted(set) {
  localStorage.setItem("igcse-completed-topics", JSON.stringify([...set]));
}

function updateProgress() {
  const completed = getCompleted();
  const count = topics.filter((topic) => completed.has(topic.id)).length;
  const percent = Math.round((count / topics.length) * 100);
  els.summaryProgressText.textContent = `${count} of ${topics.length} complete`;
  els.summaryProgressBar.style.width = `${percent}%`;
}

function getSubjectTopics(subject) {
  return topics.filter((topic) => topic.subject === subject);
}

function getQuestionTotal(subject) {
  return getSubjectTopics(subject).reduce((sum, topic) => sum + (topic.count || 0), 0);
}

function subjectOverviewMarkup(subject) {
  const meta = subjectMeta[subject];
  const topicCount = getSubjectTopics(subject).length;
  const questionCount = getQuestionTotal(subject);
  const free = meta.access === "free";
  return `
    <article class="subject-overview-card ${free ? "featured" : ""}">
      <div class="subject-card-top">
        <span class="subject-code">${meta.code} · ${meta.period}</span>
        <span class="access-label ${meta.access}">${free ? "Free access" : "30-day premium"}</span>
      </div>
      <h3>${meta.name}</h3>
      <p>${meta.description}</p>
      <div class="subject-stat-row">
        <div><strong>${topicCount}</strong><span>topic packs</span></div>
        <div><strong>${questionCount}</strong><span>questions</span></div>
      </div>
      <a class="subject-open" href="#section-${subject}" data-subject-jump="${subject}">${free ? "Open free Chemistry" : `View ${meta.name} topics`} →</a>
    </article>`;
}

function cardMarkup(topic) {
  const meta = subjectMeta[topic.subject];
  const free = meta.access === "free";
  const unlocked = free || isPremiumActive();
  const completed = getCompleted().has(topic.id);
  const visibleSubtopics = topic.subtopics.slice(0, 4);
  const extraSubtopics = topic.subtopics.slice(4);
  const answerButton = topic.answers
    ? `<button class="card-button ${unlocked ? "" : "unlock"} open-resource" type="button" data-topic-id="${topic.id}" data-file="${topic.answers}" data-kind="Answers">${unlocked ? "Answers" : "Unlock answers"}</button>`
    : "";
  return `
    <article class="topic-card ${unlocked ? "" : "locked"}" data-topic-id="${topic.id}">
      <div class="card-main">
        <div class="card-topline">
          <span>${meta.name} · Topic ${topic.number}</span>
          <span class="card-status ${free ? "free" : "premium"}">${free ? "Free" : unlocked ? "Unlocked" : "Premium"}</span>
        </div>
        <h4>${topic.title}</h4>
        <div class="topic-period">${topic.code}</div>
        <div class="topic-meta">
          <span>${topic.count} question${topic.count === 1 ? "" : "s"}</span>
          <span>${topic.answers ? "Questions + answers" : "Questions"}</span>
        </div>
      </div>
      <div class="subtopics">
        ${visibleSubtopics.map((item) => `<span>${item}</span>`).join("")}
        ${extraSubtopics.map((item) => `<span class="extra-subtopic" hidden>${item}</span>`).join("")}
      </div>
      ${extraSubtopics.length ? `<button class="subtopics-toggle" type="button" data-count="${extraSubtopics.length}">+ ${extraSubtopics.length} more</button>` : ""}
      <div class="card-actions">
        <div class="open-group">
          <button class="card-button ${unlocked ? "primary" : "unlock"} open-resource" type="button" data-topic-id="${topic.id}" data-file="${topic.questions}" data-kind="Questions">${unlocked ? "Open questions" : "Unlock topic"}</button>
          ${answerButton}
        </div>
        <button class="card-button complete-button ${completed ? "completed" : ""}" type="button" data-complete="${topic.id}" aria-label="${completed ? "Mark incomplete" : "Mark complete"}">${completed ? "✓" : "○"}</button>
      </div>
    </article>`;
}

function sectionMarkup(subject, subjectTopics) {
  const meta = subjectMeta[subject];
  const free = meta.access === "free";
  const unlocked = free || isPremiumActive();
  return `
    <section class="subject-section" id="section-${subject}" data-subject="${subject}">
      <div class="subject-section-head">
        <div class="subject-title">
          <div class="subject-initial">${meta.initial}</div>
          <div><h3>${meta.name}</h3><p>${meta.code} · ${meta.period} · ${meta.note}</p></div>
        </div>
        <div class="subject-head-meta">
          <span>${subjectTopics.length} topics</span>
          <span>${subjectTopics.reduce((sum, topic) => sum + topic.count, 0)} questions</span>
          <span class="${free ? "free" : "premium"}">${free ? "Free for everyone" : unlocked ? "Premium active" : "Premium required"}</span>
        </div>
      </div>
      <div class="topic-grid">${subjectTopics.map(cardMarkup).join("")}</div>
    </section>`;
}

function filteredTopics() {
  const term = els.searchInput.value.trim().toLowerCase();
  return topics.filter((topic) => {
    const subjectMatches = activeSubject === "all" || topic.subject === activeSubject;
    const text = [topic.title, topic.code, subjectMeta[topic.subject].name, ...topic.subtopics].join(" ").toLowerCase();
    return subjectMatches && text.includes(term);
  });
}

function renderLibrary() {
  const filtered = filteredTopics();
  const subjects = subjectOrder.filter((subject) => filtered.some((topic) => topic.subject === subject));
  els.subjectSections.innerHTML = subjects
    .map((subject) => sectionMarkup(subject, filtered.filter((topic) => topic.subject === subject)))
    .join("");
  els.resultCount.textContent = `${filtered.length} topic${filtered.length === 1 ? "" : "s"}`;
  els.activeFilterLabel.textContent = activeSubject === "all" ? "across all four subjects" : `in ${subjectMeta[activeSubject].name}`;
  els.emptyState.hidden = filtered.length !== 0;
  els.subjectSections.hidden = filtered.length === 0;
  updateProgress();
}

function renderOverview() {
  els.subjectOverview.innerHTML = subjectOrder.map(subjectOverviewMarkup).join("");
}

function updateAccountUI() {
  const user = session?.user;
  const premium = isPremiumActive();
  els.accountButton.classList.toggle("signed-in", Boolean(user));
  els.accountButtonText.textContent = user ? (premium ? "Premium account" : "My account") : "Sign in";
  els.signedOutAccount.hidden = Boolean(user);
  els.signedInAccount.hidden = !user;

  if (user) {
    const metadata = user.user_metadata || {};
    const name = metadata.full_name || metadata.name || user.email?.split("@")[0] || "Account";
    els.accountName.textContent = name;
    els.accountEmail.textContent = user.email || "";
    els.avatarFallback.textContent = name.charAt(0).toUpperCase();
    const avatar = metadata.avatar_url || metadata.picture;
    if (avatar) {
      els.accountAvatar.src = avatar;
      els.accountAvatar.hidden = false;
      els.avatarFallback.hidden = true;
    } else {
      els.accountAvatar.hidden = true;
      els.avatarFallback.hidden = false;
    }
    if (premium) {
      els.accountStatus.textContent = "Premium active";
      els.accountExpiry.textContent = `Full access until ${formatDate(profile.premium_until)}.`;
      els.accountUpgradeButton.hidden = true;
    } else {
      els.accountStatus.textContent = "Free account";
      els.accountExpiry.textContent = "Chemistry is free. Purchase a 30-day pass to unlock the other subjects.";
      els.accountUpgradeButton.hidden = false;
    }
  }

  els.paymentSignedOut.hidden = Boolean(user);
  els.paymentActive.hidden = !(user && premium);
  els.paymentReady.hidden = !(user && !premium);
  if (user) els.paymentUserEmail.textContent = user.email || "Google account";
  if (user && premium) els.premiumActiveText.textContent = `Your premium access is active until ${formatDate(profile.premium_until)}.`;
}

async function loadProfile() {
  if (!session?.user) { profile = null; return; }
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("premium_until, paypal_subscription_id, email, full_name, avatar_url")
    .eq("id", session.user.id)
    .maybeSingle();
  if (error) console.warn("Unable to load profile:", error.message);
  profile = data || null;
}

async function refreshUserState() {
  if (!supabaseClient) {
    updateAccountUI();
    return;
  }
  const { data } = await supabaseClient.auth.getSession();
  session = data.session;
  await loadProfile();
  updateAccountUI();
  renderOverview();
  renderLibrary();
  if (session?.user && !isPremiumActive()) renderPayPalButton();
}

async function signInWithGoogle() {
  if (!supabaseClient) {
    showToast("Google sign-in could not load. Refresh the page and try again.");
    return;
  }
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: SITE_URL },
  });
  if (error) showToast(`Google sign-in could not start: ${error.message}`);
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  session = null;
  profile = null;
  paypalRenderedForUser = null;
  updateAccountUI();
  renderOverview();
  renderLibrary();
  els.accountDialog.close();
  showToast("You have signed out.");
}

function showAccountDialog() {
  updateAccountUI();
  els.accountDialog.showModal();
}

function showPremiumDialog() {
  updateAccountUI();
  els.premiumDialog.showModal();
  if (session?.user && !isPremiumActive()) renderPayPalButton();
}

function openPdf(topic, file, kind) {
  els.dialogSubject.textContent = `${subjectMeta[topic.subject].name} ${subjectMeta[topic.subject].code}`;
  els.dialogTitle.textContent = `${topic.title} — ${kind}`;
  els.pdfFrame.src = `${file}#view=FitH`;
  els.dialogDownload.href = file;
  els.dialogDownload.download = file.split("/").pop();
  els.pdfDialog.showModal();
  localStorage.setItem("igcse-last-opened", JSON.stringify({ topicId: topic.id, file, kind }));
}

function requestResource(topic, file, kind) {
  if (topic.subject === "chemistry" || isPremiumActive()) {
    openPdf(topic, file, kind);
    return;
  }
  pendingPremiumFile = { topic, file, kind };
  showPremiumDialog();
}

async function waitForPremiumActivation(subscriptionId) {
  setPaymentMessage("Payment approved. Confirming your 30-day access…");
  const started = Date.now();
  while (Date.now() - started < 90000) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await loadProfile();
    if (isPremiumActive()) {
      updateAccountUI();
      renderOverview();
      renderLibrary();
      setPaymentMessage("Payment confirmed. Your 30-day premium access is active.", "success");
      showToast("Premium access is now active for 30 days.");
      if (pendingPremiumFile) {
        const pending = pendingPremiumFile;
        pendingPremiumFile = null;
        setTimeout(() => {
          els.premiumDialog.close();
          openPdf(pending.topic, pending.file, pending.kind);
        }, 900);
      }
      return;
    }
  }
  setPaymentMessage(`PayPal approved subscription ${subscriptionId}, but confirmation is still processing. Keep this page open or refresh in a minute.`, "error");
}

function renderPayPalButton() {
  if (!session?.user || isPremiumActive()) return;
  if (!window.paypal?.Buttons) {
    setPaymentMessage("PayPal is still loading. Please wait a moment and reopen this window.");
    return;
  }
  if (paypalRenderedForUser === session.user.id) return;
  const container = document.querySelector(`#paypal-button-container-${PAYPAL_PLAN_ID}`);
  if (!container) return;
  container.innerHTML = "";
  paypalRenderedForUser = session.user.id;

  window.paypal.Buttons({
    style: { shape: "rect", color: "gold", layout: "vertical", label: "paypal" },
    createSubscription(_data, actions) {
      setPaymentMessage("Opening secure PayPal checkout…");
      return actions.subscription.create({
        plan_id: PAYPAL_PLAN_ID,
        custom_id: session.user.id,
        application_context: {
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
        },
      });
    },
    async onApprove(data) {
      await waitForPremiumActivation(data.subscriptionID);
    },
    onCancel() {
      setPaymentMessage("Payment was cancelled. You have not been charged.");
    },
    onError(error) {
      console.error("PayPal error:", error);
      setPaymentMessage("PayPal could not complete the payment. Please try again.", "error");
    },
  }).render(container).catch((error) => {
    console.error("PayPal render error:", error);
    paypalRenderedForUser = null;
    setPaymentMessage("The PayPal button could not load. Refresh the page and try again.", "error");
  });
}

function closeOnBackdrop(dialog, event) {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
}

els.accountButton.addEventListener("click", showAccountDialog);
els.accountClose.addEventListener("click", () => els.accountDialog.close());
els.premiumClose.addEventListener("click", () => els.premiumDialog.close());
els.googleSignInButton.addEventListener("click", signInWithGoogle);
els.premiumGoogleButton.addEventListener("click", signInWithGoogle);
els.signOutButton.addEventListener("click", signOut);
els.heroPremiumButton.addEventListener("click", showPremiumDialog);
els.sectionPremiumButton.addEventListener("click", showPremiumDialog);
els.accountUpgradeButton.addEventListener("click", () => { els.accountDialog.close(); showPremiumDialog(); });
els.continuePremiumButton.addEventListener("click", () => { els.premiumDialog.close(); document.querySelector("#section-maths")?.scrollIntoView({ behavior: "smooth" }); });
els.pdfClose.addEventListener("click", () => els.pdfDialog.close());
els.pdfDialog.addEventListener("close", () => { els.pdfFrame.src = "about:blank"; });
els.accountDialog.addEventListener("click", (event) => closeOnBackdrop(els.accountDialog, event));
els.premiumDialog.addEventListener("click", (event) => closeOnBackdrop(els.premiumDialog, event));
els.pdfDialog.addEventListener("click", (event) => closeOnBackdrop(els.pdfDialog, event));

els.filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeSubject = button.dataset.subject;
    els.filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderLibrary();
  });
});

els.searchInput.addEventListener("input", renderLibrary);
els.subjectOverview.addEventListener("click", (event) => {
  const link = event.target.closest("[data-subject-jump]");
  if (!link) return;
  activeSubject = "all";
  els.filterButtons.forEach((button) => {
    const active = button.dataset.subject === "all";
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  renderLibrary();
});

els.subjectSections.addEventListener("click", (event) => {
  const resourceButton = event.target.closest(".open-resource");
  if (resourceButton) {
    const topic = topics.find((item) => item.id === resourceButton.dataset.topicId);
    if (topic) requestResource(topic, resourceButton.dataset.file, resourceButton.dataset.kind);
    return;
  }

  const completeButton = event.target.closest("[data-complete]");
  if (completeButton) {
    const completed = getCompleted();
    if (completed.has(completeButton.dataset.complete)) completed.delete(completeButton.dataset.complete);
    else completed.add(completeButton.dataset.complete);
    saveCompleted(completed);
    renderLibrary();
    return;
  }

  const toggle = event.target.closest(".subtopics-toggle");
  if (toggle) {
    const extras = toggle.closest(".topic-card").querySelectorAll(".extra-subtopic");
    const opening = extras[0]?.hidden;
    extras.forEach((item) => { item.hidden = !opening; });
    toggle.textContent = opening ? "Show fewer" : `+ ${toggle.dataset.count} more`;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== els.searchInput) {
    event.preventDefault();
    els.searchInput.focus();
  }
});

supabaseClient?.auth.onAuthStateChange(async (_event, newSession) => {
  session = newSession;
  await loadProfile();
  updateAccountUI();
  renderOverview();
  renderLibrary();
  if (session?.user && !isPremiumActive()) setTimeout(renderPayPalButton, 100);
});

renderOverview();
renderLibrary();
refreshUserState().catch((error) => {
  console.error("Initialisation error:", error);
  updateAccountUI();
});
