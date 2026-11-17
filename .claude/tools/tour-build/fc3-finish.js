// One-off: update the 3-day Fes, Chefchaouen & Volubilis card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '3-day-fes-chefchaouen-volubilis-tour.html';
const ND = 'A night in blue Chefchaouen, the Roman ruins of Volubilis, Moulay Idriss and Meknes, then a guided day in the Fes medina.';
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
**Done (2026-11-17) — 3-day Fes, Chefchaouen & Volubilis rebuilt, ORIGINAL ROUTE KEPT** (\`tours/3-day-fes-chefchaouen-volubilis-tour.html\`, URL kept; first northern tour). D1 Fes riad → Rif → Chefchaouen (OSRM 195 km, ~4 h): medina, Outa el-Hammam, sunset from the Spanish Mosque · D2 early blue lanes → Volubilis → Moulay Idriss (view) → Meknes (Bab Mansour, lunch) → Fes (~260 km) · D3 guided Fes el-Bali day (Bab Bou Jeloud, Bou Inania + Al-Attarine, Nejjarine, coppersmiths, Chouara tanneries from a rooftop, Mellah), ends at riad / station / Fes airport. Title "3-Day Fes, Chefchaouen & Volubilis Tour | Private", script "The Blue Town and the Roman North", hero chefchaouen-blue-steps.jpg, chip Fes, route "Fes round trip". Key fact 4 "Fes medina: Guided day included". Costs: lunches, Volubilis 70–100 MAD, Bou Inania ~20 + Al-Attarine ~20 MAD, "All other sites are free", tips. Accommodations: Chefchaouen (Casa Perleta / Dar Echchaouen / Lina Ryad & Spa) + Fes (Dar Seffarine / Riad Dar Bensouda / Riad Fes), copied from the 10-day Marrakech → Tangier table. FAQ: is one night in Chefchaouen enough · shops with the Fes guide / tanneries · guide at Volubilis (official site guides at the gate, paid on the spot) · pick-up at a medina riad · drive lengths · booking. Think twice: going on to Tangier → 4-day Fes to Tangier · starting in Tangier → 5-day Tangier, Chefchaouen & Fes · Sahara too → 4-day Fes desert tour. Make It Your Own: 2nd Chefchaouen night, Akchour hike, official Volubilis guide, extra day in Fes, Fes airport/station start or end, child seats. Reviews Chloé D., Maria G., Aisha K. Gallery = 2 Chefchaouen + 4 Fes photos (no Volubilis photo in assets). Map \`fc3\` (new OSRM fc3-d1 + saved tg3), note "about 460 km in 3 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). **Owner to confirm:** local Fes guide included (old page said so), the Chefchaouen and Fes riads. Old page in session scratchpad (fc3-before.html) and git; build script \`.claude/tools/tour-build/build-fc3.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('**all coast tours done**.\n', '**all coast tours done**.\n**Northern tours started (2026-11-17):** 3-day Fes, Chefchaouen & Volubilis (original route kept).\n').replace('northern — 3-day Fes/Chefchaouen/Volubilis, 4-day', 'northern — 4-day');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-fc3.js` → `tours/3-day-fes-chefchaouen-volubilis-tour.html` (3-day Fes round trip, original route kept; copies hotel rows from a finished page with `cells()`)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('Northern tours started'), r.includes('build-fc3'));
