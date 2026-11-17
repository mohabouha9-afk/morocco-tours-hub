// Build tours/11-day-morocco-photography-tour-from-casablanca.html (URL kept): 11-day photography tour, Casablanca -> Marrakech.
// ORIGINAL ROUTE KEPT (owner rule 2026-11-17): D1 Casablanca (Hassan II Mosque) -> Rabat · D2 -> Chefchaouen · D3 Volubilis, Meknes -> Fes ·
// D4 Fes with a local guide · D5 Ifrane, Midelt, Ziz -> Merzouga camel + camp · D6 sunrise, 4×4 (Hassi Labied, Khamlia, nomads, Dayet Srij), Merzouga ·
// D7 Rissani, Erfoud, Todra -> Dades · D8 Valley of Roses, Skoura -> Ouarzazate · D9 Aït Ben Haddou, Tichka -> Marrakech · D10 Marrakech photo day ·
// D11 departure. Old page: dinners in Dades + camp, local guide in Fes (none listed in Marrakech), fuel/tolls/parking, Marrakech airport drop-off.
// Owner (2026-11-17): only check facts. Checked: drones — Morocco has banned recreational drones since 2015, customs at Marrakech Menara and other
// airports confiscate them (uavcoach.com, drone-traveller.com, bladi.net, cash-online.de); ask before portraits, Jemaa el-Fnaa performers ask a few
// dirhams for photos (journeybeyondtravel, goatsontheroad, bewilderedinmorocco). Fees as on the other finished pages: Hassan II 140 MAD (no visits
// Friday), Volubilis 70–100 MAD, Bou Inania ~20 MAD, Taourirt small fee, Atlas Film Studios ~80 MAD. Roads: jn10 roads (OSRM).
// Derived from build-jn10.js. Never re-run on the finished page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/11-day-morocco-photography-tour-from-casablanca.html';
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
const ALLPAGES = fs.readdirSync(root + 'tours').map(f => fs.readFileSync(root + 'tours/' + f, 'utf8')).join('');
function dims(f) { const mm = ALLPAGES.match(new RegExp(f.replace('.', '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }

const URL = 'https://moroccotourshub.com/tours/11-day-morocco-photography-tour-from-casablanca.html';
const NAME = '11-Day Morocco Photography Tour from Casablanca';
const TITLE = '11-Day Morocco Photography Tour from Casablanca | Private';
const DESC = 'Private 11-day Morocco photography tour from Casablanca to Marrakech: the Hassan II Mosque, the blue lanes of Chefchaouen, the Fes medina with a local guide, Sahara sunrise and sunset, the Todra and Dades gorges, Skoura, Aït Ben Haddou and a photo day in Marrakech, with stops wherever the light is right.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco photography tour, photography tour Morocco, Morocco photo tour, Sahara photography, Chefchaouen photography, private Morocco tour from Casablanca">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Casablanca → Hassan II Mosque → Rabat',
    p: 'Your driver-guide meets you at Casablanca airport or your hotel. The Hassan II Mosque on the ocean, with time to frame its minaret against the Atlantic, then up the coast to Rabat for the whitewashed lanes, blue doors and ocean views of the Kasbah des Oudayas in the afternoon light.',
    meta: [['car', 'About 120 km, about 2 hours on the road'], ['bed', 'Night: Rabat'], ['food', 'Breakfast from day 2']] },
  { t: 'Rabat → Chefchaouen',
    p: 'North through the farmland of the Gharb into the green Rif hills to Chefchaouen. The blue lanes, stairs and doors in the soft afternoon light, then the Spanish Mosque above the town for sunset, and a walk back through the medina once the day visitors have gone.',
    meta: [['car', 'About 250 km, about 4 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'An early photo walk in the empty blue lanes, when the light is even and the steps are quiet. South to Volubilis for its columns, mosaics and triumphal arch against open farmland, then the great gate of Bab Mansour in Meknes, and your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a photo day in the medina',
    p: 'With a local Fes guide who knows the lanes and the craftsmen: the carved cedar and zellige of the Bou Inania Madrasa, the coppersmiths of Place Seffarine, the woodworkers and weavers, and a rooftop above the Chouara tanneries. The afternoon is free to go back where the light was best.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'Over the Middle Atlas by Ifrane and the cedar forests, then the land opens and dries towards Midelt. A stop at the Ziz Valley viewpoint, where a river of palms runs between bare mountains, then the dunes of Erg Chebbi and a camel ride into the sand for your first Sahara sunset. Dinner and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga: sunrise, nomads and the dunes',
    p: 'Up before dawn for sunrise on the dunes by the camp, when the ridges throw long shadows. Then a private 4×4 morning: the Hassi Labied oasis, the Gnawa musicians of Khamlia, a nomad family in their tent and the lake of Dayet Srij when it has water. Back on the dunes for sunset.',
    meta: [['car', '4×4 around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast']] },
  { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley',
    p: 'Through Rissani and Erfoud, past desert villages and palm groves, to the Todra Gorge, where 300 m walls of red rock close in over the river. A walk through the gorge, then the Dades Valley, its winding road and its rock formations in the evening light.',
    meta: [['car', 'About 300 km, about 5.5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Skoura → Ouarzazate',
    p: 'A shorter day for photographs: the earthen villages of the Valley of Roses, then the palm oasis of Skoura and its kasbahs in the shade of the trees. Ouarzazate in the afternoon, for the Taourirt Kasbah or the Atlas film studios, and the kasbahs around town at sunset.',
    meta: [['car', 'About 160 km, about 3 hours on the road'], ['bed', 'Night: Ouarzazate'], ['food', 'Breakfast']] },
  { t: 'Ouarzazate → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Aït Ben Haddou in the morning, before the tour buses: up through the lanes of the earthen ksar to the granary on top, then across the river for the classic view. Over the High Atlas by the Tizi n’Tichka pass, stopping for the mountain villages, and down to Marrakech by late afternoon.',
    meta: [['car', 'About 200 km, about 4.5 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a photo day in the medina',
    p: 'The Koutoubia, the souks, the doors, lanterns and dyed wool of the medina, at your own pace. Early morning and late afternoon give the softest light in the lanes; the evening is for Jemaa el-Fnaa as the food stalls light up.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: departure',
    p: 'A last morning walk with your camera if your flight allows, then your driver-guide takes you to Marrakech airport or another place you choose.',
    meta: [['car', 'Riad to Marrakech airport, about 20 minutes'], ['flag', 'Ends at the airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on the Merzouga dunes at sunset" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>11-Day Photography Tour</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>11-Day Morocco Photography Tour<span class="script">Stop Wherever the Light Is Right</span></h1>', 'h1');
rep('<b>8 days / 7 nights</b>', '<b>11 days / 10 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Eleven days from Casablanca to Marrakech, planned around light and time. The Hassan II Mosque on the ocean, the blue lanes of Chefchaouen at dawn, the craftsmen of the Fes medina with a local guide, then sunrise and sunset on the dunes of Merzouga, with two nights by the Sahara.</p>
          <p class="dt-lead">On the way back, the red walls of the Todra and Dades gorges, the palms of Skoura, a night in Ouarzazate so you reach Aït Ben Haddou before the tour buses, and a free photo day in Marrakech. Your own car and driver-guide, and a stop every time you see a picture.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Photo stops</dt><dd>Wherever you ask</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Hassan II Mosque on the Atlantic',
  'Chefchaouen’s blue lanes at dawn',
  'The craftsmen of the Fes medina',
  'Sunrise and sunset on the Sahara dunes',
  'A nomad family and Gnawa music',
  'The red walls of the Todra Gorge',
  'The kasbahs of Skoura',
  'Aït Ben Haddou before the crowds',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen-blue-steps.jpg', 'Blue steps in Chefchaouen'],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina'],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk'],
  ['dades-red-valley.jpg', 'The red Dades Valley'],
  ['ait-ben-haddou-village.jpg', 'The earthen ksar of Aït Ben Haddou'],
  ['jemaa-el-fna-evening-aerial.jpg', 'Jemaa el-Fnaa in the evening'],
].map(([f, a]) => dims(f).concat([f, a])).map(([w, h, f, a]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in Fes',
  'Casablanca pick-up, Marrakech drop-off',
  '10 nights as in the table below',
  '10 breakfasts and 2 dinners',
  'Camel ride, sandboarding, 4×4 morning',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, drinks, other dinners', 'Entrance fees', 'Camera gear', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Leave your drone at home: customs take it',
  'Ask before a portrait; performers expect a coin',
  'Hassan II Mosque: no visits on Fridays',
  'Fine sand in the desert: bring a lens cloth and bag',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Hassan II Mosque:</b> 140 MAD',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Ouarzazate:</b> Taourirt Kasbah small fee, or Atlas studios about 80 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Casablanca to Marrakech by Chefchaouen, Fes and the Sahara, about 1,700 km in 11 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Casablanca,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Rabat,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7COuarzazate,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const rab = [A('https://www.tripadvisor.com/Hotel_Review-g293736-d12390293-Reviews-Riad_Dar_Saidi-Rabat_Rabat_Sale_Kenitra.html', 'Riad Dar Saidi'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d3724817-Reviews-Riad_Zyo-Rabat_Rabat_Sale_Kenitra.html', 'Riad Zyo'), A('https://www.tripadvisor.com/Hotel_Review-g293736-d300677-Reviews-Sofitel_Rabat_Jardin_des_Roses-Rabat_Rabat_Sale_Kenitra.html', 'Sofitel Jardin des Roses')];
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const ouz = [A('https://www.tripadvisor.com/Hotel_Review-g16828469-d1491727-Reviews-Dar_Chamaa-Tabounte_Souss_Massa.html', 'Dar Chamaa'), A('https://www.tripadvisor.com/Hotel_Review-g304018-d505636-Reviews-Kenzi_Azghor_Hotel-Ouarzazate_Draa_Tafilalet.html', 'Kenzi Azghor Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g304018-d480998-Reviews-Le_Berbere_Palace-Ouarzazate_Draa_Tafilalet.html', 'Le Berbère Palace')];
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Rabat', rab], ['2: Chef&shy;chaouen', chf], ['3–4: Fes', fes], ['5: Desert camp', camp], ['6: Merzouga', mzh], ['7: Dades Valley', dad], ['8: Ouarzazate', ouz], ['9–10: Marra&shy;kech', mar]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Photographers who want time, not a rush',
  'Travellers who love streets, crafts and faces',
  'Landscape lovers: dunes, gorges and kasbahs',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have a week? The <a href="7-day-morocco-tour-from-casablanca.html">7-day tour from Casablanca</a> keeps Chefchaouen, Fes and the dunes',
  'Want quieter, wilder dunes? The <a href="7-day-marrakech-erg-chigaga-merzouga-tour.html">7-day tour</a> adds Erg Chigaga by 4×4',
  'Flying home from Casablanca? The <a href="10-day-morocco-tour-casablanca-round.html">10-day round trip</a> drives you back',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ph11-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Can I bring a drone?', 'Better not. Morocco has banned recreational drones since 2015, and customs at the airports routinely take them, often for good. Leave it at home; your driver-guide knows the viewpoints that give you the high shots instead.'],
  ['Can I photograph people?', 'Street scenes are fine, but always ask before a portrait, and accept a no. Performers in Jemaa el-Fnaa and some people in the souks expect a few dirhams for a photo. Your guide in Fes can introduce you to craftsmen who are happy to be photographed.'],
  ['When is the best light?', 'The first and last hour of the day. The route is planned for it: sunset in Chefchaouen and on the dunes, sunrise in the Sahara, Aït Ben Haddou in the morning, and free afternoons in Fes and Marrakech to go back when the light softens.'],
  ['Is this a photography workshop?', 'No, it is a private tour built for photographers, with a driver-guide who stops wherever you ask and knows the viewpoints. There is no photo teacher. Tell us if you would like a local photographer to join you for a day.'],
  ['Which days are long drives?', 'Day 5, Fes to Merzouga, about 8 hours, and day 7, Merzouga to the Dades Valley, about 5.5 hours, with stops for photos, tea and lunch. The night in Ouarzazate keeps days 8 and 9 short.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in Chefchaouen instead of Rabat',
  'A local guide for the Marrakech photo day',
  'A second night in the desert camp',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'A night at Aït Ben Haddou for the sunset',
  'Upgrade to a luxury camp',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2011-Day%20Morocco%20Photography%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>11-Day Photography Tour</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 11-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ph11-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Photographers', 'Couples', 'Friends'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Casablanca and the Hassan II Mosque', 'Rabat (night 1)', 'Chefchaouen (night 2)', 'Volubilis and Meknes', 'Fes medina with a local guide (nights 3–4)', 'Ziz Valley and a camel ride to a desert camp (night 5)', 'Merzouga sunrise, Khamlia and a nomad family (night 6)', 'Todra Gorge and the Dades Valley (night 7)', 'Skoura and Ouarzazate (night 8)', 'Aït Ben Haddou and Tizi n’Tichka', 'Marrakech photo day (nights 9–10)'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Guided day included', 'Marrakech guide', 'Ben Youssef', 'Four Royal Cities', '4 imperial cities', 'Night 7: Marrakech', 'Night: Rabat</li><li>', 'Imperial Cities &amp; Sahara']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
