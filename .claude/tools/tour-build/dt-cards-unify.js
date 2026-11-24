// Unify day-trip / activity / transfer cards on the Marrakech style (`htour htour--dt`):
// gold "City · duration" meta line under the title + 3 tick highlights instead of Start/Drive/Private.
// Only touches plain `<article class="htour">` cards that link to a page in MAP (or to a page that already
// has a canonical htour--dt card somewhere). Title, photo, badge and description stay as they are.
// Re-runnable: cards already htour--dt are skipped. Multi-day tours (merzouga-to-fes, merzouga-to-marrakech,
// yoga retreat, numbered tours) are never touched.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../..');

const MAP = {
  'casablanca-to-marrakech-transfer.html': ['Casablanca · About 3 hours, both ways', ['Airport, hotel or port pick-up', 'Name sign in arrivals', 'Late flights tracked']],
  'fes-airport-transfer.html': ['Fes · 20 to 25 minutes', ['Name sign in arrivals', 'Every flight, day or night', 'Private car']],
  'fes-medina-guided-tour.html': ['Fes · 3 to 4 hours', ['Bou Inania Madrasa', 'Chouara Tannery terrace', 'No shop stops']],
  'fes-middle-atlas-ifrane-azrou-day-trip.html': ['Fes · 1 day (about 8 hours)', ['Barbary macaques', 'Walk in the cedar forest', 'Ifrane and Azrou']],
  'fes-volubilis-meknes-day-trip.html': ['Fes · 1 day (about 9.5 hours)', ['Roman mosaics of Volubilis', 'Moulay Idriss Zerhoun', 'Bab Mansour in Meknes']],
  'hassan-ii-mosque-casablanca-city-tour.html': ['Casablanca · About 5 hours', ['Hassan II Mosque', 'Habous quarter', 'The Corniche']],
  'merzouga-4x4-desert-day-tour.html': ['Merzouga · 1 day (about 7 hours)', ['Tea with a nomad family', 'Gnawa music in Khamlia', 'Black desert and old mines']],
  'merzouga-buggy-tour.html': ['Merzouga · 1 or 2 hours', ['Side by side in the dunes', 'Big-dune viewpoints', 'Nomad tea (2 hours)']],
  'merzouga-camel-trek-2-nights.html': ['Merzouga · 3 days, 2 nights', ['Two desert sunsets', 'Remote nomad camp', 'Same camel guide']],
  'merzouga-desert-camp-camel-ride.html': ['Merzouga · Overnight, sunset to morning', ['Sunset camel ride', 'Dinner and drums by the fire', 'Sunrise on a dune']],
  'merzouga-luxury-desert-camp.html': ['Merzouga · Overnight, sunset to morning', ['Real bed, private shower', 'Sunset camel ride', 'Sunrise before breakfast']],
  'merzouga-medfouna-cooking-class.html': ['Merzouga · About 3.5 hours', ['Cook with a local family', 'Bread baked in hot sand', 'Share the meal you made']],
  'merzouga-quad-biking.html': ['Merzouga · 1 or 2 hours', ['Over the Erg Chebbi ridges', 'Sandboarding', 'Nomad tea (2 hours)']],
  'merzouga-stargazing-night.html': ['Merzouga · About 2 hours after dark', ['Telescope views', 'Nomad stories about the stars', 'Fire and mint tea']],
  'merzouga-sunset-camel-ride.html': ['Merzouga · About 2.5 hours', ['Sunset from a ridge', 'Sandboarding', 'First stars on the way back']],
  'tangier-day-tour-from-tarifa.html': ['Tangier · About 6–7 hours in Tangier', ['Kasbah view to Spain', 'Medina and the Soccos', 'Cap Spartel and Hercules Caves']],
  'tangier-to-chefchaouen-day-trip.html': ['Tangier · 1 day (about 10 hours)', ['Blue medina alleys', 'Spanish Mosque viewpoint', 'Free time for lunch']],
};
const NEVER = /^(\d|merzouga-to-fes-tour|merzouga-to-marrakech-tour|morocco-yoga-retreat)/;

const PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

const files = [];
(function w(d) { for (const f of fs.readdirSync(d)) { if (/^(node_modules|\.git|\.claude)$/.test(f)) continue; const p = path.join(d, f); if (fs.statSync(p).isDirectory()) w(p); else if (f.endsWith('.html')) files.push(p); } })(ROOT);

const slugOf = a => ((a.match(/class="htour__link" href="([^"]+)"/) || [])[1] || '').split('/').pop().replace(/#.*/, '');

// 1. canonical meta + facts from existing htour--dt cards (Marrakech set etc.)
const canon = {};
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/<article class="htour htour--dt">[\s\S]*?<\/article>/g)) {
    const s = slugOf(m[0]); if (!s || canon[s]) continue;
    const meta = (m[0].match(/<span class="htour__meta">[\s\S]*?<\/svg>([\s\S]*?)<\/span>/) || [])[1];
    const facts = [...m[0].matchAll(/<span class="htour__fact">[\s\S]*?<\/svg>([\s\S]*?)<\/span>/g)].map(x => x[1].trim());
    if (meta && facts.length) canon[s] = [meta.trim(), facts];
  }
}
const lookup = s => MAP[s] || canon[s];

// 2. convert plain cards
let total = 0; const log = {};
for (const f of files) {
  let h = fs.readFileSync(f, 'utf8'); let n = 0;
  h = h.replace(/<article class="htour">([\s\S]*?)<\/article>/g, (all, inner) => {
    const s = slugOf(all);
    if (!s || NEVER.test(s) || !fs.existsSync(path.join(ROOT, 'tours', s))) return all;
    const d = lookup(s); if (!d) return all;
    const [meta, facts] = d;
    const ind = (inner.match(/\n(\s*)<span class="htour__facts">/) || [, '                '])[1];
    let out = inner.replace(/(<h3 class="htour__title">[\s\S]*?<\/h3>)/, `$1\n${ind}<span class="htour__meta">${PIN}${meta}</span>`);
    out = out.replace(/<span class="htour__facts">[\s\S]*?\n\s*<\/span>(?=\s*<span class="htour__cta">)/,
      `<span class="htour__facts">\n${facts.map(t => `${ind}  <span class="htour__fact">${TICK}${t}</span>`).join('\n')}\n${ind}</span>`);
    if (out === inner || !out.includes('htour__meta')) return all;
    n++; return `<article class="htour htour--dt">${out}</article>`;
  });
  if (n) { fs.writeFileSync(f, h); total += n; log[path.relative(ROOT, f).split(path.sep).join('/')] = n; }
}
console.log(JSON.stringify(log, null, 1)); console.log('cards converted:', total);
