// Build tours/6-day-morocco-tour-agadir-essaouira-marrakech.html (URL kept): 6-day Agadir airport -> Marrakech by the coast.
// Agadir airport -> Agadir Oufella -> Taghazout x2 (n1-2, Paradise Valley morning) -> Imsouane -> Essaouira (n3) -> Marrakech x2 (n4-5, guided day) -> Marrakech airport.
// Derived from build-cc7.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17, WebSearch; OpenSEO out of credits): no private 5–6 day Agadir -> Essaouira -> Marrakech tour on page 1. Closest: TourRadar 6-day
// (hiking around Taghazout, Taghazout -> Essaouira, Essaouira -> Marrakech on day 5, guided Marrakech day), a 7-day private from Agadir (Essaouira night,
// Marrakech day 5, "2.5-hour journey"), G Adventures group "Moroccan Coast Explorer" 5 days from US$439. Agadir airport -> Taghazout ~45–50 km,
// 40–65 min (transfer sites). Old page: 2 nights in Agadir (arrival + Agadir day), 1 Essaouira, 2 Marrakech with a guided walk, airport day 6.
// Expert choices: Taghazout instead of Agadir for the 2 beach nights (Agadir Oufella seen on the way from the airport), Paradise Valley morning,
// Imsouane lunch stop on the coast road to Essaouira, Marrakech guided day kept. Reviews: Maria G. (first use), Aisha K., James T.
// OSRM: ag6-d1 airport-Oufella-Taghazout 57 km 1.2 h · cc7-d5 Taghazout-Paradise Valley 34 km · a18-d5 Taghazout-Imsouane-Essaouira 169 km 3.0 h ·
// essaouira (Marrakech-Essaouira) ~180 km 3 h.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/6-day-morocco-tour-agadir-essaouira-marrakech.html';
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

