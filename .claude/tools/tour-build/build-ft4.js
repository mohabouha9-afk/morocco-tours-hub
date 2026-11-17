// Build tours/4-day-fes-to-tangier-via-chefchaouen.html (URL kept): 4-day Fes -> Tangier, one way.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 guided Fes medina (night Fes) · D2 Fes -> Meknes -> Volubilis -> Moulay Idriss -> Chefchaouen ·
// D3 Akchour in the Rif, back to Chefchaouen · D4 Chefchaouen -> Tangier (Kasbah, medina, Grand + Petit Socco, Cap Spartel, Caves of Hercules)
// -> Tangier airport, ferry port, train station or hotel.
// Facts reused from our rebuilt tours: Volubilis 70–100 MAD, Bou Inania ~20, Al-Attarine ~20, Caves of Hercules small fee; Tarifa ferries leave from
// the Tangier city port, Algeciras ferries from Tanger Med (10-day Marrakech -> Tangier page). Hotels = the same picks as the other tours.
// OSRM: mt7 Fes -> Volubilis -> Chefchaouen ~265 km · ft4-d3 Chefchaouen -> Akchour 29 km ~35 min · m7t-d7 Chefchaouen -> Tetouan -> Tangier ~125 km.
// Derived from build-fc3.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/4-day-fes-to-tangier-via-chefchaouen.html';
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

