// Build tours/7-day-morocco-tour-from-casablanca.html (Casablanca x1 + Hassan II Mosque -> Rabat -> Chefchaouen -> Volubilis/Meknes -> Fes x2
// -> Merzouga camp -> Rissani -> Todra -> Dades -> Valley of Roses -> Aït Ben Haddou -> Tizi n'Tichka -> Marrakech, ends day 7).
// Template = the finished 7-day Tangier -> Marrakech page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "casablanca to fes" 480, "7 day tour from casablanca" 70, "morocco tour from casablanca" 50,
// "morocco tours from casablanca" 40, "casablanca desert tour" 30, "casablanca to merzouga" 30. SERP "7 day Morocco tour from Casablanca to
// Marrakech": Tripadvisor "Private 7 Days Morocco Tour from Casablanca to Marrakech" (5.0 / 112) = D1 arrival Casablanca, D2 Rabat -> Chefchaouen,
// D3 Volubilis + Meknes -> Fes, D4 guided Fes, D5 Ifrane/Azrou -> Merzouga camp (private bathrooms), D6 Rissani/Erfoud -> Todra -> Dades,
// D7 Rose Valley -> Aït Ben Haddou -> Marrakech; reviewer tips: make sure the camp has other guests (one couple were alone, no music by the
// fire), some city hotels mediocre. Viator 7-day (Rabat, Meknes, Volubilis, Fes, Marrakech x2, back to Casablanca, no desert, no reviews),
// tourradar 7-day Casablanca/Chefchaouen. Expert choices: follow the 5.0 / 112 structure; the camp is chosen for its evening music (a quieter
// camp on request); first night in Casablanca so any flight time works, Hassan II Mosque visit on arrival day or the next morning (Sat-Thu).
// Roads = the c9 map (ic1, c9-d2, tg3, fm4-d1, fm4-d2, fm4-d3).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/7-day-morocco-tour-from-casablanca.html';
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

