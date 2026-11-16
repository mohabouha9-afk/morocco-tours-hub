// Build tours/10-day-morocco-tour-marrakech-to-tangier.html (Marrakech -> Aït Ben Haddou -> Dades -> Merzouga -> Fes -> Volubilis -> Chefchaouen -> Tetouan -> Tangier)
// Template = the finished 7-day Marrakech -> Fes page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-days-morocco-tour.html';
const out = root + 'tours/10-day-morocco-tour-marrakech-to-tangier.html';
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

const URL = 'https://moroccotourshub.com/tours/10-day-morocco-tour-marrakech-to-tangier.html';
const NAME = '10-Day Morocco Tour from Marrakech to Tangier';
const TITLE = '10-Day Morocco Tour from Marrakech to Tangier | Sahara & Chefchaouen';
const DESC = 'Private 10-day Morocco itinerary from Marrakech to Tangier: Aït Ben Haddou, the Dades and Todra gorges, two nights by the Merzouga dunes, two nights in Fes, two in Chefchaouen, then Tetouan and Tangier.';
const HERO = 'grand-chefchaouen-blue.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="10 day Morocco itinerary, Marrakech to Tangier tour, Chefchaouen, Sahara desert tour, Fes, Tetouan, Tangier, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-days-morocco-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou',
    p: 'Pick-up at your hotel or riad in Marrakech around 09:00. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, with stops in the Berber villages, and down to Aït Ben Haddou in the early afternoon. Walk up through the ksar to its old granary and watch it turn red at sunset.',
    meta: [['car', 'About 190 km, about 4 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Dinner & breakfast']] },
  { t: 'Aït Ben Haddou → Skoura → Valley of Roses → Dades Gorge',
    p: 'Past Ouarzazate and the Taourirt Kasbah to the Skoura palm grove, then along the Road of a Thousand Kasbahs through the Valley of Roses. An easy afternoon up the Dades Gorge, past the Monkey Fingers rocks to the hairpin bends of Tissadrine.',
    meta: [['car', 'About 180 km, about 4 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'A morning walk in the Todra Gorge, between walls 300 m high, then the oasis road east to Erfoud and the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 320 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. A day in the desert at your pace: tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains and the market of Rissani. A hot shower and a quiet night in a hotel at the foot of the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'North up the palm gorges of the Ziz Valley and over the Atlas to Midelt for lunch, then across the cedar forest of Azrou, where Barbary macaques sit by the road, and through Ifrane to Fes in the early evening.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Volubilis → the Rif → Chefchaouen',
    p: 'West to Volubilis, the Roman town on the plain, for a walk among its mosaics and triumphal arch. Then north into the green hills of the Rif by Ouezzane to Chefchaouen, the blue town, in time for sunset from the terrace of the Spanish Mosque.',
    meta: [['car', 'About 265 km, about 5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A day at your own pace in the lanes of blue houses, the Outa el-Hammam square and the Kasbah garden, with the Ras el-Maa spring at the top of town. If you like walking, your driver-guide can take you to the Akchour waterfalls in the Talassemtane park instead.',
    meta: [['car', 'Free day; Akchour on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Tetouan → Cap Spartel → Tangier',
    p: 'Down to Tetouan, the white city, for a walk in its Andalusian medina, then along the coast to Tangier. Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules before a last evening above the Strait of Gibraltar.',
    meta: [['car', 'About 140 km, about 3 hours on the road'], ['bed', 'Night: Tangier'], ['food', 'Breakfast']] },
  { t: 'Tangier: the medina, then the end of the tour',
    p: 'A morning walk through the kasbah and the medina of Tangier, from the Petit Socco to the terrace of the Café Hafa. The tour ends at the port for the ferry to Spain, at the airport or at the train station, at the time you need.',
    meta: [['car', 'Morning on foot in the medina'], ['flag', 'Ends at the port, airport or train'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/erg-chebbi-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The blue lanes of Chefchaouen" loading="eager"`, 'hero img');
rep('<span>7-Day Marrakech to Fes</span></nav>', '<span>10-Day Marrakech to Tangier</span></nav>', 'crumb');
rep('<h1>7-Day Morocco Tour from Marrakech to Fes<span class="script">One Week, at an Easy Pace</span></h1>', '<h1>10-Day Morocco Tour from Marrakech to Tangier<span class="script">From the Sahara to the Strait</span></h1>', 'h1');
rep('<b>7 days / 6 nights</b>', '<b>10 days / 9 nights</b>', 'duration');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Route</small><b>Marrakech → Tangier</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Morocco from south to north in ten days. Over the High Atlas to Aït Ben Haddou and the gorges of the Dades and Todra, then two nights by the dunes of Erg Chebbi: a sunset camel ride and a camp, and a whole day in the desert.</p>
          <p class="dt-lead">Then north through the cedar forests to Fes for a guided day in its medina, the Roman ruins of Volubilis and two slow days in the blue town of Chefchaouen, before Tetouan and Tangier on the Strait of Gibraltar, with the ferry to Spain an hour away. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Marrakech → Tangier</dd>', 'kf1');
rep('<dt>Easy pace</dt><dd>No long drive days</dd>', '<dt>Blue town</dt><dd>2 nights in Chefchaouen</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Sunset over the ksar of Aït Ben Haddou',
  'The Dades and Todra gorges',
  'Sunset camel ride and a night in the dunes',
  'A full day around Merzouga by 4×4',
  'A guided day in the Fes medina',
  'The Roman mosaics of Volubilis',
  'Two slow days in blue Chefchaouen',
  'The white medina of Tetouan',
  'Cap Spartel, where two seas meet',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-terrace.jpg', 'Aït Ben Haddou seen from a terrace', 1500, 1000],
  ['merzouga-camel-ride-dunes.jpg', 'A camel ride over the dunes of Erg Chebbi', 1600, 1066],
  ['fes-guide.jpg', 'A guide in the lanes of the Fes medina', 1170, 1463],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour', 1440, 1920],
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
  'Pick-up in Marrakech, drop-off in Tangier',
  '9 nights as in the table below',
  '9 breakfasts and 4 dinners',
  'Camel ride and sandboarding',
  '4×4 day around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights and ferry tickets', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Chefchaouen is steep: good shoes',
  'Desert and Atlas nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Caves of Hercules:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,200 km in 7 days\. <a href="[^"]*"/, '<span>Marrakech to Tangier by the Sahara and Fes, about 1,600 km in 10 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Tangier,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CBoumalne+Dades,Morocco%7CMerzouga,Morocco%7CFes,Morocco%7CVolubilis,Morocco%7CChefchaouen,Morocco%7CTetouan,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Echchaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const tng = [A('https://www.tripadvisor.com/Hotel_Review-g293737-d8672446-Reviews-Hilton_Garden_Inn_Tanger_City_Center-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Hilton Garden Inn'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d7118909-Reviews-Grand_Hotel_Villa_de_France-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Villa de France'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d25109105-Reviews-Fairmont_Tazi_Palace_Tangier-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Fairmont Tazi Palace')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Aït Ben Haddou', abh], ['2: Dades Valley', dad], ['3: Desert camp', camp], ['4: Merzouga', mzh], ['5–6: Fes', fes], ['7–8: Chef&shy;chaouen', chf], ['9: Tangier', tng]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers going on to Spain by ferry',
  'First-timers who want the desert and the north',
  'Couples who like slow days in small towns',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Arriving from Spain? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> starts at the port',
  'Only have a week? The <a href="7-days-morocco-tour.html">7-day Marrakech to Fes tour</a> keeps the desert and Fes',
  'Flying out of Casablanca? The <a href="10-day-marrakech-to-casablanca-tour.html">10-day Marrakech to Casablanca tour</a> ends there',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mt10-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can we take the ferry to Spain at the end?', 'Yes. Ferries to Tarifa leave from the port in the city, and to Algeciras from Tanger Med, about 45 minutes away. We drop you at the right port for your crossing on day 10; book the ticket online or at the port.'],
  ['Why two nights in Chefchaouen?', 'Chefchaouen is best when the day visitors have gone. With a whole free day you see it early and late, walk up to the Spanish Mosque for sunset, or hike to the Akchour waterfalls.'],
  ['Which is the longest drive?', 'Day 5, Merzouga to Fes, about 470 km with stops in the Ziz Valley, Midelt and the cedar forest. The other road days are three to six hours, and days 4, 6, 8 and 10 have little or no driving.'],
  ['Can we do the tour the other way, from Tangier?', 'Yes. If you arrive by ferry from Spain, the 10-day tour from Tangier takes the north first and ends in Marrakech.'],
  ['Are lunches and dinners included?', 'Breakfast every day and dinner at Aït Ben Haddou, Dades, the camp and Merzouga, where there are few places to eat. In Fes, Chefchaouen and Tangier you choose your own restaurants.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a> before you leave',
  'Upgrade to a luxury camp',
  'A guided hike to the Akchour waterfalls',
  'Meknes on the way from Fes',
  'Asilah on the coast instead of Tetouan',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Marrakech to Fes" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Fes.', 'information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Tangier.', 'wa');
rep('<b>7-Day Marrakech to Fes</b><span>Free', '<b>10-Day Marrakech to Tangier</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 10-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mt10-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka and Aït Ben Haddou (night 1)', 'Skoura, Valley of Roses and the Dades Gorge (night 2)', 'Todra Gorge and a camel ride to a desert camp (night 3)', 'A day around Merzouga by 4×4 (night 4)', 'Ziz Valley, Midelt and Ifrane to Fes', 'Guided day in the Fes medina (nights 5–6)', 'Volubilis and Chefchaouen (nights 7–8)', 'Tetouan and Cap Spartel', 'Tangier (night 9)', 'Tangier medina, end at the port, airport or train'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Night 5: Midelt', 'One Week, at an Easy Pace', 'Cirque de Jaffar']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
