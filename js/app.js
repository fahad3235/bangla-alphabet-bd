/* bangla-alphabet-bd: DOM wiring. All visible text comes from BA_I18N. */
(function () {
  var LS_KEY = "bangla-alphabet-bd-v1";
  var letters = BA_LETTERS, L = BA_LOGIC;
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch (e) { saved = {}; }
  var lang = saved.lang === "bn" ? "bn" : "en";
  var learned = new Set(saved.learned || []);
  var best = saved.best || 0;
  var typeFilter = "all", query = "", selected = null;
  var cardOrder = letters.map(function (_, i) { return i; });
  var cardIdx = 0, flipped = false;
  var quiz = null; // {mode, questions, qi, score, streak, answered, picked}

  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        lang: lang, learned: Array.from(learned), best: best
      }));
    } catch (e) { /* storage unavailable: app still works in-memory */ }
  }
  function t(k) { return BA_I18N[lang][k]; }
  function fmt(n) { return lang === "bn" ? L.toBnDigits(n) : String(n); }
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function renderStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    $("searchInput").placeholder = t("searchPlaceholder");
    $("langBtn").textContent = t("langBtn");
    $("progress").textContent = t("learned") + " " + fmt(L.learnedStats(Array.from(learned), 50).learned) +
      " " + t("of") + " " + fmt(50) + " " + t("letters");
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
  }

  function renderGrid() {
    var list = L.filterLetters(letters, query, typeFilter);
    var grid = $("grid");
    if (!list.length) { grid.innerHTML = '<div class="empty">' + esc(t("empty")) + "</div>"; return; }
    grid.innerHTML = list.map(function (l) {
      var cls = "cell " + l.type + (selected === l.ch ? " selected" : "");
      var dot = learned.has(l.ch) ? '<span class="dot">\u2713</span>' : "";
      return '<button class="' + cls + '" data-ch="' + esc(l.ch) + '">' + esc(l.ch) + dot + "</button>";
    }).join("");
    grid.querySelectorAll(".cell").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selected = btn.getAttribute("data-ch"); renderGrid(); renderDetail();
      });
    });
  }
  function renderDetail() {
    var d = $("detail");
    if (!selected) { d.innerHTML = '<p class="muted">' + esc(t("detailHint")) + "</p>"; return; }
    var l = letters.filter(function (x) { return x.ch === selected; })[0];
    var posKey = l.pos === "initial" ? "posInitial" : l.pos === "final" ? "posFinal" : "posMiddle";
    var note = l.pos === "initial" ? "" :
      '<p class="muted">' + esc(t("posNoteNonInitial")) + "</p>";
    var isLearned = learned.has(l.ch);
    d.innerHTML = '<div class="big">' + esc(l.ch) + "</div>" +
      "<h2>" + esc(l.name) + " - " + esc(l.bnName) + "</h2>" +
      "<p><b>" + esc(t("example")) + ":</b> " + esc(l.ex.bn) + " (" + esc(l.ex.tr) + ") - " + esc(l.ex.en) + "</p>" +
      "<p><b>" + esc(t("position")) + ":</b> " + esc(t(posKey)) + "</p>" + note +
      '<p><button class="primary" id="markBtn">' + esc(isLearned ? t("learnedBadge") + " \u2713" : t("markLearned")) + "</button></p>";
    $("markBtn").addEventListener("click", function () {
      if (learned.has(l.ch)) learned.delete(l.ch); else learned.add(l.ch);
      persist(); renderStatic(); renderGrid(); renderDetail();
    });
  }

  function renderCard() {
    var l = letters[cardOrder[cardIdx]];
    var box = $("flashBox");
    if (!flipped) {
      box.innerHTML = '<div class="letter">' + esc(l.ch) + "</div>" +
        '<div class="hint">' + esc(t("cardFrontHint")) + "</div>";
    } else {
      box.innerHTML = '<div class="name">' + esc(l.name) + " - " + esc(l.bnName) + "</div>" +
        "<p>" + esc(t("example")) + ": " + esc(l.ex.bn) + " (" + esc(l.ex.tr) + ") - " + esc(l.ex.en) + "</p>" +
        '<div class="hint">' + esc(t("cardFrontHint")) + "</div>";
    }
    $("cardPos").textContent = fmt(cardIdx + 1) + " / " + fmt(letters.length);
    var mb = $("cardMarkBtn");
    mb.textContent = learned.has(l.ch) ? t("learnedBadge") + " \u2713" : t("markLearned");
  }

  function renderQuiz() {
    var qz = $("quizBox");
    if (!quiz) {
      qz.innerHTML = '<p><label>' + esc(t("quizMode")) + ": </label>" +
        '<select id="quizModeSel"><option value="letterToName">' + esc(t("modeLetterToName")) + "</option>" +
        '<option value="nameToLetter">' + esc(t("modeNameToLetter")) + "</option></select></p>" +
        '<p><button class="primary" id="quizStartBtn">' + esc(t("quizStart")) + "</button></p>" +
        '<p class="muted">' + esc(t("quizBest")) + ": " + fmt(best) + " / 10</p>";
      $("quizStartBtn").addEventListener("click", function () {
        var mode = $("quizModeSel").value;
        quiz = { mode: mode, questions: L.makeQuiz(letters, mode, 10), qi: 0,
                 score: 0, streak: 0, answered: false, picked: -1 };
        renderQuiz();
      });
      return;
    }
    if (quiz.qi >= quiz.questions.length) {
      if (quiz.score > best) { best = quiz.score; persist(); }
      qz.innerHTML = "<h3>" + esc(t("quizDone")) + "</h3>" +
        "<p>" + esc(t("quizScore")) + ": " + fmt(quiz.score) + " / 10</p>" +
        '<p class="muted">' + esc(t("quizBest")) + ": " + fmt(best) + " / 10</p>" +
        '<p><button class="primary" id="quizAgainBtn">' + esc(t("quizAgain")) + "</button></p>";
      $("quizAgainBtn").addEventListener("click", function () { quiz = null; renderQuiz(); });
      return;
    }
    var q = quiz.questions[quiz.qi];
    var promptCls = q.promptKind === "name" ? "q-prompt name" : "q-prompt";
    var html = "<p>" + esc(t("quizQuestion")) + " " + fmt(quiz.qi + 1) + "/10 &nbsp;&middot;&nbsp; " +
      esc(t("quizScore")) + ": " + fmt(quiz.score) + " &nbsp;&middot;&nbsp; " + esc(t("quizStreak")) + ": " + fmt(quiz.streak) + "</p>" +
      '<div class="' + promptCls + '">' + esc(q.prompt) + "</div>" +
      '<div class="opts">' + q.options.map(function (o, i) {
        var cls = "";
        if (quiz.answered && i === q.answerIndex) cls = "correct";
        else if (quiz.answered && i === quiz.picked) cls = "wrong";
        return '<button data-i="' + i + '" class="' + cls + '"' +
          (quiz.answered ? " disabled" : "") + ">" + esc(o) + "</button>";
      }).join("") + "</div>";
    if (quiz.answered) {
      var ok = quiz.picked === q.answerIndex;
      html += '<div class="feedback ' + (ok ? "ok" : "bad") + '">' +
        esc(ok ? t("quizCorrect") : t("quizWrong") + " " + q.options[q.answerIndex]) + "</div>" +
        '<p style="text-align:center"><button class="primary" id="quizNextBtn">' + esc(t("quizNext")) + "</button></p>";
    }
    qz.innerHTML = html;
    qz.querySelectorAll(".opts button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quiz.answered) return;
        quiz.picked = +btn.getAttribute("data-i");
        quiz.answered = true;
        if (quiz.picked === q.answerIndex) { quiz.score++; quiz.streak++; }
        else { quiz.streak = 0; }
        renderQuiz();
      });
    });
    var nb = $("quizNextBtn");
    if (nb) nb.addEventListener("click", function () {
      quiz.qi++; quiz.answered = false; quiz.picked = -1; renderQuiz();
    });
  }

  function switchTab(name) {
    document.querySelectorAll(".tabs button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === name);
    });
    ["explore", "cards", "quiz"].forEach(function (n) {
      $("tab-" + n).style.display = n === name ? "block" : "none";
    });
  }

  document.querySelectorAll(".tabs button").forEach(function (b) {
    b.addEventListener("click", function () { switchTab(b.getAttribute("data-tab")); });
  });
  $("langBtn").addEventListener("click", function () {
    lang = lang === "en" ? "bn" : "en"; persist();
    renderStatic(); renderGrid(); renderDetail(); renderCard(); renderQuiz();
  });
  $("searchInput").addEventListener("input", function (e) { query = e.target.value; renderGrid(); });
  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      typeFilter = b.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (x) {
        x.classList.toggle("active", x === b);
      });
      renderGrid();
    });
  });
  $("flashBox").addEventListener("click", function () { flipped = !flipped; renderCard(); });
  $("cardFlipBtn").addEventListener("click", function () { flipped = !flipped; renderCard(); });
  $("cardPrevBtn").addEventListener("click", function () {
    cardIdx = (cardIdx - 1 + cardOrder.length) % cardOrder.length; flipped = false; renderCard();
  });
  $("cardNextBtn").addEventListener("click", function () {
    cardIdx = (cardIdx + 1) % cardOrder.length; flipped = false; renderCard();
  });
  $("cardShuffleBtn").addEventListener("click", function () {
    cardOrder = L.shuffleCopy(cardOrder); cardIdx = 0; flipped = false; renderCard();
  });
  $("cardMarkBtn").addEventListener("click", function () {
    var l = letters[cardOrder[cardIdx]];
    if (learned.has(l.ch)) learned.delete(l.ch); else learned.add(l.ch);
    persist(); renderStatic(); renderGrid(); renderCard();
  });
  $("resetBtn").addEventListener("click", function () {
    learned = new Set(); persist();
    renderStatic(); renderGrid(); renderDetail(); renderCard();
    $("resetMsg").textContent = t("resetDone");
  });

  renderStatic(); renderGrid(); renderDetail(); renderCard(); renderQuiz();
})();
