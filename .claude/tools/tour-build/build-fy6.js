// Build tours/6-day-morocco-family-tour-marrakech-merzouga.html (URL kept): 6-day family tour, Marrakech round trip.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Marrakech -> Tichka -> Aït Ben Haddou -> Ouarzazate (night) · D2 Taourirt (optional) -> Skoura ->
// Valley of Roses -> Dades (night) · D3 Todra Gorge -> Erfoud -> Rissani -> Merzouga, sunset camel ride, camp · D4 Merzouga family day by 4×4
// (sunrise, Khamlia Gnawa music, nomad family, Dayet Srij lake in season; sandboarding/quad optional), night Merzouga hotel · D5 Rissani -> Erfoud ->
// Ziz Valley viewpoint, night Erfoud · D6 Erfoud -> Tinghir -> Ouarzazate -> Tichka -> Marrakech (OSRM ~510 km, ~9.5 h: the long day; said honestly in
// the meta line + FAQ, and a night in Ouarzazate offered in Make It Your Own).
// Facts from the old page + our rules: camel ride ~1 h, little ones ride with a parent or go to camp by 4×4; quad page ages (drivers 16+, passengers 8+,
// buggy from 5); child seats on request. Old page: dinners only at the camp.
// Erfoud hotels (new, WebSearch 2026-11-17, owner to confirm): Kasbah Tizimi (family-friendly, pool) / Kasbah Hotel Xaluca (Fodor's top choice, pool) /
// Palais Masandoïa (5-star, pool, spa). Other rows copied from finished pages: Ouarzazate (7-day Erg Chigaga & Merzouga), Dades, camp, Merzouga hotel
// (7-day Tangier -> Marrakech).
// Roads: mf7-d1 Marrakech -> Aït Ben Haddou · ag5-d2 Aït Ben Haddou -> Ouarzazate -> Skoura -> Dades · ag5-d3 Dades -> Todra -> Merzouga ·
// fy6-d5 Merzouga -> Rissani -> Erfoud -> Aoufous (Ziz) 91 km. Day 6 goes back on the same roads (drawn once).
// Derived from build-tm5.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/6-day-morocco-family-tour-marrakech-merzouga.html';
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