const URL = 'https://moroccotourshub.com/tours/7-day-morocco-tour-from-casablanca.html';
const NAME = '7-Day Morocco Tour from Casablanca to Marrakech';
const TITLE = '7-Day Morocco Tour from Casablanca to Marrakech | Private';
const DESC = 'A private 7-day Morocco tour from Casablanca to Marrakech: the Hassan II Mosque, Rabat, blue Chefchaouen, Volubilis, a guided day in Fes, a night in the Merzouga dunes, the Todra and Dades gorges and Aït Ben Haddou.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="7 day tour from Casablanca, Morocco tours from Casablanca, Casablanca to Fes, Casablanca to Marrakech, Chefchaouen, Sahara desert tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Arrival in Casablanca and the Hassan II Mosque',
    p: 'Your driver-guide meets you at Casablanca airport at any hour, or at your hotel. If you land in time, a guided visit inside the Hassan II Mosque, built over the Atlantic, and a walk on the Corniche at sunset. Otherwise we see the mosque the next morning on the way north.',
    meta: [['car', 'About 30 km from the airport, 40 minutes'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast from day 2']] },
  { t: 'Casablanca → Rabat → Chefchaouen',
    p: 'North by motorway to Rabat: the blue-and-white lanes of the Kasbah of the Oudayas, the Hassan Tower and the royal Mausoleum of Mohammed V. Then inland into the green Rif hills to Chefchaouen, the blue town, for the evening.',
    meta: [['car', 'About 340 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'An early walk in the blue lanes before the day visitors arrive, then south to Volubilis, the Roman town with its mosaics and triumphal arch, and Meknes, with the great gate of Bab Mansour. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane, the cedar forest of Azrou with its Barbary macaques, lunch in Midelt and the palm gorges of the Ziz Valley to Erg Chebbi. A camel ride into the dunes for sunset, dinner and drums by the fire in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding on the dunes, back by camel or 4×4, then Rissani, the old caravan town with its market, and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to Marrakech in the early evening, at your hotel or the airport.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Ends at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on Erg Chebbi at sunset" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>7-Day Tour from Casablanca</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Tangier</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Casablanca</span>', 'chip');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>7-Day Morocco Tour from Casablanca<span class="script">The Classic Loop in One Week</span></h1>', 'h1');
rep('<small>Route</small><b>Tangier → Marrakech</b>', '<small>Route</small><b>Casablanca → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">One week from Casablanca to Marrakech, taking in the best of Morocco in the right order. The Hassan II Mosque on the ocean, Rabat, the blue town of Chefchaouen and the Roman ruins of Volubilis, then two nights in Fes with a guided day in its medina.</p>
          <p class="dt-lead">Over the Middle Atlas to a camp in the dunes of Erg Chebbi, the Todra and Dades gorges, and Aït Ben Haddou on the way over the High Atlas to Marrakech. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Tangier → Marrakech</dd>', '<dd>Casa → Marrakech</dd>', 'kf1');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Desert night</dt><dd>Camp in the dunes</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'The Kasbah of the Oudayas in Rabat',
  'An evening in blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['casablanca.webp', 'The Hassan II Mosque in Casablanca at dusk', 4032, 3024],
  ['chefchaouen-blue-steps.jpg', 'Blue steps in the medina of Chefchaouen', 800, 900],
  ['fes-guide.jpg', 'A local guide in the Fes medina', 1170, 1463],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['ait-ben-haddou-terrace.jpg', 'Aït Ben Haddou seen from a terrace', 1500, 1000],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide for the Fes medina',
  'Pick-up at Casablanca airport or hotel',
  'Drop-off at your Marrakech hotel or airport',
  '6 nights as in the table below',
  '6 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight time',
  'The Hassan II Mosque is closed to visits on Fridays',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and Atlas nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by Chefchaouen, Fes and the Sahara, about 1,700 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Casa&shy;blanca', cas], ['2: Chef&shy;chaouen', chf], ['3–4: Fes', fes], ['5: Desert camp', camp], ['6: Dades Valley', dad]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying into Casablanca and out of Marrakech',
  'First-timers with one week who want the classic route',
  'Anyone who wants the north, Fes and the desert together',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want a slower pace? The <a href="9-day-morocco-private-tour-from-casablanca.html">9-day tour from Casablanca</a> adds a free day in Chefchaouen and a second desert night',
  'Flying home from Casablanca? The <a href="10-day-morocco-tour-casablanca-round.html">10-day Casablanca round tour</a> brings you back to the airport',
  'Prefer cities to the blue town? The <a href="8-day-morocco-imperial-cities-sahara-tour.html">8-day Imperial Cities &amp; Sahara tour</a> sleeps in Rabat instead of Chefchaouen',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'c7-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is one week enough for this route?', 'Yes, for the classic loop, if you don’t mind a few long road days. Two nights in Fes give you one full day without driving. If you can add two days, the 9-day tour adds a free day in Chefchaouen and a second night by the dunes.'],
  ['When can we see the Hassan II Mosque?', 'Guided visits run Saturday to Thursday, several times a day; the mosque is closed to visitors on Fridays. If you land in the morning we go on day 1; if you land late or on a Friday, we see it on the way north the next morning.'],
  ['Will the desert camp be lively?', 'Our camps have music and drums around the fire most evenings, with other guests at dinner. If you prefer a quiet camp, or a small one far from the others, tell us when you book.'],
  ['Which days are the long drives?', 'Day 5, Fes to Merzouga, about eight hours with stops, and day 7 over the High Atlas, about six. Day 2 is about five hours with a long stop in Rabat, and day 4 has no driving.'],
  ['Can we start at Casablanca airport after a night flight?', 'Yes. Your driver-guide waits in arrivals with your name and follows any delay. Day 1 is kept light on purpose: a short drive to your hotel, the mosque if you feel up to it, and an early night.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in Chefchaouen',
  'Upgrade to a luxury camp with heated tents',
  'A night at Aït Ben Haddou on the way',
  'Extra days in Marrakech with a <a href="marrakech-medina-guided-tour.html">guided medina walk</a>',
  'A <a href="marrakech-hot-air-balloon-ride.html">balloon flight</a> over Marrakech at sunrise',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

rep('<span>Flights and ferry tickets</span>', '<span>International flights</span>', 'not incl');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%207-Day%20Morocco%20Tour%20from%20Casablanca%20to%20Marrakech.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>7-Day Tour from Casablanca</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'c7-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca airport pick-up and the Hassan II Mosque (night 1)', 'Rabat and Chefchaouen (night 2)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 3–4)', 'Ifrane, Midelt and a camel ride to a desert camp (night 5)', 'Rissani, the Todra Gorge and the Dades Valley (night 6)', 'Aït Ben Haddou, Tizi n’Tichka and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '2 nights by the dunes', 'ferry', 'Ferry', 'Tanger Med']) { const n = s.split(bad).length - 1; if (n) console.warn('CHECK:', bad, n); }
fs.writeFileSync(out, s);
console.log('written', s.length);
