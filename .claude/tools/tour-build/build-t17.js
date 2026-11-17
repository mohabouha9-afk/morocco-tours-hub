// Build tours/17-day-tangier-to-marrakech-grand-tour.html (URL kept): 17-day Tangier -> Marrakech, the deep south at an easy pace, no backtracking.
// Tangier (n1) -> Tetouan -> Chefchaouen x2 (n2-3) -> Volubilis/Meknes -> Fes x2 (n4-5) -> Ifrane, cedars -> Midelt (n6) -> Errachidia, Goulmima,
// Tinejdad -> Todra Gorge (n7) -> Alnif, Rissani -> Merzouga camp (n8) + hotel (n9) -> Taouz, off-road -> Ouzina (n10) -> Ramlia, Sidi Ali,
// Paris-Dakar tracks -> Zagora (n11) -> Draa Valley, Ouarzazate -> Aït Ben Haddou (n12) -> Tichka -> Marrakech x2 (n13-14) -> Essaouira x2 (n15-16)
// -> Marrakech or Essaouira airport.
// Template = the finished 8-day Imperial Cities page (patched from build-c21.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17; SERP read with WebSearch): only one 17-day private tour on page 1 starts in Tangier (Tangier, Chefchaouen, Sahara;
// 17 days / 16 nights); others start in Casablanca (Best Tours Morocco: Essaouira, Marrakech, Aït Ben Haddou, Dades, Merzouga; luxury 17-day with
// Fes + Essaouira; ~US$2,300–3,900 pp); G Adventures "Complete Morocco: Desert & Coast" 18 days Tangier -> Marrakech.
// Old page: Tangier, Chefchaouen (1), Fes x2, camp, Merzouga, Ouzina, Zagora, Ouarzazate, then back east to the Todra Gorge and a 360 km day to
// Marrakech, Essaouira as a round trip and a free day.
// Expert choices: reach the Todra Gorge on the way in (Fes -> Midelt -> Errachidia -> Goulmima oases -> Todra, OSRM Midelt -> Errachidia 141 km +
// er4-d4 159 km), so the deep south (Ouzina, Zagora, Draa) leads straight to Aït Ben Haddou and Marrakech; a Midelt night keeps every day at about
// 6 hours or less; Essaouira at the end, 2 nights, then the airport. Differs from the 13-day (adds Midelt, Todra, Essaouira) and the 21-day
// (no Erg Chigaga, Taroudant or Imlil).
// Roads: tm7-d1, tg3, mf7-d6, t17-d7 (new), er4-d4, er4-d3, cm7-d3a, cm7-d3b + cm7-d4 (off-road), hand-drawn Sidi Ali -> Zagora, t13-d9, er5-d5, essaouira.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/17-day-tangier-to-marrakech-grand-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/17-day-tangier-to-marrakech-grand-tour.html';
const NAME = '17-Day Morocco Grand Tour from Tangier to Marrakech';
const TITLE = '17-Day Morocco Grand Tour: Tangier to Marrakech | Private';
const DESC = 'Private 17-day Morocco tour from Tangier to Marrakech: Chefchaouen, Fes, a night at the Todra Gorge, two by the Merzouga dunes, off-road to Ouzina and Zagora, Aït Ben Haddou, Marrakech and two nights in Essaouira, with no day over about 6 hours.';
const HERO = 'merzouga-camel-caravan-guide.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="17 day Morocco tour, Morocco grand tour, Tangier to Marrakech, Todra Gorge, Merzouga, Ouzina, Zagora, Chefchaouen, Fes, Essaouira, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
 {
  t: "Tangier: arrival on the Strait",
  p: "Your driver-guide meets you at Tangier airport, the city port (ferries from Tarifa) or Tanger Med, with your name on a sign, at whatever hour you arrive. If there is time, the Kasbah, the old medina above the port and Cap Spartel, where the Atlantic meets the Mediterranean.",
  meta: [
   [
    "car",
    "Port or airport to your hotel, 20–45 minutes"
   ],
   [
    "bed",
    "Night: Tangier"
   ],
   [
    "food",
    "Breakfast from day 2"
   ]
  ]
 },
 {
  t: "Tangier → Tetouan → Chefchaouen",
  p: "East to Tetouan and its white Andalusian medina, then into the green hills of the Rif to Chefchaouen, the blue town, for the afternoon and sunset from the Spanish Mosque.",
  meta: [
   [
    "car",
    "About 125 km, about 2.5 hours on the road"
   ],
   [
    "bed",
    "Night: Chefchaouen"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Chefchaouen: a free day in the blue town",
  p: "A day at your own pace in the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring. Or a guided hike to the Akchour waterfalls in the Rif, on request.",
  meta: [
   [
    "car",
    "Free day; Akchour on request"
   ],
   [
    "bed",
    "Night: Chefchaouen"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Chefchaouen → Volubilis → Meknes → Fes",
  p: "South through the Rif to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, then Meknes for the great gate of Bab Mansour and Place el-Hedim. Your riad in the Fes medina by late afternoon.",
  meta: [
   [
    "car",
    "About 260 km, about 5 hours on the road"
   ],
   [
    "bed",
    "Night: Fes riad"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Fes: a guided day in the medina",
  p: "With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa, the outside of the Al-Qarawiyyin and a rooftop above the Chouara tanneries. Shops only if you ask.",
  meta: [
   [
    "car",
    "Day on foot in the medina"
   ],
   [
    "bed",
    "Night: Fes riad"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Fes → Ifrane → Azrou cedar forest → Midelt",
  p: "An easy day over the Middle Atlas: Ifrane, the alpine town with its lions and lakes, the cedar forest of Azrou with its Barbary macaques, and the high plateau to Midelt, the apple town under the snowy Jbel Ayachi.",
  meta: [
   [
    "car",
    "About 205 km, about 3.5 hours on the road"
   ],
   [
    "bed",
    "Night: Midelt"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Midelt → Errachidia → Goulmima → Todra Gorge",
  p: "Over the Tizi n’Talghamt pass to Errachidia, then west through the palm oases of Goulmima and the earthen Ksar El Khorbat at Tinejdad to the Todra Gorge. A walk between its 300 m walls in the late afternoon, when the day visitors have gone.",
  meta: [
   [
    "car",
    "About 300 km, about 5.5 hours on the road"
   ],
   [
    "bed",
    "Night: Todra Gorge"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Todra → Alnif → Rissani → Merzouga",
  p: "Along the Jebel Saghro to Alnif, famous for its trilobite fossils, and Rissani, the old caravan town with its market, to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.",
  meta: [
   [
    "car",
    "About 220 km, about 4.5 hours on the road"
   ],
   [
    "camel",
    "Camel ride about 1 hour"
   ],
   [
    "bed",
    "Night: desert camp"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "A full day around Merzouga by 4×4",
  p: "Sunrise and sandboarding on the dunes, then a whole day in the desert by 4×4: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the black stony plains and the lake of Dayet Srij after a wet winter. A hot shower and a quiet night in a hotel at the foot of the dunes.",
  meta: [
   [
    "car",
    "4×4 day around Merzouga"
   ],
   [
    "bed",
    "Night: Merzouga hotel"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Merzouga → Taouz → Ouzina",
  p: "South along the edge of the dunes to Taouz and its rock carvings, then off-road across the stony desert to Ouzina, a small oasis beside its own quiet dunes near the Algerian border. Sunset on the sand with almost no one else around.",
  meta: [
   [
    "car",
    "About 70 km, partly off-road"
   ],
   [
    "bed",
    "Night: Ouzina"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Ouzina → Ramlia → Sidi Ali → Zagora",
  p: "The old Paris–Dakar tracks west through the hamada: the dunes of Ramlia, the oasis of Tafraoute Sidi Ali and the Maider plain, then back on tarmac to Zagora at the edge of the Draa Valley.",
  meta: [
   [
    "car",
    "About 200 km, mostly desert track, about 6 hours"
   ],
   [
    "bed",
    "Night: Zagora"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Zagora → Draa Valley → Ouarzazate → Aït Ben Haddou",
  p: "North up the Draa Valley, a ribbon of palm groves and earthen villages, over the Tizi n’Tinifift pass to Ouarzazate, and on to Aït Ben Haddou, the earthen ksar on its hill, glowing at sunset from your guesthouse.",
  meta: [
   [
    "car",
    "About 190 km, about 4 hours on the road"
   ],
   [
    "bed",
    "Night: Aït Ben Haddou"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Aït Ben Haddou → Tizi n’Tichka → Marrakech",
  p: "An early walk up through the ksar to its old granary before the day visitors arrive. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to your riad in Marrakech by early afternoon, with the evening for the food stalls of Jemaa el-Fnaa.",
  meta: [
   [
    "car",
    "About 190 km, about 4 hours on the road"
   ],
   [
    "bed",
    "Night: Marrakech riad"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Marrakech: a guided day in the medina",
  p: "With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Mellah, the souks and the Ben Youssef Madrasa. The afternoon is free for a hammam, the Majorelle Garden or a rooftop café.",
  meta: [
   [
    "car",
    "Day on foot in the medina"
   ],
   [
    "bed",
    "Night: Marrakech riad"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Marrakech → Essaouira",
  p: "West across the argan plains to Essaouira on the Atlantic. The afternoon in its white and blue medina, the ramparts of the Skala with their old cannons and the fishing port with its blue boats, and grilled fish by the harbour if you like.",
  meta: [
   [
    "car",
    "About 180 km, about 3 hours on the road"
   ],
   [
    "bed",
    "Night: Essaouira"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Essaouira: a free day by the sea",
  p: "A day with no driving after the long road south: the Mellah and the Bayt Dakira house of memory, the woodworkers under the ramparts, a long walk on the beach, a surf or kite lesson, and a rooftop as the sun sets over the ocean.",
  meta: [
   [
    "car",
    "Free day"
   ],
   [
    "bed",
    "Night: Essaouira"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Essaouira → the airport",
  p: "A free morning by the sea, then your driver-guide takes you to Marrakech airport, about 3 hours, at the time of your flight, or to Essaouira airport, 20 minutes away, if you fly from there.",
  meta: [
   [
    "car",
    "Marrakech airport about 3 hours, Essaouira airport 20 min"
   ],
   [
    "flag",
    "Ends at the airport or your hotel"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 }
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan led over the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>17-Day Grand Tour from Tangier</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>17-Day Morocco Grand Tour from Tangier<span class="script">The Deep South at an Easy Pace</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Tangier$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Tangier → Marrakech</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>17 days / 16 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Seventeen days from Tangier to Marrakech, through the north, the Middle Atlas and the deep south, with no day over about 6 hours on the road. Tangier on the Strait, two nights in the blue town of Chefchaouen, Volubilis and Fes with a guided day in its medina, then the cedars of Azrou and a night in Midelt.</p>
          <p class="dt-lead">A quiet evening at the Todra Gorge, two nights by the dunes of Erg Chebbi, then off-road to the small dunes of Ouzina and along the old Paris–Dakar tracks to Zagora and the Draa Valley. Aït Ben Haddou at sunset, Marrakech with a local guide and two slow days in Essaouira to finish. Your own 4×4 and driver-guide all the way.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Easy pace</dt><dd>No day over 6 hours</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Tangier → Marrakech$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Tangier and the blue town of Chefchaouen',
  'A guided day in the Fes medina',
  'The cedar forest and its macaques',
  'An evening at the Todra Gorge',
  'Sunset camel ride and a night in the dunes',
  'Off-road to the dunes of Ouzina',
  'The Draa Valley and its palm groves',
  'Sunset at Aït Ben Haddou',
  'Two days in Essaouira by the sea',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-blue-steps.jpg', 'Blue steps in Chefchaouen', 800, 900],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina', 975, 1300],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['grand-desert-plateau.jpg', 'The open desert of the deep south', 1800, 1200],
  ['ait-ben-haddou-village.jpg', 'The earthen ksar of Aït Ben Haddou', 1600, 1066],
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira', 1080, 1350],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Tangier port or airport pick-up, any hour',
  '16 nights as in the table below',
  '16 breakfasts and 7 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Passport handy near the Algerian border',
  'Winter desert nights are cold: ask for a heated tent',
  'Small bag for the camp; luggage stays in the car',
  'Days 10–11 are bumpy desert tracks',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Oasis Museum, Ksar El Khorbat:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Fes, the Todra Gorge, Merzouga, Ouzina, Zagora and Essaouira, about 2,300 km in 17 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Essaouira,Morocco&amp;waypoints=Chefchaouen,Morocco%7CFes,Morocco%7CMidelt,Morocco%7CTinghir,Morocco%7CMerzouga,Morocco%7CZagora,Morocco%7CAit+Ben+Haddou,Morocco%7CMarrakech,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const tng = [A('https://www.tripadvisor.com/Hotel_Review-g293737-d8672446-Reviews-Hilton_Garden_Inn_Tanger_City_Center-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Hilton Garden Inn'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d7118909-Reviews-Grand_Hotel_Villa_de_France-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Villa de France'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d25109105-Reviews-Fairmont_Tazi_Palace_Tangier-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Fairmont Tazi Palace')];
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const mid = [A('https://www.tripadvisor.com/Hotel_Review-g580098-d12912047-Reviews-Kasbah_Izoran-Midelt_Meknes_Tafilalet_Region.html', 'Kasbah Izoran'), A('https://www.tripadvisor.com/Hotel_Review-g580098-d11868377-Reviews-Villa_Pomme_d_Or-Midelt_Meknes_Tafilalet_Region.html', 'Villa Pomme d’Or'), A('https://www.tripadvisor.com/Hotel_Review-g580098-d522341-Reviews-Kasbah_Asmaa-Midelt_Meknes_Tafilalet_Region.html', 'Kasbah Asmaa')];
const zag = [A('https://www.tripadvisor.com/Hotel_Review-g304023-d3161742-Reviews-Kasbah_Ziwana-Zagora_Souss_Massa.html', 'Kasbah Ziwana'), A('https://www.tripadvisor.com/Hotel_Review-g304023-d1209859-Reviews-Riad_Lamane-Zagora_Souss_Massa.html', 'Riad Lamane'), A('https://www.booking.com/hotel/ma/kasbah-sirocco-zagora.html', 'Kasbah Sirocco')];
const chg = [A('https://www.tripadvisor.com/Hotel_Review-g12912000-d15122198-Reviews-Camp_Al_Koutban-El_Gouera_Souss_Massa.html', 'Camp Al Koutban'), A('https://www.tripadvisor.com/Hotel_Review-g12912000-d17613059-Reviews-Desert_Luxury_Camp_Erg_Chigaga-El_Gouera_Souss_Massa.html', 'Desert Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g664990-d1965447-Reviews-Erg_Chigaga_Luxury_Desert_Camp-M_Hamid_Souss_Massa.html', 'Erg Chigaga Luxury Camp')];
const tar = [A('https://www.travelocity.com/Taroudannt-Hotels-Riad-Taroudant.h3103259.Hotel-Information', 'Riad Taroudant'), A('https://nz.trip.com/hotels/taroudant-hotel-detail-3896349/domaine-villate-limoune', 'Le Domaine Limoune'), A('https://www.expedia.com/Taroudannt-Hotels-La-Gazelle-DOr.h9674061.Hotel-Information', 'La Gazelle d’Or')];
const iml = [A('https://www.kayak.com/Imlil-Hotels-Riad-Atlas-Toubkal.502155.ksp', 'Riad Atlas Toubkal'), A('https://www.booking.com/hotel/ma/dar-imlil.html', 'Dar Imlil'), A('https://www.kasbahdutoubkal.com/', 'Kasbah du Toubkal')];
const tod = [A('https://www.tripadvisor.com/Hotel_Review-g480211-d2078710-Reviews-Guesthouse_Panorama_Todra-Tinerhir_Souss_Massa.html', 'Panorama Todra'), A('https://www.tripadvisor.com/Hotel_Review-g480211-d7079922-Reviews-La_Petite_Gorge-Tinerhir_Souss_Massa.html', 'La Petite Gorge'), A('https://www.tripadvisor.com/Hotel_Review-g480211-d23891031-Reviews-Auberge_Le_Festival_Todra_Gorge-Tinerhir_Souss_Massa.html', 'Auberge Le Festival')];
const ouz = [A('https://www.tripadvisor.com/Hotel_Review-g3656510-d25429219-Reviews-Auberge_Erg_Ouzina-Ouzina_Meknes_Tafilalet_Region.html', 'Auberge Erg Ouzina'), A('https://www.tripadvisor.com/Hotel_Review-g3656510-d6851049-Reviews-Ouzina_Rimal-Ouzina_Meknes_Tafilalet_Region.html', 'Ouzina Rimal'), A('https://www.tripadvisor.com/Hotel_Review-g3656510-d3224434-Reviews-Auberge_Hotel_Porte_De_Sahara_Ouzina-Ouzina_Meknes_Tafilalet_Region.html', 'Porte de Sahara')];
const oua = [A('https://www.tripadvisor.com/Hotel_Review-g580099-d650356-Reviews-Dar_Beldi_Maison_D_Hotes-Oualidia_Casablanca_Settat.html', 'Dar Beldi'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d524223-Reviews-Hotel_L_Hippocampe-Oualidia_Casablanca_Settat.html', 'Hôtel L’Hippocampe'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d630259-Reviews-La_Sultana_Oualidia-Oualidia_Casablanca_Settat.html', 'La Sultana Oualidia')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Tangier', tng], ['2–3: Chef&shy;chaouen', chf], ['4–5: Fes', fes], ['6: Midelt', mid], ['7: Todra Gorge', tod], ['8: Desert camp', camp], ['9: Merzouga', mzh], ['10: Ouzina', ouz], ['11: Zagora', zag], ['12: Aït Ben Haddou', abh], ['13–14: Marra&shy;kech', mar], ['15–16: Essaouira', ess]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want the deep south without long drives',
  'Ferry travellers arriving in Tangier from Spain',
  'Desert lovers who want quiet dunes away from the crowds',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have two weeks? The <a href="13-day-tangier-to-marrakech-tour.html">13-day tour from Tangier</a> keeps Ouzina and Zagora',
  'Off-road tracks worry you? The <a href="12-days-grand-morocco.html">12-day Grand Morocco</a> stays on paved roads',
  'Want Erg Chigaga too? The <a href="21-day-complete-morocco-tour.html">21-day Complete Morocco</a> adds it and Taroudant',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 't17-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How long are the driving days?', 'No day is over about 6 hours on the road. A night in Midelt splits the usual 470 km Fes to Merzouga drive, the Todra Gorge comes on the way in, and the longest stretch, Ouzina to Zagora on desert tracks, has stops whenever you want.'],
  ['How rough are the off-road days?', 'Day 10 has a short stretch of desert track to Ouzina and day 11 about 200 km of tracks to Zagora, bumpy but safe in our 4×4. If you prefer paved roads, we can go from Merzouga to Zagora by Alnif and N’Kob instead.'],
  ['Why sleep at the Todra Gorge?', 'Most tours stop at the gorge at midday, when it is busy. Sleeping there lets you walk it in the late afternoon and early morning, when the walls glow and it is quiet, and it splits the road to the desert into two easy days.'],
  ['Is it safe near the Algerian border?', 'Yes. Ouzina and the tracks to Zagora are travelled by tourists and locals every day; there are police checkpoints where your driver-guide shows your passports. Keep them handy on days 10 and 11.'],
  ['We arrive by ferry. Can you meet us at the port?', 'Yes. We meet you at the Tangier city port for the ferries from Tarifa or at Tanger Med for Algeciras, follow the crossing and wait if it is late. Tell us the ferry company and time when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp with heated tents',
  'A guided hike to the Akchour waterfalls',
  'Quad biking in the Merzouga dunes',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'A <a href="marrakech-cooking-class.html">cooking class</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2017-Day%20Morocco%20Grand%20Tour%20from%20Tangier.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>17-Day Grand Tour</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 17-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 't17-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier (night 1)', 'Tetouan and Chefchaouen (nights 2–3)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 4–5)', 'Ifrane, the Azrou cedar forest and Midelt (night 6)', 'Errachidia, Goulmima and the Todra Gorge (night 7)', 'Alnif, Rissani and a camel ride to a Merzouga camp (night 8)', 'A day around Merzouga with a nomad family (night 9)', 'Taouz and Ouzina (night 10)', 'Sidi Ali and the Paris–Dakar tracks to Zagora (night 11)', 'The Draa Valley and Aït Ben Haddou (night 12)', 'Marrakech with a guided day (nights 13–14)', 'Essaouira (nights 15–16)', 'Marrakech or Essaouira airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca round trip', 'Oualidia', 'Erg Chigaga', 'Taroudant', 'Imlil', 'Four Royal Cities', '4 imperial cities', 'Imperial Cities &amp; Sahara</span>', 'Casa → Marrakech']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
