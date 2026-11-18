// Build tours/merzouga-to-marrakech-tour.html (NEW 2026-11-18: meet in Merzouga -> camp -> Rissani, Todra -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 3-day Fes -> Marrakech page (days 2-3 use the same road). Never re-run on the finished page.
// Research (2026-11-18): no operator sells a ready-made Merzouga -> Marrakech tour on page 1 ("Merzouga to Marrakech tour 2 days 3 days"
//   search returned only Marrakech-start tours); GYG/others sell one-day transfers. On file: "merzouga to marrakech" 90/month US.
//   Direct drive Merzouga -> Marrakech by the Draa = ~560 km, 9-10 h (OSRM mz3-d3). Expert choice: 3 days, the road split at the
//   Dades Valley (Merzouga -> Dades ~270 km, Dades -> Marrakech ~320 km, roads fm4-d2 + fm4-d3); 2-day version offered in the FAQ.
//   Same audience as the Merzouga -> Fes tour: travellers already in Merzouga (Supratours night bus from Marrakech/Fes arrives ~07:00).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/3-day-fes-to-marrakech-desert-tour.html';
const out = root + 'tours/merzouga-to-marrakech-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/merzouga-to-marrakech-tour.html';
const NAME = '3-Day Merzouga to Marrakech Tour';
const TITLE = '3-Day Merzouga to Marrakech Tour via Todra & Aït Ben Haddou';
const DESC = 'Already in Merzouga? A night in a desert camp, then the road to Marrakech split over two easy days: the Todra Gorge and the Dades Valley, the Valley of Roses, Aït Ben Haddou and the Tizi n’Tichka pass, with your own driver.';
const HERO = 'merzouga-camel-ride-group.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga to Marrakech, Merzouga to Marrakech tour, Merzouga to Marrakech transfer, desert camp Merzouga, Todra Gorge, Dades Valley, Aït Ben Haddou, private driver">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/3-day-fes-to-marrakech-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Meet in Merzouga → Khamlia → Nomad family → Camel ride to the camp',
    p: 'Your driver meets you in Merzouga wherever you are: your hotel or riad, the bus stop, or where your last tour leaves you, by early afternoon at the latest. An easy afternoon around Erg Chebbi: Gnawa music in the village of Khamlia and mint tea in the tent of a nomad family. Your big bags stay in the car: you ride a camel into the dunes for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'Short drives around the dunes'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Sunrise → Rissani → Tinghir → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding, breakfast in the camp and back by camel or 4×4. West by Rissani, the old caravan town, and along the Jebel Saghro to the long palm grove of Tinghir. Walk between the 300 m walls of the Todra Gorge, then on to the Dades Valley for an evening among red cliffs and kasbahs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Along the Road of a Thousand Kasbahs through the Valley of Roses and the Skoura palm grove, past Ouarzazate to Aït Ben Haddou, where your driver-guide walks you up through the ksar to the old granary. Then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the late afternoon, at your hotel, riad or the airport.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Riding camels into the Erg Chebbi dunes at Merzouga" loading="eager"`, 'hero img');
