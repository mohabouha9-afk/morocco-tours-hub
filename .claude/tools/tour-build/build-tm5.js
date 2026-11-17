// Build tours/5-day-morocco-tour-tangier-to-marrakech.html (URL kept): 5-day Tangier -> Marrakech by Fes and the Sahara.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Tangier -> Rif -> Chefchaouen (stop, lunch) -> Fes (night) · D2 Fes -> Ifrane -> Azrou cedars ->
// Midelt -> Ziz -> Erfoud -> Rissani -> Merzouga, sunset camel ride, camp · D3 sunrise -> Rissani -> Erfoud -> Tinghir -> Todra Gorge -> Dades ·
// D4 Valley of Roses -> Ouarzazate -> Aït Ben Haddou -> Tizi n'Tichka -> Marrakech · D5 Marrakech sightseeing (guide on request, as on the old page),
// drop-off at hotel or airport. Old page: dinners at camp + Dades, no city guides included.
// Desert facts = the fixed rules in PERFECT-TOUR.md (camel ride ~1 h at sunset, sandboarding, small bag for the camp) and our 7-day Tangier ->
// Marrakech page (same Fes -> Merzouga -> Dades -> Marrakech roads). Hotels: Fes, camp, Dades rows from the 7-day Tangier -> Marrakech table,
// Marrakech row from the 10-day from Tangier table.
// Roads (saved): tm7-d1 Tangier -> Chefchaouen ~125 km · fc3-d1 Chefchaouen <-> Fes 195 km · fm4-d1 Fes -> Merzouga ~470 km ·
// fm4-d2 Merzouga -> Todra -> Dades ~270 km · fm4-d3 Dades -> Ouarzazate -> Aït Ben Haddou -> Marrakech ~320 km.
// Derived from build-tc5.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/5-day-morocco-tour-tangier-to-marrakech.html';
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

const URL = 'https://moroccotourshub.com/tours/5-day-morocco-tour-tangier-to-marrakech.html';
const NAME = '5-Day Morocco Tour from Tangier to Marrakech';
const TITLE = '5-Day Tangier to Marrakech Tour via Fes & Sahara | Private';
const DESC = 'Private 5-day tour from Tangier to Marrakech: Chefchaouen and Fes, the cedar forests of the Middle Atlas, a sunset camel ride and a night in a Merzouga desert camp, the Todra Gorge, Dades and Aït Ben Haddou.';
const HERO = 'merzouga-camel-caravan.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="5 day Morocco tour from Tangier, Tangier to Marrakech, Tangier to Merzouga, Chefchaouen, Fes, Sahara desert camp, Todra Gorge, Ait Ben Haddou, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Tangier → Chefchaouen → Fes', p: 'Your driver-guide meets you in the morning at your Tangier hotel, the port or the airport, and heads up into the green Rif Mountains. Time in Chefchaouen to walk the blue lanes and have lunch on the square, then south through the hills to Fes by late afternoon.', meta: m('About 320 km, about 6 hours on the road', 'Night: Fes riad', 'Breakfast from day 2') },
  { t: 'Fes → Middle Atlas → Merzouga', p: 'An early start through Ifrane and the cedar forests near Azrou, where Barbary macaques live, then Midelt for lunch and the palm gorges of the Ziz Valley. In Merzouga for the sunset camel ride, about an hour, into the Erg Chebbi dunes, then dinner, drums and a night in the desert camp.', meta: m('About 470 km, about 8 hours on the road', 'Night: Desert camp', 'Breakfast and dinner') },
  { t: 'Merzouga → Todra Gorge → Dades Valley', p: 'Up for the sunrise over the dunes and a go at sandboarding, then back by camel or 4×4. East through Rissani and Erfoud to the palm oasis of Tinghir and a walk between the high red walls of the Todra Gorge, then along the Road of a Thousand Kasbahs to the Dades Valley.', meta: m('About 270 km, about 5 hours on the road', 'Night: Dades Valley', 'Breakfast and dinner') },
  { t: 'Dades → Ouarzazate → Aït Ben Haddou → Marrakech', p: 'Through the Valley of Roses to Ouarzazate, then Aït Ben Haddou, the earthen ksar on its hill, to walk up through the old village. Over the High Atlas by the Tizi n’Tichka pass at 2,260 m, with stops for the views, and down to Marrakech in the evening.', meta: m('About 320 km, about 6 hours on the road', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Marrakech and departure', p: 'A day in the Red City at your pace: the Koutoubia, the Bahia Palace, the souks and Jemaa el-Fnaa, or the Majorelle Garden. A local guide can join you on request. Your driver-guide takes you to your hotel or Marrakech airport at the time you need.', meta: [['car', 'Around Marrakech'], ['flag', 'Ends at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan crossing the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>5-Day Tangier to Marrakech</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>5-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Strait to the Sahara</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Tangier$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Tangier → Marrakech</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>5 days / 4 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Five days from the Strait of Gibraltar to the Red City, for travellers who arrive in Tangier and want the Sahara. The blue lanes of Chefchaouen and a night in Fes, then across the cedar forests of the Middle Atlas to the dunes of Merzouga for a sunset camel ride and a night in a desert camp.</p>
          <p class="dt-lead">Back west through the Todra Gorge and the Dades Valley, the kasbah of Aït Ben Haddou and over the High Atlas to Marrakech. Your own vehicle and driver-guide from the port or airport to your last day in Marrakech.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Desert night</dt><dd>Camp in the dunes</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Tangier → Marrakech$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The blue lanes of Chefchaouen',
  'A night in Fes',
  'The cedar forests and their macaques',
  'Sunset camel ride in the Erg Chebbi dunes',
  'A night in a desert camp',
  'The red walls of the Todra Gorge',
  'The ksar of Aït Ben Haddou',
  'Over the High Atlas to Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-city.webp', 'Chefchaouen under the Rif Mountains'],
  ['fes.jpg', 'A carved doorway in Fes'],
  ['merzouga-camel-ride-dunes.jpg', 'A camel ride in the Merzouga dunes'],
  ['desert-camp-lanterns.jpg', 'A desert camp at night'],
  ['todra-gorge-bridge.jpg', 'The Todra Gorge'],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at Tangier port, airport or hotel',
  'Drop-off at your Marrakech hotel or airport',
  '4 nights as in the table below',
  '4 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights and ferry tickets', 'Lunches, drinks, city dinners', 'Entrance fees', 'Local city guides', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Long road days: we stop whenever you want',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and Atlas nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace, Marrakech:</b> 100 MAD, if you go',
  '<b>Majorelle Garden:</b> about 170 MAD, if you go',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Fes and the Sahara, about 1,400 km in 5 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Chefchaouen,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTinghir,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same places as the other tours, owner to confirm) ----------
