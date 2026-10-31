// Headless-Chrome smoke via raw CDP. Run: node tests/smoke.mjs
// Expects chrome listening on 127.0.0.1:9225 (see TEST_RESULTS.md command).
const targets = await (await fetch('http://127.0.0.1:9225/json')).json();
const wsUrl = targets.find(t => t.type === 'page').webSocketDebuggerUrl;
const ws = new WebSocket(wsUrl);
let id = 0; const pending = new Map(); const errors = [];
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
  if (m.method === 'Runtime.exceptionThrown') errors.push('exception: ' + m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push('console.error: ' + JSON.stringify(m.params.args));
});
await new Promise(r => { ws.addEventListener('open', r, { once: true }); });
function send(method, params = {}) {
  const mid = ++id;
  return new Promise((res, rej) => { pending.set(mid, { res, rej }); ws.send(JSON.stringify({ id: mid, method, params })); });
}
function ev(expr) { return send('Runtime.evaluate', { expression: expr, returnByValue: true }).then(r => r.result.value); }
let pass = 0, fail = 0;
function check(cond, name, extra = '') { if (cond) pass++; else { fail++; console.log('FAIL ' + name + ' ' + extra); } }
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'file:///home/hatch/workspace/muse-project-factory/builds/bangla-alphabet-bd/index.html' });
await new Promise(r => setTimeout(r, 1200));
// Isolation: a previous smoke run in this browser process may have left
// localStorage (BN lang + a learned letter) behind; start clean.
await ev(`localStorage.clear();`);
await send('Page.navigate', { url: 'file:///home/hatch/workspace/muse-project-factory/builds/bangla-alphabet-bd/index.html' });
await new Promise(r => setTimeout(r, 1500));
check(await ev(`document.querySelector('h1').textContent === 'Bangla Alphabet BD'`), 'h1 EN title', await ev(`document.querySelector('h1').textContent`));
check(await ev(`document.querySelectorAll('#grid .cell').length === 50`), '50 letter cells', String(await ev(`document.querySelectorAll('#grid .cell').length`)));
check(await ev(`document.querySelectorAll('.tabs button').length === 3`), '3 tabs');
// Vowel filter -> 11
await ev(`document.querySelector('[data-filter="vowel"]').click();`);
check(await ev(`document.querySelectorAll('#grid .cell').length === 11`), 'vowel filter = 11', String(await ev(`document.querySelectorAll('#grid .cell').length`)));
// Back to all, search 'fish' -> 1 cell (Ma)
await ev(`document.querySelector('[data-filter="all"]').click();`);
await ev(`const inp = document.getElementById('searchInput'); inp.value = 'fish'; inp.dispatchEvent(new Event('input', {bubbles:true}));`);
check(await ev(`document.querySelectorAll('#grid .cell').length === 1`), "search fish = 1", String(await ev(`document.querySelectorAll('#grid .cell').length`)));
// Clear search, click first cell -> detail shows first letter
await ev(`const inp2 = document.getElementById('searchInput'); inp2.value = ''; inp2.dispatchEvent(new Event('input', {bubbles:true}));`);
await ev(`document.querySelector('#grid .cell').click();`);
check(await ev(`document.getElementById('detail').textContent.includes('Sh\u00f4re \u00d4')`), 'detail shows first letter name', await ev(`document.getElementById('detail').textContent`));
check(await ev(`document.getElementById('detail').textContent.includes('python')`), 'detail example python', await ev(`document.getElementById('detail').textContent`));
// Mark learned -> progress 1 of 50
await ev(`document.getElementById('markBtn').click();`);
check(await ev(`document.getElementById('progress').textContent.includes('1 of 50')`), 'progress 1 of 50', await ev(`document.getElementById('progress').textContent`));
// Flashcards tab: card shows a letter; flip shows detail
await ev(`document.querySelector('[data-tab="cards"]').click();`);
check(await ev(`document.getElementById('flashBox').textContent.length > 0`), 'flashcard renders');
await ev(`document.getElementById('cardFlipBtn').click();`);
check(await ev(`document.getElementById('flashBox').textContent.includes('Example')`), 'flashcard flipped shows example', await ev(`document.getElementById('flashBox').textContent`));
check(await ev(`document.getElementById('cardPos').textContent.includes('1 / 50')`), 'card position 1/50', await ev(`document.getElementById('cardPos').textContent`));
// Quiz tab: start -> question + 4 options; answer -> feedback + next
await ev(`document.querySelector('[data-tab="quiz"]').click();`);
await ev(`document.getElementById('quizStartBtn').click();`);
check(await ev(`document.querySelectorAll('#quizBox .opts button').length === 4`), 'quiz 4 options', String(await ev(`document.querySelectorAll('#quizBox .opts button').length`)));
await ev(`document.querySelector('#quizBox .opts button').click();`);
check(await ev(`!!document.querySelector('#quizBox .feedback')`), 'quiz feedback after answer');
await ev(`document.getElementById('quizNextBtn').click();`);
check(await ev(`document.getElementById('quizBox').textContent.includes('2/10')`), 'quiz advances to Q2', await ev(`document.getElementById('quizBox').textContent`));
// Language toggle -> BN title + BN digits in progress
await ev(`document.getElementById('langBtn').click();`);
check(await ev(`document.querySelector('h1').textContent === '\u09ac\u09be\u0982\u09b2\u09be \u09ac\u09b0\u09cd\u09a3\u09ae\u09be\u09b2\u09be \u09ac\u09bf\u09a1\u09bf'`), 'BN title after toggle', await ev(`document.querySelector('h1').textContent`));
check(await ev(`document.getElementById('progress').textContent.includes('\u09e7')`), 'BN digit in progress', await ev(`document.getElementById('progress').textContent`));
// Persistence: reload keeps learned progress + BN lang
await send('Page.navigate', { url: 'file:///home/hatch/workspace/muse-project-factory/builds/bangla-alphabet-bd/index.html' });
await new Promise(r => setTimeout(r, 1500));
check(await ev(`document.getElementById('progress').textContent.includes('\u09e7')`), 'progress persists after reload', await ev(`document.getElementById('progress').textContent`));
// 390px mobile: no horizontal overflow
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await new Promise(r => setTimeout(r, 500));
check(await ev(`document.documentElement.scrollWidth <= 391`), '390px no overflow', String(await ev(`document.documentElement.scrollWidth`)));
check(errors.length === 0, '0 console/page errors', errors.join(' | '));
console.log(pass + ' passed, ' + fail + ' failed');
ws.close();
process.exit(fail ? 1 : 0);
