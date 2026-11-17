// Build tours/16-day-complete-morocco-tour.html (URL kept): 16-day Complete Morocco, Casablanca round trip with the north coast.
// Casablanca (n1) -> Rabat -> Asilah -> Tangier (n2) -> Cap Spartel, Tetouan -> Chefchaouen x2 (n3-4) -> Volubilis/Meknes -> Fes x2 (n5-6)
// -> Merzouga camp (n7) + hotel (n8) -> Todra -> Dades (n9) -> Skoura -> Aït Ben Haddou (n10) -> Marrakech x2 (n11-12) -> Essaouira x2 (n13-14)
// -> Safi -> Oualidia (n15) -> El Jadida -> Casablanca airport.
// Template = the finished 8-day Imperial Cities page (derived from build-bm14.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17; SERP read with WebSearch): Expedia 16-day private tour from Tangier (Chefchaouen, Fes, Midelt, Ouarzazate, Aït Ben Haddou,
// Marrakech, Essaouira, Rabat, back to Tangier); TourRadar private 16-day from Casablanca (~US$3,462 pp: Marrakech, Ouarzazate, Merzouga,
// Chefchaouen, Essaouira); a Casablanca-start 16-day with 1 night Casablanca, 2 Tangier, 2 Chefchaouen, 2 Fes, 2 Sahara, 1 Dades, 3 Marrakech,
// 1 Essaouira and local guides in each city; Agate Travel tailor-made (from US$6,599; day 15 Essaouira -> Casablanca + Hassan II Mosque).
// Old page: Casablanca, Tangier, Chefchaouen (1), Fes x2, camp, Merzouga, Dades, Ouarzazate, Marrakech x2, Essaouira back to Marrakech, Casablanca x2
// with a free day — Essaouira -> Marrakech -> Casablanca doubles back.
// Expert choices: what the 14-day Best of Morocco does not have = the north coast (Asilah, Tangier, Cap Spartel) and a sunset night at Aït Ben Haddou;
// then the same coast finish (Essaouira x2, Oualidia) so the loop never doubles back and the last day is under 3 hours.
// OSRM: ic1 ~90, t14-a 252 (Rabat-Asilah-Tangier), m7t-d7 ~125, tg3 ~260, fm4-d1 ~470, fm4-d2 ~270, ag5-d2 175, mf7-d1 ~190, essaouira 182,
// t14-c 190, bm14-d14 225 = about 2,500 km.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/16-day-complete-morocco-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/16-day-complete-morocco-tour.html';
const NAME = '16-Day Complete Morocco Tour from Casablanca';
const TITLE = '16-Day Complete Morocco Tour from Casablanca | Private';
const DESC = 'Private 16-day Morocco tour from Casablanca and back: Asilah and Tangier, two nights in Chefchaouen and Fes, two by the Merzouga dunes, the Dades Valley, a night at Aït Ben Haddou, Marrakech, two nights in Essaouira and the Oualidia lagoon.';
const HERO = 'merzouga-dune-red-dress.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="16 day Morocco tour, complete Morocco tour, Morocco itinerary 16 days, Morocco tour from Casablanca, Tangier, Chefchaouen, Fes, Sahara desert tour, Essaouira, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca: arrival and the Hassan II Mosque',
    p: 'Your driver-guide meets you in arrivals at Casablanca airport with your name on a sign, at whatever hour you land, and we follow your flight. If you arrive in time, a guided visit inside the Hassan II Mosque on the ocean and a walk on the Corniche; if not, rest and see it in the morning.',
    meta: [['car', 'Airport to the city, about 45 minutes'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast from day 2']] },
  { t: 'Casablanca → Rabat → Asilah → Tangier',
    p: 'Up the coast to Rabat for the blue and white Kasbah des Oudayas and the Hassan Tower, then north to Asilah, a whitewashed fishing town with murals on its walls and ramparts on the sea. Tangier by late afternoon, a city on the Strait with Spain in view.',
    meta: [['car', 'About 340 km, about 5 hours on the road'], ['bed', 'Night: Tangier'], ['food', 'Breakfast']] },
  { t: 'Tangier → Cap Spartel → Tetouan → Chefchaouen',
    p: 'The Kasbah and the old medina of Tangier, then Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules. Lunch in Tetouan’s white medina, then into the green Rif hills to Chefchaouen, the blue town, for the evening.',
    meta: [['car', 'About 170 km, about 3.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A day at your own pace in the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring, with sunset from the Spanish Mosque. Or a guided hike to the Akchour waterfalls in the Rif, on request.',
    meta: [['car', 'Free day; Akchour on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'South through the Rif to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, then Meknes for the great gate of Bab Mansour and Place el-Hedim. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa, the outside of the Al-Qarawiyyin and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane and the cedar forest of Azrou with its Barbary macaques, lunch in Midelt, then the palm gorges of the Ziz Valley to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, then a whole day in the desert by 4×4: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the black stony plains and the lake of Dayet Srij after a wet winter. A hot shower and a quiet night in a hotel at the foot of the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Through Rissani, the old caravan town with its market, and along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for an evening among the red cliffs and kasbahs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Skoura → Aït Ben Haddou',
    p: 'An easy day west on the Road of a Thousand Kasbahs: the Valley of Roses, the palm oasis of Skoura and its Kasbah Amridil, and Ouarzazate. In the late afternoon, Aït Ben Haddou, the earthen ksar on its hill, glowing at sunset from your guesthouse.',
    meta: [['car', 'About 175 km, about 4 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'An early walk up through the ksar to its old granary before the day visitors arrive. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, past Berber villages and walnut terraces, and down to your riad in Marrakech by early afternoon.',
    meta: [['car', 'About 190 km, about 4 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the medina',
    p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Mellah, the souks and the Ben Youssef Madrasa. The afternoon is free for a hammam, the Majorelle Garden or a rooftop café, and the evening for the food stalls of Jemaa el-Fnaa.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech → Essaouira',
    p: 'West across the argan plains to Essaouira on the Atlantic. The afternoon in its white and blue medina, the ramparts of the Skala with their old cannons and the fishing port with its blue boats, and grilled fish by the harbour if you like.',
    meta: [['car', 'About 180 km, about 3 hours on the road'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira: a free day by the sea',
    p: 'A day with no driving: the Mellah and the Bayt Dakira house of memory, the woodworkers under the ramparts, a long walk on the beach, a surf or kite lesson, or a camel ride along the dunes south of town. The evening on a rooftop as the sun sets over the ocean.',
    meta: [['car', 'Free day'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira → Safi → Oualidia',
    p: 'North on the coast road past the argan trees and the cliffs to Safi, the pottery town, and its hill of potters’ kilns. In the afternoon, Oualidia, a quiet lagoon behind the ocean famous for its oysters, for a walk on the sand, a boat out on the water and a seafood dinner.',
    meta: [['car', 'About 190 km, about 3 hours on the road'], ['bed', 'Night: Oualidia'], ['food', 'Breakfast']] },
  { t: 'Oualidia → El Jadida → Casablanca airport',
    p: 'A slow morning by the lagoon, then up the coast to El Jadida and the old Portuguese cistern, its vaulted hall reflected in a sheet of water. On to Casablanca airport, or your hotel in the city, by early afternoon.',
    meta: [['car', 'About 225 km, about 3 hours on the road'], ['flag', 'Ends at Casablanca airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A traveller walking on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>16-Day Complete Morocco</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>16-Day Complete Morocco Tour<span class="script">From the Strait to the Sahara</span></h1>', 'h1');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Casablanca round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>16 days / 15 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Sixteen days from Casablanca and back, the whole country from the Strait of Gibraltar to the Sahara without a road driven twice. Rabat and whitewashed Asilah, Tangier and Cap Spartel, two nights in the blue town of Chefchaouen, the Roman ruins of Volubilis, and Fes with a guided day in its medina.</p>
          <p class="dt-lead">Then two nights by the dunes of Erg Chebbi, the Todra and Dades gorges, a sunset night at Aït Ben Haddou, Marrakech with a local guide, two slow days in Essaouira and a night on the Oualidia lagoon before the coast road home. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>North coast</dt><dd>Tangier and Asilah</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Casablanca round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Asilah, Tangier and Cap Spartel',
  'Two days in blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'The Todra and Dades gorges',
  'Sunset at Aït Ben Haddou',
  'A guided day in Marrakech',
  'Two days in Essaouira by the sea',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['tangier-cap-spartel-lighthouse.jpg', 'The lighthouse at Cap Spartel above the Strait', 1000, 667],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour', 1440, 1920],
  ['grand-fes-blue-gate.jpg', 'The blue gate of Bab Bou Jeloud in Fes', 975, 1300],
  ['merzouga-camel-caravan.jpg', 'A camel caravan on the Merzouga dunes', 1600, 1066],
  ['ait-ben-haddou-terrace.jpg', 'Aït Ben Haddou seen from a terrace', 1500, 1000],
  ['essaouira-skala-port.jpg', 'The Skala ramparts above the port of Essaouira', 1000, 667],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Casablanca airport pick-up and drop-off, any hour',
  '15 nights as in the table below',
  '15 breakfasts and 4 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Hassan II Mosque: no visits on Fridays',
  'Winter desert nights are cold: ask for a heated tent',
  'Small bag for the camp; luggage stays in the car',
  'Essaouira is windy: bring a light jacket',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Caves of Hercules:</b> small fee',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef:</b> about 50 MAD',
  '<b>El Jadida cistern:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Casablanca round trip by Tangier, Fes, the Sahara, Marrakech and the coast, about 2,500 km in 16 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Casablanca,Morocco&amp;waypoints=Tangier,Morocco%7CChefchaouen,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CAit+Ben+Haddou,Morocco%7CMarrakech,Morocco%7CEssaouira,Morocco%7COualidia,Morocco&amp;travelmode=driving"', 'mapnote');

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
const oua = [A('https://www.tripadvisor.com/Hotel_Review-g580099-d650356-Reviews-Dar_Beldi_Maison_D_Hotes-Oualidia_Casablanca_Settat.html', 'Dar Beldi'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d524223-Reviews-Hotel_L_Hippocampe-Oualidia_Casablanca_Settat.html', 'Hôtel L’Hippocampe'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d630259-Reviews-La_Sultana_Oualidia-Oualidia_Casablanca_Settat.html', 'La Sultana Oualidia')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Casablanca', cas], ['2: Tangier', tng], ['3–4: Chef&shy;chaouen', chf], ['5–6: Fes', fes], ['7: Desert camp', camp], ['8: Merzouga', mzh], ['9: Dades Valley', dad], ['10: Aït Ben Haddou', abh], ['11–12: Marra&shy;kech', mar], ['13–14: Essaouira', ess], ['15: Oualidia', oua]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want every region in one trip',
  'Slow travellers: two nights in most places',
  'Couples and families flying in and out of Casablanca',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have two weeks? The <a href="14-days-best-of-morocco.html">14-day Best of Morocco</a> is this loop without Tangier',
  'Flying home from Tangier? The <a href="14-day-tangier-to-tangier-tour.html">14-day Tangier loop</a> starts and ends at the port',
  'Ending in Casablanca from Marrakech? The <a href="15-day-marrakech-to-casablanca-tour.html">15-day tour from Marrakech</a> runs it one way',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'c16-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is 16 days too long for Morocco?', 'For a trip that wants the whole country, no. Two nights in Chefchaouen, Fes, the desert, Marrakech and Essaouira give you free time in each place, and three short days near the end (Aït Ben Haddou, the High Atlas, the coast) keep it from feeling like a race.'],
  ['What does this tour add to the 14-day Best of Morocco?', 'Two things: the north coast, with Asilah, a night in Tangier and Cap Spartel where the Atlantic meets the Mediterranean, and a night at Aït Ben Haddou so you see the ksar at sunset and early morning, without the day visitors.'],
  ['Which days are long drives?', 'Day 7, Fes to Merzouga, about 8 hours, with stops for photos, tea and lunch. Days 2, 5 and 9 are about 5 hours; every other day is 4 hours or less, or no driving at all.'],
  ['Can we end in Tangier for the ferry to Spain?', 'Yes. We can run the loop the other way round, or finish in Tangier after the north instead of Casablanca; tell us how you travel and we rebuild the order around your ferry or flight.'],
  ['What time can we fly home on day 16?', 'We reach Casablanca airport by early afternoon, so any flight from about 15:00 works. For a morning flight, we spend the last night in Casablanca instead of Oualidia.'],
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
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2016-Day%20Complete%20Morocco%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>16-Day Complete Morocco</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 16-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'c16-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca airport pick-up and the Hassan II Mosque (night 1)', 'Rabat, Asilah and Tangier (night 2)', 'Cap Spartel, Tetouan and Chefchaouen (nights 3–4)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 5–6)', 'Ifrane, Midelt and a camel ride to a desert camp (night 7)', 'A day around Merzouga with a nomad family (night 8)', 'Todra Gorge and the Dades Valley (night 9)', 'Skoura and Aït Ben Haddou (night 10)', 'Tizi n’Tichka to Marrakech (nights 11–12)', 'Guided day in the Marrakech medina', 'Essaouira (nights 13–14)', 'Safi and the Oualidia lagoon (night 15)', 'El Jadida and Casablanca airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Four Royal Cities', '4 imperial cities', 'Imperial Cities &amp; Sahara</span>', 'Casa → Marrakech']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