const URL = 'https://moroccotourshub.com/tours/6-day-morocco-tour-agadir-essaouira-marrakech.html';
const NAME = '6-Day Morocco Tour from Agadir to Marrakech via Essaouira';
const TITLE = '6-Day Agadir to Marrakech Tour via Essaouira | Private';
const DESC = 'Private 6-day tour from Agadir airport to Marrakech: two nights in the surf village of Taghazout with Paradise Valley, the coast road by Imsouane to Essaouira, and two nights in Marrakech with a guided day in the medina.';
const HERO = 'essaouira-skala-port.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="6 day Morocco tour, Agadir to Marrakech, Agadir to Essaouira, Taghazout, Paradise Valley, Imsouane, Essaouira, Marrakech guided tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Agadir airport → Agadir Oufella → Taghazout', p: 'Your driver-guide meets you at Agadir airport with your name on a sign, at whatever hour you land. In daylight, a stop on the Agadir Oufella hill for the view over the bay, then up the coast to your hotel in Taghazout, the surf village, for a first evening by the sea.', meta: m('About 60 km, about 1 hour on the road', 'Night: Taghazout', 'Breakfast from day 2') },
  { t: 'Taghazout: Paradise Valley and the bay', p: 'An early drive into the hills to Paradise Valley, a palm gorge with turquoise rock pools for a swim before the heat. The afternoon back in Taghazout at your pace: a first surf lesson in the bay, the cliff path to the next beach or a café on the sand.', meta: m('About 70 km there and back', 'Night: Taghazout', 'Breakfast') },
  { t: 'Taghazout → Imsouane → Essaouira', p: 'North on the coast road through argan hills to Imsouane, a fishing village with one of Africa’s longest waves, for a fish lunch by the bay. In Essaouira by mid-afternoon: the white and blue medina, the ramparts of the Skala and the blue boats of the port at sunset.', meta: m('About 170 km, about 3 hours on the road', 'Night: Essaouira', 'Breakfast') },
  { t: 'Essaouira → Marrakech', p: 'A slow morning in Essaouira: the old Mellah, the woodworkers under the ramparts, a coffee by the port. Then inland across the argan plains to Marrakech, in time for your first evening on Jemaa el-Fnaa as the food stalls light up.', meta: m('About 180 km, about 3 hours on the road', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Marrakech: a guided day in the medina', p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Saadian Tombs, the souks and the Ben Youssef Madrasa, with no shop stops unless you ask. The afternoon is free for the Majorelle Garden, a hammam or a rooftop café.', meta: m('Day on foot in the medina', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Marrakech → the airport', p: 'A free morning for a last walk in the souks, then your driver-guide takes you to Marrakech airport, or to a hotel in the city, at the time of your flight.', meta: [['car', 'Riad to Marrakech airport, about 20 minutes'], ['flag', 'Ends at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue fishing boats in the port of Essaouira on the Atlantic" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>6-Day Agadir to Marrakech via Essaouira</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>6-Day Morocco Tour from Agadir to Marrakech<span class="script">The Beach, Essaouira and the Red City</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Agadir$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Agadir → Marrakech</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>6 days / 5 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Six days from the beaches of the south to the souks of Marrakech, for travellers who land in Agadir. Two nights in Taghazout, the surf village up the coast, with a morning swim in the rock pools of Paradise Valley, then the coast road by Imsouane to Essaouira’s white and blue medina.</p>
          <p class="dt-lead">Two nights in Marrakech to finish, with a local guide for the palaces, tombs and souks of the medina and a free afternoon of your own. Your own vehicle and driver-guide from the arrivals hall to your flight home, with short drives and stops wherever you like.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Marrakech</dt><dd>Guided day included</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Agadir → Marrakech$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Two nights in the surf village of Taghazout',
  'The rock pools of Paradise Valley',
  'The view from Agadir Oufella',
  'A fish lunch in Imsouane',
  'The ramparts and blue boats of Essaouira',
  'Jemaa el-Fnaa as the stalls light up',
  'The painted ceilings of the Bahia Palace',
  'The souks with a local guide',
  'Met at Agadir airport, any hour',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery (placeholder: no Taghazout, Paradise Valley, Imsouane or Agadir photos in assets yet) ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira', 1080, 1350],
  ['jemaa-el-fna-evening-aerial.jpg', 'Jemaa el-Fnaa in the evening', 1600, 1066],
  ['bahia-palace-courtyard.jpg', 'The courtyard of the Bahia Palace', 1000, 1500],
  ['marrakech-spice-shop.jpg', 'A spice shop in the Marrakech souks', 1600, 1066],
  ['majorelle-garden-blue-villa.jpg', 'The blue villa of the Majorelle Garden', 1600, 1200],
  ['saadian-tombs-interior.jpg', 'Inside the Saadian Tombs', 1000, 1500],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Agadir and Marrakech airport transfers',
  'Local guide in Marrakech',
  '5 nights as in the table below',
  '5 breakfasts',
  'Paradise Valley by car',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, dinners and drinks', 'Entrance fees', 'Surf lessons', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Late flight? We meet it, at any hour',
  'The ocean wind is cool: bring a layer',
  'Strong currents: swim in the sheltered bays',
  'Paradise Valley pools are lower after a dry summer',
  'Medina riads: a porter carries your bags from the gate',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Skala du Port, Essaouira:</b> small fee',
  '<b>Bahia Palace:</b> 100 MAD; <b>Saadian Tombs:</b> 100 MAD',
  '<b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Majorelle Garden:</b> about 170 MAD, if you go',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Agadir to Marrakech by the Atlantic coast, about 500 km in 6 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Agadir+Airport,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Taghazout,Morocco%7CImsouane,Morocco%7CEssaouira,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per stop; same places as the other coast tours, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const B = (q, n) => A('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(q), n);
const tag = [B('World of Waves Surf House Taghazout', 'World of Waves Surf House'), B('Radisson Blu Resort Taghazout Bay Surf Village', 'Radisson Blu Surf Village'), B('Fairmont Taghazout Bay', 'Fairmont Taghazout Bay')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const row = (n, r) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`;
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${row('1–2: Taghazout', tag)}${row('3: Essaouira', ess)}${row('4–5: Marra&shy;kech', mar)}</tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from surf lodges and beach hotels to riads in the old towns.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers landing in Agadir and flying home from Marrakech',
  'A first trip: beach, old town and big city in one week',
  'Families and couples who like short drives',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want two nights in Essaouira? The <a href="7-day-coastal-morocco-tour-from-marrakech.html">7-day coastal tour</a> gives it two, from Marrakech',
  'Want the Sahara too? The <a href="4-day-desert-tour-agadir-merzouga-marrakech.html">4-day Agadir desert tour</a> crosses to Merzouga, ending in Marrakech',
  'Starting in Marrakech? The <a href="4-day-marrakech-essaouira-agadir-tour.html">4-day tour</a> runs the other way, to Agadir',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ag6-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can we stay in Agadir instead of Taghazout?', 'Yes. Agadir has the long sandy beach, big hotels and the promenade; Taghazout is a small surf village 20 minutes up the coast, with more charm and Paradise Valley closer by. Tell us which you prefer and we book the first two nights there.'],
  ['What if our flight lands late at night?', 'Your driver-guide follows your flight and waits in the arrivals hall with your name on a sign, at any hour, at no extra cost. On a late arrival we drive straight to the hotel and keep Agadir Oufella for another time.'],
  ['How long are the drives?', 'Short: about an hour from the airport to Taghazout, about 3 hours on the coast road to Essaouira with a lunch stop in Imsouane, and about 3 hours from Essaouira to Marrakech. Day 2 and day 5 have almost no driving.'],
  ['Will the Marrakech guide take us to shops?', 'No. Your local guide shows you the monuments and the souks and explains what you see, but never takes you into a shop unless you ask. If you want carpets or argan oil, tell the guide and they will show you honest places.'],
  ['We fly home early on day 6. Is that a problem?', 'No. We leave your riad at the time your flight needs; Marrakech airport is about 20 minutes away. With an afternoon flight you have the morning free for a last walk in the souks.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A surf lesson in Taghazout',
  'A second night in Essaouira',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'A <a href="agafay-desert-camel-ride-dinner-show.html">camel ride and dinner</a> in the Agafay desert',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%206-Day%20Agadir%20to%20Marrakech%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>6-Day Agadir to Marrakech</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 6-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ag6-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Agadir airport and Agadir Oufella', 'Taghazout and Paradise Valley (nights 1–2)', 'Imsouane', 'Essaouira (night 3)', 'Marrakech with a guided day (nights 4–5)', 'Marrakech airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Fes', 'camp', 'Imperial', 'Volubilis', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'desert camp']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
