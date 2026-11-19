// Build tours/4-day-casablanca-to-merzouga-desert-tour.html (NEW 2026-11-19: Casablanca -> Hassan II Mosque -> Rabat -> Fes -> Ifrane -> Midelt -> Merzouga camp -> Todra -> Dades -> Aït Ben Haddou -> Marrakech).
// Template = the approved 4-day Marrakech -> Fes page (like build-ag4.js). Research: .claude/research/tour-4day-casablanca-merzouga-research.md
// Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html';
const out = root + 'tours/4-day-casablanca-to-merzouga-desert-tour.html';
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
const URL = 'https://moroccotourshub.com/tours/4-day-casablanca-to-merzouga-desert-tour.html';
const NAME = '4-Day Casablanca to Merzouga Desert Tour';
const TITLE = '4-Day Casablanca to Merzouga Desert Tour | Ends in Marrakech';
const DESC = 'Private 4-day Sahara tour from Casablanca: the Hassan II Mosque and Rabat on the way to Fes, the Middle Atlas to a camel ride and a night in the Merzouga dunes, then the Todra Gorge, the Dades Valley and Aït Ben Haddou to Marrakech.';
const HERO = 'merzouga-camel-caravan.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="4-day desert tour from Casablanca, Casablanca to Merzouga, Casablanca desert tour, Sahara tour from Casablanca, Casablanca to Marrakech via the desert, Hassan II Mosque, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-marrakech-to-fes-desert-tour-via-merzouga\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca → Hassan II Mosque → Rabat → Fes',
    p: 'Pick-up at your hotel in Casablanca around 08:30. First the Hassan II Mosque on the edge of the ocean, with a guided visit of the prayer hall at 09:00 if you want to go in. An hour up the coast to Rabat for the Hassan Tower, the Mohammed V Mausoleum and the blue-and-white lanes of the Kasbah of the Oudayas above the river. Lunch in Rabat, then the motorway past Meknes to Fes, at your riad around 17:00.',
    meta: [['car', 'About 300 km, about 4 hours on the road'], ['bed', 'Night: Fes'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Cedar forest → Midelt → Ziz Valley → Merzouga',
    p: 'South into the Middle Atlas: Ifrane, the alpine town of red roofs, and the cedar forest near Azrou, where Barbary macaques wait by the road. Lunch in Midelt under the snowy Jebel Ayachi, then down the palm gorges of the Ziz Valley to the edge of the Sahara. Your big bags stay in the car while you ride a camel into the Erg Chebbi dunes for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours with stops'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Up early for sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Through Rissani, the old caravan town, and along the oasis road to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs, through the Valley of Roses and the Skoura palm grove, past the Taourirt Kasbah in Ouarzazate to Aït Ben Haddou and a walk up through the ksar to its old granary. Then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the late afternoon, at your hotel or riad.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or riad'], ['food', 'Breakfast']] },
];

rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan in the Erg Chebbi dunes near Merzouga" loading="eager"`, 'hero img');
rep('<span>4-Day Marrakech to Fes</span></nav>', '<span>4-Day Casablanca to Merzouga</span></nav>', 'crumb');
rep(/(aria-hidden="true"><path d="M12 21c4-4\.5 7-7\.6 7-11a7 7 0 10-14 0c0 3\.4 3 6\.5 7 11z"\/><circle cx="12" cy="10" r="2\.5"\/><\/svg>)Marrakech<\/span>/, '$1Casablanca</span>', 'chip');
rep('<h1>4-Day Marrakech to Fes Desert Tour<span class="script">With a Full Day in the Sahara</span></h1>', '<h1>4-Day Casablanca to Merzouga Desert Tour<span class="script">From the Atlantic to the Dunes</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Route</small><b>Casablanca → Marrakech</b>', 'hero route');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Most long-haul flights land in Casablanca, and this is the shortest way from there to the Sahara. Four days that turn the trip to Marrakech into the journey of your holiday: the Hassan II Mosque on the ocean, Rabat and a night in Fes, then over the Middle Atlas cedar forests to the dunes of Merzouga.</p>
          <p class="dt-lead">A sunset camel ride and a night in a camp in Erg Chebbi, the Todra and Dades gorges, and Aït Ben Haddou on the way over the High Atlas. You never drive the same road twice, and you end in Marrakech, ready for the medina or your flight home. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Casa → Marrakech</dd>', 'kf1');
rep('<dt>Desert day</dt><dd>A full day in Merzouga</dd>', '<dt>Casablanca</dt><dd>Hassan II Mosque visit</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'Rabat and the Kasbah of the Oudayas',
  'Ifrane and the Barbary macaques',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'A walk in the Todra Gorge',
  'An evening in the Dades Valley',
  'Aït Ben Haddou and the Tizi n’Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['casablanca.webp', 'The Hassan II Mosque in Casablanca at dusk', 4032, 3024],
  ['ziz-valley-plateau.jpg', 'The palm gorges of the Ziz Valley', 1600, 1066],
  ['camel-dune-ridge.jpg', 'Camels on a dune ridge in Erg Chebbi', 1170, 780],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at your hotel in Casablanca',
  'Drop-off at your hotel or riad in Marrakech',
  '1 night in a Fes riad',
  '1 night in a desert camp',
  '1 night in the Dades Valley',
  '3 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Dinner in Fes', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Mosque visit: cover shoulders and knees',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD per adult, if you go in',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,100 km in 4 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by the Sahara, about 1,350 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Hassan+II+Mosque,Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CFes,Morocco%7CIfrane,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Fes</th><th scope="col">Night 2: Desert camp</th><th scope="col">Night 3: Dades Valley</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th><td>${fes[i]}</td><td>${camp[i]}</td><td>${dad[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers landing in Casablanca with four days for the desert',
  'Anyone heading to Marrakech who would rather cross the Sahara than take the train',
  'First-timers who want a great mosque, dunes, gorges and kasbahs in one trip',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want time in the cities? The <a href="6-day-casablanca-to-marrakech-tour.html">6-day Casablanca tour</a> adds a guided day in Fes and a morning in Marrakech',
  'Already in Fes? The <a href="3-day-fes-to-marrakech-desert-tour.html">3-day Fes to Marrakech tour</a> starts there',
  'Flying home from Casablanca? The <a href="3-day-desert-tour-rabat-merzouga-rabat.html">3-day Rabat round trip</a> ends back in Rabat',
].map(t => li(INFO, t)).join(''), 'think');

between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'cm4-reviews.json', 'utf8')), 'reviews');

