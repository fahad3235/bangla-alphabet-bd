# Bangla Alphabet BD

Learn the 50 letters of the Bangla **bornomala** — 11 sorborno (vowels) and 39
bynjonborno (consonants) — with an explorer, flashcards, and a quiz. Bilingual
EN/বাংলা UI, fully offline, no account, no network requests.

## Problem

Children and new learners of Bangla need one simple place to see every letter,
hear how its name sounds in romanization, connect it to a familiar example word,
and drill themselves — without ads, sign-ups, or an internet connection.

## Features

1. **Explore** — grid of all 50 letters; filter by vowels / consonants; search
   by letter, romanized name, Bangla name, or example word (Bangla or English).
   Tapping a letter shows its name, Bangla name, example word (Bangla +
   transliteration + English meaning), and where it sits in a word.
2. **Flashcards** — flip cards (letter on the front, name + example on the
   back), previous / next / shuffle, and mark-as-learned tracking.
3. **Quiz** — 10 questions in two modes (letter → name, name → letter), 4
   options, instant feedback, score + streak, best score saved.
4. **Progress** — learned letters persist in localStorage (per device), with a
   header progress count and a reset button.
5. **Bilingual UI** — EN/বাংলা toggle persisted across visits, with Bengali
   digits in বাংলা mode; responsive down to 390 px.

## Letters and examples

10 letters never start a common word (ঙ, ঞ, ণ, ড়, ঢ়, য়, ৎ, ং, ঃ, ঁ). For
those, the example is a familiar word where the letter sits inside or at the
end (e.g. ঙ → রঙ, ঞ → চঞ্চল, ণ → বর্ণ). The app says so explicitly instead of
inventing a word-initial example.

## Stack

Vanilla HTML / CSS / JavaScript. No framework, no build step, no dependencies.
Data lives in `js/data.js`; pure logic in `js/logic.js` (DOM-free, unit-tested).

## Prerequisites

Any modern browser. For tests: Node.js 18+.

## Install / run

No install step — open `index.html` in a browser, or serve the folder:

```sh
npx serve .
# or
python3 -m http.server 8000
```

## Dev commands

```sh
node tests/unit.test.js   # 33 unit tests (data, filters, quiz, digits, stats)
node tests/smoke.mjs      # 19 headless-Chrome smoke checks (needs a Chromium
                          # headless shell on remote-debugging port 9225)
```

Smoke setup (Playwright headless shell, same Chromium engine):

```sh
~/.cache/ms-playwright/chromium_headless_shell-1187/chrome-linux/headless_shell \
  --no-sandbox --disable-gpu --remote-debugging-port=9225 about:blank &
node tests/smoke.mjs
```

## Environment

None. The app makes zero network requests and stores only progress
(`bangla-alphabet-bd-v1` in localStorage) on the user's device.

## Testing

- `tests/unit.test.js`: 33/33 pass — 50-letter integrity (11 + 39, unique chars,
  every field present), EN/BN i18n key parity, Bengali-digit conversion, filter
  math (vowel 11, consonant 39, "fish" → ম), quiz generation (10 distinct
  questions, 4 distinct options, correct answer index), grading, learned stats.
- `tests/smoke.mjs`: 19/19 pass twice in a row — 50 cells, vowel filter 11,
  search, detail panel, mark-learned progress 1 of 50, flashcard flip, quiz
  start / answer / advance, EN → BN toggle with Bengali digits, reload
  persistence, 390 px no-overflow, 0 console/page errors.
- Hand-verified: first letter অ → "Shôre Ô" → অজগর (python); vowel filter 11;
  quiz option sets always contain the correct answer (unit-tested).

## Deployment

Static site — GitHub Pages (main branch, root). No server code.

## Limitations

- Letter names use romanization as a pronunciation hint, not audio; there is no
  spoken pronunciation yet.
- Example words follow standard school usage; they are learning aids, not
  scholarly citations.
- Progress lives in one browser's localStorage; it does not sync across devices.
- No conjunct letters (যুক্তাক্ষর) yet — the 50 base letters only.

## Status

MVP complete. Future ideas: audio pronunciation, conjunct-letter deck,
writing-practice (stroke order) mode.
