// Build tours/12-day-marrakech-to-casablanca-tour.html (Marrakech x2 -> Essaouira x2 -> Aït Ben Haddou -> Dades Gorge -> Merzouga camp + hotel
// -> Fes x2 -> Meknes/Volubilis -> Chefchaouen -> Rabat -> Casablanca, ends day 12). Template = the finished 7-day Tangier -> Marrakech page.
// Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "chefchaouen to casablanca" 140, "12 day morocco itinerary" 110 (earlier), "marrakech to essaouira" 480 (earlier).
// SERP (WebSearch; Firecrawl out of credits): TourRadar private 12-day tours (Tangier start, Essaouira only as a DAY TOUR from Marrakech, ends
// Casablanca; Casablanca start reversed with an Essaouira beach walk), kimkim north-to-south 12-day (Merzouga days 4-5, Essaouira day 9,
// Casablanca days 10-12), onthegotours "Sizzling Morocco 12 days", Morocco Friendly Travel private 12-day (Essaouira as a day trip).
// Expert choices: Essaouira gets two real nights (not a 6-hour round trip), placed at the START, so the tour leaves the coast straight for the
// High Atlas (Essaouira -> Aït Ben Haddou passes Marrakech on the ring road, about 6.5 hours) and never doubles back; then the classic south,
// two desert nights, Fes x2, Chefchaouen, and the motorway via Rabat to Casablanca on the last day (Hassan II Mosque if the flight allows;
// morning flights -> add a night in Casablanca or Rabat). Our 10-day Marrakech -> Casablanca has no Essaouira.
// Roads: essaouira (Marrakech <-> Essaouira), mf7-d1, ag5-d2, ag5-d3, mzf3-d3, mt7, mc10-d9 (Chefchaouen -> Rabat), ic1 (Rabat <-> Casablanca).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/12-day-marrakech-to-casablanca-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/12-day-marrakech-to-casablanca-tour.html';
const NAME = '12-Day Morocco Tour from Marrakech to Casablanca';
const TITLE = '12-Day Morocco Tour: Marrakech to Casablanca | Private';
const DESC = 'A private 12-day Morocco itinerary from Marrakech to Casablanca: two nights in Marrakech and Essaouira, Aït Ben Haddou, the Dades and Todra gorges, two by the Merzouga dunes, Fes, Chefchaouen and Rabat.';
const HERO = 'sahara-camel-pink-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="12 day Morocco itinerary, Marrakech to Casablanca tour, Essaouira, Sahara desert tour, Fes, Chefchaouen, Rabat, private Morocco tour">', 'kw');
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
  { t: 'Fes → Volubilis → Chefchaouen',
    p: 'The Roman town of Volubilis, with its mosaics and triumphal arch, then north into the green Rif hills to Chefchaouen, the blue town, for an afternoon in its lanes and sunset from the Spanish Mosque.',
    meta: [['car', 'About 265 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Rabat → Casablanca, end of the tour',
    p: 'A last morning in the blue lanes, then down to the Atlantic: the Kasbah of the Oudayas and the Hassan Tower in Rabat, and the Hassan II Mosque in Casablanca if your flight allows. Drop-off at Casablanca airport or your hotel.',
    meta: [['car', 'About 340 km, about 5 hours on the road'], ['flag', 'Ends at Casablanca airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride in the Sahara at a pink sunset" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>12-Day Marrakech to Casablanca</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Tangier</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Marrakech</span>', 'chip');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>12-Day Morocco Tour from Marrakech to Casablanca<span class="script">From the Ocean to the Dunes and Back</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>12 days / 11 nights', 'duration');
rep('<small>Route</small><b>Tangier → Marrakech</b>', '<small>Route</small><b>Marrakech → Casablanca</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Twelve days from Marrakech to Casablanca, with time to settle in each place. Two nights in Marrakech with a guided day in the Red City, then two real nights by the ocean in Essaouira, not a rushed day trip.</p>
          <p class="dt-lead">Straight from the coast over the High Atlas to Aït Ben Haddou, through the Dades and Todra gorges to two nights by the dunes of Erg Chebbi, then Fes, the blue town of Chefchaouen and Rabat on the way to Casablanca. Your own car and driver-guide all the way.</p>
`, 'overview');
rep('<dd>Tangier → Marrakech</dd>', '<dd>Marrakech → Casa</dd>', 'kf1');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Coast</dt><dd>2 nights in Essaouira</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'A guided day in Marrakech',
  'Two nights in Essaouira by the ocean',
  'A night beside Aït Ben Haddou',
  'The Dades and Todra gorges',
  'Two nights by the Merzouga dunes',
  'Tea with a nomad family',
  'A guided day in the Fes medina',
  'Volubilis and blue Chefchaouen',
  'Rabat and the Hassan II Mosque',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['marrakech-medina-walk.jpg', 'Walking in the Marrakech medina', 1600, 1066],
  ['essaouira-skala-port.jpg', 'The Skala ramparts and harbour of Essaouira', 1000, 667],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['merzouga-white-camel.jpg', 'A white camel on the Merzouga dunes', 1600, 900],
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
  ['chefchaouen-city.webp', 'Chefchaouen on the slopes of the Rif', 1300, 732],
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
  '11 nights as in the table below',
  '11 breakfasts and 4 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight times both ways',
  'Essaouira is windy: bring a light jacket',
  'Small bag for the camp; luggage goes by 4×4',
  'Fly home from Casablanca in the evening',
  'Desert and Atlas nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Skala du Port, Essaouira:</b> small fee',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Hassan II Mosque:</b> 140 MAD, if time allows',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Marrakech to Casablanca by Essaouira, the Sahara, Fes and Chefchaouen, about 2,150 km in 12 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Casablanca,Morocco&amp;waypoints=Essaouira,Morocco%7CAit+Ben+Haddou,Morocco%7CBoumalne+Dades,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CChefchaouen,Morocco%7CRabat,Morocco&amp;travelmode=driving"', 'mapnote');
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
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1–2: Marra&shy;kech', mrk], ['3–4: Essa&shy;ouira', ess], ['5: Aït Ben Haddou', abh], ['6: Dades Valley', dad], ['7: Desert camp', camp], ['8: Merzouga', mzh], ['9–10: Fes', fes], ['11: Chef&shy;chaouen', chf]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying into Marrakech and out of Casablanca',
  'Anyone who wants the coast, the desert and the north',
  'Couples who like two nights in the best places',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only 10 days? The <a href="10-day-marrakech-to-casablanca-tour.html">10-day Marrakech to Casablanca tour</a> skips Essaouira and adds a second night in Chefchaouen',
  'Arriving from Spain? The <a href="12-days-grand-morocco.html">12-day Grand Morocco tour</a> runs from Tangier to Marrakech with a night in Essaouira',
  'Only one week? The <a href="8-day-marrakech-to-casablanca-tour.html">8-day Marrakech to Casablanca tour</a> keeps the desert, Fes and Chefchaouen',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mc12-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why two nights in Essaouira instead of a day trip?', 'A day trip means about six hours in the car for a few hours in town. With two nights you see Essaouira in the quiet morning and evening, after the day visitors leave, and the drive on to the mountains starts fresh.'],
  ['Is the day from Essaouira to Aït Ben Haddou long?', 'Yes, about six and a half hours with stops: we pass Marrakech on the ring road and cross the High Atlas. It saves you from going back to Marrakech for a night, and you arrive at Aït Ben Haddou for sunset.'],
  ['Which days are the long drives?', 'Day 5, Essaouira to Aït Ben Haddou, and day 9, Merzouga to Fes, about eight hours with stops. Days 2, 4, 8 and 10 have little or no driving.'],
  ['Can we see the Hassan II Mosque on the last day?', 'If your flight leaves in the evening and day 12 is not a Friday, yes. For a morning flight, add a night in Casablanca or Rabat so you can see the mosque and travel without rushing.'],
  ['Can we end at Casablanca airport?', 'Yes. Mohammed V airport is about 30 minutes south of the city, and we drop you there with time to spare. We can also end at a hotel in Casablanca or Rabat, or at a train station.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-hot-air-balloon-ride.html">balloon flight</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'The Oualidia lagoon on the way to Casablanca',
  'Upgrade to a luxury camp with heated tents',
  'A second night in Chefchaouen',
  'A last night in Casablanca or Rabat',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%2012-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Casablanca.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>12-Day Marrakech to Casa</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 12-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mc12-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech with a guided day (nights 1–2)', 'Essaouira on the Atlantic (nights 3–4)', 'Tizi n’Tichka and Aït Ben Haddou (night 5)', 'Skoura, the Valley of Roses and the Dades Gorge (night 6)', 'Todra Gorge and a camel ride to a desert camp (night 7)', 'A day around Merzouga (night 8)', 'Ziz Valley, Midelt and Ifrane to Fes (nights 9–10)', 'Volubilis and Chefchaouen (night 11)', 'Rabat and Casablanca'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '2 nights by the dunes', '7-day route', 'ferry', 'Tanger Med']) { const n = s.split(bad).length - 1; if (n) console.warn('CHECK:', bad, n); }
fs.writeFileSync(out, s);
console.log('written', s.length);
