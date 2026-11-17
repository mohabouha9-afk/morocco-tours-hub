// One-off: update the 4-day Fes to Tangier card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '4-day-fes-to-tangier-via-chefchaouen.html';
const ND = 'A guided day in Fes, Meknes, Volubilis and Moulay Idriss, two nights in Chefchaouen with a day at Akchour, then Tangier and Cap Spartel.';
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
**Done (2026-11-17) — 4-day Fes → Tangier via Chefchaouen rebuilt, ORIGINAL ROUTE KEPT** (\`tours/4-day-fes-to-tangier-via-chefchaouen.html\`, URL kept). D1 guided Fes el-Bali day (Bou Inania, Nejjarine, Al Quaraouiyine quarter, Chouara tanneries from a rooftop, Mellah, a viewpoint), night Fes · D2 Meknes (Bab Mansour) → Volubilis → Moulay Idriss → Rif → Chefchaouen (~265 km) · D3 Akchour river pools and waterfalls (OSRM 29 km, ~35 min each way), back for the Spanish Mosque sunset · D4 Chefchaouen → Tangier (~125 km): Kasbah, medina, Grand + Petit Socco, Cap Spartel, Caves of Hercules → airport / ferry port / train station / hotel. Title "4-Day Fes to Tangier Tour via Chefchaouen | Private", script "The North, from the Medina to the Strait", hero chefchaouen-blue-hour.jpg, chip Fes, route "Fes → Tangier". Key fact 4 "Chefchaouen: 2 nights, with Akchour". Costs: lunches, Bou Inania ~20, Volubilis 70–100 MAD, Caves of Hercules small fee, "All other sites are free", tips. Accommodations: Fes ×1, Chefchaouen ×2 (rows copied from the 10-day Marrakech → Tangier table). FAQ: drop-off at the ferry (Tarifa from the city port, Algeciras from Tanger Med) · how hard is the Akchour walk (first pools under an hour; big waterfall / God's Bridge longer) · why two nights in Chefchaouen · shops with the Fes guide · drive lengths · booking. Think twice: back to Fes → 3-day Fes, Chefchaouen & Volubilis · starting in Tangier → 5-day Tangier, Chefchaouen & Fes · Sahara too → 5-day Fes to Marrakech. Make It Your Own: a night in Tangier, Asilah on day 4, official Volubilis guide, Fes airport/station start, a longer Rif hike, child seats. Reviews Aisha K., James T., Chloé D. Gallery: Fes guide, Fes door, Chefchaouen ×2, Tangier, Cap Spartel. Map \`ft4\` (saved mt7 + m7t-d7 + new OSRM ft4-d3), note "about 500 km in 4 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). **Owner to confirm:** Fes guide included, Akchour walk + timing. Old page in session scratchpad (ft4-before.html) and git; build script \`.claude/tools/tour-build/build-ft4.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('3-day Fes, Chefchaouen & Volubilis (original route kept).\n', '3-day Fes, Chefchaouen & Volubilis, 4-day Fes → Tangier via Chefchaouen (original routes kept).\n').replace('northern — 4-day Fes → Tangier, 5-day', 'northern — 5-day');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-ft4.js` → `tours/4-day-fes-to-tangier-via-chefchaouen.html` (4-day Fes → Tangier, original route kept; derived from build-fc3.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('4-day Fes → Tangier via Chefchaouen (original'), r.includes('build-ft4'));
