// Build tours/10-days-morocco-journey.html (URL kept): 10-day Casablanca -> Marrakech.
// Casablanca airport + Hassan II Mosque -> Rabat (night 1) -> Chefchaouen (night 2) -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel
// -> Todra -> Dades -> Aït Ben Haddou -> Marrakech x2 (guided day) -> Marrakech or Casablanca airport.
// Template = the finished 8-day Imperial Cities page (same as build-c9.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17; OpenSEO out of credits, volume on file: "10 day morocco itinerary" ~480/month US):
// - moroccofabuloustravel.com/morocco-itinerary-10-days: Casablanca -> Rabat (night) -> Chefchaouen -> Volubilis/Meknes -> Fes x2 -> desert camp
//   -> Merzouga riad -> Dades -> Marrakech x2 (guided day) -> RAK or CMN airport; local guides in Fes + Marrakech, 3 dinners (camp, Merzouga, Dades);
//   FAQ: are 10 days enough, best month, transport, camp bathrooms, cancellation. Its Dades -> Marrakech day = 353 km / 6.5 h.
// - TourRadar Casablanca -> Marrakesh 10-day private tours (4.9/18, from ~US$2,218 pp), onthegotours "Morocco Discovery 10 days",
//   simply-morocco 10-day highlights: same north-to-south order; one operator recommends two desert nights.
// - kimkim 10-day trip review (Casablanca -> Chefchaouen -> Fes -> Merzouga -> Dades -> Marrakech): Fes guide = highlight; complaints:
//   camp schedule not told, promised camel ride didn't happen, music ~20 minutes; Chefchaouen hotel up a steep hill (hard for a disabled traveller).
// - Old page: same route as the proven one (Rabat night, 1 night Chefchaouen, 2 Sahara nights, guided Marrakech day).
// What is different from our 9-day Casablanca tour (Casablanca night, 2 Chefchaouen nights, ends on arrival in Marrakech): a calm Rabat night,
// and a guided day in Marrakech + free last morning, ending at Marrakech OR Casablanca airport. Answers: camp evening times told in advance,
// easy-access riad in Chefchaouen on request.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/10-days-morocco-journey.html';
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

