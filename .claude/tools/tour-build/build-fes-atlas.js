// Build tours/fes-middle-atlas-ifrane-azrou-day-trip.html (NEW, 2026-11-23): Fes day trip to the Middle Atlas.
// Research (web search 2026-11-23, OpenSEO not used): GetYourGuide / Headout / Expedia / Civitatis / TourHQ listings
// all run the same loop: Fes → Imouzzer Kandar (often + Dayet Aoua lake) → Ifrane (~1 h walk, lion statue)
// → Azrou cedar forest / Gouraud cedar (~1 h, Barbary macaques) → Azrou → back to Fes. 7–9 h, pick-up ~09:00–09:30,
// back 18:00–19:00. Some include lunch, most don't. Many sell "feed the monkeys": we don't (endangered species,
// feeding makes them aggressive). OSRM (routes fes-middle-atlas + fes-middle-atlas-back): Fes→Imouzzer 38 km / 40 min,
// →Dayet Aoua 11 km, →Ifrane 21 km / 25 min, →Gouraud cedar 18 km / 23 min, →Azrou 12 km / 16 min, Azrou→Fes 83 km / 1.5 h;
// 184 km and ~3.5 h driving in all.
// Template: tours/fes-to-chefchaouen-day-trip.html. Map: node .claude/tools/route-map.mjs <page> fes-middle-atlas (after this).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'fes-to-chefchaouen-day-trip.html';
let s = fs.readFileSync(root + 'tours/' + TPL, 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
const OUT = 'fes-middle-atlas-ifrane-azrou-day-trip.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Middle Atlas Day Trip from Fes: Ifrane, Azrou & the Cedar Forest';
const TITLE = 'Middle Atlas Day Trip from Fes: Ifrane, Azrou Cedar Forest & Monkeys | Private';
const DESC = 'Private day trip from Fes to the Middle Atlas: Imouzzer, Dayet Aoua lake, the Swiss-style town of Ifrane, the Azrou cedar forest with its wild Barbary macaques, and lunch in Azrou. Local guide included.';
// PLACEHOLDER photos (High Atlas): the site has no photo of Ifrane, the cedar forest or the macaques. Owner to supply.
const HERO = 'atlas-snow-autumn.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Middle Atlas day trip from Fes, Fes to Ifrane, Azrou cedar forest, Barbary macaques Morocco, Ifrane day trip, monkey forest Fes, day trip from Fes">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Autumn colours below the snowy peaks of the Atlas Mountains" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Chefchaouen Day Trip</span>', '<span>Middle Atlas Day Trip</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Middle Atlas Day Trip from Fes<span class="script">Ifrane, the cedar forest and the wild macaques</span></h1>', 'h1');
rep('<b>About 10 hours</b>', '<b>About 8 hours</b>', 'f1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">An easy, green day out of Fes and into the cool Middle Atlas. You climb through Imouzzer to the lake of Dayet Aoua, walk the tidy, Swiss-looking streets of Ifrane at 1,665 m, then go into the great cedar forest near Azrou, where wild Barbary macaques live among the trees.</p>
          <p class="dt-lead">The drives are short, about 40 minutes at most between stops, so it is a relaxed day for families and anyone who has had enough of the medina. Your driver and a local professional guide stay with you all day, and you are back in Fes in the late afternoon.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Pick-up', '09:00, back about 17:00', 3], ['Drive', 'Short legs, 3.5 h in all', 0], ['Macaques', 'About 1 h in the cedar forest', 1],
    ['Guide', 'Local professional guide included', 2], ['Lunch', 'In Azrou, about €10', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Wild Barbary macaques in the Atlas cedar forest',
  'A walk under giant cedars near the Gouraud cedar',
  'Ifrane, the "Switzerland of Morocco", and its stone lion',
  'Dayet Aoua, a mountain lake ringed by trees',
  'The view over the Saïs plain from Imouzzer',
  'Lunch in the Berber market town of Azrou',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['atlas-mountains.jpeg', 'The Atlas Mountains of Morocco'], ['atlas-snow.jpg', 'Snow on the Atlas Mountains in winter'],
  ['atlas-village-snow-peaks.jpg', 'A mountain village below snowy Atlas peaks'], ['atlas-berber-village.jpg', 'A Berber village in the Atlas Mountains'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['09:00', 'Pick-up in Fes', 'Your driver and guide meet you at your hotel, or at the nearest gate if you stay in a medina riad. We confirm the time on WhatsApp the day before.'],
  ['09:40', 'Imouzzer Kandar', 'A 40-minute climb (38 km) onto the first Middle Atlas plateau. Coffee stop with a wide view back over the Saïs plain and Fes.'],
  ['10:15', 'Dayet Aoua lake', '15 minutes on, a short walk on the shore of this tree-lined lake. Birds in spring; the water level depends on the year’s rain.'],
  ['11:00', 'Ifrane', '25 minutes to the "Switzerland of Morocco": sloping roofs, gardens and clean air at 1,665 m. About an hour to walk the centre and see the stone lion.'],
  ['12:30', 'The cedar forest and the macaques', '20 minutes into the forest near the Gouraud cedar. About an hour walking under the Atlas cedars, where wild Barbary macaques come close. Watch, but please don’t feed them.'],
  ['13:45', 'Lunch in Azrou', '15 minutes down to the market town of Azrou. Your guide suggests a local place (grilled meat, tagine or trout, around €10); then a short look at the town.'],
  ['15:30', 'Back to Fes', 'About 1.5 hours (83 km) back via El Hajeb. You are at your hotel or riad around 17:00, or dropped at a restaurant if you go out for dinner.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Private air-conditioned 4×4 or minivan with driver (see <a href="../index.html#fleet">our fleet</a>)', 'Local professional guide all day', 'Pick-up and drop-off at your Fes hotel or riad', 'All stops at your pace'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunch (around €10 depending on what you eat)', 'Drinks and snacks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'Ifrane is about 10 °C cooler than Fes: bring a warm layer, even in summer',
  'December to March can bring snow: we check the roads and adjust the plan',
  'Forest paths are easy but can be muddy: closed shoes are best',
  'Keep food out of sight near the macaques, they grab bags',
  'No shopping stops unless you ask',
].map(t => li(INFO, t)).join(''), 'gtk');
// costs on the day
rep(/(dt-costs"><h3>Costs on the day<\/h3><ul class="dt-ticks">)(<li>(<svg[\s\S]*?<\/svg>)[\s\S]*?)(<\/ul>)/, (m, a, x, ic, b) => a + [
  'Lunch in Azrou: around €10 per person',
  'Coffee or mint tea on the way: around 15–20 MAD',
  'Entrance fees: none, the town, lake and forest are free',
  'Tips for your driver and guide: up to you',
  'Cash is best for small payments on the way',
].map(t => li(ic, t)).join('') + b, 'costs');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private day, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A longer forest walk (2 hours) with your guide',
  'A stop at the Ain Vittel spring park in Ifrane',
  'Lunch at a trout farm near Ras El Ma',
  'A visit to the Azrou cedar woodwork cooperative',
  'Snow play in Michlifen in winter, when there is snow',
  'Child seats in the vehicle',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Families with children who want animals and fresh air', 'A calm day after the Fes medina', 'Summer days, when the mountains are cooler than Fes'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want Morocco’s history: the <a href="fes-volubilis-meknes-day-trip.html">Volubilis & Meknes day trip</a> has Roman ruins and an imperial city',
  'You are heading to the desert anyway: the <a href="2-day-fes-to-merzouga-desert-tour.html">2-day Fes to Merzouga tour</a> crosses Ifrane and the cedar forest on day one',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['James T.', 'Chloé D.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['Will we really see the macaques?', 'Almost always. The macaques live in the cedar forest near the Gouraud cedar all year and are used to people. They are wild animals, so it can never be promised, but your guide knows where the troops usually are.'],
  ['Can we feed the monkeys?', 'Please don’t, even if sellers offer peanuts. The Barbary macaque is an endangered species; feeding makes them sick and aggressive. You can watch them from a few metres, and they often come close on their own.'],
  ['Is it worth it in winter?', 'Yes, and many people love it: the cedars under snow are beautiful. Bring warm clothes. If heavy snow closes a road, we change the order or the stops, and tell you before you leave.'],
  ['Is it a good day for children?', 'One of the best from Fes: short drives, easy walks and the monkeys. We bring child seats on request.'],
  ['Do we need a guide in the forest?', 'A local professional guide is always included, so you never pay anyone else.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your trip.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the Middle Atlas day trip from Fes.")}"`, 'wa');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Middle Atlas Day Trip from Fes', 'mbar');
// Other Day Trips: the other Fes day trips (cards from the Fes city page)
{ const city = fs.readFileSync(root + 'tours/morocco-tours-from-fes.html', 'utf8');
  const sec = city.slice(city.indexOf('<section class="section" id="daytrips">'));
  const cards = sec.match(/<article class="htour">[\s\S]*?<\/article>/g).filter(c => /chefchaouen-day-trip|volubilis-meknes|medina-guided/.test(c));
  if (cards.length !== 3) throw new Error('cards ' + cards.length);
  between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', cards.map(c => '        <li>' + c.split('href="../tours/').join('href="') + '</li>\n').join(''), 'similar'); }
rep(/<h2 id="hcta-title">[^<]*<\/h2>/, '<h2 id="hcta-title">Book Your Middle Atlas Day Trip</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you stay in Fes; we’ll set the pick-up.', 'banner sub');
rep(/(<p class="dt-map__note">[\s\S]*?<span>)[\s\S]*?(<\/span><\/p>)/, '$1A loop of about 184 km: up through Ifrane to the cedar forest and Azrou, back by El Hajeb. <a href="https://www.openstreetmap.org/?mlat=33.5284&mlon=-5.1059#map=10/33.70/-5.10" target="_blank" rel="noopener">Open the larger map</a>$2', 'map note');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Families', 'Couples', 'Nature lovers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your trip.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Chefchaouen', 'blue city', 'Rif', 'Ouazzane', 'Spanish Mosque', 'Akchour', 'overnight', 'Volubilis, Moulay', 'Agafay', 'Ã']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
if (fs.existsSync(root + 'tours/' + OUT)) throw new Error('page exists: edit it directly, do not rebuild');
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
