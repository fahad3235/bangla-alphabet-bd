/* Pure, DOM-free logic for bangla-alphabet-bd. Unit-tested in tests/unit.test.js. */
var BA_LOGIC = (function () {
  var BN_DIGITS = ["\u09e6", "\u09e7", "\u09e8", "\u09e9", "\u09ea",
                   "\u09eb", "\u09ec", "\u09ed", "\u09ee", "\u09ef"];
  function toBnDigits(s) {
    return String(s).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }
  function norm(s) { return String(s || "").trim().toLowerCase(); }
  // Query matches the letter char, romanized name, Bangla name, or example
  // (Bangla word, transliteration, English meaning).
  function filterLetters(letters, query, typeFilter) {
    var q = norm(query);
    return letters.filter(function (l) {
      if (typeFilter && typeFilter !== "all" && l.type !== typeFilter) return false;
      if (!q) return true;
      return l.ch.indexOf(q) !== -1 ||
        norm(l.name).indexOf(q) !== -1 ||
        l.bnName.indexOf(q) !== -1 ||
        l.ex.bn.indexOf(q) !== -1 ||
        norm(l.ex.tr).indexOf(q) !== -1 ||
        norm(l.ex.en).indexOf(q) !== -1;
    });
  }
  function shuffleCopy(arr, rng) {
    var a = arr.slice(), r = rng || Math.random, i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(r() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  // mode: 'letterToName' (prompt = char, options = names) or
  // 'nameToLetter' (prompt = romanized name, options = chars).
  // Returns count questions; each has 4 distinct options including the answer.
  function makeQuiz(letters, mode, count, rng) {
    var r = rng || Math.random;
    var pool = shuffleCopy(letters, r).slice(0, Math.min(count, letters.length));
    return pool.map(function (letter) {
      var others = shuffleCopy(letters.filter(function (l) { return l.ch !== letter.ch; }), r).slice(0, 3);
      var options, answer;
      if (mode === "nameToLetter") {
        options = shuffleCopy([letter].concat(others), r).map(function (l) { return l.ch; });
        answer = options.indexOf(letter.ch);
        return { prompt: letter.name, promptKind: "name", options: options, answerIndex: answer, letter: letter };
      }
      options = shuffleCopy([letter].concat(others), r).map(function (l) { return l.name; });
      answer = options.indexOf(letter.name);
      return { prompt: letter.ch, promptKind: "char", options: options, answerIndex: answer, letter: letter };
    });
  }
  function grade(question, chosenIndex) { return chosenIndex === question.answerIndex; }
  function learnedStats(learnedChars, total) {
    var n = learnedChars ? learnedChars.length : 0;
    return { learned: n, total: total, pct: total ? Math.round((n / total) * 100) : 0 };
  }
  return { toBnDigits: toBnDigits, filterLetters: filterLetters,
           shuffleCopy: shuffleCopy, makeQuiz: makeQuiz, grade: grade,
           learnedStats: learnedStats };
})();
if (typeof module !== "undefined" && module.exports) module.exports = BA_LOGIC;
