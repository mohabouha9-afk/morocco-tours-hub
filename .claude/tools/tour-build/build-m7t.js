// Build tours/7-day-marrakech-to-tangier-tour.html (Marrakech -> Aït Ben Haddou -> Dades -> Merzouga camp -> Fes x2 -> Volubilis -> Chefchaouen x2 -> Tetouan -> Tangier)
// Template = the finished 8-day Marrakech -> Casablanca page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): SERP "7 day tour marrakech to tangier": privatedeserttours 7-day Marrakech -> Chefchaouen (arrival night in
// Marrakech, Dades, camp, Fes x2, 1 night Chefchaouen, ends Fes/Tangier on day 7; FAQ: private?, fitness, changes), Tripadvisor 7-day
// Marrakech -> Fes, Chefchaouen and Tangier, tourradar, moroccoexperiencetours. Ours: 2 nights in Chefchaouen and ends at the Tangier port.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-marrakech-to-casablanca-tour.html';
const out = root + 'tours/7-day-marrakech-to-tangier-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/7-day-marrakech-to-tangier-tour.html';
const NAME = '7-Day Morocco Tour from Marrakech to Tangier';
const TITLE = '7-Day Morocco Tour from Marrakech to Tangier | Private';
const DESC = 'Private 7-day tour from Marrakech to Tangier: Aït Ben Haddou, the Dades and Todra gorges, a night in the Merzouga dunes, two nights in Fes, two in Chefchaouen, then Tetouan and the Tangier port for the ferry to Spain.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="7 day Morocco itinerary, Marrakech to Tangier tour, one week in Morocco, Sahara desert tour, Fes, Chefchaouen, ferry to Spain, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-marrakech-to-casablanca-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Dades Valley',
    p: 'Pick-up at your hotel or riad in Marrakech around 08:00. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to Aït Ben Haddou and a walk up through the ksar. Past Ouarzazate, the Skoura palm grove and the Valley of Roses to the Dades Valley for the night.',
    meta: [['car', 'About 370 km, about 7 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Dinner & breakfast']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'The hairpin bends of the Dades Gorge, then a walk between the 300 m walls of the Todra Gorge, and the oasis road east to Erg Chebbi. Your big bags stay in the car and you ride a camel into the dunes for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 320 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'Sunrise and sandboarding on the dunes, then north up the palm gorges of the Ziz Valley, lunch in Midelt, the cedar forest of Azrou with its Barbary macaques and the alpine town of Ifrane. Your riad in the Fes medina by evening.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine and a rooftop above the Chouara tanneries, ending at the brass gates of the Royal Palace. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Volubilis → the Rif → Chefchaouen',
    p: 'West to Volubilis, the Roman town on the plain, for its mosaics and triumphal arch, then north into the green hills of the Rif to Chefchaouen, in time for sunset from the Spanish Mosque.',
    meta: [['car', 'About 265 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A slow day in the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring. If you like walking, your driver-guide can take you to the Akchour waterfalls instead.',
    meta: [['car', 'Free day; Akchour on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Tetouan → Tangier',
    p: 'Down through the Rif to Tetouan, the white city, for a walk in its Andalusian medina, then on to Tangier. We drop you at the port for the ferry to Tarifa, at Tanger Med for Algeciras, at the airport or at your hotel.',
    meta: [['car', 'About 125 km, about 2.5 hours on the road'], ['flag', 'Ends at the port, airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-group\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan crossing the Merzouga dunes at sunset" loading="eager"`, 'hero img');
rep('<span>8-Day Marrakech to Casablanca</span></nav>', '<span>7-Day Marrakech to Tangier</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Tour from Marrakech to Casablanca<span class="script">The Sahara and the North in a Week</span></h1>', '<h1>7-Day Morocco Tour from Marrakech to Tangier<span class="script">One Week, South to North</span></h1>', 'h1');
rep('<b>8 days / 7 nights</b>', '<b>7 days / 6 nights</b>', 'duration');
rep('<small>Route</small><b>Marrakech → Casablanca</b>', '<small>Route</small><b>Marrakech → Tangier</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">One week from Marrakech to the Strait of Gibraltar. Over the High Atlas to Aït Ben Haddou, through the Dades and Todra gorges to the dunes of Erg Chebbi for a sunset camel ride and a night in the camp.</p>
          <p class="dt-lead">Then north to Fes for a guided day in its medina, the Roman ruins of Volubilis and two nights in blue Chefchaouen, before Tetouan and Tangier, with the ferry to Spain an hour away. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Casa</dd>', '<dd>Marrakech → Tangier</dd>', 'kf1');
rep('<dt>Blue town</dt><dd>2 nights in Chefchaouen</dd>', '<dt>Last day</dt><dd>Tangier port or airport</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Aït Ben Haddou and the High Atlas',
  'The Dades and Todra gorges',
  'Sunset camel ride and a night in the dunes',
  'Barbary macaques in the cedar forest',
  'A guided day in the Fes medina',
  'The Roman mosaics of Volubilis',
  'Two nights in blue Chefchaouen',
  'The white medina of Tetouan',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1600, 1066],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['merzouga-white-camel.jpg', 'A white camel on the Merzouga dunes', 1600, 900],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['chefchaouen-blue-steps.jpg', 'Blue steps in the medina of Chefchaouen', 800, 900],
  ['tangier-cap-spartel-lighthouse.jpg', 'The Cap Spartel lighthouse near Tangier', 1000, 667],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide for the Fes medina',
  'Pick-up at your Marrakech hotel or riad',
  'Drop-off at Tangier port, airport or hotel',
  '6 nights as in the table below',
  '6 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights and ferry tickets', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Chefchaouen is steep: good shoes',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Casablanca by the Sahara, Fes and Chefchaouen, about 1,800 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Tangier by the Sahara, Fes and Chefchaouen, about 1,500 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Tangier,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CBoumalne+Dades,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CVolubilis,Morocco%7CChefchaouen,Morocco%7CTetouan,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Dades Valley', dad], ['2: Desert camp', camp], ['3–4: Fes', fes], ['5–6: Chef&shy;chaouen', chf]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers going on to Spain by ferry',
  'Anyone with one week, landing in Marrakech',
  'First-timers who want the desert and the blue town',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Have 10 days? The <a href="10-day-morocco-tour-marrakech-to-tangier.html">10-day Marrakech to Tangier tour</a> adds a desert day and Cap Spartel',
  'Flying home from Casablanca? The <a href="8-day-marrakech-to-casablanca-tour.html">8-day Marrakech to Casablanca tour</a> ends there',
  'Arriving by ferry instead? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day Tangier to Marrakech tour</a> runs the other way',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'm7t-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can we take the ferry to Spain on day 7?', 'Yes. Chefchaouen to Tangier is about 2.5 hours with the stop in Tetouan, so an afternoon ferry works well. Ferries to Tarifa leave from the city port and to Algeciras from Tanger Med; we drop you at the right one.'],
  ['Which days are the long drives?', 'Days 1 to 3: about seven hours to Dades, six and a half to the dunes and eight from Merzouga to Fes, all with stops. Days 4 and 6 have no driving, and day 7 is short.'],
  ['Why two nights in Chefchaouen and none in Tangier?', 'Chefchaouen is the place travellers most want more time in, and its lanes are best early and late, after the day visitors leave. Tangier is close to the port, so a morning in Tetouan and the drive in fit well on the last day.'],
  ['Is one week enough for Morocco?', 'For the desert and the imperial north, yes, at a steady pace. If you can add days, the 10-day version brings a whole day around Merzouga and a night in Tangier.'],
  ['Can we start from Marrakech airport?', 'Yes. We meet you at Marrakech airport on the morning of day 1, or the evening before with a night in a riad, so you start rested.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a> the day before',
  'Upgrade to a luxury camp',
  'A guided hike to the Akchour waterfalls',
  'Meknes on the way from Fes',
  'A night in Tangier and Cap Spartel',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Tour from Marrakech to Casablanca" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Casablanca.', 'information%20about%20the%207-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Tangier.', 'wa');
rep('<b>8-Day Marrakech to Casablanca</b><span>Free', '<b>7-Day Marrakech to Tangier</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 7-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'm7t-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka, Aït Ben Haddou and the Dades Valley (night 1)', 'Todra Gorge and a camel ride to a desert camp (night 2)', 'Ziz Valley, Midelt and Ifrane to Fes', 'Guided day in the Fes medina (nights 3–4)', 'Volubilis and Chefchaouen (nights 5–6)', 'Tetouan and Tangier, end at the port, airport or hotel'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Hassan II', 'Rabat', 'Night 7: Casablanca', 'The Sahara and the North in a Week']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
