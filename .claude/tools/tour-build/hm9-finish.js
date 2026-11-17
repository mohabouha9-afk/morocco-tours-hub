// One-off: update the 9-day honeymoon card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '9-day-morocco-honeymoon-tour-from-marrakech.html';
const ND = 'Romantic riads, Aït Ben Haddou and the Dades Valley, a sunset camel ride and a luxury desert camp, two slow days by the dunes and the Ziz Valley.';
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
**Done (2026-11-17) — 9-day Morocco Honeymoon Tour from Marrakech rebuilt, ORIGINAL ROUTE KEPT** (\`tours/9-day-morocco-honeymoon-tour-from-marrakech.html\`, URL kept). D1 Marrakech arrival · D2 Tichka → Aït Ben Haddou → Ouarzazate · D3 Skoura, Valley of Roses → Dades (dinner) · D4 Todra → Merzouga, sunset camel ride ~1 h, luxury camp (dinner) · D5 Merzouga 4×4 day (Hassi Labied, Khamlia, nomad family, Dayet Srij), Merzouga hotel · D6 Rissani, Erfoud, Ziz viewpoint, night Erfoud · D7 Erfoud → Tinghir → Ouarzazate → night at Aït Ben Haddou (~330 km, the longest) · D8 Tichka → Marrakech by early afternoon · D9 departure. Title "9-Day Morocco Honeymoon Tour from Marrakech | Private", h1 "9-Day Morocco Honeymoon Tour" + script "Just the Two of You and the Sahara", hero sahara-couple-sunset.jpg. Key fact 4 "Sahara: 2 nights by the dunes". Included: 8 breakfasts + 2 dinners (Dades, camp, as on the old page), camel + sandboarding, 4×4 day; not included: spa, hammam, private dinners. Costs: lunches, Taourirt small fee, Majorelle ~170 MAD if you go, "All other sites are free", tips. Accommodations one row per night (8 rows, all copied from finished pages incl. the new Erfoud picks). FAQ: is the camp romantic and private · arranging something special (candlelit dinner, hammam for two, balloon, flowers) · how much driving · best time for a honeymoon · ending at the sea (2 nights in Essaouira) · booking. Think twice: 3 days → 3-day Merzouga · the sea → 3-day Marrakech & Essaouira · Fes too → 7-day Marrakech to Fes. Make It Your Own: private dinner in the dunes, hammam for two, balloon, luxury upgrade, 2 nights in Essaouira, cooking class for two (linked). Reviews Sarah L., Chloé D., Lukas M. Gallery: Aït Ben Haddou tea terrace, Dades, dune walk, 2 luxury-camp photos, Ziz. Map \`hm9\` (tall; same roads as the family tour; Aït Ben Haddou = tap pin on phones), note "about 1,450 km in 9 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). Old page in session scratchpad (hm9-before.html) and git; build script \`.claude/tools/tour-build/build-hm9.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('6-day family tour (original route kept).\n', '6-day family tour, 9-day honeymoon tour (original routes kept).\n').replace('themed — 9-day honeymoon, yoga', 'themed — yoga');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-hm9.js` → `tours/9-day-morocco-honeymoon-tour-from-marrakech.html` (9-day honeymoon loop, original route kept; derived from build-fy6.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('9-day honeymoon tour (original'), p.includes('themed — yoga'), r.includes('build-hm9'));
