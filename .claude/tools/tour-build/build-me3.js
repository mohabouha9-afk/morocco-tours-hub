// Build tours/3-day-marrakech-essaouira-tour.html (URL kept): 3-day Marrakech round trip with a night in Essaouira.
// Marrakech guided day (n1) -> Essaouira (n2, sunset + quiet morning) -> Marrakech hotel/riad or airport by mid-afternoon.
// Derived from build-me4.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
// Research: same coast research as build-cc7/ag6/me4 + our Essaouira day-trip research (.claude/research/essaouira-research.md: GetYourGuide main
// Essaouira day trip 4.3 / 5,200 reviews, its own summary "Long drives and limited hours in town"; ~5 h in town on a day trip). Old page = generic
// boilerplate (Day 1–2 Marrakech, Day 3 Essaouira, back to Marrakech). Expert choice: the overnight in Essaouira is the point of this tour
// (sunset on the ramparts, the port and medina in the quiet morning before the day-trip buses arrive), so day 1 = guided Marrakech,
// day 2 = drive + afternoon/sunset in Essaouira, day 3 = morning in Essaouira, back by mid-afternoon. Reviews: Aisha K., Maria G., Chloé D.
// Road: essaouira (Marrakech-Essaouira ~180 km, ~3 h), out and back.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/3-day-marrakech-essaouira-tour.html';
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
// image size lookup from pages that already use the image
const ALLPAGES = fs.readdirSync(root + 'tours').map(f => fs.readFileSync(root + 'tours/' + f, 'utf8')).join('');
function dims(f) { const mm = ALLPAGES.match(new RegExp(f.replace('.', '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }

const URL = 'https://moroccotourshub.com/tours/3-day-marrakech-essaouira-tour.html';
const NAME = '3-Day Marrakech & Essaouira Tour';
const TITLE = '3-Day Marrakech & Essaouira Tour | Private';
const DESC = 'Private 3-day tour from Marrakech: a guided day in the medina, then a night in Essaouira for the sunset on the ramparts and the quiet morning port, back in Marrakech by mid-afternoon.';
const HERO = 'essaouira-skala-port.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="3 day Marrakech Essaouira tour, Marrakech to Essaouira, night in Essaouira, Essaouira overnight trip, Marrakech guided tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech: a guided day in the medina', p: 'Your driver-guide meets you at your riad in the morning with a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Saadian Tombs, the souks and the Ben Youssef Madrasa, with no shop stops unless you ask. The evening on Jemaa el-Fnaa as the food stalls light up.', meta: m('Day on foot in the medina', 'Night: Marrakech riad', 'Breakfast from day 2') },
  { t: 'Marrakech → Essaouira', p: 'West across the argan plains to the Atlantic, with a coffee stop on the way. The afternoon is yours in Essaouira’s white and blue medina and its woodworkers’ lanes, then the ramparts of the Skala for the sun setting over the ocean and grilled fish by the harbour.', meta: m('About 180 km, about 3 hours on the road', 'Night: Essaouira', 'Breakfast') },
  { t: 'Essaouira → Marrakech', p: 'The best hour in Essaouira: the port in the early morning as the blue boats come in and the fish is sold on the quay, then the old Mellah and a coffee on the square before the day visitors arrive. Back in Marrakech by mid-afternoon, at your hotel or the airport.', meta: [['car', 'About 180 km, about 3 hours on the road'], ['flag', 'Ends at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue fishing boats in the port of Essaouira on the Atlantic" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>3-Day Marrakech &amp; Essaouira</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>3-Day Marrakech &amp; Essaouira Tour<span class="script">A Night by the Atlantic</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>3 days / 2 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Three days for the two faces of Morocco’s south: the Red City and the white port on the Atlantic. A day in the Marrakech medina with a local guide, then west across the argan plains to Essaouira, with time to wander its lanes and watch the sun set from the ramparts.</p>
          <p class="dt-lead">Sleeping in Essaouira is the secret: you get the quiet morning port, with the blue boats coming in and the fish sold on the quay, before the day visitors arrive. Your own vehicle and driver-guide, and back in Marrakech by mid-afternoon on day 3.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Essaouira</dt><dd>A night by the ocean</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Marrakech medina with a local guide',
  'The painted ceilings of the Bahia Palace',
  'Jemaa el-Fnaa as the stalls light up',
  'The argan plains on the way west',
  'Sunset from the Essaouira ramparts',
  'The port at dawn, as the boats come in',
  'Grilled fish by the harbour',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['mosque-sunset.jpg', 'The Koutoubia minaret at sunset'],
  ['marrakech-caleche-square.jpg', 'A horse carriage by the Marrakech medina'],
  ['el-badi-palace-storks.jpg', 'Storks on the walls of the El Badi Palace'],
  ['marrakech-medina-walk.jpg', 'Walking through the Marrakech medina'],
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira'],
  ['spice-market-pyramids.jpg', 'Spices piled high in the souk'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in Marrakech',
  'Pick-up and drop-off at your riad or hotel',
  '2 nights as in the table below',
  '2 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, dinners and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Essaouira is windy: bring a warm layer',
  'Car-sick? The road to the coast is flat and easy',
  'Fish by the port is sold by weight: agree the price first',
  'Medina riads: a porter carries your bags from the gate',
  'Flying out on day 3? We can drop you at the airport',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace:</b> 100 MAD; <b>Saadian Tombs:</b> 100 MAD',
  '<b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Skala du Port, Essaouira:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Essaouira and back, about 360 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Essaouira,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same places as the other tours, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const row = (n, r) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`;
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${row('1: Marra&shy;kech', mar)}${row('2: Essaouira', ess)}</tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'riads in the old towns, a few steps from the sights.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'A short trip: Marrakech and the coast in one go',
  'Couples who want a sunset by the sea',
  'Travellers who find a day trip to Essaouira too rushed',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only one free day? Our <a href="marrakech-to-essaouira-day-trip.html">Essaouira day trip</a> gives you about 5 hours in town',
  'Ending in Agadir? The <a href="4-day-marrakech-essaouira-agadir-tour.html">4-day tour</a> goes on down the coast',
  'Want the Sahara instead? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> also leaves from Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'me3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why sleep in Essaouira instead of a day trip?', 'A day trip gives you about 5 hours in town between two 3-hour drives. Sleeping there adds the sunset on the ramparts and the early morning port, the two best moments in Essaouira, and the day drives feel easy.'],
  ['Is the medina tour full of shop stops?', 'No. Your local guide shows you the monuments and the souks and explains what you see, but never takes you into a shop unless you ask. If you want carpets or argan oil, tell the guide and they will show you honest places.'],
  ['Will we see goats in the argan trees?', 'Sometimes, but many of the goats you see by the road are placed there for photos and the owners ask for money. We stop only if you want to; there is no fee from us and no argan shop stop unless you ask.'],
  ['Is Essaouira good for swimming?', 'Essaouira is famous for its wind, which is great for kitesurfing and long beach walks but makes the water cool and choppy. Come for the old town, the port and the light, not for a swim.'],
  ['Can we start or end at Marrakech airport?', 'Yes. We can meet your flight the evening before day 1, or drop you at Marrakech airport on day 3 instead of your hotel; we are back by mid-afternoon, so an evening flight works well.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in Essaouira',
  'A <a href="marrakech-food-tour.html">food tour</a> on your Marrakech evening',
  'A <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'A <a href="marrakech-hammam-experience.html">hammam</a> after the medina walk',
  'Upgrade to a luxury riad on the ramparts',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%203-Day%20Marrakech%20and%20Essaouira%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>3-Day Marrakech &amp; Essaouira</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 3-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'me3-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech with a guided day (night 1)', 'Essaouira, sunset on the ramparts (night 2)', 'Essaouira port in the morning', 'Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Fes', 'camp', 'Imperial', 'Volubilis', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'desert camp', 'Taghazout']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
