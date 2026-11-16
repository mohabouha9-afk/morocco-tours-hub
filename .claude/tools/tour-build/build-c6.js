// Build tours/6-day-casablanca-to-marrakech-tour.html (Casablanca + Hassan II Mosque -> Rabat -> Fes x2 -> Merzouga camp -> Todra -> Dades
// -> Aït Ben Haddou -> Marrakech, guided Marrakech morning on day 6). Template = the finished 7-day Tangier -> Marrakech page.
// Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "casablanca to fes train" 260, "6 day morocco itinerary" 70, "morocco itinerary 6 days" 70, "6 days in morocco" 40.
// SERP (WebSearch; Firecrawl out of credits): TourRadar "6-Day Private Tour From Casablanca to Marrakech via Fes & Sahara Desert" (~US$1,724 pp:
// Casablanca -> Rabat -> Fes, Fes -> Merzouga, Todra and Dades, Aït Ben Haddou + High Atlas -> Marrakech), other TourRadar/kimkim 6-day tours run
// the same order or the reverse, some add Chefchaouen. Expert choices: the 300 km first day (Casablanca -> Rabat -> Fes) only works after a morning
// landing, so evening arrivals get a Casablanca night (Make It Your Own) and the FAQ says so; no Chefchaouen (it needs a 7th day = our 7-day tour);
// one desert night; a guided Marrakech morning on day 6 so the tour ends with the city, not just a drive into it.
// Roads: ti4 (Fes <-> Rabat <-> Casablanca, drawn either way), fm4-d1, fm4-d2, fm4-d3.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/6-day-casablanca-to-marrakech-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/6-day-casablanca-to-marrakech-tour.html';
const NAME = '6-Day Morocco Tour from Casablanca to Marrakech';
const TITLE = '6-Day Casablanca to Marrakech Tour via Fes & Sahara | Private';
const DESC = 'A private 6-day Morocco itinerary from Casablanca to Marrakech: the Hassan II Mosque and Rabat, a guided day in Fes, a night in the Merzouga dunes, the Todra and Dades gorges, Aït Ben Haddou and a guided morning in Marrakech.';
const HERO = 'merzouga-camel-ride-dunes.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="6 day Morocco itinerary, 6 days in Morocco, Casablanca to Marrakech tour, Casablanca to Fes, Sahara desert tour, Merzouga, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca → Hassan II Mosque → Rabat → Fes',
    p: 'Your driver-guide meets you at Casablanca airport or your hotel in the morning. A guided visit inside the Hassan II Mosque, built over the Atlantic, then Rabat: the Kasbah of the Oudayas, the Hassan Tower and the royal Mausoleum. On by motorway to your riad in the Fes medina for the evening.',
    meta: [['car', 'About 300 km, about 3.5 hours on the motorway'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast from day 2']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide through Fes el-Bali: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the brass gates of the royal palace and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane, the cedar forest of Azrou with its Barbary macaques, lunch in Midelt and the palm gorges of the Ziz Valley to Erg Chebbi. A camel ride into the dunes for sunset, dinner and drums by the fire in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding on the dunes, back by camel or 4×4, then Rissani, the old caravan town with its market, and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to your Marrakech riad in the early evening.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided morning, then home',
    p: 'With a local Marrakech guide: the Koutoubia, the painted cedar ceilings of the Bahia Palace, the Ben Youssef Madrasa and the souks around Jemaa el-Fnaa. Lunch where you like, then your driver takes you to Marrakech airport or your next hotel.',
    meta: [['car', 'Morning on foot in the medina'], ['flag', 'Ends at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>6-Day Casablanca to Marrakech</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Tangier</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Casablanca</span>', 'chip');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>6-Day Casablanca to Marrakech Tour<span class="script">Fes, the Sahara and the Red City</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>6 days / 5 nights', 'duration');
rep('<small>Route</small><b>Tangier → Marrakech</b>', '<small>Route</small><b>Casablanca → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Six days from Casablanca to Marrakech by the classic route, with no time wasted. The Hassan II Mosque on the ocean and Rabat on the way to Fes, then a full day in the Fes medina with a local guide.</p>
          <p class="dt-lead">Over the Middle Atlas to a camp in the dunes of Erg Chebbi, the Todra and Dades gorges, Aït Ben Haddou on the way over the High Atlas, and a guided morning in Marrakech before you fly home. Your own car and driver-guide all the way.</p>
`, 'overview');
rep('<dd>Tangier → Marrakech</dd>', '<dd>Casa → Marrakech</dd>', 'kf1');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>City guides</dt><dd>Fes and Marrakech</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'The Kasbah of the Oudayas in Rabat',
  'A guided day in the Fes medina',
  'The cedar forest and its macaques',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
  'A guided morning in Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['casablanca.webp', 'The Hassan II Mosque in Casablanca at dusk', 4032, 3024],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina', 975, 1300],
  ['ziz-valley-plateau.jpg', 'The palm gorges of the Ziz Valley', 1600, 1066],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou', 1600, 1066],
  ['jemaa-el-fna-dusk-stalls.jpg', 'Jemaa el-Fnaa square in Marrakech at dusk', 1600, 1201],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Pick-up at Casablanca airport or hotel',
  'Drop-off at Marrakech airport or your hotel',
  '5 nights as in the table below',
  '5 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Day 1 suits a morning arrival in Casablanca',
  'The Hassan II Mosque is closed to visits on Fridays',
  'Small bag for the camp; luggage goes by 4×4',
  'Flying home on day 6? Book an afternoon flight',
  'Desert and Atlas nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by Rabat, Fes and the Sahara, about 1,400 km in 6 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');
rep('<span>Flights and ferry tickets</span>', '<span>International flights</span>', 'not incl');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1–2: Fes', fes], ['3: Desert camp', camp], ['4: Dades Valley', dad], ['5: Marra&shy;kech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers landing in Casablanca in the morning',
  'Anyone with six days who wants Fes and the desert',
  'First-timers who like a local guide in the cities',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want Chefchaouen too? The <a href="7-day-morocco-tour-from-casablanca.html">7-day tour from Casablanca</a> adds the blue town and Volubilis',
  'Landing in the evening? The <a href="8-day-morocco-imperial-cities-sahara-tour.html">8-day Imperial Cities &amp; Sahara tour</a> starts with an easy night in Rabat',
  'Want a slower pace? The <a href="9-day-morocco-private-tour-from-casablanca.html">9-day tour from Casablanca</a> spends two nights in each highlight',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'c6-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are 6 days enough for Casablanca to Marrakech?', 'Yes, for Fes, the Sahara and the gorges. Days 3 and 5 are long on the road, but day 2 in Fes and the last morning in Marrakech have no driving. If you can add a day, the 7-day tour adds Chefchaouen.'],
  ['What if we land in Casablanca in the evening?', 'Then day 1 is too long. We add a night in Casablanca and start the next morning with the mosque, or we leave the mosque out and drive straight to Fes. Tell us your flight time and we plan it.'],
  ['When can we see the Hassan II Mosque?', 'Guided visits run Saturday to Thursday, several times a day; the mosque is closed to visitors on Fridays. If day 1 falls on a Friday, we see the mosque from outside and spend longer in Rabat.'],
  ['Which days are the long drives?', 'Day 3, Fes to Merzouga, about eight hours with stops, and day 5 over the High Atlas, about six. Day 1 is about three and a half hours on the motorway with two long stops.'],
  ['Can we fly home on day 6?', 'Yes. The guided walk in Marrakech is in the morning, so an afternoon or evening flight works well. For an early flight, we do the walk on the evening of day 5 instead.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A first night in Casablanca after a late flight',
  'Volubilis and Meknes on the way to Fes',
  'Upgrade to a luxury camp with heated tents',
  'Quad biking or a buggy in the dunes (extra cost)',
  'Extra days in Marrakech: <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-food-tour.html">food tour</a>',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%206-Day%20Morocco%20Tour%20from%20Casablanca%20to%20Marrakech.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>6-Day Casablanca to Marrakech</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 6-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'c6-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca and the Hassan II Mosque', 'Rabat: Kasbah of the Oudayas and Hassan Tower', 'Guided day in the Fes medina (nights 1–2)', 'Ifrane, Midelt and a camel ride to a desert camp (night 3)', 'Rissani, the Todra Gorge and the Dades Valley (night 4)', 'Aït Ben Haddou and Tizi n’Tichka to Marrakech (night 5)', 'Guided morning in Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '2 nights by the dunes', '7-day route', 'ferry', 'Tanger Med']) { const n = s.split(bad).length - 1; if (n) console.warn('CHECK:', bad, n); }
fs.writeFileSync(out, s);
console.log('written', s.length);
