// Build tours/9-day-morocco-private-tour-from-casablanca.html (Casablanca -> Rabat -> Chefchaouen x2 -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 8-day Imperial Cities page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): SERP "9 day morocco tour from casablanca" = Tripadvisor listings (5.0/46, 4.9/38), fes-desert-trips, tourhq,
// moroccofabuloustravel.com/morocco-itinerary-9-days (Casa night, 2 Chefchaouen, 2 Fes, camp + Merzouga riad, Dades, ends Marrakech).
// Reviewer complaints: riads far from the sights in Chefchaouen/Marrakech, cold desert tent in December, missed airport pick-up.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/9-day-morocco-private-tour-from-casablanca.html';
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

const URL = 'https://moroccotourshub.com/tours/9-day-morocco-private-tour-from-casablanca.html';
const NAME = '9-Day Morocco Private Tour from Casablanca';
const TITLE = '9-Day Morocco Private Tour from Casablanca to Marrakech';
const DESC = 'Private 9-day Morocco itinerary from Casablanca to Marrakech: the Hassan II Mosque and Rabat, two nights in Chefchaouen, Volubilis and Meknes, two nights in Fes, two by the Merzouga dunes, the Dades Valley and Aït Ben Haddou.';
const HERO = 'merzouga-blue-dress-camel.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="9 day Morocco itinerary, Morocco private tour, Morocco tour from Casablanca, Casablanca to Chefchaouen, Fes, Sahara desert tour, Morocco tour packages">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca: arrival and the Hassan II Mosque',
    p: 'Your driver-guide meets you in arrivals at Casablanca airport with your name on a sign, at whatever hour you land, and we follow your flight. If you arrive in time, a guided visit inside the Hassan II Mosque on the ocean and a walk on the Corniche; if not, rest and see it in the morning. Night in Casablanca.',
    meta: [['car', 'Airport to the city, about 45 minutes'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast from day 2']] },
  { t: 'Casablanca → Rabat → Chefchaouen',
    p: 'Up the coast to Rabat, the capital: the blue and white lanes of the Kasbah des Oudayas, the Hassan Tower and the Mausoleum of Mohammed V. Then north through the farmland of the Gharb and into the green hills of the Rif to Chefchaouen, the blue town, for the evening.',
    meta: [['car', 'About 340 km, about 5.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A day at your own pace in the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring, with sunset from the Spanish Mosque. We book your riad inside the medina, a short walk from the square, so you can come and go as you like.',
    meta: [['car', 'Free day; Akchour waterfalls on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'South through the Rif to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, then Meknes, the city of Moulay Ismail, for the great gate of Bab Mansour and Place el-Hedim. On to your riad in the Fes medina in the late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa, the outside of the Al-Qarawiyyin and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane and the cedar forest of Azrou with its Barbary macaques, lunch in Midelt, then the palm gorges of the Ziz Valley to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, breakfast, and back by camel or 4×4. A whole day in the desert: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the black stony plains and the lake of Dayet Srij after a wet winter. A hot shower and a calm night in a hotel at the foot of the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Through Rissani, the old caravan town with its market, and along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs and kasbahs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar to its old granary. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the late afternoon, at your riad or Marrakech airport.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Ends at your Marrakech riad or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>9-Day Tour from Casablanca</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>9-Day Morocco Private Tour from Casablanca<span class="script">Blue Lanes, Old Medinas, Golden Dunes</span></h1>', 'h1');
rep('<b>8 days / 7 nights</b>', '<b>9 days / 8 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Nine days from Casablanca to Marrakech that give the best of Morocco time to breathe. A first night in Casablanca whatever time you land, Rabat on the way north, then two nights in the blue town of Chefchaouen, the Roman ruins of Volubilis and Meknes, and two nights in Fes with a guided day in its medina.</p>
          <p class="dt-lead">Two nights by the dunes of Erg Chebbi, a camp after a sunset camel ride and a hotel after a day with the nomads, then the Todra and Dades gorges and Aït Ben Haddou on the way over the High Atlas to Marrakech. Riads inside the medinas, your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Slow stays</dt><dd>2 nights in each highlight</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'The Kasbah des Oudayas in Rabat',
  'Two days in blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-chefchaouen-blue.jpg', 'The blue lanes of Chefchaouen', 1300, 866],
  ['fes.jpg', 'A carved and painted door in the Fes medina', 1170, 1560],
  ['merzouga-dune-walk-red.jpg', 'Walking along a dune ridge at Merzouga', 1600, 1066],
  ['nomad-tent-tea.jpg', 'Mint tea in a nomad tent in the desert', 960, 1280],
  ['dades-rocks.jpg', 'An old earthen kasbah in the Dades Valley', 1170, 1461],
  ['ait-ben-haddou-terrace-tea.jpg', 'Tea on a terrace facing Aït Ben Haddou', 1300, 867],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide for the Fes medina',
  'Casablanca airport pick-up, any hour',
  'Drop-off in Marrakech (riad or airport)',
  '8 nights as in the table below',
  '8 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Hassan II Mosque: no visits on Fridays',
  'Winter desert nights are cold: ask for a heated tent',
  'Chefchaouen is steep: good shoes',
  'Small bag for the camp; luggage stays in the car',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by Chefchaouen, Fes and the Sahara, about 1,700 km in 9 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Casablanca', cas], ['2–3: Chef&shy;chaouen', chf], ['4–5: Fes', fes], ['6: Desert camp', camp], ['7: Merzouga', mzh], ['8: Dades Valley', dad]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'First-timers flying into Casablanca',
  'Travellers who want time in each place, not one-night stops',
  'Couples and families who like riads in the old towns',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 8 days? The <a href="8-day-morocco-imperial-cities-sahara-tour.html">8-day Imperial Cities tour</a> skips Chefchaouen',
  'Flying home from Casablanca? The <a href="10-day-morocco-tour-casablanca-round.html">10-day Casablanca round tour</a> brings you back',
  'Arriving by ferry from Spain? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> starts at the port',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'c9-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are 9 days enough for Morocco?', 'For a first trip, yes: you see the coast, the blue town, two imperial cities, the Sahara and the High Atlas. Two nights in Chefchaouen, Fes and the desert keep it from feeling rushed; only day 6, Fes to Merzouga, is a long drive.'],
  ['What if our flight lands late at night?', 'No problem. Your driver-guide follows your flight and waits in arrivals at any hour. Day 1 is kept light on purpose: if you land late, you rest and see the Hassan II Mosque the next morning before leaving for Rabat.'],
  ['Are the riads close to the sights?', 'Yes. In Chefchaouen and Fes we book riads inside the medina, a short walk from the main squares, so you can go out on your own in the evening. Your driver-guide or a porter helps with bags where cars cannot enter.'],
  ['Is the desert camp warm in winter?', 'Desert nights from December to February can drop close to freezing. All our camps give thick blankets; ask for a camp with heated tents if you travel in winter, and bring a warm layer for the evening.'],
  ['Can we skip Chefchaouen or add Essaouira?', 'Yes. Every day can change: one night in Chefchaouen instead of two, an extra night in Marrakech, or Essaouira on the coast at the end. Tell us when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp with heated tents',
  'A guided hike to the Akchour waterfalls',
  'A night at Aït Ben Haddou on the way',
  'A <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a> at the end',
  'Extra nights in Marrakech or Essaouira',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%209-Day%20Morocco%20Private%20Tour%20from%20Casablanca.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>9-Day Tour from Casablanca</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 9-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'c9-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca airport pick-up and the Hassan II Mosque (night 1)', 'Rabat', 'Chefchaouen (nights 2–3)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 4–5)', 'Ifrane, Midelt and a camel ride to a desert camp (night 6)', 'A day around Merzouga with a nomad family (night 7)', 'Todra Gorge and the Dades Valley (night 8)', 'Aït Ben Haddou, Tizi n’Tichka and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Four Royal Cities', '4 imperial cities', 'Night 7: Marrakech', 'Bahia Palace, Marrakech']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
