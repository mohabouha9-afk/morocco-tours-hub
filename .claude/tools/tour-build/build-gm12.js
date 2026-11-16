// Build tours/12-days-grand-morocco.html (Tangier x1 -> Tetouan -> Chefchaouen x2 -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel -> Todra -> Dades
// -> Aït Ben Haddou -> Marrakech x2 -> Essaouira x1 -> Marrakech). Template = the finished 7-day Tangier -> Marrakech page.
// Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "12 day morocco itinerary" 110, "morocco itinerary 12 days" 110, "2 week morocco itinerary" 90,
// "tangier to marrakech" 480, "marrakech to essaouira" 480, "essaouira" 14,800, "12 day morocco tour" 10.
// SERP "12 day Morocco tour from Tangier to Marrakech": kimkim (Casablanca loop), saharadeserttour.com 13-day Grand Morocco from Tangier
// (night in Tangier, 2 Chefchaouen, Fes x2, Merzouga hotel + camp, Dades, Marrakech x2, Essaouira x1, ends Casablanca; 2-h camel ride, no FAQ),
// tourradar 12-day private from Tangier ($2,049 pp), mymorocco-tours.com 12-day Tangier -> Marrakech (Chefchaouen x1, Fes x2, camp, Merzouga riad,
// Dades, Marrakech x5 with Essaouira as a DAY TRIP, Ourika day; local guides in Fes/Chefchaouen/Marrakech; deposit 15%; FAQ = price, length,
// deposit, customise, book, private), moroccofabuloustravel.com/morocco-itinerary-12-days (Rabat, Chefchaouen, Fes x2, camp, Merzouga, Dades,
// Marrakech x2, Essaouira x1, Casablanca; FAQ: are 12 days enough, ideal length, best time, fly to Marrakech or Casablanca, vehicles, book 2-4
// weeks ahead, payment, cancellation; local guides in Fes + Marrakech). Proven structure = 2 nights in Chefchaouen, Fes and Marrakech + a real
// night in Essaouira (not a 6-h round trip). Reviewer complaints from the grand-tour research: riads far from the sights, long drive days, cold tents.
// Essaouira hotels (Tripadvisor 2026): Riad Baladin 4.7 / 1,342, #7 of 108, $98-135 · Madada Mogador 4.7 · L'Heure Bleue Palais (Relais & Châteaux)
// 4.5 / 1,105, $326-733, rooftop pool.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/12-days-grand-morocco.html';
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

