// Build tours/10-day-marrakech-to-casablanca-tour.html (Marrakech -> Aït Ben Haddou -> Dades -> Merzouga camp + hotel -> Fes x2 -> Volubilis -> Chefchaouen x2 -> Rabat -> Casablanca)
// Template = the finished 10-day Marrakech -> Tangier page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): SERP "10 day morocco tour from marrakech to casablanca": privatedeserttours 10-day from Marrakech (arrival day in
// Marrakech, Dades, camp, Fes x2 470 km day, Chefchaouen x2 + Akchour, Rabat, Casablanca, Essaouira; FAQ: is 10 days enough, fitness,
// best time, changes), Tripadvisor 10 private days Sahara & Chefchaouen (5.0), tourradar. Most start in Casablanca; few end there.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/10-day-morocco-tour-marrakech-to-tangier.html';
const out = root + 'tours/10-day-marrakech-to-casablanca-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/10-day-marrakech-to-casablanca-tour.html';
const NAME = '10-Day Morocco Tour from Marrakech to Casablanca';
const TITLE = '10-Day Morocco Tour from Marrakech to Casablanca | Private';
const DESC = 'Private 10-day Morocco itinerary from Marrakech to Casablanca: Aït Ben Haddou, the Dades and Todra gorges, two nights by the Merzouga dunes, two in Fes, two in Chefchaouen, Rabat and the Hassan II Mosque before your flight.';
const HERO = 'camel-dune-ridge.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="10 day Morocco itinerary, Marrakech to Casablanca tour, Sahara desert tour, Fes, Chefchaouen, Rabat, Hassan II Mosque, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/10-day-morocco-tour-marrakech-to-tangier\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech: arrival and a guided walk in the medina',
    p: 'Met at Marrakech airport or your riad. In the afternoon a local guide walks you through the medina: the Koutoubia, the Bahia Palace, the souks and the Ben Youssef Madrasa, ending on Jemaa el-Fnaa as the food stalls light up. A first night in a riad in the old town.',
    meta: [['car', 'Afternoon on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast from day 2']] },
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Dades Valley',
    p: 'Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to Aït Ben Haddou and a walk up through the ksar to its granary. Past Ouarzazate, the Skoura palm grove and the Valley of Roses to the Dades Valley for the evening.',
    meta: [['car', 'About 370 km, about 7 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'The hairpin bends of the Dades Gorge in the morning light, then a walk between the 300 m walls of the Todra Gorge. East along the oasis road to the dunes of Erg Chebbi, a camel ride into the sand for sunset, dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 320 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, breakfast, and back by camel or 4×4. A day in the desert with no long drive: tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains and the Rissani market. A hot shower and a calm night in a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'North up the palm gorges of the Ziz Valley and over the Atlas to Midelt for lunch, then the cedar forest of Azrou with its Barbary macaques and the alpine town of Ifrane, reaching your riad in the Fes medina in the early evening.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Volubilis → the Rif → Chefchaouen',
    p: 'West to Volubilis, the Roman town on the plain, for a walk among its mosaics and triumphal arch, then north into the green hills of the Rif to Chefchaouen, in time for sunset from the Spanish Mosque.',
    meta: [['car', 'About 265 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A slow day in the lanes of blue houses, the Outa el-Hammam square and the Kasbah garden. Walkers can head to the Akchour waterfalls in the Talassemtane park with your driver-guide instead.',
    meta: [['car', 'Free day; Akchour on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Rabat → Casablanca',
    p: 'South through the Rif and the farmland of the Gharb to Rabat, the capital: the Kasbah des Oudayas above the river mouth, the Hassan Tower and the Mausoleum of Mohammed V. On to Casablanca for an evening by the ocean on the Corniche.',
    meta: [['car', 'About 340 km, about 5.5 hours on the road'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast']] },
  { t: 'Casablanca: the Hassan II Mosque and your flight',
    p: 'A guided visit inside the Hassan II Mosque, built over the Atlantic, if your flight allows (visits run Saturday to Thursday). Then about 45 minutes to Mohammed V airport, at the time you need.',
    meta: [['car', 'City to the airport, about 45 minutes'], ['flag', 'Ends at Casablanca airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/grand-chefchaouen-blue\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels walking along a dune ridge in the Sahara" loading="eager"`, 'hero img');
rep('<span>10-Day Marrakech to Tangier</span></nav>', '<span>10-Day Marrakech to Casablanca</span></nav>', 'crumb');
rep('<h1>10-Day Morocco Tour from Marrakech to Tangier<span class="script">From the Sahara to the Strait</span></h1>', '<h1>10-Day Morocco Tour from Marrakech to Casablanca<span class="script">From the Red City to the Ocean</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Tangier</b>', '<small>Route</small><b>Marrakech → Casablanca</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Land in Marrakech, fly home from Casablanca, and see the whole of Morocco in between. A guided first afternoon in the Marrakech medina, then over the High Atlas to Aït Ben Haddou, the Dades and Todra gorges and two nights by the dunes of Erg Chebbi: a camp after a sunset camel ride and a hotel after a day with the nomads.</p>
          <p class="dt-lead">Then north to Fes for a guided day in its medina, the Roman ruins of Volubilis, two slow days in blue Chefchaouen, Rabat, and a last morning inside the Hassan II Mosque before your flight. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Tangier</dd>', '<dd>Marrakech → Casa</dd>', 'kf1');
rep('<dt>Blue town</dt><dd>2 nights in Chefchaouen</dd>', '<dt>Last morning</dt><dd>Hassan II Mosque</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'A guided walk in the Marrakech medina',
  'Aït Ben Haddou and the High Atlas',
  'The Dades and Todra gorges',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'A guided day in the Fes medina',
  'Two slow days in blue Chefchaouen',
  'The Kasbah des Oudayas in Rabat',
  'Inside the Hassan II Mosque',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['marrakech-medina-walk.jpg', 'Walking through the medina of Marrakech', 1600, 1066],
  ['dades-valley-green.jpg', 'Green fields and kasbahs in the Dades Valley', 1500, 1000],
  ['sahara-camel-group.jpg', 'Camels resting on the dunes of the Sahara', 1600, 1066],
  ['desert-camp-aerial-circular.jpg', 'A desert camp in the dunes seen from above', 1600, 1067],
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
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
  'Marrakech airport or riad pick-up',
  'Drop-off at Casablanca airport',
  '9 nights as in the table below',
  '9 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Hassan II Mosque: no visits on Fridays',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and Atlas nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace, Marrakech:</b> 100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Hassan II Mosque:</b> 140 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Tangier by the Sahara and Fes, about 1,600 km in 10 days\. <a href="[^"]*"/, '<span>Marrakech to Casablanca by the Sahara, Fes and Chefchaouen, about 1,800 km in 10 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Casablanca+Airport,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CBoumalne+Dades,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CVolubilis,Morocco%7CChefchaouen,Morocco%7CRabat,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Marra&shy;kech', mrk], ['2: Dades Valley', dad], ['3: Desert camp', camp], ['4: Merzouga', mzh], ['5–6: Fes', fes], ['7–8: Chef&shy;chaouen', chf], ['9: Casablanca', cas]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying into Marrakech and home from Casablanca',
  'First-timers who want the desert and the north',
  'Couples who like slow days in small towns',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Flying from Casablanca both ways? The <a href="10-day-morocco-tour-casablanca-round.html">10-day Casablanca round tour</a> loops back',
  'Going on to Spain? The <a href="10-day-morocco-tour-marrakech-to-tangier.html">10-day Marrakech to Tangier tour</a> ends at the port',
  'Only have a week? The <a href="8-day-marrakech-to-casablanca-tour.html">8-day Marrakech to Casablanca tour</a> keeps the same direction',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mc10-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is 10 days enough to see Morocco?', 'For a first trip, yes: Marrakech, the High Atlas, the Sahara, Fes, Chefchaouen and the coast. Two nights in the desert, Fes and Chefchaouen keep the pace easy; days 4, 6 and 8 have little or no driving.'],
  ['Which is the longest drive?', 'Day 5, Merzouga to Fes, about 470 km with stops in the Ziz Valley, Midelt and the cedar forest, and day 2 over the High Atlas, about seven hours with Aït Ben Haddou on the way. The other road days are five to six hours.'],
  ['Will we see the Hassan II Mosque before our flight?', 'Usually, yes. Guided visits run Saturday to Thursday in the morning, so on day 10 we visit before driving 45 minutes to the airport. For an early flight or a Friday, we see it on the evening of day 9 from the outside.'],
  ['What time should our flight leave Casablanca?', 'Any time from late morning works. For an early-morning flight we skip the mosque visit and drive you straight to the airport, or you sleep at a hotel near the airport.'],
  ['When is the best time for this route?', 'Spring (March to May) and autumn (September to November) are best for the desert and the cities alike. Summer days in the Sahara pass 40 °C, and winter nights in the camp and the Atlas are cold.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-hot-air-balloon-ride.html">hot air balloon ride</a> before you leave Marrakech',
  'Upgrade to a luxury camp',
  'A guided hike to the Akchour waterfalls',
  'Meknes on the way from Fes',
  'An extra night in Casablanca or Rabat',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="10-Day Morocco Tour from Marrakech to Tangier" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Tangier.', 'information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Casablanca.', 'wa');
rep('<b>10-Day Marrakech to Tangier</b><span>Free', '<b>10-Day Marrakech to Casablanca</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mc10-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Guided walk in the Marrakech medina (night 1)', 'Aït Ben Haddou and the Dades Valley (night 2)', 'Todra Gorge and a camel ride to a desert camp (night 3)', 'A day around Merzouga by 4×4 (night 4)', 'Ziz Valley, Midelt and Ifrane to Fes', 'Guided day in the Fes medina (nights 5–6)', 'Volubilis and Chefchaouen (nights 7–8)', 'Rabat and Casablanca (night 9)', 'Hassan II Mosque and Casablanca airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Tetouan', 'Cap Spartel', 'From the Sahara to the Strait', 'ferry']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
