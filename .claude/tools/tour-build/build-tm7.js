// Build tours/7-day-morocco-tour-tangier-to-marrakech.html (Tangier -> Tetouan -> Chefchaouen -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel -> Todra -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 7-day Marrakech -> Tangier page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17): SERP "7 day tour from Tangier to Marrakech": moroccan-tour.com 7-day from Tangier (Chefchaouen, Volubilis/Meknes,
// Fes x2 with a local guide, camp with private bathrooms, Merzouga day + hotel, Dades, Aït Ben Haddou -> Marrakech 17:00-19:00; FAQ: private?,
// camel ride length + 4x4 alternative, private tent/shower, luggage on the camel ride, best time, vehicles, diets, ages, pick-up, expenses),
// moroccoexperiencetours ("from Tangier: the north, Fes and two nights near the dunes"), saharasoulmorocco, tourradar 6-day luxury.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-marrakech-to-tangier-tour.html';
const out = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
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

const URL = 'https://moroccotourshub.com/tours/7-day-morocco-tour-tangier-to-marrakech.html';
const NAME = '7-Day Morocco Tour from Tangier to Marrakech';
const TITLE = '7-Day Morocco Tour from Tangier to Marrakech | Private';
const DESC = 'Private 7-day tour from Tangier to Marrakech: met at the ferry port, Chefchaouen, Volubilis and Meknes, two nights in Fes, two by the Merzouga dunes, the Todra and Dades gorges and Aït Ben Haddou.';
const HERO = 'merzouga-blue-dress-camel.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="7 day Morocco tour from Tangier, Tangier to Marrakech tour, Chefchaouen, Fes, Sahara desert tour, ferry from Spain, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-marrakech-to-tangier-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Tangier → Tetouan → Chefchaouen',
    p: 'Your driver-guide meets you off the ferry at the port, at Tanger Med, at the airport or at your hotel. A walk in the white Andalusian medina of Tetouan on the way, then up into the green Rif hills to Chefchaouen, the blue town, in time for sunset from the Spanish Mosque.',
    meta: [['car', 'About 125 km, about 2.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast from day 2']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'A morning in the quiet blue lanes before the day visitors arrive, then south to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, and Meknes, with the great gate of Bab Mansour. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane, the cedar forest of Azrou with its Barbary macaques, lunch in Midelt, then the palm gorges of the Ziz Valley to Erg Chebbi. Your big bags go to the camp by 4×4 while you ride a camel into the dunes for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, breakfast, and back by camel or 4×4. A whole day in the desert with no long road: tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains and the lake of Dayet Srij after a wet winter. A hot shower and a calm night in a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Through Rissani, the old caravan town with its market, and along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the early evening, at your riad or the airport.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Ends at your Marrakech riad or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>7-Day Marrakech to Tangier</span></nav>', '<span>7-Day Tangier to Marrakech</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Marrakech</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Tangier</span>', 'chip');
rep('<h1>7-Day Morocco Tour from Marrakech to Tangier<span class="script">One Week, South to North</span></h1>', '<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Tangier</b>', '<small>Route</small><b>Tangier → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">One week from the Strait of Gibraltar to Marrakech, starting the moment you step off the ferry. Tetouan and the blue town of Chefchaouen, the Roman ruins of Volubilis and Meknes, then two nights in Fes with a guided day in its medina.</p>
          <p class="dt-lead">Two nights by the dunes of Erg Chebbi, a camp after a sunset camel ride and a hotel after a day with the nomads, then the Todra and Dades gorges and Aït Ben Haddou on the way over the High Atlas to Marrakech. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Tangier</dd>', '<dd>Tangier → Marrakech</dd>', 'kf1');
rep('<dt>Last day</dt><dd>Tangier port or airport</dd>', '<dt>Desert</dt><dd>2 nights by the dunes</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Met off the ferry in Tangier',
  'The white medina of Tetouan',
  'Sunset over blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at the blue hour', 1440, 1920],
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['nomad-tent-tea.jpg', 'Mint tea in a nomad tent in the desert', 960, 1280],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['ait-ben-haddou-terrace.jpg', 'Aït Ben Haddou seen from a terrace', 1500, 1000],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide for the Fes medina',
  'Pick-up at Tangier port, airport or hotel',
  'Drop-off at your Marrakech riad or airport',
  '6 nights as in the table below',
  '6 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and Atlas nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Tangier by the Sahara, Fes and Chefchaouen, about 1,500 km in 7 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Tetouan,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Chef&shy;chaouen', chf], ['2–3: Fes', fes], ['4: Desert camp', camp], ['5: Merzouga', mzh], ['6: Dades Valley', dad]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving by ferry from Spain',
  'Anyone with one week, flying home from Marrakech',
  'First-timers who want the north and the desert',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Have 10 days? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> adds Asilah and a night at the Todra Gorge',
  'Want the coast and the cities instead of the desert? The <a href="7-day-tangier-to-marrakech-imperial-cities-tour.html">7-day imperial cities tour</a> goes by Rabat and Casablanca',
  'Going back to Spain at the end? The <a href="7-day-marrakech-to-tangier-tour.html">7-day Marrakech to Tangier tour</a> runs the other way',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'tm7-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Will you meet us when the ferry arrives?', 'Yes. Ferries from Tarifa arrive at the port in the city of Tangier, and from Algeciras at Tanger Med, about 45 minutes away. Send us your crossing; your driver-guide waits at the exit with your name and follows any delay.'],
  ['How long is the camel ride, and is there another way to the camp?', 'About one hour at sunset, with a guide leading the camels. If you would rather not ride, the camp’s 4×4 takes you in; quad bikes can be added for an extra cost.'],
  ['What happens to our luggage in the desert?', 'You take a small bag with what you need for the night. The rest goes to the camp by 4×4 or stays in our car, and you find it waiting the next morning.'],
  ['Do the tents have a private bathroom?', 'Yes. All three camps in the table have private tents with their own bathroom, shower and toilet. In winter, ask for a camp with heated tents.'],
  ['Which days are the long drives?', 'Day 4, Fes to Merzouga, about eight hours with stops, and day 7 over the High Atlas, about six. Days 3 and 5 have little or no driving, and day 1 is short.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in Chefchaouen',
  'Upgrade to a luxury camp with heated tents',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A night at Aït Ben Haddou on the way',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-food-tour.html">food tour</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Marrakech to Tangier" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Tangier.', 'information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'wa');
rep('<b>7-Day Marrakech to Tangier</b><span>Free', '<b>7-Day Tangier to Marrakech</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tm7-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier port pick-up and Tetouan', 'Chefchaouen (night 1)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 2–3)', 'Ifrane, Midelt and a camel ride to a desert camp (night 4)', 'A day around Merzouga with a nomad family (night 5)', 'Todra Gorge and the Dades Valley (night 6)', 'Aït Ben Haddou, Tizi n’Tichka and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['One Week, South to North', 'Night 5–6: Chef', 'Tangier port or airport']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
