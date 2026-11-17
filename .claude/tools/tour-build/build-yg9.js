// Build tours/morocco-yoga-retreat-sahara-desert.html (URL kept): 9-day private yoga retreat, Marrakech round trip.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Marrakech -> Tichka -> Aït Ben Haddou -> Ouarzazate · D2 Skoura -> Valley of Roses -> Dades ·
// D3 Todra -> Erfoud -> Rissani -> Merzouga (hotel) · D4 Merzouga sunrise/sunset yoga day · D5 Merzouga 4×4 (Khamlia, nomad family, Dayet Srij) ·
// D6 camel trek -> desert camp (dinner) · D7 Merzouga full wellness day (hotel) · D8 Rissani -> Ziz Valley -> Erfoud · D9 Erfoud -> Tichka -> Marrakech.
// Old page: breakfasts + camp dinner; "daily yoga and wellness sessions as arranged"; own instructor welcome (fees not included); mats on request.
// Research (2026-11-17; OpenSEO out of credits, SERP via WebSearch): bookretreats.com Sahara/Merzouga listings are fixed-date GROUP retreats
// (4-day women's retreat Errachidia->Merzouga ~US$1,330, 4.8–4.97/26–32; 9-day yoga caravan 4.96/24–31 "fairly active, quite a bit of travelling";
// 8-day Free the Soul 4.98/59). Worries: travel-heavy itineraries, wind/sandstorms, cold dawns, practising on shifting sand, heat cancelling a
// session (Atlas retreat review). Our angle: private, 4 slow nights by the dunes, sessions at sunrise and sunset. Roads: same as fy6 (OSRM).
// Derived from build-hm9.js. Never re-run on the finished page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/morocco-yoga-retreat-sahara-desert.html';
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

