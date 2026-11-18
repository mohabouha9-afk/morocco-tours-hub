// Adds the Agafay buggy tour (tours/agafay-desert-buggy-tour.html) to day-trips.html, destinations/agafay.html, sitemap.xml
// and the Agafay quad page; also adds a "day trips from Marrakech" link under the hub's activity grid.
// Run once after build-agbuggy.js (skips what is already there). Run from the project root.
const fs = require('fs');
const U = 'tours/agafay-desert-buggy-tour.html', NAME = 'Agafay Desert Buggy Tour';
let dt = fs.readFileSync('day-trips.html', 'utf8');
const src = dt.match(/<li id="dt-quad">[\s\S]*?<\/a><\/article><\/li>/)[0];
const c = src.replace('id="dt-quad"', 'id="dt-buggy"')
  .replace('tours/agafay-desert-quad-biking.html', U)
  .replace(/src="\/assets\/images\/agafay-quad-ride\.jpg" alt="[^"]*" width="800" height="600"/, 'src="/assets/images/merzouga-buggy-driver.jpg" alt="A driver in a buggy with helmet and seat belt on" width="1600" height="1063"')
  .replace('Quad Biking in the Agafay Desert', NAME)
  .replace(/<p class="htour__desc">[^<]*/, '<p class="htour__desc">Drive a 2-seat buggy side by side over the Agafay hills behind your guide, with mint tea in a Berber village on the 2-hour ride.')
  .replace('Instructor rides with you</span>', 'Guide drives in front</span>')
  .replace('Helmet and safety gear</span>', 'Seat belts and roll bar</span>')
  .replace('Berber tea stop</span>', '2 or 4 seats</span>');
const spark = dt.match(/<li><a href="#dt-quad">(<svg[\s\S]*?<\/svg>)/)[1];
if (!dt.includes(U)) {
  dt = dt.replace(src, src + '\n' + c);
  dt = dt.replace(/(<li><a href="#dt-quad">[\s\S]*?<\/a><\/li>)/, `$1<li><a href="#dt-buggy">${spark}<span>Buggy Tour</span></a></li>`);
  dt = dt.replace(/("itemListElement":\[[^\n]*?)\]\}<\/script>/, (m, a) => a + `,{"@type":"ListItem","position":17,"url":"https://moroccotourshub.com/${U}","name":"${NAME}"}]}</script>`);
  fs.writeFileSync('day-trips.html', dt); console.log('day-trips ok');
}
let ag = fs.readFileSync('destinations/agafay.html', 'utf8');
if (!ag.includes(U)) {
  const quad = ag.match(/<li id="ag-quad">[\s\S]*?<\/a><\/article><\/li>/)[0];
  ag = ag.replace(quad, quad + '\n' + c.replace('id="dt-buggy"', 'id="ag-buggy"').split('href="tours/').join('href="../tours/'));
  ag = ag.replace(/(<li><a href="#ag-quad">[\s\S]*?<\/a><\/li>)/, `$1<li><a href="#ag-buggy">${spark}<span>Buggy Tour</span></a></li>`);
  const j = ag.match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*?)<\/script>/);
  const o = JSON.parse(j[1]); const qi = o.itemListElement.findIndex(x => x.url.endsWith('agafay-desert-quad-biking.html'));
  o.itemListElement.splice(qi + 1, 0, { '@type': 'ListItem', position: 0, url: 'https://moroccotourshub.com/' + U, name: NAME }); o.itemListElement.forEach((x, i) => x.position = i + 1);
  ag = ag.replace(j[1], JSON.stringify(o));
  ag = ag.replace(' quad biking on the desert tracks, and a sunrise balloon flight.', ' quad or buggy rides on the desert tracks, and a sunrise balloon flight.');
  ag = ag.replace(/(<ul class="htours__list dtl-grid mz-grid3">[\s\S]*?<\/ul>\n)/, '$1      <p class="sdh-note">More ideas near Marrakech: all our <a href="../day-trips.html">day trips from Marrakech</a>.</p>\n');
  ag = ag.replace('a buggy for two instead of a quad', 'a <a class="sdh-link" href="../tours/agafay-desert-buggy-tour.html">family buggy</a> instead of a quad');
  fs.writeFileSync('destinations/agafay.html', ag); console.log('hub ok');
}
let sm = fs.readFileSync('sitemap.xml', 'utf8');
if (!sm.includes(U)) { sm = sm.replace(/(  <url><loc>https:\/\/moroccotourshub\.com\/tours\/agafay-desert-quad-biking\.html<\/loc>[^\n]*\n)/, `$1  <url><loc>https://moroccotourshub.com/${U}</loc><lastmod>2026-11-18</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`); fs.writeFileSync('sitemap.xml', sm); console.log('sitemap ok'); }
let q = fs.readFileSync('tours/agafay-desert-quad-biking.html', 'utf8');
if (!q.includes('agafay-desert-buggy-tour.html">')) {
  q = q.replace('<span>A buggy for two instead of quads</span>', '<span>A <a href="agafay-desert-buggy-tour.html">buggy for two</a> instead of quads</span>');
  q = q.replace('Prefer something gentler? A buggy takes children from 5.', 'Prefer something gentler? Our <a href="agafay-desert-buggy-tour.html">buggy tour</a> takes children from 6.');
  fs.writeFileSync('tours/agafay-desert-quad-biking.html', q); console.log('quad ok');
}
