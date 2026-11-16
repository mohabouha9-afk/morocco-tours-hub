// Build tours/14-day-tangier-to-tangier-tour.html: a full loop from Tangier and back, never the same road twice.
// Tangier -> Asilah -> Rabat · Casablanca (Hassan II) -> El Jadida -> Oualidia · Safi -> Essaouira x2 · Marrakech x2 · Tichka -> Aït Ben Haddou
// · Skoura -> Dades · Todra -> Merzouga camp + hotel · Ziz -> Midelt -> Ifrane -> Fes x2 · Volubilis -> Chefchaouen · Tetouan -> Tangier (short last day for the ferry).
// Template = the finished 7-day Tangier -> Marrakech page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "safi morocco" 1,300, "asilah" 880, "el jadida" 720, "oualidia" 390, "tangier ferry" 320,
// "2 week morocco itinerary" 90, "14 day morocco itinerary" 90, "morocco round trip" 50. SERP "14 day Morocco tour from Tangier round trip":
// tangierexcursions.com (Spain day/multi-day trips; reviews: ferry escorts, a cancelled return ferry rebooked by the agency, porters into
// medinas), moroccoexperiencetours 2-week (Casablanca start, coast, Tangier, Chefchaouen, Fes, Sahara, Marrakech, Essaouira), camelridetrips
// tours from Tangier (5-14 days, port/airport pick-up), moroccotoptrips 14-day from Tangier, janicerohrssen 14-day blog (Tangier 1, Chefchaouen 1,
// Fes 3, Sahara...). Most "from Tangier" 2-week tours end in Marrakech or Casablanca; ferry and own-car travellers need to come back to Tangier.
// Expert route choice: go down the Atlantic first (Asilah, Rabat, Casablanca, El Jadida, the Oualidia lagoon, Safi) so Essaouira is reached
// without the classic Marrakech -> Essaouira -> Marrakech back-and-forth, then Marrakech, the High Atlas, the gorges, the Sahara, Fes and the
// north, finishing with the short Chefchaouen -> Tangier day (Levante winds can cancel Tarifa ferries; a short last day leaves room to switch
// to Tanger Med or the next sailing). Tripadvisor forum on Oualidia: lovely at high tide, mud flats at low tide.
// Oualidia hotels (Tripadvisor): Dar Beldi Maison d'Hôtes, Hôtel L'Hippocampe (on the lagoon, pool), La Sultana Oualidia (luxury, lagoon).
// OSRM: Tangier -> Asilah 49 + -> Rabat 203 (t14-a 252 km), Rabat -> Casablanca 95 -> El Jadida 102 -> Oualidia 112 (t14-b 309 km),
// Oualidia -> Safi 67 -> Essaouira 123 (t14-c 190 km). Loop about 2,500 km.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/14-day-tangier-to-tangier-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/14-day-tangier-to-tangier-tour.html';
const NAME = '14-Day Morocco Tour from Tangier to Tangier';
const TITLE = '14-Day Morocco Tour from Tangier and Back | Private Loop';
const DESC = 'A private 14-day loop from Tangier and back: the Atlantic coast to Essaouira, two nights in Marrakech, the High Atlas, the Dades and Todra gorges, two nights by the Merzouga dunes, Fes and Chefchaouen. Never the same road twice.';
const HERO = 'sahara-caravan-ridge-golden.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="14 day Morocco itinerary, 2 week Morocco itinerary, Morocco round trip from Tangier, Tangier ferry, Asilah, Oualidia, Essaouira, Marrakech, Merzouga, Fes, Chefchaouen, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Tangier → Asilah → Rabat',
    p: 'Your driver-guide meets you off the ferry at the port, at Tanger Med, at the airport or at your hotel. Down the Atlantic to Asilah, a white seaside medina painted with murals, for lunch by the ramparts, then on to Rabat, the capital, for the evening.',
    meta: [['car', 'About 250 km, about 3 hours on the motorway'], ['bed', 'Night: Rabat'], ['food', 'Breakfast from day 2']] },
  { t: 'Rabat → Casablanca → El Jadida → Oualidia',
    p: 'The Kasbah of the Oudayas and the Hassan Tower in the morning light, then the Hassan II Mosque in Casablanca, built over the ocean. South along the coast to the Portuguese cistern of El Jadida and the calm lagoon of Oualidia, famous for its oysters.',
    meta: [['car', 'About 310 km, about 4 hours on the road'], ['bed', 'Night: Oualidia'], ['food', 'Breakfast']] },
  { t: 'Oualidia → Safi → Essaouira',
    p: 'A quiet morning on the lagoon, then the coast road past the potters’ hill of Safi and the argan country to Essaouira, the walled port on the ocean, in time for a first walk on the Skala ramparts at sunset.',
    meta: [['car', 'About 190 km, about 3 hours on the road'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira: a day by the ocean',
    p: 'No driving: the blue fishing boats in the harbour, grilled fish for lunch, the Mellah and the woodworkers under the ramparts, and the long beach. The trade winds make it a fresh, easy day after the road.',
    meta: [['car', 'No driving unless you ask'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira → Marrakech',
    p: 'East across the argan plains to Marrakech, your riad in the medina by lunchtime and a free afternoon. Jemaa el-Fnaa comes alive after dark with music and food stalls.',
    meta: [['car', 'About 190 km, about 2.5–3 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the Red City',
    p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Ben Youssef Madrasa and the souks. In the afternoon, the Majorelle Garden or the riad pool, as you like.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou',
    p: 'Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, past Berber villages clinging to the slopes, to Aït Ben Haddou. An afternoon walk up through the ksar and a sunset from the old granary, then a night beside it.',
    meta: [['car', 'About 190 km, about 4 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Skoura → Valley of Roses → Dades Gorge',
    p: 'The Road of a Thousand Kasbahs: the palm oasis of Skoura and its kasbahs, the rose villages of Kelaat M’Gouna, then up the Dades Gorge among red cliffs and the rock formations called the Monkey Fingers.',
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
  { t: 'Fes → Volubilis → Chefchaouen',
    p: 'The Roman town of Volubilis, with its mosaics and triumphal arch, then north into the green Rif hills to Chefchaouen, the blue town, for an evening in its lanes and sunset from the Spanish Mosque.',
    meta: [['car', 'About 265 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Tetouan → Tangier, end of the tour',
    p: 'A last morning in the blue lanes, then down through Tetouan to Tangier: the city port for the Tarifa ferry, Tanger Med for Algeciras, the airport or your hotel. A short day, so there is time to spare for your crossing.',
    meta: [['car', 'About 125 km, about 2.5 hours on the road'], ['flag', 'Ends at Tangier port, Tanger Med or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on a golden dune ridge in the Sahara" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>14-Day Tangier Round Trip</span></nav>', 'crumb');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>14-Day Morocco Tour from Tangier and Back<span class="script">The Whole Country in One Loop</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>14 days / 13 nights', 'duration');
rep('<small>Route</small><b>Tangier → Marrakech</b>', '<small>Route</small><b>Tangier round trip</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Two weeks around the whole of Morocco, starting and ending at the Strait of Gibraltar. Down the Atlantic by Asilah, Rabat, the Hassan II Mosque and the oyster lagoon of Oualidia to two nights in Essaouira, then two nights in Marrakech with a guided day in the Red City.</p>
          <p class="dt-lead">Over the High Atlas to Aït Ben Haddou, through the Dades and Todra gorges to two nights by the dunes of Erg Chebbi, then north to Fes and the blue town of Chefchaouen. A full loop that never uses the same road twice, with your own car and driver-guide all the way.</p>
`, 'overview');
rep('<dd>Tangier → Marrakech</dd>', '<dd>Tangier round trip</dd>', 'kf1');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>The loop</dt><dd>No road driven twice</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The white seaside medina of Asilah',
  'Inside the Hassan II Mosque',
  'The oyster lagoon of Oualidia',
  'Two nights in Essaouira by the ocean',
  'A guided day in Marrakech',
  'A night beside Aït Ben Haddou',
  'The Dades and Todra gorges',
  'Two nights by the Merzouga dunes',
  'Fes, Volubilis and blue Chefchaouen',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-tangier-lighthouse.jpg', 'The lighthouse at Cap Spartel near Tangier', 1300, 866],
  ['essaouira.jpg', 'The blue fishing boats of Essaouira', 1080, 1350],
  ['dades-valley-red-green.jpg', 'Red cliffs and green fields in the Dades Valley', 1300, 867],
  ['merzouga-dune.jpg', 'A dune crest at Merzouga', 1170, 1560],
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes', 975, 1300],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour', 1440, 1920],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Marrakech and Fes',
  'Pick-up and drop-off at Tangier port or airport',
  '13 nights as in the table below',
  '13 breakfasts and 4 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight times both ways',
  'The Hassan II Mosque is closed to visits on Fridays',
  'Small bag for the camp; luggage goes by 4×4',
  'Essaouira is windy: bring a light jacket',
  'Desert and Atlas nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Portuguese cistern, El Jadida:</b> small fee',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>A loop from Tangier by the Atlantic coast, Marrakech, the Sahara, Fes and Chefchaouen, about 2,500 km in 14 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Tangier,Morocco&amp;waypoints=Rabat,Morocco%7COualidia,Morocco%7CEssaouira,Morocco%7CMarrakech,Morocco%7CAit+Ben+Haddou,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CChefchaouen,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const rab = [A('https://www.tripadvisor.com/Hotel_Review-g293736-d12390293-Reviews-Riad_Dar_Saidi-Rabat_Rabat_Sale_Kenitra.html', 'Riad Dar Saidi'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d3724817-Reviews-Riad_Zyo-Rabat_Rabat_Sale_Kenitra.html', 'Riad Zyo'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d300677-Reviews-Sofitel_Rabat_Jardin_des_Roses-Rabat_Rabat_Sale_Kenitra.html', 'Sofitel Jardin des Roses')];
const oua = [A('https://www.tripadvisor.com/Hotel_Review-g580099-d650356-Reviews-Dar_Beldi_Maison_D_Hotes-Oualidia_Casablanca_Settat.html', 'Dar Beldi'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d524223-Reviews-Hotel_L_Hippocampe-Oualidia_Casablanca_Settat.html', 'Hôtel L’Hippocampe'), A('https://www.tripadvisor.com/Hotel_Review-g580099-d630259-Reviews-La_Sultana_Oualidia-Oualidia_Casablanca_Settat.html', 'La Sultana Oualidia')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Rabat', rab], ['2: Oualidia', oua], ['3–4: Essa&shy;ouira', ess], ['5–6: Marra&shy;kech', mrk], ['7: Aït Ben Haddou', abh], ['8: Dades Valley', dad], ['9: Desert camp', camp], ['10: Merzouga', mzh], ['11–12: Fes', fes], ['13: Chef&shy;chaouen', chf]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers coming by ferry from Spain and going back the same way',
  'Anyone with two weeks who wants every side of Morocco',
  'Road-trip lovers: coast, mountains, desert and medinas',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Flying home from Marrakech? The <a href="12-days-grand-morocco.html">12-day Grand Morocco tour</a> runs from Tangier to Marrakech, ending with Essaouira',
  'Only 10 days? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> keeps the north, Fes and the Sahara, ending in Marrakech',
  'Want the wild deep south? The <a href="13-day-tangier-to-marrakech-tour.html">13-day Tangier to Marrakech tour</a> goes off-road to Ouzina and Zagora',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 't14-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['What if our return ferry is cancelled by the wind?', 'The Levante wind sometimes stops the Tarifa ferries for a few hours or a day. That is why the last day is short: we watch the forecast with you and can switch you to Tanger Med and the larger Algeciras ships, or plan a later sailing.'],
  ['Why go down the coast first?', 'Going south by Rabat, Oualidia and Essaouira means you reach the ocean without driving Marrakech to Essaouira and back. The loop then crosses the Atlas, the desert and the north, so no road is driven twice.'],
  ['Can we bring our own car on the ferry instead?', 'Many people do, but a private driver means no Moroccan insurance papers, no navigating medinas and no long desert days at the wheel. Leave your car at the port in Spain and walk on, and we meet you on the Tangier side.'],
  ['Which days are the long drives?', 'Day 11, Merzouga to Fes, about eight hours with stops, and day 9 to the dunes, about five and a half. Days 4, 6, 10 and 12 have little or no driving, and the last day to Tangier is short.'],
  ['Is Oualidia worth the night?', 'Yes, if you like slow places. The lagoon is calm and beautiful at high tide, the oysters and fish are the best on the coast, and it breaks the long drive to Essaouira. At low tide the water draws back over the sand flats.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A first night in Tangier, with Cap Spartel',
  'A second night in Chefchaouen',
  'Upgrade to a luxury camp with heated tents',
  'A <a href="marrakech-hot-air-balloon-ride.html">balloon flight</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'A day in the Atlas villages from Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%2014-Day%20Morocco%20Tour%20from%20Tangier%20to%20Tangier.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>14-Day Tangier Round Trip</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 14-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 't14-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Ferry travellers from Spain'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier and Asilah', 'Rabat (night 1)', 'Hassan II Mosque, El Jadida and the Oualidia lagoon (night 2)', 'Safi and Essaouira (nights 3–4)', 'Marrakech with a guided day (nights 5–6)', 'Tizi n’Tichka and Aït Ben Haddou (night 7)', 'Skoura, the Valley of Roses and the Dades Gorge (night 8)', 'Todra Gorge and a camel ride to a desert camp (night 9)', 'A day around Merzouga (night 10)', 'Ziz Valley, Midelt and Ifrane to Fes (nights 11–12)', 'Volubilis and Chefchaouen (night 13)', 'Tetouan and back to Tangier'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '2 nights by the dunes', '7-day route']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