const URL = 'https://moroccotourshub.com/tours/4-day-fes-to-tangier-via-chefchaouen.html';
const NAME = '4-Day Fes to Tangier via Chefchaouen';
const TITLE = '4-Day Fes to Tangier Tour via Chefchaouen | Private';
const DESC = 'Private 4-day tour from Fes to Tangier: a guided day in the Fes medina, Meknes, Volubilis and Moulay Idriss, two nights in blue Chefchaouen with a day at the Akchour waterfalls, then Tangier and Cap Spartel.';
const HERO = 'chefchaouen-blue-hour.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Fes to Tangier tour, Fes to Chefchaouen, Chefchaouen to Tangier, Akchour waterfalls, Volubilis, Meknes, northern Morocco tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Fes: a guided day in the medina', p: 'Your driver-guide and a local Fes guide meet you at your riad in the morning for Fes el-Bali: the Bou Inania Madrasa, the Nejjarine fountain, the Al Quaraouiyine quarter, the Chouara tanneries from a rooftop, and after lunch the Mellah and a viewpoint over the old city. No shop stops unless you ask.', meta: m('Day on foot in the medina', 'Night: Fes riad', 'Breakfast from day 2') },
  { t: 'Fes → Meknes → Volubilis → Moulay Idriss → Chefchaouen', p: 'West to Meknes for the great Bab Mansour gate, then the Roman city of Volubilis with its columns and floor mosaics, and a walk in Moulay Idriss, the holy town on its hills. North through the Rif to Chefchaouen by late afternoon, for a first stroll in the blue lanes.', meta: m('About 265 km, about 5 hours on the road', 'Night: Chefchaouen', 'Breakfast') },
  { t: 'Akchour and the Rif Mountains', p: 'Half an hour into the mountains to Akchour, where a river path leads through a green gorge to turquoise pools and waterfalls. Walk as far as you like, or rest by the water. Back in Chefchaouen in the afternoon for the Outa el-Hammam square and the sunset from the Spanish Mosque.', meta: m('About 60 km there and back', 'Night: Chefchaouen', 'Breakfast') },
  { t: 'Chefchaouen → Tangier', p: 'Through the Rif to Tangier: the Kasbah and the medina, the Grand and Petit Socco, then out to Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules. The tour ends at Tangier airport, the ferry port, the train station or your hotel.', meta: [['car', 'About 125 km to Tangier, plus Cap Spartel'], ['flag', 'Ends in Tangier: airport, port, station or hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The blue town of Chefchaouen at dusk under the Rif Mountains" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>4-Day Fes to Tangier via Chefchaouen</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>4-Day Fes to Tangier via Chefchaouen<span class="script">The North, from the Medina to the Strait</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Fes$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Fes → Tangier</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>4 days / 3 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Four days across the north of Morocco, from the old medina of Fes to the Strait of Gibraltar. A guided day in Fes el-Bali, then the imperial gate of Meknes, the Roman ruins of Volubilis and holy Moulay Idriss on the way up into the Rif Mountains.</p>
          <p class="dt-lead">Two nights in Chefchaouen, the blue town, with a day at the river pools and waterfalls of Akchour, then Tangier, its Kasbah and Cap Spartel, where two seas meet. The tour ends at the airport, the ferry or the train, wherever your journey goes next.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Chefchaouen</dt><dd>2 nights, with Akchour</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Fes → Tangier$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Fes medina with a local guide',
  'Bab Mansour in Meknes',
  'The Roman mosaics of Volubilis',
  'Two nights in blue Chefchaouen',
  'The river pools of Akchour',
  'Sunset from the Spanish Mosque',
  'The Kasbah of Tangier',
  'Cap Spartel, where two seas meet',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['fes-guide.jpg', 'Walking the Fes medina with a local guide'],
  ['fes.jpg', 'A carved doorway in Fes'],
  ['chefchaouen-blue-steps.jpg', 'Blue steps in the Chefchaouen medina'],
  ['chefchaouen-city.webp', 'Chefchaouen under the Rif Mountains'],
  ['tangier.jpg', 'The white city of Tangier by the sea'],
  ['tangier-cap-spartel-lighthouse.jpg', 'The lighthouse at Cap Spartel'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in the Fes medina',
  'Pick-up at your Fes riad or hotel',
  'Drop-off at Tangier airport, port, station or hotel',
  '3 nights as in the table below',
  '3 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights, ferries and trains', 'Lunches, dinners and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Akchour: river shoes help, the path crosses water',
  'Cover shoulders and knees in the madrasas',
  'Tanneries smell strong: you get a sprig of mint',
  'Taking the ferry on day 4? Tell us the port and time',
  'Medina riads: a porter carries your bags from the gate',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bou Inania Madrasa:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Caves of Hercules:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Fes to Tangier by Volubilis and Chefchaouen, about 500 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Tangier,Morocco&amp;waypoints=Meknes,Morocco%7CVolubilis,Morocco%7CChefchaouen,Morocco%7CAkchour,Morocco&amp;travelmode=driving"', 'mapnote');

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
            <tbody><tr><th scope="row">1: Fes</th>${cells(': Fes</th>')}</tr><tr><th scope="row">2–3: Chef&shy;chaouen</th>${cells('Chef&shy;chaouen</th>')}</tr></tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'riads in the old towns, a few steps from the sights.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers heading to Spain by ferry',
  'Walkers who want the Rif as well as the towns',
  'A slow look at the north in a few days',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Going back to Fes? The <a href="3-day-fes-chefchaouen-volubilis-tour.html">3-day tour</a> loops back to Fes',
  'Starting in Tangier? The <a href="5-day-tangier-chefchaouen-fes-tour.html">5-day tour</a> runs from Tangier to Fes',
  'Want the Sahara too? The <a href="5-day-fes-to-marrakech-desert-tour.html">5-day Fes to Marrakech tour</a> crosses to Merzouga',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ft4-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can you drop us at the ferry to Spain?', 'Yes. Ferries to Tarifa leave from the Tangier city port, a few minutes from the medina; ferries to Algeciras leave from Tanger Med, about an hour east. Tell us your ferry and we time the last day so you board without rushing.'],
  ['How hard is the walk at Akchour?', 'You choose. From the car park, a riverside path reaches the first pools in under an hour; the big waterfall and the natural rock arch called God’s Bridge take longer, with some scrambling. Your driver-guide knows the trails and you can turn back anytime.'],
  ['Why two nights in Chefchaouen?', 'One night is enough for the blue lanes; the second gives you a full day in the Rif at Akchour and two sunsets from the Spanish Mosque, without a long drive. It is the slow heart of this tour.'],
  ['Will the Fes guide take us to shops?', 'No shop stops unless you ask. The tanneries are seen from the terrace of a leather shop, which is free; the staff will show you their goods, but you never have to buy. Say no thanks and walk on.'],
  ['How long are the drives?', 'Day 2 is the longest, about 5 hours of driving split by Meknes, Volubilis and Moulay Idriss. Akchour is half an hour from Chefchaouen, and Chefchaouen to Tangier about 2.5 hours. Day 1 is on foot.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A night in Tangier before your ferry or flight',
  'Asilah, the white town on the Atlantic, on day 4',
  'An official site guide at Volubilis',
  'Start at Fes airport or the train station',
  'A longer hike in the Rif at Akchour',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%204-Day%20Fes%20to%20Tangier%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>4-Day Fes to Tangier</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 4-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ft4-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Walkers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Guided day in the Fes medina (night 1)', 'Meknes', 'Volubilis', 'Moulay Idriss', 'Chefchaouen (nights 2–3)', 'Akchour waterfalls', 'Tangier and Cap Spartel'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'camp', 'Imperial Cities', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'Marrakech']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
