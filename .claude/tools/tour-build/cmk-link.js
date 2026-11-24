// Links the new Casablanca ⇄ Marrakech transfer page (2026-11-24). Re-runnable: skips what is already there.
// 1) sitemap.xml  2) card in "Day Tours in Casablanca" on tours/morocco-tours-from-casablanca.html (heading becomes
// "Day Tours & Transfers")  3) the "Straight on to … Casablanca" extra on the Marrakech airport transfer page.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const P = f => path.join(ROOT, f);
const SLUG = 'casablanca-to-marrakech-transfer.html';

// 1) sitemap
let sm = fs.readFileSync(P('sitemap.xml'), 'utf8');
if (!sm.includes(SLUG)) {
  const after = sm.match(/  <url><loc>https:\/\/moroccotourshub\.com\/tours\/merzouga-transfers\.html<\/loc>.*<\/url>\n/)[0];
  sm = sm.replace(after, after + `  <url><loc>https://moroccotourshub.com/tours/${SLUG}</loc><lastmod>2026-11-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`);
  fs.writeFileSync(P('sitemap.xml'), sm); console.log('sitemap: added');
}

// 2) Casablanca hub card
const hubF = 'tours/morocco-tours-from-casablanca.html';
let hub = fs.readFileSync(P(hubF), 'utf8');
if (!hub.includes('href="../tours/' + SLUG + '"')) {
  const sec = hub.indexOf('id="day-tours"');
  const a = hub.indexOf('<article class="htour"><a class="htour__link" href="../tours/hassan-ii-mosque-casablanca-city-tour.html">', sec);
  const b = hub.indexOf('</article>', a) + 10;
  let card = hub.slice(a, b)
    .replace('hassan-ii-mosque-casablanca-city-tour.html', SLUG)
    .replace(/<img src="\/assets\/images\/casablanca\.webp" alt="[^"]*" width="4032" height="3024"/, '<img src="/assets/images/fleet-minivan.jpg" alt="Our air-conditioned minivan, for up to 7 travellers" width="1000" height="750"')
    .replace(/(<span class="htour__days">[\s\S]*?<\/svg>)Half day/, '$1About 3 hours')
    .replace(/<h3 class="htour__title">[^<]*<\/h3>/, '<h3 class="htour__title">Private Transfer to Marrakech</h3>')
    .replace(/<p class="htour__desc">[^<]*<\/p>/, '<p class="htour__desc">Your driver meets you in arrivals at Mohammed V airport or at your hotel and drives you to your riad door in Marrakech. The same car runs the other way.</p>')
    .replace('<b>Start:</b> Casablanca', '<b>Start:</b> Airport or hotel')
    .replace('<b>Length:</b> About 5 hours', '<b>End:</b> Marrakech')
    .replace('<span class="htour__fact">Private tour</span>', '<span class="htour__fact">Private car</span>');
  hub = hub.slice(0, b) + card + hub.slice(b);
  hub = hub.replace('<h2>Day Tours <span style="color:var(--muted);font-weight:500">in Casablanca</span></h2><p>Half a day in the city, on arrival or before your tour.</p>',
    '<h2>Day Tours &amp; Transfers <span style="color:var(--muted);font-weight:500">in Casablanca</span></h2><p>Half a day in the city, or a private car straight to Marrakech.</p>');
  fs.writeFileSync(P(hubF), hub); console.log('hub: card added');
}

// 3) Marrakech airport transfer extra
const apF = 'tours/marrakech-airport-transfer.html';
let ap = fs.readFileSync(P(apF), 'utf8');
if (!ap.includes(SLUG) && ap.includes('Straight on to Essaouira, Agadir or Casablanca')) {
  ap = ap.replace('Straight on to Essaouira, Agadir or Casablanca', `Straight on to Essaouira, Agadir or <a href="${SLUG}">Casablanca</a>`);
  fs.writeFileSync(P(apF), ap); console.log('airport: link added');
}
