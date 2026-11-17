// Build tours/12-day-morocco-tour-from-agadir.html (URL kept): 12-day Agadir round trip, a full loop, no road twice.
// Agadir -> Taroudant -> Aït Ben Haddou (n1) -> Skoura, Roses -> Dades (n2) -> Todra -> Merzouga camp (n3) -> Merzouga hotel (n4) -> Fes x2 (n5-6)
// -> Volubilis -> Chefchaouen (n7) -> Rabat (n8) -> Hassan II Mosque -> Marrakech x2 (n9-10) -> Essaouira (n11) -> coast road -> Agadir.
// Template = the finished 8-day Imperial Cities page (same as build-jn10.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17; OpenSEO out of credits, Firecrawl/WebFetch blocked on most tour sites, SERP read with WebSearch):
// - Page 1 "12 day morocco tour from agadir": onthegotours "Morocco Highlights From Agadir 12 days" (Agadir round trip, small group 2-7,
//   coast + imperial cities + Sahara, back via Marrakech), Lokalee "Private Morocco Tour from Agadir - 12 Days Sahara & Cities" (from ~US$2,199,
//   starts north to Essaouira, guided Marrakech + Fes, camp; argan cooperative stop on day 1), toursxplorer/thenextguide 12-day desert tour from
//   Agadir (Ifrane, Azrou, Ziz, Erfoud, Rissani, ends at Agadir hotel or Al Massira airport), TourRadar Agadir -> Marrakesh one-way 12-day tours.
// - Fodor's forum on routes like this: "makes no geographical sense ... very long driving days"; advice = run it as a one-way loop, no backtracking.
// - Old page: Agadir x2 nights, Essaouira, Marrakech x2, Dades, camp, Merzouga, Fes (no guided day), Chefchaouen, Casablanca, then 550 km back to Agadir.
// Expert choices: south first (Agadir is the gateway to the south), the north at the end, then down the Atlantic so the last day is a 3-hour coast
// drive (OSRM Essaouira -> Agadir 175 km) instead of 550 km; no road driven twice; Rabat night so Hassan II + Marrakech is one easy motorway day;
// guided days in Fes and Marrakech. OSRM km: ag3-d1 411, ag5-d2 175, ag5-d3 314, mzf3-d3 467, mt7 261, mc10-d9 337 (Chefchaouen-Rabat ~250 + 90),
// ti5 242, essaouira 182, ag12-d12 175 = about 2,600 km.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/12-day-morocco-tour-from-agadir.html';
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

