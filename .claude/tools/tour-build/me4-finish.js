// One-off: update the 4-day Marrakech, Essaouira & Agadir card text site-wide + log.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const H = '4-day-marrakech-essaouira-agadir-tour.html';
const ND = 'A guided day in Marrakech, a night in Essaouira, the coast road by Imsouane to Taghazout, then Paradise Valley and Agadir.';
const files = ['.', 'tours', 'destinations', 'blog'].flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.html')).map(f => d === '.' ? f : d + '/' + f)).filter(f => !f.endsWith(H));
for (const f of files) {
  let t = fs.readFileSync(f, 'utf8'); const o = t; let i = t.indexOf(H);
  while (i >= 0) {
    const a = t.lastIndexOf('<article', i);
    if (a >= 0 && i - a < 200) {
      const b = t.indexOf('</article>', i);
      const card = t.slice(a, b).replace(/(<p class="htour__desc">)[^<]*(<\/p>)/, `$1${ND}$2`).replace(/(<span class="htour__fact"><b>End:<\/b> )[^<]*/, '$1Agadir');
      t = t.slice(0, a) + card + t.slice(b); i = t.indexOf(H, a + card.length);
    } else i = t.indexOf(H, i + 1);
  }
  if (t !== o) { fs.writeFileSync(f, t); console.log('updated', f); }
}
const log = `
**Done (2026-11-17) — 4-day Marrakech, Essaouira & Agadir tour rebuilt** (\`tours/4-day-marrakech-essaouira-agadir-tour.html\`, URL kept; owner: read only PERFECT-TOUR.md, then build; same coast research as the 7-day and 6-day; old page was generic boilerplate). The reverse of the 6-day Agadir → Marrakech, shorter, for guests who end with beach days in Agadir or fly out of Agadir. Route: D1 guided Marrakech medina day from your riad (Jemaa el-Fnaa evening) · D2 → Essaouira (~180 km) · D3 Imsouane lunch → Taghazout (~170 km) · D4 Paradise Valley → Agadir Oufella → Agadir beach hotel or airport (~90 km). Title "4-Day Marrakech, Essaouira & Agadir Tour | Private", script "From the Souks to the Sea", chip Marrakech, route "Marrakech → Agadir". Key fact 4 "Ends in: Agadir, hotel or airport". Included: Marrakech guide, riad pick-up, Agadir hotel/airport drop-off, 3 nights + 3 breakfasts. Costs: lunches, Bahia + Saadian Tombs 100 MAD each, Ben Youssef ~50, Skala small fee, "All other sites are free", tips. Accommodations: Marrakech, Essaouira, Taghazout (same places as the other tours). FAQ: Marrakech airport pick-up the day before · do we see Agadir · why Taghazout, not Agadir · drive lengths · fly home from Agadir on day 4 · booking. Think twice: landing in Agadir → 6-day tour · 2 Essaouira nights → 7-day coastal · Sahara instead → 3-day Merzouga. Make It Your Own: surf lesson, 2nd Essaouira night, balloon, food tour, hammam (linked), child seats. Reviews Maria G., Chloé D., James T. Gallery = Marrakech + Essaouira photos only. Map \`me4\` (new OSRM me4-d4 + essaouira, a18-d5, cc7-d5), note "about 460 km in 4 days". Card text + "End: Agadir" updated wherever the tour is listed. Checked 1366×768 (booking 618px, one-line facts/highlights, 3 JSON-LD, tabs, map clean, no console errors), 768 and 375 (map clean, table fits, no sideways scroll). Also fixed: the 6-day Agadir page had the 7-day page's meta keywords. **Owner to confirm:** Taghazout for night 3, Paradise Valley on day 4. Old page in session scratchpad (me4-before.html) and git; build script \`.claude/tools/tour-build/build-me4.js\`.
`;
fs.appendFileSync('CLAUDE.md', log);
let p = fs.readFileSync('.claude/PERFECT-TOUR.md', 'utf8');
p = p.replace('6-day Agadir → Marrakech via Essaouira.\n', '6-day Agadir → Marrakech via Essaouira, 4-day Marrakech → Essaouira → Agadir.\n').replace('coast — 3-day Marrakech & Essaouira, 4-day Marrakech, Essaouira & Agadir, 6-day', 'coast — 3-day Marrakech & Essaouira, 6-day');
p = p.replace('**Template check (2026-11-17):**', '**Keywords check (2026-11-17):** when deriving a build script from another tour\'s script, replace the `<meta name="keywords">` line too (the 6-day Agadir page shipped with the 7-day page\'s keywords).\n**Template check (2026-11-17):**');
fs.writeFileSync('.claude/PERFECT-TOUR.md', p);
let r = fs.readFileSync('.claude/tools/tour-build/README.md', 'utf8');
r = r.replace('- `icons.part.js`', '- `build-me4.js` → `tours/4-day-marrakech-essaouira-agadir-tour.html` (4-day Marrakech → Agadir; derived from build-ag6.js)\n- `icons.part.js`');
fs.writeFileSync('.claude/tools/tour-build/README.md', r);
console.log(p.includes('4-day Marrakech → Essaouira → Agadir'), p.includes('Keywords check'), r.includes('build-me4'));