const URL = 'https://moroccotourshub.com/tours/12-days-grand-morocco.html';
const NAME = '12-Day Grand Morocco Tour from Tangier to Marrakech';
const TITLE = '12-Day Grand Morocco Tour: Tangier to Marrakech | Private';
const DESC = 'A private 12-day Morocco itinerary from Tangier to Marrakech: two nights in Chefchaouen and Fes, two by the Merzouga dunes, the Todra and Dades gorges, Aït Ben Haddou, two nights in Marrakech and one in Essaouira.';
const HERO = 'merzouga-camel-caravan.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="12 day Morocco itinerary, 12 day Morocco tour, grand Morocco tour, Tangier to Marrakech, Chefchaouen, Fes, Sahara desert, Essaouira, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Arrival in Tangier: the Kasbah and Cap Spartel',
    p: 'Your driver-guide meets you off the ferry at the port, at Tanger Med, at the airport or at your hotel, at any hour. If you land in time: the Kasbah and the old medina above the harbour, then out to Cap Spartel, where the Mediterranean meets the Atlantic, and the Caves of Hercules.',
    meta: [['car', 'Short drives around Tangier'], ['bed', 'Night: Tangier'], ['food', 'Breakfast from day 2']] },
  { t: 'Tangier → Tetouan → Chefchaouen',
    p: 'A walk in the white Andalusian medina of Tetouan, then up into the green Rif hills to Chefchaouen, the blue town, with the afternoon free in its lanes and sunset from the Spanish Mosque.',
    meta: [['car', 'About 125 km, about 2.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'A free day in Chefchaouen',
    p: 'No driving: the quiet blue lanes before the day visitors arrive, the kasbah garden on Outa el Hammam square, the Ras el Maa spring. Ask your driver for a half-day to the Akchour waterfalls if you like to walk.',
    meta: [['car', 'No driving unless you ask'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'South to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, and Meknes, with the great gate of Bab Mansour. Your riad in the Fes medina by late afternoon.',
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
    p: 'Down the Road of a Thousand Kasbahs through the Valley of Roses and Skoura to Aït Ben Haddou and a walk up through the ksar. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to your Marrakech riad in the early evening.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided morning, a free evening',
    p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the souks and the Ben Youssef Madrasa. The afternoon is yours, and Jemaa el-Fnaa comes alive after dark with music and food stalls.',
    meta: [['car', 'Morning on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech → Essaouira, by the Atlantic',
    p: 'West across the argan country to Essaouira, the walled port on the ocean. An afternoon on the Skala ramparts and their bronze cannons, the blue fishing boats in the harbour, grilled fish for lunch and the long beach at sunset.',
    meta: [['car', 'About 190 km, about 2.5–3 hours on the road'], ['bed', 'Night: Essaouira'], ['food', 'Breakfast']] },
  { t: 'Essaouira → Marrakech, end of the tour',
    p: 'A slow morning in the medina and the Mellah, then back to Marrakech in the afternoon, to your hotel or Marrakech airport. Flying from Essaouira or Casablanca? We take you there instead.',
    meta: [['car', 'About 190 km, about 2.5–3 hours on the road'], ['flag', 'Ends at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>12-Day Grand Morocco</span></nav>', 'crumb');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>12-Day Grand Morocco Tour<span class="script">From the Strait to the Atlantic</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>12 days / 11 nights', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Twelve days that cross the whole of Morocco, from the Strait of Gibraltar to the Atlantic coast. A first night in Tangier, two in the blue town of Chefchaouen, the Roman ruins of Volubilis and Meknes, then two nights in Fes with a guided day in its medina.</p>
          <p class="dt-lead">Two nights by the dunes of Erg Chebbi, the Todra and Dades gorges and Aït Ben Haddou on the way over the High Atlas, two nights in Marrakech and a last night by the ocean in Essaouira. Two nights in each big stop, so you never feel rushed, with your own car and driver-guide all the way.</p>
`, 'overview');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Coast</dt><dd>A night in Essaouira</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Cap Spartel, where two seas meet',
  'Two nights in blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'Tea with a nomad family',
  'The Todra and Dades gorges',
  'Aït Ben Haddou and the High Atlas',
  'Jemaa el-Fnaa and the Skala of Essaouira',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['tangier-cap-spartel-lighthouse.jpg', 'The lighthouse of Cap Spartel near Tangier', 1000, 667],
  ['chefchaouen-blue-steps.jpg', 'Blue steps in the medina of Chefchaouen', 800, 900],
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
  ['merzouga-camel-ride-dunes.jpg', 'A camel ride on the Merzouga dunes', 1600, 1066],
  ['jemaa-el-fna-dusk-stalls.jpg', 'Jemaa el-Fnaa square in Marrakech at dusk', 1600, 1201],
  ['essaouira-skala-port.jpg', 'The Skala ramparts and harbour of Essaouira', 1000, 667],
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
  '11 nights as in the table below',
  '11 breakfasts and 3 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'Small bag for the camp; luggage goes by 4×4',
  'Car-sick? Sit in front on the mountain bends',
  'Essaouira is windy: bring a light jacket',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Caves of Hercules:</b> small fee',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Skala du Port, Essaouira:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Chefchaouen, Fes, the Sahara and Essaouira, about 1,950 km in 12 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Chefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco%7CMarrakech,Morocco%7CEssaouira,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const tng = [A('https://www.tripadvisor.com/Hotel_Review-g293737-d8672446-Reviews-Hilton_Garden_Inn_Tanger_City_Center-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Hilton Garden Inn'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d7118909-Reviews-Grand_Hotel_Villa_de_France-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Grand Hotel Villa de France'), A('https://www.tripadvisor.com/Hotel_Review-g293737-d25109105-Reviews-Fairmont_Tazi_Palace_Tangier-Tangier_Tanger_Tetouan_Al_Hoceima.html', 'Fairmont Tazi Palace')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Tangier', tng], ['2–3: Chef&shy;chaouen', chf], ['4–5: Fes', fes], ['6: Desert camp', camp], ['7: Merzouga', mzh], ['8: Dades Valley', dad], ['9–10: Marra&shy;kech', mrk], ['11: Essa&shy;ouira', ess]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with two weeks, arriving from Spain',
  'First-timers who want every side of Morocco',
  'Anyone who likes two nights in each big stop',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only 10 days? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> keeps Chefchaouen, Fes and the Sahara, without the coast',
  'Want quieter, emptier dunes? The <a href="13-day-tangier-to-marrakech-tour.html">13-day Tangier to Marrakech tour</a> adds Ouzina and Zagora',
  'Only one week? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day Tangier to Marrakech tour</a> keeps Chefchaouen, Fes and the dunes, ending in Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'gm12-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are 12 days enough to see Morocco?', 'Yes, for a first trip. You see the north, Fes, the Sahara, the High Atlas, Marrakech and the coast, with two nights in Chefchaouen, Fes, the desert and Marrakech, so the long days are balanced by quiet ones.'],
  ['Will you meet us at the ferry or the airport in Tangier?', 'Yes, at any hour. Ferries from Tarifa arrive in the city port; from Algeciras at Tanger Med, about 45 minutes away. Your driver-guide waits with your name and follows any delay, and the first night is in Tangier, so a late arrival is fine.'],
  ['Which days are the long drives?', 'Day 6, Fes to Merzouga, about eight hours with stops, and day 9 over the High Atlas, about six. Days 3, 5, 7 and 10 have little or no driving, and the Essaouira days are under three hours each way.'],
  ['Are the riads close to the sights?', 'Yes. The places in the table sit in or next to the old medinas of Chefchaouen, Fes, Marrakech and Essaouira. Cars cannot enter the lanes, so a porter takes your bags from the nearest gate.'],
  ['Can we end in Essaouira or Casablanca instead?', 'Yes. Marrakech has the most international flights, so the tour ends there, but we can drop you at Essaouira airport, or drive on to Casablanca, about four hours from Essaouira. Tell us your flight and we plan the last day around it.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Asilah, the white seaside town, on day 1 or 2',
  'A half-day hike to the Akchour waterfalls',
  'Upgrade to a luxury camp with heated tents',
  'A <a href="marrakech-hot-air-balloon-ride.html">balloon flight</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'A second night by the ocean in Essaouira',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%2012-Day%20Grand%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>12-Day Grand Morocco</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 12-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'gm12-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier, the Kasbah and Cap Spartel (night 1)', 'Tetouan and Chefchaouen (nights 2–3)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 4–5)', 'Ifrane, Midelt and a camel ride to a desert camp (night 6)', 'A day around Merzouga with a nomad family (night 7)', 'Todra Gorge and the Dades Valley (night 8)', 'Aït Ben Haddou and Tizi n’Tichka', 'Guided Marrakech medina (nights 9–10)', 'Essaouira on the Atlantic (night 11)', 'Back to Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '1,550 km', '2 nights by the dunes', '7-day route', 'luggage on the camel']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
