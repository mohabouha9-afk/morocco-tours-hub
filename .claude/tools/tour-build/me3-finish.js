// One-off: update the 3-day Marrakech & Essaouira card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '3-day-marrakech-essaouira-tour.html';
const ND = 'A guided day in the Marrakech medina, then a night in Essaouira for the sunset on the ramparts and the quiet morning port.';
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
**Done (2026-11-17) — 3-day Marrakech & Essaouira tour rebuilt** (\`tours/3-day-marrakech-essaouira-tour.html\`, URL kept; owner: read only PERFECT-TOUR.md, then build; same coast research + our Essaouira day-trip research: the top day trip is 4.3 / 5,200 reviews, "Long drives and limited hours in town"; old page was generic boilerplate). **Angle:** the night in Essaouira is the point (sunset on the ramparts + the port at dawn before the day visitors), which a day trip can't give. Route: D1 guided Marrakech medina day from your riad, Jemaa el-Fnaa evening · D2 → Essaouira (~180 km), afternoon in the medina, sunset on the Skala, fish by the harbour · D3 port at dawn, Mellah → back in Marrakech by mid-afternoon (hotel or airport). Title "3-Day Marrakech & Essaouira Tour | Private", script "A Night by the Atlantic", chip Marrakech, route "Marrakech round trip". Key fact 4 "Essaouira: A night by the ocean". Costs: lunches, Bahia + Saadian Tombs 100 MAD each, Ben Youssef ~50, Skala small fee, "All other sites are free", tips. Accommodations: Marrakech + Essaouira (same places as the other tours). FAQ: why sleep in Essaouira instead of a day trip · shop stops on the medina tour · goats in the argan trees (often staged; no fee, no argan shop) · swimming in Essaouira (windy, cool water) · Marrakech airport start/end · booking. Think twice: one free day → Essaouira day trip · ending in Agadir → 4-day tour · Sahara instead → 3-day Merzouga. Make It Your Own: 2nd Essaouira night, food tour, cooking class, hammam (linked), luxury riad on the ramparts, child seats. Reviews Aisha K., Maria G., Chloé D. Gallery: Koutoubia sunset, carriage, El Badi storks, medina walk, Essaouira, spices (sizes read from other pages by the build script's new \`dims()\` helper). Map \`me3\` (essaouira road; labels below the pins at all sizes because the route is a flat line), note "about 360 km in 3 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). **Owner to confirm:** the guided Marrakech day on day 1, back by mid-afternoon on day 3. Old page in git; build script \`.claude/tools/tour-build/build-me3.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('4-day Marrakech → Essaouira → Agadir.\n', '4-day Marrakech → Essaouira → Agadir, 3-day Marrakech & Essaouira.\n').replace('coast — 3-day Marrakech & Essaouira, 6-day', 'coast — 6-day');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-me3.js` → `tours/3-day-marrakech-essaouira-tour.html` (3-day Marrakech round trip with an Essaouira night; has a `dims()` helper that reads image sizes from other pages)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('3-day Marrakech & Essaouira.\n'), r.includes('build-me3'));
