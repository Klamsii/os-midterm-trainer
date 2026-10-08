import { BOOKS, SOURCES, TOPICS, buildVariants } from "./content.js";

const variants = buildVariants();
const STORAGE_KEY = "os-midterm-trainer-v1";

const views = {
  dashboard: document.querySelector("#dashboardView"),
  exam: document.querySelector("#examView"),
  results: document.querySelector("#resultsView"),
  library: document.querySelector("#libraryView"),
  analytics: document.querySelector("#analyticsView")
};

const defaultState = {
  language: "kk",
  attempts: [],
  activeExam: null,
  selectedBook: BOOKS[0].id
};

let state = loadState();
let timerId = null;
let currentResult = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showView(name) {
  if (name !== "exam" && state.activeExam?.startedAt) {
    state.activeExam.elapsedBefore += Math.floor((Date.now() - state.activeExam.startedAt) / 1000);
    state.activeExam.startedAt = null;
    clearInterval(timerId);
    saveState();
  }
  Object.entries(views).forEach(([key, element]) => {
    element.hidden = key !== name;
  });
  document.querySelectorAll("[data-nav]").forEach(link => {
    link.classList.toggle("active", link.dataset.nav === name);
  });
  document.querySelector("#main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function latestAttemptFor(variantId) {
  return [...state.attempts].reverse().find(item => item.variantId === variantId);
}

function completedIds() {
  return new Set(state.attempts.map(item => item.variantId));
}

function recommendedVariantId() {
  const completed = completedIds();
  return variants.find(item => !completed.has(item.id))?.id ?? 1;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function aggregateAttempts(attempts = state.attempts) {
  const topics = {};
  const concepts = {};
  attempts.forEach(attempt => {
    attempt.details.forEach(detail => {
      topics[detail.topic] ??= { correct: 0, total: 0 };
      topics[detail.topic].total += 1;
      topics[detail.topic].correct += detail.correct ? 1 : 0;
      concepts[detail.conceptId] ??= { correct: 0, total: 0, topic: detail.topic };
      concepts[detail.conceptId].total += 1;
      concepts[detail.conceptId].correct += detail.correct ? 1 : 0;
    });
  });
  return { topics, concepts };
}

function accuracy(stat) {
  return stat?.total ? Math.round((stat.correct / stat.total) * 100) : 0;
}

function renderDashboard() {
  const completed = completedIds();
  const totalAnswered = state.attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const totalCorrect = state.attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const overall = totalAnswered ? Math.round(totalCorrect / totalAnswered * 100) : 0;
  const recommendation = recommendedVariantId();

  views.dashboard.innerHTML = `
    <div class="hero">
      <div class="hero-copy">
        <p class="eyebrow">20 variants · 500 unique questions</p>
        <h1>Train for the questions your OS midterm is likely to ask.</h1>
        <p class="lead">Every exam stays in English. After submission, the trainer explains each mistake in your selected language and builds the next study plan from your weakest topics.</p>
        <div class="button-row">
          <button class="btn btn-primary" data-start="${recommendation}">Start variant ${String(recommendation).padStart(2, "0")}</button>
          <a class="btn" href="#library">Open study library</a>
        </div>
      </div>
      <aside class="hero-panel" aria-label="Progress summary">
        <div><span class="stat-number">${completed.size}/20</span><span class="stat-label">variants completed</span></div>
        <div><span class="stat-number">${overall}%</span><span class="stat-label">overall accuracy</span></div>
        <div><span class="stat-number">${totalAnswered}</span><span class="stat-label">answers analysed</span></div>
      </aside>
    </div>

    <div class="section-head">
      <div><p class="eyebrow">Exam catalogue</p><h2>Choose any variant</h2></div>
      <p>No variant is locked. Complete them in any order.</p>
    </div>
    <div class="variant-grid">
      ${variants.map(variant => {
        const last = latestAttemptFor(variant.id);
        const done = Boolean(last);
        const active = state.activeExam?.variantId === variant.id;
        return `<article class="variant-card ${done ? "done" : ""} ${variant.id === recommendation ? "current" : ""}">
          <span class="variant-number">EXAM ${String(variant.id).padStart(2, "0")}</span>
          <h3>${variant.title}</h3>
          <p>${done ? `Latest score: ${last.score}/${last.total} · ${Math.round(last.score / last.total * 100)}%` : "25 questions · approximately 20 minutes"}</p>
          ${done ? `<div class="progress-line"><i style="width:${Math.round(last.score / last.total * 100)}%"></i></div>` : ""}
          <button class="btn ${variant.id === recommendation ? "btn-primary" : ""}" data-start="${variant.id}">${active ? "Continue" : done ? "Try again" : "Start variant"}</button>
        </article>`;
      }).join("")}
    </div>
  `;

  views.dashboard.querySelectorAll("[data-start]").forEach(button => {
    button.addEventListener("click", () => startExam(Number(button.dataset.start)));
  });
}

function startExam(variantId) {
  if (!state.activeExam || state.activeExam.variantId !== variantId) {
    state.activeExam = {
      variantId,
      index: 0,
      answers: {},
      startedAt: Date.now(),
      elapsedBefore: 0
    };
    saveState();
  }
  location.hash = `exam-${variantId}`;
  renderExam();
}

function examVariant() {
  return variants.find(item => item.id === state.activeExam?.variantId);
}

function elapsedSeconds() {
  if (!state.activeExam) return 0;
  return state.activeExam.elapsedBefore + (state.activeExam.startedAt
    ? Math.floor((Date.now() - state.activeExam.startedAt) / 1000)
    : 0);
}

function renderExam() {
  const active = state.activeExam;
  const variant = examVariant();
  if (!active || !variant) {
    location.hash = "dashboard";
    return;
  }
  if (!active.startedAt) {
    active.startedAt = Date.now();
    saveState();
  }
  clearInterval(timerId);
  showView("exam");
  drawExamQuestion();
  timerId = setInterval(() => {
    const timer = document.querySelector("#examTimer");
    if (timer) timer.textContent = formatTime(elapsedSeconds());
  }, 1000);
}

function drawExamQuestion() {
  const active = state.activeExam;
  const variant = examVariant();
  const question = variant.questions[active.index];
  const answeredCount = Object.keys(active.answers).length;
  const selected = active.answers[question.id];

  views.exam.innerHTML = `
    <div class="exam-topbar">
      <div>
        <p class="eyebrow">${variant.title}</p>
        <h2>Question ${active.index + 1} of ${variant.questions.length}</h2>
        <p>${answeredCount} answered · explanations appear after submission</p>
      </div>
      <div class="timer" id="examTimer" aria-label="Elapsed time">${formatTime(elapsedSeconds())}</div>
    </div>
    <div class="progress-line" aria-hidden="true"><i style="width:${(active.index + 1) / variant.questions.length * 100}%"></i></div>

    <div class="question-shell">
      <aside class="question-index" aria-label="Question navigation">
        <div class="question-dots">
          ${variant.questions.map((item, index) => `<button class="question-dot ${index === active.index ? "active" : ""} ${active.answers[item.id] !== undefined ? "answered" : ""}" data-question-index="${index}" aria-label="Question ${index + 1}">${index + 1}</button>`).join("")}
        </div>
        <div class="button-row"><a class="btn" href="#dashboard">Save and exit</a></div>
      </aside>
      <article class="question-main">
        <div class="question-meta"><span class="tag">${TOPICS[question.topic].label}</span><span class="tag">${question.difficulty}</span></div>
        <h3 class="question-text">${escapeHtml(question.question)}</h3>
        <div class="options" role="radiogroup" aria-label="Answer choices">
          ${question.choices.map((choice, index) => `<label class="option ${selected === choice ? "selected" : ""}">
            <input type="radio" name="answer" value="${index}" ${selected === choice ? "checked" : ""}>
            <span>${escapeHtml(choice)}</span>
          </label>`).join("")}
        </div>
        <div class="exam-actions">
          <button class="btn" id="previousQuestion" ${active.index === 0 ? "disabled" : ""}>Previous</button>
          ${active.index < variant.questions.length - 1
            ? `<button class="btn btn-primary" id="nextQuestion">Next</button>`
            : `<button class="btn btn-primary" id="submitExam" ${answeredCount < variant.questions.length ? "disabled" : ""}>Submit exam</button>`}
        </div>
        ${answeredCount < variant.questions.length && active.index === variant.questions.length - 1 ? `<p class="notice">Answer all ${variant.questions.length} questions before submitting. You can use the number grid to return to unanswered questions.</p>` : ""}
      </article>
    </div>
  `;

  views.exam.querySelectorAll("input[name=answer]").forEach(input => {
    input.addEventListener("change", event => {
      active.answers[question.id] = question.choices[Number(event.target.value)];
      saveState();
      drawExamQuestion();
    });
  });
  views.exam.querySelectorAll("[data-question-index]").forEach(button => {
    button.addEventListener("click", () => {
      active.index = Number(button.dataset.questionIndex);
      saveState();
      drawExamQuestion();
    });
  });
  document.querySelector("#previousQuestion")?.addEventListener("click", () => moveQuestion(-1));
  document.querySelector("#nextQuestion")?.addEventListener("click", () => moveQuestion(1));
  document.querySelector("#submitExam")?.addEventListener("click", submitExam);
}

function moveQuestion(delta) {
  const variant = examVariant();
  state.activeExam.index = Math.max(0, Math.min(variant.questions.length - 1, state.activeExam.index + delta));
  saveState();
  drawExamQuestion();
}

function submitExam() {
  const active = state.activeExam;
  const variant = examVariant();
  if (!active || Object.keys(active.answers).length !== variant.questions.length) return;

  const details = variant.questions.map(question => ({
    questionId: question.id,
    conceptId: question.conceptId,
    topic: question.topic,
    question: question.question,
    selected: active.answers[question.id],
    answer: question.answer,
    correct: active.answers[question.id] === question.answer,
    explanation: question.explanation
  }));
  const score = details.filter(item => item.correct).length;
  currentResult = {
    id: `${variant.id}-${Date.now()}`,
    variantId: variant.id,
    timestamp: new Date().toISOString(),
    duration: elapsedSeconds(),
    score,
    total: details.length,
    details
  };
  state.attempts.push(currentResult);
  state.activeExam = null;
  saveState();
  clearInterval(timerId);
  location.hash = `results-${currentResult.id}`;
  renderResults(currentResult);
}

function weakestTopics(attempts) {
  const { topics } = aggregateAttempts(attempts);
  return Object.entries(topics)
    .map(([topic, stat]) => ({ topic, ...stat, accuracy: accuracy(stat) }))
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total);
}

function localizedExplanation(detail) {
  return detail.explanation[state.language] || detail.explanation.kk;
}

function renderResults(result = currentResult || state.attempts.at(-1)) {
  if (!result) {
    location.hash = "dashboard";
    return;
  }
  currentResult = result;
  showView("results");
  const percentage = Math.round(result.score / result.total * 100);
  const mistakes = result.details.filter(item => !item.correct);
  const topicStats = weakestTopics([result]);
  const nextId = variants.find(item => item.id > result.variantId && !completedIds().has(item.id))?.id
    ?? variants.find(item => !completedIds().has(item.id))?.id
    ?? ((result.variantId % variants.length) + 1);

  views.results.innerHTML = `
    <p class="eyebrow">Variant ${String(result.variantId).padStart(2, "0")} complete</p>
    <h1>${percentage >= 84 ? "Strong result." : percentage >= 64 ? "Good base. Focus the gaps." : "Your next study priorities are clear."}</h1>
    <p class="lead">The recommendations below are calculated from this attempt. Explanations use ${document.querySelector("#languageSelect").selectedOptions[0].textContent}.</p>
    <div class="score-strip">
      <div class="score-cell"><strong>${result.score}/${result.total}</strong><span>correct answers</span></div>
      <div class="score-cell"><strong>${percentage}%</strong><span>accuracy</span></div>
      <div class="score-cell"><strong>${mistakes.length}</strong><span>mistakes analysed</span></div>
      <div class="score-cell"><strong>${formatTime(result.duration)}</strong><span>time</span></div>
    </div>

    <div class="results-grid">
      <section class="panel">
        <p class="eyebrow">Topic performance</p>
        <h2>What to study next</h2>
        ${topicStats.map(stat => topicBar(stat.topic, stat.accuracy, `${stat.correct}/${stat.total}`)).join("")}
      </section>
      <aside class="panel">
        <p class="eyebrow">Adaptive recommendation</p>
        <h2>${mistakes.length ? `Review ${TOPICS[topicStats[0].topic].label}` : "Keep the momentum"}</h2>
        <p>${mistakes.length ? `This was your weakest area in the attempt. Read its short chapter, review the mistakes below, then start the suggested variant.` : "You answered every question correctly. Continue with another variant to test the same skills in new scenarios."}</p>
        <div class="button-row">
          ${mistakes.length ? `<a class="btn" href="#library-${TOPICS[topicStats[0].topic].book}">Read recommended chapter</a>` : ""}
          <button class="btn btn-primary" data-start="${nextId}">Start variant ${String(nextId).padStart(2, "0")}</button>
          <a class="btn" href="#dashboard">Choose another</a>
        </div>
      </aside>
    </div>

    <div class="section-head"><div><p class="eyebrow">Answer review</p><h2>${mistakes.length ? "Mistakes and explanations" : "All answers"}</h2></div><p>Question text remains in English.</p></div>
    <div class="review-list">
      ${(mistakes.length ? mistakes : result.details).map((detail, index) => `<details class="review-item" ${index === 0 ? "open" : ""}>
        <summary>${escapeHtml(detail.question)}</summary>
        <div class="review-body">
          <p class="${detail.correct ? "correct" : "wrong"}"><strong>Your answer:</strong> ${escapeHtml(detail.selected)}</p>
          <p class="correct"><strong>Correct answer:</strong> ${escapeHtml(detail.answer)}</p>
          <p><strong>Explanation:</strong> ${escapeHtml(localizedExplanation(detail))}</p>
        </div>
      </details>`).join("")}
    </div>
  `;
  views.results.querySelector("[data-start]")?.addEventListener("click", event => startExam(Number(event.currentTarget.dataset.start)));
}

function topicBar(topic, value, detail) {
  const color = value < 50 ? "var(--danger)" : value < 75 ? "var(--warning)" : "var(--accent)";
  return `<div class="topic-bar">
    <div class="topic-bar-label"><span>${TOPICS[topic].label}</span><strong>${detail ?? `${value}%`}</strong></div>
    <div class="bar-track"><i style="width:${value}%;background:${color}"></i></div>
  </div>`;
}

function renderLibrary(bookId = state.selectedBook) {
  const selected = BOOKS.find(book => book.id === bookId) || BOOKS[0];
  state.selectedBook = selected.id;
  saveState();
  showView("library");
  views.library.innerHTML = `
    <p class="eyebrow">Study library</p>
    <h1>Short chapters for every tested skill.</h1>
    <p class="lead">Content follows the selected explanation language. Commands and exam terminology remain in English.</p>
    <div class="book-layout">
      <nav class="book-list" aria-label="Study chapters">
        ${BOOKS.map(book => `<button class="book-card ${book.id === selected.id ? "active" : ""}" data-book="${book.id}">${escapeHtml(book.title[state.language])}</button>`).join("")}
      </nav>
      <article class="book-content">
        <p class="eyebrow">${TOPICS[selected.topic].label}</p>
        <h2>${escapeHtml(selected.title[state.language])}</h2>
        ${selected.body[state.language]}
        <div class="button-row"><button class="btn btn-primary" data-start="${recommendedVariantId()}">Practice this material</button></div>
        <div class="source-list">
          <h3>Primary references</h3>
          <ul>${SOURCES.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`).join("")}</ul>
        </div>
      </article>
    </div>
  `;
  views.library.querySelectorAll("[data-book]").forEach(button => {
    button.addEventListener("click", () => {
      location.hash = `library-${button.dataset.book}`;
      renderLibrary(button.dataset.book);
    });
  });
  views.library.querySelector("[data-start]")?.addEventListener("click", event => startExam(Number(event.currentTarget.dataset.start)));
}

function renderAnalytics() {
  showView("analytics");
  if (!state.attempts.length) {
    views.analytics.innerHTML = `
      <p class="eyebrow">Learning analytics</p><h1>Your mistake map will appear here.</h1>
      <div class="empty-state"><p>Complete one variant to unlock topic mastery, repeated-error detection, and recommendations.</p><button class="btn btn-primary" data-start="1">Start variant 01</button></div>`;
    views.analytics.querySelector("[data-start]").addEventListener("click", () => startExam(1));
    return;
  }
  const { topics, concepts } = aggregateAttempts();
  const sortedTopics = Object.entries(topics).sort((a, b) => accuracy(a[1]) - accuracy(b[1]));
  const repeated = Object.entries(concepts)
    .map(([conceptId, stat]) => ({ conceptId, ...stat, errors: stat.total - stat.correct }))
    .filter(item => item.errors > 0)
    .sort((a, b) => b.errors - a.errors || accuracy(a) - accuracy(b));
  const total = state.attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const correct = state.attempts.reduce((sum, attempt) => sum + attempt.score, 0);

  views.analytics.innerHTML = `
    <p class="eyebrow">Learning analytics</p>
    <h1>Your results become a study plan.</h1>
    <p class="lead">The trainer combines every attempt, identifies persistent errors, and points to the exact chapter that addresses them.</p>
    <div class="score-strip">
      <div class="score-cell"><strong>${state.attempts.length}</strong><span>attempts</span></div>
      <div class="score-cell"><strong>${total}</strong><span>answers</span></div>
      <div class="score-cell"><strong>${Math.round(correct / total * 100)}%</strong><span>overall accuracy</span></div>
      <div class="score-cell"><strong>${repeated.reduce((sum, item) => sum + item.errors, 0)}</strong><span>total errors</span></div>
    </div>
    <div class="analytics-grid">
      <section class="analysis-card"><p class="eyebrow">Mastery by topic</p><h2>Weakest first</h2>${sortedTopics.map(([topic, stat]) => topicBar(topic, accuracy(stat))).join("")}</section>
      <section class="analysis-card">
        <p class="eyebrow">Repeated mistakes</p><h2>Priority concepts</h2>
        ${repeated.length ? `<ol>${repeated.slice(0, 8).map(item => `<li><strong>${escapeHtml(item.conceptId.replaceAll("-", " "))}</strong> — ${item.errors} error${item.errors === 1 ? "" : "s"} · <a href="#library-${TOPICS[item.topic].book}">study</a></li>`).join("")}</ol>` : `<p>No mistakes recorded.</p>`}
      </section>
    </div>
    <div class="section-head"><div><p class="eyebrow">Attempt history</p><h2>Previous results</h2></div><button class="btn btn-danger" id="resetProgress">Reset local progress</button></div>
    <div class="review-list">
      ${[...state.attempts].reverse().map(attempt => `<details class="review-item"><summary>Variant ${String(attempt.variantId).padStart(2, "0")} · ${attempt.score}/${attempt.total} · ${new Date(attempt.timestamp).toLocaleString()}</summary><div class="review-body"><p>${attempt.total - attempt.score} mistakes · ${formatTime(attempt.duration)}</p><button class="btn" data-review="${attempt.id}">Open result</button></div></details>`).join("")}
    </div>
  `;
  views.analytics.querySelectorAll("[data-review]").forEach(button => {
    button.addEventListener("click", () => {
      const result = state.attempts.find(attempt => attempt.id === button.dataset.review);
      location.hash = `results-${result.id}`;
      renderResults(result);
    });
  });
  document.querySelector("#resetProgress").addEventListener("click", () => {
    if (window.confirm("Delete all locally saved attempts and active exam progress?")) {
      state = { ...defaultState, language: state.language };
      saveState();
      renderAnalytics();
    }
  });
}

function route() {
  const hash = location.hash.replace(/^#/, "") || "dashboard";
  if (hash.startsWith("exam-")) {
    const id = Number(hash.split("-")[1]);
    if (!state.activeExam || state.activeExam.variantId !== id) startExam(id);
    else renderExam();
    return;
  }
  if (hash.startsWith("results-")) {
    const id = hash.slice("results-".length);
    const result = state.attempts.find(item => item.id === id) || currentResult || state.attempts.at(-1);
    renderResults(result);
    return;
  }
  if (hash.startsWith("library")) {
    const id = hash.startsWith("library-") ? hash.slice("library-".length) : state.selectedBook;
    renderLibrary(id);
    return;
  }
  if (hash === "analytics") {
    renderAnalytics();
    return;
  }
  showView("dashboard");
  renderDashboard();
}

document.querySelector("#languageSelect").value = state.language;
document.querySelector("#languageSelect").addEventListener("change", event => {
  state.language = event.target.value;
  saveState();
  route();
});

window.addEventListener("hashchange", route);
window.addEventListener("beforeunload", () => {
  if (state.activeExam) {
    state.activeExam.elapsedBefore = elapsedSeconds();
    state.activeExam.startedAt = Date.now();
    saveState();
  }
});

route();
