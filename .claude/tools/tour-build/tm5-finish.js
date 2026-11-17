// One-off: update the 5-day Tangier -> Marrakech card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '5-day-morocco-tour-tangier-to-marrakech.html';
const ND = 'Chefchaouen and Fes, the Middle Atlas cedars, a sunset camel ride and a night in a Merzouga camp, then Todra, Dades and Aït Ben Haddou to Marrakech.';
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
**Done (2026-11-17) — 5-day Tangier → Marrakech via Fes & Sahara rebuilt, ORIGINAL ROUTE KEPT** (\`tours/5-day-morocco-tour-tangier-to-marrakech.html\`, URL kept). D1 Tangier (hotel, port or airport) → Rif → Chefchaouen stop + lunch → Fes (~320 km) · D2 Ifrane, Azrou cedars (macaques), Midelt, Ziz → Merzouga, sunset camel ride ~1 h, camp (~470 km, ~8 h) · D3 sunrise + sandboarding → Rissani, Erfoud, Tinghir, Todra Gorge → Dades (~270 km) · D4 Valley of Roses, Ouarzazate, Aït Ben Haddou, Tichka → Marrakech (~320 km) · D5 Marrakech at your pace (local guide on request, as on the old page) → hotel or airport. Title "5-Day Tangier to Marrakech Tour via Fes & Sahara | Private", script "From the Strait to the Sahara", hero merzouga-camel-caravan.jpg, chip Tangier, route "Tangier → Marrakech". Key fact 4 "Desert night: Camp in the dunes". Included: 4 breakfasts + 2 dinners (camp, Dades), camel ride + sandboarding; not included: local city guides. Costs: lunches, Bahia 100 MAD / Majorelle ~170 MAD if you go, "All other sites are free", tips. Accommodations one row per night: Fes, desert camp, Dades (from the 7-day Tangier → Marrakech table), Marrakech (from the 10-day from Tangier table). FAQ: is 5 days enough · which days are long · met off the ferry · camel ride + luggage · guides in Fes and Marrakech · booking. Think twice: long drives → 7-day Tangier to Marrakech · cities not desert → 7-day imperial cities · staying north → 5-day Tangier, Chefchaouen & Fes. Make It Your Own: local guide in Fes or Marrakech, luxury camp, quad, a night in Chefchaouen, hammam or food tour (linked), child seats. Reviews Lukas M., Sarah L. (desert), Maria G. Map \`tm5\` (tall; saved tm7-d1, fc3-d1, fm4-d1/d2/d3), note "about 1,400 km in 5 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). Old page in session scratchpad (tm5-before.html) and git; build script \`.claude/tools/tour-build/build-tm5.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('5-day Tangier, Chefchaouen & Fes (original routes kept).\n', '5-day Tangier, Chefchaouen & Fes, 5-day Tangier → Marrakech (original routes kept).\n').replace('northern — 5-day Tangier → Marrakech, 7-day northern', 'northern — 7-day northern');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-tm5.js` → `tours/5-day-morocco-tour-tangier-to-marrakech.html` (5-day Tangier → Marrakech via Fes + Merzouga camp, original route kept; `cellsFrom()` copies hotel rows from several pages)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('5-day Tangier → Marrakech (original'), p.includes('northern — 7-day northern'), r.includes('build-tm5'));
