// Build tours/8-day-morocco-tour-from-tangier.html (Tangier -> Tetouan -> Chefchaouen -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel -> Todra
// -> Dades -> Aït Ben Haddou -> Marrakech x1 with a guided day, ends day 8). Template = the finished 7-day Tangier -> Marrakech page.
// Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "8 day morocco itinerary" 140, "morocco itinerary 8 days" 140, "tangier to chefchaouen" 590, "tangier to fes" 170,
// "8 day morocco tour" 20, "morocco tour from tangier" 10. SERP "8 day Morocco tour from Tangier to Marrakech": Tripadvisor "Morocco in 8 Days: Private
// Chefchaouen, Fes, Desert, Marrakech" (5.0 / 128; Casablanca start, Chefchaouen, Fes x2, Merzouga, Ouarzazate, Marrakech x2, back to Casablanca),
// Booking.com "8-Days Morocco Tour: Tangier to Marrakech via Sahara" (7 nights, night 1 in the Tangier Kasbah, local guides in Fes AND Marrakech,
// sunset + sunrise on Erg Chebbi, port/airport pick-up, fuel + tolls), sahara-holidaytours.com 8-day from Tangier (Chefchaouen, Meknes, Fes guided,
// camp, Dades, Aït Ben Haddou, guided Marrakech day, back north on day 8), todiscovermorocco 8-day (Marrakech start, ends in the north).
// Proven structure for 8 days from Tangier = the 7-day route + a guided day in Marrakech before flying home (local guides in Fes and Marrakech).
// Our 7-day Tangier -> Marrakech ends on arrival in Marrakech (day 7, early evening); this one adds the night and a guided Marrakech day.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/8-day-morocco-tour-from-tangier.html';
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

