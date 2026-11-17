// Build tours/6-day-marrakech-surroundings-tour.html (URL kept): 6 days from ONE Marrakech riad, a day out each day.
// ORIGINAL ROUTE KEPT (owner, 2026-11-17: modify existing tours, don't invent new routes): D1 arrival · D2 guided Marrakech · D3 Ourika Valley ·
// D4 Ouzoud Waterfalls · D5 Tichka, Aït Ben Haddou, Ouarzazate · D6 departure. Facts (times, drives, costs) taken from our rebuilt day-trip pages
// (Ourika 09:00 back ~17:30, 1–1.5 h; Ouzoud 08:00 back ~18:00, 2.5–3 h each way, boat ~25 MAD; Aït Ben Haddou 07:30 back ~19:30, 3.5 h each way
// over a 2,260 m pass, Atlas Film Studios ~80 MAD or Taourirt small fee) so the package says the same thing as the separate day trips.
// Derived from build-me3.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
// Roads (saved by the day-trip maps): ourika, ouzoud, abh.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/6-day-marrakech-surroundings-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/6-day-marrakech-surroundings-tour.html';
const NAME = '6-Day Marrakech & Surroundings Tour';
const TITLE = '6-Day Marrakech Tour | Atlas, Ouzoud & Aït Ben Haddou';
const DESC = 'Private 6-day tour based in one Marrakech riad: a guided day in the medina, then day trips to the Ourika Valley in the High Atlas, the Ouzoud Waterfalls and the kasbah of Aït Ben Haddou, with airport transfers.';
const HERO = 'ait-ben-haddou-village.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="6 day Marrakech tour, Marrakech and surroundings, day trips from Marrakech, Ourika Valley, Ouzoud Waterfalls, Ait Ben Haddou, Atlas Mountains, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Arrival in Marrakech', p: 'Your driver-guide meets you at Marrakech airport with your name on a sign, at whatever hour you land, and takes you to your riad. If you arrive early, a first walk to Jemaa el-Fnaa as the food stalls light up; otherwise the evening is yours to settle in.', meta: m('Airport to your riad, about 20 minutes', 'Night: Marrakech riad', 'Breakfast from day 2') },
  { t: 'Marrakech: a guided day in the medina', p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the old Mellah, the souks and a garden, with no shop stops unless you ask. The Majorelle Garden can be added in the afternoon.', meta: m('Day on foot in the medina', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Ourika Valley in the High Atlas', p: 'Into the mountains by 09:00, along the river through Berber villages, then a guided walk up to the first waterfalls of Setti Fatma, with mint tea in a Berber house and lunch by the water. Back at your riad around 17:30.', meta: m('About 130 km there and back', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Ouzoud Waterfalls', p: 'An 08:00 start for one of the highest waterfalls in Morocco, through olive groves in the Middle Atlas foothills. A local guide walks you down to the foot of the falls, past the Barbary macaques, with lunch facing the water and a boat ride if you like. Back around 18:00.', meta: m('About 300 km there and back', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Aït Ben Haddou and Ouarzazate', p: 'The big day out: over the High Atlas by the Tizi n’Tichka pass at 2,260 m to Aït Ben Haddou, about two hours in the old ksar with a local guide, up to the granary at the top. Lunch facing the kasbah, then Ouarzazate for the film studios or the Taourirt Kasbah. Back around 19:30.', meta: m('About 380 km there and back', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Free morning and departure', p: 'A slow last morning for the souks or a coffee on a rooftop, then your driver-guide takes you to Marrakech airport, or anywhere in the city, at the time of your flight.', meta: [['car', 'Riad to Marrakech airport, about 20 minutes'], ['flag', 'Ends at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The earthen ksar of Aït Ben Haddou above the river" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>6-Day Marrakech &amp; Surroundings</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>6-Day Marrakech &amp; Surroundings Tour<span class="script">One Riad, Four Great Days Out</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>6 days / 5 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Six days in and around Marrakech without ever packing a bag. You stay in the same riad all week: a day in the medina with a local guide, then a different world each day, from the green Ourika Valley in the High Atlas to the Ouzoud Waterfalls and the kasbah of Aït Ben Haddou.</p>
          <p class="dt-lead">Each evening you are back in the Red City for dinner, with your own vehicle and driver-guide every day and a local guide at each site. Swap any day out for another trip, or keep it free.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Hotel</dt><dd>One riad, no packing</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Marrakech medina with a local guide',
  'The painted ceilings of the Bahia Palace',
  'Berber villages of the Ourika Valley',
  'The Setti Fatma waterfalls',
  'The Ouzoud Waterfalls',
  'The Tizi n’Tichka pass, 2,260 m',
  'The ksar of Aït Ben Haddou',
  'The film town of Ouarzazate',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['bahia-palace-courtyard.jpg', 'The courtyard of the Bahia Palace'],
  ['atlas-berber-village.jpg', 'A Berber village in the High Atlas'],
  ['ouzoud-cascade.jpg', 'The Ouzoud Waterfalls'],
  ['ouzoud-terrace.jpg', 'Lunch on a terrace facing the falls'],
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through Aït Ben Haddou'],
  ['ouarzazate-taourirt.jpg', 'The Taourirt Kasbah in Ouarzazate'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Marrakech and on each day out',
  'Marrakech airport transfers',
  '5 nights in one Marrakech riad',
  '5 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, dinners and drinks', 'Entrance fees', 'Boat ride at Ouzoud', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Want a rest day? Swap any day out for a free day',
  'Ourika and Ouzoud: good shoes for wet rocks and steps',
  'Ouzoud: don’t feed the macaques',
  'Day 5 is long: we stop whenever you want',
  'Medina riads: a porter carries your bags from the gate',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace:</b> 100 MAD',
  '<b>Boat ride at Ouzoud:</b> about 25 MAD, if you take it',
  '<b>Atlas Film Studios:</b> about 80 MAD; or <b>Taourirt Kasbah:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Day trips from one Marrakech riad, about 800 km in 6 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Setti+Fatma,Morocco%7COuzoud+Waterfalls,Morocco%7CAit+Ben+Haddou,Morocco%7COuarzazate,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same Marrakech riads as the other tours, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody><tr><th scope="row">1–5: Marra&shy;kech</th><td>${mar[0]}</td><td>${mar[1]}</td><td>${mar[2]}</td></tr></tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'one riad in the medina for the whole week.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer a hotel with a big pool outside the medina? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Families who don’t want to pack every day',
  'First-timers: city, mountains and waterfalls in a week',
  'Travellers who like coming home to the same riad',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Dreaming of the dunes? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> adds a night in the Sahara',
  'Only a day or two free? Pick from our <a href="../day-trips.html">day trips from Marrakech</a>',
  'Want the sea too? The <a href="3-day-marrakech-essaouira-tour.html">3-day tour</a> adds a night in Essaouira',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ms6-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why stay in one hotel all week?', 'No packing, no check-ins, and the same room every night: easier with children and more restful for everyone. Most of the best places around Marrakech are an easy day out, so you lose nothing by coming back each evening.'],
  ['Can we change the day trips?', 'Yes. Swap any day for another <a href="../day-trips.html">day trip</a>, such as Essaouira, the Agafay desert or Imlil, or keep a day free for the pool and the souks. Tell us when you book and we send you the new plan.'],
  ['Is the Aït Ben Haddou day too long?', 'It is the longest: about 3.5 hours each way over the High Atlas, out at 07:30 and back around 19:30, with stops whenever you like. If that is too much, we can drop Ouarzazate, or you can sleep a night at Aït Ben Haddou.'],
  ['How hard are the walks at Ourika and Ouzoud?', 'At Ourika the path to the first waterfalls takes 30–40 minutes over wet rocks; at Ouzoud a stepped path leads down to the falls and back up. Your local guide sets the pace, and you can stop at the viewpoints instead.'],
  ['Is this tour good with children?', 'Yes, it is the easiest way to see Morocco with children: one room, short days except day 5, rock pools and monkeys, and child seats on request. Tell us their ages and we adapt each day.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Swap a day for <a href="marrakech-to-essaouira-day-trip.html">Essaouira</a> or <a href="marrakech-agafay-desert-day-trip.html">Agafay</a>',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a>',
  'A <a href="agafay-desert-camel-ride-dinner-show.html">camel ride and dinner</a> in Agafay',
  'A <a href="marrakech-cooking-class.html">cooking class</a> or <a href="marrakech-hammam-experience.html">hammam</a>',
  'A night at Aït Ben Haddou on day 5',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%206-Day%20Marrakech%20and%20Surroundings%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>6-Day Marrakech &amp; Surroundings</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 6-day plan is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ms6-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Families', 'Couples', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Arrival in Marrakech', 'Guided day in the Marrakech medina', 'Ourika Valley and Setti Fatma', 'Ouzoud Waterfalls', 'Tizi n’Tichka, Aït Ben Haddou and Ouarzazate', 'Departure from Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const strip = t => t.replace(/<[^>]+>/g, '');
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Fes', 'camp', 'Imperial', 'Volubilis', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'desert camp', 'Taghazout']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