rep('<span>3-Day Fes to Marrakech Desert Tour</span></nav>', '<span>3-Day Merzouga to Marrakech Tour</span></nav>', 'crumb');
rep('r="2.5"/></svg>Fes</span>', 'r="2.5"/></svg>Merzouga</span>', 'chip');
rep('<h1>3-Day Fes to Marrakech Desert Tour<span class="script">The Sahara on Your First Night</span></h1>', '<h1>3-Day Merzouga to Marrakech Tour<span class="script">From the Dunes to the Red City</span></h1>', 'h1');
rep('<small>Route</small><b>Fes → Marrakech</b>', '<small>Route</small><b>Merzouga → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Already in Merzouga and heading for Marrakech? Make the way there part of the trip. We meet you in the village, take you to the Gnawa musicians of Khamlia and a nomad family’s tent, then a camel carries you into the dunes of Erg Chebbi for sunset and a night in the camp.</p>
          <p class="dt-lead">Instead of one long drive, the road west takes two easy days: the Todra Gorge and an evening in the Dades Valley, then the kasbahs of the Valley of Roses, Aït Ben Haddou on foot and the High Atlas. Your own car and driver-guide, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Fes → Marrakech</dd>', '<dd>Merzouga → Marrakech</dd>', 'kf1');
rep(/(<dt>)Desert night(<\/dt><dd>)Camp in the dunes(<\/dd>)/, '$1Meeting$2Anywhere in Merzouga$3', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Gnawa music in Khamlia',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'A walk in the Todra Gorge',
  'An evening in the Dades Valley',
  'The Valley of Roses and Skoura',
  'Aït Ben Haddou on foot',
  'The Tizi n’Tichka pass over the High Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['khamlia-gnawa.jpg', 'Gnawa musicians in the village of Khamlia', 1600, 1066],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led over the Merzouga dunes', 1300, 866],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou above the river', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Meeting anywhere in Merzouga',
  'Drop-off at your Marrakech hotel or airport',
  '1 night in a desert camp',
  '1 night in the Dades Valley',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Tell us where and when you arrive in Merzouga',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the Tichka bends',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
rep(/<span>Fes to Marrakech by the Sahara, about 1,060 km in 3 days\. <a href="[^"]*"/, '<span>Merzouga to Marrakech by the gorges, about 590 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Merzouga,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Khamlia,Morocco%7CRissani,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations: camp + Dades (kept from the template) ----------
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving in Merzouga by bus',
  'Anyone ending a desert trip and flying home from Marrakech',
  'First-timers who want gorges and kasbahs too',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Heading north instead? The <a href="merzouga-to-fes-tour.html">2-day Merzouga to Fes tour</a> ends in Fes',
  'Starting in Marrakech? Take the <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Marrakech to Merzouga tour</a>',
  'Want a full day in the dunes first? Add our <a href="merzouga-4x4-desert-day-tour.html">4×4 day around Merzouga</a>',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mk3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why three days and not one long drive?', 'Merzouga to Marrakech is about 560 km, nine to ten hours on the road. Split at the Dades Valley, each day is five or six hours and you have time for the Todra Gorge and Aït Ben Haddou instead of watching them pass by the window.'],
  ['Can we do it in two days?', 'Yes. After the camp night we can drive straight to Marrakech by the Draa Valley in one long day, with stops for lunch and photos. Tell us when you book; it is the right choice if you have a flight to catch.'],
  ['Where do you meet us in Merzouga?', 'Wherever suits you: your hotel or riad, the bus stop in the village, or where another tour leaves you. Send us the place and the time you arrive; we meet you by early afternoon so there is time for Khamlia before the camel ride.'],
  ['Can we skip the camp?', 'Yes. If you have already slept in the dunes, we start the next morning from your hotel in Merzouga and the tour becomes two days: the Todra Gorge and the Dades Valley, then Aït Ben Haddou and Marrakech.'],
  ['Can you drop us at Marrakech airport?', 'Yes. We reach Marrakech in the late afternoon of day 3, so an evening or next-day flight works well. Send us your flight time when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'After the night bus: a room to rest and shower first',
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> or a <a href="merzouga-buggy-tour.html">buggy</a> before sunset (extra cost)',
  'A night at Aït Ben Haddou instead of the Dades Valley',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="3-Day Fes to Marrakech Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%203-Day%20Fes%20to%20Marrakech%20Desert%20Tour.', 'information%20about%20the%203-Day%20Merzouga%20to%20Marrakech%20Tour.', 'wa');
rep('<b>3-Day Fes to Marrakech</b><span>Free', '<b>3-Day Merzouga to Marrakech</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'mk3-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Backpackers', 'Couples', 'Friends', 'Solo travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Meeting in Merzouga, Khamlia', 'Sunset camel ride and desert camp (night 1)', 'Rissani and the Todra Gorge', 'Dades Valley (night 2)', 'Valley of Roses and Aït Ben Haddou', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Ifrane', 'Midelt', 'cedar', '07:30', 'Ziz']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
