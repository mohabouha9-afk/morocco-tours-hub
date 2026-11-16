// Build tours/8-day-morocco-imperial-cities-sahara-tour.html (Casablanca -> Rabat -> Meknes/Volubilis -> Fes -> Merzouga -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 7-day Marrakech -> Fes page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-days-morocco-tour.html';
const out = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/8-day-morocco-imperial-cities-sahara-tour.html';
const NAME = '8-Day Morocco Imperial Cities & Sahara Tour';
const TITLE = '8-Day Morocco Imperial Cities & Sahara Tour from Casablanca';
const DESC = 'Private 8-day tour from Casablanca to Marrakech: the Hassan II Mosque, Rabat, Meknes and Volubilis, a guided day in Fes, a sunset camel ride and camp in the Merzouga dunes, the Todra Gorge and a night at Aït Ben Haddou.';
const HERO = 'merzouga-camel-caravan.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco imperial cities tour, 8 day Morocco itinerary, Casablanca to Marrakech tour, Hassan II Mosque, Fes, Meknes, Volubilis, Sahara desert tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-days-morocco-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca → Hassan II Mosque → Rabat',
    p: 'Pick-up at your hotel or Casablanca airport in the morning. A guided visit inside the Hassan II Mosque, built over the Atlantic, with the tallest minaret in Africa, then the Corniche. An hour up the coast to Rabat, the capital: the blue and white lanes of the Kasbah des Oudayas, the Hassan Tower and the royal Mausoleum of Mohammed V.',
    meta: [['car', 'About 100 km, about 1.5 hours on the road'], ['bed', 'Night: Rabat'], ['food', 'Dinner & breakfast']] },
  { t: 'Rabat → Meknes → Volubilis → Fes',
    p: 'Inland to Meknes, the city of Sultan Moulay Ismail: the great gate of Bab Mansour, Place el-Hedim and the old granaries, with lunch in the medina. In the afternoon, a walk through Volubilis, the Roman town on the plain, with its mosaics, basilica and triumphal arch, then on to Fes for the evening.',
    meta: [['car', 'About 270 km, about 4 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast & dinner']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide, a whole day in the oldest medina of Morocco: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries, and the brass gates of the Royal Palace. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast & dinner']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: the alpine town of Ifrane and the cedar forest of Azrou, where Barbary macaques sit by the road, then lunch in Midelt. Down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi, where your big bags stay in the car and you ride a camel into the sand for sunset. Dinner, drums and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Through Rissani, the old caravan town, and along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for the evening.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Skoura → Ouarzazate → Aït Ben Haddou',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and the Skoura palm grove to Ouarzazate and the Taourirt Kasbah. An easy afternoon at Aït Ben Haddou: walk up through the ksar to its old granary and watch it turn red at sunset from your terrace.',
    meta: [['car', 'About 150 km, about 3 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, with stops at the viewpoints and the Berber villages, and down to Marrakech by lunchtime. The afternoon is yours, and Jemaa el-Fnaa comes alive at sunset.',
    meta: [['car', 'About 175 km, about 3.5 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided morning and the end of the tour',
    p: 'With a local guide: the Koutoubia, the painted ceilings of the Bahia Palace, the souks and the Ben Youssef Madrasa. The tour ends at your riad, or we take you to Marrakech airport at the time you need.',
    meta: [['car', 'Morning on foot in the medina'], ['flag', 'Ends at your riad or Marrakech airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/erg-chebbi-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan crossing the Erg Chebbi dunes" loading="eager"`, 'hero img');
rep('<span>7-Day Marrakech to Fes</span></nav>', '<span>8-Day Imperial Cities &amp; Sahara</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Marrakech</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Casablanca</span>', 'chip');
rep('<h1>7-Day Morocco Tour from Marrakech to Fes<span class="script">One Week, at an Easy Pace</span></h1>', '<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', 'h1');
rep('<b>7 days / 6 nights</b>', '<b>8 days / 7 nights</b>', 'duration');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Route</small><b>Casablanca → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The four imperial cities of Morocco and the Sahara in eight days. From the Hassan II Mosque on the Atlantic to Rabat, the capital, then Meknes and the Roman ruins of Volubilis on the way to Fes, for a guided day in its thousand-year-old medina.</p>
          <p class="dt-lead">Then over the Middle Atlas to the dunes of Erg Chebbi for a sunset camel ride and a night in the camp, back west by the Todra Gorge and the kasbahs of the south to a night beside the ksar of Aït Ben Haddou, and over the High Atlas to Marrakech. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Casa → Marrakech</dd>', 'kf1');
rep('<dt>Easy pace</dt><dd>No long drive days</dd>', '<dt>Cities</dt><dd>4 imperial cities</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'The Kasbah des Oudayas in Rabat',
  'Bab Mansour and the ruins of Volubilis',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'A walk in the Todra Gorge',
  'Sunset over the ksar of Aït Ben Haddou',
  'The High Atlas by the Tizi n’Tichka pass',
  'The souks and palaces of Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
  ['fes.jpg', 'A carved and painted door in the Fes medina', 1170, 1560],
  ['desert-camp-dunes.jpg', 'A desert camp among the dunes of Erg Chebbi', 1600, 900],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['ait-ben-haddou-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1600, 1066],
  ['marrakech-medina-arch.jpg', 'An arch in the medina of Marrakech', 1600, 1260],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Pick-up in Casablanca (hotel or airport)',
  'Drop-off in Marrakech (riad or airport)',
  '7 nights as in the table below',
  '7 breakfasts and 6 dinners',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Hassan II Mosque: no visits on Fridays',
  'Cover shoulders and knees in the mosque and madrasas',
  'Small bag for the camp; luggage stays in the car',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace, Marrakech:</b> 100 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,200 km in 7 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CMeknes,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const rab = [A('https://www.tripadvisor.com/Hotel_Review-g293736-d12390293-Reviews-Riad_Dar_Saidi-Rabat_Rabat_Sale_Kenitra.html', 'Riad Dar Saidi'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d3724817-Reviews-Riad_Zyo-Rabat_Rabat_Sale_Kenitra.html', 'Riad Zyo'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d300677-Reviews-Sofitel_Rabat_Jardin_des_Roses-Rabat_Rabat_Sale_Kenitra.html', 'Sofitel Jardin des Roses')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Rabat', rab], ['2–3: Fes', fes], ['4: Desert camp', camp], ['5: Dades Valley', dad], ['6: Aït Ben Haddou', abh], ['7: Marrakech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying into Casablanca and out of Marrakech',
  'History lovers: mosques, madrasas and Roman ruins',
  'First-timers who want the cities and the desert',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 7 days? The <a href="7-day-morocco-tour-from-casablanca.html">7-day tour from Casablanca</a> takes the same road a day faster',
  'Want Chefchaouen too? The <a href="9-day-morocco-private-tour-from-casablanca.html">9-day tour from Casablanca</a> adds the blue city',
  'Landing in Marrakech? The <a href="7-days-morocco-tour.html">7-day Marrakech to Fes tour</a> starts there',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ic8-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can we visit the Hassan II Mosque on any day?', 'Guided visits run Saturday to Thursday, not on Fridays. If your tour starts on a Friday, we see the mosque from the outside and the Corniche, or plan the visit for your last morning if you fly home from Casablanca.'],
  ['What are the four imperial cities?', 'Rabat, Meknes, Fes and Marrakech: the four cities that served as capitals of Moroccan dynasties. This tour visits all four, with a full guided day in Fes and a guided morning in Marrakech.'],
  ['How long is the drive from Fes to the desert?', 'About 470 km, eight hours with stops in Ifrane, the cedar forest and Midelt. It is the one long day, timed so you reach the dunes for the sunset camel ride; the days after are three to five hours.'],
  ['Can you pick us up at Casablanca airport?', 'Yes. We meet you in arrivals with a name sign and follow your flight. If you land in the afternoon, we can start with a night in Casablanca and keep the mosque for the next morning.'],
  ['Are the city guides included?', 'Yes. A local professional guide walks you through the Fes medina and the Marrakech medina. In Casablanca the mosque has its own guides on the visit, and in Rabat, Meknes and Volubilis your driver-guide shows you around.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in the desert, at a Merzouga hotel',
  'Upgrade to a luxury camp',
  'A night in Chefchaouen after Rabat',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'Extra nights in Marrakech or Essaouira',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Marrakech to Fes" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Fes.', 'information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'wa');
rep('<b>7-Day Marrakech to Fes</b><span>Free', '<b>8-Day Imperial Cities</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 8-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ic8-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'History lovers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Hassan II Mosque, Casablanca', 'Rabat: Kasbah des Oudayas and Hassan Tower (night 1)', 'Meknes and Volubilis', 'Guided day in the Fes medina (nights 2–3)', 'Ifrane, Midelt and the Ziz Valley', 'Sunset camel ride and desert camp (night 4)', 'Todra Gorge and the Dades Valley (night 5)', 'Aït Ben Haddou (night 6)', 'Tizi n’Tichka pass and Marrakech (night 7)', 'Guided morning in the Marrakech medina'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Midelt night', 'Night 5: Midelt', 'One Week, at an Easy Pace', 'Cirque de Jaffar']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
