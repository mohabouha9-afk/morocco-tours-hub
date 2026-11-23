// Link tours/2-day-ouarzazate-to-merzouga-desert-tour.html (2026-11-23). Run once.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const PAGE = '2-day-ouarzazate-to-merzouga-desert-tour.html';
const rd = f => fs.readFileSync(root + f, 'utf8');
const wr = (f, s) => fs.writeFileSync(root + f, s);
const must = (s, a, l) => { if (!s.includes(a)) throw new Error('missing ' + l); };

// card built from the 2-day Marrakech round-trip card on tours/index.html
const idx0 = rd('tours/index.html');
if (idx0.includes(PAGE)) throw new Error('already linked');
const ci = idx0.indexOf('<article class="htour"><a class="htour__link" href="../tours/2-day-marrakech-to-merzouga-desert-tour.html"');
const card0 = idx0.slice(ci, idx0.indexOf('</article>', ci) + 10);
const DESC = 'Already in Ouarzazate? Out by the Dades Valley and the Todra Gorge to a camp in the Merzouga dunes, back by Rissani and the N’Kob kasbahs: no road twice.';
const card = (pre) => card0
  .replace('href="../tours/2-day-marrakech-to-merzouga-desert-tour.html"', `href="${pre}${PAGE}"`)
  .replace('src="/assets/images/merzouga-caravan-sunset.jpg" alt="2-Day Marrakech to Merzouga Desert Tour" width="800" height="600"', 'src="/assets/images/tinghir-oasis-kasbahs.jpg" alt="2-Day Ouarzazate to Merzouga Desert Tour" width="1300" height="867"')
  .replace('<h3 class="htour__title">2-Day Marrakech to Merzouga Desert Tour</h3>', '<h3 class="htour__title">2-Day Ouarzazate to Merzouga Desert Tour</h3>')
  .replace(/<p class="htour__desc">[^<]*<\/p>/, `<p class="htour__desc">${DESC}</p>`)
  .replace('<b>Start:</b> Marrakech', '<b>Start:</b> Ouarzazate').replace('<b>End:</b> Marrakech', '<b>End:</b> Ouarzazate');
const c = card('');
for (const t of ['tinghir-oasis', 'Ouarzazate to Merzouga', 'Start:</b> Ouarzazate', 'End:</b> Ouarzazate', PAGE]) must(c, t, 'card ' + t);

// 1. tours/index.html: desert section, after the Merzouga -> Marrakech card; desert chip +1
{
  let s = idx0;
  const k = s.indexOf('href="../tours/merzouga-to-marrakech-tour.html"'); if (k < 0) throw new Error('mk3 card');
  const e = s.indexOf('</article>', k) + 10;
  s = s.slice(0, e) + card('../tours/') + s.slice(e);
  s = s.replace(/(href="#desert"><svg[\s\S]*?<\/svg><span>Sahara Desert<\/span><b>)(\d+)(<\/b>)/, (m, a, n, b) => a + (+n + 1) + b);
  wr('tours/index.html', s); console.log('tours/index ok');
}
// 2. homepage Sahara row: at the end, after the Merzouga -> Marrakech card
{
  let s = rd('index.html');
  const k = s.indexOf('<li><article class="htour"><a class="htour__link" href="tours/merzouga-to-marrakech-tour.html">'); if (k < 0) throw new Error('home mk3');
  const e = s.indexOf('</article></li>', k) + '</article></li>'.length;
  s = s.slice(0, e) + '\n          <li>' + card('tours/') + '</li>' + s.slice(e);
  wr('index.html', s); console.log('home ok');
}
// 3. Sahara hub: new "Ouarzazate" city filter + card after the Merzouga starts
{
  let s = rd('sahara-desert-tours.html');
  const k = s.lastIndexOf('data-start="merzouga"'); const e = s.indexOf('</article></li>', k) + '</article></li>'.length;
  const hc = card('tours/').replace('<span class="htour__media">', '<span class="htour__media">').replace(/<span class="htour__days"><svg[\s\S]*?<\/svg>/, '<span class="htour__days">');
  s = s.slice(0, e) + '\n        <li class="is-folded" data-start="ouarzazate" data-way="round">' + hc + '</li>' + s.slice(e);
  // city button after Merzouga
  const mb = s.indexOf('data-city="merzouga"'); const me = s.indexOf('</li>', mb) + 5;
  const btn = s.slice(s.lastIndexOf('<li>', mb), me).replace('data-city="merzouga"', 'data-city="ouarzazate"').replace('<span>Merzouga</span><b>2</b>', '<span>Ouarzazate</span><b>1</b>');
  if (!btn.includes('Ouarzazate')) throw new Error('btn');
  s = s.slice(0, me) + btn + s.slice(me);
  const n = (s.match(/<li[^>]*data-start="/g) || []).length;
  s = s.replace(/(data-city="all" aria-pressed="true"><span>All cities<\/span><b>)\d+/, '$1' + n);
  s = s.replace(/<p class="sdh-count" aria-live="polite">\d+ desert tours<\/p>/, `<p class="sdh-count" aria-live="polite">${n} desert tours</p>`);
  wr('sahara-desert-tours.html', s); console.log('hub ok', n);
}
// 4. destinations/ouarzazate.html: new tour first in "Tours visiting Ouarzazate & Dades", replacing the Agadir card (grid stays 3)
{
  let s = rd('destinations/ouarzazate.html');
  const g = '<div class="tour-grid tour-grid--3">'; const gi = s.indexOf(g, s.indexOf('Tours visiting Ouarzazate')); if (gi < 0) throw new Error('oz grid');
  s = s.slice(0, gi + g.length) + card('../tours/') + s.slice(gi + g.length);
  const a = s.indexOf('<article class="htour"><a class="htour__link" href="../tours/3-day-desert-tour-from-agadir.html"', gi);
  if (a < 0) throw new Error('agadir card');
  s = s.slice(0, a) + s.slice(s.indexOf('</article>', a) + 10);
  wr('destinations/ouarzazate.html', s); console.log('ouarzazate ok');
}
// 5. sitemap
{
  let s = rd('sitemap.xml');
  const z = '  <url><loc>https://moroccotourshub.com/tours/2-day-marrakech-to-zagora-desert-tour.html</loc>'; must(s, z, 'sitemap');
  s = s.replace(z, `  <url><loc>https://moroccotourshub.com/tours/${PAGE}</loc><lastmod>2026-11-23</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n` + z);
  wr('sitemap.xml', s); console.log('sitemap ok');
}