const URL = 'https://moroccotourshub.com/tours/12-day-morocco-tour-from-agadir.html';
const NAME = '12-Day Morocco Tour from Agadir and Back';
const TITLE = '12-Day Morocco Tour from Agadir | Private Round Trip';
const DESC = 'Private 12-day Morocco tour from Agadir and back: Aït Ben Haddou, the Dades and Todra gorges, two nights by the Merzouga dunes, Fes, Chefchaouen, Rabat, Marrakech and Essaouira, then the coast road home. A full loop, no road driven twice.';
const HERO = 'sahara-camel-group.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="12 day Morocco tour from Agadir, Morocco tour from Agadir, Agadir to Merzouga, Agadir round trip, Sahara desert tour, Fes, Chefchaouen, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Agadir → Taroudant → Taliouine → Ouarzazate → Aït Ben Haddou',
    p: 'Pick-up at your Agadir hotel around 07:30. Inland through the argan country to Taroudant and its golden ramparts, up into the saffron fields of Taliouine and over the Anti-Atlas to Ouarzazate. In the late afternoon, Aït Ben Haddou, the earthen ksar on its hill, glowing at sunset from your guesthouse.',
    meta: [['car', 'About 410 km, about 7 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Dinner']] },
  { t: 'Aït Ben Haddou → Skoura → Valley of Roses → Dades Gorge',
    p: 'An early walk up through the ksar to its old granary before the day visitors arrive. An easy day east along the Road of a Thousand Kasbahs: the palm oasis of Skoura, the Valley of Roses, then the red cliffs and the hairpin bends of the Dades Gorge for the evening.',
    meta: [['car', 'About 175 km, about 4 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'To the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge, then across the stony plains past Erfoud to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 315 km, about 6 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, then a whole day in the desert by 4×4: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the market town of Rissani and the lake of Dayet Srij after a wet winter. A hot shower and a quiet night in a hotel at the foot of the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'North up the palm gorges of the Ziz Valley, lunch in Midelt under the snowy Jbel Ayachi, then the cedar forest of Azrou with its Barbary macaques and the alpine town of Ifrane. Into Fes in the evening, to your riad in the medina.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa, the outside of the Al-Qarawiyyin and a rooftop above the Chouara tanneries. Shops only if you ask; the evening is yours.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Volubilis → Chefchaouen',
    p: 'West to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, then north into the green hills of the Rif to Chefchaouen, the blue town. The late afternoon in its lanes and the Outa el-Hammam square, and sunset from the Spanish Mosque.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Rabat',
    p: 'An early walk to the Ras el-Maa spring while the blue lanes are quiet. South through the farmland of the Gharb to Rabat, the capital, for the blue and white Kasbah des Oudayas above the ocean at sunset, the Hassan Tower and the Mausoleum of Mohammed V.',
    meta: [['car', 'About 250 km, about 4 hours on the road'], ['bed', 'Night: Rabat'], ['food', 'Breakfast']] },
  { t: 'Rabat → Hassan II Mosque, Casablanca → Marrakech',
    p: 'Down the coast to Casablanca for a guided visit inside the Hassan II Mosque, built over the ocean (Saturday to Thursday). Then the motorway south to Marrakech, at your riad in the afternoon, with the evening free for the food stalls of Jemaa el-Fnaa.',
    meta: [['car', 'About 330 km, about 4.5 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the medina',
    p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Mellah, the souks and the Ben Youssef Madrasa. The afternoon is free for a hammam, the Majorelle Garden or a rooftop café.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech → Essaouira',
    p: 'West across the argan plains to Essaouira on the Atlantic. The afternoon in its white and blue medina, the ramparts of the Skala with their old cannons, the fishing port and its blue boats, and grilled fish by the harbour if you like.',
    meta: [['car', 'About 180 km, about 3 hours on the road'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira → the coast road → Agadir',
    p: 'A free morning by the sea, then south on the coast road past the argan trees, the surf beaches of Imsouane and Taghazout and the cliffs above the ocean. In Agadir by mid-afternoon, at your hotel or Agadir airport.',
    meta: [['car', 'About 175 km, about 3 hours on the road'], ['flag', 'Ends at your Agadir hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A group riding camels over the Sahara dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>12-Day Tour from Agadir</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>12-Day Morocco Tour from Agadir<span class="script">One Loop, the Whole Country</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Agadir$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Agadir round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>12 days / 11 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Twelve days from Agadir and back, one big loop through Morocco that never drives the same road twice. Inland first, to Aït Ben Haddou, the Dades and Todra gorges and two nights by the dunes of Erg Chebbi, a camp after a sunset camel ride and a hotel after a day with the nomads.</p>
          <p class="dt-lead">Then north over the Middle Atlas to Fes, with a guided day in its medina, the Roman ruins of Volubilis, the blue town of Chefchaouen and Rabat by the ocean. The Hassan II Mosque, a guided day in Marrakech, a night in Essaouira and the coast road home. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>The loop</dt><dd>No road driven twice</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Agadir round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Sunset at Aït Ben Haddou',
  'The Dades and Todra gorges',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'A guided day in the Fes medina',
  'The blue lanes of Chefchaouen',
  'Inside the Hassan II Mosque',
  'A guided day in Marrakech',
  'Essaouira and the coast road home',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1300, 866],
  ['dades-valley-red-green.jpg', 'Red cliffs and green fields in the Dades Valley', 1300, 867],
  ['merzouga-camel-ride-group.jpg', 'A camel ride over the Merzouga dunes', 1300, 866],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina', 975, 1300],
  ['chefchaouen-blue-steps.jpg', 'Blue steps in Chefchaouen', 800, 900],
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
  'Pick-up and drop-off at your Agadir hotel or the airport',
  '11 nights as in the table below',
  '11 breakfasts and 4 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Hassan II Mosque: no visits on Fridays',
  'Winter desert nights are cold: ask for a heated tent',
  'Small bag for the camp; luggage stays in the car',
  'Chefchaouen is steep: good shoes',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Agadir round trip by the Sahara, Fes, Chefchaouen, Marrakech and the coast, about 2,600 km in 12 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Agadir,Morocco&amp;destination=Agadir,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CChefchaouen,Morocco%7CRabat,Morocco%7CMarrakech,Morocco%7CEssaouira,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const rab = [A('https://www.tripadvisor.com/Hotel_Review-g293736-d12390293-Reviews-Riad_Dar_Saidi-Rabat_Rabat_Sale_Kenitra.html', 'Riad Dar Saidi'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d3724817-Reviews-Riad_Zyo-Rabat_Rabat_Sale_Kenitra.html', 'Riad Zyo'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d300677-Reviews-Sofitel_Rabat_Jardin_des_Roses-Rabat_Rabat_Sale_Kenitra.html', 'Sofitel Jardin des Roses')];
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Aït Ben Haddou', abh], ['2: Dades Valley', dad], ['3: Desert camp', camp], ['4: Merzouga', mzh], ['5–6: Fes', fes], ['7: Chef&shy;chaouen', chf], ['8: Rabat', rab], ['9–10: Marra&shy;kech', mar], ['11: Essaouira', ess]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers on a holiday in Agadir who want all of Morocco',
  'First-timers who fly in and out of Agadir',
  'Couples and families who like a new place every day or two',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only a few days away from the beach? The <a href="4-day-desert-tour-agadir-merzouga-marrakech.html">4-day Agadir desert tour</a> reaches Merzouga and ends in Marrakech',
  'No time for the north? The <a href="6-day-morocco-tour-agadir-essaouira-marrakech.html">6-day Agadir to Marrakech tour</a> is Essaouira and a guided Marrakech',
  'Flying home from Marrakech? The <a href="14-day-morocco-tour-from-marrakech.html">14-day tour from Marrakech</a> loops back there',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ag12-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why does the tour go to the desert first?', 'Agadir is the gateway to the south, so the Sahara is closer from here than the north. Going inland first and coming home down the Atlantic makes a loop: no road is driven twice, and the last day is a 3-hour coast drive instead of 550 km from Casablanca.'],
  ['Which days are long drives?', 'Day 1, Agadir to Aït Ben Haddou, about 7 hours, and day 5, Merzouga to Fes, about 8 hours, both with stops for photos, tea and lunch. Most other days are 3 to 5 hours, and you stop whenever you want.'],
  ['We are staying in Taghazout or Tamraght. Can you pick us up there?', 'Yes. We pick you up at any hotel or surf camp around Agadir, Taghazout and Tamraght, or at Agadir airport, and bring you back there on day 12. Tell us the address when you book.'],
  ['Can we see the Hassan II Mosque on any day?', 'The mosque opens for guided visits from Saturday to Thursday. If day 9 falls on a Friday, we see it from the outside and the ocean promenade, or move the visit by changing a day earlier in the tour.'],
  ['Can we fly home from Marrakech instead?', 'Yes. We can end on day 10 after the guided day, at Marrakech airport, or keep the night in Essaouira and finish at Essaouira or Marrakech airport. The loop is a suggestion: tell us how your flights work.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp with heated tents',
  'A second night in Chefchaouen',
  'Quad biking in the Merzouga dunes',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'A <a href="marrakech-cooking-class.html">cooking class</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2012-Day%20Morocco%20Tour%20from%20Agadir.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>12-Day from Agadir</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 12-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ag12-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Agadir, Taroudant and Aït Ben Haddou (night 1)', 'Skoura, the Valley of Roses and the Dades Gorge (night 2)', 'Todra Gorge and a camel ride to a desert camp (night 3)', 'A day around Merzouga with a nomad family (night 4)', 'Ziz Valley, Midelt and Ifrane to Fes (nights 5–6)', 'Guided day in the Fes medina', 'Volubilis and Chefchaouen (night 7)', 'Rabat (night 8)', 'Hassan II Mosque and Marrakech (nights 9–10)', 'Guided day in the Marrakech medina', 'Essaouira (night 11)', 'The coast road back to Agadir'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Four Royal Cities', '4 imperial cities', 'Imperial Cities &amp; Sahara</span>', 'Casa → Marrakech']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