const URL = 'https://moroccotourshub.com/tours/morocco-yoga-retreat-sahara-desert.html';
const NAME = '9-Day Morocco Yoga Retreat in the Sahara';
const TITLE = '9-Day Sahara Yoga Retreat from Marrakech | Private';
const DESC = 'Private 9-day yoga retreat in Morocco from Marrakech: Aït Ben Haddou, the Dades Valley and the Todra Gorge, then four slow nights by the Merzouga dunes with sunrise and sunset yoga, meditation and a night in a desert camp.';
const HERO = 'dune-ridge-solo.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco yoga retreat, Sahara yoga retreat, desert yoga retreat Morocco, Merzouga yoga, private yoga holiday Morocco, Morocco wellness retreat">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Ouarzazate', p: 'Your driver-guide collects you at your Marrakech hotel and takes you over the High Atlas by the Tizi n’Tichka pass, stopping at the views you like. A walk up through the ksar of Aït Ben Haddou, then Ouarzazate, and a gentle stretch and breathing session to end the first day.', meta: m('About 200 km, about 4.5 hours on the road', 'Night: Ouarzazate', 'Breakfast from day 2') },
  { t: 'Ouarzazate → Skoura → Valley of Roses → Dades', p: 'The palm oasis and old kasbahs of Skoura, then the Valley of Roses. In the Dades Valley by the afternoon, with time to rest and a slow yoga session facing the red rock formations as the light softens.', meta: m('About 150 km, about 3 hours on the road', 'Night: Dades Valley', 'Breakfast') },
  { t: 'Dades → Todra Gorge → Merzouga', p: 'A morning practice, then a walk between the high walls of the Todra Gorge. East by Erfoud and Rissani to the dunes, where you settle into your hotel by the Erg Chebbi, with a first quiet meditation at sunset.', meta: m('About 270 km, about 5 hours on the road', 'Night: Merzouga hotel', 'Breakfast') },
  { t: 'Merzouga: sunrise and sunset yoga', p: 'Up before dawn for yoga on the dunes as the first light reaches the sand. The middle of the day is yours: rest, read, walk barefoot in the dunes or practise on your own in the shade. A second session at sunset, when the sand cools and the desert goes quiet.', meta: m('No driving today', 'Night: Merzouga hotel', 'Breakfast') },
  { t: 'Merzouga: 4×4, Khamlia and the nomads', p: 'Morning yoga, then a private 4×4 around the dunes: Gnawa music in the village of Khamlia, tea with a nomad family and the lake of Dayet Srij when it has water. Back for a rest and a gentle evening practice.', meta: m('4×4 morning around the dunes', 'Night: Merzouga hotel', 'Breakfast') },
  { t: 'Merzouga: camel trek to the desert camp', p: 'A slow morning and free time, then in the afternoon a camel ride of about an hour into the Erg Chebbi to reach the camp for sunset. Dinner and music by the fire, and a meditation under the stars before you sleep in the dunes.', meta: m('Camel ride, about 1 hour', 'Night: Desert camp', 'Breakfast and dinner') },
  { t: 'Merzouga: a full wellness day', p: 'Sunrise meditation and yoga on the dunes by the camp, then back to your hotel. A day kept free for rest, personal practice, a long walk or nothing at all, with a last sunset session in the Sahara.', meta: m('Short ride back to the hotel', 'Night: Merzouga hotel', 'Breakfast') },
  { t: 'Merzouga → Rissani → Ziz Valley → Erfoud', p: 'A last morning practice by the dunes, then an easy day: the old caravan town of Rissani and a viewpoint over the palm-filled gorge of the Ziz Valley. The afternoon free at your hotel in Erfoud.', meta: m('About 90 km, an easy day on the road', 'Night: Erfoud', 'Breakfast') },
  { t: 'Erfoud → Tizi n’Tichka → Marrakech', p: 'West by Tinghir and the Road of a Thousand Kasbahs, over the High Atlas once more, with stops to stretch whenever you like. In Marrakech by the evening, at your hotel or the airport.', meta: [['car', 'About 510 km, a full day on the road'], ['flag', 'Ends at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A traveller alone on a dune ridge in the Sahara" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>9-Day Sahara Yoga Retreat</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>9-Day Morocco Yoga Retreat in the Sahara<span class="script">Sunrise on the Dunes, Time to Breathe</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>9 days / 8 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">A private yoga retreat that travels. Over the High Atlas to Aït Ben Haddou, through the palm oases and red valleys of the south, to the dunes of Merzouga, where you stay five nights instead of one rushed evening. Yoga at sunrise and sunset, meditation by the fire and long quiet days in between.</p>
          <p class="dt-lead">Just you, your partner, your friends or your own yoga group, with your own car and driver-guide. The sessions follow your level and your pace, from complete beginner to daily practitioner, and the dunes become your studio.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Yoga</dt><dd>Sunrise and sunset</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Sunrise yoga on the Erg Chebbi dunes',
  'Five slow nights by the Sahara',
  'Meditation by the fire under the stars',
  'A camel trek to a desert camp',
  'The ksar of Aït Ben Haddou',
  'The red Dades Valley and Todra Gorge',
  'Tea with a nomad family',
  'The palm gorge of the Ziz Valley',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['dune-screensaver.jpg', 'Soft light over the Merzouga dunes'],
  ['ait-ben-haddou-terrace-tea.jpg', 'Mint tea on a terrace facing Aït Ben Haddou'],
  ['dades-valley-red-green.jpg', 'The red cliffs and green fields of the Dades Valley'],
  ['nomad-tent-tea.jpg', 'Tea in a nomad tent'],
  ['merzouga-camel-caravan-guide.jpg', 'A camel trek in the Erg Chebbi'],
  ['desert-camp-lanterns.jpg', 'A desert camp lit by lanterns'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Daily yoga and meditation, set to your level',
  '8 nights as in the table below',
  '8 breakfasts and 1 dinner (camp)',
  'Camel trek and sandboarding',
  '4×4 morning around Merzouga',
  'Hotel pick-up and drop-off in Marrakech',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, other dinners', 'Entrance fees', 'Your own teacher, if you bring one', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Tell us your level and style of yoga',
  'Bring your own mat or ask us for one',
  'Dawns are cool: bring a warm layer',
  'Windy day? We practise in a sheltered spot',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Merzouga and back, about 1,400 km in 9 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CBoumalne+Dades,Morocco%7CTinghir,Morocco%7CMerzouga,Morocco%7CErfoud,Morocco%7COuarzazate,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations ----------
function cellsFrom(file, label) {
  const SRC = fs.readFileSync(root + 'tours/' + file, 'utf8');
  const i = SRC.indexOf(label); if (i < 0) throw new Error('row ' + label + ' in ' + file);
  const row = SRC.slice(i, SRC.indexOf('</tr>', i));
  const tds = row.match(/<td>[\s\S]*?<\/td>/g); if (!tds || tds.length < 3) throw new Error('cells ' + label);
  return tds.slice(0, 3).join('');
}
const T7 = '7-day-morocco-tour-tangier-to-marrakech.html', T10 = '10-day-morocco-tour-from-tangier.html', EC = '7-day-marrakech-erg-chigaga-merzouga-tour.html', FY = '6-day-morocco-family-tour-marrakech-merzouga.html';
const r = (n, c) => `<tr><th scope="row">${n}</th>${c}</tr>`;
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${r('1: Ouarzazate', cellsFrom(EC, ': Ouarzazate</th>'))}${r('2: Dades Valley', cellsFrom(T7, ': Dades Valley</th>'))}${r('3–5: Merzouga', cellsFrom(T7, ': Merzouga</th>'))}${r('6: Desert camp', cellsFrom(T7, ': Desert camp</th>'))}${r('7: Merzouga', cellsFrom(T7, ': Merzouga</th>'))}${r('8: Erfoud', cellsFrom(FY, ': Erfoud</th>'))}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Yogis who want the desert, not a studio',
  'Beginners who want a gentle, slow pace',
  'Friends or a yoga group travelling together',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 3 days? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> keeps the camp night',
  'Want to live with nomads? The <a href="10-day-merzouga-desert-nomad-experience.html">10-day nomad tour</a> sleeps in a family tent',
  'Rather stay in one place? Our <a href="6-day-marrakech-surroundings-tour.html">6-day tour</a> keeps one Marrakech riad',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'yg9-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Do I need yoga experience?', 'No. The sessions are set to your level, from complete beginner to daily practitioner, and you can skip any of them. Tell us your style (gentle, hatha, vinyasa, yin) and how often you like to practise.'],
  ['Who leads the yoga sessions?', 'Sessions are arranged as part of your retreat and adapted to your group. If you have a teacher of your own, you are welcome to bring them; their fees are not included.'],
  ['What is yoga on the sand like?', 'Softer and harder at once: the sand moves under you, so balance poses take more work and floor work is gentle on the knees. We practise at sunrise and sunset, when the sand is cool, and move to a sheltered spot on windy days.'],
  ['Is there a lot of driving?', 'The first three days are 3 to 5 hours on the road, then five nights by the dunes with almost no driving. The last day, Erfoud to Marrakech, is the long one at about 510 km; we can split it with a night in Ouarzazate.'],
  ['When is the best time to go?', 'Spring (March to May) and autumn (September to November): warm days and cool dawns, ideal for practising outdoors. Summer is very hot in the desert at midday, and winter dawns are cold, though the days are sunny.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A night in Ouarzazate to split the last day',
  'A <a href="marrakech-hammam-experience.html">hammam and massage</a> in Marrakech',
  'A second night in the desert camp',
  'Upgrade to a luxury camp',
  'A vegetarian or vegan menu all the way',
  'Extra days in Marrakech before or after',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%209-Day%20Sahara%20Yoga%20Retreat.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>9-Day Yoga Retreat</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 9-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'yg9-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Yoga practitioners', 'Wellness travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech', 'Tizi n’Tichka and Aït Ben Haddou', 'Ouarzazate (night 1)', 'Skoura and the Dades Valley (night 2)', 'Todra Gorge', 'Merzouga (nights 3–5)', 'Merzouga desert camp (night 6)', 'Merzouga (night 7)', 'Rissani, Erfoud and the Ziz Valley (night 8)', 'Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Imperial Cities', 'Rabat', 'Volubilis', 'Meknes', 'Chefchaouen', 'children', 'oneymoon', 'romantic', 'couple', 'Essaouira']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
