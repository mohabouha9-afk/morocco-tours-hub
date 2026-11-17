// One-off: update the 6-day family tour card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '6-day-morocco-family-tour-marrakech-merzouga.html';
const ND = 'Aït Ben Haddou, Dades and the Todra Gorge, a gentle sunset camel ride and a desert camp, a family day in the dunes, then the Ziz Valley.';
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
**Done (2026-11-17) — 6-day Morocco Family Tour (Marrakech → Merzouga → Marrakech) rebuilt, ORIGINAL ROUTE KEPT** (\`tours/6-day-morocco-family-tour-marrakech-merzouga.html\`, URL kept; first themed tour). D1 Marrakech → Tichka → Aït Ben Haddou → Ouarzazate · D2 (Taourirt optional) Skoura, Valley of Roses → Dades · D3 Todra → Erfoud → Rissani → Merzouga, gentle camel ride ~1 h (little ones with a parent, or 4×4), camp · D4 family 4×4 day (sunrise + sandboarding, Khamlia Gnawa, nomad family, Dayet Srij in season; quads optional), Merzouga hotel · D5 Rissani, Erfoud, Ziz viewpoint (OSRM 91 km), night Erfoud · D6 Erfoud → Tinghir → Ouarzazate → Tichka → Marrakech (OSRM ~510 km, ~9.5 h: the long day, said in the meta + FAQ; a night in Ouarzazate offered in Make It Your Own — **proposal for the owner: split day 6**). Title "6-Day Morocco Family Tour: Marrakech to Merzouga | Private", h1 "6-Day Morocco Family Tour to Merzouga" + script "The Sahara at a Family Pace", hero merzouga-camel-ride-group.jpg. Key fact 4 "Families: Paced for children". Included: 5 breakfasts + 1 dinner (camp, as on the old page), camel + sandboarding, 4×4 day. Costs: lunches, Taourirt small fee, quads priced before you ride, "All other sites are free", tips. Accommodations one row per night: Ouarzazate, Dades, camp, Merzouga hotel (rows from finished pages) + **Erfoud: Kasbah Tizimi / Kasbah Xaluca / Palais Masandoïa (new, all with pools; my picks from WebSearch, owner to confirm)**. A first draft claimed pools at the Merzouga hotels too; removed (not verified). FAQ: young children · small children on camels · camp safe/comfortable · quads for kids (drivers 16+, passengers ~8+, buggies with a parent) · is the last day too long · booking. Think twice: 3 days → 3-day Merzouga · less driving → 6-day Marrakech & surroundings · a taste → Agafay camel & dinner. Make It Your Own: Ouarzazate night, luxury camp, quads/buggies, family rooms, family cooking class (linked), child seats. Reviews Sarah L., Aisha K., Lukas M. Map \`fy6\` (tall; saved mf7-d1, ag5-d2, ag5-d3 + new fy6-d5), note "about 1,400 km in 6 days". Card text updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). Old page in session scratchpad (fy6-before.html) and git; build script \`.claude/tools/tour-build/build-fy6.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('**all northern tours done**.\n', '**all northern tours done**.\n**Themed tours started (2026-11-17):** 6-day family tour (original route kept).\n').replace('themed — 6-day family, 9-day', 'themed — 9-day');
p = p.replace('Oualidia = Dar Beldi', 'Erfoud = Kasbah Tizimi / Kasbah Xaluca / Palais Masandoïa · Oualidia = Dar Beldi');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-fy6.js` → `tours/6-day-morocco-family-tour-marrakech-merzouga.html` (6-day family loop to Merzouga, original route kept; derived from build-tm5.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('Themed tours started'), p.includes('Erfoud = Kasbah Tizimi'), r.includes('build-fy6'));
