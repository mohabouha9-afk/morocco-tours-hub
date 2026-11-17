// Build tours/14-days-best-of-morocco.html (URL kept): 14-day Best of Morocco, Casablanca round trip.
// Casablanca (n1) -> Rabat -> Chefchaouen x2 (n2-3) -> Volubilis/Meknes -> Fes x2 (n4-5) -> Merzouga camp (n6) + hotel (n7) -> Todra -> Dades (n8)
// -> Aït Ben Haddou -> Marrakech x2 (n9-10) -> Essaouira x2 (n11-12) -> Safi -> Oualidia (n13) -> El Jadida -> Casablanca airport.
// Template = the finished 8-day Imperial Cities page (same as build-ag12.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17; SERP read with WebSearch, OpenSEO volumes not available this run; "2 week morocco itinerary" ~90/month US on file):
// - local-morocco-tours.com "14 Days Grand Morocco Tour from Casablanca": Rabat, Chefchaouen x2, Volubilis/Meknes, Fes x2, Midelt, camp, Dades,
//   Marrakech x2, Essaouira x2, then Essaouira -> Casablanca and a last night there; "every night's accommodation is under four hours from the previous stop";
//   all dinners included; 4.9 on Google (20).
// - designerjourneys 2 weeks: Casablanca night, Chefchaouen, Fes x2, camp, Dades, Ouarzazate, Marrakech x4, Essaouira, Casablanca (rated 4.3 from 2;
//   page full of mix-ups). TourRadar Casablanca round trips with Essaouira on day 13 then the airport (~US$2,898 pp); kimkim/TourRadar versions end in Marrakech.
// - Old page: Casablanca round trip with Essaouira only as a 380 km day trip from Marrakech and a free day in Casablanca at the end.
// Expert choices: two real nights in Essaouira instead of a day trip; split the 370 km Essaouira -> Casablanca drive with a night on the Oualidia
// lagoon so the last day is under 3 hours to the airport (OSRM Oualidia -> El Jadida -> CMN 225 km); no road driven twice; 2 nights in each highlight.
// OSRM: ic1 ~90, c9-d2 ~250, tg3 ~260, fm4-d1 ~470, fm4-d2 ~270, fm4-d3 ~320, essaouira 182, t14-c 190, bm14-d14 225 = about 2,300 km.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/14-days-best-of-morocco.html';
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

