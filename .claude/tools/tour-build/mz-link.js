// Rebuild "You May Also Like" on every Merzouga activity page: the other activity cards first (newest first), then the page's own
// tour cards to fill 3 slots. node mz-link.js  (run after adding a page to mz-cards.js and building it)
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/tours/';
const C = JSON.parse(fs.readFileSync(__dirname + '/mz-cards.json', 'utf8'));
const pages = Object.keys(C);
for (const p of pages) {
  const f = root + p; if (!fs.existsSync(f)) continue;
  let s = fs.readFileSync(f, 'utf8');
  const a = s.indexOf('<ul class="htours__list dt-others__list">\n') + '<ul class="htours__list dt-others__list">\n'.length;
  const e = s.indexOf('        <li class="htours__end">', a);
  const cur = s.slice(a, e).split('<li><article').slice(1).map(x => '        <li><article' + x.replace(/\s*$/, '') + '\n');
  const tours = cur.filter(c => !pages.some(q => c.includes(`href="${q}"`)));
  // rotate: the activities that follow this page in the list come first, so every activity shows up in someone's row
  const k = pages.indexOf(p);
  const acts = [...pages.slice(k + 1), ...pages.slice(0, k)].map(q => C[q].replace(/\s*$/, '') + '\n');
  const list = [...acts, ...tours].slice(0, 3);
  s = s.slice(0, a) + list.join('') + s.slice(e);
  fs.writeFileSync(f, s);
  console.log(p, '->', list.map(c => (c.match(/href="([^"]+)"/) || [])[1]).join(', '));
}
