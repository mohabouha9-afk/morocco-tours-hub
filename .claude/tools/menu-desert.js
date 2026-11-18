// Adds the "Desert Tours" menu item (desktop dropdown + phone drawer) to every page, after Tours.
// Also points the Tours mega-menu "Sahara Desert Tours" entry at the hub (count 27). Safe to re-run: skips pages that have it.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const files = [];
for (const d of ['', 'tours', 'destinations', 'blog']) for (const f of fs.readdirSync(path.join(ROOT, d))) if (f.endsWith('.html')) files.push(path.join(d, f));
const ACTIVE = ['sahara-desert-tours.html', 'desert-tours-from-marrakech.html', 'desert-tours-from-fes.html', path.join('destinations', 'merzouga.html')];
const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" >${d}</svg>`;
const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>';
const PIN = '<path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>';
const DUNE = '<path d="M2 18c4-6 8-6 11-2 2-3 5-4 9 0"/><path d="M2 21h20"/><circle cx="17" cy="6" r="2"/>';
const CARET = '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ><path d="M6 9l6 6 6-6"/></svg>';
const LINKS = p => [[`${p}sahara-desert-tours.html`, SUN, 'All Sahara Desert Tours'], [`${p}desert-tours-from-marrakech.html`, PIN, 'Desert Tours from Marrakech'], [`${p}desert-tours-from-fes.html`, PIN, 'Desert Tours from Fes'], [`${p}destinations/merzouga.html`, DUNE, 'Things to Do in Merzouga']];
let n = 0, skipped = 0;
for (const f of files) {
  const fp = path.join(ROOT, f); let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('>Desert Tours' + CARET.slice(0, 4))) { skipped++; continue; }
  const m = s.match(/<div class="nav__item"><a href="((?:\.\.\/)?)honeymoon-in-morocco\.html" class="[^"]*">Experiences/);
  if (!m) { console.log('no nav:', f); continue; }
  const p = m[1], act = ACTIVE.includes(f);
  if (act) s = s.replace(/(<nav class="nav">[\s\S]*?<\/nav>)/, x => x.replace(/ class="is-active"/g, ' class=""'));
  const desk = `<div class="nav__item"><a href="${p}sahara-desert-tours.html" class="${act ? 'is-active' : ''}">Desert Tours${CARET}</a>
      <div class="dropdown dropdown--dest">${LINKS(p).map(l => `<a class="dropdown__link" href="${l[0]}">${SV(l[1])}<span>${l[2]}</span></a>`).join('')}</div></div>
    `;
  s = s.replace(m[0], desk + m[0]);
  const mob = `<a href="${p}sahara-desert-tours.html">Desert Tours</a>
      ${LINKS(p).map(l => `<a href="${l[0]}" style="padding-left:26px;font-size:.92rem;opacity:.85">${l[2]}</a>`).join('')}
      `;
  const mi = s.indexOf(`<a href="${p}honeymoon-in-morocco.html">Experiences</a>`, s.indexOf('mobile-nav__panel'));
  if (mi < 0) { console.log('no drawer:', f); continue; }
  s = s.slice(0, mi) + mob + s.slice(mi);
  // Tours mega-menu entry → the hub, real count
  s = s.replace(/href="((?:\.\.\/)?)tours\/index\.html#desert">(<svg[^]*?<\/svg><span>Sahara Desert Tours<\/span><b class="dropdown__count">)\d+<\/b>/,(x, q, mid) => `href="${q}sahara-desert-tours.html">${mid}27</b>`);
  fs.writeFileSync(fp, s); n++;
}
console.log('updated', n, 'skipped', skipped, 'of', files.length);
