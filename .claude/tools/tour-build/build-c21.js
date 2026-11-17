// Build tours/21-day-complete-morocco-tour.html (URL kept): 21-day Complete Morocco, Tangier -> Marrakech, every region, no backtracking.
// Tangier x2 (n1-2, Asilah + Cap Spartel day) -> Tetouan -> Chefchaouen x2 (n3-4) -> Volubilis/Meknes -> Fes x2 (n5-6) -> Ifrane, cedars -> Midelt (n7)
// -> Ziz -> Merzouga camp (n8) + hotel (n9) -> Todra -> Dades x2 (n10-11) -> Skoura -> Aït Ben Haddou (n12) -> Ouarzazate, Draa -> Zagora (n13)
// -> M'Hamid, off-road -> Erg Chigaga camp (n14) -> Iriqui, Foum Zguid, Taznakht, Taliouine -> Taroudant (n15) -> Agadir, coast road -> Essaouira x2 (n16-17)
// -> Imlil, High Atlas (n18) -> Marrakech x2 (n19-20) -> airport.
// Template = the finished 8-day Imperial Cities page (patched from build-c16.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17; SERP read with WebSearch): no ready-made 21-day private tour on page 1 has both Merzouga and Erg Chigaga (Atlas Outdoor's
// 3-week self-drive does: Chefchaouen, Merzouga, Erg Chegaga by jeep, the Great South, Essaouira); TourRadar 18-day private Casablanca loop;
// Fora "Ideal Morocco Grand Tour 21 days"; Journey Beyond Travel Erg Chigaga itinerary (Draa Valley, M'hamid). Old page: Tangier -> Chefchaouen (1)
// -> Fes -> Midelt -> Merzouga -> Ouzina -> Zagora -> Ouarzazate -> Dades x2 -> back to Ouarzazate -> Marrakech -> Essaouira x3 -> back to Marrakech,
// with four free days and two roads driven twice.
// Expert choices: use the extra week for what shorter tours skip (Tangier + Asilah, a Midelt night, a free day in the Dades, Erg Chigaga after
// Merzouga, Taroudant and the saffron country, a High Atlas night in Imlil) and route it so nothing doubles back: the deep south exits west by
// Foum Zguid and Taroudant, then the coast road to Essaouira, then the mountains to Marrakech. Ouzina dropped (Erg Chigaga gives the wild dunes;
// the 13-day tour from Tangier keeps Ouzina).
// OSRM: tm7-d1 ~125, tg3 ~260, mf7-d6 ~205, rr3-d2 ~260, fm4-d2 ~270, ag5-d2 175, t13-d9 187, ec4-d2 98 (+ ~150 off-road), c21-d15 324 (Foum Zguid ->
// Taznakht -> Taliouine -> Taroudant), c21-d16 82, ag12-d12 175, c21-d18 248 (Essaouira -> Imlil), atlas 65 = about 2,800 km with the day trips.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/21-day-complete-morocco-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/21-day-complete-morocco-tour.html';
const NAME = '21-Day Complete Morocco Tour from Tangier to Marrakech';
const TITLE = '21-Day Complete Morocco Tour: Tangier to Marrakech | Private';
const DESC = 'Private 21-day Morocco tour from Tangier to Marrakech: Chefchaouen, Fes, two deserts (Merzouga and Erg Chigaga), the Dades and Draa valleys, Aït Ben Haddou, Taroudant, Essaouira and a night in the High Atlas. Every region, no road driven twice.';
const HERO = 'desert-camel-acacia-tree.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="21 day Morocco tour, 3 week Morocco itinerary, complete Morocco tour, Tangier to Marrakech, Erg Chigaga, Merzouga, Chefchaouen, Fes, Essaouira, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
 {
  t: "Tangier: arrival on the Strait",
  p: "Your driver-guide meets you at Tangier airport, the city port (ferries from Tarifa) or Tanger Med, with your name on a sign, at whatever hour you arrive. If there is time, a first walk in the Kasbah and the old medina above the port, with Spain across the water.",
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
  t: "Tangier: Asilah and Cap Spartel",
  p: "Down the coast to Asilah, a whitewashed fishing town with murals on its walls and ramparts on the sea, then back by Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules. The evening at a café in the Kasbah.",
  meta: [
   [
    "car",
    "About 110 km in the day"
   ],
   [
    "bed",
    "Night: Tangier"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Tangier → Tetouan → Chefchaouen",
  p: "East to Tetouan and its white Andalusian medina, a UNESCO site, then into the green hills of the Rif to Chefchaouen, the blue town, for the late afternoon and sunset from the Spanish Mosque.",
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
  p: "A day at your own pace in the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring. Or a guided hike to the Akchour waterfalls and the God’s Bridge rock arch in the Rif, on request.",
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
  t: "Midelt → Ziz Valley → Merzouga",
  p: "Through the Tunnel du Légionnaire and down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi in the afternoon. Your big bags stay in the car and you ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.",
  meta: [
   [
    "car",
    "About 260 km, about 5 hours on the road"
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
  p: "Sunrise and sandboarding on the dunes, then a whole day in the desert by 4×4: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the market of Rissani and the lake of Dayet Srij after a wet winter. A hot shower and a quiet night in a hotel at the foot of the dunes.",
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
  t: "Merzouga → Todra Gorge → Dades Valley",
  p: "Along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge, then on to the Dades Valley for two nights among the red cliffs and kasbahs.",
  meta: [
   [
    "car",
    "About 270 km, about 5 hours on the road"
   ],
   [
    "bed",
    "Night: Dades Valley"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Dades Valley: a slow day in the gorge",
  p: "No long drive today: the hairpin bends of the Tissadrine road, a walk with your guide through the Monkey Fingers rocks and the side canyons, lunch with a family in a village, or simply a book on the terrace above the river.",
  meta: [
   [
    "car",
    "Short drives and a walk"
   ],
   [
    "bed",
    "Night: Dades Valley"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Dades → Valley of Roses → Skoura → Aït Ben Haddou",
  p: "West on the Road of a Thousand Kasbahs: the Valley of Roses, the palm oasis of Skoura and its Kasbah Amridil, and Ouarzazate. In the late afternoon, Aït Ben Haddou, the earthen ksar on its hill, glowing at sunset from your guesthouse.",
  meta: [
   [
    "car",
    "About 175 km, about 4 hours on the road"
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
  t: "Aït Ben Haddou → Ouarzazate → Draa Valley → Zagora",
  p: "An early walk up through the ksar before the day visitors arrive. South over the Tizi n’Tinifift pass and down the Draa Valley, a ribbon of palm groves and earthen villages, to Zagora on the edge of the desert.",
  meta: [
   [
    "car",
    "About 190 km, about 4 hours on the road"
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
  t: "Zagora → Tamegroute → M’Hamid → Erg Chigaga",
  p: "The green pottery of Tamegroute and its old Koranic library, lunch in M’Hamid at the end of the road, then about 50 km off-road by 4×4 across the stony desert to the dunes of Erg Chigaga, far from any road. Sunset camel ride and a night in a quiet camp.",
  meta: [
   [
    "car",
    "About 100 km by road + 50 km off-road"
   ],
   [
    "camel",
    "Camel ride at sunset"
   ],
   [
    "bed",
    "Night: Erg Chigaga camp"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Erg Chigaga → Iriqui → Foum Zguid → Taliouine → Taroudant",
  p: "Sunrise on the dunes, then the old Paris–Dakar track across the dry lake of Iriqui to Foum Zguid, back on tarmac through Taznakht, the carpet town, and the saffron fields of Taliouine. Taroudant by evening, inside its golden ramparts.",
  meta: [
   [
    "car",
    "About 100 km off-road + 325 km road, about 8 hours"
   ],
   [
    "bed",
    "Night: Taroudant"
   ],
   [
    "food",
    "Breakfast"
   ]
  ]
 },
 {
  t: "Taroudant → Agadir → the coast road → Essaouira",
  p: "A morning walk on the ramparts and through the souks of Taroudant, the “little Marrakech”, then west to the Atlantic and north on the coast road past the surf beaches of Taghazout and Imsouane and the argan trees, to Essaouira.",
  meta: [
   [
    "car",
    "About 260 km, about 4.5 hours on the road"
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
  p: "A day with no driving: the ramparts of the Skala, the fishing port and its blue boats, the Mellah and the Bayt Dakira house of memory, a long walk on the beach or a surf lesson, and grilled fish by the harbour.",
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
  t: "Essaouira → Imlil, High Atlas",
  p: "East across the argan plains, around Marrakech and up into the High Atlas by the Moulay Brahim gorge and Asni to Imlil, at 1,740 m under Jbel Toubkal. A short walk through the walnut terraces before dinner in a mountain guesthouse.",
  meta: [
   [
    "car",
    "About 250 km, about 4 hours on the road"
   ],
   [
    "bed",
    "Night: Imlil"
   ],
   [
    "food",
    "Breakfast & dinner"
   ]
  ]
 },
 {
  t: "Imlil → Marrakech",
  p: "A morning walk with a local guide to the Berber village of Aremd or the Tizi n’Mzik pass, set to your pace. Down to Marrakech in the afternoon, with the evening free for the food stalls of Jemaa el-Fnaa.",
  meta: [
   [
    "car",
    "About 65 km, about 1.5 hours on the road"
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
  t: "Marrakech → the airport",
  p: "A free morning in Marrakech, then your driver-guide takes you to Marrakech airport at the time of your flight, or to Casablanca airport by the motorway, about 3 hours, if you fly home from there.",
  meta: [
   [
    "car",
    "Marrakech airport 20 min, Casablanca about 3 hours"
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
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels resting under an acacia tree in the desert" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>21-Day Complete Morocco</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>21-Day Complete Morocco Tour<span class="script">Every Region, No Road Twice</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Tangier$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Tangier → Marrakech</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>21 days / 20 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Three weeks from Tangier to Marrakech, the whole of Morocco without a road driven twice. The Strait, Asilah and Cap Spartel, two nights in the blue town of Chefchaouen, Volubilis and Fes with a guided day in its medina, then over the cedar-covered Middle Atlas to the Sahara.</p>
          <p class="dt-lead">Two deserts, the golden dunes of Merzouga and the remote dunes of Erg Chigaga, the Todra and Dades gorges, Aït Ben Haddou and the Draa Valley, then west by Taroudant to the Atlantic, two slow days in Essaouira, a night in the High Atlas and Marrakech with a local guide. Your own 4×4 and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Two deserts</dt><dd>Merzouga, Erg Chigaga</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Tangier → Marrakech$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Asilah, Tangier and Cap Spartel',
  'Two days in blue Chefchaouen',
  'A guided day in the Fes medina',
  'Sunset camels in two deserts',
  'Off-road to the Erg Chigaga dunes',
  'The Todra and Dades gorges',
  'Sunset at Aït Ben Haddou',
  'Two days in Essaouira by the sea',
  'A night in the High Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-tangier-lighthouse.jpg', 'The lighthouse at Cap Spartel near Tangier', 1300, 866],
  ['fes-medina.jpg', 'A lane in the Fes medina', 1170, 1560],
  ['desert-acacia-camels.jpg', 'Camels and acacias in the deep south', 1600, 1066],
  ['todra-gorge-bridge.jpg', 'The bridge into the Todra Gorge', 1600, 1066],
  ['essaouira-skala-port.jpg', 'The Skala ramparts above the port of Essaouira', 1000, 667],
  ['atlas-berber-village.jpg', 'A Berber village in the High Atlas', 1500, 1000],
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
  '20 nights as in the table below',
  '20 breakfasts and 8 dinners',
  'Two camel rides, sandboarding, 4×4 days',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Imlil nights are cool: bring a warm layer',
  'Winter desert nights are cold: ask for a heated tent',
  'Small bag for the camp; luggage stays in the car',
  'Day 15 is long, partly off-road',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Caves of Hercules:</b> small fee',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Tamegroute library:</b> small donation',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Fes, two deserts, Taroudant, the coast and the High Atlas, about 2,800 km in 21 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Chefchaouen,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CBoumalne+Dades,Morocco%7CZagora,Morocco%7CTaroudant,Morocco%7CEssaouira,Morocco%7CImlil,Morocco&amp;travelmode=driving"', 'mapnote');

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
const oua = [A('https://www.tripadvisor.com/Hotel_Review-g580099-d650356-Reviews-Dar_Beldi_Maison_D_Hotes-Oualidia_Casablanca_Settat.html', 'Dar Beldi'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d524223-Reviews-Hotel_L_Hippocampe-Oualidia_Casablanca_Settat.html', 'Hôtel L’Hippocampe'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d630259-Reviews-La_Sultana_Oualidia-Oualidia_Casablanca_Settat.html', 'La Sultana Oualidia')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1–2: Tangier', tng], ['3–4: Chef&shy;chaouen', chf], ['5–6: Fes', fes], ['7: Midelt', mid], ['8: Merzouga camp', camp], ['9: Merzouga', mzh], ['10–11: Dades Valley', dad], ['12: Aït Ben Haddou', abh], ['13: Zagora', zag], ['14: Erg Chigaga camp', chg], ['15: Taroudant', tar], ['16–17: Essaouira', ess], ['18: Imlil', iml], ['19–20: Marra&shy;kech', mar]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with three weeks who want every region',
  'Desert lovers: two dune seas, two camps',
  'Ferry travellers arriving in Tangier from Spain',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have two weeks? The <a href="13-day-tangier-to-marrakech-tour.html">13-day tour from Tangier</a> keeps the north and the deep south',
  'Off-road tracks worry you? The <a href="12-days-grand-morocco.html">12-day Grand Morocco</a> stays on paved roads',
  'Flying in to Casablanca? The <a href="16-day-complete-morocco-tour.html">16-day Complete Morocco</a> is a loop from there',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'c21-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is three weeks too long for Morocco?', 'Not with this pace. Two nights in Tangier, Chefchaouen, Fes, the Dades, Essaouira and Marrakech, two short mountain days and two free days break up the long drives, so you see every region without feeling you live in the car.'],
  ['Why both Merzouga and Erg Chigaga?', 'They are two different deserts. Merzouga has the tallest golden dunes and is reached by road; Erg Chigaga is lower but remote, about 50 km off-road with no village in sight. On a three-week trip you get the classic and the wild one.'],
  ['How rough are the off-road days?', 'Day 14 has about 50 km and day 15 about 100 km of desert track, bumpy but safe in our 4×4, with stops whenever you want. Day 15 is the longest day of the tour, about 8 hours, before an easy morning in Taroudant.'],
  ['Why Taroudant and the coast instead of driving back to Marrakech?', 'Leaving the deep south to the west, by Foum Zguid, Taliouine and Taroudant, means no road is driven twice. It also brings you to the Atlantic, so Essaouira comes on the way instead of as a return trip from Marrakech.'],
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
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2021-Day%20Complete%20Morocco%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>21-Day Complete Morocco</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 21-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'c21-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier, Asilah and Cap Spartel (nights 1–2)', 'Tetouan and Chefchaouen (nights 3–4)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 5–6)', 'Ifrane, the Azrou cedar forest and Midelt (night 7)', 'Ziz Valley and a camel ride to a Merzouga camp (night 8)', 'A day around Merzouga with a nomad family (night 9)', 'Todra Gorge and the Dades Valley (nights 10–11)', 'Skoura and Aït Ben Haddou (night 12)', 'The Draa Valley and Zagora (night 13)', 'Off-road to an Erg Chigaga camp (night 14)', 'Iriqui, Taliouine and Taroudant (night 15)', 'The coast road to Essaouira (nights 16–17)', 'Imlil in the High Atlas (night 18)', 'Marrakech with a guided day (nights 19–20)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca round trip', 'Oualidia', 'Four Royal Cities', '4 imperial cities', 'Imperial Cities &amp; Sahara</span>', 'Casa → Marrakech']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
