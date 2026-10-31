// Node unit tests for bangla-alphabet-bd. Run: node tests/unit.test.js
const assert = require("assert");
const { BA_LETTERS } = require("../js/data.js");
const L = require("../js/logic.js");
const { BA_I18N } = require("../js/i18n.js");
let n = 0;
function ok(cond, name) { assert.ok(cond, name); n++; console.log("ok - " + name); }

// --- data integrity ---
ok(BA_LETTERS.length === 50, "50 letters");
ok(BA_LETTERS.filter(l => l.type === "vowel").length === 11, "11 vowels");
ok(BA_LETTERS.filter(l => l.type === "consonant").length === 39, "39 consonants");
ok(new Set(BA_LETTERS.map(l => l.ch)).size === 50, "all chars unique");
ok(BA_LETTERS.every(l => l.ch && l.name && l.bnName && l.ex && l.ex.bn && l.ex.tr && l.ex.en && l.pos),
   "every letter has char/name/bnName/example/position");
ok(BA_LETTERS[0].ch === "\u0985" && BA_LETTERS[0].name === "Sh\u00f4re \u00d4", "first letter is Sh\u00f4re \u00d4");
ok(BA_LETTERS[49].ch === "\u0981" && BA_LETTERS[49].name === "Ch\u00f4ndrobindu", "last letter is Ch\u00f4ndrobindu");
ok(BA_LETTERS.filter(l => l.pos !== "initial").length === 10, "10 non-initial letters");
ok(BA_LETTERS.every(l => ["initial", "middle", "final"].includes(l.pos)), "positions valid");
ok(BA_LETTERS.filter(l => l.ex.en === "moon").length === 2, "moon example used twice (chand + chondrobindu) by design");

// --- i18n ---
ok(Object.keys(BA_I18N.en).length === Object.keys(BA_I18N.bn).length, "EN/BN key sets match");
ok(Object.keys(BA_I18N.en).every(k => BA_I18N.bn[k]), "every EN key has a BN string");
ok(BA_I18N.bn.title === "\u09ac\u09be\u0982\u09b2\u09be \u09ac\u09b0\u09cd\u09a3\u09ae\u09be\u09b2\u09be \u09ac\u09bf\u09a1\u09bf", "BN title correct");

// --- digits ---
ok(L.toBnDigits("50") === "\u09eb\u09e6", "50 -> Bengali digits");
ok(L.toBnDigits("Question 1/10") === "Question \u09e7/\u09e7\u09e6", "mixed digits converted");

// --- filtering ---
ok(L.filterLetters(BA_LETTERS, "", "all").length === 50, "empty query = 50");
ok(L.filterLetters(BA_LETTERS, "", "vowel").length === 11, "vowel filter = 11");
ok(L.filterLetters(BA_LETTERS, "", "consonant").length === 39, "consonant filter = 39");
ok(L.filterLetters(BA_LETTERS, "fish", "all").length === 1, "search 'fish' -> 1 (maachh)");
ok(L.filterLetters(BA_LETTERS, "fish", "all")[0].ch === "\u09ae", "fish result is Ma");
ok(L.filterLetters(BA_LETTERS, "\u0997\u09b0\u09c1", "all").length === 1, "Bangla search garu -> 1");
ok(L.filterLetters(BA_LETTERS, "zzz", "all").length === 0, "no-match -> 0");
ok(L.filterLetters(BA_LETTERS, "SH", "all").length >= 3, "case-insensitive name search");

// --- quiz generation (deterministic rng) ---
let seed = 42;
const rng = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const q1 = L.makeQuiz(BA_LETTERS, "letterToName", 10, rng);
ok(q1.length === 10, "quiz has 10 questions");
ok(q1.every(q => q.options.length === 4 && new Set(q.options).size === 4), "4 distinct options each");
ok(q1.every(q => q.options[q.answerIndex] === q.letter.name), "answer index points at correct name");
ok(new Set(q1.map(q => q.letter.ch)).size === 10, "10 distinct quiz letters");
const q2 = L.makeQuiz(BA_LETTERS, "nameToLetter", 10, rng);
ok(q2.every(q => q.options[q.answerIndex] === q.letter.ch), "name->letter answers correct");
ok(q2.every(q => q.prompt === q.letter.name), "name->letter prompt is the name");
ok(L.grade(q1[0], q1[0].answerIndex) === true, "grade correct");
ok(L.grade(q1[0], (q1[0].answerIndex + 1) % 4) === false, "grade wrong");

// --- stats ---
ok(L.learnedStats(["\u0985", "\u0986"], 50).pct === 4, "2/50 = 4%");
ok(L.learnedStats([], 50).pct === 0, "0/50 = 0%");

console.log(n + " unit tests passed");
