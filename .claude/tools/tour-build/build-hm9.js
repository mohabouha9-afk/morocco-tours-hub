// Build tours/9-day-morocco-honeymoon-tour-from-marrakech.html (URL kept): 9-day honeymoon, Marrakech round trip.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Marrakech arrival · D2 Tichka -> Aït Ben Haddou -> Ouarzazate · D3 Skoura -> Valley of Roses -> Dades ·
// D4 Todra Gorge -> Erfoud -> Rissani -> Merzouga, sunset camel ride, luxury camp · D5 Merzouga 4×4 day (Hassi Labied, Khamlia, nomad family,
// Dayet Srij in season), night Merzouga · D6 Rissani -> Ziz Valley -> Erfoud · D7 Erfoud -> Ouarzazate -> Aït Ben Haddou area · D8 Tichka -> Marrakech ·
// D9 departure. Old page: dinners at Dades + camp; "luxury Sahara camp"; extras offered = private dinner, spa, quad, balloon.
// Hotel rows copied from finished pages (Marrakech + Aït Ben Haddou: 10-day from Tangier; Ouarzazate: 7-day Erg Chigaga & Merzouga; Dades, camp,
// Merzouga: 7-day Tangier -> Marrakech; Erfoud: 6-day family tour). The camps listed all have a private bathroom in the tent (3-day Merzouga log).
// Roads (saved): mf7-d1, ag5-d2, ag5-d3, fy6-d5 (days 7–8 go back on the same roads). OSRM km: D2 ~200, D3 ~150, D4 ~270, D6 ~90, D7 ~330, D8 ~190.
// Derived from build-fy6.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/9-day-morocco-honeymoon-tour-from-marrakech.html';
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

