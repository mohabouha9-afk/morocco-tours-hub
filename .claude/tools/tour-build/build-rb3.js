// Build tours/3-day-desert-tour-rabat-merzouga-marrakech.html (Rabat -> Ifrane -> Midelt -> Merzouga camp -> Todra -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 3-day Agadir page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/3-day-desert-tour-from-agadir.html';
const out = root + 'tours/3-day-desert-tour-rabat-merzouga-marrakech.html';
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

const URL = 'https://moroccotourshub.com/tours/3-day-desert-tour-rabat-merzouga-marrakech.html';
const NAME = '3-Day Rabat to Merzouga Desert Tour';
const TITLE = '3-Day Rabat to Merzouga Desert Tour | Ends in Marrakech';
const DESC = 'Private 3-day desert tour from Rabat: the cedar forests of the Middle Atlas and the Ziz Valley to a sunset camel ride and a camp in the Merzouga dunes, then the Todra and Dades gorges and Aït Ben Haddou to Marrakech.';
const HERO = 'sahara-camel-pink-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Rabat to Merzouga, 3-day desert tour from Rabat, Rabat to Marrakech desert tour, Sahara tour from Rabat, Ifrane, Todra Gorge, Aït Ben Haddou, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/3-day-desert-tour-from-agadir\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Rabat → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at your hotel or riad in Rabat around 06:30. East into the Middle Atlas to Ifrane, the alpine town of red roofs, and the cedar forest where Barbary macaques live by the road. Lunch in Midelt under the Jebel Ayachi, then down through the palm gorges of the Ziz Valley to Erfoud. At the dunes your big bags stay in the car and you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 600 km, about 9 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Through Rissani, the old caravan town, and along the Jebel Saghro to the long palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs and kasbahs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs, through the Valley of Roses and the Skoura palm grove, past Ouarzazate to Aït Ben Haddou and a walk up through the ksar to its old granary. Then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the late afternoon, at your hotel, riad or the airport.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel on the Merzouga dunes under a pink sunset" loading="eager"`, 'hero img');
rep('<span>3-Day Agadir to Merzouga &amp; Marrakech</span></nav>', '<span>3-Day Rabat to Merzouga &amp; Marrakech</span></nav>', 'crumb');
rep('r="2.5"/></svg>Agadir</span>', 'r="2.5"/></svg>Rabat</span>', 'chip');
rep('<h1>3-Day Agadir to Merzouga Desert Tour<span class="script">From the Atlantic to the Sahara</span></h1>', '<h1>3-Day Rabat to Merzouga Desert Tour<span class="script">From the Capital to the Dunes</span></h1>', 'h1');
rep('<small>Route</small><b>Agadir → Marrakech</b>', '<small>Route</small><b>Rabat → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">From the capital to the Sahara and on to Marrakech, without driving the same road twice. Across the cedar forests of the Middle Atlas, where Barbary macaques watch from the trees, through Ifrane and Midelt and down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi, for a sunset camel ride and a night in the camp.</p>
          <p class="dt-lead">Then the great road of the south: the Todra Gorge, an evening in the Dades Valley, the kasbahs of the Valley of Roses and Aït Ben Haddou, and over the High Atlas to Marrakech. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Agadir → Marrakech</dd>', '<dd>Rabat → Marrakech</dd>', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Barbary macaques in the cedar forest',
  'Ifrane, the alpine town of the Atlas',
  'The palm gorges of the Ziz Valley',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'A walk in the Todra Gorge',
  'An evening in the Dades Valley',
  'Aït Ben Haddou and the Tizi n’Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ziz-valley-plateau.jpg', 'The Ziz Valley palm groves below the plateau', 1600, 1066],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['dades-road.jpg', 'The hairpin bends of the Dades Gorge road', 1080, 1349],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou above the river', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at your hotel or riad in Rabat',
  'Drop-off at your Marrakech hotel or airport',
  '1 night in a desert camp',
  '1 night in the Dades Valley',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Long first day: we stop whenever you want',
  'Small bag for the camp; luggage stays in the car',
  'Don’t feed the macaques: watch them from the car',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Agadir to Marrakech by the Sahara, about 1,400 km in 3 days\. <a href="[^"]*"/, '<span>Rabat to Marrakech by the Sahara, about 1,200 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Rabat,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (2 nights: Options | Night 1 | Night 2) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
between('<div class="dt-acc-wrap"><table class="dt-acc">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Desert camp</th><th scope="col">Night 2: Dades Valley</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((n, i) => `<tr><th scope="row">${n}</th><td>${camp[i]}</td><td>${dad[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers in Rabat or Casablanca with three days',
  'Anyone moving on from the north to Marrakech',
  'First-timers who want dunes, gorges and kasbahs',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Long first day worries you? Take the train to Fes and join the <a href="4-day-fes-to-marrakech-desert-tour.html">4-day Fes to Marrakech tour</a>',
  'Coming back to Rabat? The <a href="3-day-desert-tour-rabat-merzouga-rabat.html">3-day Rabat round trip</a> returns to the capital',
  'Starting in Marrakech? Take the <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Marrakech to Merzouga tour</a>',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'rb3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How long is the drive from Rabat to Merzouga?', 'About 600 km, nine hours with stops for coffee, the cedar forest and lunch in Midelt. That is why we leave early: you reach the dunes in time for the sunset camel ride. Days 2 and 3 are about five and six hours.'],
  ['Will we reach the dunes in time for sunset?', 'Yes, with a 06:30 start. In winter, when the sun sets early, we may leave a little earlier; we confirm the time on WhatsApp the day before. If you prefer a calmer first day, we can add a night in Midelt.'],
  ['Can you pick us up in Casablanca or Meknes?', 'Yes. Casablanca adds about an hour on the first morning, so we start earlier; Meknes is on the way, close to Ifrane. Send us your hotel name when you book.'],
  ['Will we see the Barbary macaques?', 'Usually, yes. They live in the cedar forest near Azrou, and families often sit by the road. We stop so you can watch them; please don’t feed them, it makes them sick and aggressive.'],
  ['Can you drop us at Marrakech airport?', 'Yes. We reach Marrakech in the late afternoon, so an evening or next-day flight works well. Send us your flight time when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Pick-up in Casablanca or Meknes',
  'A night in Midelt for a calmer first day',
  'Upgrade to a luxury camp',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="3-Day Desert Tour from Agadir to Merzouga & Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%203-Day%20Desert%20Tour%20from%20Agadir.', 'information%20about%20the%203-Day%20Rabat%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>3-Day Agadir to Merzouga</b><span>Free', '<b>3-Day Rabat to Merzouga</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'rb3-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Rabat pick-up, Ifrane and the cedar forest', 'Midelt and the Ziz Valley', 'Sunset camel ride and desert camp (night 1)', 'Rissani and the Todra Gorge', 'Dades Valley (night 2)', 'Valley of Roses and Aït Ben Haddou', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Agadir', 'Taroudant', 'Taliouine', 'Atlantic', 'Draa']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
