// One-off: update the 7-day northern tour card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '7-day-northern-morocco-tour.html';
const ND = 'Tangier and Cap Spartel, Asilah and Larache on the Atlantic, two nights in Chefchaouen with Akchour, Volubilis, Meknes and two nights in Fes.';
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
**Done (2026-11-17) — 7-day Northern Morocco tour rebuilt, ORIGINAL ROUTE KEPT** (\`tours/7-day-northern-morocco-tour.html\`, URL kept; last northern tour). D1 Tangier arrival (airport, port, train, hotel) + Kasbah, medina, Soccos, Cap Spartel, Caves of Hercules · D2 Asilah (Portuguese walls, murals) + Larache (main square, ocean views), back to Tangier (OSRM 93 km one way) · D3 → Rif → Chefchaouen · D4 Akchour, back to Chefchaouen · D5 Volubilis → Moulay Idriss → Meknes → Fes · D6 guided Fes el-Bali day · D7 Fes departure. Title "7-Day Northern Morocco Tour: Tangier to Fes | Private", script "Two Seas, the Rif and Fes", hero chefchaouen-blue-steps.jpg, chip Tangier, route "Tangier → Fes". Key fact 4 "Slow pace: 2 nights in each place". Costs: lunches, Caves of Hercules small fee, Volubilis 70–100 MAD, Bou Inania ~20, "All other sites are free", tips. Accommodations: Tangier ×2, Chefchaouen ×2, Fes ×2 (rows from the 10-day Marrakech → Tangier table). FAQ: why two nights in Tangier · what to see in Asilah and Larache · Akchour walk · met off the ferry · shops with the Fes guide · booking. Think twice: 5 days → 5-day Tangier, Chefchaouen & Fes · Sahara too → 10-day from Tangier · landing in Fes → 4-day Fes to Tangier. Make It Your Own: Tetouan medina, longer Akchour hike, official Volubilis guide, extra day in Fes, end in Tangier for the ferry, child seats. Reviews Chloé D., Aisha K., Maria G. Map \`nt7\` (new OSRM nt7-d2 + saved tm7-d1, ft4-d3, tg3), note "about 750 km in 7 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). **Owner to confirm:** Fes guide included, Tangier hotels. Old page in session scratchpad (nt7-before.html) and git; build script \`.claude/tools/tour-build/build-nt7.js\`. **All northern tours are now rebuilt.**
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('5-day Tangier → Marrakech (original routes kept).\n', '5-day Tangier → Marrakech, 7-day northern (original routes kept) — **all northern tours done**.\n').replace('northern — 7-day northern; themed', 'themed');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-nt7.js` → `tours/7-day-northern-morocco-tour.html` (7-day Tangier → Fes, original route kept; derived from build-tc5.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('all northern tours done'), r.includes('build-nt7'));