function cellsFrom(file, label) {
  const SRC = fs.readFileSync(root + 'tours/' + file, 'utf8');
  const i = SRC.indexOf(label); if (i < 0) throw new Error('row ' + label);
  const row = SRC.slice(i, SRC.indexOf('</tr>', i));
  const tds = row.match(/<td>[\s\S]*?<\/td>/g); if (!tds || tds.length < 3) throw new Error('cells ' + label);
  return tds.slice(0, 3).join('');
}
const T7 = '7-day-morocco-tour-tangier-to-marrakech.html', T10 = '10-day-morocco-tour-from-tangier.html';
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody><tr><th scope="row">1: Fes</th>${cellsFrom(T7, ': Fes</th>')}</tr><tr><th scope="row">2: Desert camp</th>${cellsFrom(T7, ': Desert camp</th>')}</tr><tr><th scope="row">3: Dades Valley</th>${cellsFrom(T7, ': Dades Valley</th>')}</tr><tr><th scope="row">4: Marra&shy;kech</th>${cellsFrom(T10, ': Marrakech</th>')}</tr></tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving from Spain who want the Sahara',
  'Seeing the north and the desert in one short trip',
  'Road-trippers happy with a few long days',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Long drives worry you? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day tour</a> adds a guided Fes day and a desert day',
  'Prefer the cities to the desert? The <a href="7-day-tangier-to-marrakech-imperial-cities-tour.html">7-day imperial cities tour</a> skips the Sahara',
  'Staying in the north? The <a href="5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen and Fes tour</a> ends in Fes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'tm5-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is 5 days enough from Tangier to Marrakech?', 'It is enough to see the north, the Sahara and the south in one go, but it is an active trip, with two long road days. If you want a guided day in Fes or more time in the dunes, the 7-day tour splits the same road over more nights.'],
  ['Which days are the long drives?', 'Day 2, Fes to Merzouga, is the longest: about 470 km and 8 hours, broken by the cedar forest, lunch in Midelt and the Ziz Valley. Day 1 and day 4 are about 6 hours each, day 3 about 5, always with stops.'],
  ['Can you meet us off the ferry?', 'Yes. Ferries from Tarifa arrive at the Tangier city port and ferries from Algeciras at Tanger Med, about an hour east. Your driver-guide waits at the exit with your name on a sign; tell us your crossing when you book.'],
  ['How long is the camel ride, and what about our luggage?', 'About an hour each way, at sunset and after sunrise, with a camel guide; a 4×4 is possible instead. Your big bags stay in our car or go to the camp by 4×4, so take a small bag for the night.'],
  ['Is a guide included in Fes and Marrakech?', 'Your driver-guide is with you all the way. Local city guides are not included on this short tour, but we can book one for an afternoon in Fes or your day in Marrakech; just ask when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A local guide in Fes or Marrakech',
  'Upgrade to a luxury desert camp',
  'Quad biking in the Merzouga dunes',
  'A night in Chefchaouen on the way',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-food-tour.html">food tour</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%205-Day%20Tangier%20to%20Marrakech%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>5-Day Tangier to Marrakech</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 5-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tm5-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Road-trippers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Chefchaouen', 'Fes (night 1)', 'Ifrane and the Azrou cedar forest', 'Merzouga desert camp (night 2)', 'Todra Gorge', 'Dades Valley (night 3)', 'Aït Ben Haddou', 'Marrakech (night 4)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Imperial Cities', 'Rabat', 'Volubilis', 'Meknes', 'Essaouira']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