const URL = 'https://moroccotourshub.com/tours/14-days-best-of-morocco.html';
const NAME = '14-Day Best of Morocco Tour from Casablanca';
const TITLE = '14-Day Best of Morocco Tour from Casablanca | Private Loop';
const DESC = 'Private 14-day Best of Morocco tour from Casablanca and back: Rabat, two nights in Chefchaouen and Fes, two by the Merzouga dunes, the Dades Valley, Aït Ben Haddou, Marrakech, two nights in Essaouira and the Oualidia lagoon.';
const HERO = 'merzouga-green-dress.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="14 day Morocco tour, best of Morocco tour, 2 week Morocco itinerary, Morocco tour from Casablanca, Chefchaouen, Fes, Sahara desert tour, Essaouira, private Morocco tour">', 'kw');
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
  { t: 'Casablanca → Rabat → Chefchaouen',
    p: 'Up the coast to Rabat, the capital: the blue and white lanes of the Kasbah des Oudayas, the Hassan Tower and the Mausoleum of Mohammed V. Then north through the farmland of the Gharb and into the green hills of the Rif to Chefchaouen, the blue town, for the evening.',
    meta: [['car', 'About 340 km, about 5.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
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
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar to its old granary. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to your riad in Marrakech in the late afternoon.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
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
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A traveller on the Merzouga dunes in the evening light" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>14-Day Best of Morocco</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>14-Day Best of Morocco Tour<span class="script">From Casablanca and Back</span></h1>', 'h1');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Casablanca round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>14 days / 13 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Two weeks for the best of Morocco, from Casablanca and back, with two nights in each highlight so no place is rushed. The Hassan II Mosque and Rabat, the blue town of Chefchaouen, the Roman ruins of Volubilis, and Fes with a guided day in its medina.</p>
          <p class="dt-lead">Then two nights by the dunes of Erg Chebbi, the Todra and Dades gorges, Aït Ben Haddou and the High Atlas, Marrakech with a local guide, two slow days in Essaouira and a night on the Oualidia lagoon before the coast road home. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Coast</dt><dd>Essaouira and Oualidia</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Casablanca round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'Two days in blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
  'A guided day in Marrakech',
  'Two days in Essaouira by the sea',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-chefchaouen-blue.jpg', 'The blue lanes of Chefchaouen', 1300, 866],
  ['fes-royal-palace-gates.jpg', 'The golden gates of the royal palace in Fes', 1300, 866],
  ['merzouga-dune-walk-red.jpg', 'Walking along a dune ridge at Merzouga', 1600, 1066],
  ['dades-red-valley.jpg', 'The red walls of the Dades Valley', 1333, 2000],
  ['marrakech-caleche-square.jpg', 'A horse carriage in a Marrakech square', 1300, 866],
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira', 1080, 1350],
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
  '13 nights as in the table below',
  '13 breakfasts and 3 dinners',
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
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef:</b> about 50 MAD',
  '<b>El Jadida cistern:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Casablanca round trip by Chefchaouen, Fes, the Sahara, Marrakech and the coast, about 2,300 km in 14 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Casablanca,Morocco&amp;waypoints=Chefchaouen,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CAit+Ben+Haddou,Morocco%7CMarrakech,Morocco%7CEssaouira,Morocco%7COualidia,Morocco&amp;travelmode=driving"', 'mapnote');

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
const oua = [A('https://www.tripadvisor.com/Hotel_Review-g580099-d650356-Reviews-Dar_Beldi_Maison_D_Hotes-Oualidia_Casablanca_Settat.html', 'Dar Beldi'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d524223-Reviews-Hotel_L_Hippocampe-Oualidia_Casablanca_Settat.html', 'Hôtel L’Hippocampe'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d630259-Reviews-La_Sultana_Oualidia-Oualidia_Casablanca_Settat.html', 'La Sultana Oualidia')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Casablanca', cas], ['2–3: Chef&shy;chaouen', chf], ['4–5: Fes', fes], ['6: Desert camp', camp], ['7: Merzouga', mzh], ['8: Dades Valley', dad], ['9–10: Marra&shy;kech', mar], ['11–12: Essaouira', ess], ['13: Oualidia', oua]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'First-timers who want the whole country in one trip',
  'Travellers who like two nights in a place, not one',
  'Couples and families flying in and out of Casablanca',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 10 days? The <a href="10-day-morocco-tour-casablanca-round.html">10-day Casablanca round tour</a> keeps the north, Fes and the desert',
  'Flying home from Marrakech? The <a href="14-day-morocco-tour-from-marrakech.html">14-day tour from Marrakech</a> is the same loop from there',
  'Want quieter, wilder dunes? The <a href="13-day-tangier-to-marrakech-tour.html">13-day tour from Tangier</a> crosses the deep south to Ouzina and Zagora',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'bm14-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are two weeks too long for Morocco?', 'Not for a first trip that wants it all. Two nights in Chefchaouen, Fes, the desert, Marrakech and Essaouira give you free time in each place instead of a new hotel every night, and the days by the sea at the end are a calm way to finish.'],
  ['Why not a day trip to Essaouira from Marrakech?', 'Essaouira is about 3 hours from Marrakech each way, so a day trip leaves only a few hours in town. Sleeping there two nights gives you the evenings, the quiet mornings by the port, and lets the tour carry on up the coast instead of driving back.'],
  ['Which days are long drives?', 'Day 6, Fes to Merzouga, about 8 hours, and day 9, Dades to Marrakech, about 6 hours, both with stops for photos, tea and lunch. Day 2 is about 5.5 hours; every other day is 3 hours or less, or no driving at all.'],
  ['Why stop at Oualidia on the way back?', 'Essaouira to Casablanca is about 370 km in one go. A night on the Oualidia lagoon breaks it in two easy halves, adds oysters and a boat on the water, and leaves under 3 hours to the airport on the last day.'],
  ['What time can we fly home on day 14?', 'We reach Casablanca airport by early afternoon, so any flight from about 15:00 works. For a morning flight, we spend the last night in Casablanca instead of Oualidia. Tell us your flight times and we plan around them.'],
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
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2014-Day%20Best%20of%20Morocco%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>14-Day Best of Morocco</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 14-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'bm14-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca airport pick-up and the Hassan II Mosque (night 1)', 'Rabat', 'Chefchaouen (nights 2–3)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 4–5)', 'Ifrane, Midelt and a camel ride to a desert camp (night 6)', 'A day around Merzouga with a nomad family (night 7)', 'Todra Gorge and the Dades Valley (night 8)', 'Aït Ben Haddou and Tizi n’Tichka to Marrakech (nights 9–10)', 'Guided day in the Marrakech medina', 'Essaouira (nights 11–12)', 'Safi and the Oualidia lagoon (night 13)', 'El Jadida and Casablanca airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Four Royal Cities', '4 imperial cities', 'Imperial Cities &amp; Sahara</span>', 'Casa → Marrakech']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