const URL = 'https://moroccotourshub.com/tours/9-day-morocco-honeymoon-tour-from-marrakech.html';
const NAME = '9-Day Morocco Honeymoon Tour from Marrakech';
const TITLE = '9-Day Morocco Honeymoon Tour from Marrakech | Private';
const DESC = 'Private 9-day honeymoon in Morocco from Marrakech: romantic riads, Aït Ben Haddou and the Dades Valley, a sunset camel ride and a night in a luxury Sahara camp, two slow days by the dunes and the Ziz Valley.';
const HERO = 'sahara-couple-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco honeymoon tour, honeymoon in Morocco, romantic Sahara desert camp, luxury desert camp Merzouga, Marrakech honeymoon, private Morocco tour for couples">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech: arrival', p: 'Your driver-guide meets you at Marrakech airport with your names on a sign and takes you to your riad. A first evening walk through the souks to Jemaa el-Fnaa as the lanterns come on, and dinner on a rooftop above the medina.', meta: m('Airport to your riad, about 20 minutes', 'Night: Marrakech riad', 'Breakfast from day 2') },
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Ouarzazate', p: 'Over the High Atlas by the Tizi n’Tichka pass, stopping at every view you like. Aït Ben Haddou, the earthen ksar on its hill, to walk up through the old village together, then on to Ouarzazate for a quiet evening.', meta: m('About 200 km, about 4.5 hours on the road', 'Night: Ouarzazate', 'Breakfast') },
  { t: 'Ouarzazate → Skoura → Valley of Roses → Dades', p: 'The palm oasis and old kasbahs of Skoura, then the Valley of Roses, with stops in the villages on the way. In the Dades Valley by the afternoon, among its red rock formations, for a slow evening and dinner at your hotel.', meta: m('About 150 km, about 3 hours on the road', 'Night: Dades Valley', 'Breakfast and dinner') },
  { t: 'Dades → Todra Gorge → Merzouga', p: 'A walk between the high red walls of the Todra Gorge, then east by Erfoud and Rissani to the dunes. A camel ride of about an hour into the Erg Chebbi for the sunset, just the two of you and your camel guide, then dinner under the stars at a luxury desert camp.', meta: m('About 270 km, about 5 hours on the road', 'Night: Desert camp', 'Breakfast and dinner') },
  { t: 'Merzouga: a slow day in the Sahara', p: 'Sunrise over the dunes together, then a private 4×4 day: the Hassi Labied oasis, Gnawa music in Khamlia, tea with a nomad family, and the lake of Dayet Srij when it has water. An easy evening at your hotel by the dunes.', meta: m('4×4 day around the dunes', 'Night: Merzouga hotel', 'Breakfast') },
  { t: 'Merzouga → Rissani → Ziz Valley → Erfoud', p: 'A slow day after the desert: the old caravan town of Rissani, the fossils of Erfoud and a viewpoint over the palm-filled gorge of the Ziz Valley. The afternoon free at your hotel in Erfoud, by the pool.', meta: m('About 90 km, an easy day on the road', 'Night: Erfoud', 'Breakfast') },
  { t: 'Erfoud → Ouarzazate → Aït Ben Haddou', p: 'West by Tinghir and the Road of a Thousand Kasbahs to Ouarzazate, then a night at Aït Ben Haddou itself, to see the ksar turn gold at sunset and have it almost to yourselves after the day visitors leave.', meta: m('About 330 km, about 6 hours on the road', 'Night: Aït Ben Haddou', 'Breakfast') },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech', p: 'A last morning by the ksar, then back over the High Atlas to Marrakech by early afternoon. Time for a hammam, the Majorelle Garden or a last walk in the souks, and a farewell dinner.', meta: m('About 190 km, about 4 hours on the road', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Marrakech: departure', p: 'A slow breakfast at your riad, then your driver-guide takes you to Marrakech airport at the time of your flight.', meta: [['car', 'Riad to Marrakech airport, about 20 minutes'], ['flag', 'Ends at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A couple watching the sunset over the Sahara dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>9-Day Honeymoon Tour</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>9-Day Morocco Honeymoon Tour<span class="script">Just the Two of You and the Sahara</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>9 days / 8 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Nine days for two, at an easy pace. Romantic riads in Marrakech, the kasbahs of Aït Ben Haddou and Skoura, the red cliffs of the Dades Valley and the Todra Gorge, then the dunes of Merzouga for a sunset camel ride and a night in a luxury desert camp under more stars than you have ever seen.</p>
          <p class="dt-lead">Two slow days by the desert, a night at Aït Ben Haddou when the ksar glows at sunset, and back to Marrakech for a hammam and a farewell dinner. Your own car and driver-guide all the way, with time for each other built into every day.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Sahara</dt><dd>2 nights by the dunes</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Romantic riads in Marrakech',
  'The ksar of Aït Ben Haddou at sunset',
  'The palm oasis of Skoura',
  'The red cliffs of the Dades Valley',
  'A sunset camel ride for two',
  'A night in a luxury desert camp',
  'Sunrise over the Erg Chebbi dunes',
  'Tea with a nomad family',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-terrace-tea.jpg', 'Mint tea on a terrace facing Aït Ben Haddou'],
  ['dades-valley-red-green.jpg', 'The red cliffs and green fields of the Dades Valley'],
  ['merzouga-dune-walk-red.jpg', 'Walking along a dune ridge at Merzouga'],
  ['luxury-camp-night.jpg', 'A luxury desert camp at night'],
  ['luxury-camp-bathtub.jpg', 'A private bathroom in a luxury tent'],
  ['ziz-valley-plateau.jpg', 'The Ziz Valley'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Marrakech airport transfers',
  '8 nights as in the table below',
  '8 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  '4×4 day around Merzouga',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, other dinners', 'Entrance fees', 'Spa, hammam and private dinners', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Tell us it is your honeymoon: hotels love to know',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Desert nights are cold in winter: bring warm layers',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  '<b>Majorelle Garden:</b> about 170 MAD, if you go',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Merzouga and back, about 1,450 km in 9 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CBoumalne+Dades,Morocco%7CTinghir,Morocco%7CMerzouga,Morocco%7CErfoud,Morocco%7COuarzazate,Morocco&amp;travelmode=driving"', 'mapnote');

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
            <tbody>${r('1: Marra&shy;kech', cellsFrom(T10, ': Marrakech</th>'))}${r('2: Ouarzazate', cellsFrom(EC, ': Ouarzazate</th>'))}${r('3: Dades Valley', cellsFrom(T7, ': Dades Valley</th>'))}${r('4: Desert camp', cellsFrom(T7, ': Desert camp</th>'))}${r('5: Merzouga', cellsFrom(T7, ': Merzouga</th>'))}${r('6: Erfoud', cellsFrom(FY, ': Erfoud</th>'))}${r('7: Aït Ben Haddou', cellsFrom(T10, ': Aït Ben Haddou</th>'))}${r('8: Marra&shy;kech', cellsFrom(T10, ': Marrakech</th>'))}</tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from romantic riads to a luxury desert camp under the stars.', 'acc intro');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Honeymooners and couples celebrating',
  'Couples who want the desert without rushing',
  'Travellers who love riads, kasbahs and quiet',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 3 days? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> keeps the camp night',
  'Dreaming of the sea? The <a href="3-day-marrakech-essaouira-tour.html">3-day tour</a> gives you a night in Essaouira',
  'Want Fes too? The <a href="7-days-morocco-tour.html">7-day Marrakech to Fes tour</a> ends in Fes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'hm9-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is the desert camp romantic and private?', 'Yes. You have your own tent with a real bed and a private bathroom, dinner under the stars and the dunes outside your door. Choose the luxury camp for the most space and comfort; we tell the camp it is your honeymoon.'],
  ['Can you arrange something special?', 'Yes: a private candlelit dinner in the dunes, a hammam and massage for two in Marrakech, a sunrise balloon flight, flowers or a cake in your riad. Tell us what you have in mind when you book; extras are priced before you confirm.'],
  ['How much driving is there?', 'Most days are 3 to 5 hours with stops whenever you like. The longest is day 7, Erfoud to Aït Ben Haddou, about 330 km and 6 hours on the Road of a Thousand Kasbahs. Days 5 and 6 are easy.'],
  ['When is the best time for a honeymoon in Morocco?', 'Spring (March to May) and autumn (September to November) are the best, warm by day and mild at night. Summer is very hot in the desert, and winter nights in the Sahara are cold, though the days are sunny.'],
  ['Can we end the trip at the sea?', 'Yes. We can add two nights in Essaouira, the white port on the Atlantic, about 3 hours from Marrakech, and drop you at Marrakech or Essaouira airport at the end.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A private candlelit dinner in the dunes',
  'A <a href="marrakech-hammam-experience.html">hammam and massage for two</a>',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'Upgrade every night to the luxury level',
  'Two nights in Essaouira at the end',
  'A <a href="marrakech-cooking-class.html">cooking class for two</a>',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%209-Day%20Morocco%20Honeymoon%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>9-Day Honeymoon Tour</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 9-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'hm9-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Honeymooners', 'Couples'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech (night 1)', 'Tizi n’Tichka and Aït Ben Haddou', 'Ouarzazate (night 2)', 'Skoura and the Dades Valley (night 3)', 'Todra Gorge', 'Merzouga luxury desert camp (night 4)', 'Merzouga (night 5)', 'Rissani, Erfoud and the Ziz Valley (night 6)', 'Aït Ben Haddou (night 7)', 'Marrakech (night 8)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Imperial Cities', 'Rabat', 'Volubilis', 'Meknes', 'Chefchaouen', 'children']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