const FAQ = [
  ['Can you pick us up at Casablanca airport?', 'Yes. Mohammed V airport is about 40 minutes from the Hassan II Mosque. If you land the evening before, we can book you a hotel in Casablanca and start at 08:30; if you land in the morning, we meet your flight and fit the mosque visit around it.'],
  ['Can we go inside the Hassan II Mosque?', 'Yes, on a guided visit of about 45 minutes with a mosque guide, 140 MAD per adult, paid at the door. Visits run several times every morning, with fewer slots on Fridays and in Ramadan, so we book the one that fits. Shoulders and knees must be covered, and you carry your shoes in a bag.'],
  ['How long is each day on the road?', 'About 300 km on day 1, 470 km on day 2, 270 km on day 3 and 320 km on day 4. Day 2 is the long one, about 8 hours, broken by Ifrane, the cedar forest and lunch in Midelt; the other days are four to six hours with plenty of stops.'],
  ['Do we see the Fes medina?', 'Not with a guide: you reach Fes around 17:00 and leave after breakfast. Your riad is close to the old town, so you can walk out for dinner. For a full guided day in the medina, add a night in Fes; tell us when you book.'],
  ['Can we fly home from Casablanca after the tour?', 'Yes. Marrakech has its own airport with many flights to Europe, but if your flight leaves from Casablanca, we drive you there the next day, about 2.5 hours by motorway, or put you on the train.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  '<a href="merzouga-quad-biking.html">Quad biking</a> in the Merzouga dunes (extra cost)',
  'Upgrade to a <a href="merzouga-luxury-desert-camp.html">luxury desert camp</a>',
  'A <a href="hassan-ii-mosque-casablanca-city-tour.html">Casablanca city tour</a> the day before',
  'A short hike in the Dades Gorge',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

rep('value="4-Day Marrakech to Fes Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Marrakech%20to%20Fes%20Desert%20Tour.', 'information%20about%20the%204-Day%20Casablanca%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>4-Day Marrakech to Fes</b><span>Free cancellation', '<b>4-Day Casablanca to Merzouga</b><span>Free cancellation', 'mbar');

between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'cm4-similar.json', 'utf8')), 'similar');

const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Travellers arriving in Casablanca'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca hotel pick-up and the Hassan II Mosque', 'Rabat: Hassan Tower and the Kasbah of the Oudayas', 'Fes (night 1)', 'Ifrane, the cedar forest and Midelt', 'Ziz Valley', 'Sunset camel ride and Merzouga desert camp (night 2)', 'Rissani and the Todra Gorge', 'Dades Valley (night 3)', 'Valley of Roses and Aït Ben Haddou', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Khamlia', 'Merzouga hotel', 'Night 3: Merzouga', 'Marrakech → Fes', 'Marrakech to Fes', 'Full day in the Sahara']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
