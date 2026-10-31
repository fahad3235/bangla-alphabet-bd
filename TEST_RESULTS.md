# TEST RESULTS — bangla-alphabet-bd (factory run, 2026-10-31, 10:00 slot)

## Unit tests: 33/33 pass
Command: `node tests/unit.test.js`
- Data: 50 letters, 11 vowels, 39 consonants, all chars unique, every letter
  has char / romanized name / Bangla name / example (bn + transliteration +
  English) / position; first = অ Shôre Ô, last = ঁ Chôndrobindu;
  10 non-initial letters (ঙ, ঞ, ণ, ড়, ঢ়, য়, ৎ, ং, ঃ, ঁ).
- i18n: EN/BN key sets identical; BN title verified.
- Digits: 50 -> ৫০; mixed strings convert digits only.
- Filters: empty = 50, vowel = 11, consonant = 39, "fish" -> exactly ম,
  Bangla search গরু -> 1, no-match -> 0, case-insensitive.
- Quiz (seeded rng): 10 questions, 4 distinct options each, answer index
  correct in both modes, 10 distinct letters, grading true/false.
- Stats: 2/50 = 4%, 0/50 = 0%.

## Headless-Chrome smoke: 19/19 pass, twice in a row
Command: `node tests/smoke.mjs` against Playwright headless shell 1187
(HeadlessChrome/140) on remote-debugging port 9225, file:// page.
Checks: h1 EN title, 50 cells, 3 tabs, vowel filter = 11, search "fish" = 1,
detail shows first letter + "python" example, mark-learned -> "1 of 50",
flashcard renders + flips to Example, card position 1/50, quiz 4 options,
feedback after answer, advance to Q2, BN title after toggle, Bengali digit in
progress, progress persists after reload, 390 px no-overflow, 0 console/page
errors.

## Repairs during this run
1. Real app bug: quote mismatch in quiz start-screen HTML string
   (`": </label>'`) threw a SyntaxError that blanked the whole app — fixed to
   `": </label>"`, syntax-checked all 4 JS files, smoke went 3/19 -> 18/19.
2. Test-harness fix: smoke runs in one browser process share localStorage, so
   run 2 inherited BN lang + a learned letter from run 1 and failed 8 checks
   that were not app bugs — harness now clears localStorage and reloads before
   asserting, and the Q2 check is language-agnostic. Two consecutive clean
   runs: 19/19 each.
3. Build-hygiene: a Python generator step that truncated tests/smoke.mjs to
   0 bytes on a failed write was caught by `wc -c` and the file was rewritten
   from scratch (escapes only); all shipped sources verified pure ASCII with
   `grep -P '[^\x00-\x7F]'` = zero matches.

## Notes
- The stock /opt/meta-chromium/chrome binary refuses to start in this VM
  ("Hatch WebGL domain policy is required"), so smoke used the Playwright
  headless shell instead — same Chromium engine, real DOM/CSS behavior.
- Bengali text in shipped sources is stored as \uXXXX escapes (data.js,
  i18n.js) or numeric entities; the browser decodes them identically, so
  Bengali renders intact while push payloads stay ASCII-safe.
