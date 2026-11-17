// One-off: update the 6-day Marrakech & surroundings card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '6-day-marrakech-surroundings-tour.html';
const ND = 'One Marrakech riad all week: a guided day in the medina, then days out to the Ourika Valley, the Ouzoud Waterfalls and Aït Ben Haddou.';
const files = ['.', 'tours', 'destinations', 'blog'].flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.html')).map(f => d === '.' ? f : d + '/' + f)).filter(f => !f.endsWith(H));
for (const f of files) {
  let t = fs.readFileSync(f, 'utf8'); const o = t; let i = t.indexOf(H);
  while (i >= 0) {
    const a = t.lastIndexOf('<article', i);
    if (a >= 0 && i - a < 200) {
      const b = t.indexOf('</article>', i);
      const card = t.slice(a, b).replace(/(<p class="htour__desc">)[^<]*(<\/p>)/, `$1${ND}$2`);
      t = t.slice(0, a) + card + t.slice(b); i = t.indexOf(H, a + card.length);
    } else i = t.indexOf(H, i + 1);
  }
  if (t !== o) { fs.writeFileSync(f, t); console.log('updated', f); }
}
const log = `
**Owner rule (2026-11-17): modify the tours we have, don't invent new routes.** Keep each tour's original days, nights and stops; rebuild the layout and the writing. (The 7-day coastal, 6-day Agadir and 4-day Marrakech → Agadir pages had nights moved to Taghazout; the owner saw the list of changes and said to move on, so they stay as built.)
**Done (2026-11-17) — 6-day Marrakech & Surroundings rebuilt, ORIGINAL ROUTE KEPT** (\`tours/6-day-marrakech-surroundings-tour.html\`, URL kept). One Marrakech riad for 5 nights: D1 arrival (airport pick-up any hour) · D2 guided medina day (Koutoubia, Bahia, Mellah, souks, a garden) · D3 Ourika Valley (09:00, Berber villages, walk to the first Setti Fatma falls, tea in a Berber house, back ~17:30) · D4 Ouzoud Waterfalls (08:00, guide to the foot of the falls, macaques, boat optional, back ~18:00) · D5 Tizi n’Tichka → Aït Ben Haddou (~2 h in the ksar) → Ouarzazate (studios or Taourirt), back ~19:30 · D6 free morning, airport. Facts copied from our own rebuilt day-trip pages so both say the same. Title "6-Day Marrakech Tour | Atlas, Ouzoud & Aït Ben Haddou", h1 "6-Day Marrakech & Surroundings Tour" + script "One Riad, Four Great Days Out", hero ait-ben-haddou-village.jpg. Key fact 4 "Hotel: One riad, no packing". Included: local guides in Marrakech and on each day out, airport transfers. Costs: lunches, Bahia 100 MAD, Ouzoud boat ~25 MAD, Atlas Film Studios ~80 MAD or Taourirt small fee, "All other sites are free", tips. Accommodations: one row, nights 1–5 Marrakech (Riad 144 / Dar Anika / Kniza). FAQ: why one hotel · can we change the day trips (link to day-trips.html) · is the Aït Ben Haddou day too long · how hard are the Ourika/Ouzoud walks · good with children · booking. Think twice: dunes → 3-day Merzouga · only 1–2 days → day trips page · the sea too → 3-day Marrakech & Essaouira. Make It Your Own: swap a day for Essaouira or Agafay, balloon, Agafay camel & dinner, cooking class or hammam, a night at Aït Ben Haddou, child seats. Reviews James T., Aisha K., Maria G. Map \`ms6\` (saved day-trip roads ourika, ouzoud, abh; chip "About 800 km of day trips"). Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). **Owner to confirm:** local guides on each day out (day-trip pages say a local guide is always included). Build script \`.claude/tools/tour-build/build-ms6.js\`. **All coast tours are now rebuilt.**
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('3-day Marrakech & Essaouira.\n', '3-day Marrakech & Essaouira, 6-day Marrakech & surroundings (original route kept) — **all coast tours done**.\n').replace('coast — 6-day Marrakech & surroundings; northern', 'northern');
p = p.replace('## 1. The working process (always in this order)', '**Owner rule (2026-11-17): modify the tours we have, never invent new ones.** Keep each tour\'s original route (days, nights, stops) and rebuild only the layout and the writing; propose route changes to the owner instead of making them.\n\n## 1. The working process (always in this order)');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-ms6.js` → `tours/6-day-marrakech-surroundings-tour.html` (6 days from one Marrakech riad, original route kept; derived from build-me3.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('all coast tours done'), p.includes('never invent new ones'), r.includes('build-ms6'));
