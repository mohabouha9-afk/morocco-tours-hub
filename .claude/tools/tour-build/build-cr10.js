// Build tours/10-day-morocco-tour-casablanca-round.html (Casablanca -> Rabat -> Chefchaouen -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel -> Dades -> Aït Ben Haddou -> Marrakech x2 -> Casablanca airport)
// Template = the finished 9-day Casablanca page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): SERP "10 day morocco tour from casablanca": Tripadvisor 10D9N private (5.0/165; Casa, Rabat, 1 night Chefchaouen,
// Fes x2, camp, nomads, Dades, Marrakech x2, airport; complaint: long driving days), toubkalviews (ends Marrakech/Essaouira; FAQ "can we
// finish in Casablanca?"), mouhoutours, tangierexcursions. "casablanca airport" 14,800/mo, "marrakech to casablanca" 1,300.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/9-day-morocco-private-tour-from-casablanca.html';
const out = root + 'tours/10-day-morocco-tour-casablanca-round.html';
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

const URL = 'https://moroccotourshub.com/tours/10-day-morocco-tour-casablanca-round.html';
const NAME = '10-Day Morocco Tour: Casablanca to Casablanca';
const TITLE = '10-Day Morocco Round Tour from Casablanca | Private Itinerary';
const DESC = 'Private 10-day round trip from Casablanca airport and back: Rabat, Chefchaouen, Volubilis and Meknes, two nights in Fes, two by the Merzouga dunes, the Dades Valley, Aït Ben Haddou and two nights in Marrakech.';
const HERO = 'merzouga-couple-orange.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="10 day Morocco itinerary, Morocco round trip from Casablanca, Casablanca airport tour, Marrakech to Casablanca, Chefchaouen, Fes, Sahara desert tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/9-day-morocco-private-tour-from-casablanca\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca: arrival and the Hassan II Mosque',
    p: 'Met in arrivals at Casablanca airport with your name on a sign, whatever time you land; we follow your flight. If there is time, a guided visit inside the Hassan II Mosque on the ocean and the Corniche at sunset; if not, it waits for the morning. Night in Casablanca.',
    meta: [['car', 'Airport to the city, about 45 minutes'], ['bed', 'Night: Casablanca'], ['food', 'Breakfast from day 2']] },
  { t: 'Casablanca → Rabat → Chefchaouen',
    p: 'Rabat on the way north: the Kasbah des Oudayas above the river mouth, the Hassan Tower and the Mausoleum of Mohammed V. Then into the green Rif hills to Chefchaouen, with the evening for its blue lanes and sunset from the Spanish Mosque.',
    meta: [['car', 'About 340 km, about 5.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'A morning walk in the quiet medina of Chefchaouen before the day visitors arrive, then south to the Roman mosaics of Volubilis and Meknes, with the great gate of Bab Mansour. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries. Shops only if you ask, and an evening free in the old town.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30, with stops in Ifrane, the cedar forest where Barbary macaques sit by the road, and Midelt for lunch. Down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi and a camel ride into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, breakfast, and back by camel or 4×4. A day in the desert with no long road: tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains and the Rissani market. A hot shower and a calm night at a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'West along the Jebel Saghro to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge, then on to the Dades Valley for a quiet evening among the red cliffs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to your riad in Marrakech in the late afternoon.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the medina',
    p: 'With a local guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Mellah, the souks and the Ben Youssef Madrasa. The afternoon is free for the gardens, a hammam or Jemaa el-Fnaa at sunset.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech → Casablanca airport',
    p: 'A free morning in Marrakech, then about 2.5 hours on the motorway back to Casablanca. We drop you at Mohammed V airport in good time for your flight, or at a hotel in the city if you fly the next day.',
    meta: [['car', 'About 230 km, about 2.5 hours on the motorway'], ['flag', 'Ends at Casablanca airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Two travellers on the Merzouga dunes at sunset" loading="eager"`, 'hero img');
rep('<span>9-Day Tour from Casablanca</span></nav>', '<span>10-Day Casablanca Round Tour</span></nav>', 'crumb');
rep('<h1>9-Day Morocco Private Tour from Casablanca<span class="script">Blue Lanes, Old Medinas, Golden Dunes</span></h1>', '<h1>10-Day Morocco Round Tour from Casablanca<span class="script">From the Airport, Back to the Airport</span></h1>', 'h1');
rep('<b>9 days / 8 nights</b>', '<b>10 days / 9 nights</b>', 'duration');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Start &amp; end</small><b>Casablanca</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Fly into Casablanca and out of Casablanca, with the whole of Morocco in between. Rabat and the blue town of Chefchaouen, the Roman ruins of Volubilis and Meknes, then two nights in Fes with a guided day in its medina.</p>
          <p class="dt-lead">Two nights by the dunes of Erg Chebbi, a camp after a sunset camel ride and a hotel after a day with the nomads, the Todra and Dades gorges and Aït Ben Haddou, two nights in Marrakech, and an easy motorway drive back to your flight. Riads inside the medinas, your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Casa → Marrakech</dd>', '<dd>Casablanca (round trip)</dd>', 'kf1');
rep('<dt>Slow stays</dt><dd>2 nights in each highlight</dd>', '<dt>Last day</dt><dd>Back to the airport</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Inside the Hassan II Mosque',
  'Rabat and blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
  'Two nights in Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-blue-steps.jpg', 'Blue steps in the medina of Chefchaouen', 800, 900],
  ['fes-guide.jpg', 'A guide in the lanes of the Fes medina', 1170, 1463],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['marrakech-caleche-square.jpg', 'A horse carriage on a square in Marrakech', 1300, 866],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Casablanca airport pick-up and drop-off',
  '9 nights as in the table below',
  '9 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace, Marrakech:</b> 100 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Chefchaouen, Fes and the Sahara, about 1,700 km in 9 days\. <a href="[^"]*"/, '<span>Casablanca to Casablanca by Fes, the Sahara and Marrakech, about 1,950 km in 10 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca+Airport,Morocco&amp;destination=Casablanca+Airport,Morocco&amp;waypoints=Rabat,Morocco%7CChefchaouen,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco%7CMarrakech,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const cas = [A('https://www.tripadvisor.com/Hotel_Review-g293732-d15515018-Reviews-Barcelo_Anfa_Casablanca-Casablanca_Casablanca_Settat.html', 'Barceló Anfa'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d11953047-Reviews-Le_Casablanca_Hotel-Casablanca_Casablanca_Settat.html', 'Le Casablanca Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g293732-d8782614-Reviews-Four_Seasons_Hotel_Casablanca-Casablanca_Casablanca_Settat.html', 'Four Seasons')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Casablanca', cas], ['2: Chef&shy;chaouen', chf], ['3–4: Fes', fes], ['5: Desert camp', camp], ['6: Merzouga', mzh], ['7: Dades Valley', dad], ['8–9: Marra&shy;kech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with a return flight to Casablanca',
  'First-timers who want the whole classic loop',
  'Couples and families who like riads in the old towns',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Flying home from Marrakech? The <a href="9-day-morocco-private-tour-from-casablanca.html">9-day tour from Casablanca</a> ends there',
  'Only have 8 days? The <a href="8-day-morocco-imperial-cities-sahara-tour.html">8-day Imperial Cities tour</a> skips Chefchaouen',
  'Landing in Marrakech? The <a href="10-day-marrakech-to-casablanca-tour.html">10-day Marrakech to Casablanca tour</a> starts there',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'cr10-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How much driving is there?', 'Days 2, 3, 7 and 8 are five to six hours with stops, day 5 to the desert is the long one, about eight hours, and the last day is 2.5 hours on the motorway. Days 1, 4, 6 and 9 have little or no driving, so the trip never feels like a race.'],
  ['What time do we reach Casablanca airport on the last day?', 'Whenever your flight needs. Marrakech to Mohammed V airport is about 2.5 hours on the motorway, so for an afternoon or evening flight you keep the morning in Marrakech; for an early flight we leave at dawn or you sleep in Casablanca.'],
  ['Why only one night in Chefchaouen?', 'To keep two nights in Fes, the desert and Marrakech in ten days. You arrive in the afternoon, see the sunset from the Spanish Mosque and walk the quiet lanes the next morning. A second night is easy to add.'],
  ['Are local guides included?', 'Yes, in the Fes and Marrakech medinas, where they make the biggest difference. In Rabat, Meknes and Volubilis your driver-guide shows you around, and the Hassan II Mosque has its own guides on the visit.'],
  ['Can we add Essaouira at the end?', 'Yes. Essaouira is about 2.5 hours from Marrakech and 4 hours from Casablanca, so a night by the sea fits well before the drive back. Tell us when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in Chefchaouen',
  'Upgrade to a luxury camp with heated tents',
  'A night in Essaouira before the drive back',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'A <a href="marrakech-hot-air-balloon-ride.html">hot air balloon ride</a> over Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="9-Day Morocco Private Tour from Casablanca" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%209-Day%20Morocco%20Private%20Tour%20from%20Casablanca.', 'information%20about%20the%2010-Day%20Morocco%20Round%20Tour%20from%20Casablanca.', 'wa');
rep('<b>9-Day Tour from Casablanca</b><span>Free', '<b>10-Day Casablanca Round Tour</b><span>Free', 'mbar');
rep('The 9-day route is a starting point', 'The 10-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'cr10-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca airport and the Hassan II Mosque (night 1)', 'Rabat and Chefchaouen (night 2)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 3–4)', 'Camel ride to a desert camp (night 5)', 'A day around Merzouga with a nomad family (night 6)', 'Todra Gorge and the Dades Valley (night 7)', 'Aït Ben Haddou and the High Atlas', 'Guided day in Marrakech (nights 8–9)', 'Back to Casablanca airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Slow stays', 'Blue Lanes, Old Medinas', '2–3: Chef']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
