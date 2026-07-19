(() => {
  "use strict";

  const answerKeyByTopic = {
    "chemistry-states": "chemistry-01-states-of-matter",
    "chemistry-atoms": "chemistry-02-atoms-elements-compounds",
    "chemistry-stoichiometry": "chemistry-03-stoichiometry",
    "chemistry-electrochemistry": "chemistry-04-electrochemistry",
    "chemistry-energetics": "chemistry-05-chemical-energetics",
    "chemistry-reactions": "chemistry-06-chemical-reactions",
    "chemistry-acids": "chemistry-07-acids-bases-salts",
    "chemistry-periodic": "chemistry-08-periodic-table",
    "chemistry-metals": "chemistry-09-metals",
    "chemistry-environment": "chemistry-10-environment",
    "chemistry-organic": "chemistry-11-organic-chemistry",
    "chemistry-experimental": "chemistry-12-experimental-analysis"
  };

  let chemistryAnswersPromise = null;
  let activeAnswerUrl = null;

  function decodeBase64(value) {
    return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
  }

  const ANSWER_CHUNK_FILES = Array.from(
    { length: 8 },
    (_, index) => `data/chemistry-answers-${String(index + 1).padStart(2, "0")}.b64`
  );

  async function loadChemistryAnswers() {
    if (!chemistryAnswersPromise) {
      chemistryAnswersPromise = (async () => {
        if (!("DecompressionStream" in window)) {
          throw new Error("This browser is too old to open the answer library. Please use an updated Chrome, Edge, Firefox or Safari browser.");
        }
        const chunks = await Promise.all(ANSWER_CHUNK_FILES.map(async (file) => {
          const response = await fetch(file, { cache: "no-store" });
          if (!response.ok) throw new Error("The Chemistry answer library could not be loaded.");
          return (await response.text()).trim();
        }));
        const stream = new Blob([decodeBase64(chunks.join(""))])
          .stream()
          .pipeThrough(new DecompressionStream("gzip"));
        const json = await new Response(stream).text();
        return JSON.parse(json);
      })().catch((error) => {
        chemistryAnswersPromise = null;
        throw error;
      });
    }
    return chemistryAnswersPromise;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    })[character]);
  }

  function answerDocument(topic, answerText) {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(topic.title)} — Chemistry Answers</title>
<style>
:root{color-scheme:dark;--bg:#070b14;--panel:#101827;--line:#29384f;--text:#f4f7ff;--muted:#a8b5c9;--accent:#42d9bb}
*{box-sizing:border-box}
body{margin:0;background:linear-gradient(180deg,#070b14,#0b1220);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.65}
main{width:min(960px,calc(100% - 28px));margin:0 auto;padding:34px 0 70px}
header{position:sticky;top:0;z-index:2;margin-bottom:22px;padding:18px 20px;border:1px solid var(--line);border-radius:18px;background:rgba(16,24,39,.94);backdrop-filter:blur(12px);box-shadow:0 18px 55px rgba(0,0,0,.28)}
small{display:block;color:var(--accent);font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
h1{margin:5px 0 5px;font-family:Georgia,serif;font-size:clamp(30px,5vw,48px);line-height:1.05}
p{margin:0;color:var(--muted)}
.answer-sheet{padding:24px;border:1px solid var(--line);border-radius:18px;background:var(--panel);box-shadow:0 20px 65px rgba(0,0,0,.24)}
pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;color:#eaf0fb;font:500 15px/1.75 Inter,system-ui,-apple-system,Segoe UI,sans-serif}
@media(max-width:600px){main{width:min(100% - 18px,960px);padding-top:12px}header,.answer-sheet{padding:17px;border-radius:14px}pre{font-size:14px}}
</style>
</head>
<body><main><header><small>CHEMISTRY 0620 · COMPLETE ANSWERS</small><h1>${escapeHtml(topic.title)}</h1><p>Answers follow the same source labels and order as the matching topical question bank.</p></header><section class="answer-sheet"><pre>${escapeHtml(answerText)}</pre></section></main></body></html>`;
  }

  async function openEmbeddedChemistryAnswers(topic, key) {
    try {
      const answers = await loadChemistryAnswers();
      const answerText = answers[key];
      if (!answerText) throw new Error("The answer booklet could not be found.");

      if (activeAnswerUrl) URL.revokeObjectURL(activeAnswerUrl);
      activeAnswerUrl = URL.createObjectURL(new Blob([answerDocument(topic, answerText)], { type: "text/html" }));

      const dialog = document.querySelector("#pdfDialog");
      const frame = document.querySelector("#pdfFrame");
      const subject = document.querySelector("#dialogSubject");
      const title = document.querySelector("#dialogTitle");
      const download = document.querySelector("#dialogDownload");
      subject.textContent = "Chemistry 0620";
      title.textContent = `${topic.title} — Answers`;
      frame.src = activeAnswerUrl;
      download.href = activeAnswerUrl;
      download.download = `${key}-answers.html`;
      dialog.showModal();
      localStorage.setItem("igcse-last-opened", JSON.stringify({ topicId: topic.id, file: `embedded-answer:${key}`, kind: "Answers" }));
    } catch (error) {
      console.error(error);
      if (typeof showToast === "function") showToast(error.message || "The Chemistry answers could not be opened.");
      else alert(error.message || "The Chemistry answers could not be opened.");
    }
  }

  const heroActions = document.querySelector(".hero-actions");
  if (heroActions && !document.querySelector("#allSubjectsButton")) {
    const button = document.createElement("a");
    button.id = "allSubjectsButton";
    button.className = "button button-primary";
    button.href = "#subjects";
    button.textContent = "View all available subjects";
    heroActions.prepend(button);
  }

  for (const topic of topics) {
    const key = answerKeyByTopic[topic.id];
    if (key) topic.answers = `embedded-answer:${key}`;
  }

  renderOverview();
  renderLibrary();

  const sections = document.querySelector("#subjectSections");
  sections?.addEventListener("click", (event) => {
    const button = event.target.closest(".open-resource");
    const file = button?.dataset.file || "";
    if (!file.startsWith("embedded-answer:")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const topic = topics.find((item) => item.id === button.dataset.topicId);
    const key = file.slice("embedded-answer:".length);
    if (topic) openEmbeddedChemistryAnswers(topic, key);
  }, true);

  document.querySelector("#pdfDialog")?.addEventListener("close", () => {
    if (activeAnswerUrl) {
      URL.revokeObjectURL(activeAnswerUrl);
      activeAnswerUrl = null;
    }
  });
})();
