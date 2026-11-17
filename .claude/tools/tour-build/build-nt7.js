// Build tours/7-day-northern-morocco-tour.html (URL kept): 7-day Tangier -> Fes through the north.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Tangier arrival + Kasbah, medina, Soccos, Cap Spartel, Caves of Hercules · D2 Asilah + Larache on
// the Atlantic, back to Tangier · D3 Tangier -> Rif -> Chefchaouen · D4 Akchour, back to Chefchaouen · D5 Volubilis -> Moulay Idriss -> Meknes -> Fes ·
// D6 guided Fes medina · D7 Fes departure (Fes-Saïss airport, station or hotel).
// Facts reused from our rebuilt northern tours (fc3, ft4, tc5): Volubilis 70–100 MAD, Bou Inania ~20, Caves of Hercules small fee, ferries (Tarifa ->
// city port, Algeciras -> Tanger Med), Akchour first pools under an hour. Hotels: Tangier, Chefchaouen, Fes rows from the 10-day Marrakech -> Tangier table.
// OSRM: nt7-d2 Tangier -> Asilah -> Larache 93 km one way (~190 km round trip) · tm7-d1 Tangier -> Chefchaouen ~125 km · ft4-d3 Chefchaouen -> Akchour
// 29 km · tg3 Chefchaouen -> Volubilis -> Meknes -> Fes ~260 km.
// Derived from build-tc5.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/7-day-northern-morocco-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/7-day-northern-morocco-tour.html';
const NAME = '7-Day Northern Morocco Tour';
const TITLE = '7-Day Northern Morocco Tour: Tangier to Fes | Private';
const DESC = 'Private 7-day northern Morocco tour: Tangier and Cap Spartel, the white town of Asilah and Larache on the Atlantic, two nights in Chefchaouen with Akchour, Volubilis, Meknes and two nights in Fes.';
const HERO = 'chefchaouen-blue-steps.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="northern Morocco tour, 7 day Morocco tour from Tangier, Tangier to Fes, Asilah, Larache, Chefchaouen, Akchour, Volubilis, Meknes, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Tangier: arrival and the city', p: 'Your driver-guide meets you at Tangier airport, the ferry port, the train station or your hotel. The Kasbah and its view over the Strait, the medina and the Grand and Petit Socco, then out in the afternoon to Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules.', meta: m('About 60 km in and around Tangier', 'Night: Tangier', 'Breakfast from day 2') },
  { t: 'Asilah and Larache on the Atlantic', p: 'Down the coast to Asilah, the white town inside its old Portuguese walls, with murals on the houses and the ocean at the end of every lane; lunch by the sea. On to Larache for its main square and its coastal viewpoints, then back to Tangier for the evening.', meta: m('About 190 km there and back', 'Night: Tangier', 'Breakfast') },
  { t: 'Tangier → the Rif Mountains → Chefchaouen', p: 'Through the green hills of the Rif to Chefchaouen, the blue town. Lunch on the Outa el-Hammam square, the blue lanes and the old kasbah, then the walk up to the Spanish Mosque for the sunset over the town and the mountains.', meta: m('About 125 km, about 2.5 hours on the road', 'Night: Chefchaouen', 'Breakfast') },
  { t: 'Akchour and the Rif', p: 'Half an hour into the mountains to Akchour, where a river path leads through a green gorge to turquoise pools and waterfalls. Walk as far as you like, or rest by the water. Back in Chefchaouen in the afternoon for a slow second evening in the blue town.', meta: m('About 60 km there and back', 'Night: Chefchaouen', 'Breakfast') },
  { t: 'Chefchaouen → Volubilis → Moulay Idriss → Meknes → Fes', p: 'South to Volubilis, the Roman city with its columns and floor mosaics, a walk in the holy hill town of Moulay Idriss, then Meknes for the great Bab Mansour gate and lunch. In Fes by the evening.', meta: m('About 260 km, about 4.5 hours on the road', 'Night: Fes riad', 'Breakfast') },
  { t: 'Fes: a guided day in the medina', p: 'With a local Fes guide in Fes el-Bali: the Bou Inania Madrasa, the Nejjarine fountain, the Al Quaraouiyine quarter and the Chouara tanneries from a rooftop, then after lunch the Mellah and a viewpoint over the old city. No shop stops unless you ask.', meta: m('Day on foot in the medina', 'Night: Fes riad', 'Breakfast') },
  { t: 'Fes: departure', p: 'A free morning in Fes if your flight or train is later, then your driver-guide takes you to Fes-Saïss airport, the train station or anywhere in the city.', meta: [['car', 'Riad to Fes airport, about 30 minutes'], ['flag', 'Ends in Fes: airport, station or hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue-washed steps in the medina of Chefchaouen" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>7-Day Northern Morocco Tour</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>7-Day Northern Morocco Tour<span class="script">Two Seas, the Rif and Fes</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Tangier$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Tangier → Fes</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>7 days / 6 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">A slow week in the north of Morocco, two nights in each place. Tangier and Cap Spartel where two seas meet, a day on the Atlantic in white Asilah and Larache, then up into the Rif to Chefchaouen, the blue town, with a day at the river pools of Akchour.</p>
          <p class="dt-lead">South by the Roman ruins of Volubilis, holy Moulay Idriss and imperial Meknes to Fes, with a full guided day in its old medina. We meet you off the plane, train or ferry, and leave you at Fes airport or the station at the end.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Slow pace</dt><dd>2 nights in each place</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Tangier → Fes$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Cap Spartel, where two seas meet',
  'The Kasbah of Tangier',
  'White Asilah inside its walls',
  'Two nights in blue Chefchaouen',
  'The river pools of Akchour',
  'The Roman mosaics of Volubilis',
  'Bab Mansour in Meknes',
  'The Fes medina with a local guide',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['tangier.jpg', 'The white city of Tangier by the sea'],
  ['tangier-cap-spartel-lighthouse.jpg', 'The lighthouse at Cap Spartel'],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour'],
  ['grand-chefchaouen-blue.jpg', 'A blue lane in Chefchaouen'],
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes'],
  ['fes-guide.jpg', 'Walking the Fes medina with a local guide'],
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
  '6 nights as in the table below',
  '6 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights, ferries and trains', 'Lunches, dinners and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Arriving by ferry? Tell us the port and the crossing',
  'Akchour: river shoes help, the path crosses water',
  'Cover shoulders and knees in the madrasas',
  'The north is green because it rains: pack a light jacket',
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
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Tangier to Fes by the Atlantic coast, Chefchaouen and Meknes, about 750 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Asilah,Morocco%7CLarache,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CMeknes,Morocco&amp;travelmode=driving"', 'mapnote');

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
            <tbody><tr><th scope="row">1–2: Tangier</th>${cells(': Tangier</th>')}</tr><tr><th scope="row">3–4: Chef&shy;chaouen</th>${cells('Chef&shy;chaouen</th>')}</tr><tr><th scope="row">5–6: Fes</th>${cells(': Fes</th>')}</tr></tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from a sea-view hotel in Tangier to riads in the old towns.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving from Spain by ferry',
  'A slow week with two nights in each place',
  'Walkers and photographers who love the Rif',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 5 days? The <a href="5-day-tangier-chefchaouen-fes-tour.html">5-day tour</a> keeps Chefchaouen and Fes',
  'Want the Sahara too? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> goes on to Merzouga',
  'Landing in Fes? The <a href="4-day-fes-to-tangier-via-chefchaouen.html">4-day Fes to Tangier tour</a> runs the other way',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'nt7-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why two nights in Tangier?', 'Tangier is a short hop from Spain, so many guests arrive tired from the ferry or the flight. The second night lets you see the city and Cap Spartel without rushing, and spend a full day on the Atlantic in Asilah and Larache.'],
  ['What is there to see in Asilah and Larache?', 'Asilah is a small white town inside 15th-century Portuguese walls, with murals painted on its houses and a sea view at the end of the lanes. Larache, further south, has a lively main square and wide views over the ocean and the river mouth.'],
  ['How hard is the walk at Akchour?', 'You choose. From the car park, a riverside path reaches the first pools in under an hour; the big waterfall and the natural rock arch called God’s Bridge take longer, with some scrambling. You can turn back anytime.'],
  ['Can you meet us off the ferry?', 'Yes. Ferries from Tarifa arrive at the Tangier city port and ferries from Algeciras at Tanger Med, about an hour east. Your driver-guide waits at the exit with your name on a sign; tell us your crossing when you book.'],
  ['Will the Fes guide take us to shops?', 'No shop stops unless you ask. The tanneries are seen from the terrace of a leather shop, which is free; the staff will show you their goods, but you never have to buy. Say no thanks and walk on.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Tetouan’s white medina on the way to Chefchaouen',
  'A longer hike in the Rif at Akchour',
  'An official site guide at Volubilis',
  'An extra free day in Fes',
  'End in Tangier instead, for the ferry home',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%207-Day%20Northern%20Morocco%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>7-Day Northern Morocco</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 7-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'nt7-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Walkers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier and Cap Spartel (nights 1–2)', 'Asilah and Larache', 'Chefchaouen (nights 3–4)', 'Akchour', 'Volubilis, Moulay Idriss and Meknes', 'Fes with a guided day (nights 5–6)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'camp', 'Imperial Cities', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'Marrakech']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
