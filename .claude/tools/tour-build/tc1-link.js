// One-off (2026-11-24): link tours/tangier-to-chefchaouen-day-trip.html from the Tangier hub, the Chefchaouen hub and sitemap.xml.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const rd = f => fs.readFileSync(root + f, 'utf8');
const fesHub = rd('tours/morocco-tours-from-fes.html');
const i = fesHub.indexOf('<article class="htour"><a class="htour__link" href="../tours/fes-to-chefchaouen-day-trip.html">');
const fesCard = fesHub.slice(i, fesHub.indexOf('</article>', i) + 10);
const tcCard = fesCard
  .replace('fes-to-chefchaouen-day-trip.html', 'tangier-to-chefchaouen-day-trip.html')
  .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, '<img src="/assets/images/grand-chefchaouen-blue.jpg" alt="Blue houses of Chefchaouen below the Rif Mountains" width="1300" height="866"')
  .replace('Fes to Chefchaouen Day Trip', 'Tangier to Chefchaouen Day Trip')
  .replace(/<p class="htour__desc">[^<]*/, '<p class="htour__desc">The blue city two hours from Tangier: about four hours in the medina with a local guide and free time, from your hotel or the port, back for dinner.')
  .replace('<b>Start:</b> Fes', '<b>Start:</b> Tangier')
  .replace('<b>Drive:</b> About 3.5 h each way', '<b>Drive:</b> About 2–2.5 h each way');
if (tcCard === fesCard || !tcCard.includes('Tangier to Chefchaouen')) throw new Error('card');

// 1) Tangier hub: 3rd card in Northern Morocco Tours
let t = rd('tours/morocco-tours-from-tangier.html');
if (!t.includes('tangier-to-chefchaouen-day-trip.html')) {
  const a = t.indexOf('id="northern"'); const end = t.indexOf('</div></section>', a);
  const last = t.lastIndexOf('</article>', end) + 10;
  t = t.slice(0, last) + tcCard + t.slice(last);
  t = t.replace('<p>Chefchaouen, Fes, Volubilis and the imperial north.</p>', '<p>Chefchaouen, Fes, Volubilis and the imperial north, or Chefchaouen in a day.</p>');
  fs.writeFileSync(root + 'tours/morocco-tours-from-tangier.html', t); console.log('tangier hub');
}
// 2) Chefchaouen hub: new "Day trips to Chefchaouen" section after "Tours visiting Chefchaouen"
let c = rd('destinations/chefchaouen.html');
if (!c.includes('tangier-to-chefchaouen-day-trip.html')) {
  const a = c.indexOf('<h2>Tours visiting Chefchaouen</h2>'); const end = c.indexOf('</div></section>', a) + '</div></section>'.length;
  const sec = `\n  <section class="section" id="day-trips"><div class="wrap">
    <div class="head-row"><div><h2>Day trips to Chefchaouen</h2><p>Short on time? See the blue city in one private day from Tangier or Fes.</p></div></div>
    <div class="tour-grid tour-grid--3">${tcCard}${fesCard}</div>
  </div></section>`;
  c = c.slice(0, end) + sec + c.slice(end);
  fs.writeFileSync(root + 'destinations/chefchaouen.html', c); console.log('chefchaouen hub');
}
// 3) sitemap
let m = rd('sitemap.xml');
if (!m.includes('tangier-to-chefchaouen-day-trip.html')) {
  const line = '  <url><loc>https://moroccotourshub.com/tours/fes-to-chefchaouen-day-trip.html</loc>';
  const j = m.indexOf(line); const k = m.indexOf('\n', j);
  m = m.slice(0, k + 1) + '  <url><loc>https://moroccotourshub.com/tours/tangier-to-chefchaouen-day-trip.html</loc><lastmod>2026-11-24</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n' + m.slice(k + 1);
  fs.writeFileSync(root + 'sitemap.xml', m); console.log('sitemap', (m.match(/<url>/g) || []).length);
}
