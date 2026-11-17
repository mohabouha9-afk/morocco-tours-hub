// One-off: update the 5-day Tangier, Chefchaouen & Fes card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '5-day-tangier-chefchaouen-fes-tour.html';
const ND = 'Tangier and Cap Spartel, a night in blue Chefchaouen, Volubilis, Moulay Idriss and Meknes, then two nights in Fes with a guided day.';
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
**Done (2026-11-17) — 5-day Tangier, Chefchaouen & Fes rebuilt, ORIGINAL ROUTE KEPT** (\`tours/5-day-tangier-chefchaouen-fes-tour.html\`, URL kept). D1 Tangier arrival (airport, train, ferry or hotel) + Kasbah, medina, Grand + Petit Socco, Cap Spartel, Caves of Hercules, night Tangier · D2 → Rif → Chefchaouen (~125 km): blue lanes, Outa el-Hammam, Spanish Mosque sunset · D3 → Volubilis → Moulay Idriss → Meknes (Bab Mansour) → Fes (~260 km) · D4 guided Fes el-Bali day · D5 Fes departure (Fes-Saïss airport ~30 min, station or hotel). Title "5-Day Tangier, Chefchaouen & Fes Tour | Private", script "Northern Morocco from the Strait", hero grand-chefchaouen-blue.jpg, chip Tangier, route "Tangier → Fes". Key fact 4 "Arrival: Airport, ferry or train". Costs: lunches, Caves of Hercules small fee, Volubilis 70–100 MAD, Bou Inania ~20, "All other sites are free", tips. Accommodations: Tangier ×1, Chefchaouen ×1, Fes ×2 (rows copied from the 10-day Marrakech → Tangier table). FAQ: met off the ferry (Tarifa → city port, Algeciras → Tanger Med) · one night in Chefchaouen enough · shops with the Fes guide · how we leave Fes (airport, trains to Rabat/Casablanca/Tangier) · drive lengths · booking. Think twice: on to Marrakech → 7-day Tangier to Marrakech · Akchour + Asilah → 7-day northern · already in Fes → 3-day Fes, Chefchaouen & Volubilis. Make It Your Own: Asilah on day 1, a 2nd Chefchaouen night with Akchour, official Volubilis guide, extra day in Fes, two more days to the Sahara, child seats. Reviews Maria G., James T., Aisha K. Gallery: Cap Spartel lighthouse, Tangier train, Chefchaouen ×2, Fes palace gates, coppersmith. Map \`tc5\` (saved tm7-d1 + tg3), note "about 450 km in 5 days". Card text updated wherever the tour is listed. **Owner to confirm:** Fes guide included, Tangier hotels. Old page in session scratchpad (tc5-before.html) and git; build script \`.claude/tools/tour-build/build-tc5.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('4-day Fes → Tangier via Chefchaouen (original routes kept).\n', '4-day Fes → Tangier via Chefchaouen, 5-day Tangier, Chefchaouen & Fes (original routes kept).\n').replace('northern — 5-day Tangier/Chefchaouen/Fes, 5-day', 'northern — 5-day');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-tc5.js` → `tours/5-day-tangier-chefchaouen-fes-tour.html` (5-day Tangier → Fes, original route kept; derived from build-ft4.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('5-day Tangier, Chefchaouen & Fes (original'), r.includes('build-tc5'));
