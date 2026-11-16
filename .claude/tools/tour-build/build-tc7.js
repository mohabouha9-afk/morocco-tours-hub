// Build tours/7-day-tangier-to-marrakech-imperial-cities-tour.html (Tangier -> Tetouan -> Chefchaouen -> Volubilis/Meknes -> Fes x2 -> Rabat
// -> Casablanca -> Hassan II Mosque -> Marrakech x2, ends day 7). No desert. Template = the finished 7-day Tangier -> Marrakech page.
// Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "rabat morocco" 12,100, "meknes" 2,400, "casablanca to marrakech" 1,600, "7 day morocco itinerary" 480,
// "rabat to casablanca" 260, "fes to rabat" 110, "tangier to rabat" 90, "imperial cities of morocco" 70, "morocco imperial cities tour" 50.
// SERP "7 day imperial cities tour from Tangier": Tripadvisor 7-Day Imperial Cities from Tangier (5.0 / 1 review; Chefchaouen, Volubilis, Fes
// guided, Fes -> Beni Mellal -> Marrakech, Marrakech, Casablanca + Rabat, back to Tangier), kimkim "Imperial Cities of Morocco - 7 Days"
// (Tangier -> Chefchaouen, Volubilis + Meknes -> Fes, Fes day, Rabat (Chellah, Oudayas, Hassan Tower, Mausoleum) -> Casablanca, Hassan II Mosque
// -> Marrakech, guided Marrakech day, depart day 7), Booking.com "Morocco Imperial Cities - 7 Days" (Tangier -> Marrakech via Meknes, Fes, Rabat,
// Chefchaouen, Casablanca), nomadtoursmorocco, asiaodysseytravel (Casablanca start). Proven structure = kimkim's order; ours adds guides in Fes
// and Marrakech. Hassan II Mosque guided visits run Saturday to Thursday, 140 MAD (official site + guides; see 8-day Imperial Cities notes).
// OSRM: Fes -> Rabat 201 km, Rabat -> Casablanca 95 km (ti4, 297 km, ~3.5 h), Casablanca -> Marrakech 242 km (ti5, ~3 h motorway).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/7-day-tangier-to-marrakech-imperial-cities-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/7-day-tangier-to-marrakech-imperial-cities-tour.html';
const NAME = '7-Day Imperial Cities Tour from Tangier to Marrakech';
const TITLE = '7-Day Imperial Cities Tour: Tangier to Marrakech | Private';
const DESC = 'A private 7-day imperial cities tour from Tangier to Marrakech: Chefchaouen, Volubilis and Meknes, a guided day in Fes, Rabat, the Hassan II Mosque in Casablanca and a guided day in Marrakech. No long desert drives.';
const HERO = 'majorelle-garden-blue-villa.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="imperial cities of Morocco, Morocco imperial cities tour, 7 day Morocco itinerary, Tangier to Marrakech, Chefchaouen, Fes, Meknes, Rabat, Casablanca, private Morocco tour">', 'kw');
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
    p: 'An early walk in the blue lanes, then south to Volubilis, the Roman town with its mosaics and triumphal arch, and Meknes, the imperial city of Moulay Ismail, with the great gate of Bab Mansour and his royal granaries. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide through Fes el-Bali, the oldest of the imperial cities: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the brass gates of the royal palace and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Rabat → Casablanca',
    p: 'West by motorway to Rabat, the capital: the blue-and-white lanes of the Kasbah of the Oudayas above the ocean, the Hassan Tower and the royal Mausoleum of Mohammed V, with its guards at the gate. On down the coast to Casablanca for the evening on the Corniche.',
    meta: [['car', 'About 300 km, about 3.5 hours on the road'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast']] },
  { t: 'Hassan II Mosque → Marrakech',
    p: 'A guided visit inside the Hassan II Mosque, built over the Atlantic, with its 210 m minaret and carved cedar ceilings. Then south by motorway across the plains to Marrakech and your riad in the medina by mid-afternoon, with the evening free on Jemaa el-Fnaa.',
    meta: [['car', 'About 240 km, about 3 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the Red City',
    p: 'With a local Marrakech guide: the Koutoubia, the painted cedar ceilings of the Bahia Palace, the Saadian Tombs, the Ben Youssef Madrasa and the souks. In the afternoon, your driver can take you to the Majorelle Garden or you rest by the riad pool.',
    meta: [['car', 'Day on foot, short drives in town'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech, end of the tour',
    p: 'A free morning for a last walk in the souks or a hammam, then your driver takes you to Marrakech airport, the train station or your next hotel, at the time that suits your flight.',
    meta: [['car', 'Airport or hotel transfer'], ['flag', 'Ends at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The blue villa of the Majorelle Garden in Marrakech" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>7-Day Imperial Cities Tour</span></nav>', 'crumb');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>7-Day Imperial Cities Tour from Tangier<span class="script">Four Royal Cities, One Week</span></h1>', 'h1');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">One week through the four imperial cities of Morocco, from the Strait of Gibraltar to Marrakech. The blue town of Chefchaouen and the Roman ruins of Volubilis on the way to Meknes, then two nights in Fes with a local guide in the oldest medina in the country.</p>
          <p class="dt-lead">Rabat, the capital, by the ocean, the Hassan II Mosque in Casablanca, and two nights in Marrakech with a guided day in the Red City. Short, easy drives on good roads, your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Imperial cities</dt><dd>All four, with guides</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Met at Tangier port or airport',
  'Sunset over blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'The Kasbah of the Oudayas in Rabat',
  'The Hassan Tower and royal Mausoleum',
  'Inside the Hassan II Mosque',
  'Jemaa el-Fnaa and the Bahia Palace',
  'The Majorelle Garden, if you like',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-city.webp', 'Chefchaouen on the slopes of the Rif', 1300, 732],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina', 975, 1300],
  ['fes-medina.jpg', 'A lane in the medina of Fes', 1170, 1560],
  ['casablanca.webp', 'The Hassan II Mosque in Casablanca at dusk', 4032, 3024],
  ['bahia-palace-courtyard.jpg', 'The courtyard of the Bahia Palace in Marrakech', 1600, 1067],
  ['jemaa-el-fna-evening-aerial.jpg', 'Jemaa el-Fnaa square in Marrakech in the evening', 1600, 1067],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Pick-up at Tangier port, airport or hotel',
  'Drop-off at Marrakech airport or your hotel',
  '6 nights as in the table below',
  '6 breakfasts',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'The Hassan II Mosque is closed to visits on Fridays',
  'Cover shoulders and knees in the mosque',
  'Comfortable shoes for the medina lanes',
  'Dinners are free: eat where you like',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches and dinners:</b> about €10–20 each; you choose where',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Saadian Tombs:</b> 100 MAD',
  '<b>Majorelle Garden:</b> about 170 MAD, if you go',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Chefchaouen, Fes, Rabat and Casablanca, about 950 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Tetouan,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CMeknes,Morocco%7CFes,Morocco%7CRabat,Morocco%7CHassan+II+Mosque,Casablanca&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Chef&shy;chaouen', chf], ['2–3: Fes', fes], ['4: Casa&shy;blanca', cas], ['5–6: Marra&shy;kech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who love history, architecture and food',
  'Anyone who prefers short drives to long desert days',
  'Ferry arrivals flying home from Marrakech',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Dreaming of the Sahara? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day Tangier to Marrakech tour</a> swaps Rabat and Casablanca for two nights by the dunes',
  'Want both cities and desert? The <a href="8-day-morocco-imperial-cities-sahara-tour.html">8-day Imperial Cities &amp; Sahara tour</a> starts in Casablanca and adds Merzouga',
  'Prefer to stay in the north? The <a href="7-day-northern-morocco-tour.html">7-day northern Morocco tour</a> adds Asilah and the Akchour waterfalls, ending in Fes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'tc7-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['What are the four imperial cities of Morocco?', 'Fes, Meknes, Rabat and Marrakech, each a royal capital at some point in Moroccan history. This tour visits all four, plus Chefchaouen, Tetouan, the Roman ruins of Volubilis and Casablanca.'],
  ['Can we visit the Hassan II Mosque on any day?', 'Guided visits run Saturday to Thursday, several times a day; the mosque is closed to visitors on Fridays. If day 5 falls on a Friday, we see it on the evening of day 4 or the next morning instead.'],
  ['Is this tour good without the desert?', 'Yes, if you prefer cities, history and food to long drives. The longest day is about five hours on the road, and you sleep two nights in both Fes and Marrakech. Add the Sahara any time: it takes two more days from Fes.'],
  ['Will you meet us at the ferry or the airport?', 'Yes, at any hour. Ferries from Tarifa arrive in the city port of Tangier; from Algeciras at Tanger Med, about 45 minutes away. Your driver-guide waits at the exit with your name and follows any delay.'],
  ['Are the city guides included?', 'Yes. A local guide walks you through Fes on day 3 and Marrakech on day 6, and the mosque visit has its own official guide. Your driver-guide does the rest, so there is no one else to pay apart from entrance fees.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A first night in Tangier, with Cap Spartel',
  'A second night in Chefchaouen',
  'Two days to the Merzouga dunes from Fes',
  'A <a href="marrakech-cooking-class.html">cooking class</a> or <a href="marrakech-food-tour.html">food tour</a> in Marrakech',
  'A <a href="marrakech-to-essaouira-day-trip.html">day trip to Essaouira</a> on the coast',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

rep('+a+', 'from charming riads in the old medinas to hotels by the ocean.', 'acc intro');
rep('+b+', 'Prefer another hotel?', 'acc note');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%207-Day%20Imperial%20Cities%20Tour%20from%20Tangier%20to%20Marrakech.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>7-Day Imperial Cities</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tc7-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier port pick-up and Tetouan', 'Chefchaouen (night 1)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 2–3)', 'Rabat: Kasbah of the Oudayas, Hassan Tower and Mausoleum of Mohammed V', 'Casablanca (night 4) and the Hassan II Mosque', 'Guided day in Marrakech (nights 5–6)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '2 nights by the dunes', 'camel', 'Camel', 'dunes', 'camp']) { const n = s.split(bad).length - 1; if (n) console.warn('CHECK:', bad, n); }
fs.writeFileSync(out, s);
console.log('written', s.length);
