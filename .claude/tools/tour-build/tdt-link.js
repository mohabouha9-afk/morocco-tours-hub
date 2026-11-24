// One-off (2026-11-24): link tours/tangier-day-tour-from-tarifa.html from the Tangier hub and sitemap.xml.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const rd = f => fs.readFileSync(root + f, 'utf8');
let t = rd('tours/morocco-tours-from-tangier.html');
const i = t.indexOf('<article class="htour"><a class="htour__link" href="../tours/tangier-to-chefchaouen-day-trip.html">');
if (i < 0) throw new Error('tc card');
const tcCard = t.slice(i, t.indexOf('</article>', i) + 10);
const card = tcCard
  .replace('tangier-to-chefchaouen-day-trip.html', 'tangier-day-tour-from-tarifa.html')
  .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, '<img src="/assets/images/grand-tangier-lighthouse.jpg" alt="The Cap Spartel lighthouse among palm trees near Tangier" width="1300" height="866"')
  .replace('Tangier to Chefchaouen Day Trip', 'Tangier Day Trip from Tarifa')
  .replace(/<p class="htour__desc">[^<]*/, '<p class="htour__desc">Over from Spain for the day? We meet your ferry at Tangier Ville: the medina and Kasbah with a local guide, Cap Spartel and the Caves of Hercules, back for your sailing.')
  .replace('<b>Start:</b> Tangier', '<b>Start:</b> Tangier Ville port')
  .replace('<b>Drive:</b> About 2–2.5 h each way', '<b>Ferry:</b> About 1 h from Tarifa');
for (const k of ['Tangier Day Trip from Tarifa', 'Tangier Ville port', 'About 1 h from Tarifa']) if (!card.includes(k)) throw new Error('card ' + k);
if (!t.includes('tangier-day-tour-from-tarifa.html')) {
  t = t.slice(0, i + tcCard.length) + card + t.slice(i + tcCard.length);
  fs.writeFileSync(root + 'tours/morocco-tours-from-tangier.html', t); console.log('tangier hub');
}
let m = rd('sitemap.xml');
if (!m.includes('tangier-day-tour-from-tarifa.html')) {
  const j = m.indexOf('tours/tangier-to-chefchaouen-day-trip.html</loc>'); const k = m.indexOf('\n', j);
  m = m.slice(0, k + 1) + '  <url><loc>https://moroccotourshub.com/tours/tangier-day-tour-from-tarifa.html</loc><lastmod>2026-11-24</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n' + m.slice(k + 1);
  fs.writeFileSync(root + 'sitemap.xml', m); console.log('sitemap', (m.match(/<url>/g) || []).length);
}