const URL = 'https://moroccotourshub.com/tours/8-day-morocco-tour-from-tangier.html';
const NAME = '8-Day Morocco Tour from Tangier to Marrakech';
const TITLE = '8-Day Morocco Tour from Tangier to Marrakech | Private';
const DESC = 'A private 8-day Morocco itinerary from Tangier: Chefchaouen, Volubilis and Meknes, a guided day in Fes, two nights by the Merzouga dunes, the Todra and Dades gorges, Aït Ben Haddou and a guided day in Marrakech.';
const HERO = 'merzouga-white-camel.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="8 day Morocco itinerary, 8 day Morocco tour from Tangier, Tangier to Marrakech, Chefchaouen, Fes, Sahara desert tour, Marrakech guided tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Tangier → Tetouan → Chefchaouen',
    p: 'Your driver-guide meets you off the ferry at the port, at Tanger Med, at the airport or at your hotel. A walk in the white Andalusian medina of Tetouan, then up into the green Rif hills to Chefchaouen, the blue town, in time for sunset from the Spanish Mosque.',
    meta: [['car', 'About 125 km, about 2.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast from day 2']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'An early walk in the blue lanes, then south to Volubilis, the Roman town with its mosaics and triumphal arch, and Meknes, with the great gate of Bab Mansour and Moulay Ismail’s granaries. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide through the 9,000 lanes of Fes el-Bali: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane, the cedar forest of Azrou with its Barbary macaques, lunch in Midelt, then the palm gorges of the Ziz Valley to Erg Chebbi. A camel ride into the dunes for sunset, dinner and drums by the fire in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, then a day with no long road: tea with a nomad family, the Gnawa musicians of Khamlia and the market town of Rissani. A hot shower and a quiet night in a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Tinghir → Todra Gorge → Dades Valley',
    p: 'West along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge, then up the Dades Valley, among red cliffs and earthen villages, for the night.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to your Marrakech riad in the early evening.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided morning, then home',
    p: 'With a local Marrakech guide: the Koutoubia, the painted cedar ceilings of the Bahia Palace, the Ben Youssef Madrasa and the souks around Jemaa el-Fnaa. Lunch where you like, then your driver takes you to your hotel or Marrakech airport.',
    meta: [['car', 'Morning on foot in the medina'], ['flag', 'Ends at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A white camel on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>8-Day Tour from Tangier</span></nav>', 'crumb');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>8-Day Morocco Tour from Tangier<span class="script">The North, the Sahara and Marrakech</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>8 days / 7 nights', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Eight days from the Strait of Gibraltar to Marrakech, starting the moment you arrive in Tangier. The blue town of Chefchaouen, the Roman ruins of Volubilis and Meknes, then two nights in Fes with a local guide in its medina.</p>
          <p class="dt-lead">Two nights by the dunes of Erg Chebbi, the Todra and Dades gorges and Aït Ben Haddou on the way over the High Atlas, and a last day in Marrakech with a local guide before you fly home. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Marrakech</dt><dd>Guided day included</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Met at Tangier port or airport',
  'Sunset over blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'The cedar forest and its macaques',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'The Todra Gorge and Aït Ben Haddou',
  'A guided morning in Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-chefchaouen-blue.jpg', 'The blue lanes of Chefchaouen', 1300, 866],
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes', 975, 1300],
  ['ziz-valley-plateau.jpg', 'The palm gorges of the Ziz Valley', 1600, 1066],
  ['merzouga-camel-caravan-guide.jpg', 'A guide leading camels on the Merzouga dunes', 1300, 866],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['bahia-palace-courtyard.jpg', 'The courtyard of the Bahia Palace in Marrakech', 1600, 1067],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Pick-up at Tangier port, airport or hotel',
  'Drop-off at your Marrakech hotel or airport',
  '7 nights as in the table below',
  '7 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and Atlas nights are cold in winter',
  'Flying home on day 8? Book an afternoon flight',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 8 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Tetouan,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Chef&shy;chaouen', chf], ['2–3: Fes', fes], ['4: Desert camp', camp], ['5: Merzouga', mzh], ['6: Dades Valley', dad], ['7: Marra&shy;kech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving by ferry or flight in Tangier',
  'Anyone flying home from Marrakech',
  'First-timers who want local guides in the cities',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only one week? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day Tangier to Marrakech tour</a> takes the same road and ends on arrival in Marrakech',
  'Want more time in the north? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> adds Asilah and two nights in Chefchaouen',
  'Want the coast too? The <a href="12-days-grand-morocco.html">12-day Grand Morocco tour</a> ends with a night in Essaouira',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'tg8-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are 8 days enough for Morocco?', 'Enough for the classic loop: the north, Fes, the Sahara, the High Atlas and Marrakech. You get two nights in Fes and two by the dunes, with a guided day in both big cities, so it never feels like only driving.'],
  ['Will you meet us at the ferry or the airport?', 'Yes, at any hour. Ferries from Tarifa arrive in the city port of Tangier; from Algeciras at Tanger Med, about 45 minutes away. Your driver-guide waits at the exit with your name and follows any delay.'],
  ['Can we fly home on day 8?', 'Yes. The guided walk in Marrakech is in the morning, so an afternoon or evening flight works well. If your flight is early, we keep the guided visit on the evening of day 7 or skip it, as you prefer.'],
  ['Which days are the long drives?', 'Day 4, Fes to Merzouga, about eight hours with stops, and day 7 over the High Atlas, about six. Days 3, 5 and 8 have little or no driving, and day 1 is short.'],
  ['Are the city guides included?', 'Yes. A local guide walks you through the Fes medina on day 3 and Marrakech on day 8. Your driver-guide does the rest of the tour, so there is no one else to pay at the sites, apart from entrance fees.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A first night in Tangier before Chefchaouen',
  'A second night in Chefchaouen',
  'Upgrade to a luxury camp with heated tents',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A <a href="marrakech-food-tour.html">food tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%208-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>8-Day Tour from Tangier</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 8-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tg8-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier port pick-up and Tetouan', 'Chefchaouen (night 1)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 2–3)', 'Ifrane, Midelt and a camel ride to a desert camp (night 4)', 'A day around Merzouga (night 5)', 'Todra Gorge and the Dades Valley (night 6)', 'Aït Ben Haddou and Tizi n’Tichka (night 7, Marrakech)', 'Guided morning in Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '2 nights by the dunes', '7-day route', 'luggage on the camel']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