const URL = 'https://moroccotourshub.com/tours/6-day-morocco-family-tour-marrakech-merzouga.html';
const NAME = '6-Day Morocco Family Tour from Marrakech to Merzouga';
const TITLE = '6-Day Morocco Family Tour: Marrakech to Merzouga | Private';
const DESC = 'Private 6-day family tour from Marrakech: Aït Ben Haddou, the Dades Valley and the Todra Gorge, a sunset camel ride and a night in a Sahara camp, a family day around Merzouga by 4×4, the Ziz Valley and back to Marrakech.';
const HERO = 'merzouga-camel-ride-group.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco family tour, family desert tour Morocco, Marrakech to Merzouga with kids, Sahara camp with children, private family tour Morocco, Morocco family vacation">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Ouarzazate', p: 'Your driver-guide collects the family at your Marrakech riad or hotel in the morning and climbs into the High Atlas by the Tizi n’Tichka pass, with stops for the views and for little legs. Aït Ben Haddou, the earthen ksar on its hill, to walk up through the old village, then a short drive to your hotel in Ouarzazate.', meta: m('About 200 km, about 4.5 hours on the road', 'Night: Ouarzazate', 'Breakfast from day 2') },
  { t: 'Ouarzazate → Skoura → Valley of Roses → Dades', p: 'The Taourirt Kasbah in Ouarzazate if you like, then the palm oasis of Skoura and the Valley of Roses, stopping wherever the children want. An easy afternoon at your hotel in the Dades Valley, with time to rest or take a short walk.', meta: m('About 150 km, about 3 hours on the road', 'Night: Dades Valley', 'Breakfast') },
  { t: 'Dades → Todra Gorge → Merzouga', p: 'A short walk between the high red walls of the Todra Gorge, then east through Erfoud and Rissani to the dunes. In the late afternoon, a gentle camel ride of about an hour into the Erg Chebbi dunes for the sunset (little ones ride with a parent, or go to camp by 4×4), then dinner, drums and stars at the desert camp.', meta: m('About 270 km, about 5 hours on the road', 'Night: Desert camp', 'Breakfast and dinner') },
  { t: 'Merzouga: a family day in the desert', p: 'Sunrise over the dunes and a go at sandboarding, then a 4×4 day around Merzouga: Gnawa music in the village of Khamlia, tea with a nomad family, and the seasonal lake of Dayet Srij when it has water. Quad bikes can be added for older children. Back to your hotel in Merzouga.', meta: m('4×4 day around the dunes', 'Night: Merzouga hotel', 'Breakfast') },
  { t: 'Merzouga → Rissani → Erfoud → Ziz Valley', p: 'An easy day: the old caravan town of Rissani and its market, the fossils of Erfoud, and a viewpoint over the palm-filled gorge of the Ziz Valley. Afternoon free at your hotel in Erfoud, with time for the pool.', meta: m('About 90 km, an easy day on the road', 'Night: Erfoud', 'Breakfast') },
  { t: 'Erfoud → High Atlas → Marrakech', p: 'The long road home, west by Tinghir and Ouarzazate and back over the High Atlas, with as many stops as the family needs: breakfast early, lunch on the way, ice cream breaks. Back at your Marrakech riad or hotel in the evening.', meta: [['car', 'About 510 km, about 9.5 hours with stops'], ['flag', 'Ends at your Marrakech hotel or riad'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A family camel ride in the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>6-Day Family Tour</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>6-Day Morocco Family Tour to Merzouga<span class="script">The Sahara at a Family Pace</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>6 days / 5 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Six days from Marrakech to the Sahara, paced for families. Over the High Atlas to the kasbah of Aït Ben Haddou, through the palm oases of Skoura and the Dades Valley, and into the Todra Gorge, with short drives on the way out and a stop whenever the children need one.</p>
          <p class="dt-lead">Then the best part: a sunset camel ride and a night in a desert camp, and a whole family day in the dunes with sandboarding, music in Khamlia and tea with a nomad family. Your own vehicle and driver-guide, child seats on request, and a hotel with a pool in Erfoud for the last night out.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Families</dt><dd>Paced for children</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Over the High Atlas by Tizi n’Tichka',
  'The ksar of Aït Ben Haddou',
  'The red walls of the Todra Gorge',
  'A gentle camel ride at sunset',
  'A night in a desert camp',
  'Sandboarding at sunrise',
  'Gnawa music in Khamlia',
  'Tea with a nomad family',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah.jpg', 'The kasbah of Aït Ben Haddou'],
  ['dades-valley-green.jpg', 'The green Dades Valley'],
  ['todra-gorge-walk.jpg', 'Walking in the Todra Gorge'],
  ['sandboarding.jpg', 'Sandboarding down a dune'],
  ['khamlia-gnawa.jpg', 'Gnawa musicians in Khamlia'],
  ['desert-camp-dunes.jpg', 'A desert camp in the dunes'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your Marrakech hotel',
  '5 nights as in the table below',
  '5 breakfasts and 1 dinner at the camp',
  'Camel ride and sandboarding',
  '4×4 family day around Merzouga',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, other dinners', 'Entrance fees', 'Quad bikes', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Child seats on request: tell us the children’s ages',
  'Day 6 is long: we stop as often as the family needs',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Desert nights are cold in winter: bring warm layers',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah:</b> small fee, if you go in',
  '<b>Quad bikes in Merzouga:</b> priced before you ride, if you want them',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Merzouga and back, about 1,400 km in 6 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7COuarzazate,Morocco%7CBoumalne+Dades,Morocco%7CTinghir,Morocco%7CMerzouga,Morocco%7CErfoud,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations ----------
function cellsFrom(file, label) {
  const SRC = fs.readFileSync(root + 'tours/' + file, 'utf8');
  const i = SRC.indexOf(label); if (i < 0) throw new Error('row ' + label);
  const row = SRC.slice(i, SRC.indexOf('</tr>', i));
  const tds = row.match(/<td>[\s\S]*?<\/td>/g); if (!tds || tds.length < 3) throw new Error('cells ' + label);
  return tds.slice(0, 3).join('');
}
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const B = (q, n) => A('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(q), n);
const T7 = '7-day-morocco-tour-tangier-to-marrakech.html', EC = '7-day-marrakech-erg-chigaga-merzouga-tour.html';
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody><tr><th scope="row">1: Ouarzazate</th>${cellsFrom(EC, ': Ouarzazate</th>')}</tr><tr><th scope="row">2: Dades Valley</th>${cellsFrom(T7, ': Dades Valley</th>')}</tr><tr><th scope="row">3: Desert camp</th>${cellsFrom(T7, ': Desert camp</th>')}</tr><tr><th scope="row">4: Merzouga</th>${cellsFrom(T7, ': Merzouga</th>')}</tr><tr><th scope="row">5: Erfoud</th><td>${B('Kasbah Tizimi Erfoud', 'Kasbah Tizimi')}</td><td>${B('Kasbah Hotel Xaluca Erfoud', 'Kasbah Xaluca')}</td><td>${B('Palais Masandoia Erfoud', 'Palais Masandoïa')}</td></tr></tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'family-friendly hotels and a desert camp under the stars.', 'acc intro');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Families with children of almost any age',
  'Grandparents travelling with grandchildren',
  'Parents who want the Sahara without rushing',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 3 days? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> keeps the camp night',
  'Would rather not drive far with kids? The <a href="6-day-marrakech-surroundings-tour.html">6-day tour</a> stays in one Marrakech riad',
  'Just want a taste of the desert? Our <a href="agafay-desert-camel-ride-dinner-show.html">Agafay camel ride and dinner</a> is 40 minutes away',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'fy6-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is this tour suitable for young children?', 'Yes. It is private and paced for families, with stops whenever the children need them, a pool at the Erfoud hotels and child seats on request. The drives are short on the way out; day 6 is the long one, and we break it up with plenty of stops.'],
  ['Can small children ride the camels?', 'Yes. The camels walk slowly and a camel guide leads them; little ones ride with a parent. If a child is unsure, part of the family can go to the camp by 4×4 and meet the others there.'],
  ['Is the desert camp safe and comfortable for kids?', 'Yes. You sleep in a private tent with real beds and blankets, with dinner, music around the fire and the stars. Nights are cold in winter, so pack warm layers, and tell us if you want a camp with a private bathroom in the tent.'],
  ['Can children try quad biking?', 'Quad bikes can be added in Merzouga for older children: drivers from 16, passengers from about 8, and buggies for younger kids with a parent. Helmets and a guide are provided, and the price is agreed before you ride.'],
  ['Is the last day too long for children?', 'It is about 510 km and 9 to 10 hours with stops, the only long day. If you prefer, we can add a night in Ouarzazate and split the drive in two; tell us when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A night in Ouarzazate to split the drive home',
  'Upgrade to a luxury camp with a bathroom in the tent',
  'Quad bikes or buggies in the Merzouga dunes',
  'A family room or connecting rooms in every hotel',
  'A <a href="marrakech-cooking-class.html">family cooking class</a> back in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%206-Day%20Morocco%20Family%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>6-Day Family Tour</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 6-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'fy6-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Families', 'Families with children', 'Grandparents'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka and Aït Ben Haddou', 'Ouarzazate (night 1)', 'Skoura and the Valley of Roses', 'Dades Valley (night 2)', 'Todra Gorge', 'Merzouga desert camp (night 3)', 'Family day around Merzouga (night 4)', 'Rissani, Erfoud and the Ziz Valley (night 5)', 'Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Imperial Cities', 'Rabat', 'Volubilis', 'Meknes', 'Fes', 'Chefchaouen']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
