// One-off (2026-11-23): link the new horse riding page from day-trips.html (card + chip + ItemList #20),
// sitemap.xml, and the Palmeraie camel page's "You May Also Like" (horse card replaces the Majorelle card,
// which that page already links in Make It Your Own). Do not re-run.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const PAGE = 'marrakech-palmeraie-horse-riding.html';
const NAME = 'Horse Riding in the Marrakech Palmeraie';
const IMG = 'src="/assets/images/marrakech-caleche-square.jpg" alt="Horses on a square in Marrakech" width="1300" height="866"';
const must = (s, a) => { if (!s.includes(a)) throw new Error('missing ' + a.slice(0, 60)); };

// day-trips.html
let d = fs.readFileSync(root + 'day-trips.html', 'utf8');
const ci = d.indexOf('<li id="dt-palmeraie">');
const cj = d.indexOf('</a></article></li>', ci) + '</a></article></li>'.length;
const camel = d.slice(ci, cj);
let card = camel.replace('id="dt-palmeraie"', 'id="dt-horse"')
  .replace('tours/marrakech-palmeraie-camel-ride.html', 'tours/' + PAGE)
  .replace(/src="\/assets\/images\/[^"]+" alt="[^"]*" width="\d+" height="\d+"/, IMG)
  .replace('<h3 class="htour__title">Camel Ride in the Marrakech Palmeraie</h3>', `<h3 class="htour__title">${NAME}</h3>`)
  .replace(/<p class="htour__desc">.*?<\/p>/, '<p class="htour__desc">A full hour on horseback through the palm grove, 15–20 minutes from the medina, with a helmet, a short lesson and mint tea.</p>')
  .replace('A full hour on the camel', 'A full hour in the saddle')
  .replace('Mint tea with a Berber family', 'Beginners welcome');
if (card === camel) throw new Error('card');
d = d.slice(0, cj) + '\n          ' + card + d.slice(cj);
const chipStart = d.indexOf('<li><a href="#dt-palmeraie">');
const chipEnd = d.indexOf('</li>', chipStart) + 5;
const chip = d.slice(chipStart, chipEnd);
d = d.slice(0, chipEnd) + chip.replace('#dt-palmeraie', '#dt-horse').replace('Palmeraie Camels', 'Horse Riding') + d.slice(chipEnd);
const last = '{"@type":"ListItem","position":19,"url":"https://moroccotourshub.com/tours/marrakech-three-valleys-day-trip.html","name":"Three Valleys Day Trip from Marrakech"}';
must(d, last);
d = d.replace(last, last + `,{"@type":"ListItem","position":20,"url":"https://moroccotourshub.com/tours/${PAGE}","name":"${NAME}"}`);
fs.writeFileSync(root + 'day-trips.html', d);

// sitemap
let m = fs.readFileSync(root + 'sitemap.xml', 'utf8');
const sl = '  <url><loc>https://moroccotourshub.com/tours/marrakech-palmeraie-camel-ride.html</loc><lastmod>2026-11-23</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>';
must(m, sl);
m = m.replace(sl, sl + '\n' + sl.replace('marrakech-palmeraie-camel-ride.html', PAGE));
fs.writeFileSync(root + 'sitemap.xml', m);

// camel page: horse card replaces Majorelle card in You May Also Like
let c = fs.readFileSync(root + 'tours/marrakech-palmeraie-camel-ride.html', 'utf8');
const mi = c.indexOf('<li><article class="htour htour--dt"><a class="htour__link" href="../tours/majorelle-garden-palaces-marrakech-tour.html">');
if (mi < 0) throw new Error('majorelle card');
const mj = c.indexOf('</a></article></li>', mi) + '</a></article></li>'.length;
c = c.slice(0, mi) + card.replace(' id="dt-horse"', '').replace('href="tours/', 'href="../tours/') + c.slice(mj);
fs.writeFileSync(root + 'tours/marrakech-palmeraie-camel-ride.html', c);
console.log('linked');
