// Build tours/15-day-marrakech-to-casablanca-tour.html (Marrakech x2 -> Essaouira x2 -> Aït Ben Haddou -> Dades -> Merzouga camp + hotel -> Fes x2
// -> Meknes/Volubilis -> Chefchaouen x2 -> Tetouan -> Tangier -> Asilah -> Rabat -> Hassan II Mosque -> Casablanca, ends day 15). Derived from build-mc13.js.
// Template = the finished 7-day Tangier -> Marrakech page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16, WebSearch): onthegotours "Casablanca to Essaouira with Chefchaouen 15 days" and "Grand Morocco From Casablanca 15 days"
// (Rabat -> Asilah -> Tangier -> Chefchaouen -> Volubilis/Meknes -> Fes, Atlas to Midelt, a night camel trek, Aït Ben Haddou + Todra, about three
// nights in Essaouira), kimkim 15-day, Intrepid "Best of Morocco". Most 15-day tours start in Casablanca; ours runs the same northern leg the
// other way to finish in Casablanca. Expert pacing: two nights in Marrakech, Essaouira, by the dunes, Fes and Chefchaouen; the north coast
// (Tangier, Cap Spartel, Asilah) on the way back south; a night in Rabat so the Hassan II Mosque is a calm last morning.
// Roads: mc13 roads + m7t-d7 (Chefchaouen -> Tetouan -> Tangier), t14-a (Tangier -> Asilah -> Rabat), ic1 (Rabat -> Casablanca).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/15-day-marrakech-to-casablanca-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/15-day-marrakech-to-casablanca-tour.html';
const NAME = '15-Day Morocco Tour from Marrakech to Casablanca';
const TITLE = '15-Day Morocco Tour: Marrakech to Casablanca | Private';
const DESC = 'A private 15-day Morocco tour from Marrakech to Casablanca: two nights in Marrakech, Essaouira, the Merzouga dunes, Fes and Chefchaouen, then Tangier, Asilah, Rabat and the Hassan II Mosque.';
const HERO = 'merzouga-camel-ride-group.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="15 day Morocco tour, 2 week Morocco itinerary, Tangier, Asilah, Marrakech to Casablanca tour, Essaouira, Sahara desert tour, Fes, Chefchaouen, Rabat, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Arrival in Marrakech',
    p: 'Your driver meets you at Marrakech airport at any hour, or at your hotel, and walks you to your riad in the medina. If you land early, a first evening on Jemaa el-Fnaa, when the music and food stalls come alive.',
    meta: [['car', 'About 20 minutes from the airport'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast from day 2']] },
  { t: 'Marrakech: a guided day in the Red City',
    p: 'With a local Marrakech guide: the Koutoubia, the painted cedar ceilings of the Bahia Palace, the Ben Youssef Madrasa and the souks. In the afternoon, the Majorelle Garden or the riad pool, as you like.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech → Essaouira, by the Atlantic',
    p: 'West across the argan country to Essaouira, the walled port on the ocean. An afternoon on the Skala ramparts and their bronze cannons, the blue fishing boats in the harbour and grilled fish for lunch.',
    meta: [['car', 'About 190 km, about 2.5–3 hours on the road'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira: a day by the ocean',
    p: 'No driving: the Mellah and the woodworkers under the ramparts, the long beach and the trade winds, a slow lunch in the medina. The easy day before the mountains and the desert.',
    meta: [['car', 'No driving unless you ask'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira → Tizi n’Tichka → Aït Ben Haddou',
    p: 'Straight from the coast to the High Atlas, passing Marrakech on the ring road, then over the Tizi n’Tichka pass, 2,260 m, past Berber villages to Aït Ben Haddou for a sunset walk up through the ksar and a night beside it.',
    meta: [['car', 'About 380 km, about 6.5 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Skoura → Valley of Roses → Dades Gorge',
    p: 'The Road of a Thousand Kasbahs: Ouarzazate, the palm oasis of Skoura and its kasbahs, the rose villages of Kelaat M’Gouna, then up the Dades Gorge among red cliffs and the rock formations called the Monkey Fingers.',
    meta: [['car', 'About 180 km, about 3.5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Todra Gorge → Merzouga',
    p: 'A walk between the 300 m walls of the Todra Gorge in the cool of the morning, then east along the Jebel Saghro to Erg Chebbi. A camel ride into the dunes for sunset, dinner and drums by the fire in the camp.',
    meta: [['car', 'About 320 km, about 5.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, then a day with no long road: tea with a nomad family, the Gnawa musicians of Khamlia and the market town of Rissani. A hot shower and a calm night in a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'North through the palm gorges of the Ziz Valley, lunch in Midelt, then over the Middle Atlas through the cedar forest with its Barbary macaques and the alpine town of Ifrane, to your riad in the Fes medina.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Meknes → Volubilis → Chefchaouen',
    p: 'Meknes, the imperial city of Moulay Ismail, with the great gate of Bab Mansour and his royal granaries, then the Roman town of Volubilis and its mosaics, and north into the green Rif hills to Chefchaouen, the blue town.',
    meta: [['car', 'About 290 km, about 5.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'A free day in Chefchaouen',
    p: 'No driving: the quiet blue lanes before the day visitors arrive, the kasbah garden on Outa el Hammam square, sunset from the Spanish Mosque. Ask your driver for a half-day to the Akchour waterfalls if you like to walk.',
    meta: [['car', 'No driving unless you ask'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Tetouan → Tangier',
    p: 'Down through the white Andalusian medina of Tetouan to Tangier on the Strait of Gibraltar: the Kasbah above the harbour, the old medina and Cap Spartel, where the Mediterranean meets the Atlantic.',
    meta: [['car', 'About 125 km, about 2.5 hours on the road'], ['bed', 'Night: Tangier'], ['food', 'Breakfast']] },
  { t: 'Tangier → Asilah → Rabat',
    p: 'South along the Atlantic to Asilah, a white seaside medina painted with murals, for lunch by the ramparts, then Rabat, the capital: the Hassan Tower, the royal Mausoleum and the Kasbah of the Oudayas at sunset.',
    meta: [['car', 'About 250 km, about 3 hours on the motorway'], ['bed', 'Night: Rabat'], ['food', 'Breakfast']] },
  { t: 'Rabat → Hassan II Mosque → Casablanca, end of the tour',
    p: 'Down the coast to Casablanca for a guided visit inside the Hassan II Mosque, built over the Atlantic, with its 210 m minaret. Then the airport, the train station or your hotel, with plenty of time for your flight.',
    meta: [['car', 'About 120 km, about 1.5 hours on the motorway'], ['flag', 'Ends at Casablanca airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>15-Day Marrakech to Casablanca</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Tangier</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Marrakech</span>', 'chip');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>15-Day Morocco Tour from Marrakech to Casablanca<span class="script">From the Sahara to the Strait</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>15 days / 14 nights', 'duration');
rep('<small>Route</small><b>Tangier → Marrakech</b>', '<small>Route</small><b>Marrakech → Casablanca</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Fifteen days from Marrakech to Casablanca, with two nights in each of the great places. Two nights in Marrakech with a guided day in the Red City, then two real nights by the ocean in Essaouira, not a rushed day trip.</p>
          <p class="dt-lead">Straight from the coast over the High Atlas to Aït Ben Haddou, through the Dades and Todra gorges to two nights by the dunes of Erg Chebbi, then Fes, two nights in the blue town of Chefchaouen, Tangier on the Strait of Gibraltar, Asilah, Rabat and the Hassan II Mosque on the last morning. Your own car and driver-guide all the way.</p>
`, 'overview');
rep('<dd>Tangier → Marrakech</dd>', '<dd>Marrakech → Casa</dd>', 'kf1');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>North coast</dt><dd>Tangier and Asilah</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'A guided day in Marrakech',
  'Two nights in Essaouira by the ocean',
  'A night beside Aït Ben Haddou',
  'The Dades and Todra gorges',
  'Two nights by the Merzouga dunes',
  'Tea with a nomad family',
  'A guided day in the Fes medina',
  'Two nights in blue Chefchaouen',
  'Tangier, Cap Spartel and Asilah',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['marrakech-medina-walk.jpg', 'Walking in the Marrakech medina', 1600, 1066],
  ['essaouira.jpg', 'The blue fishing boats of Essaouira', 1080, 1350],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour', 1440, 1920],
  ['tangier-cap-spartel-lighthouse.jpg', 'The lighthouse of Cap Spartel near Tangier', 1000, 667],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Marrakech and Fes',
  'Pick-up at Marrakech airport or hotel',
  'Drop-off at Casablanca airport or hotel',
  '14 nights as in the table below',
  '14 breakfasts and 4 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight times both ways',
  'Essaouira is windy: bring a light jacket',
  'Small bag for the camp; luggage goes by 4×4',
  'The Hassan II Mosque is closed to visits on Fridays',
  'Desert and Atlas nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Skala du Port, Essaouira:</b> small fee',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Caves of Hercules, Tangier:</b> small fee',
  '<b>Hassan II Mosque:</b> 140 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Marrakech to Casablanca by Essaouira, the Sahara, Fes, Chefchaouen and Tangier, about 2,500 km in 15 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Casablanca,Morocco&amp;waypoints=Essaouira,Morocco%7CAit+Ben+Haddou,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CChefchaouen,Morocco%7CTangier,Morocco%7CAsilah,Morocco%7CRabat,Morocco&amp;travelmode=driving"', 'mapnote');
rep('<span>Flights and ferry tickets</span>', '<span>International flights</span>', 'not incl');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const tng = [A('https://www.tripadvisor.com/Hotel_Review-g293737-d8672446-Reviews-Hilton_Garden_Inn_Tanger_City_Center-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Hilton Garden Inn'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d7118909-Reviews-Grand_Hotel_Villa_de_France-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Grand Hotel Villa de France'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d25109105-Reviews-Fairmont_Tazi_Palace_Tangier-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Fairmont Tazi Palace')];
const rab = [A('https://www.tripadvisor.com/Hotel_Review-g293736-d12390293-Reviews-Riad_Dar_Saidi-Rabat_Rabat_Sale_Kenitra.html', 'Riad Dar Saidi'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d3724817-Reviews-Riad_Zyo-Rabat_Rabat_Sale_Kenitra.html', 'Riad Zyo'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d300677-Reviews-Sofitel_Rabat_Jardin_des_Roses-Rabat_Rabat_Sale_Kenitra.html', 'Sofitel Jardin des Roses')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1–2: Marra&shy;kech', mrk], ['3–4: Essa&shy;ouira', ess], ['5: Aït Ben Haddou', abh], ['6: Dades Valley', dad], ['7: Desert camp', camp], ['8: Merzouga', mzh], ['9–10: Fes', fes], ['11–12: Chef&shy;chaouen', chf], ['13: Tangier', tng], ['14: Rabat', rab]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying into Marrakech and out of Casablanca',
  'Anyone who wants the coast, the desert and the north',
  'Travellers with two full weeks who want every region',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Two days less? The <a href="13-day-marrakech-to-casablanca-tour.html">13-day Marrakech to Casablanca tour</a> skips Tangier and the second Chefchaouen night',
  'Flying home from Marrakech? The <a href="14-day-morocco-tour-from-marrakech.html">14-day tour from Marrakech</a> loops back by the coast',
  'Going on to Spain? The <a href="10-day-morocco-tour-marrakech-to-tangier.html">10-day Marrakech to Tangier tour</a> ends at the ferry port',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mc15-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why two nights in Essaouira instead of a day trip?', 'A day trip means about six hours in the car for a few hours in town. With two nights you see Essaouira in the quiet morning and evening, after the day visitors leave, and the drive on to the mountains starts fresh.'],
  ['Which days are the long drives?', 'Day 5, Essaouira to Aït Ben Haddou, and day 9, Merzouga to Fes, about eight hours with stops. Days 2, 4, 8, 10 and 12 have little or no driving, and the last two days are short.'],
  ['Why go up to Tangier before Casablanca?', 'Tangier, Cap Spartel and the white town of Asilah show a different Morocco, half Mediterranean, half Atlantic, and the motorway down the coast makes the last two days short and easy, with a night in Rabat before the mosque.'],
  ['Could we end in Tangier and take the ferry to Spain?', 'Yes. We can finish on day 13 at the Tangier port for the Tarifa ferry, or at Tanger Med for Algeciras, and skip Asilah, Rabat and Casablanca. The 10-day Marrakech to Tangier tour is built that way.'],
  ['What if our last day is a Friday?', 'The Hassan II Mosque is closed to visitors on Fridays. We then see it from outside and walk the Corniche, or you add a night in Casablanca and visit it on Saturday morning.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-hot-air-balloon-ride.html">balloon flight</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'The Oualidia lagoon on the way to Casablanca',
  'Upgrade to a luxury camp with heated tents',
  'The Akchour waterfalls hike from Chefchaouen',
  'End at the Tangier port for the ferry to Spain',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%2015-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Casablanca.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>15-Day Marrakech to Casa</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 15-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mc15-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech with a guided day (nights 1–2)', 'Essaouira on the Atlantic (nights 3–4)', 'Tizi n’Tichka and Aït Ben Haddou (night 5)', 'Skoura, the Valley of Roses and the Dades Gorge (night 6)', 'Todra Gorge and a camel ride to a desert camp (night 7)', 'A day around Merzouga (night 8)', 'Ziz Valley, Midelt and Ifrane to Fes (nights 9–10)', 'Meknes, Volubilis and Chefchaouen (nights 11–12)', 'Tetouan and Tangier (night 13)', 'Asilah and Rabat (night 14)', 'Hassan II Mosque and Casablanca'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '2 nights by the dunes', '7-day route', 'ferry', 'Tanger Med']) { const n = s.split(bad).length - 1; if (n) console.warn('CHECK:', bad, n); }
fs.writeFileSync(out, s);
console.log('written', s.length);
