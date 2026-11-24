// One-off (2026-11-23): link the new paragliding page from day-trips.html (card + chip after the balloon, ItemList #21),
// sitemap.xml, and a 3rd "Think twice" line on the balloon page. Do not re-run.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const PAGE = 'marrakech-paragliding.html';
const NAME = 'Tandem Paragliding in Marrakech';
const must = (s, a) => { if (!s.includes(a)) throw new Error('missing ' + a.slice(0, 60)); };

// day-trips.html
let d = fs.readFileSync(root + 'day-trips.html', 'utf8');
const ci = d.indexOf('<li id="dt-balloon">');
const cj = d.indexOf('</a></article></li>', ci) + '</a></article></li>'.length;
const bal = d.slice(ci, cj);
const card = bal.replace('id="dt-balloon"', 'id="dt-paragliding"')
  .replace('tours/marrakech-hot-air-balloon-ride.html', 'tours/' + PAGE)
  .replace(/src="\/assets\/images\/[^"]+" alt="[^"]*" width="\d+" height="\d+"/, 'src="/assets/images/high-atlas-valley-aerial.jpg" alt="A High Atlas valley seen from above" width="1600" height="1067"')
  .replace('<span class="htour__days">4–5 hours</span>', '<span class="htour__days">About 4 hours</span>')
  .replace('<h3 class="htour__title">Hot Air Balloon Ride over Marrakech</h3>', `<h3 class="htour__title">${NAME}</h3>`)
  .replace(/<span class="htour__meta">[^<]*<\/span>/, '<span class="htour__meta">Marrakech · About 4 hours (morning)</span>')
  .replace(/<p class="htour__desc">.*?<\/p>/, '<p class="htour__desc">Run a few steps and fly in tandem with a licensed pilot over Lake Lalla Takerkoust and the Atlas foothills, an hour from Marrakech.</p>')
  .replace('About 1 hour in the air', '10–20 minutes in the air')
  .replace('Berber breakfast', 'No experience needed')
  .replace('Hotel pick-up before dawn', 'New date or refund if windy');
if (card === bal) throw new Error('card');
d = d.slice(0, cj) + '\n          ' + card + d.slice(cj);
const chipStart = d.indexOf('<li><a href="#dt-balloon">');
const chipEnd = d.indexOf('</li>', chipStart) + 5;
const chip = d.slice(chipStart, chipEnd);
d = d.slice(0, chipEnd) + chip.replace('#dt-balloon', '#dt-paragliding').replace('<span>Balloon Ride</span>', '<span>Paragliding</span>') + d.slice(chipEnd);
const last = '{"@type":"ListItem","position":20,"url":"https://moroccotourshub.com/tours/marrakech-palmeraie-horse-riding.html","name":"Horse Riding in the Marrakech Palmeraie"}';
must(d, last);
d = d.replace(last, last + `,{"@type":"ListItem","position":21,"url":"https://moroccotourshub.com/tours/${PAGE}","name":"${NAME}"}`);
fs.writeFileSync(root + 'day-trips.html', d);

// sitemap
let m = fs.readFileSync(root + 'sitemap.xml', 'utf8');
const sl = '  <url><loc>https://moroccotourshub.com/tours/marrakech-palmeraie-horse-riding.html</loc><lastmod>2026-11-23</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>';
must(m, sl);
m = m.replace(sl, sl + '\n' + sl.replace('marrakech-palmeraie-horse-riding.html', PAGE));
fs.writeFileSync(root + 'sitemap.xml', m);

// balloon page: 3rd Think twice line
let b = fs.readFileSync(root + 'tours/marrakech-hot-air-balloon-ride.html', 'utf8');
const end = 'You fly home that morning: the return can be as late as 11:00, so choose another day</span></li>';
must(b, end);
const icon = b.slice(b.lastIndexOf('<li>', b.indexOf(end)) + 4, b.indexOf(end));
b = b.replace(end, end + `<li>${icon}You want more of a thrill: fly in tandem on our <a href="${PAGE}">paragliding flight</a> over the lake</span></li>`);
fs.writeFileSync(root + 'tours/marrakech-hot-air-balloon-ride.html', b);
console.log('linked');
