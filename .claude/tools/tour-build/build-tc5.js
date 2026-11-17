// Build tours/5-day-tangier-chefchaouen-fes-tour.html (URL kept): 5-day Tangier -> Fes, one way.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Tangier arrival (airport, train, ferry or hotel) + city tour, Cap Spartel, Caves of Hercules (night
// Tangier) · D2 Tangier -> Rif -> Chefchaouen · D3 Chefchaouen -> Volubilis -> Moulay Idriss -> Meknes -> Fes · D4 guided Fes medina · D5 Fes departure
// (Fes-Saïss airport, train station or hotel).
// Facts reused from our rebuilt tours: Volubilis 70–100 MAD, Bou Inania ~20, Caves of Hercules small fee; Tarifa ferries -> Tangier city port,
// Algeciras ferries -> Tanger Med. Hotels: Tangier, Chefchaouen, Fes rows copied from the 10-day Marrakech -> Tangier table.
// Roads (saved): tm7-d1 Tangier -> Tetouan -> Chefchaouen ~125 km · tg3 Chefchaouen -> Volubilis -> Meknes -> Fes ~260 km.
// Derived from build-ft4.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/5-day-tangier-chefchaouen-fes-tour.html';
let s = fs.readFileSync(tpl, 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const ALLPAGES = fs.readdirSync(root + 'tours').map(f => fs.readFileSync(root + 'tours/' + f, 'utf8')).join('');
function dims(f) { const mm = ALLPAGES.match(new RegExp(f.replace('.', '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }

const URL = 'https://moroccotourshub.com/tours/5-day-tangier-chefchaouen-fes-tour.html';
const NAME = '5-Day Tangier, Chefchaouen & Fes Tour';
const TITLE = '5-Day Tangier, Chefchaouen & Fes Tour | Private';
const DESC = 'Private 5-day tour of northern Morocco from Tangier: the Kasbah and Cap Spartel, a night in blue Chefchaouen, Volubilis, Moulay Idriss and Meknes, then two nights in Fes with a guided day in the medina.';
const HERO = 'grand-chefchaouen-blue.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Tangier to Fes tour, Tangier to Chefchaouen, northern Morocco tour, Chefchaouen, Volubilis, Meknes, Fes medina guided tour, private Morocco tour from Tangier">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Tangier: arrival and the city', p: 'Your driver-guide meets you at Tangier airport, the train station, the ferry port or your hotel. Then the Kasbah and its view over the Strait of Gibraltar, the medina, the Grand and Petit Socco, and out to Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules.', meta: m('About 60 km in and around Tangier', 'Night: Tangier', 'Breakfast from day 2') },
  { t: 'Tangier → the Rif Mountains → Chefchaouen', p: 'Through the green hills of the Rif to Chefchaouen, the blue town. The afternoon in the blue lanes and the Outa el-Hammam square under the old kasbah, then the walk up to the Spanish Mosque for the sunset over the town and the mountains.', meta: m('About 125 km, about 2.5 hours on the road', 'Night: Chefchaouen', 'Breakfast') },
  { t: 'Chefchaouen → Volubilis → Moulay Idriss → Meknes → Fes', p: 'An early walk in the quiet blue streets, then south to Volubilis, the Roman city with its columns and floor mosaics, the holy hill town of Moulay Idriss, and Meknes for the great Bab Mansour gate and the old royal quarter. Fes by late afternoon.', meta: m('About 260 km, about 4.5 hours on the road', 'Night: Fes riad', 'Breakfast') },
  { t: 'Fes: a guided day in the medina', p: 'With a local Fes guide in Fes el-Bali, one of the largest car-free medieval towns in the world: the Bou Inania Madrasa, the Al Quaraouiyine quarter, the Nejjarine fountain, the Chouara tanneries from a rooftop, then the Mellah and a viewpoint over the old city. No shop stops unless you ask.', meta: m('Day on foot in the medina', 'Night: Fes riad', 'Breakfast') },
  { t: 'Fes: departure', p: 'A free morning in Fes if your flight or train is later, then your driver-guide takes you to Fes-Saïss airport, the train station or anywhere in the city.', meta: [['car', 'Riad to Fes airport, about 30 minutes'], ['flag', 'Ends in Fes: airport, station or hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A blue lane in the medina of Chefchaouen" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>5-Day Tangier, Chefchaouen &amp; Fes</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>5-Day Tangier, Chefchaouen &amp; Fes Tour<span class="script">Northern Morocco from the Strait</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Tangier$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Tangier → Fes</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>5 days / 4 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Five days across the north of Morocco, starting where Africa faces Europe. Tangier’s Kasbah and Cap Spartel on the first day, then up into the Rif Mountains to Chefchaouen, the blue town, with a night there for the sunset and the quiet early lanes.</p>
          <p class="dt-lead">South by the Roman ruins of Volubilis, holy Moulay Idriss and the imperial city of Meknes to Fes, with two nights and a full guided day in its old medina. We meet you off the plane, train or ferry, and leave you at Fes airport or the station at the end.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Arrival</dt><dd>Airport, ferry or train</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Tangier → Fes$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Kasbah of Tangier',
  'Cap Spartel, where two seas meet',
  'The Caves of Hercules',
  'A night in blue Chefchaouen',
  'The Roman mosaics of Volubilis',
  'Bab Mansour in Meknes',
  'Two nights in Fes',
  'The Fes medina with a local guide',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-tangier-lighthouse.jpg', 'The lighthouse at Cap Spartel near Tangier'],
  ['tangier-train.jpg', 'Arriving in Tangier'],
  ['chefchaouen.jpg', 'The blue town of Chefchaouen'],
  ['chefchaouen-blue-steps.jpg', 'Blue steps in the Chefchaouen medina'],
  ['fes-royal-palace-gates.jpg', 'The golden gates of the royal palace in Fes'],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in the Fes medina',
  'Pick-up at Tangier airport, port, station or hotel',
  'Drop-off at Fes airport, station or hotel',
  '4 nights as in the table below',
  '4 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights, ferries and trains', 'Lunches, dinners and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Arriving by ferry? Tell us the port and the crossing',
  'Chefchaouen and Fes are hilly: wear good shoes',
  'Cover shoulders and knees in the madrasas',
  'Tanneries smell strong: you get a sprig of mint',
  'Medina riads: a porter carries your bags from the gate',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Caves of Hercules:</b> small fee',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa:</b> about 20 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Tangier to Fes by Chefchaouen, Volubilis and Meknes, about 450 km in 5 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Chefchaouen,Morocco%7CVolubilis,Morocco%7CMoulay+Idriss,Morocco%7CMeknes,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same places as the other tours, owner to confirm) ----------
const SRC = fs.readFileSync(root + 'tours/10-day-morocco-tour-marrakech-to-tangier.html', 'utf8');
function cells(label) {
  const i = SRC.indexOf(label); if (i < 0) throw new Error('row ' + label);
  const row = SRC.slice(i, SRC.indexOf('</tr>', i));
  const tds = row.match(/<td>[\s\S]*?<\/td>/g); if (!tds || tds.length < 3) throw new Error('cells ' + label);
  return tds.slice(0, 3).join('');
}
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody><tr><th scope="row">1: Tangier</th>${cells(': Tangier</th>')}</tr><tr><th scope="row">2: Chef&shy;chaouen</th>${cells('Chef&shy;chaouen</th>')}</tr><tr><th scope="row">3–4: Fes</th>${cells(': Fes</th>')}</tr></tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from a sea-view hotel in Tangier to riads in the old towns.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving from Spain by ferry',
  'A first look at Morocco’s north in under a week',
  'Culture lovers: medinas, Romans and sultans',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Going on to Marrakech? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day tour</a> adds the Sahara on the way',
  'Want Akchour and Asilah too? The <a href="7-day-northern-morocco-tour.html">7-day northern tour</a> takes them in',
  'Already in Fes? The <a href="3-day-fes-chefchaouen-volubilis-tour.html">3-day tour</a> loops from Fes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'tc5-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can you meet us off the ferry from Spain?', 'Yes. Ferries from Tarifa arrive at the Tangier city port, a few minutes from the medina; ferries from Algeciras arrive at Tanger Med, about an hour east. Your driver-guide waits at the exit with your name on a sign; tell us your crossing when you book.'],
  ['Is one night in Chefchaouen enough?', 'For most travellers, yes: you arrive early afternoon, see the sunset from the Spanish Mosque and walk the empty lanes the next morning. If you love walking, add a second night for the Akchour waterfalls in the Rif.'],
  ['Will the Fes guide take us to shops?', 'No shop stops unless you ask. The tanneries are seen from the terrace of a leather shop, which is free; the staff will show you their goods, but you never have to buy. Say no thanks and walk on.'],
  ['How do we leave Fes at the end?', 'Fes-Saïss airport is about 30 minutes from the medina, and trains run from Fes to Rabat, Casablanca and Tangier. We drop you wherever you need to be, at the time of your flight or train.'],
  ['How long are the drives?', 'Short: about 2.5 hours from Tangier to Chefchaouen and about 4.5 hours of driving on day 3, split by Volubilis, Moulay Idriss and Meknes. Day 1 stays around Tangier and day 4 is on foot in Fes.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Asilah, the white town on the Atlantic, on day 1',
  'A second night in Chefchaouen with Akchour',
  'An official site guide at Volubilis',
  'An extra free day in Fes',
  'Two more days to the Sahara from Fes',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%205-Day%20Tangier%2C%20Chefchaouen%20and%20Fes%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>5-Day Tangier to Fes</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 5-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tc5-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier, Cap Spartel and the Caves of Hercules (night 1)', 'Chefchaouen (night 2)', 'Volubilis', 'Moulay Idriss', 'Meknes', 'Fes with a guided day (nights 3–4)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'camp', 'Imperial Cities', 'Rabat', 'Sahara Tour', 'Erg Chebbi']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
