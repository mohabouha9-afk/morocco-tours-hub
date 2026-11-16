// Build tours/8-day-marrakech-to-casablanca-tour.html (Marrakech -> Aït Ben Haddou -> Dades -> Merzouga camp -> Fes x2 -> Volubilis -> Chefchaouen x2 -> Rabat -> Casablanca)
// Template = the finished 10-day Marrakech -> Casablanca page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): SERP "8 day morocco tour marrakech to casablanca": kimkim, Tripadvisor "Morocco in 8 Days" (5.0/32,
// Casablanca -> Chefchaouen -> Fes x2 -> Merzouga -> Ouarzazate -> Marrakech x2 -> Casablanca), tourradar, azamoroccotours,
// GetYourGuide 8-day classic. Most 8-day tours start in Casablanca; this one runs the other way for Marrakech arrivals.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/10-day-marrakech-to-casablanca-tour.html';
const out = root + 'tours/8-day-marrakech-to-casablanca-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/8-day-marrakech-to-casablanca-tour.html';
const NAME = '8-Day Morocco Tour from Marrakech to Casablanca';
const TITLE = '8-Day Morocco Tour from Marrakech to Casablanca | Private';
const DESC = 'Private 8-day Morocco itinerary from Marrakech to Casablanca: Aït Ben Haddou, the Dades and Todra gorges, a night in the Merzouga dunes, two nights in Fes, two in Chefchaouen, Rabat and the Hassan II Mosque.';
const HERO = 'merzouga-camel-ride-group.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="8 day Morocco itinerary, Marrakech to Casablanca tour, Sahara desert tour, Fes, Chefchaouen, Rabat, Hassan II Mosque, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/10-day-marrakech-to-casablanca-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Dades Valley',
    p: 'Pick-up at your hotel or riad in Marrakech around 08:00. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to Aït Ben Haddou and a walk up through the ksar to its granary. Past Ouarzazate, the Skoura palm grove and the Valley of Roses to the Dades Valley for the evening.',
    meta: [['car', 'About 370 km, about 7 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Dinner & breakfast']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'The hairpin bends of the Dades Gorge in the morning light, then a walk between the 300 m walls of the Todra Gorge. East along the oasis road to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 320 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. North up the palm gorges of the Ziz Valley, lunch in Midelt, then the cedar forest of Azrou with its Barbary macaques and Ifrane, reaching your riad in the Fes medina in the evening.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries. Shops only if you ask, and a free evening after the long drive the day before.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Volubilis → the Rif → Chefchaouen',
    p: 'West to Volubilis, the Roman town on the plain, for a walk among its mosaics and triumphal arch, then north into the green hills of the Rif to Chefchaouen, in time for sunset from the Spanish Mosque.',
    meta: [['car', 'About 265 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A slow day after five on the move: the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring. Walkers can go to the Akchour waterfalls in the Talassemtane park with your driver-guide instead.',
    meta: [['car', 'Free day; Akchour on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Rabat → Casablanca',
    p: 'South through the Rif to Rabat, the capital: the Kasbah des Oudayas above the river mouth, the Hassan Tower and the Mausoleum of Mohammed V. On to Casablanca for an evening on the Corniche by the ocean.',
    meta: [['car', 'About 340 km, about 5.5 hours on the road'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast']] },
  { t: 'Casablanca: the Hassan II Mosque and your flight',
    p: 'A guided visit inside the Hassan II Mosque on the Atlantic if your flight allows (visits run Saturday to Thursday). Then about 45 minutes to Mohammed V airport, at the time you need.',
    meta: [['car', 'City to the airport, about 45 minutes'], ['flag', 'Ends at Casablanca airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/camel-dune-ridge\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride over the dunes of Erg Chebbi" loading="eager"`, 'hero img');
rep('<span>10-Day Marrakech to Casablanca</span></nav>', '<span>8-Day Marrakech to Casablanca</span></nav>', 'crumb');
rep('<h1>10-Day Morocco Tour from Marrakech to Casablanca<span class="script">From the Red City to the Ocean</span></h1>', '<h1>8-Day Morocco Tour from Marrakech to Casablanca<span class="script">The Sahara and the North in a Week</span></h1>', 'h1');
rep('<b>10 days / 9 nights</b>', '<b>8 days / 7 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Eight days from Marrakech to Casablanca that fit the Sahara and the north into one trip. Over the High Atlas to Aït Ben Haddou, up the Dades and Todra gorges to the dunes of Erg Chebbi for a sunset camel ride and a night in the camp.</p>
          <p class="dt-lead">Then north through the cedar forests to Fes for a guided day in its medina, the Roman ruins of Volubilis and two slow nights in blue Chefchaouen, before Rabat and the Hassan II Mosque on your last morning. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Last morning</dt><dd>Hassan II Mosque</dd>', '<dt>Blue town</dt><dd>2 nights in Chefchaouen</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Aït Ben Haddou and the High Atlas',
  'The Dades and Todra gorges',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'A guided day in the Fes medina',
  'The Roman mosaics of Volubilis',
  'Two slow days in blue Chefchaouen',
  'The Kasbah des Oudayas in Rabat',
  'Inside the Hassan II Mosque',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah.jpg', 'The earthen kasbahs of Aït Ben Haddou', 1600, 1066],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led over the Merzouga dunes', 1300, 866],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp in the dunes', 1600, 1067],
  ['fes-medina.jpg', 'A lane in the medina of Fes', 1170, 1560],
  ['chefchaouen.jpg', 'A blue lane in Chefchaouen', 1170, 1560],
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
  'Drop-off at Casablanca airport',
  '7 nights as in the table below',
  '7 breakfasts and 2 dinners',
  'Camel ride and sandboarding',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Hassan II Mosque:</b> 140 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Casablanca by the Sahara, Fes and Chefchaouen, about 1,800 km in 10 days\. <a href="([^"]*)"/, '<span>Marrakech to Casablanca by the Sahara, Fes and Chefchaouen, about 1,800 km in 8 days. <a href="$1"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Dades Valley', dad], ['2: Desert camp', camp], ['3–4: Fes', fes], ['5–6: Chef&shy;chaouen', chf], ['7: Casablanca', cas]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with one week, landing in Marrakech',
  'Anyone flying home from Casablanca',
  'First-timers who want the desert and the north',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want a whole day in the desert? The <a href="10-day-marrakech-to-casablanca-tour.html">10-day Marrakech to Casablanca tour</a> adds one',
  'Landing in Casablanca? The <a href="9-day-morocco-private-tour-from-casablanca.html">9-day tour from Casablanca</a> runs the other way',
  'Going on to Spain? The <a href="7-day-marrakech-to-tangier-tour.html">7-day Marrakech to Tangier tour</a> ends in the north',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mc8-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is 8 days enough for the desert and the north?', 'Yes, if you like a steady pace. The first three days cover the High Atlas, the gorges and the Sahara; the days in Fes and Chefchaouen are slower, with a full free day in the blue town before the last drive.'],
  ['Which days are the long drives?', 'Days 1 to 3 are the road days: about seven hours over the High Atlas to Dades, six and a half to the dunes, and eight from Merzouga to Fes, all with stops. Days 4 and 6 have no driving.'],
  ['Why only one night in the desert?', 'To give Fes and Chefchaouen two nights each in eight days. You still get the sunset camel ride, the camp and sunrise on the dunes; the 10-day version adds a whole day around Merzouga.'],
  ['Will we see the Hassan II Mosque before our flight?', 'Usually, yes. Guided visits run Saturday to Thursday in the morning, so on day 8 we visit before the 45-minute drive to the airport. For an early flight or a Friday, you see it from the outside on the evening of day 7.'],
  ['Can we start from Marrakech airport?', 'Yes. We can meet you at Marrakech airport on the morning of day 1, or the evening before and take you to a riad, so you start rested.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a> the day before',
  'Upgrade to a luxury camp',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A guided hike to the Akchour waterfalls',
  'An extra night in Casablanca or Rabat',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="10-Day Morocco Tour from Marrakech to Casablanca" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Casablanca.', 'information%20about%20the%208-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Casablanca.', 'wa');
rep('<b>10-Day Marrakech to Casablanca</b><span>Free', '<b>8-Day Marrakech to Casablanca</b><span>Free', 'mbar');
rep('The 10-day route is a starting point', 'The 8-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mc8-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka, Aït Ben Haddou and the Dades Valley (night 1)', 'Todra Gorge and a camel ride to a desert camp (night 2)', 'Ziz Valley, Midelt and Ifrane to Fes', 'Guided day in the Fes medina (nights 3–4)', 'Volubilis and Chefchaouen (nights 5–6)', 'Rabat and Casablanca (night 7)', 'Hassan II Mosque and Casablanca airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Night 9: Casablanca', 'Merzouga hotel', 'From the Red City to the Ocean']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
