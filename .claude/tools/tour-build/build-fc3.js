// Build tours/3-day-fes-chefchaouen-volubilis-tour.html (URL kept): 3-day Fes round trip.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Fes -> Rif -> Chefchaouen (night) · D2 Chefchaouen -> Volubilis -> Moulay Idriss -> Meknes -> Fes (night)
// · D3 guided day in the Fes medina, ends in Fes. Facts reused from our rebuilt tours: Volubilis 70–100 MAD (sources disagree), Bou Inania ~20 MAD,
// Al-Attarine ~20 MAD; Chouara tanneries seen from leather-shop terraces; Chefchaouen + Fes hotels = the same picks as the other tours.
// OSRM: fc3-d1 Fes -> Chefchaouen 195 km ~3.9 h (Rif road) · tg3 Chefchaouen -> Volubilis -> Meknes -> Fes ~260 km.
// Derived from build-me3.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/3-day-fes-chefchaouen-volubilis-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/3-day-fes-chefchaouen-volubilis-tour.html';
const NAME = '3-Day Fes, Chefchaouen & Volubilis Tour';
const TITLE = '3-Day Fes, Chefchaouen & Volubilis Tour | Private';
const DESC = 'Private 3-day tour from Fes: a night in the blue town of Chefchaouen, the Roman ruins of Volubilis, holy Moulay Idriss and imperial Meknes, then a guided day in the Fes medina.';
const HERO = 'chefchaouen-blue-steps.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="3 day tour from Fes, Fes to Chefchaouen, Chefchaouen overnight, Volubilis, Moulay Idriss, Meknes, Fes medina guided tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Fes → the Rif Mountains → Chefchaouen', p: 'Your driver-guide collects you at your riad or hotel in Fes in the morning and heads north into the green hills of the Rif. In Chefchaouen by early afternoon: the blue lanes of the medina, the Outa el-Hammam square under the kasbah, and the walk up to the Spanish Mosque for the sunset over the blue town.', meta: m('About 200 km, about 4 hours on the road', 'Night: Chefchaouen', 'Breakfast from day 2') },
  { t: 'Chefchaouen → Volubilis → Moulay Idriss → Meknes → Fes', p: 'An early walk in the quiet blue streets, then south to Volubilis, the Roman city with its triumphal arch, columns and floor mosaics. A view over Moulay Idriss, the holy town on its two hills, then Meknes for the great Bab Mansour gate and lunch, and on to Fes in the late afternoon.', meta: m('About 260 km, about 4.5 hours on the road', 'Night: Fes riad', 'Breakfast') },
  { t: 'Fes: a guided day in the medina', p: 'With a local Fes guide in Fes el-Bali, the old walled city: Bab Bou Jeloud, the Bou Inania and Al-Attarine madrasas, the Nejjarine fountain, the coppersmiths’ square, the Chouara tanneries from a rooftop, and the Mellah. No shop stops unless you ask. The tour ends at your riad, the train station or Fes airport.', meta: [['car', 'Day on foot in the medina'], ['flag', 'Ends in Fes: riad, station or airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue-washed steps in the medina of Chefchaouen" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>3-Day Fes, Chefchaouen &amp; Volubilis</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>3-Day Fes, Chefchaouen &amp; Volubilis Tour<span class="script">The Blue Town and the Roman North</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Fes$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Fes round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>3 days / 2 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Three days from Fes through the best of the north. Up into the Rif Mountains to Chefchaouen, the blue town, with a night there so you have the lanes to yourself at sunset and in the early morning, then back south by the Roman ruins of Volubilis, holy Moulay Idriss and the imperial city of Meknes.</p>
          <p class="dt-lead">On the last day a local guide takes you through Fes el-Bali, one of the largest car-free medieval towns in the world: madrasas, fountains, the coppersmiths and the tanneries. Your own vehicle and driver-guide from your Fes riad and back.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Fes medina</dt><dd>Guided day included</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Fes round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'A night in blue Chefchaouen',
  'Sunset from the Spanish Mosque',
  'The green hills of the Rif',
  'The Roman mosaics of Volubilis',
  'Holy Moulay Idriss on its hills',
  'Bab Mansour in Meknes',
  'The Fes medina with a local guide',
  'The Chouara tanneries from a rooftop',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-chefchaouen-blue.jpg', 'Blue lanes of Chefchaouen'],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour'],
  ['fes-royal-palace-gates.jpg', 'The golden gates of the royal palace in Fes'],
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes'],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina'],
  ['fes-medina.jpg', 'The rooftops of the Fes medina'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in the Fes medina',
  'Pick-up and drop-off at your Fes riad or hotel',
  '2 nights as in the table below',
  '2 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights and trains', 'Lunches, dinners and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Chefchaouen and Fes are hilly: wear good shoes',
  'Cover shoulders and knees in the madrasas',
  'Tanneries smell strong: you get a sprig of mint',
  'Medina riads: a porter carries your bags from the gate',
  'Volubilis has little shade: bring a hat and water',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa:</b> about 20 MAD; <b>Al-Attarine:</b> about 20 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Fes to Chefchaouen and back by Volubilis and Meknes, about 460 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Chefchaouen,Morocco%7CVolubilis,Morocco%7CMoulay+Idriss,Morocco%7CMeknes,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same places as the other tours, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const SRC = fs.readFileSync(root + 'tours/10-day-morocco-tour-marrakech-to-tangier.html', 'utf8');
function cells(label) { // copy a hotel row (3 linked cells) from a finished tour page, by its row label
  const i = SRC.indexOf(label); if (i < 0) throw new Error('row ' + label);
  const row = SRC.slice(i, SRC.indexOf('</tr>', i));
  const tds = row.match(/<td>[\s\S]*?<\/td>/g); if (!tds || tds.length < 3) throw new Error('cells ' + label);
  return tds.slice(0, 3).join('');
}
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody><tr><th scope="row">1: Chef&shy;chaouen</th>${cells('Chef&shy;chaouen')}</tr><tr><th scope="row">2: Fes</th>${cells(': Fes</th>')}</tr></tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'riads in the old towns, a few steps from the sights.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with a few days in Fes',
  'Photographers who want Chefchaouen at dawn',
  'History lovers: Romans, sultans and saints',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Going on to Tangier? The <a href="4-day-fes-to-tangier-via-chefchaouen.html">4-day Fes to Tangier tour</a> ends by the ferry',
  'Starting in Tangier? Take the <a href="5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen and Fes tour</a>',
  'Want the Sahara too? The <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a> goes to Merzouga and back',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'fc3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is one night in Chefchaouen enough?', 'For most travellers, yes: you arrive by early afternoon, see the sunset from the Spanish Mosque and walk the empty lanes the next morning before the day visitors come. If you love hiking or photography, add a second night for the Akchour waterfalls.'],
  ['Will the Fes guide take us to shops?', 'No shop stops unless you ask. The tanneries are seen from the terrace of a leather shop, which is free; the staff will show you their goods, but you never have to buy. Say no thanks and walk on.'],
  ['Do we need a guide at Volubilis?', 'Your driver-guide explains the site, and the paths are easy to follow. Official site guides wait at the entrance if you want a deeper visit; we can book one for you, paid on the spot.'],
  ['Can you pick us up at a riad inside the Fes medina?', 'Yes. Cars can’t enter the old medina, so we meet you at the nearest gate and a porter carries your bags. Ask your riad to walk you there; it is usually a few minutes away.'],
  ['How long are the drives?', 'About 4 hours from Fes to Chefchaouen on the Rif road, with a coffee stop, and about 4.5 hours of driving on day 2, split by Volubilis, Moulay Idriss and lunch in Meknes. Day 3 is on foot.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in Chefchaouen',
  'The Akchour waterfalls hike from Chefchaouen',
  'An official site guide at Volubilis',
  'An extra free day in Fes',
  'Start or end at Fes airport or the train station',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%203-Day%20Fes%2C%20Chefchaouen%20and%20Volubilis%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>3-Day Fes &amp; Chefchaouen</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 3-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'fc3-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Rif Mountains', 'Chefchaouen (night 1)', 'Volubilis', 'Moulay Idriss', 'Meknes', 'Fes (night 2)', 'Guided day in the Fes medina'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'camp', 'Imperial Cities', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'Marrakech']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