const URL = 'https://moroccotourshub.com/tours/10-days-morocco-journey.html';
const NAME = '10-Day Morocco Tour from Casablanca to Marrakech';
const TITLE = '10-Day Morocco Tour from Casablanca to Marrakech | Private';
const DESC = 'Private 10-day Morocco itinerary from Casablanca to Marrakech: the Hassan II Mosque and a night in Rabat, Chefchaouen, Volubilis, two nights in Fes, two by the Merzouga dunes, the Todra and Dades gorges, Aït Ben Haddou and a guided day in Marrakech.';
const HERO = 'merzouga-couple-orange.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="10 day Morocco itinerary, 10 days in Morocco, Morocco tour from Casablanca, Casablanca to Marrakech, Chefchaouen, Fes, Sahara desert tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca airport → Hassan II Mosque → Rabat',
    p: 'Your driver-guide meets you in arrivals with your name on a sign, at whatever hour you land, and we follow your flight. Landing by early afternoon? A guided visit inside the Hassan II Mosque on the ocean, then up the coast to Rabat. Landing late? Straight to Rabat, or a night in Casablanca and the mosque in the morning.',
    meta: [['car', 'About 120 km, about 2 hours on the road'], ['bed', 'Night: Rabat'], ['food', 'Breakfast from day 2']] },
  { t: 'Rabat → Chefchaouen',
    p: 'A calm morning in the capital: the blue and white lanes of the Kasbah des Oudayas above the ocean, the Hassan Tower and the Mausoleum of Mohammed V. Then north through the farmland of the Gharb into the green Rif hills to Chefchaouen, the blue town, for the afternoon, the Outa el-Hammam square and sunset from the Spanish Mosque.',
    meta: [['car', 'About 250 km, about 4 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'An early walk through the blue lanes and up to the Ras el-Maa spring before the day visitors arrive. South through the Rif to Volubilis, the Roman town with its mosaics and triumphal arch, then Meknes for the great gate of Bab Mansour and Place el-Hedim. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa, the outside of the Al-Qarawiyyin and a rooftop above the Chouara tanneries. Shops only if you ask; the evening is yours.',
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
  { t: 'Marrakech → the airport, Marrakech or Casablanca',
    p: 'A free morning in Marrakech, then your driver-guide takes you to Marrakech airport at the time of your flight. Flying home from Casablanca? We drive you there by the motorway instead, about 2.5 to 3 hours, so you can still book an open-jaw flight home.',
    meta: [['car', 'Marrakech airport 20 min, Casablanca airport about 3 hours'], ['flag', 'Ends at the airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Two travellers on a dune at Merzouga in the evening light" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>10-Day Tour from Casablanca</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>10-Day Morocco Tour from Casablanca<span class="script">From the Atlantic to the Red City</span></h1>', 'h1');
rep('<b>8 days / 7 nights</b>', '<b>10 days / 9 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Ten days from Casablanca to Marrakech, the classic route through Morocco at a pace that lets you enjoy it. The Hassan II Mosque on the ocean, a calm night in Rabat, the blue lanes of Chefchaouen, the Roman ruins of Volubilis and Meknes, and two nights in Fes with a guided day in its medina.</p>
          <p class="dt-lead">Then two nights by the dunes of Erg Chebbi, a camp after a sunset camel ride and a hotel after a day with the nomads, the Todra and Dades gorges, Aït Ben Haddou and the High Atlas, and two nights in Marrakech with a local guide. Your own car and driver-guide all the way, riads in the old towns, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Marrakech</dt><dd>Guided day included</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'The Kasbah des Oudayas in Rabat',
  'The blue lanes of Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'Aït Ben Haddou and the High Atlas',
  'A guided day in Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour', 1440, 1920],
  ['fes-guide.jpg', 'Walking the Fes medina with a local guide', 1170, 1463],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led over the Merzouga dunes', 1300, 866],
  ['todra-gorge-bridge.jpg', 'The bridge into the Todra Gorge', 1600, 1066],
  ['marrakech-medina-walk.jpg', 'A lane in the Marrakech medina', 1600, 1066],
  ['jemaa-el-fna-dusk-stalls.jpg', 'Food stalls on Jemaa el-Fnaa at dusk', 1600, 1201],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Casablanca airport pick-up, any hour',
  'Drop-off at Marrakech or Casablanca airport',
  '9 nights as in the table below',
  '9 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Hassan II Mosque: no visits on Fridays',
  'Chefchaouen is steep: ask for an easy-access riad',
  'Winter desert nights are cold: ask for a heated tent',
  'Small bag for the camp; luggage stays in the car',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by Chefchaouen, Fes and the Sahara, about 1,700 km in 10 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const rab = [A('https://www.tripadvisor.com/Hotel_Review-g293736-d12390293-Reviews-Riad_Dar_Saidi-Rabat_Rabat_Sale_Kenitra.html', 'Riad Dar Saidi'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d3724817-Reviews-Riad_Zyo-Rabat_Rabat_Sale_Kenitra.html', 'Riad Zyo'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d300677-Reviews-Sofitel_Rabat_Jardin_des_Roses-Rabat_Rabat_Sale_Kenitra.html', 'Sofitel Jardin des Roses')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Rabat', rab], ['2: Chef&shy;chaouen', chf], ['3–4: Fes', fes], ['5: Desert camp', camp], ['6: Merzouga', mzh], ['7: Dades Valley', dad], ['8–9: Marra&shy;kech', mar]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'First-timers who want the classic route',
  'Travellers who like a city guide in Fes and Marrakech',
  'Couples and families flying in to Casablanca',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 9 days? The <a href="9-day-morocco-private-tour-from-casablanca.html">9-day tour from Casablanca</a> ends on arrival in Marrakech',
  'Starting in Marrakech? The <a href="10-day-marrakech-to-casablanca-tour.html">10-day Marrakech to Casablanca tour</a> runs the other way',
  'Arriving by ferry from Spain? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> starts at the port',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'jn10-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are 10 days enough for Morocco?', 'For a first trip, yes. You see the Atlantic coast, the blue town, all four imperial cities, the Sahara and the High Atlas, with two nights in Fes, the desert and Marrakech. Only day 5, Fes to Merzouga, and day 8 over the High Atlas are long drives.'],
  ['Why a night in Rabat and not Casablanca?', 'Rabat is calmer, its old Kasbah sits right on the ocean, and it is an hour and a half closer to Chefchaouen, so day 2 stays short. If your flight lands late, we can book the first night in Casablanca instead and see the mosque in the morning.'],
  ['What happens at the desert camp?', 'You reach the camp by camel at sunset, have mint tea, a three-course dinner and music by the fire, and wake for sunrise on the dunes. Your driver-guide tells you the times for dinner, music and the morning ride before you arrive, so nothing is missed.'],
  ['Can we fly home from Casablanca?', 'Yes. On day 10 we drive you from Marrakech to Casablanca airport by the motorway, about 2.5 to 3 hours. Book a flight from the early afternoon onwards; for a morning flight, we spend the last night near Casablanca instead.'],
  ['Which days are long drives?', 'Day 5, Fes to Merzouga, about 8 hours, and day 8, Dades to Marrakech, about 6 hours, with stops for photos, tea and lunch. The other days are 2 to 5 hours, and you stop whenever you want.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp with heated tents',
  'A second night in Chefchaouen instead of Rabat',
  'Quad biking in the Merzouga dunes',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'A <a href="marrakech-cooking-class.html">cooking class</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Casablanca%20to%20Marrakech.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>10-Day from Casablanca</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 10-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'jn10-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca airport pick-up, the Hassan II Mosque and Rabat (night 1)', 'Chefchaouen (night 2)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 3–4)', 'Ifrane, Midelt and a camel ride to a desert camp (night 5)', 'A day around Merzouga with a nomad family (night 6)', 'Todra Gorge and the Dades Valley (night 7)', 'Aït Ben Haddou and Tizi n’Tichka to Marrakech (nights 8–9)', 'Guided day in the Marrakech medina', 'Marrakech or Casablanca airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Four Royal Cities', '4 imperial cities', 'Night 7: Marrakech', 'Night: Rabat</li><li>', 'Imperial Cities &amp; Sahara']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
